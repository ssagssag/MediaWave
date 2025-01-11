import "swiper/swiper-bundle.css";

import BaseSwiper from "../../../components/swiper/BaseSwiper";
import TrendingWeeklyItem from "./TrendingWeeklyItem";

export default function TrendingWeekly({ data }: { data: MovieItem[] }) {
  return (
    <>
      <BaseSwiper
        data={data}
        renderItem={(movie) => <TrendingWeeklyItem movie={movie} />}
        autoplay={true}
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
