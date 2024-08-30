import AsyncStorage from "@react-native-async-storage/async-storage";

export async function fetchFavouriteMovies() {
  try {
    const jsonValue = await AsyncStorage.getItem("fav");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Error fetching data", e);
  }
}

async function saveFavouriteMovies(movies) {
  try {
    const jsonValue = JSON.stringify(movies);
    await AsyncStorage.setItem("fav", jsonValue);
  } catch (e) {
    console.error("Error storing data", e);
  }
}

export async function addMovieToFavourites(movie) {
  let movies = await fetchFavouriteMovies();
  if (movies) {
    const exists = movies.some(item => item.ids.imdb === movie.ids.imdb);
    (exists === false) && movies.push(movie);
  } else {
    movies = [movie];
  }
  await saveFavouriteMovies(movies);
}

export async function deleteMovieFromFavourites(id) {
  const movies = await fetchFavouriteMovies();
  if (movies) {
    const requiredArray = movies.filter((item) => item.ids.imdb !== id);
    await saveFavouriteMovies(requiredArray);
  }
}

export async function checkIfFavourited(id) {
  const movies = await fetchFavouriteMovies();
  if (movies) {
    return movies.some((item) => item.ids.imdb === id);
  } else {
    return false;
  }
}
