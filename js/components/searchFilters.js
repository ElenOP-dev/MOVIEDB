import { getSelectedGenres } from "./genres.js";
import { getMovies } from "./movies.js";
import { getSortings } from "./sorting.js";

const SEARCH_BUTTON = document.querySelector(".aside-search");
const SORTING_CONTAINER = document.querySelector(".sorting-options");


export async function searchFilter() {
  SEARCH_BUTTON.addEventListener("click", async () => {
    

    try {
      SEARCH_BUTTON.classList.remove("clicked");
      const SELECTED_GENRES = getSelectedGenres();
      const SELECTED_SORTING = getSortings()
      getMovies(SELECTED_GENRES,SELECTED_SORTING);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  });

 


}

// searchFilter();
