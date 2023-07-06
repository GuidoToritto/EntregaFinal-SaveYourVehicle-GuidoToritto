function cargarCodigo(select, array) {
  const selectElement = document.getElementById(select);
  if (array.length > 1) {
    array.slice(1).forEach(element => {
      selectElement.innerHTML += `<option value="${element.codigo}">${element.tipo}</option>`;
    });
  };
};