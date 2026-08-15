// question number 5: Import  VAT and addVat from money.js bindings from our module file
import { VAT, addVat } from './money.js';

const basePrice = 400;
const finalPrice = addVat(basePrice);

console.log(`Current VAT Rate: ${VAT * 100}%`);
console.log(`Total Price after tax: ${finalPrice} ETB`);

