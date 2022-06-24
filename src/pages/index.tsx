import { Box } from "@chakra-ui/react";

import CTASection from "components/samples/CTASection";
import SomeText from "components/samples/SomeText";
import { IncrementCounter, Transactions, ShowCounter } from "components/wallet";

const Home = () => {
  return (
    <Box mb={8} w="full" h="full" d="flex" flexDirection="column">
      <SomeText />
      <Box flex="1 1 auto">
        <Transactions />
        <IncrementCounter />
        <ShowCounter />
      </Box>
      <CTASection />
    </Box>
  );
};

export default Home;
