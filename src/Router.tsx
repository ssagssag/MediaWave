import DetailMovie from "./pages/DetailMovie";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router";
import Movies from "./components/Movies";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Movies />} />
      <Route path="detail-movie" element={<DetailMovie />} />
    </Routes>
  );
}
