let lastScrollY = window.scrollY
const HEADER = document.querySelector('header')
const SCROLL = 100

export function scrollUp () {
    window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY

    if(currentScrollY > lastScrollY && currentScrollY > SCROLL) {
        HEADER.style.top = '-6.25rem'

    }else {
        HEADER.style.top = '0'
    }

    lastScrollY = currentScrollY

})
}
