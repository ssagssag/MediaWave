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
      flex items-center justify-center w-full ${className} 
    `}
    >
      <div className="flex justify-between w-full ">
        {/* 로고 */}
        <div className='item-middle gap-20'>
          <button className="w-[150px]"
          onClick={() => navigate("/movie")}>
            <img src={logo} alt="홈으로 가기" />
          </button>
          <CategoryTap activeTab={activeTab} onTabChange={onTabChange} />
        </div>

        <div className="gap-4 item-middle">
          <TrendingMovies />
          <NavUtils />
        </div>
      </div>
    </div>
  );
}
