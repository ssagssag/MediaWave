interface MediaItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  genres?: Genre[];
}

interface ImageItem {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
  id: number;
}

interface TvItem extends MediaItem {
  name: string;
  first_air_date: string;
  vote_average: number;
  popularity: number;
  results: TvItem[];
}

interface TvItemProps {
  item: TvItem;
}

interface Genre {
  id: number;
  name: string;
}

interface CastMember {
  id: number;
  profile_path: string;
  name: string;
  known_for_department: string;
  character: string;
}

interface CastListProps {
  cast: CastMember[];
  hasVideos?: boolean;
}

interface TrailerVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export type {
  MediaItem,
  TvItem,
  TvItemProps,
  Genre,
  CastMember,
  TrailerVideo,
  ImageItem
};