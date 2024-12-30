
export default function Top5Card({animation}:Top5CardProps) {
  return (
    <div
    id={String(animation.id)}
    className={`
      bg-white 
      sm:hidden md:hidden lg:block 
      sm:w-[10%] md:w-[60%] lg:w-[310px] 
      h-[25rem] sm:h-[15rem] md:h-[30rem] lg:h-[30rem]
      rounded-3xl 
      `}>
      <img
        src={`https://image.tmdb.org/t/p/w500${animation.poster_path}`}
        alt={animation.title}
        className="w-full h-full object-cover rounded-3xl"
      />
    </div>
  )
}
