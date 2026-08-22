# 🪙 CryptoRates Live Data Dashboard

A high-performance, single-page application built to track and convert live cryptocurrency data using Bitcoin (BTC) as the baseline asset. This project implements a clean state-driven architecture, robust asynchronous operations with graceful fallbacks, and a persistent watchlisting system.

---

## 🚀 Solved Requirements Checklist

*   **📊 State-Driven Architecture:** Follows a strict model-view separation pattern. All interface updates are managed entirely via raw centralized metrics in an object (`state`) and translated to the page using discrete drawing operations (`render()` and `renderWatchlist()`).
*   **🔌 Resilient Async Integration:** Queries real-time parameters directly from the public CoinGecko API. It runs behind a defensive `try...catch` block that catches network outages or API boundaries and instantly pivots to hardcoded emergency values to guarantee continuous usability.
*   **🛡️ Secure Input Validation:** Captures field variables safely by stopping default native document actions with `.preventDefault()`. Validates criteria explicitly using `.trim()` cleanups and strict bounds mapping via `Number()`.
*   **📌 Interactive Element Delegation:** Saves selected tokens dynamically into an interface view. Cleans out tracking entries using a single structural delegated click observer checking specific target custom `data-currency` markers.
*   **💾 Fault-Tolerant Browser Storage:** Encapsulates JSON mutations into persistent machine configurations using `localStorage`. Guards the initial startup lifecycle loops against damaged strings, missing key data points, or null variables.

---

## 📂 Project Structure

```text
crypto_dashboard/
├── index.html     # Semantic nodes, layout markup trees, and interface components and the style with tailwind
├── app.js         # Unified data state, asynchronous fetch loops, and validation engines
└── README.md      # Solution overview, system architecture, and local run guide
```

---

## 💻 How To Run the Application

Follow this single step to load and review the interface locally:

Double-click on the `index.html` file within your local project directory. The workspace will open immediately inside any modern web browser (e.g., Chrome, Safari, Firefox, Edge). No background server builds, package compilers, or node terminal lines are required.

---

## 🛠️ Verification Protocols Passed

- [x] **Network Dropout Safe:** Gracefully shows an informative error banner and loads local fallback values instead of failing or throwing an application crash if the API connectivity drops out.
- [x] **Form Exception Handling:** Correctly intercepts inputs that are blank, zero, or contain symbols, displaying a red calculation error flag.
- [x] **Duplicate Array Shielding:** Rejects attempts to add the same currency token to the tracking watchlist panel twice.
- [x] **Session Permanence:** Saved watchlist tracking rows completely survive manual page refreshes, hard cache resets (`Ctrl+F5`), and close-tab events.
