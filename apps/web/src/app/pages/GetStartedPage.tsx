import React from "react";
import { SimpleConnectWalletButton } from "../components/SimpleConnectWalletButton";
import { useOnboardWallet } from "../../hooks/useOnboardWallet";

function GetStartedPage(): JSX.Element {
  const { connectWallet } = useOnboardWallet();
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header">Heaven&apos;s Door</h1>
        <SimpleConnectWalletButton onConnect={connectWallet} text='Connect Wallet to Start'/>
      </header>
      
    </div>
  );
}

export default GetStartedPage;
