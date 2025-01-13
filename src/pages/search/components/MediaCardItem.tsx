import { useNavigate } from "react-router";

export default function MediaCardItem({ item }: MediaCardItemProps) {
  const title = 
    item.media_type === "movie" 
      ? item.title || "Untitled Movie"  
      : item.name|| "Untitled TV";
  const isLongTitle = title.length > 8;
  const nav = useNavigate();

  return (
    <div
    onClick={() => 
      item.media_type === "movie" 
        ? nav(`/movie/${item.id}`) 
        : nav(`/tv/${item.id}`) } 
    className="flex flex-row items-center gap-6 w-full max-w-full px-10 cursor-pointer">
      {/* 영화 poster 영역 */}
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={title}
        className="bg-main-300 w-[150px] h-[220px] rounded-xl flex-shrink-0"
      />
      {/* 영화 info 영역 */}
      <div
        className={`
        flex flex-col justify-between flex-1 
        h-full  
        font-sans text-white
      `}
      >
        {/* 영화 info content */}
        <div className="w-full sm:w-100% max-w-[100%]">
          <p className={`font-bold ${isLongTitle ? "text-2xl" : "text-3xl"} w-[40vw] sm:w-[15vw] mb-2`}>{title}</p>
          <p className="bg-main-400/50 w-16 text-center rounded-full py-1 px-1 text-xs">
            {item.media_type === "movie" ? "Movie" : "TV"}
          </p>
        </div>

        <div className="overflow-hidden">
          <p className="text-sm text-white/70 line-clamp-4 ">
            {item.overview.length < 300 
              ? item.overview 
              : item.overview.slice(0, 220) + "..."}
          </p>
        </div>

      </div>
    </div>
  );
}
