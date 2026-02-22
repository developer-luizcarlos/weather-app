// DOM Elements
const customSelect = document.querySelector("#custom-select");

// Global variables
const supportedUnits = ["Celsius", "Fareheint"];

let unit = supportedUnits[0];

// Listeners
window.addEventListener("DOMContentLoaded", () => {
  renderUnitOptions();
});

if (customSelect instanceof HTMLElement) {
  customSelect.addEventListener("click", handleCustomSelectClick);
}

// Handles
function handleCustomSelectClick() {
  // Open/Close the select
  customSelect.classList.toggle("custom-select-open");

  const customSelectOptions = customSelect.querySelectorAll(
    ".custom-select-option",
  );
  if (customSelectOptions instanceof NodeList) {
    customSelectOptions.forEach((el, index) => {
      // Does not apply event on first option, which is current selected
      if (index === 0) return;

      el.addEventListener("click", (event) => {
        const optionValue = el.value;

        // Update preferred unit to display results
        if (supportedUnits.includes(optionValue)) {
          unit = optionValue;

          renderUnitOptions();
        }
      });
    });
  }
}

// Functions
function renderUnitOptions() {
  const children = [
    ...customSelect.querySelectorAll(
      ".custom-select-option:not(:first-of-type)",
    ),
  ];

  // Clear the previous elements within custom select
  children.forEach((el) => el.remove());

  const fragment = document.createDocumentFragment();

  /*
    Create a option in custom select with
    the supported units
  */
  supportedUnits.forEach((item) => {
    const customOption = document.createElement("div");

    customOption.textContent = item;
    customOption.value = item;
    customOption.role = "option";
    customOption.ariaSelected = unit === item;
    customOption.classList.add("custom-select-option");

    fragment.appendChild(customOption);
  });

  customSelect.appendChild(fragment);
}
