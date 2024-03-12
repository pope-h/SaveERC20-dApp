import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { ethers } from "ethers";
import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { toast } from "react-toastify";
import { getProvider } from "../constants/providers";
import getSavingsContract from "../constants/contract";

const useWithdraw = () => {
    const { chainId } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();

  return useCallback( async (amount) => {
    if (!isSupportedChain(chainId)) toast.error("Unsupported chain");

    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getSavingsContract(signer);

    try {
      const convertedAmount = ethers.parseEther(amount);
      const tx = await contract.withdraw(convertedAmount);
      const receipt = await tx.wait();

      if (receipt.status) {
        toast.success("Withdrawal successful");
      } else {
        toast.error("Withdrawal failed");
      }
    } catch (error) {
      console.log(error);
      let errorText;
      if (error.reason === "address zero detected") {
        errorText = "Zero address detected";
      } else if (error.reason === "can't withdraw zero value") {
        errorText = "Input an amount greater than 0";
      } else if (error.reason === "insufficient funds") {
        errorText = "Insufficient balance";
      } else if (error.reason === "failed to withdraw") {
        errorText = "Withdrawal failed";
      } else {
        errorText = "An unknown error occured";
      }

      toast.error(`Error: ${errorText}`);
    }
  }, [chainId, walletProvider]);
};

export default useWithdraw;
