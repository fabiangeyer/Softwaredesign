import { Item } from "./Items.js";
export class HealingItem extends Item {
    constructor(_itemKey, _itemName, _itemDescription, _healValue) {
        super(_itemKey, _itemName, _itemDescription);
        this.healValue = _healValue;
    }
    useItem(_player) {
        _player.health = _player.health + this.healValue;
        if (_player.health > _player.maxHealth)
            _player.health = _player.maxHealth;
        document.getElementById("gameText").innerHTML = " You used " + this.itemName + ". <br> Your Health is now at " + _player.health + ".";
    }
}
//# sourceMappingURL=HealingItems.js.map