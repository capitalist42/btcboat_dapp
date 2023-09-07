import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import "./styles/index.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import ErrorPage from "./error-page";
import RootPageContainer from "./routes/RootPageContainer";
import GetStartedPage from "./pages/GetStartedPage";
import OpenLocalAccount from "./pages/OpenLocalAccount";
import { OnboardProvider } from "@sovryn/onboard-react";
import AccountPage from "./pages/AccountPage";
import { AutoConnectNetworkProvider } from "./context/AutoConnectNetworkProvider";
import { IndividualAccountStoreProvider } from "./context/IndividualAccountStoreProvider";
import { RelaySystemProvider } from "./context/RelaySystemProvider";

const IS_IPFS_BUILD = true;

const routes = [
  {
    path: "get-started",
    children: [
      { index: true, element: <GetStartedPage /> },
      { path: "open-account", element: <OpenLocalAccount /> },
    ],
  },
  {
    path: "/account",
    element: <RootPageContainer />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AccountPage />,
      },
    ],
  },
];

const createRouter = IS_IPFS_BUILD ? createHashRouter : createBrowserRouter;

const router = createRouter(routes);

const container = document.getElementById("root");
if (!container) throw new Error("No root element found");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AutoConnectNetworkProvider>
      <RelaySystemProvider>
        <IndividualAccountStoreProvider>
          <RouterProvider
            router={router}
            fallbackElement={<p>Initial Load...</p>}
          />
          <OnboardProvider dataAttribute="dapp-onboard" />
        </IndividualAccountStoreProvider>
      </RelaySystemProvider>
    </AutoConnectNetworkProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
