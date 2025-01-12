import { Link } from "react-router-dom";
import { MovieItem } from "../../../types/movie";
import { TvItem } from "../../../types/tv";
import SimilarMoviesSwiper from "./SimilarMoviesSwiper";

interface SimilarMoviesProps {
  movies: (TvItem | MovieItem)[];
}

export default function SimilarMovies({ movies }: SimilarMoviesProps) {
  const renderMovie = (movie: MovieItem | TvItem) => {
    const title = 'title' in movie ? movie.title : movie.name;
    const releaseDate = 'release_date' in movie ? movie.release_date : movie.first_air_date;
    const link = 'title' in movie ? `/movie/${movie.id}` : `/tv/${movie.id}`;
    
    return (
      <Link
        to={link}
        className="block p-2 cursor-pointer"
      >
        <div className="relative overflow-hidden rounded-3xl aspect-[2/3]">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300"
          />
        </div>
        <h3 className="mt-2 font-semibold text-white truncate text-info-lg">
          {title}
        </h3>
        <p className="text-info-base text-white/70">
          {new Date(releaseDate).getFullYear()}
        </p>
      </Link>
    );
  };

  return (
    <div className="w-full max-w-[1520px] mx-auto max-[1519px]:p-8 py-12">
      <h2 className="mb-6 text-2xl font-bold text-white">You May Also Like</h2>
      <SimilarMoviesSwiper
        data={movies}
        renderItem={renderMovie}
        autoplay={true}
        delay={3000}
        loop={true}
        slidesPerView={5}
        slidesPerGroup={5}
        speed={1000}
        unique="similar-movies"
      />
    </div>
  );
}