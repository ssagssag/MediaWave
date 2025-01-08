import { Outlet } from "react-router";
import Nav from "../components/header/Nav";
import { useState } from "react";
import ScrollToTop from "../components/scroll-button/ScrollToTop";

export default function RootLayout() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="relative flex flex-col items-center w-full min-h-screen bg-background">
      <header className="fixed top-0 left-0 z-50 w-full backdrop-blur-lg">
        <div className="mx-auto max-w-[1520px] px-10 py-5">
          <Nav onTabChange={setActiveTab} activeTab={activeTab} />
        </div>
      </header>

      <main className="z-0 mx-auto w-full max-w-[1520px] px-10 pt-[80px] bg-background">
        <Outlet context={{ activeTab }} />
      </main>

      <ScrollToTop />
    </div>
  );
}
