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
        const inventory = document.getElementById("inventory");
        inventory.innerHTML += `<img id=${this.name} class="inventory-img" src="${this.img}" alt="image of a ${this.name}"></img>`;
    }
    deleteImage() {
        const thisImage = document.getElementById( `${this.name}`);
        thisImage.style.display = "none";
    }
}

class Weapon extends Item {
    constructor(name, img, showName, showImage, deleteImage, attack, defense) {
        super(name, img, showName, showImage, deleteImage);
        this.attack = attack;
        this.defense = defense;
    }
    updateStats(player) {
        player.attack += this.attack;
        player.defense += this.defense;
    }
}
