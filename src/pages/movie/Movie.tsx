import TrendingMovie from "../../components/TrendingMovie";

import Category from "./components/Category";
import CategoryController from "./components/CategoryController";
import TrendingWeekly from "./components/TrendingWeekly";

export default function Movie() {
  return (
    <main
      className={`
      flex flex-col items-center justify-center w-full`}
    >
      <div className="w-[1440px] flex flex-row justify-between gap-7 mt-16 px-10">
        <aside className="w-[400px] h-[600px] mt-11 overflow-hidden">
          <CategoryController />
        </aside>

        <section className="w-[1030px] h-[600px] rounded-3xl ">
          <TrendingWeekly />
        </section>
      </div>

      <div className="mt-10 w-[1440px] ">
        {/* 카테고리 컴포넌트 */}
        <Category title="Now Playing" endpoint="/movie/now_playing" category="now_playing" />
        <Category title="Popular" endpoint="/movie/popular" category="popular" />
        <Category title="Upcoming" endpoint="/movie/upcoming" category="upcoming" />
        <Category title="Top Rated" endpoint="/movie/top_rated" category="top_rated" />
        <Category title="Trending" endpoint="/trending/movie/day" category="daily_trending" />
      </div>
    </main>
  );
}
