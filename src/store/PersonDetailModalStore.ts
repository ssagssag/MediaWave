import { create } from "zustand";
import { T_movieCast, T_movieCrew, T_personalDetail, T_personProfile, T_tvCast, T_tvCrew } from "../types/person";

interface T_PersonDetailModalStore {
  isPersonaDetailModalOpen: boolean;
  setIsPersonaDetailModaltrue: () => void;
  setIsPersonaDetailModalfalse: () => void;
  personId: number;
  setPersonId: (getData: number) => void;
  personDetail: T_personalDetail;
  setPersonDetail: (getData: T_personalDetail) => void;
  movieCast: T_movieCast[];
  setMovieCast: (getData: T_movieCast[]) => void;
  movieCrew: T_movieCrew[];
  setMovieCrew: (getData: T_movieCrew[]) => void;
  tvCast: T_tvCast[];
  setTvCast: (getData: T_tvCast[]) => void;
  tvCrew: T_tvCrew[];
  setTvCrew: (getData: T_tvCrew[]) => void;
  personProfiles: T_personProfile[];
  setPersonProfiles: (getData: T_personProfile[]) => void;
}

export const usePersonDetailModalStore = create<T_PersonDetailModalStore>((set) => ({
  isPersonaDetailModalOpen: false,
  setIsPersonaDetailModaltrue: () =>
    set(() => ({
      isPersonaDetailModalOpen: true,
    })),
  setIsPersonaDetailModalfalse: () =>
    set(() => ({
      isPersonaDetailModalOpen: false,
    })),
  personId: 0,
  setPersonId: (getData) =>
    set(() => ({
      personId: getData,
    })),
  personDetail: {} as T_personalDetail,
  setPersonDetail: (getData) =>
    set(() => ({
      personDetail: getData,
    })),
  movieCast: [] as T_movieCast[],
  setMovieCast: (getData) => set(() => ({ movieCast: getData })),
  movieCrew: [] as T_movieCrew[],
  setMovieCrew: (getData) => set(() => ({ movieCrew: getData })),
  tvCast: [] as T_tvCast[],
  setTvCast: (getData) => set(() => ({ tvCast: getData })),
  tvCrew: [] as T_tvCrew[],
  setTvCrew: (getData) => set(() => ({ tvCrew: getData })),
  personProfiles: [] as T_personProfile[],
  setPersonProfiles: (getData) => set(() => ({ personProfiles: getData })),
}));
