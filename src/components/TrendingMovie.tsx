import { useEffect, useState } from "react"
import { getTrendingMovie } from "../api/axios";
import TrendingMovieItem from "./TrendingMovieItem";

export default function TrendingMovie() {
  const [trendingMovies, setTrendingMovies] = useState<MovieItem[]>([]);


  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try{
        const data = await getTrendingMovie('day');
        const rank5 = data.slice(0,10);
        setTrendingMovies(rank5);
      }catch(error){
        console.error("fetching error trendingMovie:", error);
      }
    }
    fetchTrendingMovies();
  },[])
  
  return (
    <div className={`
        w-full h-full grid grid-cols-1 bg-white/15 p-6 rounded-2xl 
        shadow-md backdrop-blur-md border-2 border-white/50 `}>

      <h1 className="font-pretendard font-semiBold text-white text-[24px] flex items-center justify-center"> Today's Hot 🔥 </h1>
      <hr className="border-t-[2px] border-white/50 mt-4 rounded-full" />
      <div className="mt-6 ml-6 overflow-y-auto scrollbar-hide">
        {trendingMovies.map((movie, index) => (
          <TrendingMovieItem key={movie.id} movie={movie} rank={index + 1}/>
        ))}
      </div>
    </div>
  )
}
