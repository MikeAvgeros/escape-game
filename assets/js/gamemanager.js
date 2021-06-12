/* jshint esversion: 8 */

import {player, getStory} from './story.js';

// all my global variables

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
const playerHealth = document.getElementById("health-icon");
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

/**
 * the rooms are basically the chapters of the story. 
 * They take a name, which displays at the top, an image and an id, which is used for when you change a room.
 */

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

// changes the width property of the red background on the health bar

function calculateHealthWidth() {
    healthBarWidth = (player.health / maxHealth) * 100;
    root.style.setProperty('--width', healthBarWidth + "%");
}

/**
 * Loads the content of each story node from the story.js file. It displays the text, images and actions.
 * It also checks for any special keywords that I have added in the properties using if statements and displays relevant results.
 */

function loadScene() {
    paragraph.textContent = "";
    setTimeout(() => {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].innerText = "";
            buttons[i].style.pointerEvents = "none";
        }
    }, 500);
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
    }, 25);
    actions = currentStory.actions;
    if (currentStory.hasOwnProperty("enemy")) {
        currentStory.enemy.showImage();
        currentStory.enemy.showName();
        player.takeDamage(currentStory.enemy.attack);
        displayDamage();
        player.checkIsDead();
        if (player.isDead) {
            displayGameOver();
        }
    }
    if (currentStory.hasOwnProperty("fadeImage")) {
        fadeImage();
    }
    switch (true) {
        case (currentStory.hasOwnProperty("requiredItemScene")):
            if (!inventory.includes(currentStory.requiredItem)) {
                player.health = 0;
                displayGameOver();
            } else {
                displayNextScene();
            }
        break;
        case (currentStory.hasOwnProperty("gameOver")):
            displayGameOver();
        break;
        case (currentStory.hasOwnProperty("nextRoom")):
            displayNextRoom();
        break;
        default:
            displayActions();
    }
}

//handles showing the buttons with the corresponding actions

function displayActions() {
    if(!finishedTyping) {
       setTimeout(displayActions, 100); 
    } else {
        fadeInButtons();
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].innerText = actions[i].text;
            buttons[i].style.pointerEvents = "auto";
        }
    }
}

//displays the player's health points in the health bar

function displayDamage() {
    if(!finishedTyping) {
        setTimeout(displayDamage, 100); 
    } else {
        flashIcon(playerHealth);
        calculateHealthWidth();
    }
}

// displays the gameover popup

function displayGameOver() {
    if(!finishedTyping) {
        setTimeout(displayGameOver, 600); 
    } else {
        finishedTyping = false;
        gameOver();
    }
}

// displays the next scene in the story.js file

function displayNextScene() {
    if(!finishedTyping) {
        setTimeout(displayNextScene, 100); 
    } else {
        fadeOutButtons();
        storyId = currentStory.requiredItemScene;
        finishedTyping = false;
        loadScene(roomId, storyId);
    }
}

//displays the room in the story.js file

function displayNextRoom() {
    if(!finishedTyping) {
        setTimeout(displayNextRoom, 100); 
    } else {
        fadeOutButtons();
        roomId = currentStory.nextRoom;
        finishedTyping = false;
        changeRoom();
    }
}

/**
 * Registers the player's choice and displays a result depending on the properties of that action in my story.js file. 
 * That is being achieved using a large switch statement which checks the properties for keywords.
 */

function handleActionClicks() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].removeEventListener("click", onClick[i]);
        onClick[i] = () => {
            if (!finishedTyping) {
                clearInterval(typeWriter);
            } 
            switch (true) {
                case (actions[i].hasOwnProperty("nextScene")):
                    switch (true) {
                        case (actions[i].hasOwnProperty("item")):
                            inventory.push(actions[i].item);
                            flashIcon(inventoryInfo);
                            storyId = actions[i].nextScene;
                            finishedTyping = false;
                            fadeOutButtons();
                            loadScene(roomId, storyId);
                        break;
                        case (actions[i].hasOwnProperty("weapon")):
                            actions[i].weapon.updateStats(player);
                            calculateHealthWidth();
                            storyId = actions[i].nextScene;
                            finishedTyping = false;
                            fadeOutButtons();
                            loadScene(roomId, storyId);
                        break;
                        case (actions[i].hasOwnProperty("attackEnemy")):
                            actions[i].attackEnemy.takeDamage(player.attack);
                            actions[i].attackEnemy.checkIsDead();
                            if (actions[i].attackEnemy.isDead) {
                                storyId = actions[i].nextSceneAfterKill;
                                finishedTyping = false;
                                fadeOutButtons();
                                fadeImage();
                                loadScene(roomId, storyId);
                            }
                            else {
                                storyId = actions[i].nextScene;
                                finishedTyping = false;
                                fadeOutButtons();
                                loadScene(roomId, storyId);
                            }
                        break;
                        case (actions[i].hasOwnProperty("removedItem")):
                            inventory = inventory.filter((item) => {
                                return item.name !== actions[i].removedItem.name;
                            });
                            storyId = actions[i].nextScene;
                            finishedTyping = false;
                            fadeOutButtons();
                            loadScene(roomId, storyId);
                        break;
                        default:
                            storyId = actions[i].nextScene;
                            finishedTyping = false;
                            fadeOutButtons();
                            loadScene(roomId, storyId);
                    }
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
                    switch (true) {
                        case (actions[i].hasOwnProperty("weapon")):
                            actions[i].weapon.updateStats(player);
                            calculateHealthWidth();
                            roomId = actions[i].nextRoom;
                            finishedTyping = false;
                            fadeOutButtons();
                            changeRoom();
                        break;
                        default:
                            roomId = actions[i].nextRoom;
                            finishedTyping = false;
                            fadeOutButtons();
                            changeRoom();
                    } 
                break;
                case (actions[i].hasOwnProperty("reload")):
                    finishedTyping = false;
                    setTimeout(() => {
                        location.reload();
                    }, 50); 
                break;
                default:
                    storyId = actions[i].nextScene;
                    finishedTyping = false;
                    fadeOutButtons();
                    loadScene(roomId, storyId);
            }
        };
        buttons[i].addEventListener("click", onClick[i]);
    }
}

