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

const SORTING_CONTAINER = document.querySelector(".sorting-options");
let selectedSort;
const SEARCH_BUTTON = document.querySelector('.aside-search')
export function sortingOptions() {
  SORT_BY_OPTIONS.forEach((item) => {
    const OPTION = document.createElement("option");
    OPTION.value = item.value;
    OPTION.textContent = item.label;
    SORTING_CONTAINER.appendChild(OPTION);
  });

  SORTING_CONTAINER.addEventListener('change', (event) => {
    selectedSort = event.target.value
    console.log(selectedSort)
    

    if (selectedSort) {
      SEARCH_BUTTON.classList.add('clicked')
    } else {
      SEARCH_BUTTON.classList.remove('clicked')

    }

  })




}

export function getSortings() {
  return selectedSort
}