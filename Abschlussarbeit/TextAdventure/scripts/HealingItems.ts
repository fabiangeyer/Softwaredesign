import { Item } from "./Items.js";
import { Player } from "./Player.js";

export class HealingItem extends Item {

    private healValue: number

    constructor(_itemKey: string, _itemName: string, _itemDescription: string, _healValue: number) {
        super(_itemKey, _itemName, _itemDescription)

        this.healValue = _healValue;
    }

    useItem(_player: Player): void {
        _player.health = _player.health + this.healValue;

        if (_player.health > _player.maxHealth)
            _player.health = _player.maxHealth;

        document.getElementById("gameText").innerHTML = " You used " + this.itemName + ". <br> Your Health is now at " + _player.health + "."
    }
}