import "../scss/main.scss";
import "virtual:svg-icons-register";

// import "swiper/css";
// import "swiper/css/navigation";

import { optionsData } from "./data/selectOptions.js";
import { initPreloader } from "./components/preloader.js";
import { initBurger } from "./components/burger.js";
import { initModal } from "./components/modalManager.js";
import { initAccordion } from "./components/accordion.js";
import { initFocusManager } from "./services/focusManager.js";
import { initTabs } from "./components/tabs.js";
import { initSliders } from "./components/sliders.js";
import { initCookieBanner } from "./components/cookieBanner.js";
import { initCustomSelect } from "./components/customSelect.js";
import { initFormHandler } from "./forms/formHandler.js";
import { initResizableServicesSwiper } from "./services/matchMediaSlider.js";
import { initResizableWorkflowSwiper } from "./services/matchMediaSlider.js";
import { initMaps } from "./services/lazyMapLoader.js";
import { initDatePicker } from "./components/dataPicker.js";
import { initCurrentYear } from "./helpers/currentYear.js";
import { initSyncDataAttrWithText } from "./helpers/syncDataAttrWithText.js";
import { initTextareaResize } from "./helpers/textareaAutoResize.js";
import { initStickyHeader } from "./services/stickyHeader.js";

document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initBurger("#burger", ".nav-mobile");
  initSliders();
  initModal();
  initAccordion("#workflow-accordion");
  initFocusManager();
  initTabs(".tabs");
  initCookieBanner();
  initCustomSelect("#services", optionsData.services);
  initFormHandler("#booking-form");
  initResizableServicesSwiper();
  initResizableWorkflowSwiper();
  initMaps();
  initDatePicker();
  initSyncDataAttrWithText(".footer__author", "text");
  initCurrentYear();
  initTextareaResize();
  initStickyHeader();
});
