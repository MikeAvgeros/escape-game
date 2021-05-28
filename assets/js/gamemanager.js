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
    1: "./assets/img/1.jpg",
    2: "./assets/img/2.jpg"
};

const rooms = {
    1: new Room("Room One", roomImg[1], 1),
    2: new Room("Room Two", roomImg[2], 2)
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
    if (story[currentRoom.id][storyId].id > story[currentRoom.id].length) {
        alert("Something went wrong. Game restarted");
        startGame();
        return;
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
                case (actions[i].hasOwnProperty("destination")):
                    storyId = actions[i].destination;
                    loadScene(roomId, storyId);
                    break;
                case (actions[i].hasOwnProperty("exit")):
                    roomId = actions[i].exit;
                    changeRoom();
            }
            if (currentStory.hasOwnProperty("item")) {
                currentStory.item.showImage();
                inventory.push(currentStory.item);
            }
            if (currentStory.hasOwnProperty("requiredItem")) {
                if (!inventory.contains(currentStory.requiredItem)) {
                    gameOver();
                }
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
            if (actions[i].hasOwnProperty("attackEnemy")) {
                actions[i].attackEnemy.takeDamage(player.attack);
                actions[i].attackEnemy.checkIsDead();
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
    player.showStats();
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
    <h1>Contact Us</h1>
    <form onsubmit="return sendMail(this);" method="POST">
        <div>
            <label for="name">Name<span class="required-icon"></span></label>
            <input class="contact-input" type="text" name="name" id="name" placeholder="Enter your name" required>
        </div>
        <div>
            <label for="email">Email<span class="required-icon"></span></label>
            <input class="contact-input" type="email" name="email" id="email" placeholder="Enter your email" required>
        </div>
        <div>
            <label for="description">Message<span class="required-icon">*</span></label>
            <textarea class="contact-input" name="description" id="description" rows="6" placeholder="Enter your message" required></textarea>
        </div>
        <div>
            <button class="contact-btn" type="submit" aria-label="Submit the contact form">Send</button>
        </div>
    </form>
    `;
});
