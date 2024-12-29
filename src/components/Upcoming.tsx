import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import PosterCard from "./poster/PosterCard";

export default function Upcoming() {
  const [upcoming, setUpcoming] = useState<MovieItem[]>([]);

  const getMovieUpcoming = async () => {
    const {data: {results}} = await axiosInstance.get("/movie/upcoming");
    
    const sortedRelease = results.sort((a: MovieItem, b:MovieItem) => {
      return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
    });

    setUpcoming(sortedRelease);
    console.log(results)
  };

  useEffect(() => {
    getMovieUpcoming();
  },[]);

  return (
    <div className=" bg-slate-300/10 p-16 rounded-3xl mt-10 border-2 border-white/50 backdrop-blur-md">
      {/* 카테고리 타이틀 */}
      <h1 className="font-pretendard font-bold text-white text-[24px]"> Upcoming</h1>

      {/* 카테고리 카드 */}
      <PosterCard cards={upcoming}/>
    </div>
  )
}
