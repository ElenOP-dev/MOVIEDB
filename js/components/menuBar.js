const MENU_BAR = document.querySelector(".open-menu")
const MENU_BUTTON = document.querySelector(".menu-toggle") 


 export function openMenu() {
    MENU_BUTTON.addEventListener('click', () => {
    MENU_BAR.classList.toggle('visible')
})
}



