import { useEffect, useState } from "react";

import PosterCard from "./poster/PosterCard";
import { getMovieUpcoming } from "../api/axios";


export default function Nowplaying() {
  const [nowPlaying, setNowPlaying] = useState<MovieItem[]>([]);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try{
        const nowPlayingData = await getMovieUpcoming();
        setNowPlaying(nowPlayingData);
      }catch(error){
        console.error("Error fetching now Playing:", error);
      }
    };
    fetchNowPlaying();
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
