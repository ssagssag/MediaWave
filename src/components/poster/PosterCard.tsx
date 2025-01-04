import PosterCardItem from "./PosterCardItem";
import BaseSwiper from "../swiper/BaseSwiper";

export default function PosterCard({ cards, unique }: PosterCardProps) {
  return (
    <div className="mt-4 ">
      <BaseSwiper
        data={cards}
        renderItem={(item) => <PosterCardItem item={item} key={item.id} />}
        autoplay={false}
        loop={false}
        unique={unique}
        slidesPerView={5}
        slidesPerGroup={5}
      />
    </div>
  );
}
