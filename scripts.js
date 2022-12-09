window.onload = function () {
    createField();

}

function createField() {
    let gamefield = document.getElementById("game-field");
    removeChildren(gamefield);
    let boardsize = document.getElementById("size").value;
    let cardsNeeded = boardsize * boardsize;
    let charCodeArray = Array.from(Array(cardsNeeded / 2)).map((e, i) => i + 65);
    let letters = charCodeArray.map((x) => String.fromCharCode(x));
    letters = letters.concat(letters);
    let cards = [];
    for (let i = 1; i <= cardsNeeded; i++) {
        let randomLetterIndex = Math.floor(Math.random() * letters.length);
        cards.push(new Card(i, letters.splice(randomLetterIndex, 1)))
    }
    cards.forEach((card) => gamefield.innerHTML += card.generateAsHtml())
}

function removeChildren(element) {
    while (element.lastChild) {
        element.removeChild(element.lastChild)
    }
}

function openCard(cardElement) {
    if (!cardElement.classList.contains("closed")) {
        return;
    }
    let openCards = document.getElementsByClassName("open");
    if (openCards.length === 1) {
        if (openCards[0].textContent === cardElement.textContent) {
            setFoundCardClass(cardElement);
            setFoundCardClass(openCards[0]);
            gameComplete();
            return;
        }
    } else if (openCards.length >= 2) {
        setClosedCardClass(openCards[0]);
        setClosedCardClass(openCards[0]);
    }
    setOpenCardClass(cardElement)

}

function setOpenCardClass(element) {
    element.classList.remove("closed");
    element.classList.add("open");
}

function setClosedCardClass(element) {
    element.classList.add("closed");
    element.classList.remove("open");
}

function setFoundCardClass(element) {
    element.classList.remove("closed");
    element.classList.remove("open");
    element.classList.add("found");
}

function gameComplete() {
    if (document.getElementsByClassName("closed").length === 0) {
        let newGame = confirm("Gefeliciteerd wil je een nieuw spel beginnen?");
        if (newGame) {
            createField();
        }

    }

}

class Card {
    constructor(id, content) {
        this.id = id;
        this.content = content;
    }

    getId() {
        return this.id;
    }

    getContent() {
        return this.content;
    }

    generateAsHtml() {
        return '<div id=\"card-' + this.id + '" class="card closed" onclick="openCard(this)" tabIndex="' + this.id + '">' + this.content + '</div>';
    }

}