export const initLazyImages = () => {
  const lazyImages = document.querySelectorAll("[data-src]");
  console.log(lazyImages);
  

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const image = entry.target;

        image.src = image.dataset.src;
        image.removeAttribute("data-src");

        observer.unobserve(image);
      });
    },
    {
      rootMargin: "100px 0px",
    },
  );

  lazyImages.forEach((image) => imageObserver.observe(image));
};


