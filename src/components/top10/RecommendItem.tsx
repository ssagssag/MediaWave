import { useEffect, useState } from "react";
import { getGenreMap, getMovieStills } from "../../api/axios"
import "../../styles/index.css";

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
    <div className="w-[850px] h-[500px] rounded-[30px] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#1E1E1E]/90 via-[#1E1E1E]/50 to-transparent z-10"/>
      {/* 영화 정보 */}
      <div className="absolute z-20 text-white font-pretendard">

        {/* 영화 장르 */}
        <div className="flex flex-row items-center gap-2 mt-[200px] ml-10 text-[13px]">
          <p className="bg-black/60 px-4 py-1 rounded-full">{firstGenre}</p>
          <p className="bg-black/60 px-4 py-1 rounded-full">{secondGenre}</p>
        </div>

        {/* 영화 타이툴 */}
        <p className={`font-medium ml-10 w-[400px] mt-2
          ${movie.title.length > 20 ? "text-[30px] leading-tight" : "text-[35px]"}`}>
          {movie.title}
        </p>

        {/* 영화 개요 */}
        <p className={`text-[14px] w-[400px] mt-3 ml-10 text-white/70`}>
          {movie.overview.length < 200 ? movie.overview : `${movie.overview.slice(0,200)}...`}
        </p>

      </div>

      {/* 영화 스틸이미지 */}
      <img 
        className="w-[850px] h-[500px] rounded-[30px] object-cover"
        src={`https://image.tmdb.org/t/p/original${backdropPath}`} 
        alt={movie.title} />
    </div>
  )
}
