import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import useApprove from "../hooks/useApprove";

const ApproveSpender = () => {
    const [amount, setAmount] = useState(0);
    // const [spenderAddress, setSpenderAddress] = useState("");
    const approve = useApprove(
      import.meta.env.VITE_saveerc20_contract_address,
      amount
    );

    const handleApproveClick = async () => {
      await approve(import.meta.env.VITE_saveerc20_contract_address, amount);
      // setSpenderAddress("");
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
          Approve Spender
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Approve Portal</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Please double check details before approving
        </Dialog.Description>

        <Flex gap="3" direction={"column"}>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Spender&apos;s Address
            </Text>
            <TextField.Input
              defaultValue={import.meta.env.VITE_saveerc20_contract_address}
              // onChange={(e) => setSpenderAddress(e.target.value)}
              placeholder="Enter spender's address"
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Amount
            </Text>
            <TextField.Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount to be approved"
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
            onClick={handleApproveClick}
          >
            Approve
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ApproveSpender;
