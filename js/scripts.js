window.onload = function () {
    gameFieldObject = new gameField(document.getElementById("game-field"));
    createField();
    timer();
    updateFound(true);
}
let globalFoundPairs;
let gameFieldObject;


function createField() {
    let characterName = document.getElementById("character").value;
    let boardSize = document.getElementById("size").value;

    gameFieldObject.clear();
    let cardsNeeded = boardSize * boardSize;
    let cards = getCardArray(cardsNeeded);
    cards.forEach((card) => gameFieldObject.getGameField().innerHTML += card.generateAsHtml())
    gameFieldObject.addCards(cards);
    setCardImage(characterName);

}

function setCardImage(characterName) {
    gameFieldObject.setCardImages(characterName);

}

function getCardArray(cardsNeeded) {
    let charCodeArray = Array.from(Array(Math.round(cardsNeeded / 2))).map((e, i) => i + 65);
    let letters = charCodeArray.map((x) => String.fromCharCode(x));
    letters = letters.concat(letters);
    let cards = [];
    for (let i = 1; i <= cardsNeeded; i++) {
        let randomLetterIndex = Math.floor(Math.random() * letters.length);
        cards.push(new Card(i, letters.splice(randomLetterIndex, 1)[0]))
    }
    return cards;
}

function openCard(cardElement) {
    if (!cardElement.classList.contains("closed")) {
        return;
    }
    let openCards = document.getElementsByClassName("open");
    if (openCards.length === 1) {
        if (openCards[0].getElementsByTagName("img")[0].alt === cardElement.getElementsByTagName("img")[0].alt) {
            setFoundCardClass(cardElement);
            setFoundCardClass(openCards[0]);
            updateFound(false);
            gameComplete();
            return;
        }
    } else if (openCards.length >= 2) {
        setClosedCardClass(openCards[0]);
        setClosedCardClass(openCards[0]);
    }
    setOpenCardClass(cardElement)

}

function updateFound(reset) {
    if (reset === true) {
        globalFoundPairs = 0;
    } else {
        globalFoundPairs++;
    }
    document.getElementById('pairs').innerHTML = 'Found card pairs: ' + globalFoundPairs;
}

function setOpenCardClass(element) {
    element.classList.remove("closed");
    element.classList.add("open");
    element.getElementsByTagName("img")[0].style.display = "block";
}

function setClosedCardClass(element) {
    element.classList.add("closed");
    element.classList.remove("open");
    element.getElementsByTagName("img")[0].style.display = "none";
}

function setFoundCardClass(element) {
    element.classList.remove("closed");
    element.classList.remove("open");
    element.classList.add("found");
    element.getElementsByTagName("img")[0].style.display = "block";
}

function gameComplete() {
    if (document.getElementsByClassName("closed").length === 0) {
        newGame('Gefeliciteerd wil je een nieuw spel beginnen?');
    }
}

function newGame(message) {
    let newGame = confirm(message);
    if (newGame) {
        createField();
        timer();
        updateFound(true);
    }
}

function updateColour(colourSettingElement) {
    let elements = document.getElementsByClassName(colourSettingElement.id.split("-")[0])
    for (let element of elements) {
        element.style.backgroundColor = colourSettingElement.value;
    }
}