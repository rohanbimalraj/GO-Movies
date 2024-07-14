import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3/movie'
// Replace with your token retrieval
axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTQxNzBmMmNhZGQ0MTgzN2I5MWJhMWM2NzA5OTI4MyIsIm5iZiI6MTcyMDcwNDk0MC4zNDI0Mywic3ViIjoiNjE0ZmViYzAyZDhlZjMwMDQyMWMzY2I2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ab3XuMdjlomzFfdVHQocZqDJUnDdJM56UHGY3ZAiGT8';

export async function fetchNowPlayingMovies() {
    try {
        const response = await axios.get('/now_playing')
        return { data: response.data, error: null }
    }catch (error) {
        return { data: null, error: error.message }
    }
}

export async function fetchTopRatedMovies({ page }) {
    try {
        const response = await axios.get('/popular', { params: {page: page} })
        return { data: response.data, error: null }
    }catch (error) {
        return { data: null, error: error.message }
    }
}

export async function fetchPopularMovies({ page }) {}

export async function fetchUpcomingMovies({ page }) {}
