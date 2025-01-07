import { useState } from "react";
import searchIcon from "../../../assets/Search_icon.svg";
import searchIcon_focus from "../../../assets/Search_focuse.svg";

export default function SearchBar({searchQuery, onSearch}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex felx-col items-center h-full mx-auto">
      {/* search Bar */}
      <div className="relative w-[30vw] max-w-[600px] min-w-[400px] mt-4">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`
            bg-main-200 w-full h-[46px] rounded-full px-6 
            placeholder:font-pretendard placeholder:text-sm placeholder:text-white/50 placeholder:focus:opacity-0
            focus:outline-none focus:bg-main-100 text-main-500 font-medium
            `}
            type="text"
            placeholder="무엇을 찾고 계신가요?"
          />
          <img
            className="absolute top-[14px] right-[20px] w-4 h-4"
            src={isFocused ? searchIcon_focus : searchIcon}
            alt="검색하기"
          />
        </form>
        {/* 검색 결과 표시 */}
      </div>
    </div>
  );
}
