import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PersonCardItem from "./PersonCardItem";

export default function PersonCard({ person, unique }: PersonProps) {
  return (
    <div className="flex flex-row items-center justify-center gap-10 max-w-4xl mt-16 ">
      {/* 스와이퍼 적용 */}
      {person.length >= 7 ? (
      <div className="swiper-container ">
        <Swiper
          modules={[Navigation]}
          loop={false}
          slidesPerView={7}
          slidesPerGroup={7}
          navigation={{
            prevEl: `.prev-${unique}`,
            nextEl: `.next-${unique}`,
          }}
          spaceBetween={5}
        >
          {person.map((item, index) => (
            <SwiperSlide key={index}>
              <PersonCardItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={`swiper-button-prev prev-${unique} cursor-pointer opacity-10 hover:opacity-100 transition-opacity duration-300 left-[-40px]`}></div>
        <div className={`swiper-button-next next-${unique} cursor-pointer opacity-10 hover:opacity-100 transition-opacity duration-300 right-[-40px]`}></div>
        </div>
      ) : (
        <div className="flex flex-row flex-wrap gap-4 justify-center">
          {person.map((item) => (
            <PersonCardItem key={item.id} item={item} />
          ))}
        </div>
      )}
      </div>
  );
}
