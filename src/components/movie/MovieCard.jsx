import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 select-none">
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        className="w-full h-[300px] rounded-lg object-scale-down mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-white text-xl font-bold mb-3 h-[56px]">{title}</h3>
        <div className="flex items-center justify-between text-white text-sm opacity-50 mb-10">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
      </div>
      <Button bgColor="primary" onClick={() => navigate(`/movies/${id}`)}>
        Watch Now
      </Button>
    </div>
  );
};

export default MovieCard;
