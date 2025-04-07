import {deck} from "./data/deck.js"
import {
  updateDeck, updateHand, updateDiscardPile, updateTurnHTML, disableInput, togglePassBtn, endGame,
  playerHandEl, deckEl, discardPileEl, passBtn, turnIndicator
} from "./uiRenderer.js";
import {shakeAnimation, setCardAnimation, drawCardAnimation} from "./animations.js";

const pickSuitModal = document.querySelector('.pick-suit-modal');
const pickSuitHeader = document.querySelector('.pick-suit-header');
const suitIndicator = document.querySelector('.suit-indicator');

export let player = [], opponent = [], discardPile = [] , deckCopy = [...deck];
export let topCard = {};
let isPlayerTurn;
let drawSum = 0;
const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
let askedSuit = '';
const interval = 1000;

window.onload = startGame;

export async function startGame() {
  shuffleDeck();
  drawCard(player, 7);
  await drawCard(opponent, 7);
  startingCard();
}

async function startingCard() {
  discardPile.push(deckCopy.pop());
  topCard = discardPile[discardPile.length - 1];
  await drawCardAnimation(discardPileEl);
  updateDiscardPile();
  nextTurn();
}

async function drawCard(drawer, amount = 1, manualDraw = false) {
  if(deckCopy.length === 0) {
    if(discardPile.length <= 1) {
      alert("You're unable to draw a card");
      return
    }
    refillDeck();
    const amount = drawSum > 0 ? drawSum : 1;
    await drawCard(drawer, amount, drawer === player);
    return;
  }

  let newCard = {};
  for (let i = 0; i < amount; i++) {    
    if(deckCopy.length === 0) refillDeck();

    newCard = deckCopy[deckCopy.length - 1];
    drawer.push(deckCopy.pop());
    updateHand(drawer, false);
    if(deckCopy.length === 0) updateDeck(true);

    const destination = document.getElementById(newCard.id);
    await drawCardAnimation(destination);
    destination.src = drawer === player ? newCard.img : './images/BACK.png';
  }

  if(manualDraw) togglePassBtn(false);
}

function isValidCard(card, setter, cardEl) {
  let isMatchingCard = false;
  if(topCard.face === 'Jack')
    isMatchingCard = askedSuit ? card.suit === askedSuit || card.face === 'Joker' || card.face === 'Jack' : true;
  else
    isMatchingCard = card.suit === topCard.suit || card.face === topCard.face || card.face === 'Joker' || topCard.face === 'Joker' || card.face === 'Jack';
  
  if(!isMatchingCard) {
    shakeAnimation(cardEl);
    return;
  }
  disableInput();
  setCardAnimation(cardEl, card.img);
  cardEl.addEventListener('animationend', () => setCard(card, setter));
}

function setCard(card, setter) {
  //Add card to pile and remove from hand array
  const index = setter.indexOf(card);
  setter.splice(index, 1);
  discardPile.push(card);
  topCard = discardPile[discardPile.length - 1];

  //Update hand/pile HTML
  updateHand(setter)
  updateDiscardPile();
  suitIndicator.style.display = 'none';

  //Check for last card
  if(setter.length === 0) {
    if(!card.pest) {
      endGame(setter);
      return;
    }
    drawCard(setter);
  }

  //Check for effect
  cardEffectCheck(card.face);
}

function cardEffectCheck(face) {
  switch (face) {
    case 'Ace':
      nextTurn();
      break;
    case '2':
      drawSum += 2;
      nextTurn();
      break;
    case '8':
      if(!isPlayerTurn) {
        opponentAction();
        return;
      }
      togglePassBtn(true);
      break;
    case 'Jack':
      openPickSuitModal();
      break;
    case 'Joker':
      drawSum += 5;
      nextTurn();
      break;
    default:
      nextTurn();
  }
}

function opponentAction(alreadyDrawn = false) {
  let possiblePlays = [];
  if(topCard.face === 'Jack') 
    possiblePlays = opponent.filter((card) => askedSuit ? card.suit === askedSuit || card.face === 'Joker' || card.face === 'Jack' : true);
  else if(topCard.face === 'Joker')
    possiblePlays = [...opponent];
  else 
    possiblePlays = opponent.filter((card) => card.suit === topCard.suit || card.face === topCard.face || card.face === 'Joker' || card.face === 'Jack');

  if(possiblePlays.length === 0 && !alreadyDrawn) {
    setTimeout(async () => {
      await drawCard(opponent);
      opponentAction(true);
    }, interval);
  } else if(possiblePlays.length > 0) {
    setTimeout(() => {
      const pickedCard = possiblePlays[Math.floor(Math.random() * possiblePlays.length)];
      const cardEl = document.getElementById(pickedCard.id);
      isValidCard(pickedCard, opponent, cardEl);
    }, interval);
  } else {
    setTimeout(nextTurn, interval);
  }
}

