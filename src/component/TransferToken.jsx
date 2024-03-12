import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import useTransfer from "../hooks/useTransfer";

const TransferToken = () => {
    const [amount, setAmount] = useState(0);
    const [recipientAddress, setRecipientAddress] = useState("");
    const transfer = useTransfer(recipientAddress, amount);

    const handleTransferClick = async () => {
      await transfer(recipientAddress, amount);
      setRecipientAddress("");
      setAmount(0);
    };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          size="3"
          variant="soft"
          className="cursor-pointer bg-blue-400 text-white"
        >
          Transfer Token
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Transfer Portal</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Please double check details before transferring
        </Dialog.Description>

        <Flex gap="3" direction={"column"}>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Recipient&apos;s Address
            </Text>
            <TextField.Input
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="Enter recipient's address"
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Amount
            </Text>
            <TextField.Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount to be transferred"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" className="cursor-pointer">
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            variant="soft"
            color="gray"
            className="cursor-pointer"
            onClick={handleTransferClick}
          >
            Transfer
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default TransferToken