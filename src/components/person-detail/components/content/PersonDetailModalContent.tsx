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
      <PersonDetailSwiperContent profiles={personProfiles} title={"프로필"} />

      <PersonDetailSwiperContent content={movieCast} title={"출연 영화"} />

      <PersonDetailSwiperContent content={movieCrew} title={"연출 영화"} />

      <PersonDetailSwiperContent content={tvCast} title={"출연 TV 프로그램"} />

      <PersonDetailSwiperContent content={tvCrew} title={"연출 TV 프로그램"} />
    </article>
  );
}
