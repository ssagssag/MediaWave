import { useEffect, useState } from "react";

import { ClipLoader } from "react-spinners";
import { axiosInstance } from "../../api/axios";
import SearchBar from "../../components/header/SearchBar";
import Top5 from "../../components/animation/Top5";
import PosterCard from "../../components/poster/PosterCard";

export default function Animation() {
  const [loading, setLoading] = useState(true);
  const [animations, setAnimations] = useState<MovieItem[]>([]);

  const getAnimations = async () => {
    try {
      const {
        data: { results },
      } = await axiosInstance.get("/discover/movie", {
        params: {
          with_genres: 16,
          sort_by: "popularity.desc",
        },
      });
      setAnimations(results);
      console.log(results);
      setLoading(false);
    } catch (error) {
      console.error("Error Fetching Animations:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnimations();
  }, []);

  return (
    <div>
      {loading ? (
        <ClipLoader color="#ffffff" size={50} className="mt-[500px]" />
      ) : (
        <div className="my-[150px] flex flex-col items-center">
          <Top5 animations={animations} />
          <h1 className="mt-20 mb-6 font-title text-white text-[50px] "> All animations </h1>
          <SearchBar />
          {/* All animations */}
          <div className="w-full p-16 border-2 bg-slate-300/10 rounded-3xl mt-14 border-white/50 backdrop-blur-md">
            <PosterCard cards={animations} unique="unique" />
          </div>
        </div>
      )}
    </div>
  );
}
