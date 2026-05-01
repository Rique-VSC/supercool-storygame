const playerData = {
    lab: localStorage.getItem("cartLab") || "Student",
    classmate: localStorage.getItem("classmateName") || "CART lab",
    teacher: localStorage.getItem("teacherName") || "Professor"
};










// gameplay down below
const starterThemes = {
    fire: "#e74c3c",
    water: "#50caf6",
    grass: "#2ecc71",
    electric: "#ebd540",
    ground: "#876414",
    flying: "#d8fff8",
    dark: "#5a4a69",
    psychic: "#b98ee0",
    fairy: "#ffe0fd",
    dragon: "#4f82bc",
    normal: "#c9c9c9",
    fighting: "#e9a125",
    bug: "#4c8153",
    steel: "#777777",
    poison: "#8a139a",
    ice: "#86ffeb",
    ghost: "#a618ff",
    rock: "#44413d",
    bug: "#9dec42",
};

function setStarterTheme(pokemonName) {
    const color = starterThemes[pokemonName] || "white";
    document.documentElement.style.setProperty("--starter-color", color);
}


const gameState = {
    starter: null,
    party: [],
    currentEncounter: null
};


function fiftyfifty() {
    let result = 'lost';
    if (Math.random() < .5) {
        result = 'won';
    }
    return result;
}

function capture() {
    let result = 'failed to capture';
    if (Math.random() < .5) {
        result = 'caught';
    }
    return result;
}

// pokemon battle thingy
function battlePokemon(pokemonName, nextRoute, retryScene) {
    const result = fiftyfifty()
    if (result === "won") {
        addPokemonToParty(pokemonName);
    }

    return {
        result,
        next: result === "won"
            ? nextRoute
            : retryScene,
        text: `You ${result} against ${pokemonName}`
    };
}

// pokemon catch thingy
function catchPokemon(pokemonName, nextRoute, retryScene) {
    const result = capture();

    if (result === "caught") {
        addPokemonToParty(pokemonName);
    }

    return {
        result,
        next: result === "caught"
            ? nextRoute
            : retryScene,
        text: `You ${result} ${pokemonName}`
    };
}

// pokemon party 
function addPokemonToParty(pokemonName) {
    if (gameState.party.length < 6) {
        gameState.party.push(pokemonName);
        updateInventory();
    }
}
// pokemon inventory update
function updateInventory() {
    const inventory = document.getElementById("pokemonInventory");

    inventory.innerHTML = "";

    gameState.party.forEach((pokemon, index) => {
        const slot = document.createElement("div");
        slot.classList.add("pokemon-slot");

        slot.textContent = pokemon;

        inventory.appendChild(slot);
    });

    // filling empty slots
    for (let i = gameState.party.length; i < 6; i++) {
        const emptySlot = document.createElement("div");
        emptySlot.classList.add("pokemon-slot");
        emptySlot.textContent = "Empty";
        inventory.appendChild(emptySlot);

    }
}

