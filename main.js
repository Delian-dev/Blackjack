let player = {
    name: "Player",
    chips: startingSum()
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let startButton = document.getElementById("start-game");
let newCardButton = document.getElementById("new-card");
let playerEl = document.getElementById("player-el")
let bidEl = document.getElementById("bid");
let bids = document.querySelectorAll(".select-bid");
let bidValues = [1,5,10];
let bidValue = 0;

playerEl.textContent = player.name + ": $" + player.chips

function startingSum(){
    let startSum = 0;
    do{
        startSum = window.prompt("Enter the sum you want to begin with (min. 10$ required to start) :");
    }while(startSum<10)
    return startSum;
}

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    startButton.disabled=true;
    for(let i=0; i<bids.length; i++)
        bids[i].disabled=true;
    isAlive = true
    hasBlackJack = false;
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function renderGame() {
    newCardButton.disabled=false;
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
    checkEnd();
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}

function placeBid(currentId){
    let index=currentId-1;
    if(index==0)
        bidEl.textContent="1$", bidValue=1;
    else if(index==1)
        bidEl.textContent="5$", bidValue=5;
    else
        bidEl.textContent="10$", bidValue=10;
    startButton.disabled=false;
}

function checkEnd(){
    if(isAlive===false || hasBlackJack===true){
        startButton.disabled=true;
        newCardButton.disabled=true;
        bidEl.textContent = "not selected";
        if(hasBlackJack===true)
            bidValue*=-2;
        player.chips -= bidValue;
        playerEl.textContent = player.name + ": $" + player.chips;
        for(let i=0; i<bids.length; i++){
            if(bidValues[i]<=player.chips)
                bids[i].disabled=false;
        }
    }
}