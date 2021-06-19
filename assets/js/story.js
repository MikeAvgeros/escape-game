/* jshint esversion: 8 */

// instantiates the player

export const player = new Player("", 100, 50, 30);

/**
 * the scenes are basically the chapters of the story. 
 * They take a name, which displays at the top, an image and an id, which is used for when you change a scene.
*/

const sceneImg = {
    1: "./assets/img/tutorial.jpg",
    2: "./assets/img/biotech.jpg",
    3: "./assets/img/trainstation.jpg",
    4: "./assets/img/nightclub.jpg",
    5: "./assets/img/hideout.jpg"
};

export const scenes = {
    1: new Scene("Tutorial", sceneImg[1], 1),
    2: new Scene("GenTech HQ", sceneImg[2], 2),
    3: new Scene("Train Station", sceneImg[3], 3),
    4: new Scene("Night Club", sceneImg[4], 4),
    5: new Scene("Hideout", sceneImg[5], 5)
};

// instantiates all the items the player will encounter in the story

const items = {
    vest: new Item("Bulletproof Vest"),
    card: new Item("Membership Card")
};

// instantiates all the weapons the player will encounter in the story

const weapons = {
    spray: new Weapon("bio healing spray", 30, 0, 0)
};

// sets the image paths for the enemies

const enemyImg = {
    intruder: "./assets/img/intruder.jpg",
    thief: "./assets/img/thief.jpg",
    protester: "./assets/img/protester.jpg"
};

// instantiates all the enemies the player will encounter in the story

const enemies = {
    intruder: new Enemy("Intruder", 80, 40, 20, enemyImg.intruder),
    thief: new Enemy("Thief", 70, 40, 20, enemyImg.thief),
    protester: new Enemy("Protester", 70, 40, 20, enemyImg.protester)
};

// exports the entire story of the game

