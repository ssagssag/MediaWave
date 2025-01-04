import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout";
import Login from "./pages/login/Login";
import Search from "./pages/search/Search";
import Movie from "./pages/movie/Movie";
import Tv from "./pages/tv/Tv";
import Genre from "./pages/genre/Genre";
import DetailTv from "./pages/details/DetailTv";
import Animation from "./pages/animation/Animation";
import DetailMovie from "./pages/details/DetailMovie";

export default function Router() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/animation" element={<Animation />} />
        <Route path="/genre" element={<Genre />} />
        <Route path="/details/tv/:id" element={<DetailTv />} />
        <Route path="/details/movie/:id" element={<DetailMovie />} />
      </Route>
      <Route path="/movie/:id" element={<DetailMovie />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
