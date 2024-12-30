import AiringToday from "../components/Tv/AiringToday";
import TvSeries from "../components/Tv/TvSeries";

export default function Tv() {
  return (
    <main className={`
      flex flex-col items-center justify-center`}>
      <div className="w-[1440px] flex flex-row justify-between gap-7 mt-16 px-10">
        <aside className="w-[300px] h-[600px] mt-11">
          <div className="bg-white/20 w-full h-full rounded-[30px]">
            <AiringToday />
          </div>
        </aside>
        <section className="w-[1100px] h-full">
        </section>
      </div>
      <div className="absolute z-30">
        <TvSeries />

      </div>
    </main>
  )
}
