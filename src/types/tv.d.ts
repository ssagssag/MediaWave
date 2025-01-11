interface TvItem extends MediaItem {
  first_air_date: string;
  name: string;
  origin_country: string[];
  original_name: string;
  backdrops: Array<{
    aspect_ratio: number;
    height: number;
    iso_639_1: string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
    id: number;
  }>;
  logos: Array<{
    aspect_ratio: number;
    height: number;
    iso_639_1: string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
    id: number;
  }>;
  posters: Array<{
    aspect_ratio: number;
    height: number;
    iso_639_1: string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
    id: number;
  }>;
}
interface TvItemProps {
  item: TvItem;
}
