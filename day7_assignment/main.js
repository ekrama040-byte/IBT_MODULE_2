// ==========================================
// 1. VAT Function & Arrow Function
// ==========================================

// Regular function with a default parameter
function vat(amount, rate = 0.15) {
    return amount * rate;
}

// Arrow function with an implicit return
const vatArrow = (amount, rate = 0.15) => amount * rate;

console.log("--- Task 1: VAT Calculations ---");
console.log("Regular function (1000 ETB, default 15%):", vat(1000)); 
console.log("Arrow function (1000 ETB, default 15%):", vatArrow(1000));
console.log("Arrow function (1000 ETB, custom 20%):", vatArrow(1000, 0.20));


// ==========================================
// 2. Closure Counter
// ==========================================

function makeCounter() {
    let count = 0; // Private variable
    return function() {
        count++;
        return count;
    };
}

console.log("\n--- Task 2: Closure Counter ---");
const counter = makeCounter();
console.log("First call:", counter());  // 1
console.log("Second call:", counter()); // 2
console.log("Third call:", counter());  // 3

/*
  WHY 'count' STAYS PRIVATE:
  The 'count' variable stays private because of JavaScript's lexical scoping and closures. 
  The variable is declared inside the local scope of 'makeCounter'. External code cannot 
  access it directly. However, the returned inner function forms a "closure"—it retains 
  a permanent reference to its birthplace scope. This allows the inner function to read 
  and update 'count' even after 'makeCounter' has finished executing, keeping the state 
  securely encapsulated.
*/


// ==========================================
// 3. Discount Factory
// ==========================================

function discountBy(rate) {
    return function(price) {
        return price * (1 - rate);
    };
}

const memberPrice = discountBy(0.10); // 10% off
const salePrice = discountBy(0.30);   // 30% off

console.log("\n--- Task 3: Discount Factory ---");
const originalPrice = 1000;
console.log(`Original Price: ${originalPrice} ETB`);
console.log(`Member Price (10% off): ${memberPrice(originalPrice)} ETB`);
console.log(`Sale Price (30% off): ${salePrice(originalPrice)} ETB`);


// ==========================================
// 4. Higher-Order Function (applyToAll)
// ==========================================

function applyToAll(list, fn) {
    const result = [];
    for (let i = 0; i < list.length; i++) {
        result.push(fn(list[i]));
    }
    return result;
}

console.log("\n--- Task 4: Higher-Order Function ---");
const itemPrices = [100, 250, 500, 1000];

// Using the vatArrow function from Task 1 to calculate VAT amounts
const vatAmounts = applyToAll(itemPrices, vatArrow); 

console.log("Original Prices:", itemPrices);
console.log("Calculated VAT (15%):", vatAmounts);


// ==========================================
// 5. Array forEach with Ethiopian Cities
// ==========================================

console.log("\n--- Task 5: Ethiopian Cities ---");
const cities = ["Addis Ababa", "Dire Dawa", "Adama", "Bahir Dar", "Hawassa"];

cities.forEach((city, index) => {
    // Adding 1 to index so it displays as 1-based numbering instead of 0-based
    console.log(`${index + 1}. ${city}`);
});
