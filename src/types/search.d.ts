interface SearchBarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

interface BaseResult {
  id: number;
  popularity: number;
  media_type: 'movie' | 'tv' | 'person';
}

interface MovieResult extends BaseResult {
  media_type: 'movie';
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  title: string;
  original_title: string;
  release_date: string;
}

interface TVResult extends BaseResult {
  media_type: 'tv';
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  name: string;
  original_name: string;
  first_air_date: string;
}

interface PersonResult extends BaseResult {
  media_type: 'person';
  profile_path: string | null;
  name: string;
  known_for: KnownFor[];
}

interface PersonProps {
  person: PersonResult[];
  unique: string;
}

interface PersonCardProps {
  person: Person[];
}

interface PersonCardItemProps {
  item: PersonResult;
}