const scenes = {
    captured: {
        dialogue: () => `${gameState.starter} was caught!`,
        background: "route1.png",
        next: "intro"
    },
    capturefailed: {
        dialogue: () => `${gameState.starter} escaped!`,
        background: "route1.png",
        next: "routeOne1"
    },


    intro: {
        dialogue: `This is the day you get to pick your very own pokemon in the ${playerData.lab} region and start your very own adventure!`,
        background: "bg1.png",
        next: "intro2"
    },

    intro2: {
        dialogue: `You make your way towards Professor ${playerData.teacher}s laboratory. This is where you choose your very first Pokemon.`,
        background: "bg2.png",
        next: "intro3"
    },

    intro3: {
        dialogue: `You also meet your classmate ${playerData.classmate} at the lab, who is also starting their Pokemon journey as well. ${playerData.classmate} insists that you get the first pick.`,
        background: "bg2.png",
        next: "starterOption"
    },

    starterOption: {
        dialogue: "Who will become your first Pokemon companion?",
        background: "bg2.png",
        options: [
            {
                text: "Litten",
                type: "fire",
                img: "litten.png",
                action: () => {
                    gameState.starter = "Litten";
                    addPokemonToParty("Litten");
                },
                next: "chosenStarter"
            },
            {
                text: "Froakie",
                type: "water",
                img: "froakie.png",
                action: () => {
                    gameState.starter = "Froakie";
                    addPokemonToParty("Froakie");
                },
                next: "chosenStarter"
            },
            {
                text: "Treecko",
                type: "grass",
                img: "treecko.png",
                action: () => {
                    gameState.starter = "Treecko";
                    addPokemonToParty("Treecko");
                },
                next: "chosenStarter" // maybe fix this soon or make a function that based on what pokemon u pick as your starter the ending is different
            }
        ]
    },


    chosenStarter: {
        dialogue: () => `You chose a ...${gameState.starter}!`,
        background: "bg2.png",
        next: "intro4"
    },
    intro4: {
        dialogue: () => `You picked ${gameState.starter}! Shortly after, ${playerData.classmate} picks theirs and you both go on your separate ways.`,
        background: "bg2.png",
        next: "routeOne1"
    },


































    //route 1!!!!
    routeOne1: {
        dialogue: "You reach route 1: Grassy Terrains. Its a large field with tall yellow patches of grass throughout the route.",
        background: "route1.png",
        next: "routeOne2"
    },
    routeOne2: {
        dialogue: "You find three unique Pokemon, but you can't see them through all the tall grass!",
        background: "route1.png",
        next: "routeOne3"
    },
    routeOne3: {
        dialogue: "You must investigate... Which Pokemon will you encounter?",
        background: "route1.png",
        options: [
            {
                text: "Psychic",
                type: "psychic",
                action: () => {
                    gameState.currentEncounter = "Wynaut";
                },
                next: "chosenWynaut"
            },
            {
                text: "Ground",
                type: "ground",
                action: () => {
                    gameState.currentEncounter = "Cubone";
                },
                next: "chosenCubone"
            },
            {
                text: "Normal",
                type: "normal",
                action: () => {
                    gameState.currentEncounter = "Munchlax";
                },
                next: "chosenMunchlax"
            }
        ]
    },

    //wynaut option
    chosenWynaut: {
        dialogue: "A wild Wynaut has appeared! What will you do?",
        img: "wynaut.png",
        background: "route1.png",
        options: [
            {
                text: "Fight",
                next: "fightWynaut"
            },
            {
                text: "Catch",
                next: "catchWynaut"
            },
            {
                text: "Run",
                next: "runFromWynaut"
            }
        ]


    },
    fightWynaut: {
        dialogue: `You chose to fight ...Wynaut!`,
        img: "wynaut.png",
        background: "route1.png",
        next: "Wynautfight",
    },



    catchWynaut: {
        dialogue: `You chose to catch ...Wynaut!`,
        img: "wynaut.png",
        background: "route1.png",
        next: "Wynautcapture",
    },

    runFromWynaut: {
        dialogue: `You attempted to flee from ...Wynaut!`,
        img: "wynaut.png",
        background: "route1.png",
        next: "RunawayWynaut",
    },


    Wynautfight: {


        dialogue: function () {
            const battle = battlePokemon("Wynaut", "routetwo1", "chosenWynaut");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "wynaut.png",
        background: "route1.png",

        next: function () {
            return this.nextScene;
        }
    },

    Wynautcapture: {

        dialogue: function () {
            const captureResult = catchPokemon("Wynaut", "routetwo1", "chosenWynaut")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "wynaut.png",
        background: "route1.png",

        next: function () {
            return this.nextScene;
        }
    },

    RunawayWynaut: {
        dialogue: `You successfully ran away from Wynaut... there were no consequences.`,
        background: "blackscreen.jpg",
        next: "routetwo1",
    },


    // cubone option
    chosenCubone: {
        dialogue: "A wild Cubone has appeared! What will you do?",
        img: "cubone.png",
        background: "route1.png",
        options: [
            {
                text: "Fight",
                next: "fightCubone"
            },
            {
                text: "Catch",
                next: "catchCubone"
            },
            {
                text: "Run",
                next: "runFromCubone"
            }
        ]
    },
    fightCubone: {
        dialogue: `You chose to fight ...Cubone!`,
        img: "cubone.png",
        background: "route1.png",
        next: "Cubonefight"
    },
    catchCubone: {
        dialogue: `You chose to catch ...Cubone!`,
        img: "cubone.png",
        background: "route1.png",
        next: "Cubonecapture",
    },
    runFromCubone: {
        dialogue: `You attempted to flee from ...Cubone!`,
        img: "cubone.png",
        background: "route1.png",
        next: "Cubonerun",
    },

    Cubonefight: {
        dialogue: function () {
            const battle = battlePokemon("Cubone", "routetwo1", "chosenCubone");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "cubone.png",
        background: "route1.png",

        next: function () {
            return this.nextScene;
        }
    },

    Cubonecapture: {

        dialogue: function () {
            const captureResult = catchPokemon("Cubone", "routetwo1", "chosenCubone")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "cubone.png",
        background: "route1.png",

        next: function () {
            return this.nextScene;
        }
    },

    Cubonerun: {
        dialogue: `Cubone got upset that you ran away... he threw his bone at you`,
        background: "blackscreen.jpg",
        next: "routetwo1",
    },

    // munchlax option
    chosenMunchlax: {
        dialogue: "A wild Munchlax has appeared! What will you do?",
        img: "munchlax.png",
        background: "route1.png",
        options: [
            {
                text: "Fight",
                next: "fightMunchlax"
            },
            {
                text: "Catch",
                next: "catchMunchlax"
            },
            {
                text: "Run",
                next: "runFromMunchlax"
            }
        ]
    },
    fightMunchlax: {
        dialogue: `You chose to fight ...Munchlax!`,
        img: "munchlax.png",
        background: "route1.png",
        next: "Munchlaxfight"
    },
    catchMunchlax: {
        dialogue: `You chose to catch ...Munchlax!`,
        img: "munchlax.png",
        background: "route1.png",
        next: "CatchMunchlax",
    },
    runFromMunchlax: {
        dialogue: `You attempted to flee from ...Munchlax!`,
        img: "munchlax.png",
        background: "route1.png",
        next: "Munchlaxrun",
    },


    Munchlaxfight: {
        dialogue: function () {
            const battle = battlePokemon("Munchlax", "routetwo1", "chosenMunchlax");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "munchlax.png",
        background: "route1.png",

        next: function () {
            return this.nextScene;
        }
    },

    CatchMunchlax: {
        dialogue: function () {
            const captureResult = catchPokemon("Munchlax", "routetwo1", "chosenMunchlax")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "munchlax.png",
        background: "route1.png",

        next: function () {
            return this.nextScene;
        }
    },
    Munchlaxrun: {
        dialogue: `You ran away from Munchlax... Munchlax is developing its villain arc now.`,
        background: "blackscreen.jpg",
        next: "routetwo1",
    },





























    //route 2!!!
    routetwo1: {
        dialogue: `You offically made it out of the Grassy Terrains, you have now arrived at route 2: Berry Woods.`,
        background: "route2.png",
        next: "routetwo2",

    },

    routetwo2: {
        dialogue: `This area is a forest that's filled with many unique Pokemon. You and your Pokemon decide to rest for a while in this nice environment, so you sit underneath a tree and relax. `,
        background: "route2.png",
        next: "routetwo3",
    },

    routetwo3: {
        dialogue: `Your rest comes to a stop, as you hear the bushes rustling close by.`,
        background: "route2.png",
        next: "routetwo4",
    },

    routetwo4: {
        dialogue: `You notice that thre are three Pokemon in the bush, preparing to attack you! `,
        background: "route2.png",
        next: "routetwo5",
    },

    routetwo5: {
        dialogue: `However, you can only fight one of them, so which would it be?`,
        background: "route2.png",
        options: [
            {
                text: "Fairy",
                type: "fairy",
                action: () => {
                    gameState.currentEncounter = "Togepi";
                },
                next: "chosenTogepi"
            },
            {
                text: "Rock",
                type: "rock",
                action: () => {
                    gameState.currentEncounter = "Bonsly";
                },
                next: "chosenBonsly"
            },
            {
                text: "Poison",
                type: "poison",
                action: () => {
                    gameState.currentEncounter = "Nidoran";
                },
                next: "chosenNidoran"
            }
        ]
    },

    // togepi option
    chosenTogepi: {
        dialogue: "A wild Togepi has appeared! What will you do?",
        img: "togepi.png",
        background: "route2.png",
        options: [
            {
                text: "Fight",
                next: "fightTogepi"
            },
            {
                text: "Catch",
                next: "catchTogepi"
            },
            {
                text: "Run",
                next: "runFromTogepi"
            }
        ]
    },
    fightTogepi: {
        dialogue: `You chose to fight ...Togepi!`,
        img: "togepi.png",
        background: "route2.png",
        next: "Togepifight"
    },
    catchTogepi: {
        dialogue: `You chose to catch ...Togepi!`,
        img: "togepi.png",
        background: "route2.png",
        next: "Togepicapture",
    },
    runFromTogepi: {
        dialogue: `You attempted to flee from ...Togepi!`,
        img: "togepi.png",
        background: "route2.png",
        next: "Togepirun",
    },


    Togepifight: {
        dialogue: function () {
            const battle = battlePokemon("Togepi", "routethree1", "chosenTogepi");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "togepi.png",
        background: "route2.png",

        next: function () {
            return this.nextScene;
        }
    },

    Togepicapture: {

        dialogue: function () {
            const captureResult = catchPokemon("Togepi", "routethree1", "chosenTogepi")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "togepi.png",
        background: "route2.png",

        next: function () {
            return this.nextScene;
        }
    },
    Togepirun: {
        dialogue: `Togepi successfully ran away from you...`,
        background: "blackscreen.jpg",
        next: "routethree1",
    },





    // Bonsly option
    chosenBonsly: {
        dialogue: "A wild Bonsly has appeared! What will you do?",
        img: "bonsly.png",
        background: "route2.png",
        options: [
            {
                text: "Fight",
                next: "fightBonsly"
            },
            {
                text: "Catch",
                next: "catchBonsly"
            },
            {
                text: "Run",
                next: "runFromBonsly"
            }
        ]
    },
    fightBonsly: {
        dialogue: `You chose to fight ...Bonsly!`,
        img: "bonsly.png",
        background: "route2.png",
        next: "Bonslyfight"
    },
    catchBonsly: {
        dialogue: `You chose to catch ...Bonsly!`,
        img: "bonsly.png",
        background: "route2.png",
        next: "Bonslycapture",
    },
    runFromBonsly: {
        dialogue: `You attempted to flee from ...Bonsly!`,
        img: "bonsly.png",
        background: "route2.png",
        next: "Bonslyrun",
    },


    Bonslyfight: {
        dialogue: function () {
            const battle = battlePokemon("Bonsly", "routethree1", "chosenBonsly");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "bonsly.png",
        background: "route2.png",

        next: function () {
            return this.nextScene;
        }
    },

    Bonslycapture: {

        dialogue: function () {
            const captureResult = catchPokemon("Bonsly", "routethree1", "chosenBonsly")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "bonsly.png",
        background: "route2.png",

        next: function () {
            return this.nextScene;
        }
    },
    Bonslyrun: {
        dialogue: `You ran away from Bonsly? Bonsly cried👎`,
        background: "blackscreen.jpg",
        next: "routethree1",
    },




    // Nidoran option
    chosenNidoran: {
        dialogue: "A wild Nidoran has appeared! What will you do?",
        img: "nidoran.png",
        background: "route2.png",
        options: [
            {
                text: "Fight",
                next: "fightNidoran"
            },
            {
                text: "Catch",
                next: "catchNidoran"
            },
            {
                text: "Run",
                next: "runFromNidoran"
            }
        ]
    },
    fightNidoran: {
        dialogue: `You chose to fight ...Nidoran!`,
        img: "nidoran.png",
        background: "route2.png",
        next: "Nidoranfight"
    },
    catchNidoran: {
        dialogue: `You chose to catch ...Nidoran!`,
        img: "nidoran.png",
        background: "route2.png",
        next: "Nidorancapture",
    },
    runFromNidoran: {
        dialogue: `You attempted to flee from ...Nidoran!`,
        img: "nidoran.png",
        background: "route2.png",
        next: "Nidoranrun",
    },


    Nidoranfight: {
        dialogue: function () {
            const battle = battlePokemon("Nidoran", "routethree1", "chosenNidoran");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "nidoran.png",
        background: "route2.png",

        next: function () {
            return this.nextScene;
        }
    },

    Nidorancapture: {

        dialogue: function () {
            const captureResult = catchPokemon("Nidoran", "routethree1", "chosenNidoran")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "nidoran.png",
        background: "route2.png",

        next: function () {
            return this.nextScene;
        }
    },
    Nidoranrun: {
        dialogue: `You ran away from Nidorino... it almost poisioned you as you ran!`,

        background: "blackscreen.jpg",
        next: "routethree1",
    },

























    //route THREEEEEEEE!!!
    routethree1: {
        dialogue: `After a very intense battle you reach route 3: Flatlands.`,
        background: "route3.png",
        next: "routethree2",

    },

    routethree2: {
        dialogue: `This route has a large green field that's next to a river. The sun is setting and you decided to set up camp for the night. The light sky finally fades. And you and your pokemon rest under the stars.`,
        background: "route3.png",
        next: "routethree3",
    },

    routethree3: {
        dialogue: `suddenly, an unexpected rustling in the tall grass near you wakes you and your pokemon. `,
        background: "route3.png",
        next: "routethree4",
    },

    routethree4: {
        dialogue: `It's hard to notice, but 3 pokemon are surrounding you, ready for a battle. But you could only battle one of them.`,
        background: "route3.png",
        next: "routethree5",
    },

    routethree5: {
        dialogue: `Which one would you choose?`,
        background: "route3.png",
        options: [
            {
                text: "Ground/Dark",
                type: "dark",
                action: () => {
                    gameState.currentEncounter = "Krokorok";
                },
                next: "chosenKrokorok"
            },
            {
                text: "Ghost/Fire",
                type: "ghost",
                action: () => {
                    gameState.currentEncounter = "Lampent";
                },
                next: "chosenLampent"
            },
            {
                text: "Fighting/Flying",
                type: "fighting",
                action: () => {
                    gameState.currentEncounter = "Hawlucha";
                },
                next: "chosenHawlucha"
            }
        ]
    },

    // Krokorok option
    chosenKrokorok: {
        dialogue: "A wild Krokorok has appeared! What will you do?",
        img: "krokorok.png",
        background: "route3.png",
        options: [
            {
                text: "Fight",
                next: "fightKrokorok"
            },
            {
                text: "Catch",
                next: "catchKrokorok"
            },
            {
                text: "Run",
                next: "runFromKrokorok"
            }
        ]
    },
    fightKrokorok: {
        dialogue: `You chose to fight ...Krokorok!`,
        img: "krokorok.png",
        background: "route3.png",
        next: "Krokorokfight"
    },
    catchKrokorok: {
        dialogue: `You chose to catch ...Krokorok!`,
        img: "krokorok.png",
        background: "route3.png",
        next: "Krokorokcapture",
    },
    runFromKrokorok: {
        dialogue: `You attempted to flee from ...Krokorok!`,
        img: "krokorok.png",
        background: "route3.png",
        next: "Krokorokrun",
    },


    Krokorokfight: {
        dialogue: function () {
            const battle = battlePokemon("Krokorok", "routefour1", "chosenKrokorok");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "krokorok.png",
        background: "route3.png",

        next: function () {
            return this.nextScene;
        }
    },

    Krokorokcapture: {

        dialogue: function () {
            const captureResult = catchPokemon("Krokorok", "routefour1", "chosenKrokorok")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "krokorok.png",
        background: "route3.png",

        next: function () {
            return this.nextScene;
        }
    },
    Krokorokrun: {
        dialogue: `You ran away from Krokorok! It chased you across the Flatlands`,
        background: "blackscreen.jpg",
        next: "routefour1",
    },





    // Lampent option
    chosenLampent: {
        dialogue: "A wild Lampent has appeared! What will you do?",
        img: "lampent.png",
        background: "route3.png",
        options: [
            {
                text: "Fight",
                next: "fightLampent"
            },
            {
                text: "Catch",
                next: "catchLampent"
            },
            {
                text: "Run",
                next: "runFromLampent"
            }
        ]
    },
    fightLampent: {
        dialogue: `You chose to fight ...Lampent!`,
        img: "lampent.png",
        background: "route3.png",
        next: "Lampentfight"
    },
    catchLampent: {
        dialogue: `You chose to catch ...Lampent!`,
        img: "lampent.png",
        background: "route3.png",
        next: "Lampentcapture",
    },
    runFromLampent: {
        dialogue: `You attempted to flee from ...Lampent!`,
        img: "lampent.png",
        background: "route3.png",
        next: "Lampentrun",
    },


    Lampentfight: {
        dialogue: function () {
            const battle = battlePokemon("Lampent", "routefour1", "chosenLampent");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "lampent.png",
        background: "route3.png",

        next: function () {
            return this.nextScene;
        }
    },

    Lampentcapture: {

        dialogue: function () {
            const captureResult = catchPokemon("Lampent", "routefour1", "chosenLampent")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "lampent.png",
        background: "route3.png",

        next: function () {
            return this.nextScene;
        }
    },
    Lampentrun: {
        dialogue: `You ran away from Lampent! It tried to chase you but ultimately gave up!`,
        background: "blackscreen.jpg",
        next: "routefour1",
    },




    // Hawlucha option
    chosenHawlucha: {
        dialogue: "A wild Hawlucha has appeared! What will you do?",
        img: "hawlucha.png",
        background: "route3.png",
        options: [
            {
                text: "Fight",
                next: "fightHawlucha"
            },
            {
                text: "Catch",
                next: "catchHawlucha"
            },
            {
                text: "Run",
                next: "runFromHawlucha"
            }
        ]
    },
    fightHawlucha: {
        dialogue: `You chose to fight ...Hawlucha!`,
        img: "hawlucha.png",
        background: "route3.png",
        next: "Hawluchafight"
    },
    catchHawlucha: {
        dialogue: `You chose to catch ...Hawlucha!`,
        img: "hawlucha.png",
        background: "route3.png",
        next: "Hawluchacapture",
    },
    runFromHawlucha: {
        dialogue: `You attempted to flee from ...Hawlucha!`,
        background: "route3.png",
        next: "Hawlucharun",
    },


    Hawluchafight: {
        dialogue: function () {
            const battle = battlePokemon("Hawlucha", "routefour1", "chosenHawlucha");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "hawlucha.png",
        background: "route3.png",

        next: function () {
            return this.nextScene;
        }
    },

    Hawluchacapture: {

        dialogue: function () {
            const captureResult = catchPokemon("Hawlucha", "routefour1", "chosenHawlucha")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "hawlucha.png",
        background: "route3.png",

        next: function () {
            return this.nextScene;
        }
    },
    Hawlucharun: {
        dialogue: `You ran away from Hawlucha before it could body slam you!`,
        background: "blackscreen.jpg",
        next: "routefour1",
    },
































    // congrafts u get to do route 444 down heree aaayayayayyayay


    routefour1: {
        dialogue: `Morning has now arrived after your newest catch from last night. You packed up your things before heading out to Route 4: Sandy Beaches.`,
        background: "route4.png",
        next: "routefour2",

    },

    routefour2: {
        dialogue: `You’re now at the beach! There’s a lot of wind and waves today, and it seems like it’s going to rain soon.`,
        background: "route4.png",
        next: "routefour3",
    },

    routefour3: {
        dialogue: `Not so far away is a small cave where you can rest until this rainstorm passes by. You arrived there, but you didn’t think there were some Pokemon already hiding in the cave.`,
        background: "route4.png",
        next: "routefour4",
    },

    routefour4: {
        dialogue: `You couldn’t see them– but you could hear their angry sounds as you stumbled upon their territory.`,
        background: "route4.png",
        next: "routefour5",
    },

    routefour5: {
        dialogue: `Pick and choose to see who's in this cave!`,
        background: "route4.png",
        options: [
            {
                text: "Bug/Fire",
                type: "bug",
                action: () => {
                    gameState.currentEncounter = "Larvesta";
                },
                next: "chosenLarvesta"
            },
            {
                text: "Electric",
                type: "electric",
                action: () => {
                    gameState.currentEncounter = "Mareep";
                },
                next: "chosenMareep"
            },
            {
                text: "Dragon/Fighting",
                type: "dragon",
                action: () => {
                    gameState.currentEncounter = "Hakamoo";
                },
                next: "chosenHakamoo"
            }
        ]
    },

    // Larvesta option
    chosenLarvesta: {
        dialogue: "A wild Larvesta has appeared! What will you do?",
        img: "larvesta.png",
        background: "route4.png",
        options: [
            {
                text: "Fight",
                next: "fightLarvesta"
            },
            {
                text: "Catch",
                next: "catchLarvesta"
            },
            {
                text: "Run",
                next: "runFromLarvesta"
            }
        ]
    },
    fightLarvesta: {
        dialogue: `You chose to fight ...Larvesta!`,
        img: "larvesta.png",
        background: "route4.png",
        next: "larvestafight"
    },
    catchLarvesta: {
        dialogue: `You chose to catch ...Larvesta!`,
        img: "larvesta.png",
        background: "route4.png",
        next: "larvestacapture",
    },
    runFromLarvesta: {
        dialogue: `You attempted to flee from ...Larvesta!`,
        img: "larvesta.png",
        background: "route4.png",
        next: "larvestarun",
    },


    larvestafight: {
        dialogue: function () {
            const battle = battlePokemon("Larvesta", "routefive1", "chosenLarvesta");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "larvesta.png",
        background: "route4.png",

        next: function () {
            return this.nextScene;
        }
    },

    larvestacapture: {

        dialogue: function () {
            const captureResult = catchPokemon("Larvesta", "routefive1", "chosenLarvesta")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "larvesta.png",
        background: "route4.png",

        next: function () {
            return this.nextScene;
        }
    },
    larvestarun: {
        dialogue: `You ran away from Larvesta... it attacked you with Ember.`,
        background: "blackscreen.jpg",
        next: "routefive1",
    },





    // mareep option
    chosenMareep: {
        dialogue: "A wild Mareep has appeared! What will you do?",
        img: "mareep.png",
        background: "route4.png",
        options: [
            {
                text: "Fight",
                next: "fightMareep"
            },
            {
                text: "Catch",
                next: "catchMareep"
            },
            {
                text: "Run",
                next: "runFromMareep"
            }
        ]
    },
    fightMareep: {
        dialogue: `You chose to fight ...Mareep!`,
        img: "mareep.png",
        background: "route4.png",
        next: "mareepfight"
    },
    catchMareep: {
        dialogue: `You chose to catch ...Mareep!`,
        img: "mareep.png",
        background: "route4.png",
        next: "mareepcapture",
    },
    runFromMareep: {
        dialogue: `You attempted to flee from ...Mareep!`,
        img: "mareep.png",
        background: "route4.png",
        next: "mareeprun",
    },


    mareepfight: {
        dialogue: function () {
            const battle = battlePokemon("Mareep", "routefive1", "chosenMareep");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "mareep.png",
        background: "route4.png",

        next: function () {
            return this.nextScene;
        }
    },

    mareepcapture: {

        dialogue: function () {
            const captureResult = catchPokemon("Mareep", "routefive1", "chosenMareep")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "mareep.png",
        background: "route4.png",

        next: function () {
            return this.nextScene;
        }
    },
    Mareeprun: {
        dialogue: `You ran away from Mareep? Why would you do that..`,
        background: "blackscreen.jpg",
        next: "routefive1",
    },




    // hakamo-o option
    chosenHakamoo: {
        dialogue: "A wild Hakamo-o has appeared! What will you do?",
        img: "hakamo-o.png",
        background: "route4.png",
        options: [
            {
                text: "Fight",
                next: "fightHakamoo"
            },
            {
                text: "Catch",
                next: "catchHakamoo"
            },
            {
                text: "Run",
                next: "runFromHakamoo"
            }
        ]
    },
    fightHakamoo: {
        dialogue: `You chose to fight ...Hakamo-o!`,
        img: "hakamo-o.png",
        background: "route4.png",
        next: "Hakamoofight"
    },
    catchHakamoo: {
        dialogue: `You chose to catch ...Hakamo-o!`,
        img: "hakamo-o.png",
        background: "route4.png",
        next: "Hakamoocapture",
    },
    runFromHakamoo: {
        dialogue: `You attempted to flee from ...Hakamo-o!`,
        background: "route4.png",
        next: "Hakamoorun",
    },


    Hakamoofight: {
        dialogue: function () {
            const battle = battlePokemon("Hakamo-o", "routefive1", "chosenHakamoo");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "hakamo-o.png",
        background: "route4.png",

        next: function () {
            return this.nextScene;
        }
    },

    Hakamoocapture: {

        dialogue: function () {
            const captureResult = catchPokemon("Hakamo-o", "routefive1", "chosenHakamoo")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "hakamo-o.png",
        background: "route4.png",

        next: function () {
            return this.nextScene;
        }
    },
    Hakamoorun: {
        dialogue: `You successfully ran away from Hakamo-o... there were no consequences.`,
        background: "blackscreen.jpg",
        next: "routefive1",
    },

















































    // ROUTE 5 YAYA FINAL ONE I THINK


    routefive1: {
        dialogue: `Finally, you were able to rest for the rest of the time until the storm passed. After a few more minutes the rain has passed now, and you make your way up to Route 5: Forbidden Canyon.`,
        background: "route5.png",
        next: "routefive2",

    },

    routefive2: {
        dialogue: `You make your way up to the Canyon, and the clouds have turned darker in the sky. You’ve become nervous as you reach the peak of the canyon but at the same time you felt a relief at the same time as you could see your whole entire region.`,
        background: "route5a.png",
        next: "routefive3",
    },

    routefive3: {
        dialogue: `All of a sudden, the sky was completely covered in dark gray clouds as you could hear thunder out in the distance. You’ve noticed how this weather isn’t natural, and it seemed like a Pokemon was doing this.`,
        background: "route5b.png",
        next: "routefive4",
    },

    routefive4: {
        dialogue: `You look behind, and you could see three Pokemon out in the distance. However, these aren't just any ordinary Pokemon, you’ve noticed the way they look might be a stronger Pokemon you have never fought before.`,
        background: "route5b.png",
        next: "routefive5",
    },

    routefive5: {
        dialogue: `These three mysterious Pokemon are only letting you fight ONE of them and see if you have the potential to catch them. Pick wisely!`,
        background: "route5c.png",
        options: [
            {
                text: "Steel/Psychic",
                type: "steel",
                action: () => {
                    gameState.currentEncounter = "Sogaleo";
                },
                next: "chosenSogaleo"
            },
            {
                text: "Dragon/Ground",
                type: "dragon",
                action: () => {
                    gameState.currentEncounter = "Zygarde";
                },
                next: "chosenZygarde"
            },
            {
                text: "Ice/Flying",
                type: "ice",
                action: () => {
                    gameState.currentEncounter = "Articuno";
                },
                next: "chosenArticuno"
            }
        ]
    },

    // Sogaleo option
    chosenSogaleo: {
        dialogue: "A wild- wait, IS THAT SOGALEO? What will you do!?",
        img: "sogaleo.png",
        background: "route5c.png",
        options: [
            {
                text: "Fight",
                next: "fightSogaleo"
            },
            {
                text: "Catch",
                next: "catchSogaleo"
            },
            {
                text: "Run",
                next: "runFromSogaleo"
            }
        ]
    },
    fightSogaleo: {
        dialogue: `You chose to fight ...Sogaleo!`,
        img: "sogaleo.png",
        background: "route5c.png",
        next: "Sogaleofight"
    },
    catchSogaleo: {
        dialogue: `You chose to catch ...Sogaleo!`,
        img: "sogaleo.png",
        background: "route5c.png",
        next: "Sogaleocapture",
    },
    runFromSogaleo: {
        dialogue: `You attempted to flee from ...Sogaleo!`,
        img: "sogaleo.png",
        background: "route5c.png",
        next: "Sogaleorun",
    },


    Sogaleofight: {
        dialogue: function () {
            const battle = battlePokemon("Sogaleo", "routefive1", "chosenSogaleo");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "sogaleo.png",
        background: "route5c.png",

        next: function () {
            return this.nextScene;
        }
    },

    Sogaleocapture: {

        dialogue: function () {
            const captureResult = catchPokemon("Sogaleo", "routefive1", "chosenSogaleo")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "sogaleo.png",
        background: "route5c.png",

        next: function () {
            return this.nextScene;
        }
    },
    Sogaleorun: {
        dialogue: `You ran away from Solgaleo! It just stared at you..`,
        background: "blackscreen.jpg",
        next: "routefive1",
    },





    // Zygarde option
    chosenZygarde: {
        dialogue: "A wild- wait, IS THAT ZYGARDE? What will you do!?",
        img: "zygarde.png",
        background: "route5c.png",
        options: [
            {
                text: "Fight",
                next: "fightZygarde"
            },
            {
                text: "Catch",
                next: "catchZygarde"
            },
            {
                text: "Run",
                next: "runFromZygarde"
            }
        ]
    },
    fightZygarde: {
        dialogue: `You chose to fight ...Zygarde!`,
        img: "zygarde.png",
        background: "route5c.png",
        next: "Zygardefight"
    },
    catchZygarde: {
        dialogue: `You chose to catch ...Zygarde!`,
        img: "zygarde.png",
        background: "route5c.png",
        next: "Zygardecapture",
    },
    runFromZygarde: {
        dialogue: `You attempted to flee from ...Zygarde!`,
        img: "zygarde.png",
        background: "route5c.png",
        next: "Zygarderun",
    },


    Zygardefight: {
        dialogue: function () {
            const battle = battlePokemon("Zygarde", "routefive1", "chosenZygarde");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "zygarde.png",
        background: "route5c.png",

        next: function () {
            return this.nextScene;
        }
    },

    Zygardecapture: {

        dialogue: function () {
            const captureResult = catchPokemon("Zygarde", "routefive1", "chosenZygarde")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "zygarde.png",
        background: "route5c.png",

        next: function () {
            return this.nextScene;
        }
    },
    Zygarderun: {
        dialogue: `You ran from Zygarde! It laughed at you☹️`,
        background: "blackscreen.jpg",
        next: "routefive1",
    },




    // Articuno option
    chosenArticuno: {
        dialogue: "A wild- wait, IS THAT ARTICUNO? What will you do!?",
        img: "articuno.png",
        background: "route5c.png",
        options: [
            {
                text: "Fight",
                next: "fightArticuno"
            },
            {
                text: "Catch",
                next: "catchArticuno"
            },
            {
                text: "Run",
                next: "runFromArticuno"
            }
        ]
    },
    fightArticuno: {
        dialogue: `You chose to fight ...Articuno!`,
        img: "articuno.png",
        background: "route5c.png",
        next: "Articunofight"
    },
    catchArticuno: {
        dialogue: `You chose to catch ...Articuno!`,
        img: "articuno.png",
        background: "route5c.png",
        next: "Articunocapture",
    },
    runFromArticuno: {
        dialogue: `You attempted to flee from ...Articuno!`,
        background: "route5c.png",
        next: "Articunorun",
    },


    Articunofight: {
        dialogue: function () {
            const battle = battlePokemon("Articuno", "routefive1", "chosenArticuno");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "articuno.png",
        background: "route5c.png",

        next: function () {
            return this.nextScene;
        }
    },

    Articunocapture: {

        dialogue: function () {
            const captureResult = catchPokemon("Articuno", "routefive1", "chosenArticuno")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "articuno.png",
        background: "route5c.png",

        next: function () {
            return this.nextScene;
        }
    },
    Articunorun: {
        dialogue: `You ran away from a Articuno! It’s... Confused?`,
        background: "blackscreen.jpg",
        next: "routefive1",
    },



}








































// stuff

let currentScene = "intro";


const nameEl = document.getElementById("name");
const dialogueEl = document.getElementById("dialogue");
const bgEl = document.getElementById("background");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const pokemonImgE1 = document.getElementById("img");

function loadScene(sceneKey) {
    const scene = scenes[sceneKey];

    if (scene.options && scene.options[0]?.type) {
        document.documentElement.style.setProperty("--starter-color", "white");
    }

    dialogueEl.textContent =
        typeof scene.dialogue === `function`
            ? scene.dialogue()
            : scene.dialogue;

    bgEl.src = scene.background || "";

    if (scene.img) {
        pokemonImgE1.src = scene.img;
        pokemonImgE1.style.display = "block";
    } else {
        pokemonImgE1.style.display = "none";
    }

    optionsEl.innerHTML = "";

    if (scene.options) {
        nextBtn.style.display = "none";

        scene.options.forEach(option => {
            const btn = document.createElement("button");

            if (option.type) {
                btn.style.backgroundColor = starterThemes[option.type];
            }

            btn.innerHTML = `
            ${option.img ? `<img src="${option.img}" style="width:80px;"><br>` : ""}
            ${option.text}
            `;


            btn.onclick = () => {
                if (option.action) option.action();
                if (option.next) {
                    //removed option.action(); seemed to let you continue after pressing fight.//
                    currentScene = option.next;
                    loadScene(currentScene);
                }
            };
            optionsEl.appendChild(btn);
        });

    } else {
        nextBtn.style.display = "block";
    }
}





nextBtn.onclick = () => {
    const scene = scenes[currentScene];

    const next =
        typeof scene.next === "function"
            ? scene.next()
            : scene.next;

    if (next) {
        currentScene = next;
        loadScene(currentScene);
    }

};


loadScene(currentScene);




//overlay thingy
const overlay = document.getElementById("overlay");
const openInventoryBtn = document.getElementById("openInventory");
const closeInventoryBtn = document.getElementById("overlayBtn");

function openOverlay() {
    overlay.classList.add("active");
}

function closeOverlay() {
    overlay.classList.remove("active");
}

openInventoryBtn.onclick = openOverlay;
closeInventoryBtn.onclick = closeOverlay;

overlay.onclick = (e) => {
    if (e.target === overlay) {
        closeOverlay();
    }
};