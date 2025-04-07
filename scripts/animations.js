import { playerHandEl, deckEl, discardPileEl} from "./uiRenderer.js";

export function shakeAnimation(target) {
  target.classList.add('shake-animation');
  setTimeout(() => {
    target.classList.remove('shake-animation');
  }, 500); 
}

export function setCardAnimation(target, img) {
  target.classList.remove('inactive');
  target.classList.add('move-card-animation', 'non-interactable');
  target.src = img;
  calculateMovement(target, discardPileEl, 0.5);
}

export function drawCardAnimation(destination) {
  return new Promise((resolve) => {
    if(playerHandEl.contains(destination)) {
      for(let child of playerHandEl.children)
        child.classList.add('non-interactable');
      deckEl.classList.add('non-interactable');
    }

    const deckCopy = document.createElement('img');
    deckCopy.style.position = 'absolute';
    deckCopy.classList.add('card', 'move-card-animation', 'non-interactable');
    deckCopy.src = '../images/BACK.png';
    deckEl.appendChild(deckCopy); 
    calculateMovement(deckCopy, destination, 0.3);

    deckCopy.addEventListener('animationend', () => {
      deckCopy.remove();
      if(playerHandEl.contains(destination)) {
        for(let child of playerHandEl.children)
          child.classList.remove('non-interactable');
        deckEl.classList.remove('non-interactable');
      }
      resolve();
    });
  });
}

function calculateMovement(target, destination, duration) {
  const targetRect = target.getBoundingClientRect();
  const destinationRect = destination.getBoundingClientRect();
  const moveX = destinationRect.left - targetRect.left;
  const moveY = destinationRect.top - targetRect.top;

  target.style.setProperty('--moveX', `${moveX}px`);
  target.style.setProperty('--moveY', `${moveY}px`);
  target.style.setProperty('--duration', `${duration}s`);
}