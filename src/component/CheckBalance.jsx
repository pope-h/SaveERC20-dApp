import { Text } from "@radix-ui/themes";
import useCheckBalance from "../hooks/useCheckBalance";

const CheckBalance = () => {
  const { userBalance } = useCheckBalance();

  return (
    <Text as="div" size="4" weight="bold">
      Current Savings:{" "}
      <Text as="span" size="4" weight="bold" color="green">
        {userBalance} MTK
      </Text>
    </Text>
  );
};

export default CheckBalance