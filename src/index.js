import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../dist/public/css/main.css';
import Swal from 'sweetalert2';

document.addEventListener('DOMContentLoaded', () => {
  const inputTexto = document.getElementById('inputTexto');
  const inputRegex = document.getElementById('inputRegex');
  const resultado = document.getElementById('resultado');
  const btnProbar = document.getElementById('btnProbar');
  const btnAlmacenar = document.getElementById('btnAlmacenar');
  const btnLimpiar = document.getElementById('btnLimpiar');
  const historial = document.getElementById('historial');

  let ultimoTexto = '';
  let ultimoPatron = '';
  let ultimaRespuesta = '';

  btnProbar.addEventListener('click', () => {
    const texto = inputTexto.value.trim();
    const regexStr = inputRegex.value.trim();

    if (texto === '' || regexStr === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Debes ingresar texto y una expresión regular.',
      });
      return;
    }

    try {
      const patron = new RegExp(regexStr);

      if (patron.test(texto)) {
        resultado.textContent = "Coincide";
        resultado.classList.remove("alert-danger");
        resultado.classList.add("alert-success");

        ultimaRespuesta = "Coincide";
      } else {
        resultado.textContent = "No coincide";
        resultado.classList.remove("alert-success");
        resultado.classList.add("alert-danger");

        ultimaRespuesta = "No coincide";
      }

      ultimoTexto = texto;
      ultimoPatron = regexStr;

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Expresión inválida',
        text: 'La expresión regular contiene un error.',
      });

      resultado.textContent = '---';
      ultimaRespuesta = '';
    }
  });

  btnAlmacenar.addEventListener('click', () => {
    if (!ultimoTexto || !ultimoPatron || !ultimaRespuesta) {
      Swal.fire({
        icon: 'info',
        title: 'Nada que guardar',
        text: 'Primero prueba una expresión regular.',
      });
      return;
    }

    const li = document.createElement('li');
    li.className = "list-group-item";
    li.innerHTML = `
      <strong>Texto:</strong> ${ultimoTexto}<br>
      <strong>Expresión:</strong> /${ultimoPatron}/ <br>
      <strong>Resultado:</strong> ${ultimaRespuesta}
    `;

    historial.prepend(li);

    Swal.fire({
      icon: 'success',
      title: 'Guardado',
      text: 'Se agregó al historial.',
      timer: 1000,
      showConfirmButton: false
    });
  });

  btnLimpiar.addEventListener('click', () => {
    inputTexto.value = '';
    inputRegex.value = '';
    resultado.textContent = '---';
    historial.innerHTML = '';
    ultimoTexto = '';
    ultimoPatron = '';
    ultimaRespuesta = '';

    Swal.fire({
      icon: 'info',
      title: 'Limpieza completa',
      text: 'Todo se limpió correctamente.',
      timer: 1000,
      showConfirmButton: false
    });
  });
});
