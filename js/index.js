const animacionImg = 'images/animacion-btn.gif';
fetch('js/vehiculo.json')
  .then(response => response.json())
  .then(data => {
    
    const vehiculo = data;
    cargarCodigo('vehiculoElegir', vehiculo);
    const valorFijo = 0.2;
    let tipoVehiculo = {};
    let valorVehiculo = 0;
    let alarma = true;
    let factorAlarma = 0.1;
    const inputAlarma = document.getElementById('alarmaSi');
    const inputPrecio = document.getElementById("precioVehiculo");
    const btnCotizar = document.getElementById("btn-cotizar");
    const valorFinal = document.getElementById('valorFinal');
    const btnGuardar = document.querySelector('span.guardar');
    inputAlarma.checked = true;

    function iniciarCotizacion() {
      const selectElement = document.getElementById('vehiculoElegir');
      const codigoSeleccionado = parseInt(selectElement.value);
      tipoVehiculo = vehiculo.find(vehiculo => vehiculo.codigo === codigoSeleccionado);
      btnCotizar.innerHTML = `<span id="valorFinal"><img src="${animacionImg}" alt="Animación"></span>`;
      if (tipoVehiculo === undefined) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error en el código ingresado'
        });
        return;
      };
      valorVehiculo = parseFloat(inputPrecio.value);
      if (valorVehiculo <= 999999 || valorVehiculo >= 10000001) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debes ingresar un valor entre 1.000.000 y 10.000.000 de pesos.'
        });
        btnCotizar.innerHTML = "Cotizar";
        return;
      };
      alarma = inputAlarma.checked;
      factorAlarma = alarma ? 1 : 0.5;
      const cotizarVehiculo = new Cotizador(tipoVehiculo, valorFijo, factorAlarma, valorVehiculo);
      const valorSeguro = cotizarVehiculo.obtenerCotizacion();
      setTimeout(() => {
        if (isNaN(valorSeguro)) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debés ingresar un valor'
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Cotización realizada',
            text: `El valor de la cotización es: ${valorSeguro.toFixed(2)}`,
            confirmButtonText: 'Aceptar'
          });
        };
        btnCotizar.innerHTML = "Cotizar";
        valorFinal.textContent = isNaN(valorSeguro) ? "No hay valor" : valorSeguro.toFixed(2);

      }, 4000);

      //Se muestra los datos en localStorage
      btnGuardar.addEventListener('click', () => {
        if (isNaN(valorSeguro)) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se puede guardar el valor porque no tiene valor.'
          });
          return;
        }
        
        localStorage.setItem('Tipo de vehiculo', tipoVehiculo.tipo);
        localStorage.setItem("Valor del vehiculo", valorVehiculo);
        localStorage.setItem("valor del Seguro mensual", valorSeguro);
        //Acá muestro los datos por pantalla
        var datosDiv = document.getElementById('datosLocalStorage');
        datosDiv.innerHTML = 'Tipo de vehiculo: ' + tipoVehiculo.tipo + '<br>' +
          'Valor del vehiculo: $' + valorVehiculo + '<br>' +
          'Valor del Seguro mensual: $' + valorSeguro;
      });
    };
    btnCotizar.addEventListener('click', iniciarCotizacion);
  })
  .catch(error => console.log(error));
