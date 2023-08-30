import React from "react";
import { OnboardProvider } from "@sovryn/onboard-react";
import { SimpleConnectWalletButton } from "./app/components/SimpleConnectWalletButton";
import "./App.css";
import { useOnboardWallet } from "./hooks/useOnboardWallet";

function App(): JSX.Element {
  // const { connectWallet } = useWallet();
  const { connectWallet } = useOnboardWallet();
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header">Heaven&apos;s Door</h1>
        <SimpleConnectWalletButton onConnect={connectWallet} text='Connect Wallet to Start'/>
      </header>
      <OnboardProvider dataAttribute="dapp-onboard" />
    </div>
  );
}

export default App;
