import Movies from "../../components/Movies";
import Recommend from "../../components/recommend/Recommend";
import TrendingMovie from "../../components/TrendingMovie";

export default function Movie() {
  return (
    <main
      className={`
      flex flex-col items-center justify-center`}
    >
      <div className="w-[1440px] flex flex-row justify-between gap-7 mt-16 px-10">
        <aside className="w-[400px] h-[600px] mt-11 overflow-hidden">
          <TrendingMovie />
        </aside>
        <section className="w-[1030px] h-full">
          <Recommend />
        </section>
      </div>
      <Movies />
    </main>
  );
}
