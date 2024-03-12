import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { ethers } from "ethers";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import { getMintContract } from "../constants/contract";

const useApprove = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(
    async (spender, amount) => {
      if (!isSupportedChain(chainId)) toast.error("Unsupported chain");
      
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      const contract = getMintContract(signer);

      try {
        const convertedAmount = ethers.parseEther(amount);
        const tx = await contract.approve(spender, convertedAmount);
        const receipt = await tx.wait();

        if (receipt.status) {
          toast.success("Approval successful");
        } else {
          toast.error("Approval failed");
        }
      } catch (error) {
        console.log(error);
        let errorText;

        toast.error(`Error: ${errorText}`);
      }
    },
    [chainId, walletProvider],
  )
  ;
};

export default useApprove;
