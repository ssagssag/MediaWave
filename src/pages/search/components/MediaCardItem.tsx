export default function MediaCardItem({ item }: MediaCardItemProps) {
  const title = item.media_type === "movie" ? item.title : item.name;
  const isLongTitle = title.length > 8;

  return (
    <div className="flex flex-row items-center gap-8 w-[25vw] cursor-pointer">
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={title}
        className="bg-main-300 w-[150px] h-[220px] rounded-2xl"
      />
      <div className="flex flex-col justify-between w-[150px] h-[220px] font-sans text-white">
        <div className="w-[15vw]">
          <p className={`font-bold ${isLongTitle ? "text-2xl" : "text-3xl"} w-[15vw] mb-2`}>{title}</p>
          <p className="bg-main-400/50 w-16 text-center rounded-full py-1 px-1 text-xs">
            {item.media_type === "movie" ? "Movie" : "TV"}
          </p>
        </div>

        <div className="w-[15vw] overflow-hidden">
          <p className="text-sm text-white/70 ">
            {item.overview.length < 100 ? item.overview : item.overview.slice(0, 180) + "..."}
          </p>
        </div>
      </div>
    </div>
  );
}
