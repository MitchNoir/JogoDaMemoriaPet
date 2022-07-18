const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firtsCard, secondCard;
let lockBoard = false;

//virar carta
function flipCard() {
    if(lockBoard) return;
    if( this === firtsCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firtsCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForrMatch();
}

//checar cartas
function checkForrMatch() {
    if(firtsCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return
    }

    unflipCards();
}

//função que desabilita as cartas
function disableCards() {
    firtsCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);  

    resetBoard();
}

//função que desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firtsCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false,false];
    [firtsCard, secondCard] = [null,null];
}

//função que embaralha as cartas
(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});