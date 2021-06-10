/* jshint esversion: 8 */

class Character {
    constructor(name, health, attack, defense, img) {
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.img = img;
        this.isDead = false;
    }
    takeDamage(amount) {
        let damage = amount - this.defense;
        if (damage < 0) {
            damage = 0;
        }
        this.health -= damage;
    }
    checkIsDead() {
        if (this.health <= 0) {
            this.isDead = true;
        }
    }
    showImage() {
        const imgContainer = document.getElementById("room-img");
        imgContainer.innerHTML = `<img loading="lazy" src="${this.img}" alt="image of ${this.name}">`;
    }
    showName() {
        const nameContainer = document.getElementById("room-name");
        nameContainer.innerHTML = `<h2>${this.name}</h2>`;
    }
}

class Player extends Character {
    constructor(name, health, attack, defense, takeDamage, checkIsDead) {
        super(name, health, attack, defense, takeDamage, checkIsDead);
    }
    showStats() {
        const modal = document.getElementById("modal");
        const overlay = document.getElementById("overlay");
        modal.innerHTML = `
        <div id="heading">
            <h1>Player Stats</h1>
            <span id="close-btn">&times;</span>
        </div>
        <br>
        <p>Player Name: ${this.name}</p>
        <p>Health Points: ${this.health}</p>
        <p>Attack Points: ${this.attack}</p>
        <p>Defense Points: ${this.defense}</p>
        `;
        modal.classList.add("open");
        overlay.classList.add("open");
        const closeContact = document.getElementById("close-btn");
        closeContact.addEventListener("click", () => {
            modal.classList.remove("open");
            overlay.classList.remove("open");
        });
    }
}
