export default function GenreButtonListSkeleton() {
  const array = Array.from({ length: 20 }, (_, i) => i);
  return (
    <>
      {array.map((_, idx) => {
        return <div key={idx} className="w-[100px] h-[36px] flex rounded-full items-center gap-2 skeleton"></div>;
      })}
    </>
  );
}
