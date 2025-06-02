import { APP_API, headers, API_KEY } from "../utils/constants.js";

export async function getGenresData() {
  const URL = `${APP_API}/genre/movie/list`;
  try {
    const RESPONSE = await fetch(URL, { headers });
    if (!RESPONSE.ok) {
      throw new Error(`Response status: ${RESPONSE.status}`);
    }

    const JSON = await RESPONSE.json();
    return JSON.genres;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

export async function getMovieData(
  page = 1,
  selectedGenres = [],
  sortBy,
  keyword
) {
  let url = `${APP_API}/discover/movie?page=${page}`;

  if (selectedGenres.length > 0) {
    const SEPARETOR = ",";
    const GENRE_PARAM = selectedGenres.join(SEPARETOR);
    url += `&with_genres=${GENRE_PARAM}`;
  }

  if (sortBy) {
    url += `&sort_by=${sortBy}`;
  }

  if (keyword) {
    url += `&with_keywords=${keyword}`;
  }

  try {
    const RESPONSE = await fetch(url, { headers });
    if (!RESPONSE.ok) {
      throw new Error(`Response status: ${RESPONSE.status}`);
    }

    const DATA = await RESPONSE.json();
    return DATA;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

export async function getKeywords(keyword) {
  // retrieved this endpoint from original pages network tab as it was missing in the API documentation
  const url = `https://www.themoviedb.org/search/remote/keyword?take=50&skip=0&page=1&pageSize=50&filter[filters][0][value]=${encodeURIComponent(
    keyword
  )}&filter[filters][0][field]=name&filter[filters][0][operator]=startswith&filter[filters][0][ignoreCase]=true&filter[logic]=and`;

  try {
    const response = await fetch(url);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

export async function getMovieDetails(movieId) {
  const url = `${APP_API}/movie/${movieId}`;
  try {
    const RESPONSE = await fetch(url, { headers });
    if (!RESPONSE.ok) {
      throw new Error(`Response status: ${RESPONSE.status}`);
    }

    const DATA = await RESPONSE.json();
    console.log(DATA);
    return DATA;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}
