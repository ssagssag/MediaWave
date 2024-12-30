

export default function CategoryTap({ activeTab, onTabChange }: CategoryTapProps) {
  const tabs = ["Movie","TV Series", "Animation"];

  return (
    <div className="flex flex-row items-center gap-10 relative ">
      <div
        style={{ transform: `translateX(${activeTab * 127}px)` }} 
        className={`
          absolute left-[-15px] z-10 bg-white/30 px-6 py-1.5 w-[120px] h-[40px] rounded-full
          transition-transform duration-200 ease-out-sine
        `}/>

      {tabs.map((tab, index) => (
        <div
          className={`hover:cursor-pointer rounded-[17px] w-[88px] h-[33px] flex items-center justify-center z-20`} 
          key={index} 
          onClick={() => onTabChange(index)}>
          <p className={`
            font-pretendard font-semibold text-[18px]
            ${activeTab === index ? "text-white" : "text-white/50"}
            `}>{tab}</p>
        </div>
      ))}
    </div>
  )
}
