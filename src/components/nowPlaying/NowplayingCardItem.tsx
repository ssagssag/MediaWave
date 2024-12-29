import { useEffect, useState } from "react";


export default function NowplayingCardItem({movie}:MovieItem) {
  const [poster, setPoster] = useState("");

  useEffect(() => {
    console.log("Movie object:", movie);
    setPoster(movie.poster_path);
  },[movie.id])

  return (
    <div className="w-[200px] h-[280px] bg-white rounded-xl overflow-hidden mb-7">
      <img
        className="object-cover object-center" 
        src={`https://image.tmdb.org/t/p/original${poster}`}  alt={movie.title}/>
    </div>
  )
}
