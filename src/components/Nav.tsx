import SearchBar from "./SearchBar";

export default function Nav({className}:classNameProps) {
  return (
    <div className={`
      flex flex-row items-center justify-center gap-7
      w-full mt-12 ${className}
    `}>
      <SearchBar />
      <div
        className={`
        flex flex-row items-center gap-8 w-[1000px]
        font-pretendard font-medium text-[18px] text-white`}
      >
        <p className="bg-white/15 px-6 py-1.5 rounded-full">Movies</p>
        <p>TV Series</p>
      </div>
    </div>
  );
}
