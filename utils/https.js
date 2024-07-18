import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3'
// Replace with your token retrieval
axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTQxNzBmMmNhZGQ0MTgzN2I5MWJhMWM2NzA5OTI4MyIsIm5iZiI6MTcyMDcwNDk0MC4zNDI0Mywic3ViIjoiNjE0ZmViYzAyZDhlZjMwMDQyMWMzY2I2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ab3XuMdjlomzFfdVHQocZqDJUnDdJM56UHGY3ZAiGT8';

export async function fetchNowPlayingMovies() {
    return axios.get('/movie/now_playing')
}

export async function fetchTopRatedMovies(page) {
    return axios.get('/movie/top_rated', { params: {page: page} })
}

export async function fetchPopularMovies(page) {
    return axios.get('/movie/popular', { params: {page: page} })
}

export async function fetchUpcomingMovies(page) {
    return axios.get('/movie/upcoming', { params: {page: page} })
}

export async function fetchMovieDetails(id) {
    return axios.get(`/movie/${id}`)
}

export async function fetchMovieReviews(id) {
    return axios.get(`/movie/${id}/reviews`)
}

export async function fetchMovieCredits(id) {
    return axios.get(`/movie/${id}/credits`)
}

export async function fetchMoviesWithTitle(title) {
    return axios.get('/search/movie', { params: {query: title} })
}
