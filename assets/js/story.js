/* jshint esversion: 8 */

export const player = new Player("", 100, 50, 30);

const items = {
    vest: new Item("bulletproof vest"),
    card: new Item("membership card")
};

const weapons = {
    spray: new Weapon("bio healing spray", 30, 0, 0)
}

const enemyImg = {
    intruder: "./assets/img/intruder.jpg",
    thief: "./assets/img/thief.jpg"
}

const enemies = {
    intruder: new Character("Intruder", 70, 40, 20, enemyImg.intruder),
    thief: new Character("Thief", 70, 40, 20, enemyImg.thief)
};

export function getStory(player) {
    return {
        1: [
            {
                id: 1,
                text: `Welcome ${player.name}! To play the game, you need to follow the story and choose your desired action when prompted. Each choice will lead to a different outcome in the story. Be careful as some choices may lead to your untimely death. Are you ready to play or would you like to learn more?`,
                actions: [
                    {
                        text: "Play game",
                        nextRoom: 2
                    },
                    {
                        text: "Learn more",
                        nextScene: 2
                    }
                ]
            },
            {
                id: 2,
                text: `You can view your stats by clicking on the info icon above the image. You can see your health bar next to the info icon. Pay attention to it as it could lead to a game over. You can open your item list anytime to view any items you have collected along the way by clicking on the bag icon on top of the image.`,
                actions: [
                    {
                        text: "Play game",
                        nextRoom: 2
                    },
                    {
                        text: "Learn more",
                        nextScene: 3
                    }
                ]
            },
            {
                id: 3,
                text: `You can contact the developer by clicking on the message icon and completing the form. You can also view their Github, LinkedIn and Facebook profile by clicking on the relevant icons. You can find these icons on the page's footer. Would you like to play the game or repeat the tutorial?`,
                actions: [
                    {
                        text: "Play game",
                        nextRoom: 2
                    },
                    {
                        text: "Repeat tutorial",
                        nextScene: 1
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
                        nextScene: 2
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
                        nextRoom: 3
                    },
                    {
                        text: "Stay at work",
                        nextScene: 3
                    }
                ]
            },
            {
                id: 3,
                text: `You decide to stay at work. Another hour passes. Everything seems quiet. You watch the news and hear about the protests against bio-enhanced humans. All of a sudden, all the lights in the building go off. You try to use the phones but they are unresponsive.`,
                actions: [
                    {
                        text: "Investigate",
                        nextScene: 13
                    },
                    {
                        text: "Remain at your desk",
                        nextScene: 11
                    }
                ]
            },
            {
                id: 4,
                text: `You go to the basement to check what is going on. It appears that someone has tampered with the system and destroyed the backup generator. You then hear a strange noise from the adjacent room.`,
                actions: [
                    {
                        text: "Investigate",
                        nextScene: 5
                    },
                    {
                        text: "Return to your post",
                        nextScene: 7
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
                        nextScene: 12
                    },
                    {
                        text: "Stay silent",
                        nextScene: 11
                    }
                ]
            },
            {
                id: 7,
                text: `You return to your post. Your colleague says "What is going on? Shall we call for backup?"`,
                actions: [
                    {
                        text: "We have an intruder",
                        nextScene: 8
                    },
                    {
                        text: "Everything is fine",
                        nextScene: 11
                    }
                ]
            },
            {
                id: 8,
                text: `You immediately call the police and explain the situation. The police arrives at the scene shortly after and apprehends the intruders. It appears they were part of an anti-enhancement organization who wanted to sabotage GenTech.`,
                actions: [
                    {
                        text: "Go home",
                        nextRoom: 3
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
                        nextScene: 9,
                        nextSceneAfterKill: 10
                    },
                    {
                        text: "Run away",
                        nextScene: 7
                    }
                ]
            },
            {
                id: 10,
                text: `You have successfully apprehended the intruder and his gang. The police arrive at the scene and you explained what happened. It appears they were part of an anti-enhancement organization who wanted to sabotage GenTech. What do you want to do next?`,
                actions: [
                    {
                        text: "Go home",
                        nextScene: 15
                    },
                    {
                        text: "Stay at work",
                        response: `${player.name}'s inner voice: "It's probably a good idea to go home after everything that happened tonight."`
                    }
                ]
            },
            {
                id: 11,
                text: `The intruders manage to sneak into the building undetected and one by one killed all the guards. They stormed into the lab and destroyed all the research. GenTech is finished.`,
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
                        nextScene: 8
                    },
                    {
                        text: "Everything is fine",
                        nextScene: 11
                    }
                ]
            },
            {
                id: 13,
                text: `You are thinking of wearing a ${items.vest.name} in case you get attacked. However, there is only one available and you do not want to leave your colleague unprotected. What do you want to do?`,
                actions: [
                    {
                        text: "Wear it",
                        item: items.vest,
                        nextScene: 4
                    },
                    {
                        text: "Leave it",
                        nextScene: 4
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
                        nextScene: 9,
                        nextSceneAfterKill: 10
                    },
                    {
                        text: "Do what he says",
                        nextScene: 6
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
                        nextRoom: 3
                    },
                    {
                        text: "Don't use the spray",
                        nextRoom: 3
                    }
                ]
            }
        ],
        3: [
            {
                id: 1,
                text: `You decided to leave work. You are about to take the bus home. At the bus stop, a weird-looking old man, who appears to be enhanced, approaches you and asks if you can give him some money.`,
                actions: [
                    {
                        text: "Ignore him",
                        nextScene: 2
                    },
                    {
                        text: "Give him money",
                        nextScene: 3
                    }
                ]
            },
            {
                id: 2,
                text: `Disheartened, the old man walks away. As you carry on walking, suddenly everything turns quiet. You see a shift in the shadows to your right. You feel something is not right.`,
                actions: [
                    {
                        text: "Start running",
                        nextScene: 5
                        
                    },
                    {
                        text: "Look to your right",
                        nextScene: 4
                    }
                ]
            },
            {
                id: 3,
                text: `The old man warns you to turn back. He tells you there is great danger ahead. Someone who knows where you work, wants to steal your keycard to the lab. He plans to attack GenTech tonight and you are his way in.`,
                actions: [
                    {
                        text: "Ignore him",
                        nextScene: 2
                    },
                    {
                        text: "Turn back",
                        nextScene: 6
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
                        text: "Do what he says",
                        nextScene: 7
                    },
                    {
                        text: "Attack him",
                        attackEnemy: enemies.thief,
                        nextScene: 9,
                        nextSceneAfterKill: 10
                    }
                ]
            },
            {
                id: 5,
                text: `As you panic and start to run, you accidentally trip and fall on the floor on the floor. A shadowy figure suddenly jumps at you and shouts "Give me your wallet and keycard" and starts punching you.`,
                enemy: enemies.thief,
                fadeImage: true,
                actions: [
                    {
                        text: "Do what he says",
                        nextScene: 7
                    },
                    {
                        text: "Attack him",
                        attackEnemy: enemies.thief,
                        nextScene: 9
                    }
                ]
            },
            {
                id: 6,
                text: "You walk away from the alleway and escape the danger that's lurking in the shadows. What do you do next?",
                actions: [
                    {
                        text: "Walk home",
                        response: `${player.name}'s inner voice: "I should probably thank the old man."`
                    },
                    {
                        text: "Thank the old man",
                        nextScene: 8
                    }
                ]
            },
            {
                id: 7,
                text: "The thief punches you in the face and takes your wallet and keycard and leaves you on the ground.",
                actions: [
                    {
                        text: "Chase the thief",
                        response: `The thief quickly disappears in the shadows without a trace. "I should probably ask the old man for answers" you think.`
                    },
                    {
                        text: "Find the old man",
                        nextScene: 11
                    }
                ]
            },
            {
                id: 8,
                text: `The old man takes a liking at you and gives you a ${items.card.name} with an address on it. He tells you that GenTech is in danger and you can find answers in this place.`,
                actions: [
                    {
                        text: "Ignore it",
                        response: `${player.name}'s inner voice: "If he is right, I shouldn't ignore it. It could jeopardice our operation."`
                    },
                    {
                        text: "Take the card",
                        item: items.card,
                        nextScene: 13
                    }
                ]
            },
            {
                id: 9,
                text: `You attack the intruder. He seems wounded but he is still standing. He stands up and attacks you again.`,
                enemy: enemies.thief,
                actions: [
                    {
                        text: "Attack again",
                        attackEnemy: enemies.thief,
                        nextScene: 9,
                        nextSceneAfterKill: 10
                    },
                    {
                        text: "Run away",
                        nextScene: 12
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
                        nextScene: 11
                    }
                ]
            },
            {
                id: 11,
                text: `You managed to find the old man. You ask him for answers. He looks at you with a cold stare and gives you a ${items.card.name} with an address on it. He tells you that GenTech is in danger and you can find answers in this location.`,
                actions: [
                    {
                        text: "Ignore it",
                        response: `${player.name}'s inner voice: "If he is right, I shouldn't ignore it. It could jeopardice our operation or something much worse."`
                    },
                    {
                        text: "Take the card",
                        item: items.card,
                        nextScene: 13
                    }
                ]
            },
            {
                id: 12,
                text: `You managed to escape the attacker. As you walk, the old man appears in front of you again. You ask him for answers and he gives you ${items.card.name}. He tells you that your company is in danger and you can find answers in this place.`,
                actions: [
                    {
                        text: "Ignore it",
                        response: `${player.name}'s inner voice: "If he is right, I shouldn't ignore it. It could jeopardice our operation."`
                    },
                    {
                        text: "Take the card",
                        item: items.card,
                        nextScene: 13
                    }
                ]
            },
            {
                id: 13,
                text: `You take the ${items.card} and you decide to go to that address to find out what is going on and who wants to attack GenTech and why.`,
                nextRoom: 4,
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
                text: `You arrive at the location shown at the card. It's a nightclub for enhanced individuals. This part of town is very dodgy. What shall you do with the card?`,
                actions: [
                    {
                        text: "Keep it",
                        nextScene: 2
                    },
                    {
                        text: "Throw it",
                        nextScene: 2,
                        removedItem: items.card
                    }
                ]
            },
            {
                id: 2,
                text: `You get to the entrance. The bouncer looks at you and says "I've never seen you again in here. You don't look enhanced. Are you a member?".`,
                actions: [
                    {
                        text: "Yes",
                        nextScene: 3
                    },
                    {
                        text: "No",
                        nextScene: 4
                    }
                ]
            },
            {
                id: 3,
                text: `"Ok then, follow me" the bouncer says. He takes you to the back entrance of the nightclub. Another person looks at you suspiciously and asks for the member's card.`,
                requiredItem: items.card,
                requiredItemScene: 5,
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
                id: 4,
                text: `"This is a member's only club. You do not belong here. Are you one of them?" the bouncer shouts. He then grabs you with his bionic arm and stabs you.`,
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
                text: `You enter the nightclub. You notice it is filled with enhanced individuals, a lot of them wanted criminals. At the bar, you see a familiar face. It's your neighbour, Samantha. "She's strange but she may have some info".`,
                actions: [
                    {
                        text: "Say hi",
                        nextScene: 6
                    },
                    {
                        text: "Look for info",
                        nextScene: 7
                    }
                ]
            },
            {
                id: 6,
                text: `"I didn't expect to see you at a place like this, ${player.name}" Samantha says.`,
                actions: [
                    {
                        text: "I need info",
                        nextScene: 8
                    },
                    {
                        text: "I came for a drink",
                        response: "You don't seem the kind of guy who would hang out at a place like this. So tell me, what are you really doing here?"
                    }
                ]
            },
            {
                id: 7,
                text: `You go around the club and you ask if anyone knows about the anti-enhancement protests and an impeding attack at GenTech. A strange looking guy approaches you and asks "Who are you? What do you know about GenTech?"`,
                actions: [
                    {
                        text: "I work there",
                        nextScene: 11
                    },
                    {
                        text: "Who are you?",
                        nextScene: 12
                    }
                ]
            },
            {
                id: 8,
                text: `You play a dangerous game ${player.name}. GenTech is not what you think they are. They are hiding many secrets, secrets that could end the world. I can't give you any information but I know someone who would.`,
                actions: [
                    {
                        text: "Who is it?",
                        nextScene: 9
                    },
                    {
                        text: "Walk away",
                        nextScene: 7
                    }
                ]
            },
            {
                id: 9,
                text: "His name is Jack. He runs an auto-repair shop for mechs. Be careful though, he doesn't trust GenTech so do not tell him you work there.",
                actions: [
                    {
                        text: "Where is he?",
                        nextScene: 10
                    },
                    {
                        text: "Walk away",
                        nextScene: 7
                    }
                ]
            },
            {
                id: 10,
                text: "He likes to play hide and seek in his little hideout with his gang. When you get there, just tell him Samantha sent you his way. He trusts me. Or at least I think he does.",
                actions: [
                    {
                        text: "Find Jack",
                        nextRoom: 5
                    },
                    {
                        text: "Stay in the club",
                        nextScene: 7
                    }
                ]
            },
            {
                id: 11,
                text: "Hmm, so you are GenTech's lackey, huh? All I know is that there's a storm coming. A shadow organization wants to take down GenTech. They fear the future. My wife would have lost her life if it wasn't for GenTech. I'll give you the address of their hideout.",
                actions: [
                    {
                        text: "Find the hideout",
                        nextRoom: 5
                    },
                    {
                        text: "Find Samantha",
                        nextScene: 6
                    }
                ]
            },
            {
                id: 12,
                text: `"Who I am is none of your business." the man says with an angry look on his face. Two other dangerous-looking men come his way.`,
                actions: [
                    {
                        text: "I work there",
                        nextScene: 11
                    },
                    {
                        text: "Find Samantha",
                        nextScene: 6
                    }
                ]

            }
        ],
        5: [

        ]
    };
}
