class gameField {
    element;
    cards = [];

    constructor(element) {
        this.element = element;
    }

    getGameField() {
        return this.element;
    }

    addCard(card) {
        this.cards.push(card);
    }

    addCards(cards) {
        this.cards = cards.concat(cards);
    }

    clear() {
        while (this.element.lastChild) {
            this.element.removeChild(this.element.lastChild)
        }
    }

    setCardImages(characterName) {
        function findPairByAltValue(content, cards) {
            for (let card of cards) {
                if (card.getContent() === content) {
                    return card;
                }
            }
            return undefined;
        }

        for (let card of this.cards) {
            if (card.getImage() !== null) {
                continue;
            }
            let pairCard = findPairByAltValue(card.getContent(), this.cards);
            setImage(characterName, [card, pairCard])
        }
    }

}

function setImage(characterName, cards) {
    switch (characterName) {
        case "dogs":
            fetch("https://dog.ceo/api/breeds/image/random")
                .then(response => response.json()
                    .then(result => {
                            for (let card of cards) {
                                card.setImage(result.message);
                                document.getElementById("card-" + card.id).getElementsByTagName("img")[0].src = "";
                                document.getElementById("card-" + card.id).getElementsByTagName("img")[0].src = card.getImage();

                            }
                        }
                    ))
                .catch(error => {
                    console.log(error);
                })
            break;
        case "random":
            let id = null;
            for (let card of cards) {
                if (id == null) {
                    id = card.id;
                }
                card.setImage("https://picsum.photos/200/300?random=" + id);
                document.getElementById("card-" + card.id).getElementsByTagName("img")[0].src = "";
                document.getElementById("card-" + card.id).getElementsByTagName("img")[0].src = card.getImage();
            }
            break;
    }
}

