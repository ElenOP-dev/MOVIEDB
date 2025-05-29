const SEARCH_BUTTON = document.querySelector(".search");
const CLOSE_BUTTON = document.querySelector(".close-icon");
const INPUT_FIELD = document.querySelector(".searching-input");

export function openSearchBar() {
  SEARCH_BUTTON.addEventListener("click", () => {
    SEARCH_BUTTON.classList.add("hidden");
    CLOSE_BUTTON.classList.add("apparent");
    INPUT_FIELD.classList.add("open");
  });

  CLOSE_BUTTON.addEventListener("click", () => {
    SEARCH_BUTTON.classList.remove("hidden");
    CLOSE_BUTTON.classList.remove("apparent");
    INPUT_FIELD.classList.remove("open");
  });
}
