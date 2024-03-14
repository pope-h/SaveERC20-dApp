import { ethers } from "ethers";
import {
  useWeb3ModalAccount
} from "@web3modal/ethers/react";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import getSavingsContract from "../constants/contract";
import { useState } from "react";
import { readOnlyProvider } from "../constants/providers";

const useCheckBalance = () => {
  const { address } = useWeb3ModalAccount();

  const [userBalance, setUserBalance] = useState(0);

  // const fetchBalance = useCallback(() => {
  //   const contract = getSavingsContract(readOnlyProvider);

  //   contract
  //     .checkUserBalance(address)
  //     .then((balance) => {
  //       const convertedBalance = Number(balance) / 10 ** 18;
  //       setUserBalance(convertedBalance);
  //     })
  //     .catch((error) => {
  //       console.error(error);

  //       let errorText;
  //       toast.error(`Error: ${errorText}`);
  //     });
  // }, [address]);

  const handleSavingEvent = useCallback((log) => {
    console.log("testing event: ", log);
    const encodedAmount = log.data;

    const decodedAmount = ethers.AbiCoder.defaultAbiCoder().decode(
      ["address", "uint256"],
      encodedAmount
    );

    const savedAmount = Number(decodedAmount[1]) / 10 ** 18;
    console.log("savedAmount", savedAmount);
    setUserBalance(userBalance + savedAmount);
  }, [userBalance]);

  const handleWithdrawEvent = useCallback((log) => {
    console.log("withdraw event: ", log);
    const encodedAmount = log.data;

    const decodedAmount = ethers.AbiCoder.defaultAbiCoder().decode(
      ["address", "uint256"],
      encodedAmount
    );

    const withdrawnAmount = Number(decodedAmount[1]) / 10 ** 18;
    console.log("withdrawnAmount", withdrawnAmount);
    setUserBalance(userBalance - withdrawnAmount);
  }, [userBalance]);

  useEffect(() => {
    if (!address) return;
    const contract = getSavingsContract(readOnlyProvider);

    contract
      .checkUserBalance(address)
      .then((balance) => {
        const convertedBalance = Number(balance) / 10 ** 18;
        setUserBalance(convertedBalance);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error: ${error.message}`);
      });

    const filterSaving = {
      address: import.meta.env.VITE_saveerc20_contract_address,
      topics: [ethers.id("SavingSuccessful(address,uint256)")],
    };

    const filterWithdraw = {
      address: import.meta.env.VITE_saveerc20_contract_address,
      topics: [ethers.id("WithdrawSuccessful(address,uint256)")],
    };

    // Note that this actually does nothing but logs the data to the console

    // wssProvider.getLogs({ ...filter, fromBlock: 5466940 }).then((logs) => {
    //   console.log("logs", logs);
    // });

    // This is the actual event listener and listens for new events
    const wssProvider2 = new ethers.WebSocketProvider(
      import.meta.env.VITE_wss_rpc_url
    );

    wssProvider2.on(filterSaving, handleSavingEvent);
    wssProvider2.on(filterWithdraw, handleWithdrawEvent);

    return () => {
      wssProvider2.off(filterSaving, handleSavingEvent);
      wssProvider2.off(filterWithdraw, handleWithdrawEvent);
    };
  }, [address, handleSavingEvent, handleWithdrawEvent]);

  return { userBalance };
};

export default useCheckBalance;