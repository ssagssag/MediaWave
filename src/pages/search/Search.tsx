import { Link } from "react-router";
import logo from "../../assets/Logo.svg";
import SearchBar from "./components/SearchBar";
import MediaCard from "./components/MediaCard";
import PersonCard from "./components/PersonCard";

export default function Search() {
  return (
    <div className="relative flex flex-col items-center w-full h-auto min-h-screen bg-background">
      <header className={`flex flex-col items-center mt-32`}>
        {/* Logo + SearchBar */}
        <Link to={"/"}>
          <img src={logo} alt="메인으로 돌아가기" className="mb-8 w-80" />
        </Link>
        <SearchBar />
      </header>
      <main>
        {/* 인물 리스트 - todo: 조건부 */}
        <PersonCard />
        {/* 미디어 카드 2단 - todo: 필터링 렌더링 */}
        <MediaCard />
      </main>
    </div>
  );
}
