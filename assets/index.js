const CARDS = document.querySelectorAll('.card');
let isFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function chechForMatch() {
  if(firstCard.dataset.card === secondCard.dataset.card) {
    disableCards();
    return;
  }

  unflipCards();
}

function flipCard() {
  if(lockBoard) return;
  if(this === firstCard) return;

  this.classList.add('flip');
  if(!isFlippedCard) {
    isFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  isFlippedCard = false;
  chechForMatch();
}

function resetBoard() {
  [isFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];

}

(function shuffle() {
  CARDS.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });

})();


CARDS.forEach((card) => {
  card.addEventListener('click', flipCard)
});
