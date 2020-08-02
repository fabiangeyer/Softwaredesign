import { NPC } from "./NPCs.js";
import { Item } from "./Items.js"
import { Room } from "./Rooms.js"


export class FriendlyNPC extends NPC {

    public dialogueTexts: string[];


    constructor(_key: string, _npcName: string, _npcDescription: string, _health: number, _maxHealth: number, _position: Room, _npcMovementPath: Room[], _inventory: Item[], _dialogueTexts: string[]) {
        super(_key, _npcName, _npcDescription, _health, _maxHealth, _position, _npcMovementPath, _inventory,)

        this.dialogueTexts = _dialogueTexts;

    }

    npcResponse() {

        if (this.talkedTo == false) {
            document.getElementById("gameText").innerHTML = this.dialogueTexts[0];
            this.talkedTo = true;
        } else {
            document.getElementById("gameText").innerHTML = this.dialogueTexts[1];
        }
    }

    npcAI(_indexInRoom: number): void {
        if (this.health > 0) {
            let friendlyAIDecision: number = Math.floor(Math.random() * 2);
            switch (friendlyAIDecision) {
                case 0: {
                    this.npcMovement(_indexInRoom);
                }
                case 1: {
                    let wantedItem: Item = this.position.roomContent[0]
                    if (wantedItem != undefined)
                        this.pickupItem(wantedItem.itemName);
                }
            }
        } else this.npcDeath();
    }

    npcDeath() {
        document.getElementById("combatText").innerHTML += "<br>" + this.npcName + " has been killed by you!"

        for (let index: number = 0; index < this.inventory.length; index++) {
            this.dropItem(this.inventory[index].itemName)
        }

        for (let index: number = 0; index < this.position.roomCharacters.length; index++) {
            if (this.position.roomCharacters[index].npcName == this.npcName)
                this.position.roomCharacters.splice(index, 1)
        }

        this.position = null;
    }



}