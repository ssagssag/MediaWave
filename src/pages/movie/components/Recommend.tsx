import { forwardRef, useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../../api/axios";
import { Link } from "react-router";
import { IMAGE_BASE_URL } from "../../../constants/urls";

const Recommend = forwardRef<HTMLDivElement, { title: string; endpoint: string }>(({ title, endpoint }, ref) => {
  const [datas, setDatas] = useState<MovieItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  // viewport가 감지할 타겟 ref 지정
  const target = useRef<HTMLDivElement | null>(null);

  const maxTitleLength = 17;

  const truncateText = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  // 무한스크롤 구현을 위한 Intersection Observer API 사용
  // 옵션과 타켓 발견시 실행할 콜백함수 설정
  const options = {
    threshold: 0.3,
  };
  const callback = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (!loading && target.isIntersecting) {
      setLoading(true); // 로딩 상태를 먼저 true로 설정
      setPage((prev) => prev + 1);
    }
  };
  const observer = new IntersectionObserver(callback, options);

  useEffect(() => {
    if (target.current) {
      observer.observe(target.current);
    }
    return () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
  }, [target.current]);

  useEffect(() => {
    const getKeywordData = async () => {
      try {
        const response = await axiosInstance.get(`${endpoint}&page=${page}`);
        setDatas((prev) => [...prev, ...response.data.results]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getKeywordData();
  }, [page]);

  // 이미지를 로드한 후 IntersectionObserver가 타겟을 관찰하도록 설정.
  const handleImageLoad = () => {
    if (target.current) {
      const observer = new IntersectionObserver(callback, options);
      observer.observe(target.current);
    }
  };

  return (
    <div className="p-10  relative z-[5]">
      {/* 카테고리 타이틀 */}
      <h1 className="font-pretendard font-bold text-white text-3xl mb-5" ref={ref}>
        {title}
      </h1>
      {/* 추천 키워드  */}
      <ul className="flex justify-left items-center gap-2">
        <li className="bg-white p-2 rounded-full bg-point-300 ">
          <button>#한국</button>
        </li>
        <li className="bg-white p-2 rounded-full">
          <button>#스포츠</button>
        </li>
        <li className="bg-white p-2 rounded-full">
          <button>#힐링</button>
        </li>

        <li className="bg-white p-2 rounded-full">
          <button>#청춘</button>
        </li>
      </ul>

      {/* 키워드별 이미지들 */}
      <div className="grid grid-cols-6 gap-4 mt-7">
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
                  <p className="text-xl font-semibold text-white">{truncateText(data.title, maxTitleLength)}</p>
                  <p className="text-white font-noto text-[10px] mt-2 line-clamp-2 opacity-80">{data.overview}</p>
                </div>

                {/* 이미지 */}
                <img
                  className="object-cover object-center w-full h-full "
                  src={`${IMAGE_BASE_URL}original${data.poster_path}`}
                  onLoad={handleImageLoad}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>

      {loading && <div>Loading...</div>}
      {!loading && <div ref={target}></div>}
    </div>
  );
});

export default Recommend;
