/* jshint esversion: 8 */

class Character {
    constructor(name, health, attack, defense) {
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
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
}

class Enemy extends Character {
    constructor(name, health, attack, defense, img, takeDamage, checkIsDead) {
        super(name, health, attack, defense, takeDamage, checkIsDead);
        this.img = img;
    }
    showImage() {
        const imgContainer = document.getElementById("scene-img");
        imgContainer.style.background = `url(${this.img}) no-repeat center center/cover`;
    }
    showName() {
        const nameContainer = document.getElementById("scene-name");
        nameContainer.innerHTML = `<h2>${this.name}</h2>`;
    }
    showHealth(paragraph) {
        paragraph.textContent = `${this.name}'s Health: ${this.health}`;
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
        <div id="close-btn">
            <span aria-label="Close modal">&times;</span>
        </div>
        <div>
            <h1>Player Stats</h1>
        </div>
        <br>
        <p>Player Name: ${this.name}</p>
        <p>Health Points: ${this.health}</p>
        <p>Attack Points: ${this.attack}</p>
        <p>Defense Points: ${this.defense}</p>
        `;
        if (!modal.classList.contains("open")) {
            modal.classList.add("open");
        }
        if (!overlay.classList.contains("open")) {
            overlay.classList.add("open");
        }
        const closeContact = document.getElementById("close-btn");
        closeContact.addEventListener("click", () => {
            if (modal.classList.contains("open")) {
                modal.classList.remove("open");
            } 
            if (overlay.classList.contains("open")) {
                overlay.classList.remove("open");
            } 
        });
    }
}
