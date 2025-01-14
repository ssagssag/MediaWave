import { create } from "zustand";
import { T_genre, T_genreMovie, T_genreTv } from "../types/genre";

interface T_genreStore {
  isContentsLoading: boolean;
  setIsContentsLoading: (getBoolean: boolean) => void;
  isGenreLoading: boolean;
  setIsGenreLoading: (getBoolean: boolean) => void;
  movieGenreList: T_genre[];
  tvGenreList: T_genre[];
  setMovieGenreList: (getData: T_genre[]) => void;
  setTvGenreList: (getData: T_genre[]) => void;
  contentType: "movie" | "tv";
  setContentType: (getData: "movie" | "tv") => void;
  movieList: T_genreMovie[];
  setMovieList: (getData: T_genreMovie[]) => void;
  tvList: T_genreTv[];
  setTvList: (getData: T_genreTv[]) => void;
  showingMovieGenreId: number[];
  setShowingMovieGenreId: (getData: number[]) => void;
  showingTvGenreId: number[];
  setShowingTvGenreId: (getData: number[]) => void;
  page: number;
  plusPage: () => void;
  // tvPage: number;
  // plusTvPage: () => void;
}

export const useGenreStore = create<T_genreStore>((set) => ({
  isContentsLoading: false,
  setIsContentsLoading: (getBoolean) => set(() => ({ isContentsLoading: getBoolean })),
  isGenreLoading: false,
  setIsGenreLoading: (getBoolean) => set(() => ({ isGenreLoading: getBoolean })),
  movieGenreList: [],
  tvGenreList: [],
  setMovieGenreList: (getData) => set(() => ({ movieGenreList: getData })),
  setTvGenreList: (getData) => set(() => ({ tvGenreList: getData })),
  contentType: "movie",
  setContentType: (getData) => set(() => ({ contentType: getData })),
  movieList: [],
  setMovieList: (getData) => set(() => ({ movieList: getData })),
  tvList: [],
  setTvList: (getData) => set(() => ({ tvList: getData })),
  showingMovieGenreId: [],
  setShowingMovieGenreId: (getData) => set(() => ({ showingMovieGenreId: getData })),
  showingTvGenreId: [],
  setShowingTvGenreId: (getData) => set(() => ({ showingTvGenreId: getData })),
  page: 1,
  plusPage: () =>
    set((state) => ({
      page: state.page + 1,
    })),
  // tvPage: 1,
  // plusTvPage: () =>
  //   set((state) => ({
  //     moviePage: state.tvPage + 1,
  //   })),
}));
