import DetailMovie from "./pages/DetailMovie";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout";

export default function Router() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/movie/:id" element={<DetailMovie />} />

      <Route path="*" element={<NotFound />}/>
    </Routes>
  );
}
