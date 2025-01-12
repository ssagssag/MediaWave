export default function InfiniteScrollSkeleton() {
  return (
    <>
      {/* 컨텐츠 */}
      <article className="w-full h-full flex  justify-center gap-4 items-center mt-10 ">
        <article className=" w-44 h-60  rounded-2xl skeleton2"></article>
        <article className=" w-44 h-60  rounded-2xl skeleton2"></article>
        <article className=" w-44 h-60  rounded-2xl skeleton2"></article>
        <article className=" w-44 h-60  rounded-2xl skeleton2"></article>
        <article className=" w-44 h-60  rounded-2xl skeleton2"></article>
        <article className=" w-44 h-60  rounded-2xl skeleton2"></article>
        <article className=" w-44 h-60  rounded-2xl skeleton2"></article>
        <article className=" w-44 h-60  rounded-2xl skeleton2"></article>
      </article>
    </>
  );
}
