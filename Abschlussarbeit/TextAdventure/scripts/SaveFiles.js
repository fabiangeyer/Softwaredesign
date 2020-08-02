import { map, activeItems, activeNpcs, activeQuests } from "./GameWorld.js";
export class SaveFile {
    constructor() {
        this.playerName = "";
        this.playerHealth = "";
        this.playerPositionKey = "";
        this.playerInventory = [];
        this.questKeysWithValues = [];
        this.roomKeysWithContentKeys = [];
        this.npcKeysWithInformation = [];
    }
    saveSaveFile(_saveFileKey, _player) {
        this.savePlayerInformation(_player);
        this.saveRoomsWithContentAndNpcs(map);
        this.saveNpcInformation();
        this.saveQuestInformation();
        let NewSaveFile_serialized = JSON.stringify(this);
        localStorage.setItem(_saveFileKey, NewSaveFile_serialized);
        document.getElementById("gameText").innerHTML = "Your Progress has been saved!";
    }
    loadSaveFile(_player) {
        this.loadPlayerInformation(_player);
        this.loadRoomsWithContentAndCharacters();
        this.loadNpcInformations();
        document.getElementById("gameText").innerHTML = "Your SaveFile has been loaded.";
    }
    savePlayerInformation(_player) {
        //save Player Name
        this.playerName = _player.playerName;
        // save Player Position
        this.playerPositionKey = _player.position.key;
        // save Player Health
        this.playerHealth = JSON.stringify(_player.health);
        // save Player Inventory
        for (let index = 0; index < _player.inventory.length; index++) {
            this.playerInventory.push(_player.inventory[index].key);
        }
    }
    saveNpcInformation() {
        let index03 = 0;
        for (let index01 = 0; index01 < activeNpcs.length; index01++) {
            this.npcKeysWithInformation[index03] = activeNpcs[index01].key;
            this.npcKeysWithInformation[index03 + 1] = JSON.stringify(activeNpcs[index01].health);
            let NpcInventory = [];
            for (let index = 0; index < activeNpcs[index01].inventory.length; index++) {
                NpcInventory.push(activeNpcs[index01].inventory[index].key);
            }
            this.npcKeysWithInformation[index03 + 2] = NpcInventory;
            index03 = index03 + 3;
        }
    }
    saveQuestInformation() {
        let index02 = 0;
        for (let index01 = 0; index02 < activeQuests.length; index02++) {
            this.questKeysWithValues[index02] = activeQuests[index01].key;
            this.questKeysWithValues[index02 + 1] = JSON.stringify(activeQuests[index01].isCompleted);
            index02 = index02 + 2;
        }
    }
    saveRoomsWithContentAndNpcs(_Map) {
        // save Each Room
        let index04 = 0;
        for (let index01 = 0; index04 < _Map.length; index01 = index01 + 4) {
            this.roomKeysWithContentKeys[index01] = _Map[index04].key;
            // save Items for each Room
            let RoomContentKeys = [];
            for (let index02 = 0; index02 < _Map[index04].roomContent.length; index02++) {
                RoomContentKeys.push(_Map[index04].roomContent[index02].key);
            }
            this.roomKeysWithContentKeys.push(RoomContentKeys);
            // save NPC for each Room
            let RoomCharacterKeys = [];
            for (let index03 = 0; index03 < _Map[index04].roomCharacters.length; index03++) {
                RoomCharacterKeys.push(_Map[index04].roomCharacters[index03].key);
            }
            this.roomKeysWithContentKeys.push(RoomCharacterKeys);
            // save Quests for each Room
            let RoomQuestKeys = [];
            for (let index05 = 0; index05 < _Map[index04].roomQuests.length; index05++) {
                RoomCharacterKeys.push(_Map[index04].roomQuests[index05].key);
            }
            this.roomKeysWithContentKeys.push(RoomQuestKeys);
            index04++;
        }
    }
    loadPlayerInformation(_player) {
        // load Player Name
        _player.playerName = this.playerName;
        // load Player Health
        _player.health = JSON.parse(this.playerHealth);
        // load Player Position
        for (let index = 0; index < Map.length; index++) {
            if (map[index].key === this.playerPositionKey)
                _player.position = map[index];
        }
        this.loadQuestInformation(_player);
        _player.inventory = [];
        // load Player Inventory
        _player.inventory = [];
        for (let index = 0; index < activeItems.length; index++) {
            if (this.playerInventory.indexOf(activeItems[index].key) != -1)
                _player.inventory.push(activeItems[index]);
        }
    }
    loadRoomsWithContentAndCharacters() {
        let index03 = 0;
        for (let index01 = 0; index03 < this.roomKeysWithContentKeys.length; index01++) {
            map[index01].roomContent = [];
            map[index01].roomCharacters = [];
            for (let index02 = 0; index02 < activeItems.length; index02++) {
                if (this.roomKeysWithContentKeys[index03 + 1].indexOf(activeItems[index02].key) != -1)
                    map[index01].roomContent.push(activeItems[index02]);
            }
            for (let index02 = 0; index02 < activeNpcs.length; index02++) {
                if (this.roomKeysWithContentKeys[index03 + 2].indexOf(activeNpcs[index02].key) != -1)
                    map[index01].roomCharacters.push(activeNpcs[index02]);
            }
            for (let index02 = 0; index02 < activeQuests.length; index02++) {
                if (this.roomKeysWithContentKeys[index03 + 3].indexOf(activeQuests[index02].key) != -1)
                    map[index01].roomQuests.push(activeQuests[index02]);
            }
            index03 = index03 + 4;
        }
    }
    loadNpcInformations() {
        let index02 = 0;
        for (let index01 = 0; index01 < activeNpcs.length; index01++) {
            activeNpcs[index01].health = JSON.parse(this.npcKeysWithInformation[index02 + 1][0]);
            activeNpcs[index01].inventory = [];
            for (let index03 = 0; index03 < this.npcKeysWithInformation[index02 + 2].length; index03++) {
                if (this.npcKeysWithInformation[index02 + 2].indexOf(activeItems[index03].key) != -1)
                    activeNpcs[index01].inventory.push(activeItems[index03]);
            }
            index02 + 3;
        }
    }
    loadQuestInformation(_player) {
        let index02 = 0;
        for (let index01 = 0; index01 < activeQuests.length; index01++) {
            activeQuests[index01].isCompleted = JSON.parse(this.questKeysWithValues[index02 + 1]);
            activeQuests[index01].completeQuest(_player);
            index02 + 2;
        }
    }
}
//# sourceMappingURL=SaveFiles.js.map