const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    checkForMatch();
}
let array = [];
function checkForMatch() {
    if(firstCard.id === secondCard.id) {
        array.push(firstCard);
        array.push(secondCard);
        disableCards();
        return;
    }
    unflipCards();
}

function disableCards() {
    setTimeout(() => {
        firstCard.style.visibility = 'hidden';
        secondCard.style.visibility = 'hidden';
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }, 1500);
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function cardShuffle() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 16);
        card.style.order = randomPosition;
    })
}

function resetButton() {
    location.reload();
    startTimer();
}

function startTimer() {
    let second = 0;
    let minute = 0; 
    const timer = document.getElementById('timer');
    let interval;
    interval = setInterval(function(){
        timer.innerHTML = minute +":"+ second;
        second++;
        if(second < 10) {
            second = '0' + second;
        }
        if(second === 60) {
            minute++;
            second = 0;
        }
        if(minute === 60){
            hour++;
            minute = 0;
        }
    }, 1000);
}

cards.forEach(card => card.addEventListener('click', flipCard));

