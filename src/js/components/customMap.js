
//import mapboxgl from "mapbox-gl";


 
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
  el.style.backgroundImage = 'url("/src/assets/icons/contacts/map-pin-2.svg")';
  el.style.width = "40px";
  el.style.height = "40px";
  el.style.backgroundSize = "cover";
  el.style.cursor = "pointer";

  new mapboxgl.Marker(el)
    .setLngLat([parseFloat(mapLng), parseFloat(mapLat)])
    .addTo(map);

  container.classList.add("_is-loaded");
  setTimeout(() => {
    map.resize();
  }, 100);
};
