import { T_genre } from "../../../../types/genre";
import { focus_close } from "../../../../assets/genre/svg";
import { useGenreStore } from "../../../../store/GenreStore";

export default function GenreButton({ genre }: { genre: T_genre }) {
  const contentType = useGenreStore((state) => state.contentType);

  const showingMovieGenreId = useGenreStore((state) => state.showingMovieGenreId);
  const showingTvGenreId = useGenreStore((state) => state.showingTvGenreId);

  const setShowingMovieGenreId = useGenreStore((state) => state.setShowingMovieGenreId);
  const setShowingTvGenreId = useGenreStore((state) => state.setShowingTvGenreId);

  const getContents = (id: number) => {
    if (contentType === "movie") {
      const updatedMovieGenreId = showingMovieGenreId.includes(id)
        ? showingMovieGenreId.filter((e) => {
            if (e === id) {
              return false;
            } else {
              return true;
            }
          })
        : [...showingMovieGenreId, id];
      setShowingMovieGenreId(updatedMovieGenreId);
    }
    if (contentType === "tv") {
      const updatedTvGenreId = showingTvGenreId.includes(id)
        ? showingTvGenreId.filter((e) => {
            if (e === id) {
              return false;
            } else {
              return true;
            }
          })
        : [...showingTvGenreId, id];
      setShowingTvGenreId(updatedTvGenreId);
    }
  };

  return (
    <>
      {contentType === "movie" && (
        <button
          className="px-[1.125rem] py-1.5 flex rounded-full items-center gap-2 text-white bg-[#404040]"
          style={
            contentType === "movie" && showingMovieGenreId.includes(genre.id)
              ? { color: "black", background: "white" }
              : {}
          }
          onClick={() => {
            getContents(genre.id);
          }}
        >
          <span>{genre.name}</span>
          {showingMovieGenreId.includes(genre.id) && <img src={focus_close} alt="포커스 취소 버튼 아이콘" />}
        </button>
      )}
      {contentType === "tv" && (
        <button
          className="px-[1.125rem] py-1.5 flex rounded-full items-center gap-2 text-white bg-[#404040]"
          style={
            contentType === "tv" && showingTvGenreId.includes(genre.id) ? { color: "black", background: "white" } : {}
          }
          onClick={() => {
            getContents(genre.id);
          }}
        >
          <span>{genre.name}</span>
          {showingTvGenreId.includes(genre.id) && <img src={focus_close} alt="포커스 취소 버튼 아이콘" />}
        </button>
      )}
    </>
  );
}
