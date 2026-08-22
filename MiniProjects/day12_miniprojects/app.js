// ==========================================================================
// CryptoRates - Application
// ==========================================================================

const state = {
    rates: {},
    watchlist: []
};

// CoinGecko API endpoint
const API_ENDPOINT =
    'https://api.coingecko.com/api/v3/simple/price' +
    '?ids=bitcoin,ethereum,litecoin' +
    '&vs_currencies=usd,eur,gbp,eth,ltc';

const LOCAL_STORAGE_KEY = 'crypto_dashboard_saved_watchlist';

// ==========================================================================
// DOM ELEMENTS
// ==========================================================================

const statusArea = document.getElementById('status-area');
const cryptoSelect = document.getElementById('crypto-select');
const convertForm = document.getElementById('convert-form');
const amountInput = document.getElementById('amount');
const resultArea = document.getElementById('result-area');
const watchlistContainer = document.getElementById('watchlist');
const addWatchlistBtn = document.getElementById('add-watchlist-btn');

// ==========================================================================
// RENDER DROPDOWN
// ==========================================================================

function render() {
    cryptoSelect.innerHTML = '';

    const sortedKeys = Object.keys(state.rates).sort();

    sortedKeys.forEach(key => {
        const item = state.rates[key];

        const option = document.createElement('option');

        option.value = key;

        option.textContent =
            `${item.name} (${key.toUpperCase()})`;

        cryptoSelect.appendChild(option);
    });
}

// ==========================================================================
// RENDER WATCHLIST
// ==========================================================================

function renderWatchlist() {
    watchlistContainer.innerHTML = '';

    if (state.watchlist.length === 0) {
        watchlistContainer.innerHTML = `
            <p class="text-xs text-slate-500 italic text-center py-4
                      bg-slate-900/40 rounded-xl border
                      border-dashed border-slate-700/60">
                No items actively pinned.
                Select an option above to build a list.
            </p>
        `;

        return;
    }

    state.watchlist.forEach(key => {
        const dataNode = state.rates[key];

        if (!dataNode) return;

        const row = document.createElement('div');

        row.className =
            "flex items-center justify-between bg-slate-900/60 " +
            "border border-slate-700/50 rounded-xl px-4 py-2.5 shadow-sm";

        row.innerHTML = `
            <div class="flex flex-col">
                <span class="text-xs font-semibold text-slate-400">
                    ${dataNode.name}
                </span>

                <span class="text-sm font-bold text-white">
                    1 BTC =
                    <span class="text-indigo-400">
                        ${formatNumber(dataNode.value)}
                    </span>
                    ${dataNode.unit}
                </span>
            </div>

            <button
                class="btn-delete text-xs font-medium text-rose-400
                       hover:text-rose-300 bg-rose-500/10
                       hover:bg-rose-500/20 border border-rose-500/20
                       rounded-md px-2.5 py-1 transition-all cursor-pointer"
                data-currency="${key}">
                Remove
            </button>
        `;

        watchlistContainer.appendChild(row);
    });
}

// ==========================================================================
// NUMBER FORMATTER
// ==========================================================================

function formatNumber(value) {
    return Number(value).toLocaleString(undefined, {
        maximumFractionDigits: 6
    });
}

// ==========================================================================
// STATUS MESSAGE
// ==========================================================================

function updateStatusBanner(message, type) {
    statusArea.textContent = message;

    statusArea.style.display = 'block';

    if (type === 'loading') {
        statusArea.className =
            "bg-blue-500/10 text-blue-400 border " +
            "border-blue-500/20 p-3 rounded-xl text-sm font-medium";
    } else if (type === 'success') {
        statusArea.className =
            "bg-emerald-500/10 text-emerald-400 border " +
            "border-emerald-500/20 p-3 rounded-xl text-sm font-medium";
    } else {
        statusArea.className =
            "bg-rose-500/10 text-rose-400 border " +
            "border-rose-500/20 p-3 rounded-xl text-sm font-medium";
    }
}

function clearStatusBanner() {
    statusArea.style.display = 'none';
}

// ==========================================================================
// LOAD LIVE RATES
// ==========================================================================

