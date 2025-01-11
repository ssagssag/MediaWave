import { useEffect, useRef, useState } from "react";
import PersonDetailModalSkeleton from "./components/skeleton/PersonDetailModalSkeleton";
import PersonDetail from "./components/render/PersonDetail";
import { usePersonDetailModalStore } from "../../store/PersonDetailModalStore";
import { axiosInstance } from "../../api/axios";

export default function PersonDetailModal({ personId }: { personId: number }) {
  const setIsPersonaDetailModalfalse = usePersonDetailModalStore((state) => state.setIsPersonaDetailModalfalse);

  const stModalRef = useRef<HTMLDivElement>(null);
  const ndModalRef = useRef<HTMLDivElement>(null);

  // 모달창 닫기
  const closeModal = (event: React.MouseEvent) => {
    if (event.target === stModalRef.current || event.target === ndModalRef.current) {
      setIsPersonaDetailModalfalse();
    }
  };

  // 스켈레톤 트리거
  const [skeleton, setSkeleton] = useState(true);

  const setPersonDetail = usePersonDetailModalStore((state) => state.setPersonDetail);

  const setPersonProfiles = usePersonDetailModalStore((state) => state.setPersonProfiles);

  const setMovieCast = usePersonDetailModalStore((state) => state.setMovieCast);
  const setMovieCrew = usePersonDetailModalStore((state) => state.setMovieCrew);

  const setTvCast = usePersonDetailModalStore((state) => state.setTvCast);
  const setTvCrew = usePersonDetailModalStore((state) => state.setTvCrew);

  // API
  const getPersonDetail = async () => {
    const res = await axiosInstance.get(`/person/${personId}?language=en-US`);
    setPersonDetail(res.data);
  };

  const getPersonProfiles = async () => {
    const res = await axiosInstance.get(`/person/${personId}/images`);
    console.log("프로필", res.data.profiles);
    setPersonProfiles(res.data.profiles);
  };

  const getMovieCredits = async () => {
    const res = await axiosInstance.get(`/person/${personId}/movie_credits?language=en-US`);
    console.log("영화", res.data);
    setMovieCast(res.data.cast);
    setMovieCrew(res.data.crew);
  };

  const getTvCredits = async () => {
    const res = await axiosInstance.get(`/person/${personId}/tv_credits?language=en-US`);
    console.log("tv", res.data);
    setTvCast(res.data.cast);
    setTvCrew(res.data.crew);
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    Promise.all([getPersonDetail(), getPersonProfiles(), getMovieCredits(), getTvCredits()])
      .then(() => {
        setSkeleton(false);
      })
      .catch((err) => console.log(err));
    return () => {
      document.body.style.overflowY = "";
    };
  }, []);

  return (
    <article
      className="w-full h-screen bg-black bg-opacity-60 overflow-x-hidden overflow-y-scroll fixed top-0 left-0 z-50"
      onClick={(e) => {
        return closeModal(e);
      }}
    >
      <article className="w-full flex justify-center z-50" ref={stModalRef}>
        <article className="w-full min-h-screen max-w-[1136px] px-[50px] py-10" ref={ndModalRef}>
          <article className="w-full h-full px-[80px] py-[65px] bg-[#1E1E1E] rounded-3xl">
            {skeleton ? <PersonDetailModalSkeleton /> : <PersonDetail />}
          </article>
        </article>
      </article>
    </article>
  );
}
