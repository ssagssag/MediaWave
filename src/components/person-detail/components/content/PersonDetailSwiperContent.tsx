import { Swiper, SwiperSlide } from "swiper/react";
import PersonDetailCard from "./PersonDetailCard";
import { T_movieCast, T_movieCrew, T_personProfile, T_tvCast, T_tvCrew } from "../../../../types/person";

export default function PersonDetailSwiperContent({
  movies,
  tv_programs,
  profiles,
  title,
}: {
  movies?: T_movieCast[] | T_movieCrew[];
  tv_programs?: T_tvCast[] | T_tvCrew[];
  profiles?: T_personProfile[];
  title: string;
}) {
  // 영화 필터링
  const filteredMovies = (contents: T_movieCast[] | T_movieCrew[] | undefined) => {
    const filtered = contents?.filter((e) => {
      if (e.poster_path) {
        return true;
      } else {
        return false;
      }
    });

    const reduced = filtered?.reduce((acc, cur) => {
      const found = acc.find((e) => e.poster_path === cur.poster_path);
      if (!found) {
        acc.push(cur);
      }
      return acc;
    }, [] as typeof filtered);

    return reduced;
  };
  const resultMovies = filteredMovies(movies);

  // tv프로그램 필터링링
  const filteredTvPrograms = (tv_programs: T_tvCast[] | T_tvCrew[] | undefined) => {
    const filtered = tv_programs?.filter((e) => {
      if (e.poster_path) {
        return true;
      } else {
        return false;
      }
    });

    const reduced = filtered?.reduce((acc, cur) => {
      const found = acc.find((e) => e.poster_path === cur.poster_path);
      if (!found) {
        acc.push(cur);
      }
      return acc;
    }, [] as typeof filtered);

    return reduced;
  };
  const resultTvPrograms = filteredTvPrograms(tv_programs);

  // 프로필 필터링링
  const filteredProfiles = (profiles: T_personProfile[] | undefined) => {
    const filtered = profiles?.filter((e) => {
      if (e.file_path) {
        return true;
      } else {
        return false;
      }
    });

    const reduced = filtered?.reduce((acc, cur) => {
      const found = acc.find((e) => e.file_path === cur.file_path);
      if (!found) {
        acc.push(cur);
      }
      return acc;
    }, [] as typeof filtered);

    return reduced;
  };
  const resultProfiles = filteredProfiles(profiles);

  return (
    <article className="flex flex-col gap-[20px]">
      <h2 className="text-[20px] text-white font-bold">{title}</h2>
      <article>
        <Swiper slidesPerView={5} spaceBetween={"4%"}>
          {resultMovies?.map((movie, idx) => {
            return (
              <SwiperSlide key={idx}>
                <PersonDetailCard movie={movie} />
              </SwiperSlide>
            );
          })}
          {resultTvPrograms?.map((tvProgram, idx) => {
            return (
              <SwiperSlide key={idx}>
                <PersonDetailCard tvProgram={tvProgram} />
              </SwiperSlide>
            );
          })}
          {resultProfiles?.map((profile, idx) => {
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
