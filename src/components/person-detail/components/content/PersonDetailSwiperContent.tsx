import { Swiper, SwiperSlide } from "swiper/react";
import PersonDetailCard from "./PersonDetailCard";
import { T_movieCast, T_movieCrew, T_personProfile, T_tvCast, T_tvCrew } from "../../../../types/person";

export default function PersonDetailSwiperContent({
  content,
  profiles,
  title,
}: {
  content?: T_movieCast[] | T_movieCrew[] | T_tvCast[] | T_tvCrew[];
  profiles?: T_personProfile[];
  title: string;
}) {
  return (
    <article className="flex flex-col gap-[20px]">
      <h2 className="text-[20px] text-white font-bold">{title}</h2>
      <article>
        <Swiper slidesPerView={5} spaceBetween={"4%"}>
          {content?.map((media, idx) => {
            return (
              <SwiperSlide key={idx}>
                <PersonDetailCard media={media} />
              </SwiperSlide>
            );
          })}
          {profiles?.map((profile, idx) => {
            return (
              <SwiperSlide key={idx}>
                <PersonDetailCard profile={profile} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </article>
    </article>
  );
}
