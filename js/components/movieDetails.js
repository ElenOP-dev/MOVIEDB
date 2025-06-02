import { getMovieDetails } from "../api/api.js";
import { openUserMenu } from "./usermenu.js";
import { openSearchBar } from "./searching.js";
import { openMenu } from "./menuBar.js";
import { scrollUp } from "./navBar.js";

export async function movieDitails() {
  document.addEventListener("DOMContentLoaded", async () => {
    if (!window.location.pathname.includes("pages/details.html")) {
      console.log("wrong page");
    }
    let data;
    const URL_PARAMS = new URLSearchParams(window.location.search);
    const MOVIE_ID = URL_PARAMS.get("id");
    data = await getMovieDetails(MOVIE_ID);
    console.log(MOVIE_ID);
    const MOVIE_CONTAINER = document.querySelector(".movie-details");
    const RELEASE_DATE = data.release_date;
    const formattedDateYear = new Date(RELEASE_DATE).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
      }
    );
    const formattedDateFull = new Date(RELEASE_DATE).toLocaleDateString(
      "en-US",
      {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      }
    );

    const RUNTIME_HOUR = Math.floor(data.runtime / 60);
    const RUNTIME_MINUTE = data.runtime % 60;
    const RUNTIME_INFO = document.createElement("span");
    RUNTIME_INFO.textContent = `• ${RUNTIME_HOUR}h ${RUNTIME_MINUTE}m `;
    const VOTE_DISPLAY =
      data.vote_average < 2
        ? "NR"
        : `${Math.round(data.vote_average * 10)}<sup>%</sup>`;
    const { color, background } = getGradientStyle(data.vote_average);
    console.log(background);
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

    MOVIE_CONTAINER.innerHTML = `
    
    
<div class="for-background" >
<div class="movie">
<div class="overlay"></div>
<div class="poster"> <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt=""/>
<div class="expand">
  <img class="expand-icon" src="../assets/icons/expand.svg" alt="">
  Expand
</div>
</div>
 <div class="about-movie">
  <h2 class="movie-title"> <a>${data.original_title}</a>  <span class="year">(${formattedDateYear})</span></h2>
  <div class="movie-info">${formattedDateFull} <span class = "dot">•</span> 

     </div>
  <div class="score">
        <div class="percent">
      <div class="gradient"  style="background:${background} ">
        <span>${VOTE_DISPLAY}</span>
      </div>
      </div>
      <div class='user-score'>User <br> Score</div>
      <div class='emoji'>
      <img class="first-emoji" src="../assets/icons/emoji1.svg" alt="">
      <img class="second-emoji" src="../assets/icons/emoji2.svg" alt="">
      <img class="third-emoji" src="../assets/icons/emoji3.svg" alt="">
      </div>
    <div class="vibe">What's Your <span>Vibe</span> ?   <img class="icon-i" src="../assets/icons/glyphicons-basic-636-circle-info-06837a451a09552349b182d84ae84f26308efee8f7e8ddca255bd5dbc4a66ea4.svg" alt="">
    </div> 
  </div>
  <div class="like-add">
    <div class="background">
      <img src="../assets/icons/list.svg" alt="" />
      <span class="tooltip-for-icon">Add to list</span>
    </div>
    <div class="background">
      <img src="../assets/icons/heart.svg" alt="" />
      <span class="tooltip-for-icon">Mark as favorie</span>

    </div>
    <div class="background">
      <img src="../assets/icons/save.svg" alt="" />
      <span class="tooltip-for-icon">Add to your watchlist</span>

    </div>
    <div class="background">
      <img class="star-for-mobile" src="../assets/icons/star.svg" alt="" />
    </div>
    <div class="trailer">
    <img src="../assets/icons/play.svg" alt="">
    Play Trailer 
    </div>
  </div>
  <p class="tagline">${data.tagline}</p>
  <h3 class="overview">OVERVIEW</h3>
  <p class="movie-overview">${data.overview}</p>
  </div>
  </div>
  </div>


    `;

    const GENRES_CONTAINER = document.createElement("div");
    const GENRES = data.genres.forEach((item) => {
      const SPAN = (document.createElement("span").textContent =
        item.name + ", ");

      GENRES_CONTAINER.append(SPAN);
    });

    const TRAILER_CONTAINER = document.createElement("div");
    TRAILER_CONTAINER.innerHTML = `   <div class="trailer-for-mobile">
    <img src="../assets/icons/play.svg" alt="">
    Play Trailer 
    </div>`;
    if (window.innerWidth <= 768) {
      document.querySelector(".movie-info").appendChild(RUNTIME_INFO);
      document.querySelector(".movie-info").appendChild(TRAILER_CONTAINER);
      document.querySelector(".movie-info").appendChild(GENRES_CONTAINER);
    } else {
      document.querySelector(".movie-info").appendChild(GENRES_CONTAINER);
      document.querySelector(".movie-info").appendChild(RUNTIME_INFO);
      TRAILER_CONTAINER.style.display = "none";
    }

    const BACKGROUND_IMAGE = document.querySelector(".for-background");
    BACKGROUND_IMAGE.style.backgroundImage =
      "url(https://image.tmdb.org/t/p/w500" + data.backdrop_path;

    const EXPAND = document.querySelector(".expand");

    const MOVIE_POSTER = document.querySelector(".movie-poster");
    MOVIE_POSTER.addEventListener("mouseover", () => {
      MOVIE_POSTER.classList.toggle("blured");
      EXPAND.classList.add("visible");
    });

    MOVIE_POSTER.addEventListener("mouseout", () => {
      MOVIE_POSTER.classList.remove("blured");
      EXPAND.classList.remove("visible");
    });
  });
}

movieDitails();
openUserMenu();
openSearchBar();
openMenu();
scrollUp();
