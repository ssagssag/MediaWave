import { cup_cake, pin, star } from "../../../../assets/PersonDetailModal/svgs";
import { T_personalDetail } from "../../../../types/person";
import InlinePersonInfo from "./InlinePersonInfo";

export default function PersonDetailModalTop({ personDetail }: { personDetail: T_personalDetail }) {
  return (
    <article className="flex gap-[35px] items-center">
      <article className="w-[124px] h-[124px] rounded-full">
        <img
          src={`https://image.tmdb.org/t/p/original/${personDetail.profile_path}`}
          alt="인물 프로필 이미지"
          className="w-full h-full object-cover rounded-full"
        />
      </article>
      <article className="flex flex-col h-[124px] text-[15px] justify-between">
        <article className="flex gap-[10px] items-end">
          <span className="text-white text-[18px] font-bold">{personDetail.name}</span>
          <span className="text-gray text-[13px]">{personDetail.known_for_department}</span>
        </article>
        <article className="flex flex-col gap-[5px]">
          <InlinePersonInfo imgSrc={cup_cake} personInfo={personDetail.birthday} />
          <InlinePersonInfo imgSrc={pin} personInfo={personDetail.place_of_birth} />
        </article>
        <InlinePersonInfo imgSrc={star} personInfo={personDetail.popularity} />
      </article>
    </article>
  );
}
