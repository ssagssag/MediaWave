import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import 'swiper/swiper-bundle.css'; 

import { useEffect, useState } from "react"
import { getTVPopular } from "../../api/axios";
import TvPopularItem from "./TvPopularItem";

export default function TvPopular() {
  const [tvPopular, setTvPopular] = useState<TvItem[]>([]);

  useEffect(() => {
    const fetchTvPopular = async () => {
      try {
        const popularTvShows = await getTVPopular();
        const top10TvShows = popularTvShows.slice(0, 10);
        setTvPopular(top10TvShows);
      } catch (error) {
        console.error("Error Fetching TV Popular:", error);
      }
    };
    fetchTvPopular();
  }, []);


  return (
    <div className="w-full h-[400px]">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        rewind={true}
      >
        {tvPopular.map((item:TvItem) => (
          <SwiperSlide key={item.id}>
            <TvPopularItem item={item}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
