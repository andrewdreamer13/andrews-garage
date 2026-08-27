import Swiper from "swiper/bundle";
import "swiper/css/bundle";

export const initSliders = () => {
  autoBrandsSlider();
  toolBrandsSlider();
};

const autoBrandsSlider = () => {
  const swiper = new Swiper(".auto-brands__slider", {
    loop: true,
    speed: 4000,
    slidesPerView: "auto",
    spaceBetween: 30,
    centeredSlides: false,

    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },

    // Если пагинация, стрелки и скроллбар не нужны для ленты брендов, их можно удалить.
    /*
    pagination: {
      el: ".swiper-pagination",
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    scrollbar: {
      el: ".swiper-scrollbar",
    },
    */
  });
};
const toolBrandsSlider = () => {
  const swiper = new Swiper(".tool-brands__slider", {
    loop: true,
    speed: 4000,
    slidesPerView: "auto",
    spaceBetween: 50,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      reverseDirection: true,
    },
  });
};
