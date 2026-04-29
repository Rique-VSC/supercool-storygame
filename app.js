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
    flying: "d8fff8",
    dark: "#5a4a69",
    psychic: "#b98ee0",
    fairy: "#ffe0fd",
    dragon: "#4f82bc",
    normal: "#c9c9c9",
    fighting: "#e9a125"
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
    if (Math.random() < .5 )  {
        result = 'won';
    }
    return result;
}

function capture() {
    let result = 'failed to capture';
    if (Math.random() < .5 )  {
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
        dialogue: `Today is the day you get to go out on your Pokemon journey in the CART region! This is your town, ${playerData.lab}, and today is the day you leave to adventure!`,
        background: "bg1.png",
        next: "intro2"
    },

    intro2: {
        dialogue: `You make your way towards the laboratory, where you meet Professor ${playerData.teacher}. They will let you pick your very first Pokemon.`,
        background: "bg2.png",
        next: "intro3"
    },

    intro3: {
        dialogue: `You also meet your classmate ${playerData.classmate} at the lab, who is also starting their Pokemon journey as well. ${playerData.classmate} insists you go first to choose your partner.`,
        background: "bg2.png",
        next: "starterOption"
    },

    starterOption: {
        dialogue: "Who would you like to join you on your journey?",
        background: "bg2.png",
        options: [
            {
                text: "Litten",
                img: "litten.png",
                action: () => {
                    gameState.starter = "Litten";
                    setStarterTheme("fire");
                    addPokemonToParty("Litten");
                },
                next: "chosenStarter"
            },
            {
                text: "Froakie",
                img: "froakie.png",
                action: () => {
                    gameState.starter = "Froakie";
                    addPokemonToParty("Froakie");
                    setStarterTheme("water");
                },
                next: "chosenStarter"
            },
            {
                text: "Treecko",
                img: "treecko.png",
                action: () => {
                    gameState.starter = "Treecko";
                    addPokemonToParty("Treecko");
                    setStarterTheme("grass");
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
        dialogue: () => `You picked ${gameState.starter}! After your pick, [student name] picks theirs and you both go on your separate ways.`,
        background: "bg2.png",
        next: "routeOne1"
    },
    routeOne1: {
        dialogue: "You reach route 1: Grassy Terrains. It has a large field of yellow patches of grass.",
        background: "route1.png",
        next: "routeOne2"
    },
    routeOne2: {
        dialogue: "You find three unique Pokemon, but you can't see them through all the tall grass! However, you could only battle one and catch one of them…",
        background: "route1.png",
        next: "routeOne3"
    },
    routeOne3: {
        dialogue: "There are three Pokemons hiding, which one should you encounter and catch?",
        background: "route1.png",
        options: [
            {
                text: "Psychic",
                action: () => {
                    gameState.currentEncounter = "Wynaut";
                    setStarterTheme("psychic");
                },
                next: "chosenWynaut"
            },
            {
                text: "Ground",
                action: () => {
                    gameState.currentEncounter = "Cubone";
                    setStarterTheme("ground");
                },
                next: "chosenCubone"
            },
            {
                text: "Normal",
                action: () => {
                    gameState.currentEncounter = "Munchlax";
                    setStarterTheme("normal");
                },
                next: "chosenMunchlax"
            }
        ]
    },

    //wynaut option
    chosenWynaut: {
        dialogue: "A wild Wynaut has appeared! What will you do?",
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
        background: "route1.png",
        next: "Wynautfight",   
    },
    


    catchWynaut: {
        dialogue: `You chose to catch ...Wynaut!`,
        background: "route1.png",
        next: "Wynautcapture",
    },

    runFromWynaut: {
        dialogue: `You attempted to flee from ...Wynaut!`,
        background: "route1.png",
        next: "RunawayWynaut",
    },


    Wynautfight: {

        dialogue: function () {
            const battle = battlePokemon("Wynaut", "routetwo1", "chosenWynaut");

            this.nextScene = battle.next;

            return  battle.text;
        },
            
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
        
        background: "route1.png",

        next: function () {
            return this.nextScene;
        }
    },

    RunawayWynaut: {
        dialogue: `You successfully ran away from Wynaut...`,
        background: "blackscreen.jpg",
        next: "routetwo1",
    },


    // cubone option
    chosenCubone: {
        dialogue: "A wild Cubone has appeared! What will you do?",
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
        background: "route1.png",
        next: "Cubonefight"
    },
    catchCubone: {
        dialogue: `You chose to catch ...Cubone!`,
        background: "route1.png",
        next: "Cubonecapture",
    },
    runFromCubone: {
        dialogue: `You attempted to flee from ...Cubone!`,
        background: "route1.png",
        next: "Cubonerun",
    },

    Cubonefight: {
        dialogue: `You ${fiftyfifty()} against Cubone!`,
        background: "route1.png",
        next: "routetwo1", 
    },

    Cubonecapture: {

        dialogue: `You ${capture()} Cubone!`,
        background: "route1.png", 
        next: "routetwo1",
    },

    Cubonerun: {
        
        dialogue: `You successfully ran away from Cubone...`,
        background: "blackscreen.jpg",
        next: "routetwo1",
    },

    // munchlax option
    chosenMunchlax: {
        dialogue: "A wild Munchlax has appeared! What will you do?",
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
        background: "route1.png",
        next: "Munchlaxfight"
    },
    catchMunchlax: {
        dialogue: `You chose to catch ...Munchlax!`,
        background: "route1.png",
        next: "CatchMunchlax",
    },
    runFromMunchlax: {
        dialogue: `You attempted to flee from ...Munchlax!`,
        background: "route1.png",
        next: "Munchlaxrun",
    },


    Munchlaxfight:{
        dialogue: `You ${fiftyfifty()} against Munchlax!`,
        background: "route1.png", 
        next: "routetwo1",
},

    CatchMunchlax:{
        dialogue: `You ${capture()} Munchlax!`,
        background: "route1.png", 
        next: "routetwo1",
},
    Munchlaxrun:{ 
        dialogue: `You successfully ran away from Munchlax...`,
        background: "blackscreen.jpg",
        next: "routetwo1",
    },

//route 2!!!
    routetwo1:{
        dialogue: `After your encounter, you reach route 2: Berry Woods.`,
        background: "route2.png",
        next: "routetwo2",

    }, 

    routetwo2:{
        dialogue: `This area is a forest filled with unique Pokemon. You and your Pokemon decided to rest for a while in this nice environment, so you sit around underneath a tree. `,
        background: "route2.png",
        next: "routetwo3",
    }, 

    routetwo3: {
        dialogue: ` But suddenly, you hear the bushes rustling close by.`,
        background: "route2.png",
        next: "routetwo4",
    },

    routetwo4: {
        dialogue: `You notice there are three Pokemon hiding in the bush and preparing a battle with you! `,
        background: "route2.png",
        next: "routetwo5",
    },

}














// stuff

let currentScene = "intro";


const nameEl = document.getElementById("name");
const dialogueEl = document.getElementById("dialogue");
const bgEl = document.getElementById("background");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");

function loadScene(sceneKey) {
    const scene = scenes[sceneKey];

    dialogueEl.textContent =
        typeof scene.dialogue === `function`
            ? scene.dialogue()
            : scene.dialogue;

    bgEl.src = scene.background || "";


    optionsEl.innerHTML = "";

    if (scene.options) {
        nextBtn.style.display = "none";

        scene.options.forEach(option => {
            const btn = document.createElement("button");
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