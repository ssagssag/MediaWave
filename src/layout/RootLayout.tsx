import { Outlet } from "react-router";
import Nav from "../components/Nav";
import bgImg from "../assets/bg1.jpg";
import { useState } from "react";

export default function RootLayout() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
    <div
      style={{
        backgroundImage: `url(${bgImg})`,  
        backgroundSize: 'cover',                
        minHeight: '100vh'           
      }}
      className={`relative flex flex-col items-center bg-[#1e1e1e]`}>
      <Nav className="absolute z-[999] bg-transparent " onTabChange={setActiveTab} activeTab={activeTab}/>
      <Outlet context={{activeTab}}/>
    </div>
  </>
  )
}
