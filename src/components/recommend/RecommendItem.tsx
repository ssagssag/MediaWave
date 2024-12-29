import { useEffect, useState } from "react";
import { getGenreMap, getMovieStills } from "../../api/axios"
import "../../styles/index.css";
import playIcon from "../../assets/Play_icon.svg";

export default function RecommendItem({movie}:MovieItem) {
  const [backdropPath, setBackdropPath] = useState("");
  const [firstGenre, setFirstGenre] = useState<string>("");
  const [secondGenre, setSecondGenre] = useState<string>("");

  useEffect(() =>{
    const fetchMovieStills = async () => {
      try {
        const backdrops = await getMovieStills(movie.id);
        if (backdrops && backdrops.length > 0) {
          setBackdropPath(backdrops[1].file_path);
        } else {
          console.error("No backdrops available.");
        }

        const genreMap = await getGenreMap();
        const genres = movie.genre_ids.slice(0, 2).map((id: number) => genreMap[id] || "Unknown");

        setFirstGenre(genres[0] || "N/A");
        setSecondGenre(genres[1] || "N/A");

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchMovieStills();
  }, [movie.id, movie.genre_ids])

  return (
    <div className="w-[1000px] h-[600px] rounded-[30px] relative overflow-hidden mt-10">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#1E1E1E]/90 via-[#1E1E1E]/50 to-transparent z-10"/>
      {/* 영화 정보 */}
      <div className="absolute z-20 text-white font-pretendard bottom-[80px]">

        {/* 영화 장르 */}
        <div className="flex flex-row items-center gap-2 ml-10 text-[13px]">
          <p className="bg-black/60 px-4 py-1 rounded-full">{firstGenre}</p>
          <p className="bg-black/60 px-4 py-1 rounded-full">{secondGenre}</p>
        </div>

        {/* 영화 타이툴 */}
        <p className={`font-medium ml-10 w-[400px] mt-6
          ${movie.title.length > 20 ? "text-[30px] leading-tight" : "text-[35px]"}`}>
          {movie.title}
        </p>

        {/* 영화 개요 */}
        <p className={`text-[14px] w-[400px] mt-6 ml-10 text-white/70`}>
          {movie.overview.length < 240 ? movie.overview : `${movie.overview.slice(0,240)}...`}
        </p>
        
        <div className="relative flex flex-row items-center mt-7 font-pretendard font-bold ml-10">
          <img className="absolute ml-1.5 w-6 h-6" src={playIcon} alt="재생하기"/>
          <p className="px-4 py-1 bg-white text-black rounded-full text-[15px]">ㅤWatch </p>
        </div>

      </div>

      {/* 영화 스틸이미지 */}
      <img 
        className="w-full h-full rounded-[30px] object-cover"
        src={`https://image.tmdb.org/t/p/original${backdropPath}`} 
        alt={movie.title} />
    </div>
  )
}
