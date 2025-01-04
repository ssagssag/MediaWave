import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

interface SwiperComponentProps<T> {
  data: T[]; // 슬라이드에 표시할 데이터
  renderItem: (item: T, index: number) => React.ReactNode; // 데이터 렌더링 함수
  autoplay?: boolean;
  delay?: number;
  loop?: boolean;
  slidesPerView?: number;
  slidesPerGroup?: number;
  speed?: number;
  unique: string;
}

export default function BaseSwiper<T>({
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
    <div className="swiper-container">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={autoplay ? { delay, disableOnInteraction: false } : undefined}
        loop={loop}
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerGroup}
        navigation={{
          prevEl: `.prev-${unique}`,
          nextEl: `.next-${unique}`,
        }}
        pagination={{ clickable: true }}
        speed={speed ? speed : undefined} // 슬라이더 넘어가는 속도
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>{renderItem(item, index)}</SwiperSlide>
        ))}
      </Swiper>
      <div className={`swiper-button-prev prev-${unique}`}></div>
      <div className={`swiper-button-next next-${unique}`}></div>
    </div>
  );
}
