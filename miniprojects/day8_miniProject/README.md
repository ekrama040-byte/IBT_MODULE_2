# Day 18 (Day 8 Portal) — TeleBirr Transaction Report Mini-Project

An enterprise-grade, modular report processing generator for an Addis Ababa TeleBirr merchant shop. This application processes transaction logs using functional array pipelines (`map`, `filter`, `reduce`), destructuring, and immutable data copy updates.

## 🏗️ Module Architecture & Responsibilities
The codebase is intentionally split across separated, reusable modules to maintain clean architectural boundaries:

1. **`transactions.js` (The Data Repository)**
   - Responsible strictly for maintaining the primary source of truth.
   - Houses and exports the raw transactions ledger data stream array.

2. **`report.js` (The Business Logic Engine)**
   - Responsible for pure analytical mathematical computations.
   - Uses `filter` and `reduce` to safely split ledger totals by debit/credit indicators.
   - Uses parameter object destructuring (`{ customer, amount }`) to compile readable customer receipts.
   - Uses the `spread` operator (`...`) to create updated copies of transactions to ensure the original logs remain unmutated and safe from accidental alterations.

3. **`app.js` (The Application Orchestrator)**
   - The primary operational entry point.
   - Handles importing modular calculations and data parameters.
   - Triggers the pipeline runs and outputs the formatted final summaries straight to the execution interface.

---

## 💻 Sample Terminal Output
```text
=== TELEBIRR TRANSACTION REPORT ===
Total Debits : 430 ETB
Total Credits: 1800 ETB

=== CUSTOMER RECEIPTS ===
Receipt -> Customer: Almaz | Value: 250 ETB | Action: DEBIT
Receipt -> Customer: Dawit | Value: 600 ETB | Action: CREDIT
...
```
