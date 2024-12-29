import SearchBar from "./SearchBar";
import logo from "../assets/Logo.svg";

export default function Nav({className}:classNameProps) {
  return (
    <div className={`
      flex items-center justify-center w-[1440px] mt-12 ${className} px-11
    `}>
      <div className="flex justify-between w-full max-w-[1440px] ">
        {/* 로고 */}
        <img src={logo} alt="홈으로 가기"/>
        {/* 오른쪽 Nav */}
        <div
          className={`
            flex flex-row items-center justify-between w-[1095px]
            font-pretendard font-medium text-[18px] text-white`}
            >
          {/* 카테고리 탭 */}
          <div className="flex flex-row items-center gap-8  ">
            <p className="bg-white/40 px-6 py-1.5 rounded-full">Movies</p>
            <p>TV Series</p>
            <p>Animation</p>
          </div>
          {/* 검색바 */}
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
