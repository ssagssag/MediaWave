import { useGenreStore } from "../../../../store/GenreStore";

export default function ContentButtonList() {
  const contentType = useGenreStore((state) => state.contentType);
  const setContentType = useGenreStore((state) => state.setContentType);

  return (
    <article className="flex gap-12 mb-6">
      <button
        className="text-info-base w-[6.25rem] pb-2 text-white"
        style={
          contentType === "movie"
            ? { color: "#1B77E0", borderBottom: "4px solid #1B77E0", paddingBottom: "0.25rem" }
            : {}
        }
        onClick={() => {
          setContentType("movie");
        }}
      >
        Movie
      </button>
      <button
        className="text-info-base w-[6.25rem] pb-2 text-white"
        style={
          contentType === "tv" ? { color: "#1B77E0", borderBottom: "4px solid #1B77E0", paddingBottom: "0.25rem" } : {}
        }
        onClick={() => {
          setContentType("tv");
          console.log(contentType);
        }}
      >
        TV series
      </button>
    </article>
  );
}