function nextTurn() {
  isPlayerTurn = isPlayerTurn === undefined
    ? Math.random() < 0.5 
    : !isPlayerTurn;
  
  drawCheck();
}

function drawCheck() {
  let possiblePlays = {};
  if(isPlayerTurn) {
    if(drawSum === 0) {
      updateTurnHTML(isPlayerTurn);
      return;
    }
    
    turnIndicator.textContent = "Your Turn";
    possiblePlays = player.filter((card) => card.face === 'Joker' || card.face === '2');
    possiblePlays.forEach((card) => {
      const cardHTML = document.getElementById(card.id);
      cardHTML.classList.remove('inactive');
    });
    deckEl.classList.remove('non-interactable');
    deckEl.children[0].classList.remove('inactive');
    return;
  }

  updateTurnHTML(isPlayerTurn);

  if(drawSum === 0) {
    opponentAction();
    return;
  }

  possiblePlays = opponent.filter((card) => card.face === 'Joker' || card.face === '2');

  if(possiblePlays.length > 0) {
    setTimeout(() => {
      const pickedCard = possiblePlays[Math.floor(Math.random() * possiblePlays.length)];
      const cardEl = document.getElementById(pickedCard.id);
      isValidCard(pickedCard, opponent, cardEl);
    }, interval);
    return;
  }

  setTimeout(async () => {
    await drawCard(opponent, drawSum);
    drawSum = 0;
    opponentAction();
  }, interval);
}

function refillDeck() {
  deckCopy = [...discardPile].slice(0, -1);
  discardPile.splice(0, discardPile.length - 1);
  shuffleDeck();
  updateDeck(false);
}
 
function shuffleDeck() {
  for (let i = 0; i < deckCopy.length; i++) {
    let randomIndex = Math.floor(Math.random() * deckCopy.length);
    [deckCopy[i], deckCopy[randomIndex]] = [deckCopy[randomIndex], deckCopy[i]];
  }
}

function openPickSuitModal() {
  pickSuitModal.showModal();
  pickSuitModal.style.display = 'flex';
  pickSuitHeader.textContent = isPlayerTurn ? 'Choose a suit' : 'Opponent is choosing a suit...';

  if(!isPlayerTurn) {
    pickSuitModal.classList.add('non-interactable');
    askSuit();

    setTimeout(() => {
      //Gray out non-chosen suits
      const remainingSuits = suits.filter((suit) => suit !== askedSuit);
      remainingSuits.forEach((suit) => {
        const suitHTML = document.getElementById(suit);
        suitHTML.classList.add('inactive');
      });
      
      //Close modal after some time
      setTimeout(() => {
        const suitHTML = document.querySelectorAll('.suit');
          suitHTML.forEach((suit) => suit.classList.remove('inactive'));
        pickSuitModal.classList.remove('non-interactable');        
        pickSuitModal.close();
        pickSuitModal.style.display = 'none';
        suitIndicator.style.display = 'block';
        suitIndicator.src = `./images/${askedSuit}-icon.png`;
      
        nextTurn();
      }, interval);
    }, interval);
    return;
  }
}

export function resetValues() {
  player = [];
  opponent = [];
  discardPile = [];
  deckCopy = [...deck];
  askedSuit = '';
  drawSum = 0;
}

function askSuit() {
  let suitCount = [...opponent].reduce((acc, card) => {
    acc[card.suit] = (acc[card.suit] || 0) + 1;
    return acc;
  }, {});

  delete suitCount.joker;
  if(Object.keys(suitCount).length) {
    askedSuit = Object.keys(suitCount).reduce((maxSuit, currentSuit) =>
      suitCount[currentSuit] > suitCount[maxSuit] ? currentSuit : maxSuit);
  } else 
    askedSuit = suits[Math.floor(Math.random() * suits.length)];
}

//===Player input===
playerHandEl.addEventListener('click', (event) => {
  if(event.target && event.target.classList.contains('card')) {
    const clickedCard = player.find(card => card.id === event.target.id);
    isValidCard(clickedCard, player, event.target);
  }
});

deckEl.addEventListener('click', async () => {
  if(drawSum > 0) {
    updateTurnHTML(isPlayerTurn);
    await drawCard(player, drawSum);
    drawSum = 0;
    return;
  }
  drawCard(player, 1, true);
});

passBtn.addEventListener('click', () => {
  passBtn.disabled = true;
  nextTurn();
});

pickSuitModal.addEventListener('click', (event) => {
  if(event.target && event.target.classList.contains('suit')) {
    askedSuit = event.target.id;
    pickSuitModal.close();
    pickSuitModal.style.display = 'none';
    suitIndicator.style.display = 'block';
    suitIndicator.src = `./images/${askedSuit}-icon.png`;
    nextTurn();
  }
});