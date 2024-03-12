import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import useWithdraw from "../hooks/useWithdraw";

const Withdraw = () => {
  const [amount, setAmount] = useState(0);
  const withdraw = useWithdraw(amount);

  const handleWithdrawClick = async () => {
    await withdraw(amount);
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
          Make Withdrawal
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Withdrawal Portal</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Spend SAVEly
        </Dialog.Description>

        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Amount
          </Text>
          <TextField.Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount to be withdrawn"
          />
        </label>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" className="cursor-pointer">
              Cancel
            </Button>
          </Dialog.Close>
          <Button variant="soft" color="gray" className="cursor-pointer" onClick={handleWithdrawClick}>
            Withdraw
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Withdraw;
