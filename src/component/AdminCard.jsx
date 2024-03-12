import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import Mint from "./Mint";
import TransferToken from "./TransferToken";
import CheckContractBalance from "./CheckContractBalance";

const AdminCard = () => {
  return (
    <Card size="3" style={{ width: 500 }} className="mx-auto">
      <Flex gap="8" align="center" direction={"column"}>
        <Flex gap="4" align="center">
          <Avatar size="5" radius="full" fallback="PS" color="indigo" />
          <Box width={"100%"}>
            <Text as="div" size="4" weight="bold">
              Welcome Admin
            </Text>
            <Text as="div" size="4" color="gray">
              What will you like to do today?
            </Text>
          </Box>
        </Flex>
        <Flex gap="4" align="center">
          <Mint />
          <TransferToken />
        </Flex>
        <CheckContractBalance />
      </Flex>
    </Card>
  );
};

export default AdminCard;
