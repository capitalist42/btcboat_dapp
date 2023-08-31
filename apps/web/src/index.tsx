import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, LoaderFunctionArgs, redirect, RouterProvider } from "react-router-dom";

import "./styles/index.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import ErrorPage from "./error-page";
import RootPageContainer from "./routes/RootPageContainer";
import GetStartedPage from "./app/pages/GetStartedPage";
import { OnboardProvider } from "@sovryn/onboard-react";
import HomePage from "./app/pages/HomePage";
import { onboard } from "./lib/connector";

const router = createBrowserRouter([
  {
        path: "get-started",
        element: <GetStartedPage />,
        index: true,
  },
  {
    path: "/",
    element: <RootPageContainer />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: connectedWalletLoader,
      }
    ],
  },
]);

function connectedWalletLoader( { request }: LoaderFunctionArgs) {
  console.debug(request)
  const wallets = onboard.state.get().wallets;
  // redirect to 'get-started' page if wallet is not connected
  const isWalletConnected = wallets.length > 0 ;
  if (isWalletConnected) {
    return null;
  } else {
    return redirect("/get-started");
  }
  
}

const container = document.getElementById("root");
if (!container) throw new Error("No root element found");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>}/>
    <OnboardProvider dataAttribute="dapp-onboard" />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
