import React from "react";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { hasEthereum } from "../utils/ethereum";
import Intro from "./intro";
import Navbar from "./navbar";

function Heading() {
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

  const openUnlockProtocol = () => {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal();
  };
  return (
    <>
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
            "0xbB8a1e4830bBAe55283Ef6C43996044698E8d6DE": {
              "network": 4,
              "name": "Unlock members"
            }
          },
          "icon": "https://unlock-protocol.com/static/images/svg/unlock-word-mark.svg",
          "callToAction": { "default": "Please join the membership!" },
          "metadataInputs": [{
            name: 'First Name',
            type: 'text',
            required: true,
            public: true,
            placeholder: 'First Name'
          }, 
          {
            name: 'Last Name',
            type: 'text',
            required: true,
            public: false,
            placeholder: 'Last Name'
          },
          {
            name: 'Email',
            type: 'email',
            required: true,
            public: false,
            placeholder: 'example@example.com'
          }]
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
            <p className="flex justify-center items-center">
              <button
                className="max-w-sm mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide"
                onClick={openUnlockProtocol}
              >
                Join Now!
              </button>
            </p>
            <Navbar />
          </>
        )}
      </main>
    </>
  );
}

export default Heading;
