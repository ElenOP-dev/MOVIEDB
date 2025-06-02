import { getKeywords } from "../api/api.js";
import { getSelectedGenres } from "./genres.js";
import { getSelectedKeword, selectedKeyword } from "./keywords.js";
import { getMovies } from "./movies.js";
import { getSortings } from "./sorting.js";

const SEARCH_BUTTON = document.querySelector(".aside-search");
const SORTING_CONTAINER = document.querySelector(".sorting-options");

export async function searchFilter() {
  SEARCH_BUTTON.addEventListener("click", async () => {
    try {
      SEARCH_BUTTON.classList.remove("clicked");
      const SELECTED_GENRES = getSelectedGenres();
      const SELECTED_SORTING = getSortings();
      const SELECTED_KEYWORD = getSelectedKeword();
      getMovies(SELECTED_GENRES, SELECTED_SORTING, SELECTED_KEYWORD);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  });
}
