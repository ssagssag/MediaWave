import { useState } from "react";
import { cup_cake, pin, star } from "../../../../assets/PersonDetailModal/svgs";
import { IMAGE_BASE_URL } from "../../../../constants/urls";
import { T_personalDetail } from "../../../../types/person";
import getPersonImg from "../../../../utils/getPersonImg";
import InlinePersonInfo from "./InlinePersonInfo";

export default function PersonDetailModalTop({ personDetail }: { personDetail: T_personalDetail }) {
  const [randomProfile, setrRandomProfile] = useState(getPersonImg());
  return (
    <article className="flex gap-[35px] items-center">
      <article className="w-[124px] h-[124px] rounded-full">
        {personDetail.profile_path ? (
          <img
            src={`${IMAGE_BASE_URL}/original/${personDetail.profile_path}`}
            alt="인물 프로필 이미지"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <img src={randomProfile} alt="모달 랜덤 이미지" />
        )}
      </article>
      <article className="flex flex-col h-[124px] text-[15px] justify-between">
        <article className="flex gap-[10px] items-end">
          <span className="text-white text-title-md font-bold">{personDetail.name}</span>
          <span className="text-gray text-info-sm">{personDetail.known_for_department}</span>
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
