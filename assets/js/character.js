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
        imgContainer.innerHTML = `<img loading="lazy" src="${this.img}" alt="image of ${this.name}"></img>`;
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
    gameOver() {
        const modal = document.getElementById("modal");
        const overlay = document.getElementById("overlay");
        modal.classList.add("open");
        overlay.classList.add("open");
        modal.innerHTML = `
        <h1>GAME OVER</h1> 
        <p>Press New Game to restart</p>
        <div id="new-game">
            <button id="restart">New Game</button>
        </div>
        `;
    }
    handleWeapon() {
        // update the stats based on the weapon function
    }
    showName() {
        const nameContainer = document.getElementById("my-name");
        nameContainer.innerHTML = `<p>Player: ${this.name}</p>`;
    }
}
