// Create facedown cards for opponent players
const faceDownCard = new Image();
faceDownCard.src = 'images/cards/FacedownSingle.svg';

// Timer
const timer = (ms: any) => new Promise((res) => setTimeout(res, ms));

// Display opponent facedown cards one player at a time with a 200ms delay between (dealing)
async function dealCards(seatNumber: any, holeCards: any, dealtInPlayers: any) {
  for (let i = 0; i < dealtInPlayers.length; i++) {
    if (dealtInPlayers[i].seat === seatNumber) {
      const cardValue = holeCards.card_one;
      // Cards
      // Create card 1
      const card = new Image();
      card.src = `images/cards/${cardValue}.svg`;

      // Show player cards
      const cardOne = document.querySelector(`#${seatNumber} .hole-cards .card-1`);
      if (cardOne) {
        cardOne.append(card);
      }
    } else {
      const cardOne = document.querySelector(`#${dealtInPlayers[i].seat} .hole-cards .card-1`);
      if (cardOne) {
        cardOne.append(faceDownCard.cloneNode(true));
      }
    }
    await timer(200);
  }

  for (let i = 0; i < dealtInPlayers.length; i++) {
    if (dealtInPlayers[i].seat === seatNumber) {
      const cardValue = holeCards.card_two;

      // Create card 2
      const card = new Image();
      card.src = `images/cards/${cardValue}.svg`;

      // Show player cards
      const cardTwo = document.querySelector(`#${seatNumber} .hole-cards .card-2`);
      if (cardTwo) {
        cardTwo.append(card);
      }
    } else {
      const cardTwo = document.querySelector(`#${dealtInPlayers[i].seat} .hole-cards .card-2`);
      if (cardTwo) {
        cardTwo.append(faceDownCard.cloneNode(true));
      }
    }
    await timer(200);
  }
}

function foldCards(seat: any) {
  const holeCards = document.querySelector(`#${seat} .hole-cards`);
  if (holeCards) {
    holeCards.remove();
  }
}

export { dealCards, foldCards };
