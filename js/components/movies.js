import { APP_API, headers } from "../utils/constants.js";
import { getMovieData } from "../api/api.js";
import { getSortings } from "./sorting.js";
import { getSelectedGenres } from "./genres.js";

const MOVIES_SECTION = document.querySelector(".movies-section");
let currentPage = 1;
let currentGenres = []
let isLoading = false;
export async function getMovies(selectedGenres,selectedSorting) {
  if (isLoading) return;
  isLoading = true;

  const IS_FILTERED_SEARCH =
    (Array.isArray(selectedGenres) && selectedGenres.length > 0) || (selectedSorting)

  if (IS_FILTERED_SEARCH) {
    currentPage = 1;
    MOVIES_SECTION.innerHTML = "";
    currentGenres = selectedGenres
  }else if(currentPage === 1 && selectedGenres === undefined) {
    currentGenres = []
  }

  let data;

  if (selectedGenres) {
    data = await getMovieData(currentPage, selectedGenres,selectedSorting);
  } else {
    data = await getMovieData(currentPage);
  }

  data.results.forEach((movie) => {
    const { id, vote_average, title, overview, release_date, poster_path } =
      movie;
    const MOVIE_ELEMENT = document.createElement("a");
    MOVIE_ELEMENT.classList.add("movie");
    MOVIE_ELEMENT.id = `movie-${id}`;
    MOVIE_ELEMENT.href = `details.html?id=${id}`;
    const formattedDate = new Date(release_date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const { color, background } = getGradientStyle(vote_average);

    function getGradientStyle(vote) {
      const votePercent = Math.round(vote * 10);
      if (vote <= 2) {
        return {
          color: "grey",
          background: `conic-gradient(#666 0% ${votePercent}%, #333 ${votePercent}% 100%)`,
        };
      }
      if (vote > 2 && vote <= 3) {
        return {
          color: "red",
          background: `conic-gradient(#db2360 0% ${votePercent}%, #571435 ${votePercent}% 100%)`,
        };
      }
      if (vote > 3 && vote < 7) {
        return {
          color: "yellow",
          background: `conic-gradient(#d2d531 0% ${votePercent}%, #4e4d3b ${votePercent}% 100%)`,
        };
      }
      return {
        color: "green",
        background: `conic-gradient(#21d07a 0% ${votePercent}%, #204529 ${votePercent}% 100%)`,
      };
    }

    const VOTE_DISPLAY =
      vote_average < 2 ? "NR" : `${Math.round(vote_average * 10)}<sup>%</sup>`;

    MOVIE_ELEMENT.innerHTML = `
     <div class="blur-overlay"></div>
    <div class="circle">
      <div class="small-circle"></div>
      <div class="small-circle"></div>
      <div class="small-circle"></div>
    </div>
     <div class="dropdown-for-movie">
            <div class="dropdown-item">
              <img src="assets/icons/list.svg" alt="">
              Add to list
            </div>
            <div class="dropdown-item">
              <img src="assets/icons/heart.svg" alt="">
              Favorite
            </div>
            <div class="dropdown-item">
              <img src="assets/icons/save.svg" alt="">
              Watchlist
            </div>
            <div class="dropdown-item">
              <img src="assets/icons/star.svg" alt="">
              Your Rating
            </div>
          </div>
    <div class="percent">
      <div class="gradient"  style="background: ${background}">
        <span>${VOTE_DISPLAY}</span>
      </div>
    </div>
    <img class="movie-image" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" />
    <div class="movie-content">
      <h2 class="movie-title">${title}</h2>
      <h6 class="release-date"><span class="month">${formattedDate}</span></h6>
      <p class="overview">${overview}</p>
    </div>
  `;

    MOVIES_SECTION.appendChild(MOVIE_ELEMENT);
  });

  currentPage++;
  isLoading = false;

  document.querySelectorAll(".circle").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      event.preventDefault();

      const MOVIE_CARD = button.closest(".movie");
      const DROPDOWN = MOVIE_CARD.querySelector(".dropdown-for-movie");
      const BLUR_OVERLAY = MOVIE_CARD.querySelector(".blur-overlay");
      document.querySelectorAll(".dropdown-for-movie").forEach((menu) => {
        if (menu !== DROPDOWN) menu.classList.remove("open-dropdown");
      });
      document.querySelectorAll(".blur-overlay").forEach((overlay) => {
        if (overlay !== BLUR_OVERLAY) overlay.style.display = "none";
      });
      DROPDOWN.classList.toggle("open-dropdown");
      BLUR_OVERLAY.style.display = DROPDOWN.classList.contains("open-dropdown")
        ? "block"
        : "none";
    });
  });
  document.addEventListener("click", () => {
    document
      .querySelectorAll(".dropdown-for-movie")
      .forEach((menu) => menu.classList.remove("open-dropdown"));
    document
      .querySelectorAll(".blur-overlay")
      .forEach((overlay) => (overlay.style.display = "none"));
  });
}

const LOAD_MORE = document.createElement("button");
LOAD_MORE.textContent = "Load More";
LOAD_MORE.classList.add("load-more");
MOVIES_SECTION.after(LOAD_MORE);

LOAD_MORE.addEventListener("click", () => {
  getMovies(getSelectedGenres(),getSortings());
  currentPage++

  const INFINITE_SCROLL = document.querySelector("#scroll");

  const OBSERVER = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        getMovies();
      }
    },
    {
      rootMargin: "200px",
    }
  );

  OBSERVER.observe(INFINITE_SCROLL);
});
