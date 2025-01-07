import popular from "../../../assets/categoryController/popular.svg";
import upcoming from "../../../assets/categoryController/upcoming.svg";
import toprated from "../../../assets/categoryController/toprated.svg";
import trending from "../../../assets/categoryController/trending.svg";
import recommend from "../../../assets/categoryController/recommend.svg";
import nowplaying from "../../../assets/categoryController/nowplaying.svg";
import myfavorites from "../../../assets/categoryController/myfavorites.svg";
import mylists from "../../../assets/categoryController/mylists.svg";

interface CategoryControllerProps {
  scrollToCategory: (category: string) => void;
}

export default function CategoryController({ scrollToCategory }: CategoryControllerProps) {
  const svgs = [popular, upcoming, toprated, trending, nowplaying, myfavorites, mylists, recommend];

  const categoryLists = [
    { name: "Popular", key: "popular" },
    { name: "Upcoming", key: "upcoming" },
    { name: "Top Rated", key: "top_rated" },
    { name: "Trending", key: "daily_trending" },
    { name: "Now Playing", key: "now_playing" },
    { name: "My Favorites", key: "my_favorites" },
    { name: "My Lists", key: "my_lists" },
    { name: "Recommend", key: "recommend" },
  ];

  return (
    <div
      className={`
        fixed bottom-48 right-8 z-[10]
        w-[260px] h-[600px] overflow-hidden p-6 rounded-2xl
        shadow-md backdrop-blur-md border-2 border-white
      `}
    >
      <div className="flex flex-col justify-center items-start gap-11 h-full">
        {categoryLists.map((item, index) => (
          <div className="cursor-pointer hover:text-point-500" key={index} onClick={() => scrollToCategory(item.key)}>
            <div className="flex items-center">
              {/* 아이콘 */}
              <div>
                <img src={svgs[index]} alt={item.name} className="w-5 h-5" />
              </div>

              {/* category */}
              <h3 className="font-pretendard text-white  text-base font-semibold ml-3">{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