export function getStory(player) {
    return {
        1: [
            {
                id: 1,
                text: `Welcome ${player.name}! To play the game, you need to follow the story and choose your desired action when prompted. Each choice will lead to a different outcome in the story. Be careful as some choices may lead to your untimely death. Are you ready to play or would you like to learn more?`,
                actions: [
                    {
                        text: "Play game",
                        nextScene: 2
                    },
                    {
                        text: "Learn more",
                        nextNode: 2
                    }
                ]
            },
            {
                id: 2,
                text: `You can view your stats by clicking on the info icon above the image. You can see your health bar next to the info icon. Pay attention to it as it could lead to a game over. You can open your item list anytime to view any items you have collected along the way by clicking on the bag icon on top of the image.`,
                actions: [
                    {
                        text: "Play game",
                        nextScene: 2
                    },
                    {
                        text: "Learn more",
                        nextNode: 3
                    }
                ]
            },
            {
                id: 3,
                text: `You can contact the developer by clicking on the message icon and completing the form. You can also view their Github, LinkedIn and Facebook profile by clicking on the relevant icons. You can find these icons on the page's footer. Would you like to play the game or repeat the tutorial?`,
                actions: [
                    {
                        text: "Play game",
                        nextScene: 2
                    },
                    {
                        text: "Repeat tutorial",
                        nextNode: 1
                    }
                ]
            }
        ],
        2: [
            {
                id: 1,
                text: `The year is 2054 and bio hacking has allowed humans to evolve beyond the physical limitations of their bodies. GenTech, a large corporation owned by the government, controls 90% of all gene editing operations. The headquarters are in Cyber City, the financial capital of the world. You are a security guard at GenTech HQ, born and bred in Cyber City.`,
                actions: [
                    {
                        text: "Continue story",
                        nextNode: 2
                    },
                    {
                        text: "Quit game",
                        reload: true
                    }
                ]
            },
            {
                id: 2,
                text: `You had a long day at work and it's getting late. Your colleague looks at you and says "Hey ${player.name}, you look tired, you should go home. Tomorrow will be a tough day. The CEO is visiting HQ and tensions with the protesters are rising. I guess not everyone appreciates what we do here." But, you have a bad feeling. Something is not right. What do you want to do?`,
                actions: [
                    {
                        text: "Go home",
                        nextScene: 3
                    },
                    {
                        text: "Stay at work",
                        nextNode: 3
                    }
                ]
            },
            {
                id: 3,
                text: `You decide to stay at work. Another hour passes. Everything seems quiet. You watch the news and hear about the protests against bio-enhanced humans. All of a sudden, all the lights in the building go off. You try to use the phones but they are unresponsive.`,
                actions: [
                    {
                        text: "Investigate",
                        nextNode: 13
                    },
                    {
                        text: "Remain at your desk",
                        nextNode: 11
                    }
                ]
            },
            {
                id: 4,
                text: `You go to the basement to check what is going on. It appears that someone has tampered with the system and destroyed the backup generator. You then hear a strange noise from the adjacent room.`,
                actions: [
                    {
                        text: "Investigate",
                        nextNode: 5
                    },
                    {
                        text: "Return to your post",
                        nextNode: 7
                    }
                ]
            },
            {
                id: 5,
                text: `As you are inspecting the room, an intruder appears, takes out his gun and fires 2 bullets at you.
                            `,
                requiredItem: items.vest,
                requiredItemScene: 14,
                enemy: enemies.intruder,
                fadeImage: true,
                actions: [
                    {
                        text: ""
                    },
                    {
                        text:""
                    }
                ]
            },
            {
                id: 6,
                text: `"Please spare my life. I have a family." you say and give him what he wants. He then proceeds to tie you with handcuffs to the door as he storms towards the lab.`,
                actions: [
                    {
                        text: "Call for help",
                        nextNode: 12
                    },
                    {
                        text: "Stay silent",
                        nextNode: 11
                    }
                ]
            },
            {
                id: 7,
                text: `You return to your post. Your colleague says "What is going on? Shall we call for backup?"`,
                actions: [
                    {
                        text: "We have an intruder",
                        nextNode: 8
                    },
                    {
                        text: "Everything is fine",
                        nextNode: 11
                    }
                ]
            },
            {
                id: 8,
                text: `You immediately call the police and explain the situation. The police arrives at the scene shortly after and apprehends the intruders. It appears they were part of an anti-enhancement organization who wanted to sabotage GenTech.`,
                actions: [
                    {
                        text: "Go home",
                        nextScene: 3
                    },
                    {
                        text: "Stay at work",
                        response: `${player.name}'s inner voice: "It's probably a good idea to go home after everything that happened."`
                    }
                ]
            },
            {
                id: 9,
                text: `You attack the intruder. He seems wounded but he is still standing. He stands up and attacks you again.`,
                enemy: enemies.intruder,
                actions: [
                    {
                        text: "Attack again",
                        attackEnemy: enemies.intruder,
                        nextNode: 9,
                        nextNodeAfterKill: 10
                    },
                    {
                        text: "Run away",
                        escapedEnemy: true,
                        nextNode: 7
                    }
                ]
            },
            {
                id: 10,
                text: `You have successfully apprehended the intruder and his gang. The police arrive at the scene and you explained what happened. It appears they were part of an anti-enhancement organization who wanted to sabotage GenTech. What do you want to do next?`,
                actions: [
                    {
                        text: "Go home",
                        nextNode: 15
                    },
                    {
                        text: "Stay at work",
                        response: `${player.name}'s inner voice: "It's probably a good idea to go home after everything that happened tonight."`
                    }
                ]
            },
            {
                id: 11,
                text: `The intruders manage to sneak into the building undetected and one by one killed all the guards. They stormed into the lab and destroyed all the research. GenTech is finished.
                            `,
                gameOver: true,
                actions: [
                    {
                        text: ""
                    },
                    {
                        text:""
                    }
                ]
            },
            {
                id: 12,
                text: `Another security guards comes to the rescue. He unties you and says "What is going on? Shall we call for backup?".`,
                actions: [
                    {
                        text: "We have an intruder",
                        nextNode: 8
                    },
                    {
                        text: "Everything is fine",
                        nextNode: 11
                    }
                ]
            },
            {
                id: 13,
                text: `You are thinking of wearing a ${items.vest.name.toLowerCase()} in case you get attacked. However, there is only one available and you do not want to leave your colleague unprotected. What do you want to do?`,
                actions: [
                    {
                        text: "Wear it",
                        item: items.vest,
                        nextNode: 4
                    },
                    {
                        text: "Leave it",
                        nextNode: 4
                    }
                ]
            },
            {
                id: 14,
                text: `The bullets luckily hit your vest and only throw you to the ground with minor wounds. The intruder leaves the gun and starts punching you. He shouts "Give me the keycard to the lab or else you are dead."`,
                enemy: enemies.intruder,
                actions: [
                    {
                        text: "Attack him",
                        attackEnemy: enemies.intruder,
                        nextNode: 9,
                        nextNodeAfterKill: 10
                    },
                    {
                        text: "Do what he says",
                        nextNode: 6
                    }
                ]
            },
            {
                id: 15,
                text: `Before I leave, I should probably do something about my wounds. I should use some ${weapons.spray.name} to heal my wounds and add ${weapons.spray.health} points to my health.`,
                actions: [
                    {
                        text: "Use the spray",
                        weapon: weapons.spray,
                        nextNode: 16
                    },
                    {
                        text: "Don't use the spray",
                        nextNode: 16
                    }
                ]
            },
            {
                id: 16,
                text: `Would you like to continue wearing the ${items.vest.name.toLowerCase()} or leave it?`,
                actions: [
                    {
                        text: "Keep it",
                        nextScene: 3
                    },
                    {
                        text: "Leave it",
                        nextScene: 3,
                        removedItem: items.vest
                    }
                ]
            }
        ],
        3: [
            {
                id: 1,
                text: `You decide to leave your work. You are about to take the train home. Outside the train station, a weird-looking old man, who appears to be enhanced, approaches you and asks if you can give him some money.`,
                actions: [
                    {
                        text: "Ignore him",
                        nextNode: 2
                    },
                    {
                        text: "Give him money",
                        nextNode: 3
                    }
                ]
            },
            {
                id: 2,
                text: `Disheartened, the old man walks away as he whispers "You deserve what's coming". As you enter the station, suddenly everything turns quiet. You see a shift in the shadows to your right. You feel something is not right.`,
                actions: [
                    {
                        text: "Start running",
                        nextNode: 5
                    },
                    {
                        text: "Look to your right",
                        nextNode: 4
                    }
                ]
            },
            {
                id: 3,
                text: `The old man warns you to turn back. He tells you there is great danger ahead. Someone who knows where you work, wants to steal your keycard to the lab. He plans to attack GenTech tonight and you are his way in.`,
                actions: [
                    {
                        text: "Ignore him",
                        nextNode: 2
                    },
                    {
                        text: "Turn back",
                        nextNode: 6
                    }
                ]
            },
            {
                id: 4,
                text: `A shadowy figure suddenly jumps at you and forcefully throws you to the ground. "Give me your wallet and keycard", he shouts and starts punching you.`,
                enemy: enemies.thief,
                fadeImage: true,
                actions: [
                    {
                        text: "Attack him",
                        attackEnemy: enemies.thief,
                        nextNode: 9,
                        nextNodeAfterKill: 10
                    },
                    {
                        text: "Do what he says",
                        nextNode: 7
                    }
                ]
            },
            {
                id: 5,
                text: `As you panic and start to run, you accidentally trip and fall on the floor. A shadowy figure suddenly jumps at you and shouts "Give me your wallet and keycard" and starts punching you.`,
                enemy: enemies.thief,
                fadeImage: true,
                actions: [
                    {
                        text: "Attack him",
                        attackEnemy: enemies.thief,
                        nextNode: 9
                    },
                    {
                        text: "Do what he says",
                        escapedEnemy: true,
                        nextNode: 7
                    }
                ]
            },
            {
                id: 6,
                text: "You walk away from the train station and escape the danger that's lurking in the shadows. What do you do next?",
                actions: [
                    {
                        text: "Walk home",
                        response: `${player.name}'s inner voice: "I should probably thank the old man."`
                    },
                    {
                        text: "Thank the old man",
                        nextNode: 8
                    }
                ]
            },
            {
                id: 7,
                text: "The thief punches you in the face and takes your wallet and keycard and leaves you on the ground.",
                enemy: enemies.thief,
                actions: [
                    {
                        text: "Follow the thief",
                        escapedEnemy: true,
                        nextScene: 5
                    },
                    {
                        text: "Find the old man",
                        nextNode: 11
                    }
                ]
            },
            {
                id: 8,
                text: `You thank the old man for the warning. He takes a liking at you and gives you a ${items.card.name.toLowerCase()} with an address on it. He tells you that GenTech is in danger and you can find answers in this place.`,
                actions: [
                    {
                        text: "Ignore it",
                        response: `${player.name}'s inner voice: "If he is right, I shouldn't ignore it. It could jeopardice our operation."`
                    },
                    {
                        text: "Take the card",
                        item: items.card,
                        nextNode: 13
                    }
                ]
            },
            {
                id: 9,
                text: `You attack the thief. He seems wounded but he is still standing. He stands up and attacks you again.`,
                enemy: enemies.thief,
                actions: [
                    {
                        text: "Attack again",
                        attackEnemy: enemies.thief,
                        nextNode: 9,
                        nextNodeAfterKill: 10
                    },
                    {
                        text: "Run away",
                        escapedEnemy: true,
                        nextNode: 12
                    }
                ]
            },
            {
                id: 10,
                text: `You have successfully disabled the thief and called the police. The police arrive swiftly and apprehend him. "GenTech will burn to the ground" he says as he's being taken. What do you want to do next?`,
                actions: [
                    {
                        text: "Walk home",
                        response: `${player.name}'s inner voice: "I should probably find the old man. He knew something about my attacker and his connection to GenTech."`
                    },
                    {
                        text: "Find the old man",
                        nextNode: 11
                    }
                ]
            },
            {
                id: 11,
                text: `You managed to find the old man. You ask him for answers. He looks at you with a cold stare and gives you a ${items.card.name.toLowerCase()} with an address on it. He tells you that GenTech is in danger and you can find answers in this location.`,
                actions: [
                    {
                        text: "Ignore it",
                        response: `${player.name}'s inner voice: "If he is right, I shouldn't ignore it. It could jeopardice our operation or something much worse."`
                    },
                    {
                        text: "Take the card",
                        item: items.card,
                        nextNode: 13
                    }
                ]
            },
            {
                id: 12,
                text: `You managed to escape the attacker. As you walk away from the train station, the old man appears in front of you again. You ask him for answers and he gives you a ${items.card.name.toLowerCase()}. He tells you that your company is in danger and you can find answers if you go to this place.`,
                actions: [
                    {
                        text: "Ignore it",
                        response: `${player.name}'s inner voice: "If he is right, I shouldn't ignore it. It could jeopardice our operation."`
                    },
                    {
                        text: "Take the card",
                        item: items.card,
                        nextNode: 13
                    }
                ]
            },
            {
                id: 13,
                text: `You decide to take the ${items.card.name.toLowerCase()} and go to that address tonight to find out what is going on and who wants to attack GenTech and why.
                            `,
                nextScene: 4,
                actions: [
                    {
                        text: ""
                    },
                    {
                        text: ""
                    }
                ]
            }
        ],
        4: [
            {
                id: 1,
                text: `You arrive at the location shown in the card. It's a night club for enhanced individuals. This part of town is quite dangerous. I don't know why someone would help me at a place like this. What shall you do with the card?`,
                actions: [
                    {
                        text: "Keep it",
                        nextNode: 2
                    },
                    {
                        text: "Throw it",
                        nextNode: 2,
                        removedItem: items.card
                    }
                ]
            },
            {
                id: 2,
                text: `You get to the entrance. The bouncer looks at you suspiciously and says "Hmm, I've never seen you in here before. You don't look enhanced. Are you a member?".`,
                actions: [
                    {
                        text: "Yes",
                        nextNode: 3
                    },
                    {
                        text: "No",
                        nextNode: 4
                    }
                ]
            },
            {
                id: 3,
                text: `"Huh, OK then, follow me" the bouncer says. He takes you to the back entrance of the night club. Another person appears in front of you and asks for your ${items.card.name.toLowerCase()}.`,
                requiredItem: items.card,
                actions: [
                    {
                        text: "Show the card",
                        nextNode: 5
                    },
                    {
                        text:"I don't have it",
                        nextNode: 4
                    }
                ]
            },
            {
                id: 4,
                text: `"This is a member's only club. You do not belong here. Are you one of them?" the bouncer shouts. He then grabs you with his bionic arm and throws you out. 
                            `,
                gameOver: true,
                actions: [
                    {
                        text: ""
                    },
                    {
                        text:""
                    }
                ]
            },
            {
                id: 5,
                text: `You show the card and enter the night club. You notice it is filled with enhanced individuals, a lot of them wanted criminals. At the bar, you see a familiar face. It's your neighbour, Samantha. "She's strange but she may have some info".`,
                actions: [
                    {
                        text: "Say hi",
                        nextNode: 6
                    },
                    {
                        text: "Look for info",
                        nextNode: 7
                    }
                ]
            },
            {
                id: 6,
                text: `"I didn't expect to see you at a place like this, ${player.name}" Samantha says.`,
                actions: [
                    {
                        text: "I need info",
                        nextNode: 8
                    },
                    {
                        text: "I came for a drink",
                        response: `You don't seem the kind of guy who would hang out at a place like this. So tell me, what are you really doing here?" Samantha says with a smile on her face.`
                    }
                ]
            },
            {
                id: 7,
                text: `You go around the club and you ask if anyone knows about the anti-enhancement protesters and an impeding attack at GenTech. A strange looking guy approaches you and asks "Who are you? What do you know about GenTech?"`,
                actions: [
                    {
                        text: "I work there",
                        nextNode: 11
                    },
                    {
                        text: "Who are you?",
                        nextNode: 12
                    }
                ]
            },
            {
                id: 8,
                text: `You play a dangerous game ${player.name}. GenTech is not what you think they are. They are hiding many secrets, secrets that could end the world. I can't give you any information but I know someone who would.`,
                actions: [
                    {
                        text: "Who is it?",
                        nextNode: 9
                    },
                    {
                        text: "Walk away",
                        nextNode: 7
                    }
                ]
            },
            {
                id: 9,
                text: "His name is Jack. He runs an auto-repair shop for mechs. Be careful though, he doesn't trust GenTech so do not tell him you work there. He might end up killing you.",
                actions: [
                    {
                        text: "Where is he?",
                        nextNode: 10
                    },
                    {
                        text: "Walk away",
                        nextNode: 7
                    }
                ]
            },
            {
                id: 10,
                text: "He likes to play hide and seek in his little hideout with his gang when they are not in the street protesting. When you get there, just tell him Samantha sent you his way. He trusts me. Or at least I think he does.",
                actions: [
                    {
                        text: "Find Jack",
                        nextScene: 5
                    },
                    {
                        text: "Stay in the club",
                        response: `${player.name}'s inner voice: "There's no point staying in the club now that I have found what I came here for."`
                    }
                ]
            },
            {
                id: 11,
                text: "Hmm, so you are GenTech's lackey, huh? All I know is that there's a storm coming. A shadow organization wants to take down GenTech. They fear the future. My wife would have lost her life if it wasn't for GenTech. I know they like to hang out at their little hideout near the river. I can give you an address",
                actions: [
                    {
                        text: "Find the hideout",
                        nextScene: 5
                    },
                    {
                        text: "Stay in the club",
                        response: `${player.name}'s inner voice: "There's no point staying in the club now that I have found what I came here for."`
                    }
                ]
            },
            {
                id: 12,
                text: `"Who I am is none of your business." the man says with an angry look on his face. Two other dangerous-looking men come his way.`,
                actions: [
                    {
                        text: "I work there",
                        nextNode: 11
                    },
                    {
                        text: "Evade his question",
                        nextNode: 13
                    }
                ]
            },
            {
                id: 13,
                text: "Ok, fair enough, you don't have to tell me anything. I don't care what your business is with them. Truth is, I never liked them. I know they like to hang out at their little hideout near the river. I can give you an address.",
                actions: [
                    {
                        text: "Find the hideout",
                        nextScene: 5
                    },
                    {
                        text: "Stay in the club",
                        response: `${player.name}'s inner voice: "There's no point staying in the club now that I have found what I came here for."`
                    }
                ]
            }
        ],
        5: [
            {
                id: 1,
                text: "You have successfully found the protesters' hideout. A scrappy old junkyard full of broken bio engineering tools and machinery. As you approach carefully, you hear someone coming your way. It's one of the protesters.",
                actions: [
                    {
                        text: "Hide",
                        nextNode: 2
                    },
                    {
                        text: "Show up",
                        nextNode: 3
                    }
                ]
            },
            {
                id: 2,
                text: "You decide to hide behind some metal planks. The unsuspecting protester walks past you. You continue to explore their hideout and you find a control room full of computer and telecommunications equipment.",
                actions: [
                    {
                        text: "Go in",
                        nextNode: 4
                    },
                    {
                        text: "Go back",
                        response: "As you try to leave, you hear more people coming your way. The only way to escape is to hide in their control room."
                    }
                ]
            },
            {
                id: 3,
                text: `The protester finds you. "Who are you and what are you doing here?" she says and starts attacking you.`,
                enemy: enemies.protester,
                actions: [
                    {
                        text: "Attack her",
                        attackEnemy: enemies.protester,
                        nextNode: 8
                    },
                    {
                        text: "I surrender",
                        nextNode: 7
                    }
                ]
            },
            {
                id: 4,
                text: "You enter the control room. Inside, you find information on how and when they plan to attack GenTech. It appears they have hacked into GenTech's system and stolen our data. You unplug the hard drive from the computer and take it with you as proof.",
                actions: [
                    {
                        text: "Escape",
                        nextNode: 9
                    },
                    {
                        text:"Investigate more",
                        nextNode: 11
                    }
                ]
            },
            {
                id: 7,
                text: `You have surrendered to the gang. They start questioning you and once they realise you are working for GenTech, they decide to kill you.
                            `,
                gameOver: true,
                actions: [
                    {
                        text: ""
                    },
                    {
                        text:""
                    }
                ]
            },
            {
                id: 8,
                text: `You attack the protester. She seems wounded but she is still standing. She stands up and attacks you again.`,
                enemy: enemies.protester,
                actions: [
                    {
                        text: "Attack again",
                        attackEnemy: enemies.protester,
                        nextNode: 8,
                        nextNodeAfterKill: 10
                    },
                    {
                        text: "Run away",
                        escapedEnemy: true,
                        nextNode: 9
                    }
                ]
            },
            {
                id: 9,
                text: `As you try to escape, you get found and apprehended. They start questioning you and once they realise you are working for GenTech, they decide to kill you.
                                `,
                gameOver: true,
                actions: [
                    {
                        text: ""
                    },
                    {
                        text:""
                    }
                ]
            },
            {
                id: 10,
                text: "You managed to disable the protester and tie her with some chains you found on the ground. You put a tape over her mouth to avoid signaling others. You continue to explore their hideout and you find a control room full of computer and telecommunications equipment.",
                actions: [
                    {
                        text: "Go in",
                        nextNode: 4
                    },
                    {
                        text: "Go back",
                        response: "As you try to leave, you hear more protesters coming your way. The only way to escape is to hide in their control room."
                    }
                ]
            },
            {
                id: 11,
                text: `As you continue your investigation, you get found and apprehended. One of the protester's says "We can't have you going around asking questions."
                                `,
                toBeContinued: true,
                actions: [
                    {
                        text: ""
                    },
                    {
                        text:""
                    }
                ]
            }
        ]
    };
}
