export function initDatePicker() {
  const dateInput = document.getElementById("appointment-date");
  if (!dateInput) return;

  let fpInstance = null;

  const handleFirstInteraction = async () => {
    const [{ default: flatpickr }, { default: confirmDatePlugin }] =
      await Promise.all([
        import("flatpickr"),
        import("flatpickr/dist/plugins/confirmDate/confirmDate"),
      ]);

    fpInstance = flatpickr(dateInput, {
      enableTime: true,
      dateFormat: "m/d/Y h:i K",
      minDate: "today",
      // maxDate: maxSelectableDate,
      monthSelectorType: "static",
      minuteIncrement: 30,
      disableMobile: true,
      clickOpens: false,

      plugins: [
        new confirmDatePlugin({
          confirmText: "OK",
          showAlways: false,
          theme: "dark",
        }),
      ],
    });
  };

 
  dateInput.addEventListener("click", () => {
    if (fpInstance) fpInstance.open();
  });

  dateInput.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && fpInstance) {
      e.preventDefault();
      fpInstance.open();
    }
  });

  dateInput.addEventListener("focus", handleFirstInteraction, { once: true });
}

