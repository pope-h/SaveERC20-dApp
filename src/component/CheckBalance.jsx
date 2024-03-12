import { Button, Flex, Text } from "@radix-ui/themes";
import useCheckBalance from "../hooks/useCheckBalance";

const CheckBalance = () => {
  const { userBalance, fetchBalance } = useCheckBalance();

  return (
    <Flex direction="column" gap="3" style={{ maxWidth: 500 }}>
      {userBalance ? (
        <Text as="div" size="5" weight="bold" align={"center"}>
          {userBalance} MTK
        </Text>
      ) : null}
      <Button
        size="3"
        variant="soft"
        className="cursor-pointer bg-blue-400 text-white"
        onClick={fetchBalance}
      >
        Check Savings
      </Button>
    </Flex>
  );
};

export default CheckBalance