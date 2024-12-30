import { useEffect, useState } from "react";
import { getTVGenres, getTvStills } from "../../api/axios";
import "../../styles/index.css";

import playIcon from "../../assets/Play_icon.svg";

export default function TvPopularItem({item}: TvItemProps) {
  const [backdropPath, setBackdropPath] = useState("");
  const [firstGenre, setFirstGenre] = useState<string>("");
  const [secondGenre, setSecondGenre] = useState<string>("");

  useEffect(() =>{
    const fetchTvStills = async () => {
      try {
        const backdrops = await getTvStills(item.id);

        if (backdrops && backdrops.length > 0) {
          setBackdropPath(backdrops[0].file_path);
          console.log("backdrops:", backdrops);
        } else {
          console.error("No backdrops available.");
        }


        const genreMap = await getTVGenres();
        const genres = item.genre_ids.slice(0, 2).map((id: number) => genreMap[id] || "Unknown");
        setFirstGenre(genres[0] || "N/A");
        setSecondGenre(genres[1] || "N/A");

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchTvStills();
  }, [item.id])

  return (
    
    <div className="w-[1100px] h-[600px] rounded-[30px] relative overflow-hidden mt-10">
      {/* 그라데이션 오버레이 */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#000000] via-[#1E1E1E]/30 to-transparent z-10"/>
      {/* 정보 */}
      <div className="absolute z-20 text-white font-noto bottom-[60px]">

        {/* 장르 */}
        <div className="flex flex-row items-center gap-2 ml-10 text-[13px]">
          <p className="bg-black/60 px-4 py-1 rounded-full">{firstGenre}</p>
          <p className="bg-black/60 px-4 py-1 rounded-full">{secondGenre}</p>
        </div>

        {/* 타이툴 */}
        <p className={`font-extrabold ml-10 w-[500px] mt-4
          ${item.name.length > 20 ? "text-[30px] leading-tight" : "text-[35px]"}`}>
          {item.name}
        </p>

        {/* 개요 */}
        <p className={`text-[13px] w-[400px] mt-4 ml-10 text-white/70`}>
          {item.overview.length < 240 ? item.overview : `${item.overview.slice(0,240)}...`}
        </p>
        
        <div className="relative flex flex-row items-center mt-4 font-pretendard font-semiBold ml-10">
          <img className="absolute ml-1.5 w- h-5" src={playIcon} alt="재생하기"/>
          <p className="px-4 py-1 bg-white text-black rounded-full text-[13px]">ㅤWatch </p>
        </div>

      </div>

      {/* 스틸이미지 */}
      <img 
        className="w-full h-full rounded-[30px] object-cover"
        src={`https://image.tmdb.org/t/p/original${backdropPath}`} 
        alt={item.name} />
    </div>
  )
}
