interface MovieItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface RecommendProps {
  movie: MovieItem;
}

interface PosterCardItemProps {
  item: MovieItem;
}

interface PosterCardProps {
  cards: MovieItem[];
}

interface AnimationProps {
  animations: MovieItem[];
}

interface Top5CardProps {
  animation: MovieItem;
}

interface MovieProps {
  data: MovieItem[];
}

interface SwiperDataItem {
  id: number;
  poster_path?: string;
  profile_path?: string;
}
