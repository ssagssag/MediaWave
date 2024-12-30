import { Swiper, SwiperSlide } from 'swiper/react';  
import { Link } from "react-router-dom";
import 'swiper/swiper-bundle.css'; 
import { Navigation, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules'; 
import Top5Card from './Top5Card';

export default function Top5({animations}:AnimationProps) {

  const top5Animations = [...animations]
    .slice(0, 5);

  return (
    <>
      <div className="flex items-center justify-center ">
        <Swiper
          modules={[Navigation, Scrollbar, A11y, EffectCoverflow]}
          spaceBetween={20}
          slidesPerView={5} 
          navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }} 
          effect="coverflow" 
          grabCursor={true}
          centeredSlides={true}
          initialSlide={2}
          speed={600}
          preventClicks={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 20,
            depth: 350,
            modifier: 1,
            slideShadows: false,
          }}
          onSwiper={(swiper) => {
            
            swiper.on('click', () => {
              swiper.slideTo(swiper.clickedIndex);
            });
          }}

          className={`w-full sm:w-[500px] md:w-[800px] lg:w-[1200px] xl:w-[1500px] 
            h-[20rem] sm:h-[25rem] md:h-[30rem] lg:h-[30rem] xl:h-[35rem]`}>

          {top5Animations.map((item) => (
            <SwiperSlide 
              key={item.id} 
              className={`
                flex items-center justify-center`}
            >
              <div>
                <div className="relative w-full h-full z-10">
                  {/* Card 컴포넌트 삽입 */}
                  <Link to={`/movie/${item.id}`}>
                  <Top5Card animation={item} />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
            {/* 좌우 화살표 */}
            <div className=''>
              <div className="swiper-button-next text-white rounded-full p-2"></div>
              <div className="swiper-button-prev text-white rounded-full p-2"></div>
            </div>

        </Swiper>
  
      </div>
    </>
  )
}
