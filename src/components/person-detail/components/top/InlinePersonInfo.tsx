export default function InlinePersonInfo({ imgSrc, personInfo }: { imgSrc: string; personInfo: string | number }) {
  return (
    <article className="text-white flex gap-[10px] items-start">
      <img src={imgSrc} alt="인기 아이콘" />
      <span>{personInfo}</span>
    </article>
  );
}
