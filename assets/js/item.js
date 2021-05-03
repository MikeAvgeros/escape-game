class Item {
    constructor(name, description, img) {
        this.name = name;
        this.description = description;
        this.img = img;
    }
    displayName() {
        let nameContainer = document.getElementById();
        nameContainer.innerHTML = `<h1>${this.name}</h1>`;
    }
    displayImg() {
        let imgContainer = document.getElementById();
        imgContainer.innerHTML = `<img src="${this.img}" alt="image of a ${this.name}"></img>`;
    }
    displayDescription() {
        let descriptionContainer = document.getElementById();
        descriptionContainer.innerHTML = `<p>${this.description}</p>`;
    }
    pickItem() {
        // add item to your inventory and remove it from the room's list of items
    }
}

class Weapon extends Item {
    constructor(name, description, img, attack, defense) {
        super(name, description, img);
        this.attack = attack;
        this.defense = defense;
    }
    updateStats(player) {
        player.attack += this.attack;
        player.defense += this.defense;
    }
}
