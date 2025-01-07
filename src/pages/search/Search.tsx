import { Link } from "react-router";
import logo from "../../assets/Logo.svg";
import SearchBar from "./components/SearchBar";
import MediaCard from "./components/MediaCard";
import PersonCard from "./components/PersonCard";
import { useState } from "react";
import { searchMulti } from "../../api/axios";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [person, setPerson] = useState([]);
  const [tv, setTv] = useState([]);
  const [movie, setMovie] = useState([]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (query.length > 2) {
      const data = await searchMulti(query);

      const sortedPerson = data
      .filter((item: PersonResult) => item.media_type === "person")
      .sort((a, b) => {
        if (a.profile_path && !b.profile_path) return -1;
        if(!a.profile_path && b.profile_path) return 1;
        return 0;
      })
      setPerson(sortedPerson);
      setTv(data.filter((item: TVResult) => item.media_type === "tv"));
      setMovie(data.filter((item: MovieResult) => item.media_type === "movie"));
    } else {
      setPerson([]);
      setTv([]);
      setMovie([]);
    }
  };

  return (
    <div className="relative flex flex-col items-center w-full h-auto min-h-screen bg-background">
      <header className={`flex flex-col items-center mt-32`}>
        {/* Logo + SearchBar */}
        <Link to={"/"}>
          <img src={logo} alt="메인으로 돌아가기" className="mb-8 w-80" />
        </Link>
        <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
      </header>
      <main>
        {/* 인물 리스트 - todo: 조건부 */}
        <PersonCard person={person} unique="person-swiper" />
        {/* 미디어 카드 2단 - todo: 필터링 렌더링 */}
        <MediaCard tv={tv} movie={movie} />
      </main>
    </div>
  );
}
