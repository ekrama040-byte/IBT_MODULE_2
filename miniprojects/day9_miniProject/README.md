# 🛒 Addis Market Shopping List

An interactive, single-page web application built with vanilla JavaScript, HTML5, and CSS3. This application allows users to manage a local shopping list for items at the Addis Market, track purchases, correct pricing entry errors, and see a live running balance in ETB.

This project focuses heavily on baseline frontend engineering practices, utilizing efficient single-reference DOM element caching and event delegation patterns.

## ✨ Features

- **Dynamic Row Appending:** Uses browser manufacturing methods (`createElement` and `append`) to instantly push new entries into view without performing full-page document string rebuilds.
- **Event Delegation:** Implements a single unified click listener on the parent list container to cleanly route delete, toggle, and edit commands.
- **Form Interception:** Utilizes event submission hijacking (`preventDefault`) to handle inputs and entry validation smoothly without page reloads.
- **Dynamic Balance Recalculation:** Features a running live aggregator that sums item dataset values instantly upon additions, alterations, or row removals.
- **Interactive States:** Toggle individual row background themes and cross out text properties via pure CSS class manipulation (`.bought`).
- **Inline Editing (Bonus):** Click the dedicated "Edit" button to dynamically launch an input prompt overlay to adjust pricing errors instantly.

## 🚀 Getting Started

### Prerequisites
You do not need any local servers or backend dependencies to run this application. You only need a modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari).

### How to Run Locally

#### Method 1: Extension (Recommended)
1. Open this repository folder inside **Visual Studio Code**.
2. Install the **Live Server** extension by Ritwick Dey.
3. Open `index.html`, right-click anywhere on the text window, and select **Open with Live Server**.

#### Method 2: Direct Execution
1. Download or clone this repository folder onto your local disk.
2. Locate the file named `index.html` inside your file browser system.
3. Double-click `index.html` to instantly load the interface into your default system browser window.

## 📂 Project Structure

```text
day9_miniProject/
├── index.html   # Main structural layout markup
├── styles.css   # Document layout definitions and purchase theme classes
├── app.js       # Element selectors, click routing engines, and calculators
└── README.md    # Repository operational documentation
```

## 📝 Technologies Used

- **HTML5:** Semantic document tree layouts.
- **CSS3:** Component layout flexing, transitions, and targeted attribute triggers.
- **JavaScript (ES6+):** Advanced DOM element manipulation, data tracking structures, and interactive browser actions.
