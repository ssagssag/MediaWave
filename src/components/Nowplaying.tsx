import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";


export default function Nowplaying() {
  const [nowPlaying, setNowPlaying] = useState<MovieItem[]>([]);

  const getMovieNowPlaying = async () => {
    const {data: {results}} = await axiosInstance.get("/now_playing");
    setNowPlaying(results);
  };

  useEffect(() => {
    getMovieNowPlaying();
  },[]);

  return (
    <div>Nowplaying</div>
  )
}