// fades out the buttons

function fadeOutButtons() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("fadein");
        buttons[i].classList.add("fadeout");
    }
}

// fades in the buttons

function fadeInButtons() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("fadeout");
        buttons[i].classList.add("fadein");
    }
}

// fades the image

function fadeImage() {
    roomImage.classList.add("fade");
    roomName.classList.add("fade");
        setTimeout(() => {
            roomImage.classList.remove("fade");
            roomName.classList.remove("fade");
    }, 1000);
}

function flashIcon(icon) {
    icon.classList.add("flash");
        setTimeout(() => {
            icon.classList.remove("flash");
    }, 1000);
}

// starts the game. sets roomid and storyid to 1, which is the starting point

function startGame() {
    roomId = 2;
    storyId = 3;
    textContainer.appendChild(paragraph);
    loadScene();
    handleActionClicks(); 
    fadeImage();
}

//changes room. sets story id to 1 so that you start at the beginning of the room

function changeRoom() {
    setTimeout(() => {
        textContainer.appendChild(paragraph);
        storyId = 1;
        loadScene();
        fadeImage();
    }, 250);
}

/**
 * set the player's name based on the player's input.
 * retrieves the story from story.js and assigns it to the story variable including the player's name and starts the game
 * closes the modal and overlay
 */

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

// updates the health bar and starts a new game when clicked 

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
        player.health = 100;
        calculateHealthWidth();
        startGame();
    });
}

//handles the gameover popup

function gameOver() {
    if (!modal.classList.contains("open")) {
        modal.classList.add("open");
    }
    if (!overlay.classList.contains("open")) {
        overlay.classList.add("open");
    }
    modal.innerHTML = `
    <h1>GAME OVER</h1> 
    <p>Press New Game to restart</p>
    <div id="new-game">
        <button id="restart" aria-label="Restart the game">New Game</button>
    </div>
    `;
    newGameButton();
}

// displays the modals and changes the innerHTML to display the contact form

contact.addEventListener("click", () => {
    if (!modal.classList.contains("open")) {
        modal.classList.add("open");
    }
    if (!overlay.classList.contains("open")) {
        overlay.classList.add("open");
    }
    modal.innerHTML = `
    <div id="heading">
        <h1>Contact Us</h1>
        <span id="close-btn" aria-label="Close modal" >&times;</span>
    </div>
    <form id="contact-form" onsubmit="return sendMail(this);" method="POST">
        <div class="contact-input">
            <label for="name" aria-label="Enter your name">Name<span class="required-icon"></span></label>
            <input type="text" name="name" id="name" placeholder="Enter your name" required>
        </div>
        <div class="contact-input">
            <label for="email" aria-label="Enter your email">Email<span class="required-icon"></span></label>
            <input type="email" name="email" id="email" placeholder="Enter your email" required>
        </div>
        <div class="contact-input">
            <label for="message" aria-label="Enter your message">Message<span class="required-icon"></span></label>
            <textarea name="message" id="message" rows="6" placeholder="Enter your message" required></textarea>
        </div>
        <div>
            <button id="contact-btn" type="submit" aria-label="Submit the contact form">Submit</button>
        </div>
    </form>
    `;
    const closeContact = document.getElementById("close-btn");
    closeContact.addEventListener("click", () => {
        if (modal.classList.contains("open")) {
            modal.classList.remove("open");
        } 
        if (overlay.classList.contains("open")) {
            overlay.classList.remove("open");
        } 
    });
});

// handles opening the stats and show all the info

playerInfo.addEventListener("click", () => {
    player.showStats();
});

//handles opening the items list and show all the items

inventoryInfo.addEventListener("click", () => {
    if (!modal.classList.contains("open")) {
        modal.classList.add("open");
    }
    if (!overlay.classList.contains("open")) {
        overlay.classList.add("open");
    }
    let list = document.createElement("ol");
    let listItems = "";
    for (let item of inventory) {
        listItems += `<li>${item.name.charAt(0).toUpperCase() + item.name.slice(1)}</li>`;
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
        <span id="close-btn" aria-label="Close modal">&times;</span>
    </div>
    `;
    modal.appendChild(list);
    const closeContact = document.getElementById("close-btn");
    closeContact.addEventListener("click", () => {
        if (modal.classList.contains("open")) {
            modal.classList.remove("open");
        } 
        if (overlay.classList.contains("open")) {
            overlay.classList.remove("open");
        } 
    });
});
