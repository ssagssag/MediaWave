import Home from "./pages/Home";
import Nav from "./components/Nav";

export default function App() {
  return (
    <>
      <div className="relative flex flex-col items-center bg-[#1e1e1e]">
        <Nav className="absolute z-[999] bg-transparent "/>
        {/* 메인 */}
        <Home className="relative"/>
      </div>
    </>
  );
}
