import { useState } from "react";
import searchIcon from "../../assets/Search_icon.svg";
import { searchMovie } from "../../api/axios";
import { useNavigate } from "react-router";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if(query.length > 2){
      const data = await searchMovie(query);
      setResults(data);
    }else{
      setResults([]);
    }
  }

  const handleResultClick = (id: string) => {
    navigate(`/movie/${id}`);
  }

  return (
    <div className="relative w-[350px] h-[40px]">
      <form onSubmit={(e) => e.preventDefault()}>
        <input 
          value={searchQuery}
          onChange={handleSearch}
          className={`
            bg-slate-400/30 
            placeholder:font-pretendard placeholder:text-sm 
            px-6 focus:outline-none placeholder:text-white/50
            w-full h-[40px] rounded-full text-white focus:bg-slate-400/60 `}
          type="text"
          placeholder="무엇을 찾고 계신가요?"
        />
          <img className="absolute top-2 right-4 opacity-60" src={searchIcon} alt="검색하기"/>
      </form>

      {/* 검색 결과 표시 */}
      {results.length > 0 && (
        <div className="absolute mt-2 w-full bg-[#1e1e1e]/90 shadow-lg rounded-lg z-10 text-white">
          <ul>
            {results.map((result: any) => (
              <li 
                key={result.id} 
                className="p-2 hover:bg-gray-200"
                onClick={() => handleResultClick(result.id)}
              >
                {result.title}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  )
}
