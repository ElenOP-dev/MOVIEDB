const MENU_BAR = document.querySelector(".open-menu")
const MENU_BUTTON = document.querySelector(".menu-toggle") 
const MAIN = document.querySelector('main')


 export function openMenu() {
    MENU_BUTTON.addEventListener('click', () => {
    MENU_BAR.classList.toggle('visible')
    MAIN.classList.toggle('blured')
})
}



