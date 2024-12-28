import searchIcon from "../assets/Search_icon.svg";

export default function SearchBar() {
  return (
    <div className="relative w-[300px] h-[40px]">
      <form action="">
        <input 
          className={`
            bg-[#080808]
            placeholder:font-pretendard placeholder:text-[13px]
            px-4 pb-1 focus:outline-none placeholder:text-white/50
            w-[300px] h-[40px] rounded-full`}
          type="text"
          placeholder="어떤 것을 찾고 계신가요?"
        />
          <img className="absolute top-2 left-[265px] opacity-40" src={searchIcon} alt="검색하기"/>
      </form>
    </div>
  )
}
