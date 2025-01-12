import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

interface SwiperComponentProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  autoplay?: boolean;
  delay?: number;
  loop?: boolean;
  slidesPerView?: number;
  slidesPerGroup?: number;
  speed?: number;
  unique?: string;
}

export default function SimilarMoviesSwiper<T>({
  data,
  renderItem,
  autoplay,
  delay,
  loop,
  slidesPerView,
  slidesPerGroup,
  speed,
  unique,
}: SwiperComponentProps<T>) {
  return (
    <div className="relative h-full swiper-container group">
      <Swiper
        className="h-full"
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={autoplay ? { delay, disableOnInteraction: false } : undefined}
        loop={loop}
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerGroup}
        spaceBetween={20}
        speed={speed}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            {renderItem(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev absolute left-[-50px] top-[40%] z-10 text-white opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="swiper-button-next absolute right-[-50px] top-[40%] z-10 text-white opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
}