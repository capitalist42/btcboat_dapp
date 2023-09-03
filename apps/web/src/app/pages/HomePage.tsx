import React from "react";
import { redirect } from "react-router-dom";
import { useOnboardWallet } from "../../hooks/useOnboardWallet";
// import { OnboardProvider } from "@sovryn/onboard-react";
// import { SimpleConnectWalletButton } from "../components/SimpleConnectWalletButton";
// import { useOnboardWallet } from "../../hooks/useOnboardWallet";

function HomePage(): JSX.Element {
  const { firstAccountAddress } = useOnboardWallet();

  if (!firstAccountAddress) {
    redirect("/get-started");
  } 
  return (
    <div >
      HomePage
    </div>
  );
}

export default HomePage;
