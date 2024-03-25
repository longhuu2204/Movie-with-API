import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import YouTubeSlider from "../components/movie/VideoSlider";
import MovieCard from "../components/movie/MovieCard";
const MovieDetailPage = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview, id } = data;
  return (
    <div className="py-10 page-container">
      <div className="w-full h-[500px] bg-cover bg-no-repeat relative mb-10">
        <div className="absolute inset-0 bg-black opacity-25"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat rounded-sm"
          style={{
            backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className="w-full max-w-[360px] max-h-[580px] mx-auto -mt-[400px] relative rounded-md overflow-hidden">
        <img src={tmdbAPI.imageOriginal(poster_path)} alt={`${title}`} />
      </div>
      <h1 className="text-center text-4xl text-white font-bold my-10">
        {title}
      </h1>
      <div className="flex items-center justify-center gap-x-5 mb-10">
        <MovieGenres movieId={id}></MovieGenres>
      </div>

      <p className="text-center  mx-auto leading-relaxed max-w-[600px] text-white mb-10">
        {overview}
      </p>
      <MovieVideos></MovieVideos>
      <MovieCredits movieId={id}></MovieCredits>
      <SimilarMovie></SimilarMovie>
    </div>
  );
};
export function MovieGenres({ movieId }) {
  // const { movieId } = useParams();
  const { data, error } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);
  if (!data) return null;
  const { genres } = data;
  if (!genres || genres.length <= 0) return null;
  return (
    <>
      {genres.length > 0 && (
        <>
          {genres.map((item) => (
            <span
              key={item.id}
              className="px-4 py-2 border-white text-secondary border rounded-lg bg-opacity-50 bg-slate-300"
            >
              {item.name}
            </span>
          ))}
        </>
      )}
    </>
  );
}
function MovieCredits({ movieId }) {
  // const { movieId } = useParams();
  const { data, error } = useSWR(
    tmdbAPI.getMovieMeta(movieId, "credits"),
    fetcher
  );
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <div className="py-10">
      <h2 className="text-center text-3xl mb-10 text-white">Cast</h2>
      <Swiper grabCursor={true} spaceBetween={30} slidesPerView={"auto"}>
        {cast.map((item) => (
          <SwiperSlide key={item.id} className="w-[300px] h-auto">
            <div
              className="cast-item flex flex-col rounded-lg bg-slate-800 select-none py-2 px-4"
              key={item.id}
            >
              <img
                src={tmdbAPI.imageOriginal(item.profile_path)}
                alt={`${item.name}`}
                className="w-full h-[350px] object-cover rounded-md"
              />
              <h3 className="text-white text-xl font-medium h-[56px]">
                {item.name}
              </h3>
              <h3 className="text-white text-xl font-medium h-[56px]">
                {item.character}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
function MovieVideos() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    tmdbAPI.getMovieMeta(movieId, "videos"),
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  const keysArray = results.map((obj) => obj.key);
  return (
    <div className="py-10">
      <YouTubeSlider videoIds={keysArray}></YouTubeSlider>
    </div>
  );
}
function SimilarMovie() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    tmdbAPI.getMovieMeta(movieId, "similar"),
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="movie-list">
      <h2 className="text-center text-3xl mb-10 text-white">Similar Movies</h2>
      <Swiper grabCursor={true} spaceBetween={30} slidesPerView={"auto"}>
        {results.length > 0 &&
          results.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
export default MovieDetailPage;
