import { useOutletContext } from "react-router";
import Animation from "./Animation";
import Tv from "./Tv";
import Movie from "./Movie";

export default function Home() {
  const {activeTab} = useOutletContext<{activeTab:number}>();


  const renderActiveTab = () => {
      switch (activeTab){
        case 0:
          return <Movie />;
        case 1:
          return <Tv />;
        case 2:
          return <Animation />;
        default:
          return <Movie />;
      }
    };


  return (
    <main className={`
      flex flex-col items-center justify-center`}>
      {/* 탭 콘텐츠 */}
      <div className="w-[1440px] p-10 mb-10">{renderActiveTab()}</div>
    </main>
  );
}
