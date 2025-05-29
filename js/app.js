import { openMenu } from "./components/menuBar.js";
import {
  asideOpenMenu,
  SORTING_BUTTON,
  FILTER_BUTTON,
  SORTING,
  FILTERS,
} from "./components/sorting.js";
import { renderGenres } from "./components/genres.js";
import { openSearchBar } from "./components/searching.js";
import { getMovies } from "./components/movies.js";
import { openUserMenu } from "./components/usermenu.js";
import { scrollUp } from "./components/navBar.js";
import { searchFilter } from "./components/searchFilters.js";
import { sortingOptions } from "./components/sorting.js";
import { selectedKeyword } from "./components/keywords.js";


document.addEventListener("DOMContentLoaded", async () => {
  openUserMenu();
  openMenu()
  openSearchBar();
  scrollUp();
  asideOpenMenu(SORTING_BUTTON, SORTING);
  asideOpenMenu(FILTER_BUTTON, FILTERS);
 await renderGenres();
  getMovies([]);
  await searchFilter()
  sortingOptions()
  selectedKeyword()

});
