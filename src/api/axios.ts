import axios from "axios";
import { TvItem } from "../types/tv";
import { MovieItem } from "../types/movie";

export const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

// movie- trending
export const getTrendingMovie = async (timeWindow: "day" | "week") => {
  try {
    const {
      data: { results },
    } = await axiosInstance.get(`/trending/movie/${timeWindow}`);
    return results;
  } catch (error) {
    console.error("Error fetching trendingMovie:", error);
    throw error;
  }
};

// 영화- nowplaying
export const getMovieNowPlaying = async () => {
  try {
    const {
      data: { results },
    } = await axiosInstance.get("/movie/now_playing");
    return results;
  } catch (error) {
    console.error("Error fetching NowPlaying:", error);
    throw error;
  }
};

// 영화 -popular
export const getMoviePopular = async () => {
  try {
    const {
      data: { results },
    } = await axiosInstance.get("/movie/popular");
    const sortedPopularity = results.sort((a: MovieItem, b: MovieItem) => b.popularity - a.popularity);
    return sortedPopularity;
  } catch (error) {
    console.error("Error fetching popular:", error);
    throw error;
  }
};

//영화 - Upcoming
export const getMovieUpcoming = async () => {
  try {
    const {
      data: { results },
    } = await axiosInstance.get("/movie/upcoming");
    const sortedRelease = results.sort((a: MovieItem, b: MovieItem) => {
      return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
    });

    return sortedRelease;
  } catch (error) {
    console.error("Error fetching Upcoming:", error);
    throw error;
  }
};

// 영화 - 이미지 가져오기
export const getMovieStills = async (movieId: number) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}/images`);
    return response.data.backdrops;
  } catch (error) {
    console.error("Error fetching stills:", error);
    throw error;
  }
};

// 영화 - 장르 이름
export const getGenreMap = async () => {
  try {
    const response = await axiosInstance.get(`/genre/movie/list`, {
      params: { language: "en-US" },
    });
    const genres = response.data.genres;
    return genres.reduce((map: Record<number, string>, genre: { id: number; name: string }) => {
      map[genre.id] = genre.name;
      return map;
    }, {});
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};

// 영화 - 디테일 정보
export const getMovieDetails = async (id: number): Promise<MovieItem> => {
  try {
    const response = await axiosInstance.get(`/movie/${id}`, {
      params: { language: "en-US" },
    });
    const details = response.data;
    return details;
  } catch (error) {
    console.error("Error API details:", error);
    throw error;
  }
};

// 영화 - 트렌드
export const getTrendingMovies = async () => {
  try {
    const response = await axiosInstance.get("/trending/movie/day");
    return response.data.results.slice(0, 10); // 상위 10개만 가져오기
  } catch (error) {
    console.error("getTrendingMovies 에러 발생:", error);
    return [];
  }
};

export const getMovieVideos = async (movieId: number) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}/videos`);
    // 유튜브 트레일러만 필터링
    return response.data.results.filter(
      (video: any) => video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser"),
    );
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    throw error;
  }
};

// 영화 - 출연진
export const getMovieCast = async (movieId: number) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}/credits`);
    return response.data.cast;
  } catch (error) {
    console.error("Failed to fetch cast:", error);
    return [];
  }
};

// 영화 - 유사 영화 20개
export const getSimilarMovies = async (movieId: number) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}/similar`);
    return response.data.results.slice(0, 20);
  } catch (error) {
    console.error("유사 영화 가져오기 실패:", error);
    return [];
  }
};

{
  /* TV Series */
}

// Tv- Airing Today
export const getTvAiringToday = async () => {
  try {
    const {
      data: { results },
    } = await axiosInstance.get("/tv/airing_today");
    return results;
  } catch (error) {
    console.error("Error fetching Airing Today:", error);
    throw error;
  }
};

// Tv - Popular
export const getTVPopular = async () => {
  try {
    const { data: { results } } = await axiosInstance.get("/tv/popular");
    return results.sort((a: TvItem, b: TvItem) => b.popularity - a.popularity);
  } catch (error) {
    console.error("인기 TV 시리즈를 가져오는데 실패했습니다:", error);
    throw error;
  }
};

// Tv - Top Rated
export const getTvTopRated = async () => {
  try {
    const { data: { results } } = await axiosInstance.get("/tv/top_rated");
    return results.sort((a: TvItem, b: TvItem) => b.vote_average - a.vote_average);
  } catch (error) {
    console.error("높은 평점의 TV 시리즈를 가져오는데 실패했습니다:", error);
    throw error;
  }
};

// Tv - On The Air
export const getTvOnTheAir = async () => {
  try {
    const {
      data: { results },
    } = await axiosInstance.get("/tv/on_the_air");
    return results;
  } catch (error) {
    console.error("Error fetching On The Air:", error);
    throw error;
  }
};

// TV - 이미지 가져오기
export const getTvStills = async (series_id: number) => {
  try {
    const response = await axiosInstance.get(`/tv/${series_id}/images`);
    return response.data.backdrops;
  } catch (error) {
    console.error("Error fetching Tv stills:", error);
    throw error;
  }
};

// TV - 장르 가져오기
export const getTVGenres = async () => {
  try {
    const response = await axiosInstance.get(`/genre/tv/list`, {
      params: { language: "en-US" },
    });
    const genres = response.data.genres;
    return genres.reduce((map: Record<number, string>, genre: { id: number; name: string }) => {
      map[genre.id] = genre.name;
      return map;
    }, {});
  } catch (error) {
    console.error("Error fetching Tv genres:", error);
    throw error;
  }
};

// TV 시리즈 상세 정보
export const getTvDetails = async (id: number): Promise<TvItem> => {
  try {
    const response = await axiosInstance.get(`/tv/${id}`, {
      params: { language: "ko-KR" },
    });
    return response.data;
  } catch (error) {
    console.error("TV 시리즈 상세 정보를 가져오는데 실패했습니다:", error);
    throw error;
  }
};

// TV 시리즈 비디오
export const getTvVideos = async (tvId: number) => {
  try {
    const response = await axiosInstance.get(`/tv/${tvId}/videos`);
    return response.data.results.filter(
      (video: any) => video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser"),
    );
  } catch (error) {
    console.error("TV 시리즈 비디오를 가져오는데 실패했습니다:", error);
    throw error;
  }
};

// TV 시리즈 캐스트 정보
export const getTvCast = async (tvId: number) => {
  try {
    const response = await axiosInstance.get(`/tv/${tvId}/credits`);
    return response.data.cast;
  } catch (error) {
    console.error("TV 시리즈 캐스트 정보를 가져오는데 실패했습니다:", error);
    throw error;
  }
};

// 비슷한 TV 시리즈
export const getSimilarTv = async (tvId: number) => {
  try {
    const response = await axiosInstance.get(`/tv/${tvId}/similar`);
    return response.data.results;
  } catch (error) {
    console.error("비슷한 TV 시리즈를 가져오는데 실패했습니다:", error);
    throw error;
  }
};

{
  /* search */
}

// 영화 검색
export const searchMulti = async (query: string, page=1) => {
  if (!query) return { results:[], total_pages: 0};
  try {
    const response = await axiosInstance.get(`/search/multi`, {
      params: {
        query,
        include_adult: 'false', 
        language: 'en-US',
        page,
      },
    });
    return {
      results: response.data.results,
      total_pages: response.data.total_pages,
    };
  } catch (error) {
    console.error("Error fetching search results:", error);
    return { results:[], total_pages: 0};
  }
};
