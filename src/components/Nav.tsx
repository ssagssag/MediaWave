import logo from "../assets/Logo.svg";
import CategoryTap from "./CategoryTap";
import SearchBar from "../pages/search/components/SearchBar";

export default function Nav({ className, activeTab, onTabChange }: NavProps) {
  return (
    <div
      className={`
      flex items-center justify-center w-[1440px] mt-12 ${className} px-11
    `}
    >
      <div className="flex justify-between w-full max-w-[1440px] ">
        {/* 로고 */}
        <img src={logo} alt="홈으로 가기" />
        {/* 오른쪽 Nav */}
        <div
          className={`
            flex flex-row items-center justify-between w-[1095px]`}
        >
          <CategoryTap activeTab={activeTab} onTabChange={onTabChange} />
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
