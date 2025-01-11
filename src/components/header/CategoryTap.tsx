import { useNavigate } from "react-router-dom";

export default function CategoryTap({ activeTab, onTabChange }: CategoryTapProps) {
  const navigate = useNavigate();

  const tabs = [
    { name: "Movie", path: "/movie" },
    { name: "TV Series", path: "/tv" },
    { name: "Animation", path: "/animation" },
    { name: "Genre", path: "/genre" },
  ];

  const handleTabClick = (index: number, path: string) => {
    onTabChange(index);
    navigate(path);
  };

  return (
    <div className="relative flex flex-row items-center gap-10 ">
      <div
        style={{ transform: `translateX(${activeTab * 127}px)` }}
        className={`
          absolute left-[-15px] z-10 bg-white/30 px-6 py-1.5 w-[120px] h-[40px] rounded-full
          transition-transform duration-200 ease-out-sine
        `}
      />

      {tabs.map((tab, index) => (
        <div
          className={`hover:cursor-pointer rounded-[17px] w-[88px] h-[33px] flex items-center justify-center z-20`}
          key={index}
          onClick={() => handleTabClick(index, tab.path)}
        >
          <p
            className={`
            font-pretendard font-semibold text-[18px]
            ${activeTab === index ? "text-white" : "text-white/50"}
            `}
          >
            {tab.name}
          </p>
        </div>
      ))}
    </div>
  );
}
