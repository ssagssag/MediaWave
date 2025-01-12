import { create } from 'zustand';
import getPersonImg from '../utils/getPersonImg';
import { IMAGE_BASE_URL } from '../constants/urls';

interface PersonImageState {
  randomImages: Record<number, string>;
  getImageUrl: (person: { id: number; profile_path: string | null }) => string;
  getRandomImage: (personId: number) => string;
  setRandomImage: (personId: number, imageUrl: string) => void;
  reset: () => void;
}

export const usePersonImageStore = create<PersonImageState>((set, get) => ({
  randomImages: {},
  
  getImageUrl: (person: { id: number; profile_path: string | null }) => {
    if (person.profile_path) {
      return `${IMAGE_BASE_URL}/original/${person.profile_path}`;
    }
    return get().getRandomImage(person.id);
  },
  
  getRandomImage: (personId: number) => {
    const { randomImages } = get();
    if (randomImages[personId]) {
      return randomImages[personId];
    }
    const newRandomImage = getPersonImg();
    set((state) => ({
      randomImages: {
        ...state.randomImages,
        [personId]: newRandomImage
      }
    }));
    return newRandomImage;
  },

  setRandomImage: (personId: number, imageUrl: string) => {
    set((state) => ({
      randomImages: {
        ...state.randomImages,
        [personId]: imageUrl
      }
    }));
  },

  reset: () => {
    set({ randomImages: {} });
  }
}));