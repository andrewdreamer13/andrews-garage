
export const initPreloader = () => {
  const preloader = document.querySelector("#preloader");
  if (!preloader) return;

  // Прячем прелоадер сразу, не дожидаясь скачивания всех тяжелых картинок!
  preloader.classList.add("hide");

  setTimeout(() => {
    preloader.remove();
  }, 300); 
};

// export const initPreloader = () => {
//   const preloader = document.querySelector("#preloader");
//   if (!preloader) return;

//   window.addEventListener(
//     "load",
//     () => {
//       preloader.classList.add("hide");

//       setTimeout(() => {
//         preloader.remove();
//       }, 600);
//     },
//     { once: true },
//   );
// };
