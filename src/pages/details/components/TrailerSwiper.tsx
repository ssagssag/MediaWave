import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Play from "../../../assets/detailPage/play-icon.svg";

interface MovieVideo {
  key: string;
  name: string;
  type: string;
}

interface TrailerSwiperProps {
  videos: MovieVideo[];
}

export default function TrailerSwiper({ videos }: TrailerSwiperProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="relative w-full">
      <Swiper modules={[Navigation]} navigation loop slidesPerView={3} spaceBetween={20} className="w-full">
        {videos.map((video) => (
          <SwiperSlide key={video.key}>
            <div className="relative overflow-hidden rounded-xl aspect-video">
              {activeVideo === video.key ? (
                <iframe
                  src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
                  title={video.name}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay"
                  allowFullScreen
                />
              ) : (
                <div className="relative w-full h-full cursor-pointer group" onClick={() => setActiveVideo(video.key)}>
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                    alt={video.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center transition-colors bg-black/50 group-hover:bg-black/30">
                    <img src={Play} alt="재생"/>
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
