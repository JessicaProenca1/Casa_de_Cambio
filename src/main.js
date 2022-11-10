import "./style.css"
import Swal from 'sweetalert2'

const botao = document.getElementById('btn');
const input = document.getElementById('input');
const grid = document.getElementById('grid')

botao.addEventListener('click', (event) => {
  event.preventDefault();
  grid.innerHTML = '';
  const textoInput = input.value;
  const listMoedas = `https://api.exchangerate.host/latest?base=${textoInput}` //objeto

  fetch(listMoedas)
    .then(res => res.json())
    .then((data) => {
      Object.entries(data.rates).map((moeda) => {
        let cell = document.createElement('div');
        cell.innerHTML = `${moeda}`
        grid.appendChild(cell)
      })
    })
    .catch((error) =>
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
        footer: '<a href="">Why do I have this issue?</a>'
      })
    )
})