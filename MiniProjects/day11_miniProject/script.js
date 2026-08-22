// Storage Keys Constants
const KEY_USERS = 'registered_users';
const KEY_THEME = 'app_theme';

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const signupForm = document.getElementById('signup-form');
const usernameInput = document.getElementById('username');
const phoneInput = document.getElementById('phone');
const errorArea = document.getElementById('error-area');
const successArea = document.getElementById('success-area');
const signupCounter = document.getElementById('signup-counter');

/* ==========================================================================
   1. Theme Management (Requirement 1)
   ========================================================================== */
function initTheme() {
    const savedTheme = localStorage.getItem(KEY_THEME) || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'light' ? '🌙 Dark' : '☀️ Light';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(KEY_THEME, newTheme);
    themeToggle.textContent = newTheme === 'light' ? '🌙 Dark' : '☀️ Light';
});

/* ==========================================================================
   2. Robust LocalStorage Helpers (Requirement 2 & 6)
   ========================================================================== */
function save(dataArray) {
    try {
        const serialized = JSON.stringify(dataArray);
        localStorage.setItem(KEY_USERS, serialized);
    } catch (error) {
        console.error('Error stringifying data to localStorage:', error);
    }
}

function load() {
    try {
        const rawData = localStorage.getItem(KEY_USERS);
        if (rawData === null) {
            return [];
        }
        const parsed = JSON.parse(rawData);
        if (Array.isArray(parsed)) {
            return parsed;
        }
        return []; // Guard against valid JSON that is not an array (corrupt structure)
    } catch (error) {
        console.error('Corrupted JSON data in localStorage. Resetting back to empty state.', error);
        return []; // Guard against completely unparsable syntax errors
    }
}

function updateCounterDisplay() {
    const currentList = load();
    signupCounter.textContent = `${currentList.length} ${currentList.length === 1 ? 'person has' : 'people have'} signed up`;
}


signupForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent standard page navigation/reload
    
    // Clear display structures before running validation cycles
    errorArea.style.display = 'none';
    errorArea.textContent = '';
    successArea.style.display = 'none';
    successArea.textContent = '';

    // Read and trim standard values
    const trimmedName = usernameInput.value.trim();
    const trimmedPhone = phoneInput.value.trim();

    // Requirement 4 & 5: Name validation length boundary rule
    if (trimmedName.length < 2) {
        errorArea.textContent = 'Name must be at least two characters long.';
        errorArea.style.display = 'block';
        return; // Break processing sequence immediately on first encountered error
    }

    // Requirement 4 & 5: Phone validation matching strict Ethiopian structure
    const ethiopianPhoneRegex = /^(?:\+251|0)9\d{8}$/;
    if (!ethiopianPhoneRegex.test(trimmedPhone)) {
        errorArea.textContent = 'Please enter a valid Ethiopian phone number starting with 09 or +2519 followed by 8 digits.';
        errorArea.style.display = 'block';
        return;
    }

    // Requirement 6: Success state processing map
    const newUser = {
        name: trimmedName,
        phone: trimmedPhone,
        registeredAt: new Date().toISOString()
    };

    const currentUsers = load();
    currentUsers.push(newUser);
    save(currentUsers);

    // Reset standard field parameters
    signupForm.reset();
    updateCounterDisplay();
    
    successArea.textContent = 'Successfully registered!';
    successArea.style.display = 'block';
});

// App Initiation Loop on Page Load Lifecycle Window
initTheme();
updateCounterDisplay();
