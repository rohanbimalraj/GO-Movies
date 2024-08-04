import axios from "axios";
import { func } from "prop-types";

// axios.defaults.baseURL = 'https://api.themoviedb.org/3'
// Replace with your token retrieval
// axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTQxNzBmMmNhZGQ0MTgzN2I5MWJhMWM2NzA5OTI4MyIsIm5iZiI6MTcyMDcwNDk0MC4zNDI0Mywic3ViIjoiNjE0ZmViYzAyZDhlZjMwMDQyMWMzY2I2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ab3XuMdjlomzFfdVHQocZqDJUnDdJM56UHGY3ZAiGT8';

  // Axios instance for getting movies and detail
  const axiosMoviesInstance = axios.create({
    baseURL: 'https://api.trakt.tv',
    headers: {'trakt-api-key': '6c59d87ff8566c997c62c38b1c31f6d088f4a1902f3239afe3eb321f60cb8341'}
  });
  
  // Axios instance for getting movie images
  const axiosPosterInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie/',
    timeout: 1000,
    headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTQxNzBmMmNhZGQ0MTgzN2I5MWJhMWM2NzA5OTI4MyIsIm5iZiI6MTcyMjQyNTIyMi43MjM2NDMsInN1YiI6IjYxNGZlYmMwMmQ4ZWYzMDA0MjFjM2NiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TBOOq5T6V792kWPlJXe9WUrdwYrO4vwaKRBAgFjOksU'}
  })
  const axiosFallbackPosterInstance = axios.create({
    baseURL: 'https://webservice.fanart.tv/v3',
    params: {'api_key': 'f06ae3a947abf9bca066eee80224cc94'}
  });

  export async function fetchTopGrossingMovies() {
    return axiosMoviesInstance.get('/movies/boxoffice')
  }

  export async function fetchTrendingMovies(page = 1, limit = 10) {
    return axiosMoviesInstance.get('/movies/trending', {params: {page: page, limit: limit}})
  }

  export async function fetchPopularMovies(page = 1, limit = 10) {
    return axiosMoviesInstance.get('/movies/popular', {params: {page: page, limit: limit}})
  }

  export async function fetchMostWatchedMovies(page = 1, limit = 10) {
    return axiosMoviesInstance.get('/movies/watched', {params: {page: page, limit: limit}})
  }

  export async function fetchMovieSummary(id) {
    return axiosMoviesInstance.get(`/movies/${id}`, {params: {extended: 'full'}})
  }

  export async function fetchFallbackPoster(id) {
    return axiosFallbackPosterInstance.get(`/movies/${id}`)
  }

  export async function fetchPoster(id) {
    return axiosPosterInstance.get(`${id}/images`, {params: {language: 'en'}})
  }

// export async function fetchNowPlayingMovies() {
//     return axios.get('/movie/now_playing')
// }

// export async function fetchTopRatedMovies(page) {
//     return axios.get('/movie/top_rated', { params: {page: page} })
// }

// export async function fetchPopularMovies(page) {
//     return axios.get('/movie/popular', { params: {page: page} })
// }

// export async function fetchUpcomingMovies(page) {
//     return axios.get('/movie/upcoming', { params: {page: page} })
// }

// export async function fetchMovieDetails(id) {
//     return axios.get(`/movie/${id}`)
// }

// export async function fetchMovieReviews(id) {
//     return axios.get(`/movie/${id}/reviews`)
// }

// export async function fetchMovieCredits(id) {
//     return axios.get(`/movie/${id}/credits`)
// }

// export async function fetchMoviesWithTitle(title) {
//     return axios.get('/search/movie', { params: {query: title} })
// }
