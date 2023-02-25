import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { ChainId } from "@biconomy/core-types";
import SmartAccount from "@biconomy/smart-account";
import { useAccount, useSigner } from "wagmi";

const HomeWallet = () => {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const [smartAccount, setSmartAccount] = useState<SmartAccount | null>(null);
  const [scwAddress, setScwAddress] = useState("");
  const [scwLoading, setScwLoading] = useState(false);

  const sAddress = smartAccount?.address;
  console.log("address", sAddress);

  useEffect(() => {
    async function setupSmartAccount() {
      setScwAddress("");
      setScwLoading(true);
      const walletProvider = new ethers.providers.Web3Provider(
        (signer?.provider as any).provider
      );
      const smartAccount = new SmartAccount(walletProvider, {
        activeNetworkId: ChainId.GOERLI,
        supportedNetworksIds: [ChainId.GOERLI],
      });
      await smartAccount.init();
      const context = smartAccount.getSmartAccountContext();
      setScwAddress(context.baseWallet.getAddress());
      console.log("Smart Account Address", context.baseWallet.getAddress());
      setSmartAccount(smartAccount);
      console.log("Smart Account", smartAccount.address);
      setScwLoading(false);
    }
    if (!!signer?.provider && !!address) {
      setupSmartAccount();
      console.log("Provider...", signer?.provider);
    }
  }, [address, signer?.provider]);

  const gaslessTransfer = async () => {
    if (!smartAccount) {
      return;
    }
    // let iface = new ethers.utils.Interface(votechainabi)
    //   let det = iface.encodeFunctionData("userregister",[name, age, contactnumber, sex])
    //   console.log(det)
    await smartAccount.init();
    console.log("Smart Account", smartAccount);
    const tx={
      to:"0x402d00B799cCBaC017578258F7C88EF92EE973B7",
      from:smartAccount.address,
      value:ethers.utils.parseEther("0.01"),
      data:'0x'
    }
    const txResponse2 = await smartAccount.sendGaslessTransaction({ transaction: tx });
    console.log(txResponse2);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Biconomy SDK Next.js Rainbow Example</h1>
        <ConnectButton />

        {scwLoading && <h2>Loading Smart Account...</h2>}

        {scwAddress && (
          <div>
            <h2>Smart Account Address</h2>
            <p>{scwAddress}</p>
            <button onClick={gaslessTransfer}>Gasless Transfer</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomeWallet;