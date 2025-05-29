const USER = document.querySelector('.username')
const USER_MENU = document.querySelector('.user-dropdown')

export function openUserMenu() {
    USER.addEventListener('click', () => {
        USER_MENU.classList.toggle('user-open-menu')
    })
}