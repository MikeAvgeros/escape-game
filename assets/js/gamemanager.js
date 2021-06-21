/* jshint esversion: 8 */

// importing the function getStory and variable player from story.js 

import {player, scenes, getStory} from './story.js';

// all my global variables

const textContainer = document.getElementById("scene-text");
const paragraph = document.createElement("p");
const textContainerChild = document.createElement("div");
const anotherParagraph = document.createElement("p");
const revealBtn = document.createElement("button");
const buttons = document.getElementsByClassName("action-button");
const roomImage = document.getElementById("scene-img");
const roomName = document.getElementById("scene-name");
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

let sceneId;
let nodeId;
let currentScene;
let currentSceneNode;
let actions;
let finishedTyping = false;
let typeWriter;
let onClick = [];
let inventory = [];
let healthBarWidth;
let story;

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
    removeExistingContent();
    setCurrentScene();
    showText();
    checkSceneProperties();
}

// removes text content from the paragraph of the text container and the buttons

function removeExistingContent() {
    paragraph.textContent = "";
    anotherParagraph.textContent = "";
    setTimeout(() => {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].innerText = "";
            buttons[i].style.pointerEvents = "none";
        }
    }, 100);
}

/**
 * sets the current scene from the story based on the variable sceneId 
 * sets the current actions from the story based on the actions property of the current scene
*/

function setCurrentScene() {
    currentScene = scenes[sceneId];
    currentScene.showName();
    currentScene.showImage();
    currentSceneNode = story[currentScene.id].find(currentSceneNode => currentSceneNode.id === nodeId);
    actions = currentSceneNode.actions;
}

// displays the text and reveal button on the text container

function showText() {
    let c = 0;
    typeWriter = setInterval(() => {
        paragraph.textContent += currentSceneNode.text.charAt(c++);
        finishedTyping = false;
        if (c > currentSceneNode.text.length) {
            finishedTyping = true;
            clearInterval(typeWriter);
        }
    }, 50);
    revealBtn.addEventListener("click", () => {
        if (!finishedTyping) {
            finishedTyping = true;
            clearInterval(typeWriter);
        }
        paragraph.textContent = "";
        paragraph.textContent = currentSceneNode.text;
    }, {once: true});
}

// checks the properties of the current scene from the story.js file and calls relevant functions

function checkSceneProperties() {
    if (currentSceneNode.hasOwnProperty("enemy")) {
        currentSceneNode.enemy.showImage();
        currentSceneNode.enemy.showName();
        currentSceneNode.enemy.showHealth(anotherParagraph);
        player.takeDamage(currentSceneNode.enemy.attack);
        displayDamage();
        player.checkIsDead();
        if (player.isDead) {
            setTimeout(displayGameOver, 3000);
        }
    }
    if (currentSceneNode.hasOwnProperty("fadeImage")) {
        fadeImage();
    }
    switch (true) {
        case (currentSceneNode.hasOwnProperty("requiredItem")):
            switch (true) {
                case (!currentSceneNode.hasOwnProperty("requiredItemScene")):
                    if (!inventory.includes(currentSceneNode.requiredItem)) {
                        player.health = 0;
                        setTimeout(displayGameOver, 3000);
                    } else {
                        displayActions();
                    }
                break;
                case (currentSceneNode.hasOwnProperty("requiredItemScene")):
                    if (!inventory.includes(currentSceneNode.requiredItem)) {
                        player.health = 0;
                        setTimeout(displayGameOver, 3000);
                    } else {
                        setTimeout(displayNextNode, 3000);
                    }
                break;
            }
        break;
        case (currentSceneNode.hasOwnProperty("nextScene")):
            setTimeout(displayNextScene, 3000);
        break;
        case (currentSceneNode.hasOwnProperty("gameOver")):
            setTimeout(displayGameOver, 3000);
        break;
        case (currentSceneNode.hasOwnProperty("toBeContinued")):
            setTimeout(displayToBeContinued, 3000);
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
        initButtons();
        fadeInButtons();
    }
}

// initializes the buttons with text and enables pointer click events

function initButtons() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerText = actions[i].text;
        buttons[i].style.pointerEvents = "auto";
    }
}

// fades in the buttons

