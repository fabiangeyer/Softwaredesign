import { Player } from "./Player.js";
import { map } from "./GameWorld.js";
import { SaveFile } from "./SaveFiles.js";
import { startRoom, initGame } from "./GameWorld.js";

let menuText: string = "Welcome to the Game. <br> <br> Enter 'start'(s) to start a new game or 'load'(l) to load a existing Save File. <br> <br> 'quit'(q) to Quit";

let introduction: string =
    "You are an young archeologist, studying the acient egypten history. <br> One month ago you childhood friend and long time partner in the field, Joffrey, asked you to join him and a small Team on an excavation in the ruins around the great Pyrimids of Giza <br> You ofcourse didn't say no to such an oportunity and so found yourself in the sands of egypt two weeks later. <br> <br> A couple of days ago you noticed a change in personality in Joffrey. He seems restless. You couldn't tell exactly what was wrong besides the fact that he wouldn't stop saying he found glyphs that are unknown to mankind and are possibly older than the ancient civilisations.<br> This night you noticed that your friend wasn't sleeping in his tent. Worried about him, you started searching Joffrey at the excavation side.<br> You have a feeling of dread entering the ruins. Whispers seem to come from deeper inside the stone halls. <br> Suddenly the ground beneath your feed is giving in! And you fall down into the ancient ruins. <br> <br> Enter your name to start.";

let currentPlayer: Player = new Player("placeholder", 10, 100, 100, startRoom, []);

document.getElementById("gameText").innerHTML = menuText;

let menuUserInput: HTMLInputElement = document.createElement("input");
menuUserInput.setAttribute("type", "text");
menuUserInput.setAttribute("id", "menuUserInput");
document.getElementById("main").appendChild(menuUserInput);
menuUserInput.addEventListener("change", handleMenuInputEvent);



function getMenuUserInput(_userInput: string) {

    let userInputArray: string[] = _userInput.split(" ")
    let userActionInput: string = userInputArray[0];
    let userObjectInput: string = userInputArray[1];

    switch (userActionInput) {
        case "start":
        case "s": {
            initGame();
            document.getElementById("gameText").innerHTML = introduction;
            document.getElementById("menuUserInput").removeEventListener("change", handleMenuInputEvent);
            menuUserInput.addEventListener("change", handlePlayerNameInputEvent);
            break;
        }
        case "load":
        case "l": {
            initGame();
            handleLoadingMenu(userObjectInput);
            break;
        }
        case "quit":
        case "q": {
            window.close();
            break;
        }
        default: {
            document.getElementById("gameText").innerHTML += "No valid Input";
            break;
        }
    }
}


function createPlayerCharacter(_userName: string) {
    currentPlayer = new Player(_userName, 10, 100, 100, startRoom, []);
    currentPlayer.position.createRoomDescription();
    document.getElementById("menuUserInput").removeEventListener("change", handlePlayerNameInputEvent);
    menuUserInput.addEventListener("change", handlePlayerInputEvent)
}


