import { IMAGE_BASE_URL } from "../../../constants/urls";
import getPersonImg from "../../../utils/getPersonImg";

export default function PersonCardItem({ item }: PersonCardItemProps) {
  const defaultPersonImg = getPersonImg();

  const nameParts = item.name.length > 10 ? item.name.split(" ") : [item.name];
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ")

  return (
    <div className="flex flex-col items-center">
      {/* 인물 프로필 이미지 */}
      <div className="rounded-full bg-main-400 w-24 h-24 overflow-hidden">
        {item.profile_path ? (
          <img
            className="rounded-full w-full h-full object-cover object-center"
            src={`${IMAGE_BASE_URL}/t/p/w185/${item.profile_path}`}
          />
        ) : (
          defaultPersonImg
        )}
      </div>
      {/* 인물 프로필 정보 */}
      {/* todo - 글자수에 따라 줄바꿈 (" ") 띄어쓰기 기준 */}
      <div className="flex flex-col items-center leading-tight mt-3">
        <p className="font-sans text-center text-white">{firstName}</p>
        {lastName && <p className="font-sans text-center text-white">{lastName}</p>}
      
      </div>
    </div>
  );
}
