import {player, story} from './story.js';

const textContainer = document.getElementById("room-description");
const paragraph = document.createElement("p");
const buttons = document.getElementsByClassName("action-button");
const roomImage = document.getElementById("room-img");
const roomName = document.getElementById("room-name");
const root = document.documentElement;

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
const maxHealth = player.health;

const roomImg = {
    1: "./assets/img/1.jpg",
    2: "./assets/img/2.jpg"
};

const rooms = {
    1: new Room("Gray Room", roomImg[1], 1),
    2: new Room("Skull Room", roomImg[2], 2)
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
            if (currentStory.hasOwnProperty("enemy")) {
                player.takeDamage(currentStory.enemy.attack);
                calculateHealthWidth();
                player.checkIsDead();
            }
            if (actions[i].hasOwnProperty("attackEnemy")) {
                actions[i].attackEnemy.takeDamage(player.attack);
                actions[i].attackEnemy.checkIsDead();
            }
        }
        buttons[i].addEventListener("click", onClick[i]);
    }
}

function fadeButtons() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.add("fade");
        setTimeout(() => {
        buttons[i].classList.remove("fade");
    }, 1000);
    }
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

startGame();
