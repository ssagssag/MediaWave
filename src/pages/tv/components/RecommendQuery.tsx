import { forwardRef, useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../../api/axios";
import { Link } from "react-router";
import { IMAGE_BASE_URL } from "../../../constants/urls";
import InfiniteScrollSkeleton from "../../../components/person-detail/components/skeleton/InfiniteScrollSkeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { TvItem } from "../../../types/tv";

interface FecthDataResult {
  results: TvItem[];
  page: number;
  total_pages: number;
}

const RecommendQuery = forwardRef<HTMLDivElement, { title: string; keywords: string[]; endpoints: string[] }>(
  ({ title, keywords, endpoints }, ref) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { ref: viewRef, inView } = useInView();

    const truncateText = (text: string = "", maxLength: number): string =>
      text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

    // 키워드 변경시 새로운 API 호출
    const handleChangeKeyword = (index: number) => {
      setActiveIndex(index);
    };

    // 키워드 API 호출
    const fetchDatas = async (page: any) => {
      try {
        const response = await axiosInstance.get(`${endpoints[activeIndex]}&page=${page}`);
        // const filteredData = response.data.results.filter((data: MovieItem) => data.poster_path !== null);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };

    // useInfiniteQuery를 사용해 무한스크롤 구현
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery<
      FecthDataResult,
      Error
    >({
      queryKey: ["keyword", activeIndex],
      queryFn: ({ pageParam = 1 }) => {
        return fetchDatas(pageParam);
      },
      getNextPageParam: (last) => {
        if (last && last.page < last.total_pages) {
          const newPage = last.page + 1;
          return newPage;
        }
        return undefined;
      },
      initialPageParam: 1,
    });
    console.log(data?.pages);

    // 화면 밑단이 보이고 다음 페이지가 있고 다른 API를 호출하고 있지 않을때 다음 페이지를 호출
    useEffect(() => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, [inView]);

    useEffect(() => {
      refetch();
    }, [activeIndex, refetch]);

    return (
      // <div>Hello</div>
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
          {data?.pages.map((page, index) => {
            // 이미지 없는 데이터 필터링
            const filteredData = page.results.filter((data: TvItem) => data.poster_path !== null);
            return filteredData.map((item) => (
              <div key={`${item.id} - ${index}`}>
                <Link to={`/tv/${item.id}`}>
                  <div className="w-full h-full bg-white/10 rounded-2xl overflow-hidden relative shadow-custom-heavy group">
                    {/* 그라데이션 오버레이 */}
                    <div className="w-full h-[50%] bottom-0 absolute bg-gradient-to-t from-[#141414] to-transparent opacity-0 group-hover:opacity-100" />

                    {/* 내용 */}
                    <div className="absolute font-noto bottom-[5px] flex flex-col items-start justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-[#000000]/50 rounded-3xl py-1 px-2 mb-2">
                        <p className="text-white font-noto text-xs">↗ {item.popularity}</p>
                      </div>
                      <p className="text-xl font-semibold text-white">{truncateText(item.name, 17)}</p>
                      <p className="text-white font-noto text-[10px] mt-2 line-clamp-2 opacity-80">{item.overview}</p>
                    </div>

                    {/* 이미지 */}
                    <img
                      className="object-cover object-center w-full h-full "
                      src={`${IMAGE_BASE_URL}original${item.poster_path}`}
                    />
                  </div>
                </Link>
              </div>
            ));
          })}
        </div>

        <div className="w-full text-white text-2xl text-center" ref={viewRef}>
          {hasNextPage ? <InfiniteScrollSkeleton /> : ""}
        </div>
      </div>
    );
  },
);

export default RecommendQuery;
