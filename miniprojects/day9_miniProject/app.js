// Cache element references once at the top
const form = document.querySelector("#addform");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");

// Handle form submission
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevents page reload
    const n = name.value.trim();
    const p = Number(price.value);
    
    if (!n || !p) return; // Validation check
    
    addRow(n, p);
    form.reset();
    updateTotal();
});

// Event delegation on the parent <ul> container
list.addEventListener("click", (e) => { 
    // 1. DELETE FEATURE: Clicking the Delete button removes the row
    if (e.target.matches(".del")) { 
        e.target.closest("li").remove(); 
        updateTotal(); 
    } 
    
    // 2. EDIT FEATURE: Clicking the Edit button opens the prompt window
    else if (e.target.matches(".edit-btn")) {
        const li = e.target.closest("li");
        const textSpan = li.querySelector("span");
        
        // Open a prompt window showing the current price
        const newPrice = prompt(`Edit price for ${li.dataset.name}:`, li.dataset.price);
        
        // Validate that the user typed a real number and didn't hit cancel
        if (newPrice !== null && !isNaN(newPrice) && newPrice.trim() !== "") {
            const cleanPrice = Number(newPrice);
            
            // Update the hidden data price attribute
            li.dataset.price = cleanPrice;
            
            // Rebuild the text line using the stored name attribute
            textSpan.textContent = `${li.dataset.name} - ${cleanPrice} ETB`;
            
            // Recalculate the live total balance
            updateTotal();
        }
    }
    
    // 3. BOUGHT FEATURE: Clicking the text or row background toggles the crossed-out style
    else if (e.target.matches("li") || e.target.matches("span")) {
        const li = e.target.closest("li");
        li.classList.toggle("bought");
    }
});

// Render each item as a row using createElement and append
function addRow(itemName, itemPrice) {
    const li = document.createElement("li");
    
    // Store both the price and name as custom dataset attributes for easy editing/tracking
    li.dataset.price = itemPrice; 
    li.dataset.name = itemName;

    // Create item details text container (the <span>)
    const textSpan = document.createElement("span");
    textSpan.textContent = `${itemName} - ${itemPrice} ETB`;
    
    // Create button container to keep styling neat
    const btnContainer = document.createElement("div");
    btnContainer.className = "actions";

    // Create Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.type = "button"; // Prevents form triggers

    // Create Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "del";
    delBtn.type = "button";

    // Append buttons to their container layout block
    btnContainer.append(editBtn, delBtn);

    // Append child elements into the list item row
    li.append(textSpan, btnContainer);
    
    // Append row into the main list container
    list.append(li);
}

// Live running total calculation of ETB prices
function updateTotal() {
    let total = 0;
    const items = list.querySelectorAll("li");
    
    items.forEach(item => {
        total += Number(item.dataset.price);
    });
    
    totalEl.textContent = total;
}

