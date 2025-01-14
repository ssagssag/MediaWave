import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../api/axios";
import GenreContentSkeleton from "./components/skeleton/GenreContentSkeleton";
import { useGenreStore } from "../../store/GenreStore";
import GenreButtonList from "./components/top/GenreButtonList";
import ContentButtonList from "./components/top/ContentButtonList";
import GenreContent from "./components/content/GenreContent";
import GenreButtonListSkeleton from "./components/skeleton/GenreButtonListSkeleton";
import { T_genreMovie, T_genreTv } from "../../types/genre";

export default function Genre() {
  const [firstRender, setFirstRender] = useState(true);

  const isContentsLoading = useGenreStore((state) => state.isContentsLoading);
  const isGenreLoading = useGenreStore((state) => state.isGenreLoading);

  const setIsContentsLoading = useGenreStore((state) => state.setIsContentsLoading);
  const setIsGenreLoading = useGenreStore((state) => state.setIsGenreLoading);

  const setMovieGenreList = useGenreStore((state) => state.setMovieGenreList);
  const setTvGenreList = useGenreStore((state) => state.setTvGenreList);

  const contentType = useGenreStore((state) => state.contentType);

  const movieList = useGenreStore((state) => state.movieList);
  const tvList = useGenreStore((state) => state.tvList);

  const setMovieList = useGenreStore((state) => state.setMovieList);
  const setTvList = useGenreStore((state) => state.setTvList);

  const showingMovieGenreId = useGenreStore((state) => state.showingMovieGenreId);
  const showingTvGenreId = useGenreStore((state) => state.showingTvGenreId);

  // const moviePage = useGenreStore((state) => state.moviePage);
  // const tvPage = useGenreStore((state) => state.tvPage);

  // const plusMoviePage = useGenreStore((state) => state.plusMoviePage);
  // const plusTvPage = useGenreStore((state) => state.plusTvPage);

  const page = useGenreStore((state) => state.page);
  const plusPage = useGenreStore((state) => state.plusPage);

  const observerRef = useRef<HTMLDivElement>(null);

  const scrollObserverHandler = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !isGenreLoading && !isContentsLoading) {
      plusPage();
    }
  };

  const getMovieGenre = async () => {
    setIsGenreLoading(true);
    const res = await axiosInstance.get(`/genre/movie/list?language=en`);
    setMovieGenreList(res.data.genres);
    setIsGenreLoading(false);
  };

  const getTvGenre = async () => {
    setIsGenreLoading(true);
    const res = await axiosInstance.get(`/genre/tv/list?language=en`);
    setTvGenreList(res.data.genres);
    setIsGenreLoading(false);
  };

  // Movie 첫 페이지 가져오기
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

  // TV 첫 페이지 가져오기
  const getTvWithGenre = async () => {
    setIsContentsLoading(true);
    const res = await axiosInstance(`discover/tv?&language=en-USpage=${1}&with_genres=${[]}&sort_by=popularity.desc`);
    const filteringResult = res.data.results.filter((e: T_genreTv) => {
      if (e.poster_path) return true;
      return false;
    });
    setTvList(filteringResult);
    setIsContentsLoading(false);
  };

  // movie 페이지 추가하기
  const addMovieWithGenre = async (page: number) => {
    setIsContentsLoading(true);
    const res = await axiosInstance(
      `discover/movie?language=en-US&page=${page}&with_genres=${showingMovieGenreId}&sort_by=popularity.desc`,
    );
    const filteringResult = res.data.results.filter((e: T_genreMovie) => {
      if (e.poster_path) return true;
      return false;
    });
    const updatedMovieList = [...movieList, ...filteringResult];
    setMovieList(updatedMovieList);
    setIsContentsLoading(false);
  };

  // tv 페이지 추가하기
  const addTvWithGenre = async (page: number) => {
    setIsContentsLoading(true);
    const res = await axiosInstance(
      `discover/tv?&language=en-US&page=${page}&with_genres=${showingTvGenreId}&sort_by=popularity.desc`,
    );
    console.log(`discover/tv?&language=en-US&page=${page}&with_genres=${showingTvGenreId}&sort_by=popularity.desc`);
    const filteringResult = res.data.results.filter((e: T_genreTv) => {
      if (e.poster_path) return true;
      return false;
    });
    const updatedTvList = [...tvList, ...filteringResult];
    setTvList(updatedTvList);
    setIsContentsLoading(false);
  };

  // scrollY 저장 기능
  const scrollYHandler = () => {
    sessionStorage.setItem("genreScroll", window.scrollY.toString());
  };

  useEffect(() => {
    getMovieGenre();
    getTvGenre();
    getMovieWithGenre();
    getTvWithGenre();

    window.addEventListener("scroll", scrollYHandler);
    if (sessionStorage.getItem("genreScroll")) {
      window.scrollTo(0, JSON.parse(sessionStorage.getItem("genreScroll")!));
    } else {
      sessionStorage.setItem("genreScroll", "0");
    }

    const observer = new IntersectionObserver(scrollObserverHandler, {
      threshold: 0, //  Intersection Observer의 옵션, 0일 때는 교차점이 한 번만 발생해도 실행, 1은 모든 영역이 교차해야 콜백 함수가 실행.
    });
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      window.removeEventListener("scroll", scrollYHandler);
    };
  }, []);

  useEffect(() => {
    if (firstRender) return setFirstRender(false);
    if (contentType === "movie") {
      addMovieWithGenre(page);
      console.log("영화");
    }
    if (contentType === "tv") {
      addTvWithGenre(page);
      console.log("tv");
    }
  }, [page]);

  useEffect(() => {
    console.log("?", contentType);
  }, [contentType]);

  return (
    <section className="w-full max-w-[1440px] mx-auto mt-[146px]">
      <h2 className="text-white text-title-3xl mb-10">Genre</h2>
      {/* 컨텐츠 버튼 */}
      <ContentButtonList />
      {/* 장르 버튼*/}
      <article className="flex gap-4 flex-wrap mb-[4rem]">
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
      <section className="flex flex-wrap gap-9">
        <>
          {contentType === "movie" && <GenreContent content={"movie"} />}
          {contentType === "tv" && <GenreContent content={"tv"} />}
        </>
        {isContentsLoading && <GenreContentSkeleton />}
      </section>
      <div ref={observerRef} className="h-2.5"></div>
    </section>
  );
}
