import { useGenreStore } from "../../../../store/GenreStore";
import GenreButton from "./GenreButton";

export default function GenreButtonList({ content }: { content: "movie" | "tv" }) {
  const movieGenreList = useGenreStore((state) => state.movieGenreList);
  const tvGenreList = useGenreStore((state) => state.tvGenreList);

  return (
    <>
      {content === "movie" &&
        movieGenreList.map((genre, idx) => {
          return <GenreButton key={idx} genre={genre} />;
        })}
      {content === "tv" &&
        tvGenreList.map((genre, idx) => {
          return <GenreButton key={idx} genre={genre} />;
        })}
    </>
  );
}
