import "swiper/swiper-bundle.css";

import BaseSwiper from "../../../components/swiper/BaseSwiper";
import TrendingWeeklyItem from "./TrendingWeeklyItem";
import { TvItem } from "../../../types/tv";

export default function TrendingWeekly({ data }: { data: TvItem[] }) {
  return (
    <>
      <BaseSwiper
        data={data}
        renderItem={(data) => <TrendingWeeklyItem data={data} />}
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
