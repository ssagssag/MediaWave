import { useRef, useState } from "react";
import Category from "./components/Category";
import CategoryController from "./components/CategoryController";
import TrendingWeekly from "./components/TrendingWeekly";
import ControllerButton from "../../components/controller-button/ControllerButton";
import Recommend from "./components/Recommend";

export default function Movie() {
  // categoryRefs 객체 정의
  const categoryRefs: Record<string, React.MutableRefObject<HTMLDivElement | null>> = {
    now_playing: useRef<HTMLDivElement | null>(null),
    popular: useRef<HTMLDivElement | null>(null),
    upcoming: useRef<HTMLDivElement | null>(null),
    top_rated: useRef<HTMLDivElement | null>(null),
    daily_trending: useRef<HTMLDivElement | null>(null),
    my_favorites: useRef<HTMLDivElement | null>(null),
    my_lists: useRef<HTMLDivElement | null>(null),
    recommend: useRef<HTMLDivElement | null>(null),
  };
  const [showController, SetShowController] = useState(false);

  const keywords = ["#한국", "#스포츠", "#힐링", "#중세"]; // 키워드 배열
  const endpoints = [
    "/discover/movie?sort_by=vote_count.desc&with_original_language=ko&region=KR",
    "/discover/movie?sort_by=popularity.desc&with_keywords=6075",
    "/discover/movie?sort_by=popularity.desc&with_keywords=167696",
    "/discover/movie?sort_by=vote_count.desc&with_keywords=161257",
  ];

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
    <div>
      <section className="  z-[0]  absolute top-0 left-0 overflow-hidden ">
        <div className=" w-screen h-[100vh] ">
          <TrendingWeekly />
        </div>
      </section>

      <div className="  z-[5] mt-[470px] ">
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
          title="My Favorites(Fix)"
          endpoint="/movie/now_playing"
          category="my_favorites"
          ref={categoryRefs.my_favorites}
        />
        <Category title="My Lists(Fix)" endpoint="/movie/now_playing" category="my_lists" ref={categoryRefs.my_lists} />
        <Recommend title="Recommend" ref={categoryRefs.recommend} keywords={keywords} endpoints={endpoints} />
      </div>

      {/* 카테고리 토글 버튼 */}
      <ControllerButton toggleController={toggleController} />
      {showController && <CategoryController scrollToCategory={scrollToCategory} />}
    </div>
  );
}
