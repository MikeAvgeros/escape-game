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
let finishedTyping;
let typeWriter;
let onClick = [];
let inventory = [];
let healthBarWidth;
let story;

const roomImg = {
    1: "./assets/img/2.jpg",
    2: "./assets/img/1.jpg"
};

const rooms = {
    1: new Room("Introduction", roomImg[1], 1),
    2: new Room("Bus Stop", roomImg[2], 2)
};

function calculateHealthWidth() {
    healthBarWidth = (player.health / maxHealth) * 100;
    root.style.setProperty('--width', healthBarWidth + "%");
}

function loadScene() {
    paragraph.textContent = "";
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
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerText = actions[i].text;
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
                case (actions[i].hasOwnProperty("storyNode") && !actions[i].hasOwnProperty("attackEnemy")):
                    storyId = actions[i].storyNode;
                    loadScene(roomId, storyId);
                break;
                case (actions[i].hasOwnProperty("attackEnemy") && actions[i].hasOwnProperty("storyNode")):
                    actions[i].attackEnemy.takeDamage(player.attack);
                    actions[i].attackEnemy.checkIsDead();
                    if (actions[i].attackEnemy.isDead) {
                        storyId = actions[i].storyNodeAfterKill;
                        loadScene(roomId, storyId);
                    }
                    else {
                        storyId = actions[i].storyNode;
                        loadScene(roomId, storyId);
                    }
                break;
                case (actions[i].hasOwnProperty("nextRoom")):
                    roomId = actions[i].nextRoom;
                    changeRoom();
                break;
                case (actions[i].hasOwnProperty("reload")):
                    fadeButtons();
                    setTimeout(() => {
                        location.reload();
                    }, 50); 
                break;
                default:
                    storyId = actions[i].storyNode;
                    loadScene(roomId, storyId);
            }
            if (currentStory.hasOwnProperty("enemy")) {
                currentStory.enemy.showImage();
                currentStory.enemy.showName();
                player.takeDamage(currentStory.enemy.attack);
                calculateHealthWidth();
                player.checkIsDead();
                if (player.isDead) {
                    gameOver();
                }
            }
            if (currentStory.hasOwnProperty("item")) {
                inventory.push(currentStory.item);
            }
            if (currentStory.hasOwnProperty("requiredItem")) {
                if (!inventory.contains(currentStory.requiredItem)) {
                    gameOver();
                }
            }
            if (actions[i].hasOwnProperty("weapon")) {
                player.handleWeapon(actions[i].weapon.health, actions[i].weapon.attack, actions[i].weapon.defense)
            }
            if (currentStory.hasOwnProperty("fadeImage")) {
                fadeImage();
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
    }, 1000);
}

function fadeImage() {
    roomImage.classList.add("fade");
    roomName.classList.add("fade");
        setTimeout(() => {
            roomImage.classList.remove("fade");
            roomName.classList.remove("fade");
    }, 1000);
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
        handleActionClicks(); 
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
    }
    else {
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
