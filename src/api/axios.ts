import axios from "axios";

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
    const {
      data: { results },
    } = await axiosInstance.get("/tv/popular");
    const sortedPopularity = results.sort((a: TvItem, b: TvItem) => b.popularity - a.popularity);
    return sortedPopularity;
  } catch (error) {
    console.error("Error fetching TvPopular:", error);
    throw error;
  }
};

// Tv - Top Rated
export const getTvTopRated = async () => {
  try {
    const {
      data: { results },
    } = await axiosInstance.get("/tv/top_rated");
    const sortedVoteAvg = results.sort((a: TvItem, b: TvItem) => b.vote_average - a.vote_average);
    return sortedVoteAvg;
  } catch (error) {
    console.error("Error fetching Top Rated:", error);
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

// 영화 검색
export const searchMovie = async (query: string) => {
  if (!query) return [];
  try {
    const response = await axiosInstance.get(`/search/movie`, {
      params: {
        query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};
