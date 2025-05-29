import { getGenresData } from "../api/api.js";
const GENRES_ARRAY = [];
const SEARCH_BUTTON = document.querySelector(".aside-search");


export async function renderGenres() {
  const GENRE_LIST = document.querySelector(".select-genres");
  const GENRES = await getGenresData();
  GENRE_LIST.innerHTML = "";

  GENRES.forEach((genre) => {
    const GENRE_DIV = document.createElement("div");
    GENRE_DIV.className = "genre-item";

    const CHECKBOX = document.createElement("input");
    CHECKBOX.type = "checkbox";
    CHECKBOX.name = "selected-genres";
    CHECKBOX.id = `${genre.id}`;

    const LABEL = document.createElement("label");
    LABEL.htmlFor = `${genre.id}`;
    LABEL.textContent = genre.name;
    GENRE_DIV.appendChild(CHECKBOX);
    GENRE_DIV.appendChild(LABEL);
    GENRE_LIST.appendChild(GENRE_DIV);

    CHECKBOX.addEventListener("change", () => {
      const GENRE_INDEX = GENRES_ARRAY.findIndex((g) => g.id === genre.id);
      if (CHECKBOX.checked) {
        if (GENRE_INDEX === -1) {
          GENRES_ARRAY.push(genre);
        }
      } else {
        if (GENRE_INDEX !== -1) {
          GENRES_ARRAY.splice(GENRE_INDEX, 1);
        }
      }

      if (GENRES_ARRAY.length > 0) {
        SEARCH_BUTTON.classList.add('clicked')
      } else {
        SEARCH_BUTTON.classList.remove('clicked')

      }
    });
  });

  return GENRES_ARRAY;
}

export function getSelectedGenres() {
  return GENRES_ARRAY.map((genre) => genre.id);
}
