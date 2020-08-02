import { Item } from "./Items.js"
import { Room } from "./Rooms.js"
import { Actor } from "./Actors.js"
import { Player } from "./Player.js"

export abstract class NPC extends Actor {

    public key: string;
    public npcName: string;
    public npcDescription: string;
    public npcMovementPath: Room[];
    public talkedTo: boolean;

    constructor(_key: string, _npcName: string, _npcDescription: string, _health: number, _maxHealth: number, _position: Room, _npcMovementPath: Room[], _inventory: Item[]) {
        super(_health, _maxHealth, _inventory, _position)

        this.talkedTo = false;
        this.key = _key;
        this.npcName = _npcName;
        this.npcDescription = _npcDescription;
        this.npcMovementPath = _npcMovementPath;
    }

    abstract npcAI(_indexInRoom: number, _player: Player): void;

    abstract npcResponse(): void;

    abstract npcDeath(): void;

    npcMovement(_indexInRoom: number) {

        let aiMovementDecision: number = Math.floor(Math.random() * 4);

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