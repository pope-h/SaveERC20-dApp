import { Button, Flex, Text } from "@radix-ui/themes";
import useCheckContractBalance from "../hooks/useCheckContractBalance";

const CheckContractBalance = () => {
    const { contractBalance, fetchBalance } = useCheckContractBalance();

  return (
    <Flex direction="column" gap="3" style={{ maxWidth: 500 }}>
      {contractBalance ? (
        <Text as="div" size="5" weight="bold" align={"center"} color="green">
          {contractBalance} MTK
        </Text>
      ) : null}
      <Button
        size="3"
        variant="soft"
        className="cursor-pointer bg-blue-400 text-white"
        onClick={fetchBalance}
      >
        Contract Balance
      </Button>
    </Flex>
  );
};

export default CheckContractBalance;
