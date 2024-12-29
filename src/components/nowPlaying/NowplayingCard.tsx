import { useState } from "react";
import NowplayingCardItem from "./NowplayingCardItem";

export default function NowplayingCard({ movies }:{ movies: MovieItem[] }) {
  const [showAll, setShowAll] = useState(false);

  const displayedMovies = showAll ? movies : movies.slice(0,12);

  return (
    <div className="mt-4 relative">
      {/* see All */}
      {movies.length > 12 && (
        <div className="absolute  top-[-40px] left-[1260px] text-center">
          <button
            className="px-5 py-1 bg-white/10 text-white rounded-full font-pretendard text-[13px]"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "숨기기" : "더보기"}
          </button>
        </div>
      )}
      <div className="grid grid-cols-6">
        {displayedMovies.map((movie) => (
          <NowplayingCardItem movie={movie} key={movie.id}/>
        ))}
      </div>
    </div>
  )
}
