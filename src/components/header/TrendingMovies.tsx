import { useState, useEffect, useRef } from "react";
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
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const fetchMovies = async () => {
    try {
      const data = await getTrendingMovies();
      if (data && data.length > 0) {
        setMovies(data);
      }
    } catch (error) {
      console.error("getTrendingMovies 요청 실패", error);
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

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showModal]);

  const truncateTitle = (title: string = ""): string => {
    return title.length > 12 ? `${title.slice(0, 12)}...` : title;
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  if (!movies.length) {
    return <div className="h-[30px] text-white">Loading...</div>;
  }

  return (
    <div className="relative flex items-center h-10">
      {/* 일간 순위 */}
      <div 
        ref={buttonRef}
        className="w-36 relative cursor-pointer" 
        onClick={toggleModal}
      >
        {movies.map((movie, index) => (
          <div
            key={index}
            className={`w-full flex items-center transition-opacity duration-300 gap-2
              ${index === currentIndex ? "opacity-100" : "opacity-0 absolute top-0 left-0"}`}
          >
            <span className="inline-flex items-center justify-center w-[30px] h-[30px] bg-white/10 rounded text-white text-info-sm flex-shrink-0">
              {index + 1}
            </span>
            <span className="text-white truncate border-b border-b-white/15 block w-full py-1">
              {truncateTitle(movie.title)}
            </span>
          </div>
        ))}
      </div>

      {/* 클릭시 나타나는 모달 */}
      {showModal && (
        <div 
          ref={modalRef}
          className="absolute top-12 left-0 w-64 bg-white/30 rounded-xl overflow-hidden border border-white/20 backdrop-blur-lg z-50"
        >
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