
// ==========================================
// 1. State & Global Configuration
// ==========================================

const state = {
    rates: {},
    watchlist: []
};

const API_ENDPOINT = 'https://open.er-api.com/v6/latest/ETB';

const STORAGE_KEY = 'currency_dashboard_watchlist';


// ==========================================
// 2. DOM References
// ==========================================

const statusArea = document.getElementById('status-area');
const currencySelect = document.getElementById('currency-select');
const convertForm = document.getElementById('convert-form');
const amountInput = document.getElementById('amount');
const resultArea = document.getElementById('result-area');
const watchlistContainer = document.getElementById('watchlist');
const addWatchlistBtn = document.getElementById('add-watchlist-btn');


// ==========================================
// 3. Render Currency Dropdown
// ==========================================

function render() {
    currencySelect.innerHTML = '';

    const currencies = Object.keys(state.rates).sort();

    currencies.forEach(currency => {
        const rate = state.rates[currency];

        const option = document.createElement('option');

        option.value = currency;

        option.textContent =
            `${currency} (${Number(rate).toFixed(4)})`;

        currencySelect.appendChild(option);
    });
}


// ==========================================
// 4. Render Watchlist
// ==========================================

function renderWatchlist() {
    watchlistContainer.innerHTML = '';

    if (state.watchlist.length === 0) {
        watchlistContainer.innerHTML = `
            <span class="empty-text">
                Your watchlist is currently empty.
            </span>
        `;
        return;
    }

    state.watchlist.forEach(currency => {

        const rate = state.rates[currency];

        const itemRow = document.createElement('div');

        itemRow.className = 'watchlist-item';

        itemRow.innerHTML = `
            <span>
                <strong>1 ETB</strong> =
                ${rate ? Number(rate).toFixed(4) : 'N/A'}
                ${currency}
            </span>

            <button
                type="button"
                class="btn-delete"
                data-currency="${currency}">
                Remove
            </button>
        `;

        watchlistContainer.appendChild(itemRow);
    });
}


// ==========================================
// 5. Status Messages
// ==========================================

function showStatus(text, type) {
    statusArea.textContent = text;

    if (type === 'loading') {
        statusArea.className = 'status-loading';
    } else if (type === 'success') {
        statusArea.className = 'status-loading';
        statusArea.style.background = '#ecfdf5';
        statusArea.style.color = '#047857';
    } else {
        statusArea.className = 'status-error';
    }

    statusArea.style.display = 'block';
}


function hideStatus() {
    statusArea.style.display = 'none';
}


// ==========================================
// 6. Fetch Live Exchange Rates
// ==========================================

async function loadRates() {

    showStatus(
        'Fetching latest ETB exchange rates...',
        'loading'
    );

    try {

        const response = await fetch(API_ENDPOINT, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(
                `Server returned HTTP ${response.status}`
            );
        }

        const data = await response.json();

        console.log('Exchange API response:', data);

        // Make sure the API returned exchange rates
        if (!data.rates || typeof data.rates !== 'object') {
            throw new Error(
                'API response does not contain a valid rates object.'
            );
        }

        // Store live rates
        state.rates = data.rates;

        // Render application
        render();
        renderWatchlist();

        showStatus(
            '✓ Live exchange rates synchronized successfully.',
            'success'
        );

        // Hide success message after 3 seconds
        setTimeout(hideStatus, 3000);

    } catch (error) {

        console.error(
            'Exchange rate API request failed:',
            error
        );

        showStatus(
            '⚠️ Unable to fetch live rates. Using backup rates.',
            'error'
        );

        // ==========================================
        // Backup Rates
        // ==========================================

        state.rates = {
            USD: 0.0078,
            EUR: 0.0073,
            KES: 1.0150,
            GBP: 0.0061,
            AED: 0.0286,
            SAR: 0.0293,
            CNY: 0.0564
        };

        render();
        renderWatchlist();
    }
}


// ==========================================
// 7. Currency Conversion
// ==========================================

convertForm.addEventListener('submit', event => {

    event.preventDefault();

    resultArea.textContent = '';
    resultArea.style.color = 'var(--primary)';

    const rawAmount = amountInput.value.trim();

    const targetedCurrency = currencySelect.value;

    const numericalAmount = Number(rawAmount);


    // Validate amount
    if (
        rawAmount === '' ||
        Number.isNaN(numericalAmount) ||
        numericalAmount <= 0
    ) {

        resultArea.textContent =
            '❌ Please specify a valid numerical value greater than 0.';

        resultArea.style.color = 'var(--danger)';

        return;
    }


    // Make sure a currency was selected
    if (!targetedCurrency) {

        resultArea.textContent =
            '❌ Please select a currency.';

        resultArea.style.color = 'var(--danger)';

        return;
    }


    // Get exchange rate
    const exchangeRate =
        state.rates[targetedCurrency];


    if (
        exchangeRate === undefined ||
        exchangeRate === null ||
        Number.isNaN(Number(exchangeRate))
    ) {

        resultArea.textContent =
            '❌ Conversion rate is unavailable.';

        resultArea.style.color = 'var(--danger)';

        return;
    }


    // Calculate conversion
    const calculatedOutput =
        numericalAmount * Number(exchangeRate);


    // Display result
    resultArea.textContent =
        `${numericalAmount.toLocaleString()} ETB = ` +
        `${calculatedOutput.toLocaleString(undefined, {
            maximumFractionDigits: 4
        })} ${targetedCurrency}`;

    resultArea.style.color = 'var(--primary)';
});


// ==========================================
// 8. Add Currency to Watchlist
// ==========================================

addWatchlistBtn.addEventListener('click', () => {

    const selectedCurrency =
        currencySelect.value;

    if (!selectedCurrency) {
        return;
    }


    // Prevent duplicates
    if (state.watchlist.includes(selectedCurrency)) {

        alert(
            `${selectedCurrency} is already pinned to your watchlist.`
        );

        return;
    }


    // Add currency
    state.watchlist.push(selectedCurrency);

    renderWatchlist();

    save();
});


// ==========================================
// 9. Remove Currency from Watchlist
// ==========================================

watchlistContainer.addEventListener('click', event => {

    if (
        !event.target.classList.contains('btn-delete')
    ) {
        return;
    }


    const currencyToRemove =
        event.target.getAttribute('data-currency');


    state.watchlist =
        state.watchlist.filter(
            currency => currency !== currencyToRemove
        );


    renderWatchlist();

    save();
});


// ==========================================
// 10. Save Watchlist
// ==========================================

function save() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(state.watchlist)
        );

    } catch (error) {

        console.error(
            'Unable to save watchlist:',
            error
        );
    }
}


// ==========================================
// 11. Load Watchlist
// ==========================================

function load() {

    try {

        const storedWorkspace =
            localStorage.getItem(STORAGE_KEY);


        if (storedWorkspace === null) {
            return [];
        }


        const parsedArray =
            JSON.parse(storedWorkspace);


        return Array.isArray(parsedArray)
            ? parsedArray
            : [];

    } catch (error) {

        console.error(
            'Unable to load watchlist:',
            error
        );

        return [];
    }
}


// ==========================================
// 12. Initialize Application
// ==========================================

function init() {

    // Load saved watchlist
    state.watchlist = load();

    // Fetch live rates
    loadRates();
}


// Start application
init();
