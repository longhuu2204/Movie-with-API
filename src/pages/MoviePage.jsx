import React, { useEffect, useState } from "react";
import MovieCard from "../components/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config";
import useSWR from "swr";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
const MoviePage = () => {
  const type = "now_playing";
  const [nextPage, setNextPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieList(type, nextPage));
  const filterDebounce = useDebounce(filter, 1000);
  const handleFilterChange = (e) => {
    setNextPage(1);
    setFilter(e.target.value);
  };
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbAPI.getSearchMovie(filterDebounce, nextPage));
      console.log(filterDebounce);
    } else {
      setUrl(tmdbAPI.getMovieList(type, nextPage));
    }
  }, [filterDebounce, nextPage]);
  const movies = data?.results || [];
  useEffect(() => {
    if (data && data.total_pages) {
      setPageCount(data.total_pages);
    }
  }, [data]);
  const handlePageClick = (event) => {
    setNextPage(event.selected + 1);
  };
  return (
    <div className="py-10  page-container">
      <div className="flex py-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 outline-none rounded-l-sm"
            placeholder="Type here to search..."
            onChange={handleFilterChange}
          />
        </div>
        <button className="p-4 bg-primary text-white rounded-r-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent mx-auto animate-spin"></div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div className="mt-10">
        {pageCount > 0 && (
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            className="pagination"
          />
        )}
      </div>
    </div>
  );
};

export default MoviePage;
