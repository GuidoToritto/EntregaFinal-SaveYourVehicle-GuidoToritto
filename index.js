const vehiculo = [
  { codigo: 1, tipo: 'Camioneta', factor: 0.2 },
  { codigo: 2, tipo: 'Camión', factor: 0.3 },
  { codigo: 3, tipo: 'Auto', factor: 0.1 },
  { codigo: 4, tipo: 'Moto', factor: 0.05 }
];

function cargarCodigo(select, array) {
  const selectElement = document.getElementById(select);

  if (array.length > 0) {
    array.forEach(element => {
      selectElement.innerHTML += `<option value="${element.codigo}">${element.tipo}</option>`;
    });
  }
}

cargarCodigo('vehiculoElegir', vehiculo);

class Cotizador {
  constructor(tipoVehiculo, valorFijo, factorAlarma, valorVehiculo) {
    this.tipoVehiculo = tipoVehiculo;
    this.valorFijo = valorFijo;
    this.factorAlarma = factorAlarma;
    this.valorVehiculo = valorVehiculo;
  }
  obtenerCotizacion() {
    const cotizacion = this.valorVehiculo * this.tipoVehiculo.factor * this.valorFijo * this.factorAlarma;
    return cotizacion;
  }
}

const valorFijo = 0.2;
let tipoVehiculo = {};
let valorVehiculo = 0;
let alarma = true;
let factorAlarma = 0.1;

const inputAlarma = document.getElementById('alarmaSi')
const inputPrecio = document.getElementById("precioVehiculo")
const btnCotizar = document.getElementById("btn-cotizar")
const valorFinal = document.getElementById('valorFinal')
const btnGuardar = document.querySelector('span.guardar')

function iniciarCotizacion() {
  const selectElement = document.getElementById('vehiculoElegir');
  const codigoSeleccionado = parseInt(selectElement.value);
  tipoVehiculo = vehiculo.find(vehiculo => vehiculo.codigo === codigoSeleccionado);

  if (tipoVehiculo === undefined) {
    alert("Error en el código ingresado");
    return;
  }

  valorVehiculo = parseFloat(inputPrecio.value);

  if (valorVehiculo <= 1000000 || valorVehiculo >= 10000000) {
    alert("Debes ingresar un valor entre 1.000.000 y 10.000.000 de pesos.");
    return;
  }

  alarma = inputAlarma.checked;
  factorAlarma = alarma ? 1 : 0.5;

  const cotizarVehiculo = new Cotizador(tipoVehiculo, valorFijo, factorAlarma, valorVehiculo);
  const valorSeguro = cotizarVehiculo.obtenerCotizacion();


  valorFinal.textContent = valorSeguro.toFixed(2);

  btnGuardar.addEventListener('click', () => {
    localStorage.setItem('Tipo de vehiculo', JSON.stringify(tipoVehiculo));
    localStorage.setItem("Valor del vehiculo", valorVehiculo);
    localStorage.setItem("valor del Seguro mensual", valorSeguro);

    console.table(tipoVehiculo);
    console.log("Valor del vehiculo: ", valorVehiculo);
    console.log("Valor del seguro mensual: ", valorSeguro);
  })

}

btnCotizar.addEventListener('click', iniciarCotizacion);
