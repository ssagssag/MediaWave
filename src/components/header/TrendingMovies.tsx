import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../api/axios";

const TrendingMovies = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movies, setMovies] = useState<{ title: string }[]>([]);

  const fetchMovies = async () => {
    try {
      const data = await getTrendingMovies();
      if (data && data.length > 0) {
        setMovies(data);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // 최초 실행
  useEffect(() => {
    fetchMovies();
  }, []);

  // 2.5초마다 다음 영화 제목으로 전환
  useEffect(() => {
    if (!movies.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [movies.length]);

  // 제목 길이 제한 함수
  const truncateTitle = (title: string) => {
    return title?.length > 12 ? `${title.slice(0, 12)}...` : title;
  };

  if (!movies.length) {
    return <div className="h-[30px] text-white">Loading...</div>;
  }

  return (
    <div className="relative flex items-center h-10 w-36">
      {movies.map((movie, index) => (
        <ul
          key={index}
          className={`w-full flex items-center transition-opacity duration-300 
            ${index === currentIndex ? "opacity-100" : "opacity-0 absolute top-0 left-0"}`}
        >
          <li className="mr-2 text-white">{index + 1}</li>
          <li className="text-white truncate">{truncateTitle(movie.title)}</li>
        </ul>
      ))}
    </div>
  );
};

export default TrendingMovies;