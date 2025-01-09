interface SearchBarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

interface BaseResult {
  id: number;
  popularity: number;
  media_type: 'movie' | 'tv' | 'person';
}

interface MediaResult extends BaseResult {
  id: number;
  media_type: "movie" | "tv";
  poster_path: string | null;
  overview: string;
  vote_average: number;
  title?: string; // movie일 경우
  name?: string;  // tv일 경우
}

interface MediaCardProps {
  media: MediaResult[];
}

interface MediaCardItemProps {
  item: {
    id: number;
    media_type: "movie" | "tv";
    poster_path: string | null;
    overview: string;
    vote_average: number;
    title?: string; // movie일 경우
    name?: string;  // tv일 경우
  };
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
  onPersonClick: (personData: PersonResult) => void;
}

interface PersonCardProps {
  person: Person[];
}

interface PersonCardItemProps {
  item: PersonResult;
  
  onClick: (item: PersonResult) => void;
}
