import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import PosterCard from "./poster/PosterCard";

export default function Popular() {
  const [popular, setPopular] = useState<MovieItem[]>([]);

  const getMoviePopular = async () => {
    const {data: {results}} = await axiosInstance.get("/movie/popular");
    const sortedPopularity = results.sort((a:MovieItem, b:MovieItem) => b.popularity - a.popularity);

    setPopular(sortedPopularity);
  };

  useEffect(()=>{
    getMoviePopular();
  },[])
  

  return (
    <div className=" bg-slate-300/10 p-16 rounded-3xl mt-10 border-2 border-white/50 backdrop-blur-md">
      {/* 카테고리 타이틀 */}
      <h1 className="font-pretendard font-bold text-white text-[24px]"> Popular</h1>

      {/* 카테고리 카드 */}
      <PosterCard cards={popular}/>
    </div>
  )
}
