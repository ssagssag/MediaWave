//  라이브러리 쓰지 않은 무한 스크롤

import { forwardRef, useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../../api/axios";
import { Link } from "react-router";
import { IMAGE_BASE_URL } from "../../../constants/urls";
import InfiniteScrollSkeleton from "../../../components/person-detail/components/skeleton/InfiniteScrollSkeleton";
import { TvItem } from "../../../types/tv";

const Recommend = forwardRef<HTMLDivElement, { title: string; keywords: string[]; endpoints: string[] }>(
  ({ title, keywords, endpoints }, ref) => {
    const [datas, setDatas] = useState<TvItem[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // 지금까지 불러온 페이지를 저장하는 배열
    const [pageParams, setPageParams] = useState<number[]>([]);

    const [activeIndex, setActiveIndex] = useState(0);

    const observerRef = useRef(null);

    const truncateText = (text: string = "", maxLength: number): string =>
      text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

    // 키워드 변경시 새로운 API 호출
    const handleChangeKeyword = (index: number) => {
      // 초기화
      setPage(1);
      setDatas([]);
      setHasMore(true);
      setPageParams([]);
      setActiveIndex(index);
    };

    // API 호출
    const fetchDatas = async (page: number) => {
      if (pageParams.includes(page)) return;
      setLoading(true);
      try {
        const response = await axiosInstance.get(`${endpoints[activeIndex]}&page=${page}`);
        const filteredData = response.data.results.filter((data: TvItem) => data.poster_path !== null);
        setDatas((prev) => [...prev, ...filteredData]);
        setPageParams((prev) => [...prev, page]);
        setHasMore(response.data.page < response.data.total_pages);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchDatas(page);
    }, [page]);

    useEffect(() => {
      // Intersection observer api 사용
      const observer = new IntersectionObserver(
        (entries) => {
          const firstEntry = entries[0];
          if (firstEntry.isIntersecting && hasMore && !loading) {
            setPage((prev) => prev + 1);
          }
        },
        { threshold: 0.3 },
      );

      if (observerRef.current) observer.observe(observerRef.current);
      return () => {
        if (observerRef.current) observer.unobserve(observerRef.current);
      };
    }, []);

    return (
      <div className="mt-10  relative z-[5]">
        {/* 카테고리 타이틀 */}
        <h1 className="font-pretendard font-bold text-white text-3xl mb-5 ml-2" ref={ref}>
          {title}
        </h1>
        {/* 추천 키워드  */}
        <ul className="flex justify-left items-center gap-2">
          {keywords.map((keyword, index) => (
            <li key={`${keyword}- ${index}`}>
              <button
                onClick={() => handleChangeKeyword(index)}
                className={`whitespace-nowrap text-white border-[#3c3c3c] px-4 py-2 bg-main-700 rounded-full inline-flex
                ${activeIndex === index && " border-[#2c3a58] bg-point-500"} 
                  `}
              >
                {keyword}
              </button>
            </li>
          ))}
        </ul>

        {/* 키워드별 이미지들 */}
        <div className="grid grid-cols-8 gap-4 mt-7">
          {datas.map((data, index) => (
            <div key={`${data.id} - ${index}`}>
              <Link to={`/tv/${data.id}`}>
                <div className="w-full h-full bg-white/10 rounded-2xl overflow-hidden relative shadow-custom-heavy group">
                  {/* 그라데이션 오버레이 */}
                  <div className="w-full h-[50%] bottom-0 absolute bg-gradient-to-t from-[#141414] to-transparent opacity-0 group-hover:opacity-100" />

                  {/* 내용 */}
                  <div className="absolute font-noto bottom-[5px] flex flex-col items-start justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-[#000000]/50 rounded-3xl py-1 px-2 mb-2">
                      <p className="text-white font-noto text-xs">↗ {data.popularity}</p>
                    </div>
                    <p className="text-xl font-semibold text-white">{truncateText(data.name, 17)}</p>
                    <p className="text-white font-noto text-[10px] mt-2 line-clamp-2 opacity-80">{data.overview}</p>
                  </div>

                  {/* 이미지 */}
                  <img
                    className="object-cover object-center w-full h-full "
                    src={`${IMAGE_BASE_URL}original${data.poster_path}`}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div ref={observerRef} className="w-full text-white text-2xl text-center  ">
          {hasMore ? <InfiniteScrollSkeleton /> : ""}
        </div>
      </div>
    );
  },
);

export default Recommend;
