import "./style.css"
import Swal from 'sweetalert2'

const botao = document.getElementById('btn');
const input = document.getElementById('input');
const grid = document.getElementById('grid')

botao.addEventListener('click', (event) => {
  event.preventDefault();
  grid.innerHTML = '';
  const textoInput = input.value;
  const inputUperCase = textoInput.toUpperCase();
  const listMoedas = `https://api.exchangerate.host/latest?base=${inputUperCase}` //objeto

  fetch(listMoedas)
    .then(res => res.json())
    .then((data) => {
      if ((Object.keys(data.rates)).includes(inputUperCase) === true) {
        return Object.entries(data.rates).map((moeda) => {
          let cell = document.createElement('div');
          cell.setAttribute('class', 'col border shadow-sm p-3 mb-5 bg-body rounded')
          cell.setAttribute('style', 'padding: 55px')
          cell.innerHTML = `${moeda[0]} ---- ${moeda[1]}`
          console.log(moeda);
          grid.appendChild(cell)
        })
      }
      Swal.fire({
        title: 'Oooops, Nyan-cat não achou uma moeda com esse nome!',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff',
        backdrop: `
          rgba(0,0,123,0.4)
          url("image/neon-cat-rainbow.gif")
          left top 
          no-repeat
        `
      })
    })
})