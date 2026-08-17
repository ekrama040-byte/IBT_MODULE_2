import { transactions } from "./transactions.js";
import { totalByType, generateReceipts, correctTransactionAmount } from "./report.js";

console.log("=== TELEBIRR TRANSACTION REPORT ===");

// 1. Calculate Totals
const totalDebits = totalByType(transactions, "debit");
const totalCredits = totalByType(transactions, "credit");
console.log(`Total Debits : ${totalDebits} ETB`);
console.log(`Total Credits: ${totalCredits} ETB`);

// 2. Receipts
console.log("\n=== CUSTOMER RECEIPTS ===");
const receipts = generateReceipts(transactions);
receipts.forEach(receipt => console.log(receipt));

// 3. Immutable Correction
console.log("\n=== DATA CORRECTION AUDIT ===");
const originalTx = transactions[0]; 
const correctedTx = correctTransactionAmount(originalTx, 300);

console.log("Original Item State:", originalTx);
console.log("Corrected Copy:", correctedTx);
