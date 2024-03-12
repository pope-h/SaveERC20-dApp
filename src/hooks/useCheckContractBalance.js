import { useCallback, useState } from "react";
import getSavingsContract from "../constants/contract";
import { readOnlyProvider } from "../constants/providers";

const useCheckContractBalance = () => {
  const [contractBalance, setContractBalance] = useState(0);

  const fetchBalance = useCallback(() => {
    const contract = getSavingsContract(readOnlyProvider);

    contract
      .checkContractBalance()
      .then((balance) => {
        const convertedBalance = Number(balance) / 10 ** 18;
        setContractBalance(convertedBalance);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return { contractBalance, fetchBalance };
};

export default useCheckContractBalance;