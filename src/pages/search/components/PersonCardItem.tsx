export default function PersonCardItem() {
  return (
    <div className="flex flex-col items-center">
      {/* 인물 프로필 이미지 */}
      <div className="rounded-full bg-white/50 w-24 h-24" />
      {/* 인물 프로필 정보 */}
      {/* todo - 글자수에 따라 줄바꿈 (" ") 띄어쓰기 기준 */}
      <p className="font-sans flex flex-col items-center text-white mt-3">
        Benedict
      </p>
    </div>
  );
}
