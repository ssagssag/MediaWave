import { forwardRef, useEffect, useState } from "react";
import PosterCard from "../../../components/poster/PosterCard";
import { axiosInstance } from "../../../api/axios";

const Category = forwardRef<HTMLDivElement, { title: string; category: string; data: MovieItem[] }>(
  ({ title, category, data }, ref) => {
    // const [datas, setDatas] = useState<MovieItem[]>([]);

    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const data = await axiosInstance.get(`${endpoint}`);
    //       setDatas(data.data.results);
    //     } catch (error) {
    //       console.error(`fetch ${category} error!`, error);
    //     }
    //   };
    //   fetchData();
    // }, []);

    return (
      <div ref={ref} className=" relative z-[5] mt-10 ">
        {/* 카테고리 타이틀 */}
        <h1 className="font-pretendard font-bold text-white text-3xl mb-5 ml-2">{title}</h1>
        {/* 카테고리 카드 */}
        <PosterCard cards={data} unique={category} />
      </div>
    );
  },
);

export default Category;
