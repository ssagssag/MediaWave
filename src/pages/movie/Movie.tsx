import { useEffect, useRef, useState } from "react";
import Category from "./components/Category";
import CategoryController from "./components/CategoryController";
import TrendingWeekly from "./components/TrendingWeekly";
import ControllerButton from "../../components/controller-button/ControllerButton";
import Recommend from "./components/Recommend";
import MovieSkeleton from "../../components/person-detail/components/skeleton/MovieSkeleton";
import { axiosInstance } from "../../api/axios";

export default function Movie() {
  const [skeleton, setSkeleton] = useState(true); // 전체 로딩 상태
  const [data, setData] = useState<{ title: string; category: string; datas: MovieItem[] }[]>([]); // 불러온 데이터
  const [trendingData, setTrendingData] = useState<MovieItem[]>([]); // Trending 데이터

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
  const [showController, setShowController] = useState(false);

  // 키워드 이름과 엔드포인트
  const keywords = ["#한국", "#스포츠", "#힐링", "#중세"]; // 키워드 배열
  const endpoints = [
    "/discover/movie?sort_by=vote_count.desc&with_original_language=ko&region=KR",
    "/discover/movie?sort_by=popularity.desc&with_keywords=6075",
    "/discover/movie?sort_by=popularity.desc&with_keywords=167696",
    "/discover/movie?sort_by=vote_count.desc&with_keywords=161257",
  ];
  const categories = [
    { title: "Popular", endpoint: "/movie/popular", category: "popular" },
    { title: "Upcoming", endpoint: "/movie/upcoming", category: "upcoming" },
    { title: "Top Rated", endpoint: "/movie/top_rated", category: "top_rated" },
    { title: "Trending", endpoint: "/trending/movie/day", category: "daily_trending" },
    { title: "Now Playing", endpoint: "/movie/now_playing", category: "now_playing" },
    { title: "My Favorites", endpoint: "/movie/now_playing", category: "my_favorites" },
    { title: "My Lists", endpoint: "/movie/now_playing", category: "my_lists" },
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
          return { title: category.title, category: category.category, datas: response.data.results };
        }),
      );
      setData(responses);
      // Trending Weekly 데이터 호출
      const trendingResponse = await axiosInstance.get("/trending/movie/week");
      setTrendingData(trendingResponse.data.results);
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
