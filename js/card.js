class Card {
    image = null;
    content;

    id;

    constructor(id, content) {
        this.id = id;
        this.content = content;
    }


    getContent() {
        return this.content;
    }

    setImage(image) {
        this.image = image;
    }

    getImage() {
        return this.image;
    }

    generateAsHtml() {
        return '<div id=\"card-' + this.id + '" class="card closed" onclick="openCard(this)" tabIndex="' + this.id + '" xmlns="http://www.w3.org/1999/html"> ' +
            '<img src="' + this.image + '" alt="' + this.content + '" width="80%" height="80%" style="display: none"> </div>';
    }

}