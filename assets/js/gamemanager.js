/* jshint esversion: 8 */

import {player, getStory} from './story.js';

const textContainer = document.getElementById("room-description");
const paragraph = document.createElement("p");
const buttons = document.getElementsByClassName("action-button");
const roomImage = document.getElementById("room-img");
const roomName = document.getElementById("room-name");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const form = document.getElementById("form");
const myName = document.getElementById("player-name");
const contact = document.getElementById("contact");
const playerInfo = document.getElementById("player-info");
const inventoryInfo = document.getElementById("inventory-info");
const root = document.documentElement;
const maxHealth = player.health;

let roomId;
let storyId;
let currentRoom;
let currentStory;
let actions;
let finishedTyping = false;
let typeWriter;
let onClick = [];
let inventory = [];
let healthBarWidth;
let story;

const roomImg = {
    1: "./assets/img/tutorial.jpg",
    2: "./assets/img/biotech.jpg",
    3: "./assets/img/busstop.jpg",
    4: "./assets/img/nightclub.jpg",
    5: "./assets/img/hideout.jpg"
};

const rooms = {
    1: new Room("Tutorial", roomImg[1], 1),
    2: new Room("BioTech HQ", roomImg[2], 2),
    3: new Room("Bus Stop", roomImg[3], 3),
    4: new Room("Night Club", roomImg[4], 4),
    5: new Room("Hideout", roomImg[5], 5)
};

window.onload = checkIfNotFirstTime;

function checkIfNotFirstTime() {
    if (player.name.length > 0 ) {
        modal.classList.add("close");
        overlay.classList.add("close");
        story = getStory(player);
        startGame();
    }
}

function calculateHealthWidth() {
    healthBarWidth = (player.health / maxHealth) * 100;
    root.style.setProperty('--width', healthBarWidth + "%");
}

function loadScene() {
    paragraph.textContent = "";
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerText = "";
        buttons[i].style.pointerEvents = "none";
    }
    fadeButtons();
    currentRoom = rooms[roomId];
    currentRoom.showName();
    currentRoom.showImage();
    currentStory = story[currentRoom.id].find(currentStory => currentStory.id === storyId);
    let c = 0;
    typeWriter = setInterval(() => {
        paragraph.textContent += currentStory.text.charAt(c++);
        finishedTyping = false;
        if (c > currentStory.text.length) {
            finishedTyping = true;
            clearInterval(typeWriter);
        }
    }, 50);
    actions = currentStory.actions;
    switch (true) {
        case (currentStory.hasOwnProperty("requiredItemScene")):
            if (!inventory.includes(currentStory.requiredItem)) {
                displayGameOver();
            } else {
                displayNextScene();
            }
        break;
        case (currentStory.hasOwnProperty("gameOver")):
            displayGameOver();
        break;
        default:
            displayActions();
    }
    if (currentStory.hasOwnProperty("enemy")) {
        currentStory.enemy.showImage();
        currentStory.enemy.showName();
        fadeImage();
        player.takeDamage(currentStory.enemy.attack);
        displayDamage();
        player.checkIsDead();
        if (player.isDead) {
            displayGameOver();
        }
    }
}

function displayActions() {
    if(!finishedTyping) {
       setTimeout(displayActions, 100); 
    } else {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].innerText = actions[i].text;
            buttons[i].style.pointerEvents = "auto";
        }
    }
}

function displayDamage() {
    if(!finishedTyping) {
        setTimeout(displayDamage, 100); 
    } else {
        calculateHealthWidth();
    }
}

function displayGameOver() {
    if(!finishedTyping) {
        setTimeout(displayGameOver, 100); 
    } else {
        gameOver();
    }
}

function displayNextScene() {
    if(!finishedTyping) {
        setTimeout(displayNextScene, 100); 
    } else {
        storyId = currentStory.requiredItemScene;
        finishedTyping = false;
        loadScene(roomId, storyId);
    }
}

