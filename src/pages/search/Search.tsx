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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async (query: string, page = 1) => {
    setSearchQuery(query);

    if (query.length > 2) {
      const data = await searchMulti(query, page);

      const sortedPerson = data.results
        .filter((item: PersonResult) => {
          return item.media_type === "person" && item.known_for.some((media) => media.poster_path);
        })
        .sort((a: PersonResult, b: PersonResult) => {
          if (a.profile_path && !b.profile_path) return -1;
          if (!a.profile_path && b.profile_path) return 1;
          return 0;
        });
      setPerson(sortedPerson);
      setTv(
        data.results
          .filter((item: MediaResult) => item.media_type === "tv" && item.poster_path)
          .sort((a: MediaResult, b: MediaResult) => b.popularity - a.popularity),
      );

      setMovie(
        data.results
          .filter((item: MediaResult) => item.media_type === "movie" && item.poster_path)
          .sort((a: MediaResult, b: MediaResult) => b.popularity - a.popularity),
      );

      setCurrentPage(page);
      setTotalPages(data.total_pages || 1);
    } else {
      setPerson([]);
      setTv([]);
      setMovie([]);
      setCurrentPage(1);
      setTotalPages(1);
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

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      handleSearch(searchQuery, page);
    }
  };

  const getPageNumbers = () => {
    const maxButtons = 10;
    const startPage = Math.floor((currentPage - 1) / maxButtons) * maxButtons + 1;
    const endPage = Math.min(startPage + maxButtons - 1, totalPages);

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return (
    <div className="relative flex flex-col items-center w-full h-auto min-h-screen bg-background overflow-x-hidden">
      <header className={`flex flex-col items-center mt-32`}>
        {/* Logo + SearchBar */}
        <Link to={"/"}>
          <img src={logo} alt="메인으로 돌아가기" className="mb-8 w-80" />
        </Link>
        <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
      </header>
      <main className="mt-8 mb-40 flex flex-col items-center gap-4 w-full overflow-x-hidden">
        {/* 인물 카드 리스트 */}
        {person.length > 0 && (
          <PersonCard
            person={person}
            unique="person-swiper"
            focusedPerson={focusedPerson}
            onPersonClick={handlePersonClick}
          />
        )}

        {/* media 카드 리스트 */}
        {isFocused && focusedPerson ? (
          <div className="flex flex-col items-center">
            {/* 인물 검색 -> 미디어 검색으로 돌아가기 */}
            <button
              onClick={handleBackToMedia}
              className="bg-main-400 text-white px-3 py-1 rounded-full opacity-20 hover:opacity-85 mb-10"
            >
              Back to Media
            </button>
            <MediaCard media={focusedPerson.known_for} />
          </div>
        ) : (
          <>
            <MediaCard media={[...tv, ...movie]} />
            {/* 페이지네이션 UI */}
            {totalPages > 1 && (
              <div className="flex gap-2 mt-16 font-sans font-medium">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(Math.max(1, currentPage - 10))}
                  className="px-4 py-2 bg-main-600 text-white rounded disabled:opacity-50"
                >
                  prev
                </button>
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded ${
                      currentPage === page ? "bg-main-600 text-white" : "bg-main-400 text-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 10))}
                  className="px-4 py-2 bg-point-500 text-white rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
