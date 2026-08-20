// // ============================================================================
// // ADVANCED: TeleBirr Loyalty Points Module Factory (Enterprise Grade)
// // ============================================================================

// function createLoyalty(customerName, earnRule = (etb) => Math.floor(etb / 10)) {
//     // Private State Variables (Hidden from the outside)
//     let points = 0; 
//     let totalEtbSpent = 0;
//     const transactionHistory = []; // Tracks every single action for audits

//     // Helper to log history privately inside the closure
//     const logTransaction = (type, amount, balanceAfter) => {
//         const timestamp = new Date().toLocaleTimeString();
//         transactionHistory.push({ timestamp, type, amount, balanceAfter });
//     };

//     // Return the public interface object
//     return {
//         // 1. Earn Operation with Validation & Tracking
//         earn(etb) { 
//             if (typeof etb !== 'number' || etb <= 0) {
//                 console.log(`⚠️ [ERROR]: Invalid earn amount for ${customerName}. Must be a positive number.`);
//                 return;
//             }
//             const pointsGained = earnRule(etb);
//             points += pointsGained;
//             totalEtbSpent += etb;
            
//             logTransaction("EARN_POINTS", pointsGained, points);
//         }, 
        
//         // 2. Redeem Operation with Over-draft Protection
//         redeem(amount) { 
//             if (typeof amount !== 'number' || amount <= 0) {
//                 console.log(`⚠️ [ERROR]: Invalid redeem amount for ${customerName}. Must be a positive number.`);
//                 return;
//             }
//             if (amount > points) {
//                 console.log(`❌ [REJECTED]: ${customerName} tried to spend ${amount} pts but only has ${points} pts.`);
//                 return; // Refuse transaction entirely instead of dipping below zero
//             }
            
//             points -= amount;
//             logTransaction("REDEEM_POINTS", amount, points);
//         },
        
//         // 3. Secure Getter for Balance
//         balance() { 
//             return points; 
//         },

//         // 4. ADVANCED FEATURE: Dynamic VIP Tier System
//         getVIPTier() {
//             if (totalEtbSpent >= 10000) return "👑 Platinum VIP";
//             if (totalEtbSpent >= 5000) return "🥇 Gold VIP";
//             return "🥈 Standard Member";
//         },

//         // 5. ADVANCED FEATURE: Secure Audit Log Export
//         printAuditLog() {
//             console.log(`\n📜 --- Official TeleBirr Audit Log for ${customerName} ---`);
//             if (transactionHistory.length === 0) console.log("No transactions yet.");
//             transactionHistory.forEach((tx) => {
//                 console.log(`[${tx.timestamp}] Action: ${tx.type} | Value: ${tx.amount} | Balance: ${tx.balanceAfter} pts`);
//             });
//             console.log(`Total Money Spent in App: ${totalEtbSpent} ETB`);
//             console.log("-------------------------------------------------");
//         }
//     };
// }

// // ============================================================================
// // ADVANCED DEMO SCRIPT (Confined to the Edges)
// // ============================================================================
// console.log("==================================================");
// console.log("🌟 TELEBIRR LOYALTY MODULE: EXTRA CREDIT EDITION 🌟");
// console.log("==================================================\n");

// // Create a customer card
// const userCard = createLoyalty("Abebe");

// // Test Standard Earning
// userCard.earn(400); // 400 ETB -> 40 points
// userCard.earn(600); // 600 ETB -> 60 points (Total 1000 ETB spent)

// // Test Input Validation Security Defenses (Hack Prevention)
// userCard.earn(-500);       // Error: Negative amount
// userCard.earn("one thousand"); // Error: Wrong data type

// // Test Spending & Over-draft protection
// userCard.redeem(30);  // Spends 30. Remaining: 70
// userCard.redeem(200); // Rejected! Abebe only has 70.

// // Leveling up to Gold Tier
// console.log(`\nCurrent Status: ${userCard.getVIPTier()}`); // Standard
// console.log("Simulating major grocery + electronics purchases (4500 ETB)...");
// userCard.earn(4500); 
// console.log(`New Status: ${userCard.getVIPTier()}`); // Upgraded to Gold!

// // Print the encrypted timeline audit log
// userCard.printAuditLog();

// // Double Check Privacy Lockdown
// console.log("\n🔒 HACK ATTEMPT CHECKS:");
// console.log("Can we read history directly? (userCard.transactionHistory):", userCard.transactionHistory);
// console.log("Can we see total spent directly? (userCard.totalEtbSpent):", userCard.totalEtbSpent);

