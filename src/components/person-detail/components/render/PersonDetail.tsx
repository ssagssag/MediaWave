import { usePersonDetailModalStore } from "../../../../store/PersonDetailModalStore";
import PersonDetailModalTop from "../top/PersonDetailModalTop";
import PersonDetailModalContent from "../content/PersonDetailModalContent";

export default function PersonDetail() {
  const personDetail = usePersonDetailModalStore((state) => state.personDetail);

  return (
    <>
      <article className="flex flex-col gap-[60px]">
        {/* 상단 */}
        <PersonDetailModalTop personDetail={personDetail} />
        {/* 컨텐츠 */}
        <PersonDetailModalContent />
      </article>
    </>
  );
}
