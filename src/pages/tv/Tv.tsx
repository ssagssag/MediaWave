import { useEffect, useRef, useState } from "react";
import ControllerButton from "../../components/controller-button/ControllerButton";
import MovieSkeleton from "../../components/person-detail/components/skeleton/MovieSkeleton";
import { axiosInstance } from "../../api/axios";
import TrendingWeekly from "./components/TrendingWeekly";
import Category from "./components/Category";
import CategoryController from "./components/CategoryController";
import Recommend from "./components/Recommend";
import { TvItem } from "../../types/tv";

export default function Tv() {
  const [skeleton, setSkeleton] = useState(true); // 전체 로딩 상태
  const [data, setData] = useState<{ title: string; category: string; datas: TvItem[] }[]>([]); // 불러온 데이터
  const [trendingData, setTrendingData] = useState<TvItem[]>([]); // Trending 데이터

  // categoryRefs 객체 정의
  const categoryRefs: Record<string, React.MutableRefObject<HTMLDivElement | null>> = {
    airing_today: useRef<HTMLDivElement | null>(null),
    popular: useRef<HTMLDivElement | null>(null),
    on_the_air: useRef<HTMLDivElement | null>(null),
    top_rated: useRef<HTMLDivElement | null>(null),
    daily_trending: useRef<HTMLDivElement | null>(null),
    my_favorites: useRef<HTMLDivElement | null>(null),
    my_lists: useRef<HTMLDivElement | null>(null),
    recommend: useRef<HTMLDivElement | null>(null),
  };
  const [showController, setShowController] = useState(false);

  // 키워드 이름과 엔드포인트
  const keywords = ["#한국", "#애니메이션", "#심슨", "#중세"]; // 키워드 배열
  const endpoints = [
    "/discover/tv?sort_by=vote_count.desc&with_original_language=ko&region=KR",
    "/discover/tv?sort_by=vote_count.desc&with_genres=16&region=kr&lang=ko",
    "/discover/tv?sort_by=popularity.desc&with_keywords=167696",
    "/discover/tv?sort_by=vote_count.desc&with_keywords=161257",
  ];
  const categories = [
    { title: "Popular", endpoint: "/tv/popular", category: "popular" },
    { title: "Top Rated", endpoint: "/tv/top_rated", category: "top_rated" },
    { title: "Airing Today", endpoint: "/tv/airing_today", category: "airing_today" },
    { title: "On th Air", endpoint: "/tv/on_the_air", category: "on_the_air" },
    { title: "Trending", endpoint: "/trending/tv/day", category: "daily_trending" },
  ];

  const controllerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  // 컨트롤러 토글 버튼
  const toggleController = () => {
    setShowController(!showController);
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
  // API 호출 함수
  const getData = async () => {
    try {
      const responses = await Promise.all(
        categories.map(async (category) => {
          const response = await axiosInstance.get(category.endpoint);
          const filteredData = response.data.results.filter((data: TvItem) => data.poster_path !== null);
          return { title: category.title, category: category.category, datas: filteredData };
        }),
      );
      setData(responses);
      // Trending Weekly 데이터 호출
      const trendingResponse = await axiosInstance.get("/trending/tv/week");
      const filteredData = trendingResponse.data.results.filter((data: TvItem) => data.poster_path !== null);
      setTrendingData(filteredData);
      setSkeleton(false);
    } catch (error) {
      console.log("Fetch Error", error);
      setSkeleton(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // 컨트롤러 바깥 감지 컨트롤러 바깥을 클릭하거나 토글버튼 클릭시 닫힘
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        controllerRef.current &&
        !controllerRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowController(false);
      }
    };
    if (showController) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showController]);

  if (skeleton) return <MovieSkeleton />; // 로딩 중이면 스켈레톤 화면을 표시

  return (
    <div>
      <section className="  z-[0]  absolute top-0 left-0 overflow-hidden ">
        <div className=" w-screen h-[100vh] ">
          <TrendingWeekly data={trendingData} />
        </div>
      </section>

      <div className=" z-[5] mt-[550px] ">
        {data.map((categoryData) => (
          <Category
            key={categoryData.category}
            ref={categoryRefs[`${categoryData.category}`]}
            category={categoryData.category}
            title={categoryData.title}
            data={categoryData.datas}
          />
        ))}
        <Recommend title="Recommend" ref={categoryRefs.recommend} keywords={keywords} endpoints={endpoints} />
      </div>

      {/* 카테고리 토글 버튼 */}
      <div ref={buttonRef}>
        <ControllerButton toggleController={toggleController} />
      </div>
      {showController && (
        <div ref={controllerRef}>
          <CategoryController scrollToCategory={scrollToCategory} />
        </div>
      )}
    </div>
  );
}