// ============================================================================
// Core TeleBirr Loyalty Logic Factory (Remains Pure and Encapsulated!)
// ============================================================================
function createLoyalty(customerName, earnRule = (etb) => Math.floor(etb / 10)) {
    let points = 0; 
    let totalEtbSpent = 0;
    const transactionHistory = []; 

    return {
        earn(etb) { 
            if (typeof etb !== 'number' || etb <= 0 || isNaN(etb)) {
                throw new Error("Invalid earn amount. Must be a positive number.");
            }
            const pointsGained = earnRule(etb);
            points += pointsGained;
            totalEtbSpent += etb;
            
            const tx = { timestamp: new Date().toLocaleTimeString(), type: "EARN_POINTS", amount: pointsGained, balanceAfter: points };
            transactionHistory.push(tx);
            return { tx, totalEtbSpent };
        }, 
        
        redeem(amount) { 
            if (typeof amount !== 'number' || amount <= 0 || isNaN(amount)) {
                throw new Error("Invalid redeem amount. Must be a positive number.");
            }
            if (amount > points) {
                throw new Error(`Insufficient points! You only have ${points} pts.`);
            }
            
            points -= amount;
            const tx = { timestamp: new Date().toLocaleTimeString(), type: "REDEEM_POINTS", amount: amount, balanceAfter: points };
            transactionHistory.push(tx);
            return { tx, totalEtbSpent };
        },
        
        balance() { return points; },
        getTotalSpent() { return totalEtbSpent; },
        getVIPTier() {
            if (totalEtbSpent >= 10000) return "👑 Platinum VIP";
            if (totalEtbSpent >= 5000) return "🥇 Gold VIP";
            return "🥈 Standard Member";
        }
    };
}

// ============================================================================
// Web DOM Interface Bridge (The UI Layer)
// ============================================================================
const account = createLoyalty("Abebe");

// DOM Reference Selectors
const pointsDisplay = document.getElementById("pointsDisplay");
const totalSpentDisplay = document.getElementById("totalSpentDisplay");
const vipBadge = document.getElementById("vipBadge");
const alertBox = document.getElementById("alertBox");
const ledgerBody = document.getElementById("ledgerBody");
const emptyRow = document.getElementById("emptyRow");

// Inputs and Buttons
const etbAmountInput = document.getElementById("etbAmount");
const btnEarn = document.getElementById("btnEarn");
const redeemAmountInput = document.getElementById("redeemAmount");
const btnRedeem = document.getElementById("btnRedeem");

// UI Update Assistant Function
function updateUI(txResult) {
    // 1. Hide any previous errors
    alertBox.classList.add("hidden");

    // 2. Update metric counters
    pointsDisplay.textContent = account.balance();
    totalSpentDisplay.textContent = account.getTotalSpent();
    
    // 3. Update VIP Tiers layout
    const tier = account.getVIPTier();
    vipBadge.textContent = tier;
    if (tier.includes("Gold") || tier.includes("Platinum")) {
        vipBadge.classList.add("gold");
    }

    // 4. Append row to the transaction ledger table
    if (emptyRow) emptyRow.remove();
    
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${txResult.tx.timestamp}</td>
        <td style="color: ${txResult.tx.type === 'EARN_POINTS' ? '#10b981' : '#ef4444'}; font-weight:bold;">
            ${txResult.tx.type}
        </td>
        <td>${txResult.tx.type === 'EARN_POINTS' ? '+' : '-'}${txResult.tx.amount}</td>
        <td>${txResult.tx.balanceAfter} pts</td>
    `;
    ledgerBody.insertBefore(row, ledgerBody.firstChild); // Show newest logs on top
}

function displayError(message) {
    alertBox.textContent = message;
    alertBox.className = "alert-box error";
}

// Click Listeners
btnEarn.addEventListener("click", () => {
    try {
        const etb = parseFloat(etbAmountInput.value);
        const res = account.earn(etb);
        updateUI(res);
        etbAmountInput.value = ""; // Clear input field
    } catch (err) {
        displayError(err.message);
    }
});

btnRedeem.addEventListener("click", () => {
    try {
        const pts = parseInt(redeemAmountInput.value, 10);
        const res = account.redeem(pts);
        updateUI(res);
        redeemAmountInput.value = ""; // Clear input field
    } catch (err) {
        displayError(err.message);
    }
});
