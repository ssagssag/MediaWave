export default function GenreContentSkeleton() {
  const array = Array.from({ length: 18 }, (_, i) => i);
  return (
    <>
      {array.map((_, idx) => {
        return <article key={idx} className="w-[calc(100%/6-30px)] h-[20.125rem] rounded-xl skeleton"></article>;
      })}
    </>
  );
}
