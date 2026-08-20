# Async JavaScript Assignment

A clean, copy-pasteable implementation demonstrating modern asynchronous patterns, error handling, parallel execution, and lifecycle UI states.

## Setup Instructions

1. Save `index.html` and `app.js` into the same folder.
2. Open `index.html` in any web browser.
3. Open your browser console (`F12` -> **Console**) to inspect the background operations.

## Manual Testing (Task 5 UI States)

Open your browser's Developer Tools and switch to the **Network** tab to test all three execution paths:

*   **Loading State:** Set network throttling to **Slow 3G** and reload the page to see the initial persistent state.
*   **Success State:** Set network back to **No Throttling** (online) to inspect the rendered API payload.
*   **Error State:** Set network status to **Offline** and reload to watch the global boundary catch and render the application failure banner.
