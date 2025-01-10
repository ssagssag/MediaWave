import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ClipLoader } from "react-spinners";
import { getMovieCast, getMovieDetails, getMovieVideos, getSimilarMovies } from "../../api/axios";
import DetailButtons from "./components/DetailButtons";
import TrailerSwiper from "./components/TrailerSwiper";
import CastList from "./components/CastList";
import SimilarMovies from "./components/SimilarMovies";
import { CastMember } from "./components/CastList";
import DetailComment from "./components/DetailComment";
import createComment from "../../assets/detailPage/paper-plane.svg";

export default function DetailMovie() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieItem | null>(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [similarMovies, setSimilarMovies] = useState<MovieItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setLoading(true);
          const [details, movieVideos, castData, similar] = await Promise.all([
            getMovieDetails(parseInt(id)),
            getMovieVideos(parseInt(id)),
            getMovieCast(parseInt(id)),
            getSimilarMovies(parseInt(id)),
          ]);

          setMovieDetails(details);
          setVideos(movieVideos);
          setCast(castData);
          const filteredSimilarMovies = similar.filter((movie: any) => movie.poster_path);
          setSimilarMovies(filteredSimilarMovies);
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
        <section className="relative w-full h-full">
          {/* 왼쪽 그라디언트 */}
          <div
            className="absolute z-10 w-full h-full bg-gradient-to-r from-[#1E1E1E] from-0% via-[#1E1E1E] via-62% to-transparent to-100%"
            aria-label="background-gradient"
          />

          {/* 포스터 이미지 배경 */}
          <div
            className="absolute top-0 right-0 z-0 w-1/2 h-full bg-cover"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails?.poster_path})`,
            }}
          />
        </section>

        {/* 컨텐츠 영역 */}
        <section className="absolute top-0 left-0 z-20 w-full h-full pt-80 ">
          {/* 상단 컨텐츠 */}
          <div aria-label="contents" className="max-w-[1520px] mx-auto">
            <ul className="flex gap-2 mb-4 max-w-[1520px]">
              {movieDetails?.genres?.map((genre) => (
                <li key={genre.id} className="px-4 py-1 mb-1 text-sm rounded-full text-main-400 bg-white/70">
                  {genre.name}
                </li>
              ))}
            </ul>
            <h1 className="mb-6 leading-tight text-white text-banner-title">{movieDetails?.title}</h1>
            <p className="w-[450px] max-h-[9em] overflow-y-auto scrollbar-hide text-white font-pretendard">
              {movieDetails?.overview}
            </p>
          </div>

          {/* 하단 컨텐츠 */}
          <section className="relative mt-16 h-full bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E] via-65% to-transparent">
            <figure className="max-[1519px]:p-8 relative z-10 w-full max-w-[1520px] mx-auto">
              <div className="flex justify-end mb-8 max-w-[1520px] mx-auto">
                <DetailButtons
                  movieId={movieDetails?.id ?? 0}
                  onFavoriteClick={() => console.log("Favorite")}
                  onReviewClick={() => console.log("Review")}
                  onCommentClick={() => console.log("Comment")}
                  onShareClick={() => console.log("Share")}
                />
              </div>
              {videos.length > 0 && (
                <div className="flex justify-end mb-8 max-w-[1520px] mx-auto mt-8">
                  <TrailerSwiper videos={videos} />
                </div>
              )}
            </figure>
            {cast.length > 0 && <CastList cast={cast} hasVideos={videos.length > 0} />}
            {similarMovies.length > 0 && <SimilarMovies movies={similarMovies} />}

            {/* 댓글 작성 */}
            <form className="w-full max-w-[1520px] mx-auto max-[1519px]:p-8">
              <h2 className="pt-12 pb-6 text-white text-title-md">리뷰 남기기</h2>
              <div className="relative">
                <textarea
                  placeholder="타자를 두들길 준비 되셨나요? (｡･∀･)ﾉﾞ"
                  className="w-full min-h-40 rounded-2xl bg-[#F3F2F3]/10 p-4 text-white resize-none"
                />
                <button className="absolute transition-transform bottom-4 right-4 hover:scale-110">
                  <img src={createComment} alt="댓글 작성" />
                </button>
              </div>
            </form>

            {/* 댓글 목록 */}
            <DetailComment />
          </section>
        </section>
      </article>
    </div>
  );
}
