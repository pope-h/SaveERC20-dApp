// import { ethers } from "ethers";
import {
  useWeb3ModalAccount
} from "@web3modal/ethers/react";
import { useCallback } from "react";
import { toast } from "react-toastify";
import getSavingsContract from "../constants/contract";
import { useState } from "react";
import { readOnlyProvider } from "../constants/providers";

const useCheckBalance = () => {
  const { address } = useWeb3ModalAccount();

  const [userBalance, setUserBalance] = useState(0);

  const fetchBalance = useCallback(() => {
    const contract = getSavingsContract(readOnlyProvider);

    contract
      .checkUserBalance(address)
      .then((balance) => {
        const convertedBalance = Number(balance) / 10 ** 18;
        setUserBalance(convertedBalance);
      })
      .catch((error) => {
        console.error(error);

        let errorText;
        toast.error(`Error: ${errorText}`);
      });
  }, [address]);

  return { userBalance, fetchBalance };
};

export default useCheckBalance;