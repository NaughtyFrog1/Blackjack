/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

// Mazo de cartas
let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];


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
  console.log(deck);
  return deck;
}

const pedirCarta = () => {
  if (deck.length === 0) {
    throw 'Error: No hay cartas en el deck';
  }

  return deck.pop();
}

crearDeck();
