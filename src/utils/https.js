import axios from "axios";

  // Axios instance for getting movies
  const axiosMovieInstance = axios.create({
    baseURL: 'https://api.trakt.tv',
    headers: {'trakt-api-key': '6c59d87ff8566c997c62c38b1c31f6d088f4a1902f3239afe3eb321f60cb8341'}
  });
  
  // Axios instance for getting movie images
  const axiosPosterInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie/',
    timeout: 1000,
    headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTQxNzBmMmNhZGQ0MTgzN2I5MWJhMWM2NzA5OTI4MyIsIm5iZiI6MTcyMjQyNTIyMi43MjM2NDMsInN1YiI6IjYxNGZlYmMwMmQ4ZWYzMDA0MjFjM2NiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TBOOq5T6V792kWPlJXe9WUrdwYrO4vwaKRBAgFjOksU'}
  })

  // Axios instance for getting movie images as a fallback
  const axiosFallbackPosterInstance = axios.create({
    baseURL: 'https://webservice.fanart.tv/v3',
    params: {'api_key': 'f06ae3a947abf9bca066eee80224cc94'}
  });

  // Get top 10 grossing movies in US in last week
  export async function fetchTopGrossingMovies() {
    return axiosMovieInstance.get('/movies/boxoffice')
  }

  // Get latest trending movies
  export async function fetchTrendingMovies(page = 1, limit = 10) {
    return axiosMovieInstance.get('/movies/trending', {params: {page: page, limit: limit}})
  }

  // Get popular movies
  export async function fetchPopularMovies(page = 1, limit = 10) {
    return axiosMovieInstance.get('/movies/popular', {params: {page: page, limit: limit}})
  }

  // Get most watched movies by audiance in last week
  export async function fetchMostWatchedMovies(page = 1, limit = 10) {
    return axiosMovieInstance.get('/movies/watched', {params: {page: page, limit: limit}})
  }

  // Get details of a movie
  export async function fetchMovieSummary(id) {
    return axiosMovieInstance.get(`/movies/${id}`, {params: {extended: 'full'}})
  }

  // Get images when tmdb fails
  export async function fetchFallbackPoster(id) {
    return axiosFallbackPosterInstance.get(`/movies/${id}`)
  }

  // Get posters and backdrops
  export async function fetchPoster(id, language) {
    return axiosPosterInstance.get(`${id}/images`, {params: {language: language}})
  }

  // Get comments made by audiance for a movie
  export async function fetchComments(id, page = 1, limit = 10) {
    return axiosMovieInstance.get(`/movies/${id}/comments/newest`, {params: {page: page, limit: limit}})
  }

  // Get details regarding crew and cast of a movie
  export async function fetchPeople(id) {
    return axiosMovieInstance.get(`/movies/${id}/people`)
  }

  // Search movie by title
  export async function fetchMoviesWithTitle(title, page = 1, limit = 10) {
    return axiosMovieInstance.get(`/search/movie`, {params: {query: title, page: page, limit: limit}})
  }
