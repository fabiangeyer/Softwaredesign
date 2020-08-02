import { Item } from "./Items.js"
import { Room } from "./Rooms.js"
import { NPC } from "./NPCs.js"
import { Player } from "./Player.js"

export class EnemyNPC extends NPC {

    public npcAttackValue: number;


    constructor(_key: string, _npcName: string, _npcDescription: string, _health: number, _maxHealth: number, _position: Room, _npcMovementPath: Room[], _npcAttackValue: number, _inventory: Item[]) {
        super(_key, _npcName, _npcDescription, _health, _maxHealth, _position, _npcMovementPath, _inventory)

        this.npcAttackValue = _npcAttackValue;

    }

    npcResponse() {
        document.getElementById("gameText").innerHTML = "Talking doesn't seem like a good idea."
    }

    npcAI(_indexInRoom: number, _player: Player): void {
        if (this.health > 0) {
            if (this.position == _player.position) {
                this.attackPlayer(_player);
            } else {
                let hostileAIDecision: number = Math.floor(Math.random() * 2);
                switch (hostileAIDecision) {
                    case 0: {
                        this.npcMovement(_indexInRoom);
                    }
                    case 1: {
                        let wantedItem: Item = this.position.roomContent[0]
                        if (wantedItem != undefined)
                            this.pickupItem(wantedItem.itemName);
                    }
                }
            }

        } else this.npcDeath();
    }

    attackPlayer(_player: Player) {


        let combatText: string = "The " + this.npcName + " is going for a Attack! <br>";
        let prescision: number = Math.floor(Math.random() * 4);
        console.log(prescision);
        switch (prescision) {
            case 0:
            case 1:
            case 2: {
                _player.takeDamage(this.npcAttackValue);
                combatText += "You take " + this.npcAttackValue + " damage <br> remaining health: " + _player.health + "<br>";
                break;
            }
            case 3: {
                combatText += "You managed to dodge the attack!";
                break;
            }
        }
        document.getElementById("combatText").innerHTML += combatText;
        _player.checkPlayerDeath();
    }

    npcDeath() {
        document.getElementById("combatText").innerHTML += "<br>" + this.npcName + " has been defeated!"

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