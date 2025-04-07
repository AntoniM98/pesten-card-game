export let deck = [
  { id: 'A-H', suit: 'hearts', face: 'Ace', img: '../../images/A-H.png', pest: true },
  { id: '2-H', suit: 'hearts', face: '2', img: '../../images/2-H.png', pest: true },
  { id: '3-H', suit: 'hearts', face: '3', img: '../../images/3-H.png', pest: false },
  { id: '4-H', suit: 'hearts', face: '4', img: '../../images/4-H.png', pest: false },
  { id: '5-H', suit: 'hearts', face: '5', img: '../../images/5-H.png', pest: false },
  { id: '6-H', suit: 'hearts', face: '6', img: '../../images/6-H.png', pest: false },
  { id: '7-H', suit: 'hearts', face: '7', img: '../../images/7-H.png', pest: false },
  { id: '8-H', suit: 'hearts', face: '8', img: '../../images/8-H.png', pest: true },
  { id: '9-H', suit: 'hearts', face: '9', img: '../../images/9-H.png', pest: false },
  { id: '10-H', suit: 'hearts', face: '10', img: '../../images/10-H.png', pest: false },
  { id: 'J-H', suit: 'hearts', face: 'Jack', img: '../../images/J-H.png', pest: true },
  { id: 'Q-H', suit: 'hearts', face: 'Queen', img: '../../images/Q-H.png', pest: false },
  { id: 'K-H', suit: 'hearts', face: 'King', img: '../../images/K-H.png', pest: false },
  
  { id: 'A-D', suit: 'diamonds', face: 'Ace', img: '../../images/A-D.png', pest: true },
  { id: '2-D', suit: 'diamonds', face: '2', img: '../../images/2-D.png', pest: true },
  { id: '3-D', suit: 'diamonds', face: '3', img: '../../images/3-D.png', pest: false },
  { id: '4-D', suit: 'diamonds', face: '4', img: '../../images/4-D.png', pest: false },
  { id: '5-D', suit: 'diamonds', face: '5', img: '../../images/5-D.png', pest: false },
  { id: '6-D', suit: 'diamonds', face: '6', img: '../../images/6-D.png', pest: false },
  { id: '7-D', suit: 'diamonds', face: '7', img: '../../images/7-D.png', pest: false },
  { id: '8-D', suit: 'diamonds', face: '8', img: '../../images/8-D.png', pest: true },
  { id: '9-D', suit: 'diamonds', face: '9', img: '../../images/9-D.png', pest: false },
  { id: '10-D', suit: 'diamonds', face: '10', img: '../../images/10-D.png', pest: false },
  { id: 'J-D', suit: 'diamonds', face: 'Jack', img: '../../images/J-D.png', pest: true },
  { id: 'Q-D', suit: 'diamonds', face: 'Queen', img: '../../images/Q-D.png', pest: false },
  { id: 'K-D', suit: 'diamonds', face: 'King', img: '../../images/K-D.png', pest: false },
  
  { id: 'A-C', suit: 'clubs', face: 'Ace', img: '../../images/A-C.png', pest: true },
  { id: '2-C', suit: 'clubs', face: '2', img: '../../images/2-C.png', pest: true },
  { id: '3-C', suit: 'clubs', face: '3', img: '../../images/3-C.png', pest: false },
  { id: '4-C', suit: 'clubs', face: '4', img: '../../images/4-C.png', pest: false },
  { id: '5-C', suit: 'clubs', face: '5', img: '../../images/5-C.png', pest: false },
  { id: '6-C', suit: 'clubs', face: '6', img: '../../images/6-C.png', pest: false },
  { id: '7-C', suit: 'clubs', face: '7', img: '../../images/7-C.png', pest: false },
  { id: '8-C', suit: 'clubs', face: '8', img: '../../images/8-C.png', pest: true },
  { id: '9-C', suit: 'clubs', face: '9', img: '../../images/9-C.png', pest: false },
  { id: '10-C', suit: 'clubs', face: '10', img: '../../images/10-C.png', pest: false },
  { id: 'J-C', suit: 'clubs', face: 'Jack', img: '../../images/J-C.png', pest: true },
  { id: 'Q-C', suit: 'clubs', face: 'Queen', img: '../../images/Q-C.png', pest: false },
  { id: 'K-C', suit: 'clubs', face: 'King', img: '../../images/K-C.png', pest: false },
  
  { id: 'A-S', suit: 'spades', face: 'Ace', img: '../../images/A-S.png', pest: true },
  { id: '2-S', suit: 'spades', face: '2', img: '../../images/2-S.png', pest: true },
  { id: '3-S', suit: 'spades', face: '3', img: '../../images/3-S.png', pest: false },
  { id: '4-S', suit: 'spades', face: '4', img: '../../images/4-S.png', pest: false },
  { id: '5-S', suit: 'spades', face: '5', img: '../../images/5-S.png', pest: false },
  { id: '6-S', suit: 'spades', face: '6', img: '../../images/6-S.png', pest: false },
  { id: '7-S', suit: 'spades', face: '7', img: '../../images/7-S.png', pest: false },
  { id: '8-S', suit: 'spades', face: '8', img: '../../images/8-S.png', pest: true },
  { id: '9-S', suit: 'spades', face: '9', img: '../../images/9-S.png', pest: false },
  { id: '10-S', suit: 'spades', face: '10', img: '../../images/10-S.png', pest: false },
  { id: 'J-S', suit: 'spades', face: 'Jack', img: '../../images/J-S.png', pest: true },
  { id: 'Q-S', suit: 'spades', face: 'Queen', img: '../../images/Q-S.png', pest: false },
  { id: 'K-S', suit: 'spades', face: 'King', img: '../../images/K-S.png', pest: false },

  { id: 'J-R', suit: 'joker', face: 'Joker', img: '../../images/J-R.png', pest: true },
  { id: 'J-R2', suit: 'joker', face: 'Joker', img: '../../images/J-R.png', pest: true }
];