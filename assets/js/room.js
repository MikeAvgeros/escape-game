class Room {
    constructor(name, id, img, storyNode, item, enemy) {
        this.name = name;
        this.id = id;
        this.img = img;
        this.storyNode = storyNode;
        this.item = item;
        this.enemy = enemy;
    }

    showName() {
        const nameContainer = document.getElementById("room-name");
        nameContainer.innerHTML = `<h1>${this.name}</h1>`;
    }
    
    showImage() {
        const imgContainer = document.getElementById("room-img");
        imgContainer.innerHTML = `<img src="${this.img}" alt="image of ${this.name}"></img>`;
    }
}
