import { useEffect, useState } from "react";
import { IMAGE_BASE_URL } from "../../../constants/urls";
import getPersonImg from "../../../utils/getPersonImg";

export default function PersonCardItem({ item, onClick, focusedPerson }: PersonCardItemProps) {
  const [animationClass, setAnimationClass] = useState("opacity-0");
  const [personImg, setPersonImg] = useState<string | undefined>(""); 

  const nameParts = item.name.length > 10 ? item.name.split(" ") : [item.name];
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ")


  useEffect(() => {
    if (!personImg) {
      setPersonImg(getPersonImg());
    }
  }, [personImg]);

  useEffect(() => {
    if(focusedPerson?.id === item.id){
      setAnimationClass("opacity-100");
    } else{
      setAnimationClass("opacity-0")
    }
  }, [focusedPerson, item.id])

  return (
    <div onClick={() => onClick(item)} className="relative flex flex-col items-center cursor-pointer w-auto h-auto p-5">
      
      {/* 인물 프로필 이미지 */}
      <div className="rounded-full bg-main-400 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden">
        {item.profile_path ? (
          <img
            className="rounded-full w-full h-full object-cover object-center"
            src={`${IMAGE_BASE_URL}/t/p/w185/${item.profile_path}`}
          />
        ) : (
          <img src={personImg} alt={item.name} /> )}
        </div>
      {/* 인물 프로필 정보 */}
      <div className="flex flex-col items-center leading-tight mt-3">
        <p className="font-sans text-center text-white">{firstName}</p>
        {lastName && <p style={{ whiteSpace: "nowrap" }} className={`font-sans text-center text-white ${
    lastName.length > 7 ? "text-sm" : "text-base"
  }`}>{lastName}</p>}
      </div>

      {focusedPerson?.id === item.id && (
      <div
      className={`
        absolute top-2 left-0 w-28 h-40 z-[-1] 
        bg-white/10 border-2 border-white rounded-2xl
        transition-opacity duration-500 ease-out ${animationClass}
      `}/>
      )}
    </div>
  );
}
