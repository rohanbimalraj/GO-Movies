import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchMostWatchedMovies,
  fetchPopularMovies,
  fetchTopGrossingMovies,
  fetchTrendingMovies,
} from "../utils/https";
import { extract } from "../utils/extractor";

export const fetchHomeScreenMovies = createAsyncThunk(
  "homeSlice/fetchHomeScreenMovies",
  async (_, { rejectWithValue }) => {
    try {
      const [response1, response2, response3, response4, response5] =
        await Promise.all([
          fetchPopularMovies(1, 20),
          fetchTopGrossingMovies(),
          fetchTrendingMovies(),
          fetchPopularMovies(2),
          fetchMostWatchedMovies(),
        ]);
      const suggestedMovies = extract(response1.data);
      const topGrossingMovies = extract(response2.data);
      const trendingMovies = extract(response3.data);
      const popularMovies = extract(response4.data);
      const mostWatchedMovies = extract(response5.data);
      return {
        suggested: suggestedMovies,
        topGrossing: topGrossingMovies,
        trending: trendingMovies,
        popular: popularMovies,
        mostWatched: mostWatchedMovies,
      };
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const initialState = {
  movies: {
    suggested: [],
    topGrossing: [],
    trending: [],
    popular: [],
    mostWatched: [],
  },
  loading: false,
  error: null,
};
const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeScreenMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeScreenMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchHomeScreenMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const homeScreenMovies = ({ home }) => {
  return home.movies;
};

export const homeScreenLoading = ({ home }) => {
  return home.loading;
};

export const homeScreenError = ({ home }) => {
  return home.error;
};

export default homeSlice.reducer;