function handleActionClicks() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].removeEventListener("click", onClick[i]);
        onClick[i] = () => {
            if (!finishedTyping) {
                clearInterval(typeWriter);
            } 
            switch (true) {
                case (actions[i].hasOwnProperty("nextScene") && actions[i].hasOwnProperty("item")):
                    inventory.push(actions[i].item);
                    storyId = actions[i].nextScene;
                    finishedTyping = false;
                    loadScene(roomId, storyId);
                break;
                case (actions[i].hasOwnProperty("nextScene") && actions[i].hasOwnProperty("weapon")):
                    player.handleWeapon(actions[i].weapon.health, actions[i].weapon.attack, actions[i].weapon.defense);
                    storyId = actions[i].nextScene;
                    finishedTyping = false;
                    loadScene(roomId, storyId);
                break;
                case (actions[i].hasOwnProperty("nextScene") && actions[i].hasOwnProperty("attackEnemy")):
                    actions[i].attackEnemy.takeDamage(player.attack);
                    actions[i].attackEnemy.checkIsDead();
                    if (actions[i].attackEnemy.isDead) {
                        storyId = actions[i].nextSceneAfterKill;
                        finishedTyping = false;
                        loadScene(roomId, storyId);
                        fadeImage();
                    }
                    else {
                        storyId = actions[i].nextScene;
                        finishedTyping = false;
                        loadScene(roomId, storyId);
                    }
                break;
                case (actions[i].hasOwnProperty("nextScene")):
                    storyId = actions[i].nextScene;
                    finishedTyping = false;
                    loadScene(roomId, storyId);
                break;
                case(actions[i].hasOwnProperty("response")):
                    paragraph.textContent = "";
                    let c = 0;
                    typeWriter = setInterval(() => {
                        paragraph.textContent += actions[i].response.charAt(c++);
                        finishedTyping = false;
                        if (c > currentStory.text.length) {
                            finishedTyping = true;
                            clearInterval(typeWriter);
                        }
                    }, 50);
                break;
                case (actions[i].hasOwnProperty("nextRoom")):
                    roomId = actions[i].nextRoom;
                    finishedTyping = false;
                    changeRoom();
                break;
                case (actions[i].hasOwnProperty("reload")):
                    fadeButtons();
                    finishedTyping = false;
                    setTimeout(() => {
                        location.reload();
                    }, 50); 
                break;
                default:
                    storyId = actions[i].nextScene;
                    finishedTyping = false;
                    loadScene(roomId, storyId);
            }
        };
        buttons[i].addEventListener("click", onClick[i]);
    }
}

function fadeButtons() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.add("fade");
    }
    setTimeout(() => {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("fade");
        }
    }, 500);
}

function fadeImage() {
    roomImage.classList.add("fade");
    roomName.classList.add("fade");
        setTimeout(() => {
            roomImage.classList.remove("fade");
            roomName.classList.remove("fade");
    }, 500);
}

function startGame() {
    roomId = 1;
    storyId = 1;
    textContainer.appendChild(paragraph);
    loadScene();
    handleActionClicks(); 
    fadeImage();
}

function changeRoom() {
    setTimeout(() => {
        fadeImage();
        textContainer.appendChild(paragraph);
        storyId = 1;
        loadScene();
    }, 250);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    player.name = myName.value;
    story = getStory(player);
    startGame();
    if (!modal.classList.contains("close")) {
        modal.classList.add("close");
    }
    if (!overlay.classList.contains("close")) {
        overlay.classList.add("close");
    }
});

function newGameButton() {
    const newGame = document.getElementById("restart");
    newGame.addEventListener("click", () => {
        if (modal.classList.contains("open")) {
            modal.classList.remove("open");
        } 
        if (overlay.classList.contains("open")) {
            overlay.classList.remove("open");
        } 
        if (!finishedTyping) {
            clearInterval(typeWriter);
            paragraph.textContent = "";
        } 
        startGame();
    });
}

function gameOver() {
    player.gameOver();
    newGameButton();
}

contact.addEventListener("click", () => {
    modal.classList.add("open");
    overlay.classList.add("open");
    modal.innerHTML = `
    <div id="heading">
        <h1>Contact Us</h1>
        <span id="close-btn">&times;</span>
    </div>
    <form id="contact-form" onsubmit="return sendMail(this);" method="POST">
        <div class="contact-input">
            <label for="name">Name<span class="required-icon"></span></label>
            <input type="text" name="name" id="name" placeholder="Enter your name" required>
        </div>
        <div class="contact-input">
            <label for="email">Email<span class="required-icon"></span></label>
            <input type="email" name="email" id="email" placeholder="Enter your email" required>
        </div>
        <div class="contact-input">
            <label for="message">Message<span class="required-icon"></span></label>
            <textarea name="message" id="message" rows="6" placeholder="Enter your message" required></textarea>
        </div>
        <div>
            <button id="contact-btn" type="submit" aria-label="Submit the contact form">Submit</button>
        </div>
    </form>
    `;
    const closeContact = document.getElementById("close-btn");
    closeContact.addEventListener("click", () => {
        modal.classList.remove("open");
        overlay.classList.remove("open");
    });
});

playerInfo.addEventListener("click", () => {
    player.showStats();
});

inventoryInfo.addEventListener("click", () => {
    modal.classList.add("open");
    overlay.classList.add("open");
    let list = document.createElement("ol");
    let listItems = "";
    for (let item of inventory) {
        listItems += `<li><span>${item.name}</span><span><img loading="lazy" src="${item.img}" width="48" height="36" alt="image of ${item.name}"></span></li>`;
    }
    if (inventory.length > 0) {
        list.innerHTML = listItems;
    } else {
        list.innerHTML = 
        `
        <p>There are no items in your list</p>
        `;
    }
    modal.innerHTML = 
    `
    <div id="heading">
        <h1>Items List</h1>
        <span id="close-btn">&times;</span>
    </div>
    `;
    modal.appendChild(list);
    const closeContact = document.getElementById("close-btn");
    closeContact.addEventListener("click", () => {
        modal.classList.remove("open");
        overlay.classList.remove("open");
    });
});
