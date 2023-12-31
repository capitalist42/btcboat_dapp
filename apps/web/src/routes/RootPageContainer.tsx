import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RootPageContainer(): JSX.Element {
  return (
    <div className="h-full bg-gray-700">
      <div className="py-0">
        <Header />
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-10">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
