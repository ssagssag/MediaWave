import "swiper/swiper-bundle.css";

import { axiosInstance } from "../../../api/axios";
import { useEffect, useState } from "react";
import BaseSwiper from "../../../components/swiper/BaseSwiper";
import TrendingWeeklyItem from "./TrendingWeeklyItem";

export default function TrendingWeekly() {
  const [top10, setTop10] = useState<MovieItem[]>([]);

  const getTop10 = async () => {
    const {
      data: { results },
    } = await axiosInstance.get("/trending/movie/week");
    setTop10(results.slice(0, 10));
  };

  useEffect(() => {
    getTop10();
  }, []);

  return (
    <>
      <BaseSwiper
        data={top10}
        renderItem={(movie) => <TrendingWeeklyItem movie={movie} />}
        autoplay={false}
        delay={3000}
        loop={true}
        unique="weeklytrend"
        slidesPerView={1}
        slidesPerGroup={1}
        speed={500}
        navigate={false}
      />
    </>
  );
}
