import { Item } from "./Items.js";
export class AttackItem extends Item {
    constructor(_itemKey, _itemName, _itemDescription, _attackValue) {
        super(_itemKey, _itemName, _itemDescription);
        this.attackValue = _attackValue;
    }
    useItem(_player) {
        _player.playerAttackValue = _player.playerAttackValue + this.attackValue;
        document.getElementById("gameText").innerHTML = " You used " + this.itemName + ". <br> Your Attack value is now at " + _player.playerAttackValue + ".";
    }
}
//# sourceMappingURL=AttackItems.js.map