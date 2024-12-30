import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: 
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDdhZWVjNzc4MDEzMmNkMzRlODQ1NzU4NzNhMmY5NCIsIm5iZiI6MTczMzE5NzQ2OS4xODIwMDAyLCJzdWIiOiI2NzRlN2U5ZGFhODQ0ZGM2ZWU5NDUzODEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.PaxpoOBPaH4s3kE5c3dXJe3pY0p0TCXzBAavEWHMbT4'
  },
});

// 영화 - 이미지 가져오기
export const getMovieStills = async (movieId: number) => {
  try{
    const response = await axiosInstance.get(`/movie/${movieId}/images`);
    return response.data.backdrops; 
  } catch (error){
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
export const getMovieDetails = async (id:number): Promise<MovieItem> => {
  try{
    const response = await axiosInstance.get(`/movie/${id}`, {
      params: { language: "en-US" }, 
    });
    const details = response.data;
    return details;
  } catch (error){
    console.error("Error API details:", error);
    throw error;
  }
}