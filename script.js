import data from "./data.js";

// Populate cards
const cardsContainer = document.getElementById("cards-container");

function updateCards(timeframe) {
  cardsContainer.innerHTML = ""; // Clear existing cards
  data.forEach((item) => {
    const card = document.createElement("div");
    card.className =
      "relative bg-white rounded-[1rem] overflow-hidden shadow-md";
    card.style.backgroundColor = item.color;

    // Determine the text based on the timeframe
    let lastText = "Last";
    if (timeframe === "daily") {
      lastText = "Yesterday";
    } else if (timeframe === "weekly") {
      lastText = "Last Week";
    } else if (timeframe === "monthly") {
      lastText = "Last Month";
    }

    card.innerHTML = `
      <!-- Icon -->
      <img
        src="./images/icon-${item.title.toLowerCase()}.svg"
        alt="${item.title}"
        class="absolute -top-2 right-4 w-20"
      />
      <!-- Inner Card -->
      <div
        class="absolute bottom-0 left-0 right-0 bg-[hsl(235,46%,20%)] p-6 sm:p-2 lg:p-6 rounded-[1rem] hover:bg-[hsl(235,45%,61%)] flex flex-col justify-between h-44 cursor-pointer"
      >
        <div class="flex justify-between items-center md:pt-3 lg:pt-0">
          <h2 class="text-lg sm:text-sm md:text-lg">${item.title}</h2>
          <img src="./images/icon-ellipsis.svg" alt="Menu" />
        </div>
        <div class="flex justify-between sm:flex-col items-center justify-center gap-4 sm:gap-0 sm:items-start sm:justify-normal">
          <p class="text-4xl md:text-5xl font-thin sm:mb-2">${
            item.timeframes[timeframe].current
          } hrs</p>
          <p class="text-[hsl(236,100%,87%)] text-sm">${lastText} - ${
            item.timeframes[timeframe].previous
          } hrs</p>
        </div>
      </div>
    `;
    cardsContainer.appendChild(card);
  });
}

// Initialize with "weekly" timeframe
updateCards("weekly");

// Add event listeners to buttons
document.querySelectorAll(".timeframe-btn").forEach((button) => {
  button.addEventListener("click", () => {
    // Reset text color for all buttons
    document.querySelectorAll(".timeframe-btn").forEach((btn) => {
      btn.classList.remove("text-white");
      btn.classList.add("text-[hsl(235,45%,61%)]");
    });

    // Set text color for the clicked button
    button.classList.remove("text-[hsl(235,45%,61%)]");
    button.classList.add("text-white");

    // Update cards based on selected timeframe
    const timeframe = button.getAttribute("data-timeframe");
    updateCards(timeframe);
  });
});
