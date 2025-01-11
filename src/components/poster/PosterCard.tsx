import PosterCardItem from "./PosterCardItem";
import BaseSwiper from "../swiper/BaseSwiper";

interface PosterCardProps<T extends MovieItem | TvItem> {
  cards: T[];
  unique: string;
}

export default function PosterCard<T extends MovieItem | TvItem>({ cards, unique }: PosterCardProps<T>) {
  return (
    <BaseSwiper
      data={cards}
      renderItem={(item) => <PosterCardItem item={item} key={(item as any).id} />}
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
