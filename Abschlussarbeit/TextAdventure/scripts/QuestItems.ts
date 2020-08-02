import { Item } from "./Items.js";
import { Player } from "./Player.js"

export class QuestItem extends Item {


    constructor(_itemKey: string, _itemName: string, _itemDescription: string) {
        super(_itemKey, _itemName, _itemDescription)

    }

    useItem(_player: Player): void {

        for (let questIndex: number = 0; questIndex < _player.position.roomQuests.length; questIndex++)
            if (_player.position.roomQuests[questIndex].requiredItem == this) {
                _player.position.roomQuests[questIndex].completeQuest(_player);
            }
            else
                document.getElementById("gameText").innerHTML = "You can't use " + this.itemName + " here."
    }
}