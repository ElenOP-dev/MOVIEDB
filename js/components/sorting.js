import { APP_API, headers } from "../utils/constants.js";

export const SORTING_BUTTON = document.querySelector(".first-arrow");
export const SORTING = document.querySelector(".sorting-part");
export const FILTERS = document.querySelector(".filters");
export const FILTER_BUTTON = document.querySelector(".second-arrow");



export function asideOpenMenu(button, target) {
  button.addEventListener("click", () => {
    button.classList.toggle("rotated");
    target.classList.toggle("active");
  });
}

export const SORT_BY_OPTIONS = [
  { label: "Popularity Descending", value: "populariry.desc" },
  { label: "Popularity Ascending", value: "popularity.asc" },
  { label: "Rating Ascending", value: "vote_average.asc" },
  { label: "Rating Descending", value: "vote_average.desc" },
  { label: "Release Date Ascending", value: "primary_release_date.asc" },
  { label: "Release Date Descending", value: "primary_release_date.desc" },
  { label: "Title (A-Z)", value: "title.asc" },
  { label: "Title (Z-A)", value: "title.desc" },
];

const SORTING_CONTAINER = document.querySelector(".custom-select .options-container");
const SELECTED_DISPLAY = document.querySelector(".custom-select .selected-option");
const SEARCH_BUTTON = document.querySelector('.aside-search');

let selectedSort


export function sortingOptions() {
  
  SORT_BY_OPTIONS.forEach(item => {
    const OPTION_DIV = document.createElement("div");
    OPTION_DIV.classList.add("option");
    OPTION_DIV.textContent = item.label;
    OPTION_DIV.dataset.value = item.value;

    OPTION_DIV.addEventListener("click", () => {
      selectedSort = item.value;
      SELECTED_DISPLAY.textContent = item.label;
      document.querySelector(".custom-select").classList.remove("open");

      
      if (selectedSort) {
        SEARCH_BUTTON.classList.add('clicked');
      } else {
        SEARCH_BUTTON.classList.remove('clicked');
      }
    });

    SORTING_CONTAINER.appendChild(OPTION_DIV);
  });

  SELECTED_DISPLAY.addEventListener("click", () => {
    document.querySelector(".custom-select").classList.toggle("open");
  });

  
  document.addEventListener("click", (e) => {
    if (!document.querySelector(".custom-select").contains(e.target)) {
      document.querySelector(".custom-select").classList.remove("open");
    }
  });
}

export function getSortings() {
  return selectedSort;
}
