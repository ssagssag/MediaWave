import { useEffect } from "react";
import { axiosInstance } from "../../api/axios";
import GenreContentSkeleton from "./components/skeleton/GenreContentSkeleton";
import { useGenreStore } from "../../store/GenreStore";
import GenreButtonList from "./components/top/GenreButtonList";
import ContentButtonList from "./components/top/ContentButtonList";
import GenreContent from "./components/content/GenreContent";
import GenreButtonListSkeleton from "./components/skeleton/GenreButtonListSkeleton";
import { T_genreMovie, T_genreTv } from "../../types/genre";

export default function Genre() {
  const isContentsLoading = useGenreStore((state) => state.isContentsLoading);
  const isGenreLoading = useGenreStore((state) => state.isGenreLoading);

  const setIsContentsLoading = useGenreStore((state) => state.setIsContentsLoading);
  const setIsGenreLoading = useGenreStore((state) => state.setIsGenreLoading);

  const setMovieGenreList = useGenreStore((state) => state.setMovieGenreList);
  const setTvGenreList = useGenreStore((state) => state.setTvGenreList);

  const contentType = useGenreStore((state) => state.contentType);

  const setMovieList = useGenreStore((state) => state.setMovieList);
  const setTvList = useGenreStore((state) => state.setTvList);

  const getMovieGenre = async () => {
    setIsGenreLoading(true);
    const res = await axiosInstance.get(`/genre/movie/list?language=en`);
    console.log("영화장르", res.data.genres);
    setMovieGenreList(res.data.genres);
    setIsGenreLoading(false);
  };

  const getTvGenre = async () => {
    setIsGenreLoading(true);
    const res = await axiosInstance.get(`/genre/tv/list?language=en`);
    console.log("tv장르", res.data.genres);
    setTvGenreList(res.data.genres);
    setIsGenreLoading(false);
  };

  const getMovieWithGenre = async () => {
    setIsContentsLoading(true);
    const res = await axiosInstance(
      `discover/movie?language=en-US&page=${1}&with_genres=${[]}&sort_by=popularity.desc`,
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
    const res = await axiosInstance(`discover/tv?&language=en-USpage=${1}&with_genres=${[]}&sort_by=popularity.desc`);
    const filteringResult = res.data.results.filter((e: T_genreTv) => {
      if (e.poster_path) return true;
      return false;
    });
    setTvList(filteringResult);
    console.log("장르별 tv", res.data.results);
    setIsContentsLoading(false);
  };

  useEffect(() => {
    getMovieGenre();
    getTvGenre();
    getMovieWithGenre();
    getTvWithGenre();
  }, []);

  return (
    <section className="w-full max-w-[1440px] mx-auto mt-[146px]">
      <h2 className="text-white text-title-3xl mb-10">Genre</h2>
      {/* 컨텐츠 버튼 */}
      <ContentButtonList />
      {/* 장르 버튼*/}
      <article className="flex gap-4 flex-wrap mb-[5.625rem]">
        {/* 일반 버튼 */}

        {isGenreLoading ? (
          <GenreButtonListSkeleton />
        ) : (
          <>
            {contentType === "movie" && <GenreButtonList content={"movie"} />}
            {contentType === "tv" && <GenreButtonList content={"tv"} />}
          </>
        )}
      </article>
      {/* 컨텐츠 */}
      {isContentsLoading ? (
        <GenreContentSkeleton />
      ) : (
        <>
          {contentType === "movie" && <GenreContent content={"movie"} />}
          {contentType === "tv" && <GenreContent content={"tv"} />}
        </>
      )}
    </section>
  );
}
