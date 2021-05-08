class Room {
    constructor(name, img, id) {
        this.name = name;
        this.img = img;
        this.id = id;
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
