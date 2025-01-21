import "swiper/swiper-bundle.css";

import BaseSwiper from "../../../components/swiper/BaseSwiper";
import TrendingWeeklyItem from "./TrendingWeeklyItem";
import MovieSkeleton from "../../../components/person-detail/components/skeleton/MovieSkeleton";
import { MovieItem } from "../../../types/movie";

export default function TrendingWeekly({ data }: { data: MovieItem[] }) {
  return (
    <>
      <BaseSwiper
        data={data}
        renderItem={(data) => <TrendingWeeklyItem movie={data} />}
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
