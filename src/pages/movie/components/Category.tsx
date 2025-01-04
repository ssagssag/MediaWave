import { useEffect, useState } from "react";
import PosterCard from "../../../components/poster/PosterCard";
import { axiosInstance } from "../../../api/axios";

export default function Category({ title, endpoint, category }: { title: string; endpoint: string; category: string }) {
  const [datas, setDatas] = useState<MovieItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axiosInstance.get(`${endpoint}`);
        setDatas(data.data.results);
      } catch (error) {
        console.error(`fetch ${category} error!`, error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* 카테고리 타이틀 */}
      <h1 className="font-pretendard font-bold text-white text-3xl">{title}</h1>
      {/* 카테고리 카드 */}
      <PosterCard cards={datas} unique={category} />
    </div>
  );
}
