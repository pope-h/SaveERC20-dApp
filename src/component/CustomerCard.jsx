import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import CheckBalance from "./CheckBalance";

const CustomerCard = () => {
  return (
    <Card size="3" style={{ width: 500 }} className="mx-auto">
      <Flex gap="8" align="center" direction={"column"}>
        <Flex gap="4" align="center">
          <Avatar size="5" radius="full" fallback="PS" color="indigo" />
          <Box width={"100%"}>
            <Text as="div" size="4" weight="bold">
              Welcome Teodros Girmay
            </Text>
            <Text as="div" size="4" color="gray">
              What will you like to do today?
            </Text>
          </Box>
        </Flex>
        <Flex gap="4" align="center">
            <Deposit />
            <Withdraw />
        </Flex>
        <CheckBalance />
      </Flex>
    </Card>
  );
};

export default CustomerCard;