function fadeInButtons() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("fadeout");
        buttons[i].classList.add("fadein");
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

// displays the to be continued popup

function displayToBeContinued() {
    if(!finishedTyping) {
        setTimeout(displayToBeContinued, 600); 
    } else {
        finishedTyping = false;
        toBeContinued();
    }
}

// displays the next scene in the story.js file

function displayNextNode() {
    if(!finishedTyping) {
        setTimeout(displayNextNode, 100); 
    } else {
        fadeOutButtons();
        nodeId = currentSceneNode.requiredItemScene;
        finishedTyping = false;
        loadScene(sceneId, nodeId);
    }
}

//displays the room in the story.js file

function displayNextScene() {
    if(!finishedTyping) {
        setTimeout(displayNextScene, 100); 
    } else {
        fadeOutButtons();
        sceneId = currentSceneNode.nextScene;
        finishedTyping = false;
        changeScene();
    }
}

/**
 * Registers the player's choice and displays a result depending on the properties of that action in my story.js file. 
 * That is being achieved using a large switch statement from the checkActionProperties function which checks the properties for keywords.
*/

function handleActionClicks() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].removeEventListener("click", onClick[i]);
        checkActionProperties(i);
        buttons[i].addEventListener("click", onClick[i]);
    }
}

// checks the properties of the clicked action from the story.js file and calls relevant functions

function checkActionProperties(i) {
    onClick[i] = () => {
        if (!finishedTyping) {
            clearInterval(typeWriter);
        } 
        switch (true) {
            case (actions[i].hasOwnProperty("nextNode")):
                switch (true) {
                    case (actions[i].hasOwnProperty("item")):
                        inventory.push(actions[i].item);
                        flashIcon(inventoryInfo);
                        nodeId = actions[i].nextNode;
                        finishedTyping = false;
                        fadeOutButtons();
                        loadScene(sceneId, nodeId);
                    break;
                    case (actions[i].hasOwnProperty("weapon")):
                        actions[i].weapon.updateStats(player);
                        calculateHealthWidth();
                        nodeId = actions[i].nextNode;
                        finishedTyping = false;
                        fadeOutButtons();
                        loadScene(sceneId, nodeId);
                    break;
                    case (actions[i].hasOwnProperty("attackEnemy")):
                        actions[i].attackEnemy.takeDamage(player.attack);
                        actions[i].attackEnemy.showHealth(anotherParagraph);
                        actions[i].attackEnemy.checkIsDead();
                        if (actions[i].attackEnemy.isDead) {
                            nodeId = actions[i].nextNodeAfterKill;
                            finishedTyping = false;
                            fadeOutButtons();
                            fadeImage();
                            loadScene(sceneId, nodeId);
                        }
                        else {
                            nodeId = actions[i].nextNode;
                            finishedTyping = false;
                            fadeOutButtons();
                            loadScene(sceneId, nodeId);
                        }
                    break;
                    case (actions[i].hasOwnProperty("escapedEnemy")):
                        nodeId = actions[i].nextNode;
                        finishedTyping = false;
                        fadeOutButtons();
                        fadeImage();
                        loadScene(sceneId, nodeId);
                    break;
                    case (actions[i].hasOwnProperty("removedItem")):
                        flashIcon(inventoryInfo);
                        inventory = inventory.filter((item) => {
                            return item.name !== actions[i].removedItem.name;
                        });
                        nodeId = actions[i].nextNode;
                        finishedTyping = false;
                        fadeOutButtons();
                        loadScene(sceneId, nodeId);
                    break;
                    default:
                        nodeId = actions[i].nextNode;
                        finishedTyping = false;
                        fadeOutButtons();
                        loadScene(sceneId, nodeId);
                }
            break;
            case(actions[i].hasOwnProperty("response")):
                paragraph.textContent = "";
                let c = 0;
                typeWriter = setInterval(() => {
                    paragraph.textContent += actions[i].response.charAt(c++);
                    finishedTyping = false;
                    if (c > actions[i].response.length) {
                        finishedTyping = true;
                        clearInterval(typeWriter);
                    }
                }, 50);
                revealBtn.addEventListener("click", () => {
                    if (!finishedTyping) {
                        finishedTyping = true;
                        clearInterval(typeWriter);
                    }
                    paragraph.textContent = "";
                    paragraph.textContent = actions[i].response;
                }, {once: true});
            break;
            case (actions[i].hasOwnProperty("nextScene")):
                switch (true) {
                    case (actions[i].hasOwnProperty("weapon")):
                        actions[i].weapon.updateStats(player);
                        calculateHealthWidth();
                        sceneId = actions[i].nextScene;
                        finishedTyping = false;
                        fadeOutButtons();
                        changeScene();
                    break;
                    case(actions[i].hasOwnProperty("escapedEnemy")):
                        sceneId = actions[i].nextScene;
                        finishedTyping = false;
                        fadeOutButtons();
                        changeScene();
                    break;
                    case (actions[i].hasOwnProperty("removedItem")):
                        flashIcon(inventoryInfo);
                        inventory = inventory.filter((item) => {
                            return item.name !== actions[i].removedItem.name;
                        });
                        sceneId = actions[i].nextScene;
                        finishedTyping = false;
                        fadeOutButtons();
                        changeScene();
                    break;
                    default:
                        sceneId = actions[i].nextScene;
                        finishedTyping = false;
                        fadeOutButtons();
                        changeScene();
                } 
            break;
            case (actions[i].hasOwnProperty("reload")):
                finishedTyping = false;
                setTimeout(() => {
                    location.reload();
                }, 100); 
            break;
            default:
                nodeId = actions[i].nextNode;
                finishedTyping = false;
                fadeOutButtons();
                loadScene(sceneId, nodeId);
        }
    };
}

