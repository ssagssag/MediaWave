export default function PersonDetailModalSkeleton() {
  return (
    <article className="flex flex-col gap-[60px]">
      {/* 상단 */}
      <article className="flex gap-[35px] items-center">
        <article className="w-[124px] h-[124px] rounded-full skeleton"></article>
        <article className="flex flex-col gap-[18px]">
          <article className="w-[60px] h-[10px] skeleton"></article>
          <article className="flex flex-col gap-[10px]">
            <article className="w-[113px] h-[16px] skeleton"></article>
            <article className="w-[113px] h-[16px] skeleton"></article>
          </article>
          <article className="w-[250px] h-[16px] skeleton"></article>
        </article>
      </article>
      {/* 컨텐츠 */}
      <article className="flex flex-col gap-[50px]">
        <article className="flex flex-col gap-[20px]">
          <h2 className="text-[20px] w-[100px] h-[30px] rounded-3xl skeleton"></h2>
          <article className="flex justify-between">
            <article className="w-[150px] h-[220px] max-h-[220px] rounded-3xl skeleton"></article>
            <article className="w-[150px] h-[220px] max-h-[220px] rounded-3xl skeleton"></article>
            <article className="w-[150px] h-[220px] max-h-[220px] rounded-3xl skeleton"></article>
            <article className="w-[150px] h-[220px] max-h-[220px] rounded-3xl skeleton"></article>
            <article className="w-[150px] h-[220px] max-h-[220px] rounded-3xl skeleton"></article>
          </article>
        </article>
        <article className="flex flex-col gap-[20px]">
          <h2 className="text-[20px] w-[100px] h-[30px] rounded-3xl skeleton"></h2>
          <article className="flex justify-between">
            <article className="w-[150px] h-[220px] max-h-[220px] rounded-3xl skeleton"></article>
            <article className="w-[150px] h-[220px] max-h-[220px] rounded-3xl skeleton"></article>
            <article className="w-[150px] h-[220px] max-h-[220px] rounded-3xl skeleton"></article>
            <article className="w-[150px] h-[220px] max-h-[220px] rounded-3xl skeleton"></article>
            <article className="w-[150px] h-[220px] max-h-[220px] rounded-3xl skeleton"></article>
          </article>
        </article>
      </article>
    </article>
  );
}
