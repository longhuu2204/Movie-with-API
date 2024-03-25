export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "02c27aeea7a9d585f44f8bad7b65fa53";
const tmdbEndpoint = "https://api.themoviedb.org/3";
export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndpoint}/movie/${type}?api_key=${apiKey}&page=${page}`,
  getSearchMovie: (filterDebounce, page = 1) =>
    `${tmdbEndpoint}/search/movie?api_key=${apiKey}&query=${filterDebounce}&page=${page}`,
  getMovieDetails: (movieId) =>
    `${tmdbEndpoint}/movie/${movieId}?api_key=${apiKey}`,
  imageOriginal: (path) => `https://image.tmdb.org/t/p/original/${path}`,
  getMovieMeta: (movieId, type) =>
    `${tmdbEndpoint}/movie/${movieId}/${type}?api_key=${apiKey}`,
};
