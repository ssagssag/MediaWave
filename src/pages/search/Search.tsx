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
        .sort((a: PersonResult, b: PersonResult) => {
          if (a.profile_path && !b.profile_path) return -1;
          if (!a.profile_path && b.profile_path) return 1;
          return 0;
        });
      setPerson(sortedPerson);
      setTv(data.filter((item: MediaResult) => item.media_type === "tv" && item.poster_path));
      setMovie(data.filter((item: MediaResult) => item.media_type === "movie" && item.poster_path));
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
      <main className="mt-14 mb-40 flex flex-col items-center gap-20">
        {/* 인물 카드 렌더링 */}
        {person.length > 0 && <PersonCard person={person} unique="person-swiper" />}
        {/* media 카드 렌더링 */}
        <MediaCard media={[...tv,...movie]} />
      </main>
    </div>
  );
}
