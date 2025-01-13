import { Link } from "react-router";
import { IMAGE_BASE_URL } from "../../../../constants/urls";
import { useGenreStore } from "../../../../store/GenreStore";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../../api/axios";
import { T_genreMovie, T_genreTv } from "../../../../types/genre";

export default function GenreContent({ content }: { content: "movie" | "tv" }) {
  const movieList = useGenreStore((state) => state.movieList);
  const tvList = useGenreStore((state) => state.tvList);

  const [firstRender, setFirstRender] = useState(true);

  const contentType = useGenreStore((state) => state.contentType);

  const setMovieList = useGenreStore((state) => state.setMovieList);
  const setTvList = useGenreStore((state) => state.setTvList);

  const showingMovieGenreId = useGenreStore((state) => state.showingMovieGenreId);
  const showingTvGenreId = useGenreStore((state) => state.showingTvGenreId);

  const setIsContentsLoading = useGenreStore((state) => state.setIsContentsLoading);

  const getMovieWithGenre = async () => {
    setIsContentsLoading(true);
    const res = await axiosInstance(
      `discover/movie?language=en-US&page=${1}&with_genres=${showingMovieGenreId}&sort_by=popularity.desc`,
    );
    const filteringResult = res.data.results.filter((e: T_genreMovie) => {
      if (e.poster_path) return true;
      return false;
    });
    setMovieList(filteringResult);
    setIsContentsLoading(false);
  };

  const getTvWithGenre = async () => {
    setIsContentsLoading(true);
    const res = await axiosInstance(
      `discover/tv?&language=en-USpage=${1}&with_genres=${showingTvGenreId}&sort_by=popularity.desc`,
    );
    const filteringResult = res.data.results.filter((e: T_genreTv) => {
      if (e.poster_path) return true;
      return false;
    });
    setTvList(filteringResult);
    setIsContentsLoading(false);
  };

  // GenreButton에서 showingMovieGenreId, showingTvGenreId가 바뀌면 axios 다시 실행
  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    } else {
      console.log(showingMovieGenreId);
      contentType === "movie" && getMovieWithGenre();
      contentType === "tv" && getTvWithGenre();
    }
  }, [showingMovieGenreId, showingTvGenreId]);
  return (
    <>
      {content === "movie" && (
        <section className="flex flex-wrap gap-9">
          {movieList.map((movie, idx) => {
            return (
              <article className="w-[calc(100%/6-30px)] h-[20.125rem] rounded-xl" key={idx}>
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`${IMAGE_BASE_URL}original${movie.poster_path}`}
                    alt="영화 포스터 이미지"
                    className="rounded-xl"
                  />
                </Link>
              </article>
            );
          })}
        </section>
      )}
      {content === "tv" && (
        <section className="flex flex-wrap gap-9">
          {tvList.map((tv, idx) => {
            return (
              <article className="w-[calc(100%/6-30px)] h-[20.125rem] rounded-xl" key={idx}>
                <Link to={`/tv/${tv.id}`}>
                  <img
                    src={`${IMAGE_BASE_URL}original${tv.poster_path}`}
                    alt="영화 포스터 이미지"
                    className="rounded-xl"
                  />
                </Link>
              </article>
            );
          })}
        </section>
      )}
    </>
  );
}
