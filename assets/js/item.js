class Item {
    constructor(name, img) {
        this.name = name;
        this.img = img;
    }
    showName() {
        const nameContainer = document.getElementById("room-name");
        nameContainer.innerHTML = `<h1>${this.name}</h1>`;
    }
    showImage() {
        const imgContainer = document.getElementById("room-img");
        imgContainer.innerHTML = `<img src="${this.img}" alt="image of a ${this.name}"></img>`;
    }
}

class Weapon extends Item {
    constructor(name, img, attack, defense) {
        super(name, img);
        this.attack = attack;
        this.defense = defense;
    }
    updateStats(player) {
        player.attack += this.attack;
        player.defense += this.defense;
    }
}
