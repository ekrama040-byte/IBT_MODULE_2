# 📊 ETB Currency Exchange Dashboard

A responsive, client-side currency calculator and exchange tracking app built using baseline base-currency metrics (**Ethiopian Birr - ETB**). This application serves as a complete demonstration of state-driven architecture, resilient API network error handling, form input sanitization, and structured browser storage operations.

---

## ✨ Features

*   **⚡ State-Driven Rendering:** Structural separation between raw runtime variables (`state` object) and target DOM manipulation draws (`render()` / `renderWatchlist()`).
*   **🔌 Resilient Network Failover Engine:** Asynchronously queries live endpoints. Includes a complete operational `try...catch` boundary layer that instantly serves an expanded offline placeholder mock system (`USD`, `EUR`, `KES`, `AED`, etc.) without throwing application runtime crashes if API limits or connection errors drop.
*   **🛡️ Secure Input Normalization:** Safely prevents native document routing via `.preventDefault()`. Sanitizes user expressions with strict `.trim()` cleanups and standardizes string representations to numerical instances with explicit `Number()` boundaries.
*   **📌 Pinned Interactive Watchlists:** Saves selected currency assets dynamically into persistent views. Implements single-node event delegation (`data-currency` monitoring) to clean out items from runtime structures.
*   **💾 Fault-Tolerant Storage Engine:** Serializes active arrays into custom `localStorage` objects. Protects browser initialization loops from malformed data objects or null strings using protective error isolation rules.

---

## 📂 Structural Layout

```text
currency_dashboard/
├── index.html     # Layout tree, semantic input items, visual alert nodes, and CSS variables
├── app.js         # Single-source state, asynchronous fetch loops, and validation engines
└── README.md      # Overview documentation, architecture breakdown, and local launch step
```

---

## 🚀 How To Run the Application

Follow this single step to launch and interact with the application:

Double-click on the `index.html` file within your local project directory. The workspace will open immediately inside any modern desktop web browser (e.g., Chrome, Safari, Firefox, Edge). No background server compilation, node environments, or runtime dependencies are required.

---

## 🛠️ Validation Testing Checkpoints

- [x] **Fallback Protection:** When offline or facing API issues, displays a user-friendly fallback warning and populates choices with local offline rates instead of failing silently.
- [x] **Strict Input Guardrails:** Rejects non-numerical strings, negative numbers, or empty entries in the amount field, showing clean in-app error feedback.
- [x] **Duplicate Allocation Prevention:** Checks the state array to stop users from pinning an existing currency option to the watchlist twice.
- [x] **State Persistence:** Saved tracking items remain completely intact through manual page refreshes, hard reloads, and window state closures.
