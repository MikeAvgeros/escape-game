/* jshint esversion: 8 */

class Item {
    constructor(name, img) {
        this.name = name;
        this.img = img;
    }
    // showName() {
    //     const nameContainer = document.getElementById("item-name");
    //     nameContainer.innerHTML = `<p>${this.name}</p>`;
    // }
    // showImage() {
    //     const inventory = document.getElementById("inventory-modal");
    //     inventory.innerHTML += `<img loading="lazy" id=${this.name} class="inventory-img" src="${this.img}" alt="image of a ${this.name}"></img>`;
    // }
    // deleteImage() {
    //     const thisImage = document.getElementById( `${this.name}`);
    //     thisImage.style.display = "none";
    // }
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
