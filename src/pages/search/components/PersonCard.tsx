import PersonCardItem from "./PersonCardItem";
import BaseSwiper from "../../../components/swiper/BaseSwiper";

export default function PersonCard() {
  return (
    <div className="flex flex-row items-center justify-center gap-10 max-w-4xl mt-16 ">
      {/* 스와이퍼 적용 */}
      <BaseSwiper
        data={}
        renderItem={(item) => <PersonCardItem item={item} key={item.id} />}
        autoplay={false}
        loop={false}
        unique={unique}
        slidesPerView={7}
        slidesPerGroup={7}
      >
      </BaseSwiper>
    </div>
  );
}
