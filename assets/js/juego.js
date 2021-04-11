/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

let deck = [];  // Mazo de cartas
const tipos = ['C', 'D', 'H', 'S'];  // Tipos de cartas
const especiales = ['A', 'J', 'Q', 'K'];  // Valores 'especiales'
let puntosJugador = 0;
let puntosPC = 0;

// Referencias del HTML
const btnNuevo = document.querySelector('#btnNuevo');
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const puntosHtml = document.querySelectorAll('small');
const cartasJugador = document.querySelector('#jugador-cartas');
const cartasPC = document.querySelector('#computadora-cartas');



// Crea y mezcla una nuevo mazo de cartas
const crearDeck = () => {
  for (const tipo of tipos) {
    for(let i = 2; i <= 10; i++) {
      deck.push(i + tipo);
    }

    for (const especial of especiales) {
      deck.push(especial + tipo);
    }
  }

  deck = _.shuffle(deck);
  return deck;
}

const pedirCarta = () => {
  if (deck.length === 0) {
    throw 'Error: No hay cartas en el deck';
  }

  return deck.pop();
}

const valorCarta = (carta) => {
  // Quitamos la parte del tipo y dejamos solo el valor de la carta
  const valor = carta.substring(0, carta.length - 1);

  return (isNaN(valor)) 
    ? (valor === 'A') ? 11 : 10 
    : parseInt(valor);
}

const turnoComputadora = (puntosMinimos) => {
  if (puntosMinimos > 21) puntosMinimos = 0;

  do {
    const carta = pedirCarta();

    puntosPC += valorCarta(carta);
    puntosHtml[1].innerText = puntosPC;

    const imgCarta = document.createElement('img');
    imgCarta.classList.add('carta');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.alt = `Carta ${carta}`;
    cartasPC.appendChild(imgCarta);
    console.log(puntosPC);
  } while (puntosPC < puntosMinimos);
}


//* Eventos

btnPedir.addEventListener('click', (e) => {
  const carta = pedirCarta();

  puntosJugador += valorCarta(carta);
  puntosHtml[0].innerText = puntosJugador;

  const imgCarta = document.createElement('img');
  imgCarta.classList.add('carta');
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.alt = `Carta ${carta}`;
  cartasJugador.appendChild(imgCarta);

  if (puntosJugador > 21) {
    btnPedir.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    btnPedir.disabled = true;
    turnoComputadora(puntosJugador);
    console.warn('Blackjack!');
  }
});

crearDeck();
