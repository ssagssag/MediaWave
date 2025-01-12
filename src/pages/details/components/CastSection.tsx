import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import getPersonImg from "../../../utils/getPersonImg";
import { usePersonDetailModalStore } from "../../../store/PersonDetailModalStore";

export interface CastMember {
  id: number;
  profile_path: string;
  name: string;
  known_for_department: string;
  character: string;
}

interface CastSwiperProps {
  cast: CastMember[];
  hasVideos?: boolean;
}

export default function CastSection({ cast, hasVideos = true }: CastSwiperProps) {
  const setIsPersonaDetailModaltrue = usePersonDetailModalStore((state) => state.setIsPersonaDetailModaltrue);
  const setPersonId = usePersonDetailModalStore((state) => state.setPersonId);

  const actors = cast.filter(member => member.known_for_department === "Acting");
  const directors = cast.filter(member => member.known_for_department === "Directing");

  const renderCastMember = (member: CastMember) => (
    <div
      className="cursor-pointer w-[140px]"
      onClick={() => {
        setPersonId(member.id);
        setIsPersonaDetailModaltrue();
      }}
    >
      <div className="flex flex-col items-center">
        <div className="mb-4 overflow-hidden rounded-full w-28 h-28">
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
        <p className="w-full text-sm text-center truncate text-main-100">{member.name}</p>
        <p className="w-full text-xs text-center text-gray-400 truncate text-main-100/60">
          {member.character}
        </p>
      </div>
    </div>
  );

  const CastSwiper = ({ data, title }: { data: CastMember[], title: string }) => (
    <div className="mb-12">
      <h2 className="mb-6 text-white text-title-md">{title}</h2>
      <div className="group">
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            slidesPerView={8}
            slidesPerGroup={8}
            spaceBetween={20}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            className="cast-swiper"
          >
            {data.map((member, index) => (
              <SwiperSlide key={index}>
                {renderCastMember(member)}
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="transition-opacity opacity-0 swiper-button-prev group-hover:opacity-100" />
          <div className="transition-opacity opacity-0 swiper-button-next group-hover:opacity-100" />
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`pt-28 max-w-[1520px] max-[1519px]:px-8 mx-auto ${
        !hasVideos ? "bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/10 via-5% to-transparent" : "bg-background"
      }`}
    >
      {actors.length > 0 && <CastSwiper data={actors} title="Cast" />}
      {directors.length > 0 && <CastSwiper data={directors} title="Directors" />}
      
      <style>
        {`
          .swiper-button-prev,
          .swiper-button-next {
            color: white;
          }
        `}
      </style>
    </div>
  );
}