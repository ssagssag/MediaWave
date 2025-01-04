import "swiper/swiper-bundle.css";

import { axiosInstance } from "../../api/axios";
import { useEffect, useState } from "react";
import RecommendCard from "./RecommendCard";
import BaseSwiper from "../swiper/BaseSwiper";

export default function Recommend() {
  const [top10, setTop10] = useState<MovieItem[]>([]);

  const getTop10 = async () => {
    const {
      data: { results },
    } = await axiosInstance.get("/discover/movie", {
      params: {
        with_genres: "16",
        sort_by: "popularity.desc",
        primary_release_year: "2023",
      },
    });
    setTop10(results.slice(0, 5));
  };

  useEffect(() => {
    getTop10();
  }, []);

  return (
    <>
      <BaseSwiper
        data={top10}
        renderItem={(movie) => <RecommendCard movie={movie} />}
        autoplay={true}
        delay={3000}
        loop={true}
        unique="weeklytrend"
        slidesPerView={1}
        speed={500}
      />
    </>
  );
}
