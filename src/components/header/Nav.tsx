import { useNavigate } from "react-router";
import logo from "../../assets/Logo.svg";
import CategoryTap from "./CategoryTap";
import NavUtils from "./NavUtils";
import TrendingMovies from "./TrendingMovies";

export default function Nav({ className, activeTab, onTabChange }: NavProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`
      flex items-center justify-center w-[1440px]  ${className} px-11 
    `}
    >
      <div className="flex justify-between w-full max-w-[1440px] ">
        {/* 로고 */}
        <button onClick={() => navigate("/movie")}>
          <img src={logo} alt="홈으로 가기" />
        </button>
        {/* 오른쪽 Nav */}
        <div
          className={`
            flex flex-row items-center justify-between w-[1095px]`}
        >
          <CategoryTap activeTab={activeTab} onTabChange={onTabChange} />
          <div className="gap-4 item-middle">
            <TrendingMovies />
            <NavUtils />
          </div>
        </div>
      </div>
    </div>
  );
}
