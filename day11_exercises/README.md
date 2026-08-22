# Day 11 Exercises: Core LocalStorage & Form Validation Practice

A lightweight JavaScript web application demonstrating browser data persistence, precise form validation, and structural exception handling. This project serves as a foundations practice workbook containing individual feature solutions wrapped inside a single operational interface.

## 🚀 Key Functional Requirements Solved

*   **Exercise 1 (Theme Toggle Persistence):** Adds a persistent Light/Dark state system. The UI checks the machine's `localStorage` state on bootup, restores the client's past choice, and instantly saves state updates over runtime shifts.
*   **Exercise 2 (Defensive LocalStorage Engine):** Features robust `save()` and `load()` data access helper abstractions. It encapsulates low-level `JSON.stringify` and `JSON.parse` operations within strict `try...catch` blocks to protect execution threads from unparsable syntax errors, unexpected structural data variations, or empty `null` evaluations.
*   **Exercise 3, 4, 5 (Form Lifecycle Management & Regex Matching):** Collects user registration criteria while completely isolating default programmatic event routing via `.preventDefault()`. Before evaluating elements, values are strictly normalized using `.trim()`. 
    *   **Name Validation:** Confirms a length boundary threshold of at least two non-whitespace characters.
    *   **Phone Validation:** Performs validation using a localized Ethiopian regular expression pattern: `/^(?:\+251|0)9\d{8}$/`. It safely accepts both domestic regional entries (`09...`) and structural international prefixes (`+2519...`).
    *   **Cross-Site Scripting (XSS) Prevention:** Writes descriptive contextual updates exclusively through modern, safe DOM properties (`textContent`) instead of vulnerable code rendering parsers (`innerHTML`).
*   **Exercise 6 (State Persistence & Metrics Lifecycle):** On a successful registration pass, the engine compiles the valid input object, commits the mutation to `localStorage` as serialized JSON, clears form values, and increments an active registry counter on subsequent page-load cycles.

---

## 📂 Project Repository Structure

Ensure your directory contains the following tracking assets before submission:
```text
day11_exercises/
├── index.html     # Layout structuring, CSS styling variables, and interface nodes
├── app.js         # Core validation framework, storage models, and event observers
└── README.md      # Project documentation, execution requirements, and usage steps
```

---

## 💻 How To Run the Application

Follow this single step to launch and run the interface locally:

Double-click on the `index.html` file within your local project folder to launch the interface directly in your preferred web browser (e.g., Chrome, Safari, Edge, Firefox). No background execution environment, terminal execution lines, or package managers are required.

---

## 🛠️ Verification Checklist

- [x] **Boundary Failures:** Rejects empty or insufficient string-length parameters in the name field, producing clean, contextual errors.
- [x] **Regional Expression Verification:** Accepts `0911234567` and `+251911234567` while discarding invalid country configurations or arbitrary lengths.
- [x] **Session Longevity:** Holds stored arrays and active user metrics through hard reloads, manual window closures, and state refreshes.
- [x] **Defensive Strategy:** Falls back cleanly to an empty workspace structure without system failure if local memory keys encounter corrupted data or altered strings.
