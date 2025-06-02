import { getKeywords } from "../api/api.js";

const KEYWORD_INPUT = document.querySelector(".keyword-input");
const KEYWORDS_CONTAINER = document.querySelector(".keywords-div");
let selectedKeywords

export async function selectedKeyword() {
  KEYWORD_INPUT.addEventListener("input",debounce( async () => {

    let keyword = KEYWORD_INPUT.value;
    if (keyword) {
        KEYWORDS_CONTAINER.classList.add('none')
      } else {
        KEYWORDS_CONTAINER.classList.remove('none')


      }
    try {
      const KEYWORD_DATA = await getKeywords(keyword);

      KEYWORDS_CONTAINER.innerHTML = '';

      KEYWORD_DATA.results?.forEach((element) => {
        const keywordElement = document.createElement("a");
        keywordElement.textContent = element.name;
        keywordElement.id = element.id
        keywordElement.href = "#";
        keywordElement.classList.add("keyword-item");
        KEYWORDS_CONTAINER.appendChild(keywordElement); 
        selectedKeywords = document.querySelector('.keyword-item')
      });
    } catch (error) {
      console.error("Failed to fetch keywords:", error);
    }



  }, 300));

  KEYWORDS_CONTAINER.addEventListener('click', (e) => {
  const keyword = e.target.closest('.keyword-item');
    if (!keyword) return;
    e.preventDefault();
   KEYWORD_INPUT.value = keyword.dataset.value || keyword.textContent;
   KEYWORD_INPUT.id = keyword.dataset.id || keyword.id

    KEYWORDS_CONTAINER.classList.remove('none');
  });

}

export function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }


  export function getSelectedKeword () {
    console.log(KEYWORD_INPUT.id)
    return KEYWORD_INPUT.id

  }