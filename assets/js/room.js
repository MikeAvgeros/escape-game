class Room {
    constructor(name, description, storyline, img, items, enemies) {
        this.name = name;
        this.description = description;
        this.storyline = storyline;
        this.img = img;
        this.items = items;
        this.enemies = enemies;
        this.canExit = false;
        this.examined = false;
    }
    displayName() {
        const nameContainer = document.getElementById("room-name");
        nameContainer.innerHTML = `<h1>${this.name}</h1>`;
    }
    displayImg() {
        const imgContainer = document.getElementById("room-img");
        imgContainer.innerHTML = `<img src="${this.img}" alt="image of ${this.name}"></img>`;
    }
    displayDescription() {
        const textContainer = document.getElementById("room-description");
        textContainer.innerHTML = `<p>${this.description}</p>`;
    }
    displayStory(action,storyIndex) {
        const textContainer = document.getElementById("room-description");
        textContainer.innerHTML = `<p>${this.storyline[action][storyIndex]}</p>`;
        console.log(`<p>${this.storyline[action][storyIndex]}</p>`);
    }
}
