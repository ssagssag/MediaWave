import SearchBar from "./SearchBar";

export default function Nav() {
  return (
    <div className={`
      flex flex-row items-center justify-center absolute z-[999] bg-transparent gap-7
      w-full mt-12
    `}>
      <SearchBar />
      <div
        className={`
        flex flex-row items-center gap-8 w-[1000px]
        font-pretendard font-medium text-[20px] text-white`}
      >
        <p className="bg-white/15 px-6 py-1.5 rounded-full">Movies</p>
        <p>TV Series</p>
      </div>
    </div>
  );
}
