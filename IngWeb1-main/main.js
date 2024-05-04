document.addEventListener('DOMContentLoaded', function() {
    const formGasto = document.getElementById('formGasto');
    const listaGastos = document.getElementById('listaGastos');
    const totalGastos = document.getElementById('totalGastos');
    const btnLimpiar = document.getElementById('btnLimpiar'); 
    
    let total = 0;


    

    const actualizarListaGastos = (descripcion, monto) => {
        const nuevoGasto = document.createElement('li');
        nuevoGasto.textContent = `${descripcion}: ${monto.toFixed(2)} $`;
        listaGastos.appendChild(nuevoGasto);
        total += monto;
        totalGastos.textContent = total.toFixed(2) + ' $';
    };

    const cargarGastosGuardados = () => {
        const gastosGuardados = JSON.parse(localStorage.getItem('gastos')) || [];
        gastosGuardados.forEach(gasto => {
            actualizarListaGastos(gasto.descripcion, gasto.monto);
        });
    };

    const limpiarStorage = () => {
        localStorage.clear();  
        listaGastos.innerHTML = '';  
        total = 0;  
        totalGastos.textContent = '0.00 $';  
    };

    btnLimpiar.addEventListener('click', limpiarStorage);

    cargarGastosGuardados();

    formGasto.addEventListener('submit', function(event) {
        event.preventDefault();
        const descripcion = document.getElementById('descripcion').value;
        const monto = parseFloat(document.getElementById('monto').value);

        if (descripcion && monto) {
            actualizarListaGastos(descripcion, monto);

            const gastosGuardados = JSON.parse(localStorage.getItem('gastos')) || [];
            gastosGuardados.push({ descripcion, monto });
            localStorage.setItem('gastos', JSON.stringify(gastosGuardados));

            formGasto.reset();
        } else {
            alert('Por favor, rellene todos los campos.');
        }
    });
    mostrarPrecios(); 
});



