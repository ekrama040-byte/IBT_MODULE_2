# CBE Birr Online — Customer Dashboard Rebuild

A high-fidelity layout replica mapping the interface infrastructure of the **Commercial Bank of Ethiopia (CBE) Online Banking Dashboard Application**.

## System Deployment Overview

1. Confirm that both tracking layout assets (`index.html` and `styles.css`) are saved together under the localized assignment block (`day14/`).
2. Run `index.html` using any preferred internet browser engine.
3. Use the desktop view window to verify the vertical scrolling pipeline functionality, confirming that the top application header bar remains locked via standard sticky constraints.
4. Scale your system browser width below `750px` to check the responsive fallback grid engine, watching the sidebar controls stack vertically.

## Layout System Architectural Summary

### 1. Primary Page Layout Skeleton (CSS Grid)
The global grid canvas infrastructure uses explicit named area targets (`grid-template-areas`) to define a dual-column layout matrix:
*   `header`: Spans the upper window area, with sticky position anchors mapping coordinates seamlessly across layout movements.
*   `sidebar`: Assigned to secondary navigation targets, handling primary account path links cleanly.
*   `main`: Acts as the primary operational workspace canvas containing metrics views and dynamic charts modules.
*   `footer`: Anchored to the bottom boundary lines, conveying system usage logs.

### 2. Inner Component Layouts (Flexbox)
Individual layout details inside the grid elements utilize flexible alignment behaviors:
*   **Application Header Bar:** Employs directional row configurations with spacing parameters (`justify-content: space-between`) to isolate business identifiers on the left while organizing action anchors neatly on the right.
*   **Recent Activity Rows:** Leverages fluid alignment distributions to position operational tracking text metrics apart from currency amounts automatically.
*   **Footer Links:** Rearranges secondary documentation statements smoothly during wide screen views while handling stack ordering patterns automatically.

### 3. Fluid Balance Cards Grid
The customer metrics board contains a self-scaling display framework powered by a fluid layout statement: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));`. It computes exact grid column configurations dynamically without adding heavy media query dependencies.

### 4. Anchored Overlay Badges (Absolute Positioning)
Every banking metrics card acts as a local reference node by declaring relative layout properties (`position: relative;`). This allows status tags (`.status-badge`) to position themselves accurately against the card boundaries using top and right offsets, keeping them aligned regardless of browser window changes.
