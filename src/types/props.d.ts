type CategoryTapProps = {
  activeTab: number;
  onTabChange: (index: number) => void;
};

interface NavProps {
  className?: string;
  activeTab: number;
  onTabChange: (tabIndex: number) => void;
}

interface MediaItem {
  id: number;
  name: string;
  title: string;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

interface PosterCardItemProps {
  item: MovieItem | TvItem;
}

interface PosterCardProps {
  cards: MovieItem[] | TvItem[];
  unique?: string;
}
interface Top5CardProps {
  animation: MovieItem | TvItem;
}

interface MovieProps {
  data: MovieItem[];
}
