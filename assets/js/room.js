class Room {
    constructor(name, img, id) {
        this.name = name;
        this.img = img;
        this.id = id;
    }
    showName() {
        const nameContainer = document.getElementById("room-name");
        nameContainer.innerHTML = `<h2>${this.name}</h2>`;
    }
    showImage() {
        const imgContainer = document.getElementById("room-img");
        imgContainer.innerHTML = `<img loading="lazy" src="${this.img}" alt="image of ${this.name}"></img>`;
    }
}
