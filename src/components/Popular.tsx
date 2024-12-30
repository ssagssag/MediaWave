import { useEffect, useState } from "react";
import PosterCard from "./poster/PosterCard";
import { getMoviePopular } from "../api/axios";

export default function Popular() {
  const [popular, setPopular] = useState<MovieItem[]>([]);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const popularData = await getMoviePopular(); 
        setPopular(popularData); 
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchPopular();
  }, []); 

  return (
    <div className=" bg-slate-300/10 p-16 rounded-3xl mt-10 border-2 border-white/50 backdrop-blur-md">
      {/* 카테고리 타이틀 */}
      <h1 className="font-pretendard font-bold text-white text-[24px]"> Popular</h1>

      {/* 카테고리 카드 */}
      <PosterCard cards={popular}/>
    </div>
  )
}
