// ==========================================
// 1. Declare State Object & Global Configurations
// ==========================================
const state = {
    rates: {},          // Houses live network conversion mapping
    watchlist: []       // Array tracking pinned target currencies strings
};

const API_ENDPOINT = 'https://er-api.com';
const STORAGE_KEY = 'currency_dashboard_watchlist';

// DOM Node References
const statusArea = document.getElementById('status-area');
const currencySelect = document.getElementById('currency-select');
const convertForm = document.getElementById('convert-form');
const amountInput = document.getElementById('amount');
const resultArea = document.getElementById('result-area');
const watchlistContainer = document.getElementById('watchlist');
const addWatchlistBtn = document.getElementById('add-watchlist-btn');

// ==========================================
// 2. Render Functions (Dropdown and Pinned Watchlists)
// ==========================================
function render() {
    // Empty the select node before drawing loops
    currencySelect.innerHTML = '';
    
    const currencies = Object.keys(state.rates).sort();
    
    currencies.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency;
        option.textContent = `${currency} (${state.rates[currency].toFixed(4)})`;
        currencySelect.appendChild(option);
    });
}

function renderWatchlist() {
    watchlistContainer.innerHTML = '';

    if (state.watchlist.length === 0) {
        watchlistContainer.innerHTML = '<span class="empty-text">Your watchlist is currently empty.</span>';
        return;
    }

    state.watchlist.forEach(currency => {
        const rate = state.rates[currency];
        const itemRow = document.createElement('div');
        itemRow.className = 'watchlist-item';
        
        // Build robust structural layout with values using data attributes for performance mapping
        itemRow.innerHTML = `
            <span><strong>1 ETB</strong> = ${rate ? rate.toFixed(4) : 'N/A'} ${currency}</span>
            <button class="btn-delete" data-currency="${currency}">Remove</button>
        `;
        watchlistContainer.appendChild(itemRow);
    });
}

// ==========================================
// 3. Network Lifecycle Async Implementation
// ==========================================
async function loadRates() {
    showStatus('Fetching latest conversion exchange rates...', 'loading');
    
    try {
        const response = await fetch(API_ENDPOINT);
        
        if (!response.ok) {
            throw new Error(`Server returned a bad status code: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Commit live rates to state map tracking
        state.rates = data.rates;
        
        // Execute structural screen rendering draws immediately
        render();
        renderWatchlist(); 
        hideStatus();
    } catch (error) {
        console.error('Fetch operations failure:', error);
        showStatus('Failed to synchronize currency metrics. Please verify connections.', 'error');
        
        // Fallback gracefully to Step 2 hard-coded mock rates if connection drops entirely
        state.rates = { 
            USD: 0.0078, 
            EUR: 0.0073, 
            KES: 1.0150, 
            GBP: 0.0061, 
            AED: 0.0286, 
            SAR: 0.0293,
            CNY: 0.0564 };
        render();
        renderWatchlist();
    }
}

// Helper methods targeting status alert changes
function showStatus(text, type) {
    statusArea.textContent = text;
    statusArea.className = type === 'loading' ? 'status-loading' : 'status-error';
    statusArea.style.display = 'block';
}

function hideStatus() {
    statusArea.style.display = 'none';
}

// ==========================================
// 4. Form Lifecycle Management Logic
// ==========================================
convertForm.addEventListener('submit', (event) => {
    event.preventDefault();
    resultArea.textContent = ''; // Flush preceding outputs

    const rawAmount = amountInput.value.trim();
    const targetedCurrency = currencySelect.value;
    
    const numericalAmount = Number(rawAmount);

    // Explicit verification validations boundary blocks
    if (rawAmount === '' || isNaN(numericalAmount) || numericalAmount <= 0) {
        resultArea.textContent = '❌ Please specify a valid numerical value greater than 0.';
        resultArea.style.color = 'var(--danger)';
        return;
    }

    const exchangeRate = state.rates[targetedCurrency];
    if (!exchangeRate) {
        resultArea.textContent = '❌ Conversion calculation error. Selected rate missing.';
        resultArea.style.color = 'var(--danger)';
        return;
    }

    const calculatedOutput = numericalAmount * exchangeRate;
    
    // Output presentation layout parameters
    resultArea.textContent = `${numericalAmount.toLocaleString()} ETB = ${calculatedOutput.toFixed(2)} ${targetedCurrency}`;
    resultArea.style.color = 'var(--primary)';
});

// ==========================================
// 5. Watchlist Controls & Element Delegation Click Handlers
// ==========================================
addWatchlistBtn.addEventListener('click', () => {
    const selectedCurrency = currencySelect.value;
    
    if (!selectedCurrency) return;

    // Strict validation safeguarding against identical element replication
    if (state.watchlist.includes(selectedCurrency)) {
        alert(`${selectedCurrency} is already pinned to your active watchlist dashboard.`);
        return;
    }

    state.watchlist.push(selectedCurrency);
    renderWatchlist();
    save(); // Sync state mutations immediately to local storage
});

// Use a unified delegated click listener tracking internal target buttons
watchlistContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-delete')) {
        const componentToDrop = event.target.getAttribute('data-currency');
        
        // Remove item from state array filter mapping
        state.watchlist = state.watchlist.filter(currency => currency !== componentToDrop);
        
        renderWatchlist();
        save(); // Commit item reduction changes immediately to storage
    }
});

// ==========================================
// 6. Safe LocalStorage State Synchronization Helpers
// ==========================================
function save() {
    try {
        const serializedData = JSON.stringify(state.watchlist);
        localStorage.setItem(STORAGE_KEY, serializedData);
    } catch (error) {
        console.error('Storage processing could not complete stringification actions:', error);
    }
}

function load() {
    try {
        const storedWorkspace = localStorage.getItem(STORAGE_KEY);
        if (storedWorkspace === null) {
            return [];
        }
        const parsedArray = JSON.parse(storedWorkspace);
        return Array.isArray(parsedArray) ? parsedArray : [];
    } catch (error) {
        console.error('Corrupted context detected inside localStorage targets. Resetting values.', error);
        return [];
    }
}

// Core App Bootstrapping Loop Sequence
function init() {
    state.watchlist = load(); // Fetch and resolve local browser storage contexts
    loadRates();              // Fire asynchronous external currency fetch sequence
}

init();
