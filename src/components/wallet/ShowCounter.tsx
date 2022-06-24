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
  useStarknetCall,
} from "@starknet-react/core";
import { useCallback } from "react";
import { Abi, number } from "starknet";

import CounterAbi from "../../abi/counter.json";

const ShowCounter = () => {
  const CONTRACT_ADDRESS =
    "0x036486801b8f42e950824cba55b2df8cccb0af2497992f807a7e1d9abd2c6ba1";

  const { account } = useStarknet();
  const { contract } = useContract({
    abi: CounterAbi as Abi[],
    address: CONTRACT_ADDRESS,
  });
  const { data } = useStarknetCall({
    contract,
    method: "counter",
    args: [],
  });

  const { colorMode } = useColorMode();
  const textSize = useBreakpointValue({
    base: "xs",
    sm: "md",
  });

  return (
    <Box>
      <Text as="h2" marginTop={4} fontSize="2xl">
        Show Counter
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
        <Box
          backgroundColor={colorMode === "light" ? "gray.200" : "gray.500"}
          padding={4}
          marginTop={4}
          borderRadius={4}
        >
          <Box fontSize={textSize}>{number.toFelt(data)}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ShowCounter;
