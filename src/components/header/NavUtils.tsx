import { useState } from "react";
import searchIcon from "../../assets/Search_icon.svg";
import userIcon from "../../assets/user.png";
import { Link } from "react-router-dom";

const NavUtils = () => {
  const [language, _] = useState();

  return (
    <div className="gap-4 item-middle" aria-label="button-wrapper">
      <button className="w-12 h-12 rounded-full item-middle bg-white/40">
        <span className="text-white">{language === "ko" ? "KO" : "EN"}</span>
      </button>
      <Link to="/search" className="w-12 h-12 rounded-full item-middle bg-white/40">
        <img src={searchIcon} alt="검색 바로가기" />
      </Link>
      <Link to="/mypage" className="w-12 h-12 overflow-hidden rounded-full item-middle">
        <img src={userIcon} alt="마이페이지 바로가기" className="w-full h-full" />
      </Link>
    </div>
  );
};

export default NavUtils;