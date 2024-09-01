import { fetchFallbackPoster, fetchPoster } from "./https";

export async function fetchThumbnail(ids) {
  const { imdb, tmdb } = ids;
  try {
    const response = await fetchPoster(tmdb, "en");
    const filePath = response.data.backdrops[0].file_path;
    return `https://image.tmdb.org/t/p/w780${filePath}`;
  } catch (error) {
    try {
      const response = await fetchFallbackPoster(imdb);
      if ("moviethumb" in response.data) {
        const thumbnails = response.data.moviethumb;
        const thumbnail = thumbnails.find((obj) => obj.lang === "en");
        return thumbnail.url;
      } else {
        throw new Error(`Failed to fetch backdrop for ${imdb}`);
      }
    } catch {
      throw new Error(`Failed to fetch backdrop for ${id}: ${error.message}`);
    }
  }
}

export async function fetchMoviePoster(ids) {
  const { imdb, tmdb } = ids;
  try {
    const response = await fetchPoster(tmdb, "en");
    const filePath = response.data.posters[0].file_path;
    return `https://image.tmdb.org/t/p/w342${filePath}`;
  } catch (error) {
    try {
      const response = await fetchFallbackPoster(imdb);
      if ("movieposter" in response.data) {
        const posters = response.data.movieposter;
        const poster = posters.find((obj) => obj.lang === "en");
        return poster.url;
      }
      return getDefaultUrl(imdb);
    } catch {
      return getDefaultUrl(imdb);
    }
  }
}

export async function fetchBackdrop(ids) {
  const { imdb, tmdb } = ids;
  try {
    const response = await fetchPoster(tmdb);
    const filePath = response.data.backdrops[0].file_path;
    return `https://image.tmdb.org/t/p/w780${filePath}`;
  } catch {
    try {
      const response = await fetchFallbackPoster(imdb);
      if ("moviebackground" in response.data) {
        const backdrops = response.data.moviebackground;
        const backdrop = backdrops[0]
        return backdrop.url;
      } else {
        throw new Error(`Failed to fetch backdrop for ${imdb}`);
      }
    } catch (error) {
      throw new Error(`Failed to fetch backdrop for ${imdb}: ${error.message}`);
    }
  }
}

function getDefaultUrl(id) {
  const BASE_URL = ""; // Add OMDB API Key here
  const params = {
    i: id,
    apiKey: "9c286999",
  };
  const url = new URL(BASE_URL);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  return url.toString();
}
