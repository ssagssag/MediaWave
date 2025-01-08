import PosterCardItem from "./PosterCardItem";
import BaseSwiper from "../swiper/BaseSwiper";

export default function PosterCard({ cards, unique }: PosterCardProps) {
  return (
    <BaseSwiper
      data={cards}
      renderItem={(item) => <PosterCardItem item={item} key={item.id} />}
      autoplay={false}
      loop={false}
      unique={unique}
      slidesPerView={6}
      slidesPerGroup={5}
      navigate={true}
      speed={800}
    />
  );
}
