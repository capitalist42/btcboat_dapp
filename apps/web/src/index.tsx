import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./styles/index.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import ErrorPage from "./error-page";
import RootPageContainer from "./routes/RootPageContainer";
import GetStartedPage from "./app/pages/GetStartedPage";
import OpenLocalAccount from "./app/pages/OpenLocalAccount";
import { OnboardProvider } from "@sovryn/onboard-react";
import HomePage from "./app/pages/HomePage";
import { AutoConnectNetworkProvider } from "./app/context/AutoConnectNetworkProvider";

const router = createBrowserRouter([
  {
    path: "get-started",
    children: [
      { index: true, element: <GetStartedPage /> },
      { path: "open-account", element: <OpenLocalAccount />, },
    ],
  },
  {
    path: "/",
    element: <RootPageContainer />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

const container = document.getElementById("root");
if (!container) throw new Error("No root element found");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AutoConnectNetworkProvider>
      <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
      <OnboardProvider dataAttribute="dapp-onboard" />
    </AutoConnectNetworkProvider>
   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
