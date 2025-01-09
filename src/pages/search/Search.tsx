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
  const [isFocused, setIsFocused] = useState(false);
  const [focusedPerson, setFocusedPerson] = useState<PersonResult | null>(null);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (query.length > 2) {
      const data = await searchMulti(query);

      const sortedPerson = data
        .filter((item: PersonResult) => {
          return (
            item.media_type === "person" && 
            item.known_for.some((media) => media.poster_path)
          );
      })
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

  const handlePersonClick = (personData: PersonResult) => {
    setIsFocused(true);
    setFocusedPerson(personData);
  };

  const handleBackToMedia = () => {
    setIsFocused(false);
    setFocusedPerson(null);
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
      <main className="mt-14 mb-40 flex flex-col items-center gap-10">
        {/* 인물 카드 리스트 */}
        {person.length > 0 && <PersonCard person={person} unique="person-swiper" onPersonClick={handlePersonClick} />}

        {/* media 카드 리스트 */}
        {isFocused && focusedPerson ? (
          <div className="flex flex-col items-center">
            {/* 인물 검색 -> 미디어 검색으로 돌아가기 */}
            <button onClick={handleBackToMedia} className="bg-main-400 text-white px-3 py-1 rounded-full opacity-20 hover:opacity-85 mb-10"> Back to Media </button>
            <MediaCard media={focusedPerson.known_for} />
          </div>
        ) : (
          <MediaCard media={[...tv, ...movie]} />
        )}
      </main>
    </div>
  );
}
