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
    };
  };
