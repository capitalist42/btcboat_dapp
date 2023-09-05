import React from "react";
import { redirect } from "react-router-dom";
import { useOnboardWalletHook } from "../../hooks/useOnboardWalletHook";
// import { OnboardProvider } from "@sovryn/onboard-react";
// import { SimpleConnectWalletButton } from "../components/SimpleConnectWalletButton";
// import { useOnboardWallet } from "../../hooks/useOnboardWallet";

function HomePage(): JSX.Element {
  const { firstAccountAddress } = useOnboardWalletHook();

  return (
    <div >
      HomePage
    </div>
  );
}

export default HomePage;
