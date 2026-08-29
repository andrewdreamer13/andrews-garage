import Swiper from "swiper/bundle";
import "swiper/css";

const createResizableSwiper = (
  breakpointString,
  selector,
  settings,
  callback,
) => {
  const mediaQuery = window.matchMedia(breakpointString);
  let swiperInstance;

  const checker = () => {
    const elementExists = document.querySelector(selector);

    if (mediaQuery.matches) {
      if (swiperInstance === undefined && elementExists) {
        swiperInstance = new Swiper(selector, settings);
        if (callback) callback(swiperInstance);
      }
    } else {
      if (swiperInstance !== undefined) {
        swiperInstance.destroy(true, true);
        swiperInstance = undefined;
      }
    }
  };

  mediaQuery.addEventListener("change", checker);
  checker();
};

export const initResizableServicesSwiper = () => {
  createResizableSwiper("(max-width: 1240px)", ".services__cards-slider", {
    spaceBetween: 18,
    slidesPerView: "auto",
    speed: 500,
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
  });
};
export const initResizableWorkflowSwiper = () => {
  createResizableSwiper("(max-width: 1230px)", ".workflow__slider", {
    spaceBetween: 10,
    slidesPerView: "auto",
    speed: 4000,
    loop: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
  });
};
