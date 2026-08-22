 // Constants & Storage Keys
    const STORAGE_KEY_USERS = 'registered_users_list';
    const STORAGE_KEY_THEME = 'app_theme_choice';

    // DOM References
    const htmlElement = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const signupForm = document.getElementById('signup-form');
    const usernameInput = document.getElementById('username');
    const phoneInput = document.getElementById('phone');
    const errorDisplay = document.getElementById('error-display');
    const successDisplay = document.getElementById('success-display');
    const signupCounter = document.getElementById('signup-counter');

    // 1. Theme Configuration (Save on change, restore on load)
    function initTheme() {
        const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) || 'light';
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeButtonText(savedTheme);
    }

    function updateThemeButtonText(theme) {
        themeToggle.textContent = theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(STORAGE_KEY_THEME, newTheme);
        updateThemeButtonText(newTheme);
    });

    // 2. Safe Save and Load Helpers with Exception Isolation
    function saveEntries(dataArray) {
        try {
            const serializedData = JSON.stringify(dataArray);
            localStorage.setItem(STORAGE_KEY_USERS, serializedData);
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    }

    function loadEntries() {
        try {
            const rawData = localStorage.getItem(STORAGE_KEY_USERS);
            if (rawData === null) {
                return [];
            }
            const parsedData = JSON.parse(rawData);
            if (Array.isArray(parsedData)) {
                return parsedData;
            }
            // If it parses but isn't an array, discard corrupt structure safely
            return [];
        } catch (error) {
            console.error('Corrupted or unparsable localStorage data found. Resetting state.', error);
            return [];
        }
    }

    // 3. Render Metric Counter
    function updateCounterDisplay() {
        const users = loadEntries();
        signupCounter.textContent = `${users.length} ${users.length === 1 ? 'person has' : 'people have'} signed up`;
    }

    // 4. Form Lifecycle Management & Validation Engine
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Hide previous visual status banners
        errorDisplay.style.display = 'none';
        successDisplay.style.display = 'none';

        const trimmedName = usernameInput.value.trim();
        const trimmedPhone = phoneInput.value.trim();

        // Rule 1: Validation Name Length Check
        if (trimmedName.length < 2) {
            showError('Name must be at least 2 characters long.');
            return;
        }

        // Rule 2: Validation Ethiopian Phone Format Matching
        // Matches local format (09 / 07 followed by 8 digits) OR international (+2519 / +2517 followed by 8 digits)
        const ethiopianPhoneRegex = /^(?:\+251|0)[97]\d{8}$/;
        if (!ethiopianPhoneRegex.test(trimmedPhone)) {
            showError('Please enter a valid Ethiopian phone number (e.g., 0911234567 or +251911234567).');
            return;
        }

        // Processing Phase: Save record on full structural compliance
        const newRecord = {
            name: trimmedName,
            phone: trimmedPhone,
            timestamp: new Date().toISOString()
        };

        const currentUsersList = loadEntries();
        currentUsersList.push(newRecord);
        saveEntries(currentUsersList);

        // UI Reset and Feedback Loop Execution
        signupForm.reset();
        updateCounterDisplay();
        showSuccess('Registration completed successfully!');
    });

    function showError(message) {
        errorDisplay.textContent = message;
        errorDisplay.style.display = 'block';
    }

    function showSuccess(message) {
        successDisplay.textContent = message;
        successDisplay.style.display = 'block';
    }

    // 5. App Core Bootstrapping Loop
    initTheme();
    updateCounterDisplay();