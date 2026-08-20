const form = document.getElementById("countryForm");
const input = document.getElementById("countryInput");
const status = document.getElementById("status");
const container = document.getElementById("countryContainer");

async function getCountry(country) {
  try {
    // Loading state
    status.textContent = "Loading...";
    container.innerHTML = "";

    // Teacher's API
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}`
    );

    // Check HTTP error
    if (!response.ok) {
      throw new Error("Country not found");
    }

    // Convert response to JSON
    const data = await response.json();

    // First country returned
    const countryData = data[0];

    // Remove loading message
    status.textContent = "";

    // Create elements
    const card = document.createElement("div");
    const title = document.createElement("h2");
    const flag = document.createElement("img");
    const capital = document.createElement("p");
    const population = document.createElement("p");
    const region = document.createElement("p");
    const currency = document.createElement("p");

    // Country name
    title.textContent = countryData.name.common;

    // Flag
    flag.src = countryData.flags.svg;
    flag.alt = `${countryData.name.common} flag`;
    flag.width = 200;

    // Capital
    capital.textContent =
      `Capital: ${countryData.capital?.[0] || "N/A"}`;

    // Population
    population.textContent =
      `Population: ${countryData.population.toLocaleString()}`;

    // Region
    region.textContent =
      `Region: ${countryData.region}`;

    // Currency
    const currencies = Object.values(
      countryData.currencies || {}
    );

    currency.textContent =
      `Currency: ${
        currencies.length
          ? currencies
              .map(item => `${item.name} (${item.symbol || ""})`)
              .join(", ")
          : "N/A"
      }`;

    // Build the card
    card.appendChild(title);
    card.appendChild(flag);
    card.appendChild(capital);
    card.appendChild(population);
    card.appendChild(region);
    card.appendChild(currency);

    // Show the card
    container.appendChild(card);

  } catch (error) {
    console.error("Error:", error);

    status.textContent =
      "Country not found. Please try another country.";
  }
}


// Search
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const country = input.value.trim();

  if (!country) {
    status.textContent = "Please enter a country.";
    return;
  }

  getCountry(country);
});


// Default to Ethiopia
getCountry("Ethiopia");