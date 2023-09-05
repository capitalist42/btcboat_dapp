import React from "react";
import { SimpleConnectWalletButton } from "../components/SimpleConnectWalletButton";
import { useOnboardWallet } from "../../hooks/useOnboardWallet";
import { redirect } from "react-router-dom";

function GetStartedPage(): JSX.Element {
  const { connectWallet, firstAccountAddress } = useOnboardWallet();
  if (firstAccountAddress) {
    redirect("/get-started/open-account");
  }
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Everyday Defi for Everyday People
          <br />
          Start using our DApp today.
        </h2>
        <div className="mt-10 flex items-center gap-x-6">
          <SimpleConnectWalletButton
            onConnect={connectWallet}
            text="Connect Wallet to Start"
            className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          />
          <a href="https://capitalist42.github.io/heavensdoor.github.io/" className="text-sm font-semibold leading-6 text-gray-900">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default GetStartedPage;
