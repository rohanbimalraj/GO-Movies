import { fetchFallbackPoster, fetchPoster } from "./https";

export async function fetchThumbnail(id) {
  try {
    const response = await fetchFallbackPoster(id);
    if ("moviethumb" in response.data) {
      const thumbnails = response.data.moviethumb;
      const thumbnail = thumbnails.find((obj) => obj.lang === "en");
      return thumbnail.url;
    } else {
      throw new Error(
        `Failed to fetch thumbnail for ${id}: Thumbnail was not present`
      );
    }
  } catch (error) {
    throw new Error(`Failed to fetch thumbnail for ${id}: ${error.message}`);
  }
}

export async function fetchMoviePoster(ids) {
  const imdb = ids.imdb;
  const tmdb = ids.tmdb;

  try {
    const response = await fetchPoster(tmdb);
    const filePath = response.data.posters[0].file_path;
    return `https://image.tmdb.org/t/p/w342/${filePath}`;
  } catch (error) {
    try {
      const response = await fetchFallbackPoster(imdb);
      if ("movieposter" in response.data) {
        const posters = response.data.movieposter;
        const poster = posters.find((obj) => obj.lang === "en");
        return poster.url;
      }
      return getDefaultUrl(imdb)
    } catch {
        return getDefaultUrl(imdb)
    }
  }
}

function getDefaultUrl(id) {
    const BASE_URL = "https://img.omdbapi.com";
      const params = {
        i: id,
        apiKey: "9c286999",
      };
      const url = new URL(BASE_URL);
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
      return url.toString()
}
