export const initStickyHeader = () => {
  const header = document.querySelector(".header");

  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const threshold = 700;
    if (currentScrollY < 0) return;

    if (currentScrollY <= threshold) {
      header.classList.remove("header--sticky", "header--hidden");
    } else {
      if (
        currentScrollY > lastScrollY &&
        !header.classList.contains("header--hidden")
      ) {
        header.classList.add("header--hidden");
        header.classList.remove("header--sticky");
      } else if (
        currentScrollY < lastScrollY &&
        header.classList.contains("header--hidden")
      ) {
        header.classList.remove("header--hidden");
        header.classList.add("header--sticky");
      }
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  });
};
