export default function MovieSkeleton() {
  return (
    <>
      {/* 컨텐츠 */}
      <article className="w-full h-full flex  justify-center gap-10 items-center mt-10">
        <article className=" w-56 h-72 rounded-2xl skeleton2"></article>
        <article className=" w-56 h-72 rounded-2xl skeleton2"></article>
        <article className=" w-56 h-72 rounded-2xl skeleton2"></article>
        <article className=" w-56 h-72 rounded-2xl skeleton2"></article>
        <article className=" w-56 h-72 rounded-2xl skeleton2"></article>
      </article>
    </>
  );
}
