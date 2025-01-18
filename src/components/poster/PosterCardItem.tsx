import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { IMAGE_BASE_URL } from "../../constants/urls";

export default function PosterCardItem({ item }: { item: MediaItem }) {
  const [poster, setPoster] = useState("");
  const maxTitleLength = 17;

  const media_type = item.name ? "tv" : "movie";
  const navigate = useNavigate();

  const handleMovetoDetails = (movieId: number) => {
    navigate(`/${media_type}/${movieId}`);
  };

  const truncateText = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    setPoster(item.poster_path);
  }, [item.id]);

  return (
    <div className="cursor-pointer w-full h-full" onClick={() => handleMovetoDetails(item.id)}>
      <div className="w-full h-full bg-white/10 rounded-2xl overflow-hidden relative shadow-custom-heavy group">
        {/* 그라데이션 오버레이 */}
        <div className="w-full h-[50%] bottom-0 absolute bg-gradient-to-t from-[#141414] to-transparent opacity-0 group-hover:opacity-100" />

        {/* 내용 */}
        <div className="absolute font-noto bottom-[5px] flex flex-col items-start justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-[#000000]/50 rounded-3xl py-1 px-2 mb-2">
            <p className="text-white font-noto text-xs">↗ {item.popularity}</p>
          </div>
          <p className="text-xl font-semibold text-white">{truncateText(item.title || item.name, maxTitleLength)}</p>
          <p className="text-white font-noto text-[10px] mt-2 line-clamp-2 opacity-80">{item.overview}</p>
        </div>

        {/* 이미지 */}
        <img
          className="object-cover object-center w-full h-full "
          src={`${IMAGE_BASE_URL}original${item.poster_path}`}
          alt={item.title || item.name}
        />
      </div>
    </div>
  );
}
