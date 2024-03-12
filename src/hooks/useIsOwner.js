import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const useIsOwner = () => {
  const { address } = useWeb3ModalAccount();

  return address === import.meta.env.VITE_saveerc20_deployer;
};

export default useIsOwner;
