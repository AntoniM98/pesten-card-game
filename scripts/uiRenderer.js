import { player, topCard, startGame, resetValues } from "./gameplay.js";

export const playerHandEl = document.getElementById('player-hand');
export const opponentHandEl = document.getElementById('opponent-hand');
export const discardPileEl = document.getElementById('discard-pile');
export const deckEl = document.getElementById('deck');
export const passBtn = document.getElementById('pass-button');
passBtn.disabled = true;

export const turnIndicator = document.getElementById('turn');
const scoreEl = document.getElementById('player-score');
const oppScoreEl = document.getElementById('opponent-score');
let playerScore = 0, opponentScore = 0;
const rulesModal = document.querySelector('.rules-modal');
const rulesBtn = document.getElementById('rules-button');
const closeRulesBtn = document.querySelector('.close-rules-button');

export const endGameModal = document.querySelector('.end-game-modal');
export const replayBtn = document.getElementById('replay-button');
const endMessage = document.getElementById('end-message');

export function updateDeck(isEmpty) {
  deckEl.innerHTML = isEmpty ? '<i class="fa fa-refresh" aria-hidden="true"></i>' : '<img class="card" src="images/BACK.png">';
}

export function updateHand(hand, set = true) {
  const element = hand === player ? playerHandEl : opponentHandEl;

  if(set) {
    element.innerHTML = '';
    hand.forEach((card) => {
      const cardHTML = document.createElement('img');
      cardHTML.classList.add('card');
      cardHTML.id = card.id;
      cardHTML.src = hand === player ? card.img : '../images/BACK.png';
      element.appendChild(cardHTML); 
    });
    return;
  }

  const img = '';
  const cardHTML = `
    <img class="card" id="${hand[hand.length - 1].id}" src="${img}"></img>
  `;
  element.innerHTML += cardHTML;    
}

export function updateDiscardPile() {
  const cardHTML = discardPileEl.querySelector('.card') || document.createElement('img');
    cardHTML.classList.add('card');
    cardHTML.src = topCard.img;
  
  if(!discardPileEl.contains(cardHTML))
    discardPileEl.appendChild(cardHTML);
}

export function updateTurnHTML(playerTurn) {    
  passBtn.disabled = true;

  if(playerTurn) {
    turnIndicator.textContent = "Your Turn";
    for(let child of playerHandEl.children) 
      child.classList.remove('inactive');
    deckEl.classList.remove('non-interactable');
    deckEl.children[0].classList.remove('inactive');
    return;
  }
  turnIndicator.textContent = "Opponent's Turn";
  for(let child of playerHandEl.children) 
    child.classList.add('inactive');
  deckEl.classList.add('non-interactable');
  deckEl.children[0].classList.add('inactive');
}

export function disableInput() {
  passBtn.disabled = true;

  for(let child of playerHandEl.children) 
    child.classList.add('inactive');
  deckEl.classList.add('non-interactable');
  deckEl.children[0].classList.add('inactive');
}

export function togglePassBtn(disabled) {
  if(disabled) {
    passBtn.disabled = true;
    deckEl.classList.remove('non-interactable');
    deckEl.children[0].classList.remove('inactive');
    return;
  }
  passBtn.disabled = false;
  deckEl.classList.add('non-interactable');
  deckEl.children[0].classList.add('inactive');
}

rulesBtn.addEventListener('click', () => {
  rulesModal.showModal();
  rulesModal.style.display = 'block';
});
closeRulesBtn.addEventListener('click', () => {
  rulesModal.close();
  rulesModal.style.display = 'none';
});

export function endGame(winner) {
  endGameModal.showModal();
  endGameModal.style.display = 'flex';
  
  if(winner === player) {
    endMessage.textContent = 'You Win!';
    playerScore++;
    scoreEl.textContent = playerScore;
    return;
  }

  endMessage.textContent = 'You Lose!';
  opponentScore++;
  oppScoreEl.textContent = opponentScore;
}

replayBtn.addEventListener('click', () => {
  resetValues();
  discardPileEl.removeChild(discardPileEl.querySelector('.card'));
  playerHandEl.innerHTML = '';
  opponentHandEl.innerHTML = '';
  
  endGameModal.close();
  endGameModal.style.display = 'none';
  startGame();
});