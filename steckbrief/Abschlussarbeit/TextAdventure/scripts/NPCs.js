import { Actor } from "./Actors.js";
export class NPC extends Actor {
    constructor(_key, _npcName, _npcDescription, _health, _maxHealth, _position, _npcMovementPath, _inventory) {
        super(_health, _maxHealth, _inventory, _position);
        this.talkedTo = false;
        this.key = _key;
        this.npcName = _npcName;
        this.npcDescription = _npcDescription;
        this.npcMovementPath = _npcMovementPath;
    }
    npcMovement(_indexInRoom) {
        let aiMovementDecision = Math.floor(Math.random() * 4);
        switch (aiMovementDecision) {
            case 0: { // move north
                if (this.position.northExit != null)
                    if (this.npcMovementPath.indexOf(this.position.northExit) != -1) {
                        this.position.roomCharacters.splice(_indexInRoom, 1);
                        this.position = this.position.northExit;
                        this.position.roomCharacters.push(this);
                    }
                break;
            }
            case 1: { // move south
                if (this.position.southExit != null)
                    if (this.npcMovementPath.indexOf(this.position.southExit) != -1) {
                        this.position.roomCharacters.splice(_indexInRoom, 1);
                        this.position = this.position.southExit;
                        this.position.roomCharacters.push(this);
                    }
                break;
            }
            case 2: { // move east
                if (this.position.eastExit != null)
                    if (this.npcMovementPath.indexOf(this.position.eastExit) != -1) {
                        this.position.roomCharacters.splice(_indexInRoom, 1);
                        this.position = this.position.eastExit;
                        this.position.roomCharacters.push(this);
                    }
                break;
            }
            case 3: { // move west
                if (this.position.westExit != null)
                    if (this.npcMovementPath.indexOf(this.position.westExit) != -1) {
                        this.position.roomCharacters.splice(_indexInRoom, 1);
                        this.position = this.position.westExit;
                        this.position.roomCharacters.push(this);
                    }
                break;
            }
        }
    }
}
//# sourceMappingURL=NPCs.js.map