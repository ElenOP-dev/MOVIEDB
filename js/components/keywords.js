import { getKeywords } from "../api/api.js";

const KEYWORD_INPUT = document.querySelector(".keyword-input");
const KEYWORDS_CONTAINER = document.querySelector(".keywords-div");

export async function selectedKeyword() {
  KEYWORD_INPUT.addEventListener("change", async () => {

    let keyword = KEYWORD_INPUT.value;
    if (keyword) {
        KEYWORDS_CONTAINER.classList.add('none')
      } else {
        KEYWORDS_CONTAINER.classList.remove('none')


      }
    try {
      const KEYWORD_DATA = await getKeywords(keyword);
      console.log(KEYWORD_DATA)

      KEYWORD_DATA.results?.forEach((element) => {
        const keywordElement = document.createElement("a");
        keywordElement.textContent = element.name;
        keywordElement.href = "#";
        keywordElement.classList.add("keyword-item");
        KEYWORDS_CONTAINER.appendChild(keywordElement);
      });
    } catch (error) {
      console.error("Failed to fetch keywords:", error);
    }
  });
}
