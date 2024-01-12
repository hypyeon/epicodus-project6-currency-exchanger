import './css/styles.scss';
import { getExchangeRate } from './api';

function getCurrency(currency) {
    document.getElementById(currency).addEventListener("click", async function (e) {
        e.preventDefault();
        const amount = document.getElementById("amount").value;
        const loading = document.getElementById("loading");
        if (!isAmountValid(amount)) {
            printError("Only valid numbers with up to 2 decimals are accepted.");
            return;
        }
        
        try {
            displayLoading(loading, true);
            const result = await getExchangeRate(amount, currency);
            printResult(result);
            printCurrency(currency);
        } catch (error) {
            printError(error);
        } finally {
            displayLoading(loading, false);
        }
    });
}

// there's a split second while fetching API, wanted to display something on UI during this wait time
function displayLoading(element, value) {
    if (value === true) {
        element.style.display = "block";
        emptyResult();
    } else {
        element.style.display = "none";
    }
}

function isAmountValid(amount) {
    // if not a num, empty input, or a negative num: 
    if (isNaN(amount) || amount === "" || amount < 0) {
        return false;
    }
    // if has more than 2 decimals:
    const amountToStr = amount.toString();
    const hasDecimal = amountToStr.includes(".");
    if (hasDecimal) {
        const decimalCount = amountToStr.split(".")[1].length;
        if (decimalCount > 2) {
            return false;
        }
    }
    return true;
}

function printResult(result) {
    document.getElementById("currencyAmount").innerText = result;
}

function printCurrency(currency) {
    document.getElementById("currency").innerText = currency;
}

function printError(error) {
    document.getElementById("currencyAmount").innerText = '';
    document.getElementById("currency").innerText = `Error: ${error}`;
}

function clearInput() {
    document.getElementById("clear-btn").addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("amount").value = '';
        emptyResult();
    });
}
// to reduce repetitive codes (used for clearInput and displayLoading functions)
function emptyResult() {
    document.getElementById("currencyAmount").innerText = '';
    document.getElementById("currency").innerText = '';
}

window.addEventListener("load", function() {
    getCurrency("KRW");
    getCurrency("HKD");
    getCurrency("SGD");
    getCurrency("PHP");
    getCurrency("CNY");
    clearInput();
});