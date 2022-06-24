import {
  Box,
  Button,
  Code,
  Link,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import {
  useContract,
  useStarknet,
  useStarknetInvoke,
} from "@starknet-react/core";
import { useCallback } from "react";
import { Abi } from "starknet";

import CounterAbi from "../../abi/counter.json";

const IncrementCounter = () => {
  const CONTRACT_ADDRESS =
    "0x036486801b8f42e950824cba55b2df8cccb0af2497992f807a7e1d9abd2c6ba1";

  const { account } = useStarknet();
  const { contract } = useContract({
    abi: CounterAbi as Abi[],
    address: CONTRACT_ADDRESS,
  });
  const { reset, invoke } = useStarknetInvoke({
    contract,
    method: "incrementCounter",
  });
  const { colorMode } = useColorMode();
  const textSize = useBreakpointValue({
    base: "xs",
    sm: "md",
  });

  const increment = useCallback(() => {
    reset();
    if (account) {
      const amount = "0x1";
      invoke({
        args: [amount],
      });
    }
  }, [account, invoke, reset]);

  return (
    <Box>
      <Text as="h2" marginTop={4} fontSize="2xl">
        Increment Counter
      </Text>
      <Box d="flex" flexDirection="column">
        <Text>Test Contract:</Text>
        <Code marginTop={4} w="fit-content">
          {/* {`${CONTRACT_ADDRESS.substring(0, 4)}...${CONTRACT_ADDRESS.substring(
            CONTRACT_ADDRESS.length - 4
          )}`} */}
          <Link
            isExternal
            textDecoration="none !important"
            outline="none !important"
            boxShadow="none !important"
            href={`https://goerli.voyager.online/contract/${CONTRACT_ADDRESS}`}
          >
            {CONTRACT_ADDRESS}
          </Link>
        </Code>
        {account && (
          <Button my={4} w="fit-content" onClick={increment}>
            Increment Counter
          </Button>
        )}
        {!account && (
          <Box
            backgroundColor={colorMode === "light" ? "gray.200" : "gray.500"}
            padding={4}
            marginTop={4}
            borderRadius={4}
          >
            <Box fontSize={textSize}>
              Connect your wallet to increment the counter.
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default IncrementCounter;
