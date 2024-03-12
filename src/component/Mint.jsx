import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import useMint from "../hooks/useMint";

const Mint = () => {
    const [amount, setAmount] = useState(0);
    const [mintAddress, setMintAddress] = useState("");
    const mint = useMint(mintAddress, amount);

    const handleMintClick = async () => {
      await mint(mintAddress, amount);
      setMintAddress("");
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
          Mint Token
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Mint Portal</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Please double check details before minting
        </Dialog.Description>

        <Flex gap="3" direction={"column"}>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Mint&apos;s Address
            </Text>
            <TextField.Input
              value={mintAddress}
              onChange={(e) => setMintAddress(e.target.value)}
              placeholder="Enter address to recieve mint"
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
            onClick={handleMintClick}
          >
            Mint
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default Mint