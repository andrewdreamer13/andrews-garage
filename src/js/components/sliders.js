import Swiper from "swiper/bundle";
import "swiper/css/bundle";

export const initSliders = () => {
  autoBrandsSlider();
};

const autoBrandsSlider = () => {
  const swiper = new Swiper(".auto-brands__slider", {
    loop: true,
    speed: 3000,
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