function getPlayerInput(_userInput: string) {

    let userInputArray: string[] = _userInput.split(" ")
    let userActionInput: string = userInputArray[0];
    let userObjectInput: string = userInputArray[1];

    document.getElementById("combatText").innerHTML = "";

    switch (userActionInput) {
        case "n":
        case "north":
        case "s":
        case "south":
        case "e":
        case "east":
        case "w":
        case "west": {
            currentPlayer.playerMovement(_userInput);
            handleNpcAI(currentPlayer);
            currentPlayer.position.createRoomDescription();
            break;
        }
        case "a":
        case "attack": {
            currentPlayer.attackTarget(userObjectInput);
            handleNpcAI(currentPlayer);
            break;
        }
        case "l":
        case "look": {
            currentPlayer.playerLookAt(userObjectInput);
            break;
        }
        case "i":
        case "inventory": {
            currentPlayer.showInventory();
            break;
        }
        case "pickup":
        case "p": {
            currentPlayer.pickupItem(userObjectInput);
            break;
        }
        case "drop":
        case "d": {
            currentPlayer.dropItem(userObjectInput);
            break;
        }
        case "talk":
        case "t": {
            currentPlayer.talkToTarget(userObjectInput);
            break;
        }
        case "use":
        case "u": {
            currentPlayer.useItem(userObjectInput);
            break;
        }
        case "commands":
        case "help":
        case "c": {
            document.getElementById("gameText").innerHTML = "commands: <br> 'north' (n), 'south' (s), 'east' (e), 'west' (w) to move in a direction <br> 'look' (l) + 'target' to take a look at something <br> 'attack' (a) + 'target' to attack an enemy <br> 'inventory' (i) to open inventory <br> 'talk' (t) + 'target' to talk to an NPC <br> 'pickup' (p) + 'target' to pick up an item <br> 'drop' (d) to drop an item to the room <br> 'use' (u) + 'target' to use an item <br> 'save' to save the current progress <br>'load' to load the last SaveFile <br> 'menu' (m) to return to the main menu";
            break;
        }
        case "save":
        case "s": {
            let newSaveFile = new SaveFile();
            newSaveFile.saveSaveFile(currentPlayer.playerName, currentPlayer);
            break;
        }
        case "load": {
            let loadedSaveFileAny: SaveFile = JSON.parse(localStorage.getItem(currentPlayer.playerName));
            let loadedSaveFile = new SaveFile();
            loadedSaveFile.roomKeysWithContentKeys = loadedSaveFileAny.roomKeysWithContentKeys;
            loadedSaveFile.npcKeysWithInformation = loadedSaveFileAny.npcKeysWithInformation;
            loadedSaveFile.playerHealth = loadedSaveFileAny.playerHealth;
            loadedSaveFile.playerInventory = loadedSaveFileAny.playerInventory;
            loadedSaveFile.playerPositionKey = loadedSaveFileAny.playerPositionKey;
            loadedSaveFile.questKeysWithValues = loadedSaveFileAny.questKeysWithValues;
            loadedSaveFile.loadSaveFile(currentPlayer);
            break;
        }
        case "menu":
        case "m": {
            menuUserInput.removeEventListener("change", handlePlayerInputEvent);
            document.getElementById("gameText").innerHTML = menuText;
            menuUserInput.addEventListener("change", handleMenuInputEvent);
            break;

        }
        default: {
            document.getElementById("gameText").innerHTML = "No valid action input, typ help/commands or c to see all valid inputs.";
            break;
        }
    }
}



function handleMenuInputEvent(): void {
    getMenuUserInput((<HTMLInputElement>document.getElementById("menuUserInput")).value);
    menuUserInput.value = "";
}

function handlePlayerNameInputEvent(): void {
    createPlayerCharacter((<HTMLInputElement>document.getElementById("menuUserInput")).value);
    menuUserInput.value = "";
}

function handlePlayerInputEvent(): void {
    getPlayerInput((<HTMLInputElement>document.getElementById("menuUserInput")).value);
    menuUserInput.value = "";
}

function handleLoadingMenu(_userObjectInput: string): void {
    if (_userObjectInput == undefined || _userObjectInput == "" || _userObjectInput == null) {
        document.getElementById("gameText").innerHTML = "Enter l + <FileName> to load Save File";

        let loadingMenuString: string = "";
        for (let index: number = 0; index < localStorage.length; index++) {
            loadingMenuString += localStorage.key(index) + "<br>";
        }
        document.getElementById("gameText").innerHTML += "<br>" + loadingMenuString;
    } else {
        let loadedSaveFileAny: SaveFile = JSON.parse(localStorage.getItem(_userObjectInput));
        let loadedSaveFile = new SaveFile();
        loadedSaveFile.roomKeysWithContentKeys = loadedSaveFileAny.roomKeysWithContentKeys;
        loadedSaveFile.npcKeysWithInformation = loadedSaveFileAny.npcKeysWithInformation;
        loadedSaveFile.playerHealth = loadedSaveFileAny.playerHealth;
        loadedSaveFile.playerInventory = loadedSaveFileAny.playerInventory;
        loadedSaveFile.playerPositionKey = loadedSaveFileAny.playerPositionKey;
        loadedSaveFile.questKeysWithValues = loadedSaveFileAny.questKeysWithValues;
        loadedSaveFile.loadSaveFile(currentPlayer);
        menuUserInput.removeEventListener("change", handleMenuInputEvent);
        menuUserInput.addEventListener("change", handlePlayerInputEvent);
        currentPlayer.playerLookAt("Room");
    }
}


function handleNpcAI(_player: Player): void {
    for (let i: number = 0; i < map.length; i++) {
        for (let j: number = 0; j < map[i].roomCharacters.length; j++) {
            map[i].roomCharacters[j].npcAI(j, _player);
        }
    }
}