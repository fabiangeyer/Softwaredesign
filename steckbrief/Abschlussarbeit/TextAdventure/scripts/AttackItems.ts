import { Item } from "./Items.js";
import { Player } from "./Player.js";

export class AttackItem extends Item {

    private attackValue: number

    constructor(_itemKey: string, _itemName: string, _itemDescription: string, _attackValue: number) {
        super(_itemKey, _itemName, _itemDescription)

        this.attackValue = _attackValue;
    }

    useItem(_player: Player): void {
        _player.playerAttackValue = _player.playerAttackValue + this.attackValue;

        document.getElementById("gameText").innerHTML = " You used " + this.itemName + ". <br> Your Attack value is now at " + _player.playerAttackValue + "."
    }
}