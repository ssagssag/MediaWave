import default_ver1 from "../assets/defaultPerson/verson1.png";
import default_ver2 from "../assets/defaultPerson/verson2.png";
import default_ver3 from "../assets/defaultPerson/verson3.png";
import default_ver4 from "../assets/defaultPerson/verson4.png";
import default_ver5 from "../assets/defaultPerson/verson5.png";
import default_ver6 from "../assets/defaultPerson/verson6.png";
import default_ver7 from "../assets/defaultPerson/verson7.png";
import default_ver8 from "../assets/defaultPerson/verson8.png";

export default function getPersonImg() {
  const defaultImgs = [
    default_ver1,
    default_ver2,
    default_ver3,
    default_ver4,
    default_ver5,
    default_ver6,
    default_ver7,
    default_ver8,
  ];

  const randomIndex = Math.floor(Math.random() * defaultImgs.length);
  return defaultImgs[randomIndex];
}
