
// Acá muestro los datos en pantalla desde localStorage
function mostrarDatosLocalStorage() {
  const tipoVehiculo = localStorage.getItem('Tipo de vehiculo');
  const valorVehiculo = localStorage.getItem('Valor del vehiculo');
  const valorSeguro = localStorage.getItem('valor del Seguro mensual');

  if (tipoVehiculo && valorVehiculo && valorSeguro) {
    const datosDiv = document.getElementById('datosLocalStorage');
    datosDiv.innerHTML = 'Tipo de vehiculo: ' + tipoVehiculo + '<br>' +
      'Valor del vehiculo: $' + valorVehiculo + '<br>' +
      'Valor del Seguro mensual: $' + valorSeguro;
  };

  const btnLimpiar = document.getElementById('limpiar');

  btnLimpiar.addEventListener('click', () => {
    localStorage.removeItem('Tipo de vehiculo');
    localStorage.removeItem('Valor del vehiculo');
    localStorage.removeItem('valor del Seguro mensual');

    const datosDiv = document.getElementById('datosLocalStorage');
    datosDiv.innerHTML = '';

    
  })
};

//desde acá cargo los datos desde localStorage al cargar la página
window.addEventListener('DOMContentLoaded', mostrarDatosLocalStorage);
