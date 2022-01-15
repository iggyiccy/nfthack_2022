import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import { hasEthereum } from "../utils/ethereum";
import CreateProjectToken from "../src/artifacts/contracts/CreateProjectToken.sol/CreateProjectToken.json";
import UnlockContract from "../contracts/artifacts/UnlockContractAbi.json";
import Intro from "./components/intro";
import Navbar from "./components/navbar";
import About from "./home";
import Register from "./components/register";

export default function Home() {
  const [setPTAddress, setPTAddressState] = useState("");
  const [newPT, setNewPTState] = useState("");
  const [PTSymbol, setPTSymbolState] = useState("");
  const [PTTotalSupply, setPTTotalSupplyState] = useState("");
  const [newPTMessage, setNewPTMessageState] = useState("");
  const [PTSymbolMessage, setPTSymbolMessageState] = useState("");
  const [PTTotalSupplyMessage, setPTTotalSupplyMessageState] = useState("");
  const [connectedWalletAddress, setConnectedWalletAddressState] = useState("");
  const newPTInputRef = useRef();
  const PTSymbolInputRef = useRef();
  const PTTotalSupplyInputRef = useRef();

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

  // Request access to MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // Call smart contract, fetch current value
  async function fetchTokenAddress() {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CREATEPROJECTTOKEN_ADDRESS,
      CreateProjectToken.abi,
      provider
    );
    try {
      const data = await contract.getProjectTokenAddress();
      setPTAddressState(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Call smart contract, set new value
  async function setProjectToken() {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }
    if (!newPT) {
      setNewPTMessageState("Please add a token name");
      return;
    }

    if (!PTSymbol) {
      setPTSymbolMessageState("Please add a token symbol");
      return;
    }

    if (!PTTotalSupply) {
      setPTTotalSupplyMessageState("Please add a token supply");
      return;
    }

    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    const web3 = require("web3");
    const amount = web3.utils.toWei(PTTotalSupply, "ether");
    setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`);
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CREATEPROJECTTOKEN_ADDRESS,
      CreateProjectToken.abi,
      signer
    );
    const transaction = await contract.createProjectToken(
      newPT,
      PTSymbol,
      amount
    );
    await transaction.wait();
    setNewPTMessageState(
      `🎉 ${newPT} created! Don't forget to record your token address somewhere!`
    );
    newPTInputRef.current.value = "";
    PTSymbolInputRef.current.value = "";
    PTTotalSupplyInputRef.current.value = "";
    setNewPTState("");
    setPTSymbolState("");
    setPTTotalSupplyState("");
  }

  const openUnlockProtocol = () => {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal();
  };

  return (
    <div className="mx-auto text-center px-4">
      <Head>
        <title>Member Only Party</title>
        <meta name="Member Only Party" content="register here." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script id="show-banner" strategy="lazyOnload">
        {`(function (d, s) {
          var js = d.createElement(s),
            sc = d.getElementsByTagName(s)[0];
          js.src =
            "https://paywall.unlock-protocol.com/static/unlock.latest.min.js";
          sc.parentNode.insertBefore(js, sc);
        })(document, "script");`}
      </Script>
      <Script id="unlock-protocol-config" strategy="lazyOnload">
        {`var unlockProtocolConfig = {
          "pessimistic": true,
          "locks": {
            "0x17a34fE4b54393571e54602324925Fc25B0774b9": {
              "network": 4,
              "name": "Unlock members"
            }
          },
          "icon": "https://unlock-protocol.com/static/images/svg/unlock-word-mark.svg",
          "callToAction": { "default": "Please join the membership!" },
          "metadataInputs": [{ "name": "Name", "type": "text", "required": true }]
        }`}
      </Script>
      <main className="space-y-8">
        {!process.env.NEXT_PUBLIC_UNLOCK_ADDRESS ? (
          <p className="text-md">
            Please add a value to the <pre>NEXT_PUBLIC_UNLOCK_ADDRESS</pre>{" "}
            environment variable.
          </p>
        ) : (
          <>
            <div className="mt-5 text-sm text-gray-400">
              {connectedWalletAddress && (
                <p className="text-md">{connectedWalletAddress}</p>
              )}
            </div>
            <Intro />
            <Navbar />
            <About />
            <p className="flex justify-center items-center">
              <button
                className="max-w-sm mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide"
                onClick={openUnlockProtocol}
              >
                Join Now!
              </button>
            </p>
            <div className="space-y-8">
              <div className="max-w-lg mx-auto flex flex-col space-y-4">
                <input
                  className="border p-4 w-100 text-center"
                  placeholder="👉 Paste your membership contract here 👈"
                  value={setPTAddress[setPTAddress.length - 1]}
                  disabled
                />
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-md w-full"
                  onClick={fetchTokenAddress}
                >
                  Refresh
                </button>
              </div>
              <div className="max-w-lg mx-auto space-y-8">
                <div className="flex flex-col space-y-4">
                  <input
                    className="border p-4 text-center"
                    onChange={(e) => setNewPTState(e.target.value)}
                    placeholder="ABCToken"
                    ref={newPTInputRef}
                  />
                  <input
                    className="border p-4 text-center"
                    onChange={(e) => setPTSymbolState(e.target.value)}
                    placeholder="ABC"
                    ref={PTSymbolInputRef}
                  />
                  <input
                    className="border p-4 text-center"
                    onChange={(e) => setPTTotalSupplyState(e.target.value)}
                    placeholder="1.02 ETH worth of tokens"
                    ref={PTTotalSupplyInputRef}
                  />
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-md"
                    onClick={setProjectToken}
                  >
                    Create Shitcoin on Ropsten Testnet Network
                  </button>
                  <div className="h-2">
                    {newPTMessage && (
                      <span className="text-sm text-gray-500 italic">
                        {newPTMessage}
                      </span>
                    )}
                    {PTSymbolMessage && (
                      <span className="text-sm text-gray-500 italic">
                        {PTSymbolMessage}
                      </span>
                    )}
                    {PTTotalSupplyMessage && (
                      <span className="text-sm text-gray-500 italic">
                        {PTTotalSupplyMessage}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
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
