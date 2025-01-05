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
  const svgs = [popular, upcoming, toprated, trending, recommend, nowplaying, myfavorites, mylists];

  const categoryLists = [
    { name: "Popular", key: "popular" },
    { name: "Upcoming", key: "upcoming" },
    { name: "Top Rated", key: "top_rated" },
    { name: "Trending", key: "daily_trending" },
    { name: "Now Playing", key: "now_playing" },
    { name: "My Favorites", key: "my_favorites" },
    { name: "My Lists", key: "my_lists" },
  ];

  return (
    <div
      className={`
          w-full h-full bg-[#414141] p-6 rounded-2xl 
          shadow-md backdrop-blur-md border-2 border-white/50 `}
    >
      <div className="flex flex-col gap-11 ">
        {categoryLists.map((item, index) => (
          <div className="cursor-pointer" key={index} onClick={() => scrollToCategory(item.key)}>
            <div className="flex items-center">
              {/* 아이콘 */}
              <img src={svgs[index]} alt={item.name} />

              {/* category */}
              <h3 className=" font-pretendard text-white ml-4 flex flex-row items-center gap-2 text-base font-semibold">
                {item.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
