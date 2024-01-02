function getCurrencyRates() {
    return fetch('data/currency_rates.json')
        .then(response => response.json());
}

function convertCurrency(amount, fromCurrency, toCurrency, rates) {
    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];

    if (fromRate && toRate) {
        const convertedAmount = (amount / fromRate) * toRate;
        return convertedAmount.toFixed(2);
    } else {
        return 'Невозможно конвертировать. Пожалуйста, проверьте введенные данные.';
    }
}

function updateCurrencyOptions() {
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');

    getCurrencyRates()
        .then(rates => {
            for (const currency in rates) {
                const option = document.createElement('option');
                option.value = currency;
                option.textContent = currency;
                fromCurrencySelect.appendChild(option.cloneNode(true));
                toCurrencySelect.appendChild(option);
            }
        })
        .catch(error => {
            console.error('Ошибка при получении курсов валют:', error);
        });
}

function updateResult() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    getCurrencyRates()
        .then(rates => {
            const result = convertCurrency(amount, fromCurrency, toCurrency, rates);
            document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
        })
        .catch(error => {
            console.error('Ошибка при получении курсов валют:', error);
        });
}

document.getElementById('converterForm').addEventListener('submit', function (event) {
    event.preventDefault();
    updateResult();
});

window.onload = updateCurrencyOptions;
