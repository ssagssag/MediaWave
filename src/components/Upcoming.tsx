import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";

export default function Upcoming() {
  const [upcoming, setUpcoming] = useState<MovieItem[]>([]);

  const getMovieUpcoming = async () => {
    const {data: {results}} = await axiosInstance.get("/upcoming");
    setUpcoming(results);
  };

  useEffect(() => {
    getMovieUpcoming();
  },[]);

  return (
    <div>upcoming</div>
  )
}
