import { Actor } from "./Actors.js";
import { FriendlyNPC } from "./FriendlyNPC.js";
import { HealingItem } from "./HealingItems.js";
import { QuestItem } from "./QuestItems.js";
import { AttackItem } from "./AttackItems.js";
export class Player extends Actor {
    constructor(_playerName, _playerAttackValue, _health, _maxHealth, _position, _inventory) {
        super(_health, _maxHealth, _inventory, _position);
        this.playerName = _playerName;
        this.playerAttackValue = _playerAttackValue;
    }
    playerMovement(_playerDirectionInput) {
        switch (_playerDirectionInput) {
            case "n": {
                if (this.position.northExit != null)
                    this.position = this.position.northExit;
                else
                    document.getElementById("combatText").innerHTML = " There is no path in that direction.";
                break;
            }
            case "s": {
                if (this.position.southExit != null)
                    this.position = this.position.southExit;
                else
                    document.getElementById("combatText").innerHTML = " There is no path in that direction.";
                break;
            }
            case "e": {
                if (this.position.eastExit != null)
                    this.position = this.position.eastExit;
                else
                    document.getElementById("combatText").innerHTML = " There is no path in that direction.";
                break;
            }
            case "w": {
                if (this.position.westExit != null)
                    this.position = this.position.westExit;
                else
                    document.getElementById("combatText").innerHTML = " There is no path in that direction.";
                break;
            }
        }
    }
    playerLookAt(_wantedObject) {
        if (_wantedObject == undefined || _wantedObject == "Room") {
            this.position.createRoomDescription();
        }
        else {
            let descriptionString = "";
            for (let i = 0; i < this.position.roomContent.length; i++) {
                if (this.position.roomContent[i].itemName == _wantedObject) {
                    descriptionString = this.position.roomContent[i].itemDescription;
                }
            }
            for (let i = 0; i < this.inventory.length; i++) {
                if (this.inventory[i].itemName == _wantedObject) {
                    descriptionString = this.inventory[i].itemDescription;
                }
            }
            for (let i = 0; i < this.position.roomCharacters.length; i++) {
                if (this.position.roomCharacters[i].npcName == _wantedObject) {
                    descriptionString = this.position.roomCharacters[i].npcDescription;
                }
            }
            if (descriptionString != "") {
                document.getElementById("gameText").innerHTML = descriptionString;
            }
            else {
                document.getElementById("gameText").innerHTML = "There is no " + _wantedObject + " in the Room";
            }
        }
    }
    attackTarget(_targetString) {
        let targetNPC;
        let combatText = "";
        for (let i = 0; i < this.position.roomCharacters.length; i++) {
            if (this.position.roomCharacters[i].npcName == _targetString) {
                targetNPC = this.position.roomCharacters[i];
            }
        }
        if (targetNPC != null) {
            let prescision = Math.floor(Math.random() * 5);
            switch (prescision) {
                case 0:
                case 1:
                case 2:
                case 3: {
                    targetNPC.takeDamage(this.playerAttackValue);
                    combatText += "You attack the " + targetNPC.npcName + " for " + this.playerAttackValue + "! <br>";
                    break;
                }
                case 4: {
                    combatText += "It dodged the attack!";
                    break;
                }
            }
            document.getElementById("combatText").innerHTML += "<br> <br>" + combatText;
        }
        else {
            document.getElementById("combatText").innerHTML = "There is no " + _targetString + " in the Room! Try again.";
        }
    }
    talkToTarget(_targetString) {
        let targetNPC;
        for (let i = 0; i < this.position.roomCharacters.length; i++) {
            if (this.position.roomCharacters[i].npcName == _targetString) {
                targetNPC = this.position.roomCharacters[i];
            }
            if (targetNPC instanceof FriendlyNPC) {
                targetNPC.npcResponse();
            }
            else {
                document.getElementById("gameText").innerHTML = "I don't think it wants to talk about it!";
            }
        }
    }
    useItem(_itemName) {
        let wasFound = false;
        for (let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i].itemName == _itemName) {
                if (this.inventory[i] instanceof HealingItem) {
                    this.inventory[i].useItem(this);
                    this.inventory.splice(i, 1);
                    wasFound = true;
                    break;
                }
                if (this.inventory[i] instanceof QuestItem) {
                    this.inventory[i].useItem(this);
                    this.inventory.splice(i, 1);
                    wasFound = true;
                    break;
                }
                if (this.inventory[i] instanceof AttackItem) {
                    this.inventory[i].useItem(this);
                    this.inventory.splice(i, 1);
                    wasFound = true;
                    break;
                }
            }
        }
        if (wasFound == false) {
            document.getElementById("gameText").innerHTML = _itemName + " was not found in your Inventory.";
        }
    }
    checkPlayerDeath() {
        if (this.health <= 0) {
            document.getElementById("combatText").innerHTML += "You died! Reload the Page to Play again!";
            document.getElementById("menuUserInput").remove();
        }
    }
}
//# sourceMappingURL=Player.js.map