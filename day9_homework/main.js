// question number 1: Element Text and Class Manipulation
// a. Select the heading element
const heading = document.querySelector("h1");

// b. Safely update its display text
heading.textContent = "Welcome to DOM Exercises!";

// c. Toggle a class name (adds it if missing, removes it if present)
heading.classList.toggle("highlight-active");



//question number 2: Dynamic List Generation (createElement & appendChild)
const cities = ["Addis Ababa", "Hawassa", "Bahir Dar"];
const listContainer = document.querySelector("#city-list"); // Assuming <ul id="city-list"></ul>

cities.forEach(function (city) {
  // a. Create a brand-new detached <li> node
  const listItem = document.createElement("li");
  
  // b. Set its textual body content
  listItem.textContent = city;
  
  // c. Append the child node into the container element
  listContainer.appendChild(listItem);
});

//question number 3: Observing Event Bubbling

const containerDiv = document.querySelector("#parent-wrapper");
const actionButton = document.querySelector("#action-btn");

// Inner Child Listener
actionButton.addEventListener("click", function (event) {
  console.log("1. Target clicked:", event.target);
});

// Outer Parent Listener (Catches the event as it bubbles up)
containerDiv.addEventListener("click", function (event) {
  console.log("2. Parent container caught the bubbling event from:", event.target);
});


//question numbr 4: Efficient Deletions via Event Delegation

const itemContainer = document.querySelector("#item-list"); // The parent <ul>

itemContainer.addEventListener("click", function (event) {
  // Guard clause: Exit immediately if the clicked element isn't a delete button
  if (!event.target.matches(".delete-btn")) {
    return;
  }

  // Find the closest parent <li> relative to the clicked button
  const matchingRow = event.target.closest("li");
  
  // Remove the HTML element node cleanly out of the DOM view
  matchingRow.remove();
  console.log("Item removed successfully via delegation.");
});

//question number 9:Exercise 5: Intercepting Form Submissions
const entryForm = document.querySelector("#entry-form");
const dataInput = document.querySelector("#task-input");
const displayList = document.querySelector("#display-list");

entryForm.addEventListener("submit", function (event) {
  // 1. Don't trust browser defaults: block page reload
  event.preventDefault();

  // 2. Read and clean the value string
  const enteredValue = dataInput.value.trim();

  // Defensive validation: ensure it's not empty text
  if (enteredValue === "") {
    alert("Please type something before submitting!");
    return;
  }

  // 3. Create a layout element node and append it
  const freshLi = document.createElement("li");
  freshLi.textContent = enteredValue;
  displayList.appendChild(freshLi);

  // 4. Reset the input text field back to an empty string
  dataInput.value = "";
});

