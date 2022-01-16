import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { hasEthereum } from "../utils/ethereum";
// import UnlockContract from "../contracts/artifacts/UnlockContractAbi.json";
import About from "./home";
import Heading from "../components/header";

export default function Home() {
  const [connectedWalletAddress, setConnectedWalletAddressState] = useState("");

  // If wallet is already connected...
  useEffect(() => {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }
    async function setConnectedWalletAddress() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      try {
        const signerAddress = await signer.getAddress();
        setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`);
      } catch {
        setConnectedWalletAddressState("No wallet connected");
        return;
      }
    }
    setConnectedWalletAddress();
  }, []);

  return (
    <div className="mx-auto text-center px-4">
      <main className="space-y-8">
        {!process.env.NEXT_PUBLIC_UNLOCK_ADDRESS ? (
          <p className="text-md">
            Please add a value to the <pre>NEXT_PUBLIC_UNLOCK_ADDRESS</pre>{" "}
            environment variable.
          </p>
        ) : (
          <>
            <Heading />
            <About />
          </>
        )}
      </main>

      <footer className="mt-20">
        <a
          href="https://github.com/iggyiccy/nfthack_2022"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700"
        >
          View on GitHub
        </a>
      </footer>
    </div>
  );
}
