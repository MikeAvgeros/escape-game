class Room {
    constructor(name, description, img, items, enemies) {
        this.name = name;
        this.description = description;
        this.img = img;
        this.items = items;
        this.enemies = enemies;
    }
    displayName() {
        let nameContainer = document.getElementById("room-name");
        nameContainer.innerHTML = `<h1>${this.name}</h1>`;
    }
    displayImg() {
        let imgContainer = document.getElementById("room-img");
        imgContainer.innerHTML = `<img src="${this.img}" alt="image of ${this.name}"></img>`;
    }
    displayDescription() {
        let descriptionContainer = document.getElementById("room-description");
        descriptionContainer.innerHTML = `<p>${this.description}</p>`;
    }
    examineRoom() {
        //check if any items in the room and display their name along with a short description
    }
}
