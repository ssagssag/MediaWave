import PersonalDetailModalSkeleton from "./PersonalDetailModalSkeleton";

export default function PersonDetailModal() {
  return (
    <article className="absolute top-0 left-0 z-50">
      <article className="w-screen bg-black bg-opacity-60 flex justify-center z-50">
        <article className="w-full min-h-full max-w-[1136px] px-[50px] py-[20px]">
          <article className="w-full h-full px-[80px] py-[65px] bg-[#1E1E1E] rounded-3xl">
            <PersonalDetailModalSkeleton />
          </article>
        </article>
      </article>
    </article>
  );
}
