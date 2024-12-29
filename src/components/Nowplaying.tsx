import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";

import PosterCard from "./poster/PosterCard";


export default function Nowplaying() {
  const [nowPlaying, setNowPlaying] = useState<MovieItem[]>([]);

  const getMovieNowPlaying = async () => {
    const {data: {results}} = await axiosInstance.get("/movie/now_playing");

    setNowPlaying(results);
  };

  useEffect(() => {
    getMovieNowPlaying();
  },[]);

  return (
    <div className=" bg-slate-300/10 p-16 rounded-3xl mt-3 border-2 border-white/50 backdrop-blur-md">
      {/* 카테고리 타이틀 */}
      <h1 className="font-pretendard font-bold text-white text-[24px]"> Now Playing</h1>

      {/* 카테고리 카드 */}
      <PosterCard cards={nowPlaying}/>
    </div>
  )
}
