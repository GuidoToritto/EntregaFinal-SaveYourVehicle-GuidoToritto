3
const valorFijo = 0.2;
let tipoVehiculo = {};
let valorVehiculo = 0;
let alarma = true;
let factorAlarma = 0.1;

const vehiculo = [
  { codigo: 1, tipo: 'Camioneta', factor: 0.2 },
  { codigo: 2, tipo: 'Camión', factor: 0.3 },
  { codigo: 3, tipo: 'Auto', factor: 0.1 },
  { codigo: 4, tipo: 'Moto', factor: 0.05 }
];

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

function iniciarCotizacion() {
  let codigo = prompt("Ingresa el código númerico del vehiculo a cotizar: Código 1: Camioneta - Código 2: Camión - Código 3: Auto - Código 4: Moto");
  tipoVehiculo = vehiculo.find((vehiculo) => vehiculo.codigo === parseInt(codigo));
  if (tipoVehiculo === undefined) {
    alert("Error en el código ingresado");
    return;
  }
  valorVehiculo = parseInt(prompt("Ingrese valor del auto: (min: 1.000.000 max: 10.000.000)"));
  if (valorVehiculo <= 1000000 || valorVehiculo >= 10000000) {
    alert("Debes ingresar un valor entre 1.000.000 y 10.000.000 de pesos.");
    return;
  }

  alarma = confirm("Pulsa 'Aceptar' si tu vehiculo posee alarma. De lo contrario, pulsa 'Cancelar'");
  if (alarma === false) {
    factorAlarma = 0.5;
  }

  const cotizarVehiculo = new Cotizador(tipoVehiculo, valorFijo, factorAlarma, valorVehiculo);
  let valorSeguro = cotizarVehiculo.obtenerCotizacion();
  alert("El costo mensual del seguro es de $" + valorSeguro.toFixed(2));
}

