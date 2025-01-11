import { useEffect, useState } from "react";
import { getGenreMap, getMovieStills } from "../../../api/axios";
import { Link } from "react-router";
import playIcon from "../../../assets/Play_icon.svg";
import { IMAGE_BASE_URL } from "../../../constants/urls";

export default function TrendingWeeklyItem({ movie }: RecommendProps) {
  const [backdropPath, setBackdropPath] = useState("");
  const [firstGenre, setFirstGenre] = useState<string>("");
  const [secondGenre, setSecondGenre] = useState<string>("");

  useEffect(() => {
    const fetchMovieStills = async () => {
      try {
        const backdrops = await getMovieStills(movie.id);
        if (backdrops && backdrops.length > 0) {
          setBackdropPath(backdrops[5]?.file_path);
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
  }, [movie.id, movie.genre_ids]);

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="w-full h-full  relative overflow-hidden ">
        {/* 그라데이션 오버레이 */}

        <div
          style={{
            background: `linear-gradient(to top, rgba(30, 30, 30, 1) 5%, transparent),
                       linear-gradient(to right, rgba(30, 30, 30, 0.7) 25%, transparent)`,
          }}
          className="absolute top-0 left-0 w-full h-full   z-10
       "
        />
        {/* 영화 정보 */}
        <div className="absolute z-20 top-[200px] text-[#ffffff] font-noto ">
          {/* 영화 장르 */}
          <div className="flex flex-row items-center gap-2 ml-10 text-base font-semibold">
            <p className="bg-black/60 px-4 py-1 rounded-full">{firstGenre}</p>
            <p className="bg-black/60 px-4 py-1 rounded-full">{secondGenre}</p>
          </div>

          {/* 영화 타이툴 */}
          <p
            className={`font-bold ml-10 w-[500px] mt-4
          ${movie.title.length > 20 ? "text-4xl leading-tight" : "text-6xl"}`}
          >
            {movie.title}
          </p>

          {/* 영화 개요 */}
          <p className={`text-xl w-[400px] mt-4 ml-10 text-white/70`}>
            {movie.overview.length < 240 ? movie.overview : `${movie.overview.slice(0, 240)}...`}
          </p>

          <div className="relative flex flex-row items-center mt-4 font-pretendard font-semiBold ml-10">
            <img className="absolute ml-1.5 w- h-5" src={playIcon} alt="재생하기" />
            <p className="px-4 py-1 bg-white text-black rounded-full text-base ">ㅤWatch </p>
          </div>
        </div>

        {/* 영화 스틸이미지 */}
        <img
          className="w-full h-full object-cover"
          src={`${IMAGE_BASE_URL}/original/${backdropPath}`}
          alt={movie.title}
        />
      </div>
    </Link>
  );
}
