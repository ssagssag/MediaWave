import BaseSwiper from "../../../components/swiper/BaseSwiper";

interface SimilarMoviesProps {
  movies: MovieItem[];
}

export default function SimilarMovies({ movies }: SimilarMoviesProps) {
  // 각 영화 카드 렌더링 함수
  const renderMovie = (movie: MovieItem) => (
    <div className="p-2">
      <div className="relative overflow-hidden rounded-lg aspect-[2/3]">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
        />
      </div>
      <h3 className="mt-2 text-lg font-semibold text-white truncate">{movie.title}</h3>
      <p className="text-sm text-white/70">{new Date(movie.release_date).getFullYear()}</p>
    </div>
  );

  return (
    <div className="w-full max-w-[1520px] mx-auto px-8 py-12">
      <h2 className="mb-6 text-2xl font-bold text-white">비슷한 영화 추천</h2>
      <BaseSwiper
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
