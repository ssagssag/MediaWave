import Home from "./pages/Home";
import Nav from "./components/Nav";

export default function App() {
  return (
    <>
      <div className="flex flex-col items-center bg-[#1E1E1E]">
        <Nav />
        {/* 메인 */}
        <Home />
      </div>
    </>
  );
}
