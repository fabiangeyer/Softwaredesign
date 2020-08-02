import { Player } from "./Player.js";
export class Actor {
    constructor(_health, _maxHealth, _inventory, _position) {
        this.health = _health;
        this.maxHealth = _maxHealth;
        this.inventory = _inventory;
        this.position = _position;
    }
    takeDamage(_damageValue) {
        this.health = this.health - _damageValue;
    }
    showInventory() {
        let inventoryString = "";
        for (let index = 0; index < this.inventory.length; index++) {
            inventoryString += this.inventory[index].itemName + "<br>";
        }
        if (this.inventory.length != 0) {
            document.getElementById("gameText").innerHTML = inventoryString;
        }
        else {
            document.getElementById("gameText").innerHTML = "Your Inventory is empty";
        }
    }
    pickupItem(_item) {
        for (let index = 0; index < this.position.roomContent.length; index++) {
            if (this.position.roomContent[index].itemName == _item) {
                this.inventory.push(this.position.roomContent[index]);
                this.position.roomContent.splice(index, 1);
                if (this instanceof Player) {
                    document.getElementById("gameText").innerHTML = "You picked up " + _item;
                }
            }
            else {
                if (this instanceof Player) {
                    document.getElementById("gameText").innerHTML = "There is no " + _item + " in the Room";
                }
            }
        }
    }
    dropItem(_item) {
        for (let index = 0; index < this.inventory.length; index++) {
            if (this.inventory[index].itemName == _item) {
                this.position.roomContent.push(this.inventory[index]);
                this.inventory.splice(index, 1);
                if (this instanceof Player) {
                    document.getElementById("gameText").innerHTML = "You droped " + _item;
                }
            }
            else {
                if (this instanceof Player) {
                    document.getElementById("gameText").innerHTML = "There is no " + _item + " in your Inventory";
                }
            }
        }
    }
}
//# sourceMappingURL=Actors.js.map