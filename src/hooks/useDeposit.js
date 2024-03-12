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

const useDeposit = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  // console.log("walletProvider", walletProvider);

  return useCallback(
    async (amount) => {
        if (!isSupportedChain(chainId)) toast.error("Unsupported chain");
        
        const readWriteProvider = getProvider(walletProvider);
        // console.log("readWriteProvider", readWriteProvider);
        const signer = await readWriteProvider.getSigner();
        // console.log("signer", signer);

        const contract = getSavingsContract(signer);

        try {
            const convertedAmount = ethers.parseEther(amount);
            const tx = await contract.deposit(convertedAmount);
            const receipt = await tx.wait();

            if (receipt.status) {
              toast.success("Deposit successful");
            } else {
                toast.error("Approval failed");
            }
        } catch (error) {
            console.log(error);
            let errorText;
            if (error.reason === "address zero detected") {
              errorText = "Zero address detected";
            } else if (error.reason === "can't save zero value") {
              errorText = "Input an amount greater than 0";
            } else if (error.reason === "not enough token") {
              errorText = "Insufficient balance";
            } else if (error.reason === "failed to transfer") {
              errorText = "Transfer failed";
            } else {
              errorText = "An unknown error occured";
            }

            toast.error(`Error: ${errorText}`);
        }
    },
    [chainId, walletProvider],
  );
};

export default useDeposit;
