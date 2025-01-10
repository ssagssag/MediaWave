import { Outlet, useLocation } from "react-router";
import Nav from "../components/header/Nav";
import { useState } from "react";
import ScrollToTop from "../components/scroll-button/ScrollToTop";
import PersonDetailModal from "../components/person-detail/PersonDetailModal";
import { usePersonDetailModalStore } from "../store/PersonDetailModalStore";

export default function RootLayout() {
  const [activeTab, setActiveTab] = useState(0);
  const location = useLocation();

  const personId = usePersonDetailModalStore((state) => state.personId);

  // detail 페이지인 경우 padding을 없애야 하므로 예외 처리 (배경 포스터)
  const isDetailPage = location.pathname.includes("/movie/") || location.pathname.includes("/details/movie/");

  // PersonDetailModal 오픈 트리거
  const isPersonaDetailModalOpen = usePersonDetailModalStore((state) => state.isPersonaDetailModalOpen);

  return (
    <div className="relative flex flex-col items-center w-full min-h-screen bg-background">
      <header className="fixed top-0 left-0 z-50 w-full backdrop-blur-md">
        <div className="mx-auto max-w-[1520px] py-5 max-[1519px]:px-10">
          <Nav onTabChange={setActiveTab} activeTab={activeTab} />
        </div>
      </header>

      <main
        className={`
        z-0 mx-auto w-full max-w-[1520px] pt-[80px] bg-background
        ${isDetailPage ? "" : "px-10"}
      `}
      >
        <Outlet context={{ activeTab }} />
      </main>

      <ScrollToTop />
      {isPersonaDetailModalOpen && <PersonDetailModal personId={personId} />}
    </div>
  );
}
