import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3/movi'
// Replace with your token retrieval
axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTQxNzBmMmNhZGQ0MTgzN2I5MWJhMWM2NzA5OTI4MyIsIm5iZiI6MTcyMDM3MDQ5Ni40NDE5NjMsInN1YiI6IjYxNGZlYmMwMmQ4ZWYzMDA0MjFjM2NiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.92IoY9r92XIeB_QlcLavBefiHj2W0j8-4_eV6y1iUwM';

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
