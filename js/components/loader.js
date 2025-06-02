const loader = document.querySelector('.top-loader');

 export function startLoading() {
  loader.style.width = '0%';
  setTimeout(() => loader.style.width = '30%', 100);
}


export function finishLoading() {
  loader.style.width = '100%';
  setTimeout(() => {
    loader.style.width = '0%'; 
  }, 500);
}


