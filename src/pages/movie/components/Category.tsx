import { forwardRef } from "react";
import PosterCard from "../../../components/poster/PosterCard";
import { MovieItem } from "../../../types/movie";

const Category = forwardRef<HTMLDivElement, { title: string; category: string; data: MovieItem[] }>(
  ({ title, category, data }, ref) => {
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
