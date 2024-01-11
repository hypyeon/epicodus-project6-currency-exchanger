const API_KEY = process.env.API_KEY;
const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

export async function getExchangeRate(amount, selectedCurrency) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            const rate = data.conversion_rates[selectedCurrency];
            if (rate) {
                return (amount * rate).toFixed(2);
            } else {
                throw new Error(`Selected currency (${selectedCurrency}) not found in the current version.`);
            }
        } else {
            throw new Error(`API error: ${data.error}`);
        }
    } catch (error) {
        throw new Error(`Failed to fetch exchange rate: ${error.message}`);
    }
}