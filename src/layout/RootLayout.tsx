import Nav from "../components/Nav";
import bgImg from "../assets/bg1.jpg";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <>
    <div
      style={{
        backgroundImage: `url(${bgImg})`,  
        backgroundSize: 'cover',                
        minHeight: '100vh'           
      }}
      className={`relative flex flex-col items-center bg-[#1e1e1e]`}>
      <Nav className="absolute z-[999] bg-transparent "/>
      
      <Outlet />
    </div>
  </>
  )
}
