import { usePersonDetailModalStore } from "../../../../store/PersonDetailModalStore";
import PersonDetailSwiperContent from "./PersonDetailSwiperContent";

export default function PersonDetailModalContent() {
  const personProfiles = usePersonDetailModalStore((state) => state.personProfiles);

  const movieCast = usePersonDetailModalStore((state) => state.movieCast);
  const movieCrew = usePersonDetailModalStore((state) => state.movieCrew);

  const tvCast = usePersonDetailModalStore((state) => state.tvCast);
  const tvCrew = usePersonDetailModalStore((state) => state.tvCrew);

  return (
    <article className="flex flex-col gap-[50px]">
      {personProfiles.length > 0 && <PersonDetailSwiperContent profiles={personProfiles} title={"프로필"} />}

      {movieCast.length > 0 && <PersonDetailSwiperContent movies={movieCast} title={"출연 영화"} />}

      {movieCrew.length > 0 && <PersonDetailSwiperContent movies={movieCrew} title={"연출 영화"} />}

      {tvCast.length > 0 && <PersonDetailSwiperContent tv_programs={tvCast} title={"출연 TV 프로그램"} />}

      {tvCrew.length > 0 && <PersonDetailSwiperContent tv_programs={tvCrew} title={"연출 TV 프로그램"} />}
    </article>
  );
}
