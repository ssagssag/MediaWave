import { useEffect, useState } from "react";
import { getGenreMap, getMovieStills } from "../../../api/axios";
import { Link, useNavigate } from "react-router";
import playIcon from "../../../assets/Play_icon.svg";
import { IMAGE_BASE_URL } from "../../../constants/urls";
import { RecommendProps } from "../../../types/movie";

export default function TrendingWeeklyItem({ movie }: RecommendProps) {
  const [backdropPath, setBackdropPath] = useState("");
  const [firstGenre, setFirstGenre] = useState<string>("");
  const [secondGenre, setSecondGenre] = useState<string>("");
  const navigate = useNavigate();

  const handleMovetoDetails = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

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
    <div onClick={() => handleMovetoDetails(movie.id)} className="cursor-pointer">
      <div className="relative w-full h-full overflow-hidden ">
        {/* 그라데이션 오버레이 */}

        <div
          style={{
            background: `linear-gradient(to top, rgba(30, 30, 30, 1) 10%, transparent),
                       linear-gradient(to right, rgba(30, 30, 30, 0.7) 25%, transparent)`,
          }}
          className="absolute top-0 left-0 z-10 w-full h-full "
        />
        {/* 영화 정보 */}
        <div className="z-20 absolute top-[200px] left-[50px] text-white ">
          {/* 영화 장르 */}
          <div className="flex flex-row items-center gap-2 ml-10 text-base text-banner-title">
            <p className="px-4 py-1 rounded-full bg-black/60">{firstGenre}</p>
            <p className="px-4 py-1 rounded-full bg-black/60">{secondGenre}</p>
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

          <div className="relative flex flex-row items-center mt-4 ml-10 font-pretendard font-semiBold">
            <img className="absolute ml-1.5 w- h-5" src={playIcon} alt="재생하기" />
            <p className="px-4 py-1 text-base text-black bg-white rounded-full ">ㅤWatch </p>
          </div>
        </div>

        {/* 영화 스틸이미지 */}
        <img
          className="object-cover w-full h-full"
          src={`${IMAGE_BASE_URL}/original/${backdropPath}`}
          alt={movie.title}
        />
      </div>
    </div>
  );
}
