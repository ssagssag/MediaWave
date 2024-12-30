import { Link } from "react-router";

export default function TrendingMovieItem({movie, rank}: {movie: MovieItem, rank:number}) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="flex flex-row items-center">

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-[40px] h-[40px] mb-4 rounded-full object-cover"
          />

        <div className="flex flex-col justify-start mb-4">
          <div className="font-pretendard text-white ml-4 flex flex-row items-center gap-2 text-base">
            <p className="font-semiBold">{rank} .</p>
            <h3 className="font-semibold">{movie.title.length < 15 ? movie.title : movie.title.slice(0,10)+"..."}</h3>
          </div>
          <p className="ml-4 font-pretendard text-white/60 text-[12px]">{movie.release_date}</p>
        </div>
      </div>
    </Link>
  )
}
