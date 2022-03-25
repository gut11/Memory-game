let id = [];
let tech = ["bootstrap",
            "css",
            "electron",
            "firebase",
            "html",
            "javascript",
            "jquery",
            "mongo",
            "node",
            "react"
            ];
let cards = [];
let cont = 0;
let aux = 0;
let board = document.getElementById("board");
let cardsDivs = document.getElementsByClassName("card");
let previousCard = [];
let gameEndCount = 0;
let maxPoints = 0;
let lockmode = false;
let gameOverScreen = document.getElementById("tela_game_over");









function createCard(){
    let pairTech;
    pairTech = tech[cont];
    aux++;
    if(aux == 2){
        cont++;
        aux = 0;
    }  
    return {
        id: createId(),
        tech: pairTech,
        flip: false,
        };
    }



function createId(){
    return parseInt(Math.random() * 200);
}



function shuffleCards(){
    for(let i in cards){
        for(let j in cards){
            if(cards[i].id <= cards[j].id)
            [cards[i].tech,cards[j].tech] = [cards[j].tech,cards[i].tech];
        }
    }
}



function CreatesHtmlCardsStructure(cont){
    return `
    <div class="card">
        <div class="front" style = "background-image: url(./assets/img/` + cards[cont].tech + `.png);">
        </div>
        <div class="back">
            &lt/>
        </div>
    </div>`
}



function flipCard(i,currentCard){
    return () => {
        if(lockmode == true){
            return;
        }
        if(cards[i].flip == true)
        return;
        currentCard.classList.add("flip");
        cards[i].flip = true;
        checkIfCardsMatch(i,currentCard);
        return;
    };
}



function checkIfCardsMatch(i,currentCard){
    if(cont % 2 == 0){
        previousCard[0] = cards[i].tech;
        previousCard[1] = currentCard;
        previousCard[2] = i;
        cont++;
        return;
    }
    if(previousCard[0] != cards[i].tech){
        lockmode = true;
        setTimeout(() => {lockmode = false;},1005);
        setTimeout(() => {
        currentCard.classList.remove("flip");
        previousCard[1].classList.remove("flip");
        cards[previousCard[2]].flip = false;
        cards[i].flip = false;
        cont++;
        },1000);
    }
    else{
        cont++;
        gameEndCount++;
        if(gameEndCount == maxPoints)
        endGame();
        return;
    }
}



function resetGame(){
    for(let i in cards){
    cardsDivs[i].classList.remove("flip");
    cards[i].flip = false;
    cards[i].id = createId();
    }
    setTimeout(() => {
    shuffleCards();
    board.innerHTML = "";
    cont = 0;
    for(let i in cards){
        board.innerHTML += CreatesHtmlCardsStructure(cont);
        cont++;
        }
    gameOverScreen.style.display = "none";
    gameEndCount = 0;
    for(let i in cardsDivs){
        cardsDivs[i].onclick = flipCard(i,cardsDivs[i]);
        }
    return;
    },1000)
}



function endGame(){
    let button;
    gameOverScreen.style.display = "flex";
    button = gameOverScreen.getElementsByTagName("button");
    button[0].addEventListener("click",resetGame);
    return;
}



function startGame(){
    for(let i in tech){
        maxPoints++;
        cards.push(createCard());
        cards.push(createCard());
    }
    shuffleCards();
    cont = 0;
    for(let i in cards){
    board.innerHTML += CreatesHtmlCardsStructure(cont);
    cont++;
    }
    for(let i in cardsDivs){
        cardsDivs[i].onclick = flipCard(i,cardsDivs[i]);
        }
}



startGame();
