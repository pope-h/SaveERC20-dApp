import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import useDeposit from "../hooks/useDeposit";

const Deposit = () => {
  const [amount, setAmount] = useState(0);
  const deposit = useDeposit(amount);

  const handleDepositClick = async () => {
    await deposit(amount);
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
          Deposit Funds
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Deposit Portal</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Thank you for banking with us
        </Dialog.Description>

        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Amount
          </Text>
          <TextField.Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount to be saved"
          />
        </label>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" className="cursor-pointer">
              Cancel
            </Button>
          </Dialog.Close>
          <Button variant="soft" color="gray" className="cursor-pointer" onClick={handleDepositClick}>
            Deposit
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default Deposit