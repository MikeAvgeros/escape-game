/* jshint esversion: 8 */

class Scene {
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
        imgContainer.style.background = `url(${this.img}) no-repeat center center/cover`;
    }
}
