import { useState } from "react";
import searchIcon from "../assets/Search_icon.svg";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");


  return (
    <div className="relative w-[350px] h-[40px]">
      <form action="">
        <input 
          value={searchQuery}
          className={`
            bg-slate-400/30 
            placeholder:font-pretendard placeholder:text-sm 
            px-6 focus:outline-none placeholder:text-white/50
            w-full h-[40px] rounded-full`}
          type="text"
          placeholder="무엇을 찾고 계신가요?"
        />
          <img className="absolute top-2 right-4 opacity-60" src={searchIcon} alt="검색하기"/>
      </form>
    </div>
  )
}
