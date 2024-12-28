import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";

export default function Popular() {
  const [popular, setPopular] = useState<MovieItem[]>([]);

  const getMoviePopular = async () => {
    const {data: {results}} = await axiosInstance.get("/popular");
    setPopular(results);
    console.log(results);
  };

  useEffect(()=>{
    getMoviePopular();
  },[])
  

  return (
    <div>Popular</div>
  )
}
