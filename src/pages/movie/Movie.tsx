import { useRef, useState } from "react";
import Category from "./components/Category";
import CategoryController from "./components/CategoryController";
import TrendingWeekly from "./components/TrendingWeekly";
import ControllerButton from "../../components/controller-button/ControllerButton";

export default function Movie() {
  // categoryRefs 객체 정의
  const categoryRefs: Record<string, React.MutableRefObject<HTMLDivElement | null>> = {
    now_playing: useRef<HTMLDivElement | null>(null),
    popular: useRef<HTMLDivElement | null>(null),
    upcoming: useRef<HTMLDivElement | null>(null),
    top_rated: useRef<HTMLDivElement | null>(null),
    daily_trending: useRef<HTMLDivElement | null>(null),
    korea_movie: useRef<HTMLDivElement | null>(null),
    classic_movie: useRef<HTMLDivElement | null>(null),
    harrypotter_movie: useRef<HTMLDivElement | null>(null),
    christmas_movie: useRef<HTMLDivElement | null>(null),
  };
  const [showController, SetShowController] = useState(false);

  const toggleController = () => {
    SetShowController(!showController);
  };

  // CategoryController에 전달할 scoll 함수
  const scrollToCategory = (category: string) => {
    const ref = categoryRefs[category];
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  return (
    <div className=" bg-main-900  ">
      <section className=" h-[70vh] z-[0]  ">
        <TrendingWeekly />
      </section>

      <div className="  z-[5]  bg-main-900">
        <Category title="Popular" endpoint="/movie/popular" category="popular" ref={categoryRefs.popular} />
        <Category title="Upcoming" endpoint="/movie/upcoming" category="upcoming" ref={categoryRefs.upcoming} />
        <Category title="Top Rated" endpoint="/movie/top_rated" category="top_rated" ref={categoryRefs.top_rated} />
        <Category
          title="Trending"
          endpoint="/trending/movie/day"
          category="daily_trending"
          ref={categoryRefs.daily_trending}
        />
        <Category
          title="Now Playing"
          endpoint="/movie/now_playing"
          category="now_playing"
          ref={categoryRefs.now_playing}
        />
        <Category
          title="#한국"
          endpoint="/discover/movie?sort_by=vote_count.desc&with_original_language=ko"
          category="korea_movie"
          ref={categoryRefs.korea_movie}
        />
        <Category
          title="#고전"
          endpoint="/discover/movie?sort_by=vote_count.desc&primary_release_date.lte=2000-01-01"
          category="classic_movie"
          ref={categoryRefs.classic_movie}
        />
        <Category
          title="#해리포터 시리즈"
          endpoint="/search/movie?query=Harry+Potter"
          category="harrypotter_movie"
          ref={categoryRefs.harrypotter_movie}
        />
        <Category
          title="#크리스마스"
          endpoint="/discover/movie?with_keywords=207317&sort_by=popularity.desc"
          category="christmas_movie"
          ref={categoryRefs.christmas_movie}
        />
      </div>

      {/* 카테고리 토글 버튼 */}
      <ControllerButton toggleController={toggleController} />

      {showController && <CategoryController scrollToCategory={scrollToCategory} />}
    </div>
  );
}

{
  /* 키워드로 추천 */
}
{
  /* <div>
        <ul className="flex justify-left items-center gap-2">
          <li className="bg-white p-2 rounded-full">
            <button onClick={() => scrollToCategory("korea_movie")}>#한국</button>
          </li>
          <li className="bg-white p-2 rounded-full">
            <button onClick={() => scrollToCategory("classic_movie")}>#고전</button>
          </li>

          <li className="bg-white p-2 rounded-full">
            <button onClick={() => scrollToCategory("christmas_movie")}>#크리스마스</button>
          </li>
          <li className="bg-white p-2 rounded-full">
            <button onClick={() => scrollToCategory("harrypotter_movie")}>#해리포터 시리즈</button>
          </li>
        </ul>
      </div> */
}
