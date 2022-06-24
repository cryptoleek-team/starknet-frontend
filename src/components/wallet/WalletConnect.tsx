import { Button } from "@chakra-ui/react";
import { useStarknet } from "@starknet-react/core";

const WalletConnect = () => {
  const { account, connect, disconnect, connectors } = useStarknet();

  if (account) {
    return (
      <Button
        ml="4"
        textDecoration="none !important"
        outline="none !important"
        boxShadow="none !important"
        // HACK: refresh to disconnect
        // TODO: actually disconnect when supported in starknet-react
        onClick={() => {
          window.location.reload();
        }}
      >
        {account
          ? `${account.substring(0, 4)}...${account.substring(
              account.length - 4
            )}`
          : "No Account"}
      </Button>
    );
  }

  return (
    <>
      {connectors.map((connector, idx) => (
        <Button
          ml="4"
          textDecoration="none !important"
          outline="none !important"
          boxShadow="none !important"
          key={idx}
          onClick={() => connect(connector)}
        >
          Connect Wallet
        </Button>
      ))}
    </>
  );
};

export default WalletConnect;
