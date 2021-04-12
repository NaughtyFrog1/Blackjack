const juego = (() => {
  `use strict`;
  
  let deck = [],  // Mazo de cartas
      puntosJugadores = [];

  // Referencias del HTML
  const btnNuevo   = document.querySelector('#btnNuevo'),
        btnPedir   = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener');

  const puntosHtml = document.querySelectorAll('small'),
        cartas     = document.querySelectorAll('.cartas');



  //* DEFINICIÓN DE FUNCIONES
  
  // Crea y mezcla una nuevo mazo de cartas
  const crearDeck = () => {
    const tmp = [];

    for (const tipo of ['C', 'D', 'H', 'S']) {
      for(let i = 2; i <= 10; i++) tmp.push(i + tipo);
      for (const especial of ['A', 'J', 'Q', 'K']) tmp.push(especial + tipo);
    }

    return _.shuffle(tmp);
  }

  const pedirCarta = (deck) => {
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

  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] += valorCarta(carta);
    puntosHtml[turno].innerText = puntosJugadores[turno];

    return puntosJugadores[turno];
  }

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement('img');
    imgCarta.classList.add('carta');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.alt = `Carta ${carta}`;

    cartas[turno].append(imgCarta);
  }

  const determinarGanador = () => {
    const [puntosMinimos, puntosPC] = puntosJugadores;

    setTimeout(() => {
      if ((puntosMinimos > 21)) {
        alert('Gana la computadora');
      } else if (puntosPC > 21) {
        alert('Gana el jugador');
      } else if (puntosPC === puntosMinimos) {
        alert('Empate');
      } else {
        alert('Gana la computadora');
      }
    }, 150);
  }

  const turnoComputadora = (puntosMinimos) => {
    const turno = puntosJugadores.length - 1;
    let puntosPC = 0;

    if (puntosMinimos > 21) puntosMinimos = -1;

    do {
      const carta = pedirCarta(deck);
      puntosPC = acumularPuntos(carta, turno);
      crearCarta(carta, turno);
    } while (puntosPC < puntosMinimos);

    determinarGanador();
  }

  const finTurnoJugador = (puntos) => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntos);
  }
  
  const inicializarJuego = (numJugadores = 1) => {
    numJugadores++;  // La computadora

    deck = crearDeck();
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);   
      puntosHtml[i].innerText = '0';
      cartas[i].innerHTML = '';   
    }

    btnPedir.disabled = false;
    btnDetener.disabled = false;
  }



  //* EVENTOS

  btnPedir.addEventListener('click', () => {
    const carta = pedirCarta(deck),
          puntosJugador = acumularPuntos(carta, 0);

    crearCarta(carta, 0);
    if (puntosJugador >= 21) finTurnoJugador(puntosJugador);
  });

  btnDetener.addEventListener('click', () => {
    finTurnoJugador(puntosJugadores[0]);
  });

  btnNuevo.addEventListener('click', () => {
    inicializarJuego();
  });


  return {inicializar: inicializarJuego};
})();
