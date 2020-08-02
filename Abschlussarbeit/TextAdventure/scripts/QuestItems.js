import { Item } from "./Items.js";
export class QuestItem extends Item {
    constructor(_itemKey, _itemName, _itemDescription) {
        super(_itemKey, _itemName, _itemDescription);
    }
    useItem(_player) {
        for (let questIndex = 0; questIndex < _player.position.roomQuests.length; questIndex++)
            if (_player.position.roomQuests[questIndex].requiredItem == this) {
                _player.position.roomQuests[questIndex].completeQuest(_player);
            }
            else
                document.getElementById("gameText").innerHTML = "You can't use " + this.itemName + " here.";
    }
}
//# sourceMappingURL=QuestItems.js.map