import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import 'swiper/swiper-bundle.css'; 

import { axiosInstance } from "../../api/axios";
import { useEffect, useState } from "react";
import RecommendCard from "./RecommendCard";

export default function Recommend() {
  const [top10, setTop10] = useState<MovieItem[]>([]);

  const getTop10 = async () => {
    const {
      data: { results },
    } = await axiosInstance.get("/discover/movie", {
      params: { 
        with_genres: "16",
        sort_by: "popularity.desc",
        primary_release_year: "2023"
      }});
    setTop10(results.slice(0, 5));
  };

  useEffect(() => {
    getTop10();
  }, []);

  return (
    <div className="">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        rewind={true}
        loop={true}
      >
        {top10.map((movie:MovieItem) => (
          <SwiperSlide key={movie.id}>
            <RecommendCard movie={movie}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
