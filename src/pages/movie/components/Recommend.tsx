import { forwardRef, useEffect, useState } from "react";
import { axiosInstance } from "../../../api/axios";
import { Link } from "react-router";
import { IMAGE_BASE_URL } from "../../../constants/urls";
import { useInView } from "react-intersection-observer";

const Recommend = forwardRef<HTMLDivElement, { title: string; keywords: string[]; endpoints: string[] }>(
  ({ title, keywords, endpoints }, ref) => {
    const [datas, setDatas] = useState<MovieItem[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [isMore, setIsMore] = useState(true);

    const [activeIndex, setActiveIndex] = useState(0);

    // react intersection observer 라이브러리
    const [refs, inView] = useInView({
      threshold: 0.3,
    });

    const truncateText = (text: string = "", maxLength: number): string =>
      text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

    // 키워드 변경시 새로운 API 호출
    const handleChangeKeyword = (index: number) => {
      setActiveIndex(index);
      // setCurrentEndpoint(endpoints[index]);
      setLoading(true);
    };

    // 키워드에 맞는 API 불러오기
    const getKeywordData = async (currentPage: number) => {
      try {
        const response = await axiosInstance.get(`${endpoints[activeIndex]}&page=${currentPage}`);
        setDatas((prev) => [...prev, ...response.data.results]);
        if (response.data.total_pages <= currentPage) {
          setIsMore(false);
        } else {
          setIsMore(true); // 더 가져올 수 있는 경우 true 유지
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      getKeywordData(1);
    }, []);

    //  키워드 인덱스 변경시 실행 로직
    useEffect(() => {
      setPage(1);
      getKeywordData(1);
      setDatas([]);
    }, [activeIndex]);

    // 페이지 변경시 다음 페이지의 api호출
    useEffect(() => {
      getKeywordData(page);
    }, [page]);

    // 무한 스크롤
    useEffect(() => {
      if (inView && !loading && isMore) {
        setPage((prev) => prev + 1);
      }
    }, [inView, loading, isMore]);

    return (
      <div className="p-10  relative z-[5]">
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
                     ${activeIndex === index && " border-[#2c3a58] bg-point-400"}
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
              <Link to={`/movie/${data.id}`}>
                <div className="w-full h-full bg-white/10 rounded-2xl overflow-hidden relative shadow-custom-heavy group">
                  {/* 그라데이션 오버레이 */}
                  <div className="w-full h-[50%] bottom-0 absolute bg-gradient-to-t from-[#141414] to-transparent opacity-0 group-hover:opacity-100" />

                  {/* 내용 */}
                  <div className="absolute font-noto bottom-[5px] flex flex-col items-start justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-[#000000]/50 rounded-3xl py-1 px-2 mb-2">
                      <p className="text-white font-noto text-xs">↗ {data.popularity}</p>
                    </div>
                    <p className="text-xl font-semibold text-white">{truncateText(data.title, 17)}</p>
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

        {loading && <div>Loading...</div>}
        {!loading && <div ref={refs}></div>}
      </div>
    );
  },
);

export default Recommend;
