//  question 1: Calculate the grand total of prices after adding 15% VAT, filtering out prices that are 1000 ETB or more, and summing the remaining prices.
const initialPrices =[];

const grandTotal = initialPrices
  // 1. Multiply by 1.15 to add 15% VAT
  .map(price => price * 1.15)
  // 2. Keep only prices that are strictly less than 1000 ETB
  .filter(priceWithVat => priceWithVat < 1000)
  // 3. Add all remaining prices together starting from a baseline of 0
  .reduce((accumulator, currentPrice) => accumulator + currentPrice, 0);

console.log(`Grand Total: ${grandTotal.toFixed(2)} ETB`);
// question 2: Use destructuring to extract the properties of the customer object and log them to the console.
const customer = {
  name: "Ephrem",
  city: "Addis Ababa",
  balance: 4500
};

// Use destructuring directly inside the for...of loop signature
for (const [key, value] of Object.entries(customer)) {
  console.log(`${key}: ${value}`);
}



//Exercise 3: One-Line and Parameter Destructuring
const client = { name: "Selam", city: "Hawassa", balance: 6000 };

// 1. One-line destructuring assignment
const { name, city } = client;
console.log(name, city); // Logs: Selam Hawassa

// 2. Function parameter destructuring (extracts 'name' directly from the argument)
function greet({ name }) {
  console.log(`Hello, ${name}! Welcome back.`);
}

greet(client); // Logs: Hello, Selam! Welcome back.

//4: Immutable Updates with the Spread Operator (...)
const originalCustomer = {
  name: "Dawit",
  city: "Adama",
  balance: 2500
};

// Create a copy, overwrite 'city', and add 'phone'
const updatedCustomer = {
  ...originalCustomer,
  city: "Bishoftu",
  phone: "+251911234567"
};

// Verification: The original object remains untouched!
console.log("Original:", originalCustomer); 
console.log("Updated Copy:", updatedCustomer);

