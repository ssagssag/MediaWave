import { useState } from "react";

import PosterCardItem from "./PosterCardItem";

export default function PosterCard({ cards }:PosterCardProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedPosters = showAll ? cards : cards.slice(0,5);

  return (
    <div className="mt-4 relative ">
      {/* see All */}
      {cards.length > 5 && (
        <div className="absolute top-[-40px] left-[1162px] text-center">
          <button
            className="px-4 py-1 hover:bg-white/10 text-white rounded-full font-pretendard text-[13px]"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "숨기기" : "더보기"}
          </button>
        </div>
      )}
      <div className="grid grid-cols-5 gap-6 justify-items-center">
        {displayedPosters.map((item) => (
          <PosterCardItem item={item} key={item.id}/>
        ))}
      </div>
    </div>
  )
}