// fades out the buttons

function fadeOutButtons() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("fadein");
        buttons[i].classList.add("fadeout");
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

// creates a flassing effect on the icon

function flashIcon(icon) {
    icon.classList.add("flash");
        setTimeout(() => {
            icon.classList.remove("flash");
    }, 1000);
}

// starts the game. sets sceneId and nodeId to 1, which is the starting point

function startGame() {
    sceneId = 1;
    nodeId = 1;
    populateTextContainer();
    loadScene();
    handleActionClicks(); 
    fadeImage();
}

// creates all the relevant html elements for the text and adds suitable ids for styling

function populateTextContainer() {
    textContainerChild.setAttribute("id", "bottom-container");
    anotherParagraph.setAttribute("id", "enemy-stats");
    revealBtn.setAttribute("id", "reveal-button");
    textContainer.appendChild(paragraph);
    textContainer.appendChild(textContainerChild);
    textContainerChild.appendChild(anotherParagraph);
    textContainerChild.appendChild(revealBtn);
    revealBtn.textContent = "Reveal Text";
}

//changes room. sets story id to 1 so that you start at the beginning of the room

function changeScene() {
    setTimeout(() => {
        nodeId = 1;
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
            anotherParagraph.textContent = "";
        } 
        player.health = 100;
        calculateHealthWidth();
        inventory = [];
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
    <div id="heading">
        <h1>GAME OVER</h1> 
    </div>
    <div>
        <p>Press New Game to restart</p>
    </div>
    <div id="new-game">
        <button id="restart" aria-label="Restart the game">New Game</button>
    </div>
    `;
    newGameButton();
}

//handles the tobecontinued popup

function toBeContinued() {
    if (!modal.classList.contains("open")) {
        modal.classList.add("open");
    }
    if (!overlay.classList.contains("open")) {
        overlay.classList.add("open");
    }
    modal.innerHTML = `
    <div id="heading">
        <h1>TO BE CONTINUED...</h1> 
    </div>
    <div>
        <p>Press New Game to play again</p>
    </div>
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
    <div id="close-btn">
        <span aria-label="Close modal">&times;</span>
    </div>
    <div>
        <h1>Contact Us</h1>
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
            <input id="contact-btn" type="submit" aria-label="Submit the contact form">Submit</input>
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
        listItems += `<li>${item.name}</li>`;
    }
    if (inventory.length > 0) {
        list.innerHTML = listItems;
    } else {
        list.innerHTML = 
        `
        <p>No items in your list</p>
        `;
    }
    modal.innerHTML = 
    `
    <div id="close-btn">
        <span aria-label="Close modal">&times;</span>
    </div>
    <div>
        <h1>Items List</h1>
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
