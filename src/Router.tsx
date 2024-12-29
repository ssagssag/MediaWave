import DetailMovie from "./pages/DetailMovie";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Animation from "./pages/Animation";
import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout";

export default function Router() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/animation" element={<Animation />} />
        <Route path="/detail-movie" element={<DetailMovie />} />
      </Route>

      <Route path="*" element={<NotFound />}/>
    </Routes>
  );
}
