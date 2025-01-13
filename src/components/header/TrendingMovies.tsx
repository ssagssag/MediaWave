import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../api/axios";
import { Link } from "react-router-dom";

interface MovieItem {
  id: number;
  title: string;
}

const TrendingMovies = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchMovies = async () => {
    try {
      const data = await getTrendingMovies();
      if (data && data.length > 0) {
        setMovies(data);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (!movies.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [movies.length]);

  const truncateTitle = (title: string = ""): string => {
    return title.length > 12 ? `${title.slice(0, 12)}...` : title;
  };

  if (!movies.length) {
    return <div className="h-[30px] text-white">Loading...</div>;
  }

  return (
    <div
      className="relative flex items-center h-10"
      onMouseEnter={() => setShowModal(true)}
      onMouseLeave={() => setShowModal(false)}
    >
      {/* 일간 순위 */}
      <div className="w-36 relative">
        {movies.map((movie, index) => (
          <Link
            to={`/movie/${movie.id}`}
            key={index}
            className={`w-full flex items-center transition-opacity duration-300 cursor-pointer gap-2
              ${index === currentIndex ? "opacity-100" : "opacity-0 absolute top-0 left-0"}`}
          >
            <span className="inline-flex items-center justify-center w-[30px] h-[30px] bg-white/10 rounded text-white text-info-sm flex-shrink-0">
              {index + 1}
            </span>
            <span className="text-white truncate border-b border-b-white/15 block w-full py-1">
              {truncateTitle(movie.title)}
            </span>
          </Link>
        ))}
      </div>

      {/* hover 모달 */}
      {showModal && (
        <div className="absolute top-12 left-0 w-64 bg-white/30 rounded-xl overflow-hidden border border-white/20 backdrop-blur-lg z-50">
          {movies.slice(0, 10).map((movie, index) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="flex items-center px-4 py-3 hover:bg-white/10 transition-colors"
            >
              <span className="mr-3 w-6 h-6 flex items-center justify-center bg-white/30 rounded-full text-white text-info-sm backdrop-blur-lg">
                {index + 1}
              </span>
              <span className="text-white text-sm">{movie.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingMovies;
