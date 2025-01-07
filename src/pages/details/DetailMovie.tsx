import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ClipLoader } from "react-spinners";
import { getMovieCast, getMovieDetails, getMovieVideos } from "../../api/axios";
import DetailButtons from "./components/DetailButtons";
import TrailerSwiper from "./components/TrailerSwiper";
import CastList from "./components/CastList";
import { CastMember } from "./components/CastList";

export default function DetailMovie() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieItem | null>(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState<CastMember[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setLoading(true);
          
          const [details, movieVideos, castData] = await Promise.all([
            getMovieDetails(parseInt(id)),
            getMovieVideos(parseInt(id)),
            getMovieCast(parseInt(id))
          ]);
          
          setMovieDetails(details);
          setVideos(movieVideos);
          setCast(castData);

        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#ffffff" size={50} />
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen">
      <article className="relative w-full h-full overflow-scroll">
        <div className="absolute z-10 w-full h-full bg-gradient-to-r from-[#1E1E1E] from-0% via-[#1E1E1E] via-52% to-transparent to-100%" />

        <div
          className="absolute top-0 right-0 z-0 w-1/2 h-full bg-cover"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails?.poster_path})`,
          }}
        />

        <div className="w-full mx-auto max-w-[1520px]">
          <div className="relative z-20 flex flex-col h-screen gap-4">
            <div className="px-10 pt-80">
              <ul className="flex gap-2 mb-4">
                {movieDetails?.genres?.map((genre) => (
                  <li key={genre.id} className="px-4 py-1 mb-1 text-sm rounded-full text-main-400 bg-white/70">
                    {genre.name}
                  </li>
                ))}
              </ul>

              <h1 className="mb-6 leading-tight text-white text-title-3xl text-clamp">{movieDetails?.title}</h1>

              <p className="w-[450px] max-h-[9em] overflow-y-auto scrollbar-hide text-white font-pretendard">
                {movieDetails?.overview}
              </p>
            </div>

            <div className="relative">
              <div className="p-8 absolute right-[-1520px] w-[1520px] h-full bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/85 to-transparent" />
              <div className="p-8 relative z-10 bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/85 to-transparent">
                <div className="flex justify-end px-10 mb-8">
                  <DetailButtons
                    movieId={movieDetails?.id ?? 0}
                    onFavoriteClick={() => console.log("Favorite")}
                    onReviewClick={() => console.log("Review")}
                    onCommentClick={() => console.log("Comment")}
                    onShareClick={() => console.log("Share")}
                  />
                </div>
                {videos.length > 0 && (
                  <div className="mt-8">
                    <TrailerSwiper videos={videos} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <CastList cast={cast} />
      </article>
    </div>
  );
}
