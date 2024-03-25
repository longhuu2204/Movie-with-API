import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { apiKey, fetcher, tmdbAPI } from "../../config";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { MovieGenres } from "../../pages/MovieDetailPage";
import Button from "../button/Button";
const Banner = () => {
  const type = "now_playing";
  const [movies, setMovies] = useState([]);
  const { data } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);
  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden">
      <Swiper
        grabCursor="true"
        slidesPerView={"auto"}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1500}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

function BannerItem({ item }) {
  const { title, vote_average, release_date, backdrop_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.2)] rounded-lg"></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
        alt=""
        className="w-full h-full object-cover rounded-lg object-cover"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex gap-x-5 mb-10">
          <MovieGenres movieId={id}></MovieGenres>
        </div>
        <Button onClick={() => navigate(`/movies/${id}`)} bgColor="primary">
          Watch Now
        </Button>
      </div>
    </div>
  );
}
export default Banner;