async function loadRates() {
    updateStatusBanner(
        'Connecting to CoinGecko for live BTC rates...',
        'loading'
    );

    try {
        const response = await fetch(API_ENDPOINT);

        if (!response.ok) {
            throw new Error(
                `API returned HTTP ${response.status}`
            );
        }

        const data = await response.json();

        console.log('CoinGecko API response:', data);

        /*
         * CoinGecko returns data approximately like:
         *
         * {
         *   bitcoin: {
         *     usd: 92450,
         *     eur: 85120,
         *     gbp: 73200,
         *     eth: 34.25,
         *     ltc: 985.10
         *   }
         * }
         */

        if (!data.bitcoin) {
            throw new Error(
                'Bitcoin price data was not found in API response.'
            );
        }

        const btc = data.bitcoin;

        state.rates = {};

        // USD
        if (btc.usd !== undefined) {
            state.rates.usd = {
                name: 'US Dollar',
                unit: 'USD',
                value: btc.usd,
                type: 'fiat'
            };
        }

        // EUR
        if (btc.eur !== undefined) {
            state.rates.eur = {
                name: 'Euro',
                unit: 'EUR',
                value: btc.eur,
                type: 'fiat'
            };
        }

        // GBP
        if (btc.gbp !== undefined) {
            state.rates.gbp = {
                name: 'British Pound',
                unit: 'GBP',
                value: btc.gbp,
                type: 'fiat'
            };
        }

        // ETH
        if (btc.eth !== undefined) {
            state.rates.eth = {
                name: 'Ethereum',
                unit: 'ETH',
                value: btc.eth,
                type: 'crypto'
            };
        }

        // LTC
        if (btc.ltc !== undefined) {
            state.rates.ltc = {
                name: 'Litecoin',
                unit: 'LTC',
                value: btc.ltc,
                type: 'crypto'
            };
        }

        if (Object.keys(state.rates).length === 0) {
            throw new Error('No usable exchange rates returned.');
        }

        render();
        renderWatchlist();

        updateStatusBanner(
            '✓ Live rates successfully synchronized.',
            'success'
        );

        setTimeout(clearStatusBanner, 3000);

    } catch (error) {

        console.error('API request failed:', error);

        updateStatusBanner(
            '⚠️ Unable to load live API rates. Using backup values.',
            'error'
        );

        // ==================================================================
        // FALLBACK DATA
        // ==================================================================

        state.rates = {
            usd: {
                name: 'US Dollar',
                unit: 'USD',
                value: 92450,
                type: 'fiat'
            },

            eur: {
                name: 'Euro',
                unit: 'EUR',
                value: 85120.50,
                type: 'fiat'
            },

            gbp: {
                name: 'British Pound',
                unit: 'GBP',
                value: 73200,
                type: 'fiat'
            },

            eth: {
                name: 'Ethereum',
                unit: 'ETH',
                value: 34.25,
                type: 'crypto'
            },

            ltc: {
                name: 'Litecoin',
                unit: 'LTC',
                value: 985.10,
                type: 'crypto'
            }
        };

        render();
        renderWatchlist();
    }
}

// ==========================================================================
// CONVERSION
// ==========================================================================

convertForm.addEventListener('submit', event => {
    event.preventDefault();

    resultArea.className =
        "text-center font-bold text-lg tracking-wide " +
        "min-h-[1.75rem] transition-all";

    const inputString = amountInput.value.trim();

    const targetedTokenKey = cryptoSelect.value;

    const parsedNumber = Number(inputString);

    // Validate amount
    if (
        inputString === '' ||
        Number.isNaN(parsedNumber) ||
        parsedNumber <= 0
    ) {
        resultArea.textContent =
            '❌ Specify a token amount greater than zero.';

        resultArea.classList.add('text-rose-400');

        return;
    }

    const exchangeObject =
        state.rates[targetedTokenKey];

    if (!exchangeObject) {
        resultArea.textContent =
            '❌ Rate lookup error encountered.';

        resultArea.classList.add('text-rose-400');

        return;
    }

    const mathematicalOutcome =
        parsedNumber * exchangeObject.value;

    const formattedResult =
        mathematicalOutcome.toLocaleString(undefined, {
            maximumFractionDigits:
                exchangeObject.type === 'crypto'
                    ? 5
                    : 2
        });

    resultArea.textContent =
        `${parsedNumber} BTC = ${formattedResult} ${exchangeObject.unit}`;

    resultArea.classList.add('text-emerald-400');
});

// ==========================================================================
// ADD TO WATCHLIST
// ==========================================================================

addWatchlistBtn.addEventListener('click', () => {

    const designatedSelection = cryptoSelect.value;

    if (!designatedSelection) {
        return;
    }

    if (state.watchlist.includes(designatedSelection)) {

        alert(
            `"${state.rates[designatedSelection].name}" ` +
            `is already on your watchlist.`
        );

        return;
    }

    state.watchlist.push(designatedSelection);

    renderWatchlist();

    save();
});

// ==========================================================================
// REMOVE FROM WATCHLIST
// ==========================================================================

watchlistContainer.addEventListener('click', event => {

    if (!event.target.classList.contains('btn-delete')) {
        return;
    }

    const primaryTargetKey =
        event.target.getAttribute('data-currency');

    state.watchlist =
        state.watchlist.filter(
            item => item !== primaryTargetKey
        );

    renderWatchlist();

    save();
});

// ==========================================================================
// LOCAL STORAGE - SAVE
// ==========================================================================

function save() {
    try {

        localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify(state.watchlist)
        );

    } catch (error) {

        console.error(
            'Unable to save watchlist:',
            error
        );
    }
}

// ==========================================================================
// LOCAL STORAGE - LOAD
// ==========================================================================

function load() {

    try {

        const storedLocalString =
            localStorage.getItem(LOCAL_STORAGE_KEY);

        if (!storedLocalString) {
            return [];
        }

        const parsedArray =
            JSON.parse(storedLocalString);

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

// ==========================================================================
// INITIALIZE APPLICATION
// ==========================================================================

function init() {

    state.watchlist = load();

    loadRates();
}

init();