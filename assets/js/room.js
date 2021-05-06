class Room {
    constructor(id, img, storyNode, items, enemies) {
        this.id = id;
        this.img = img;
        this.storyNode = storyNode;
        this.items = items;
        this.enemies = enemies;
    }
    displayName() {
        const nameContainer = document.getElementById("room-name");
        nameContainer.innerHTML = `<h1>${this.name}</h1>`;
    }
    displayImg() {
        const imgContainer = document.getElementById("room-img");
        imgContainer.innerHTML = `<img src="${this.img}" alt="image of ${this.name}"></img>`;
    }
}
