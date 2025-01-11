import BaseSwiper from "../../../components/swiper/BaseSwiper";
import getPersonImg from "../../../utils/getPersonImg";
import { usePersonDetailModalStore } from "../../../store/PersonDetailModalStore";
import { useEffect } from "react";

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
};

interface CastListProps {
  cast: CastMember[];
  hasVideos?: boolean; // videos 유무를 전달받는 prop 추가
}

export default function CastList({ cast, hasVideos = true }: CastListProps) {
  const limitedCast = cast.slice(0, 15);
  const setIsPersonaDetailModaltrue = usePersonDetailModalStore((state) => state.setIsPersonaDetailModaltrue);
  const setIsPersonaDetailModalfalse = usePersonDetailModalStore((state) => state.setIsPersonaDetailModalfalse);
  const setPersonId = usePersonDetailModalStore((state) => state.setPersonId);

  useEffect(() => {
    return () => {
      setIsPersonaDetailModalfalse();
    };
  });

  const renderCastMember = (member: CastMember) => (
    <div
      className="p-2 cursor-pointer"
      onClick={() => {
        setPersonId(member.id);
        setIsPersonaDetailModaltrue();
      }}
    >
      <div className="flex flex-col items-center">
        <div className="w-full mb-4 overflow-hidden rounded-full aspect-square max-w-48">
          {member.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
              alt={member.name}
              className="object-cover w-full h-full"
            />
          ) : (
            <img src={getPersonImg()} alt={member.name} className="object-cover w-full h-full" />
          )}
        </div>
        <p className="text-banner-text center text-main-100">{member.name}</p>
        <p className="text-center text-gray-400 text-main-100/60 text-info-base">{member.character}</p>
      </div>
    </div>
  );

  return (
    <div
      className={`pt-28 max-w-[1520px] max-[1519px]:px-8 mx-auto ${
        !hasVideos ? "bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/10 via-5% to-transparent" : "bg-background"
      }`}
    >
      <h2 className="mb-6 text-white text-title-md">출연진 / 감독</h2>
      <div className="group">
        <BaseSwiper
          data={limitedCast}
          renderItem={renderCastMember}
          slidesPerView={5}
          slidesPerGroup={5}
          speed={800}
          autoplay={false}
          loop={false}
          unique="cast-list"
          navigate={true}
        />
        <style>
          {`
            .prev-cast-list,
            .next-cast-list {
              opacity: 0;
              transition: opacity 0.3s ease;
            }
            .group:hover .prev-cast-list,
            .group:hover .next-cast-list {
              opacity: 1;
            }
            .swiper-button-prev,
            .swiper-button-next {
              color: white;
            }
          `}
        </style>
      </div>
    </div>
  );
}
