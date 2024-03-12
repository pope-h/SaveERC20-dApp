import { ethers } from "ethers";
import SaveERC20Abi from "./abi/SaveERC20.json";
import MintAbi from "./abi/Mint.json";

const getSavingsContract = (providerOrSigner) => {
  return new ethers.Contract(
    import.meta.env.VITE_saveerc20_contract_address,
    SaveERC20Abi,
    providerOrSigner
  );
};

export const getMintContract = (providerOrSigner) => {
  return new ethers.Contract(
    import.meta.env.VITE_mint_contract_address,
    MintAbi,
    providerOrSigner
  );
};

export default getSavingsContract;
