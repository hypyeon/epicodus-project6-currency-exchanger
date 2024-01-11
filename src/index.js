import './css/styles.scss';
import { getExchangeRate } from './api';

function getCurrency(currency) {
    document.getElementById(currency).addEventListener("click", async function (e) {
        e.preventDefault();
        const amount = document.getElementById("amount").value;
        if (!isAmountValid(amount)) {
            printError("Only valid numbers with up to 2 decimals are accepted.");
            return;
        }
        
        try {
            const result = await getExchangeRate(amount, currency);
            printResult(result);
            printCurrency(currency);
        } catch (error) {
            printError(error);
        }
    });
}

function isAmountValid(amount) {
    if (isNaN(amount) || amount === "") {
        return false;
    }
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
    document.getElementById("currency").innerText = `Error: ${error}`;
}

function clearInput() {
    document.getElementById("clear-btn").addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("amount").value = '';
        document.getElementById("currencyAmount").innerText = '';
        document.getElementById("currency").innerText = '';
    });
}

window.addEventListener("load", function() {
    getCurrency("KRW");
    getCurrency("HKD");
    getCurrency("SGD");
    getCurrency("PHP");
    getCurrency("CNY");
    clearInput();
});