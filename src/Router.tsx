import NotFound from "./pages/NotFound";
import { Navigate, Route, Routes } from "react-router-dom";
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
import { LoadingPage } from "./components/loading/Loading";

export default function Router() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* 시작 페이지를 /movie 라우트로 이동하도록 설정 */}
        <Route path="/" element={<Navigate to="/movie" replace />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/tv" element={<Tv />} />
        {/* 임시로 만들어둔 Loading 컴포넌트 확인 페이지입니당 */}
        <Route path="/loading" element={<LoadingPage />}></Route>

        <Route path="/login" element={<Login />} />
        <Route path="/animation" element={<Animation />} />
        <Route path="/genre" element={<Genre />} />
        <Route path="/details/tv/:id" element={<DetailTv />} />
        <Route path="/details/movie/:id" element={<DetailMovie />} />
      </Route>
      
      <Route path="/search" element={<Search />} />
      <Route path="/movie/:id" element={<DetailMovie />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
