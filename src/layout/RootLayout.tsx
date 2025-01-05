import { Outlet } from "react-router";
import Nav from "../components/Nav";
import { useState } from "react";

export default function RootLayout() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className={`w-full relative  flex flex-col items-center bg-main-800  min-h-screen`}>
        <header className="w-full fixed top-0 left-0 z-50  px-10 py-5  bg-main-900 ">
          <Nav onTabChange={setActiveTab} activeTab={activeTab} />
        </header>

        <main className=" z-0 mt-[80px]">
          <Outlet context={{ activeTab }} />
        </main>
      </div>
    </>
  );
}
