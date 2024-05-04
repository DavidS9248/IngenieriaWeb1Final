document.addEventListener('DOMContentLoaded', function() {
    const precioAAPL = document.getElementById('precioAAPL');
    const precioDolar = document.getElementById('precioDolar');
    const API_KEY = 'KBCJD4XEM311W8WV';

    async function getPrecioAccion(symbol) {
        try {
            const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
            const data = await response.json();
            const precio = data['Global Quote']['05. price'];
            return precio;
        } catch (error) {
            console.error('Error al obtener el precio de la acción:', error);
            return 'No disponible'; 
        }
    }

    async function getPrecioDolar() {
        try {
            const response = await fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=COP&apikey=${API_KEY}`);
            const data = await response.json();
            const precio = data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
            return precio;
        } catch (error) {
            console.error('Error al obtener el precio del dólar:', error);
            return 'No disponible'; 
        }
    }

    async function mostrarIntercambio() {
        const precioAAPLValue = await getPrecioAccion('AAPL');
        const precioDolarValue = await getPrecioDolar();

        precioAAPL.textContent = precioAAPLValue ? `${precioAAPLValue} $` : 'Error al obtener el precio';
        precioDolar.textContent = precioDolarValue ? `${precioDolarValue} COP` : 'Error al obtener el precio';
    }

    mostrarIntercambio();
});