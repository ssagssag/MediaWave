import Movies from "../components/Movies";

export default function Home() {
  return (
    <main className={`
      h-screen p-10
      flex flex-row justify-between gap-7 mt-5
      `}>
      <aside className="w-[300px] h-[500px] mt-12">
        <div className="bg-white/20 w-full h-full rounded-[30px]"/>
      </aside>
      <section className="w-[1000px] h-full">
        <Movies />
      </section>
    </main>
  );
}
