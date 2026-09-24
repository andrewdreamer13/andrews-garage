import pinIcon from "../../assets/icons/contacts/map-pin-2.svg";
export const initCustomMap = async (container) => {
  const { mapLat, mapLng } = container.dataset;

  const mapboxModule = await import("mapbox-gl");
  const mapboxgl = mapboxModule.default || mapboxModule;

  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const map = new mapboxgl.Map({
    container: container,
    style: "mapbox://styles/andrew-dreamer/cmsohob9k00sh01sabxf33rpc",
    center: [parseFloat(mapLng), parseFloat(mapLat)],
    zoom: 10,
    cooperativeGestures: true,
    keyboard: false,
  });

  map.on("load", () => {
    const canvas = container.querySelector(".mapboxgl-canvas");
    if (canvas) {
      canvas.setAttribute("tabindex", "-1");
    }
  });

  if (window.innerWidth < 768) {
    map.setPadding({ right: 0 });
  } else {
    map.setPadding({ right: 450 });
  }

  map.addControl(new mapboxgl.FullscreenControl());
  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(
    new mapboxgl.ScaleControl({
      maxWidth: 80,
      unit: "metric",
    }),
  );

  const el = document.createElement("div");
  el.className = "custom-marker";
  el.style.backgroundImage = `url("${pinIcon}")`;
  el.style.width = "40px";
  el.style.height = "40px";
  el.style.backgroundSize = "cover";
  el.style.cursor = "pointer";

  new mapboxgl.Marker(el)
    .setLngLat([parseFloat(mapLng), parseFloat(mapLat)])
    .addTo(map);

  container.classList.add("_is-loaded");
  container.setAttribute("tabindex", "0");
  container.setAttribute(
    "aria-label",
    "Interactive map. Press Enter to interact.",
  );

  let isMapActive = false;

  const setMapKeyboardActive = (active) => {
    isMapActive = active;
    if (active) {
      map.keyboard.enable();

      container.querySelectorAll(".mapboxgl-ctrl button").forEach((btn) => {
        btn.setAttribute("tabindex", "0");
      });
      container.classList.add("_is-map-active");
      container.setAttribute(
        "aria-label",
        "Map active. Use arrow keys to pan, +/- to zoom. Press Escape to exit.",
      );
    } else {
      map.keyboard.disable();
      container.querySelectorAll(".mapboxgl-ctrl button").forEach((btn) => {
        btn.setAttribute("tabindex", "-1");
      });
      container.classList.remove("_is-map-active");
      container.setAttribute(
        "aria-label",
        "Interactive map. Press Enter to interact.",
      );
    }
  };

  container.querySelectorAll(".mapboxgl-ctrl button").forEach((btn) => {
    btn.setAttribute("tabindex", "-1");
  });

  container.addEventListener("click", () => {
    setMapKeyboardActive(true);
  });

  container.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && !isMapActive) {
      e.preventDefault();
      setMapKeyboardActive(true);
      const firstControlBtn = container.querySelector(".mapboxgl-ctrl button");
      if (firstControlBtn) firstControlBtn.focus();
    }

    if (e.key === "Escape" && isMapActive) {
      e.preventDefault();
      setMapKeyboardActive(false);
      container.focus();
    }
  });

  container.addEventListener("focusout", (e) => {
    if (e.relatedTarget && container.contains(e.relatedTarget)) {
      return;
    }
    setMapKeyboardActive(false);
  });

  setTimeout(() => {
    map.resize();
  }, 100);
};
