import Movies from "../components/Movies";
import Recommend from "../components/recommend/Recommend";

export default function Movie() {
  return (
    <main className={`
      flex flex-col items-center justify-center`}>
      <div className="w-[1440px] flex flex-row justify-between gap-7 mt-16 px-10">
        <aside className="w-[300px] h-[600px] mt-11">
          <div className="bg-white/20 w-full h-full rounded-[30px]"/>
        </aside>
        <section className="w-[1100px] h-full">
          <Recommend />
        </section>
      </div>
        <Movies />
    </main>
  )
}
