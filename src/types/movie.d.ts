interface MovieItem extends MediaItem {
  adult: boolean;
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
  genres: { id: number; name: string }[];
}

interface RecommendProps {
  movie: MovieItem;
}

interface AnimationProps {
  animations: MovieItem[];
}

interface SwiperDataItem {
  id: number;
  poster_path?: string;
  profile_path?: string;
}
