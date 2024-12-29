import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import NowplayingCard from "./nowPlaying/NowplayingCard";


export default function Nowplaying() {
  const [nowPlaying, setNowPlaying] = useState<MovieItem[]>([]);

  const getMovieNowPlaying = async () => {
    const {data: {results}} = await axiosInstance.get("/movie/now_playing");
    setNowPlaying(results);
    console.log(results);
  };

  useEffect(() => {
    getMovieNowPlaying();
  },[]);

  return (
    <div className="mt-8">
      {/* 카테고리 타이틀 */}
      <h1 className="font-pretendard font-bold text-white text-[24px]"> Now Playing</h1>

      {/* 카테고리 카드 */}
      <NowplayingCard movies={nowPlaying}/>
    </div>
  )
}
