import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getTvDetails, getTvVideos, getTvCast, getSimilarTv } from "../../api/axios";
import DetailButtons from "./components/DetailButtons";
import TrailerSwiper from "./components/TrailerSwiper";
import CastList from "./components/CastSection";
import SimilarMovies from "./components/SimilarMovies";
import { CastMember, TvItem, TrailerVideo } from "../../types/tv";
import DetailComment from "./components/DetailComment";
import createComment from "../../assets/detailPage/paper-plane.svg";
import DetailTvSkeleton from "./components/DetailTvSkeleton";

export default function DetailTv() {
  const { id } = useParams();
  const [tvDetails, setTvDetails] = useState<TvItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [similarTvShows, setSimilarTvShows] = useState<TvItem[]>([]);
  const [videos, setVideos] = useState<TrailerVideo[]>([]);
  const [cast, setCast] = useState<CastMember[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setLoading(true);
          const [details, tvVideos, castData, similar] = await Promise.all([
            getTvDetails(parseInt(id)),
            getTvVideos(parseInt(id)),
            getTvCast(parseInt(id)),
            getSimilarTv(parseInt(id)),
          ]);

          setTvDetails(details);
          setVideos(tvVideos);
          setCast(castData);
          const filteredSimilarShows = similar.filter((show: TvItem) => show.poster_path);
          setSimilarTvShows(filteredSimilarShows);
        } catch (error) {
          console.error("TV 시리즈 데이터를 불러오는데 실패했습니다:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <DetailTvSkeleton />;
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
              backgroundImage: `url(https://image.tmdb.org/t/p/original${tvDetails?.poster_path})`,
            }}
          />
        </section>

        {/* 컨텐츠 영역 */}
        <section className="absolute top-0 left-0 z-20 w-full h-full pt-80 ">
          {/* 상단 컨텐츠 */}
          <div aria-label="contents" className="max-w-[1520px] mx-auto max-[1519px]:p-8">
            <ul className="flex gap-2 mb-4 max-w-[1520px]">
              {tvDetails?.genres?.map((genre) => (
                <li key={genre.id} className="px-4 py-1 mb-1 text-sm rounded-full text-main-400 bg-white/70">
                  {genre.name}
                </li>
              ))}
            </ul>
            <h1 className="mb-6 leading-tight text-white text-banner-title">{tvDetails?.name}</h1>
            <p className="w-[450px] max-h-[9em] overflow-y-auto scrollbar-hide text-white font-pretendard">
              {tvDetails?.overview}
            </p>
          </div>

          {/* 하단 컨텐츠 */}
          <section className="relative mt-16 h-full bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E] via-65% to-transparent">
            <figure className="max-[1519px]:p-8 relative z-10 w-full max-w-[1520px] mx-auto">
              <div className="flex justify-end mb-8 max-w-[1520px] mx-auto">
                <DetailButtons
                  tvId={tvDetails?.id}
                  onFavoriteClick={() => console.log("즐겨찾기")}
                  onReviewClick={() => console.log("리뷰")}
                  onCommentClick={() => console.log("댓글")}
                  onShareClick={() => console.log("공유")}
                />
              </div>
              {videos.length > 0 && (
                <div className="flex justify-end mb-8 max-w-[1520px] mx-auto mt-8">
                  <TrailerSwiper videos={videos} />
                </div>
              )}
            </figure>
            {cast?.length > 0 && <CastList cast={cast} hasVideos={videos?.length > 0} />}
            {similarTvShows?.length > 0 && <SimilarMovies movies={similarTvShows} />}

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
