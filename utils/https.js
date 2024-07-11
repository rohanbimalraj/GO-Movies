import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3/movi'
// Replace with your token retrieval
axios.defaults.headers.common['Authorization'] = 'Bearer "ACCESS TOKEN"';

export async function fetchNowPlayingMovies() {
    try {
        const response = await axios.get('/now_playing')
        return { data: response.data, error: null }
    }catch (error) {
        return { data: null, error: error.message }
    }
}

export async function fetchTopRatedMovies() {}

export async function fetchPopularMovies() {}

export async function fetchUpcomingMovies() {}
