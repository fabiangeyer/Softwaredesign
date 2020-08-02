import { Item } from "./Items.js";
import { Room } from "./Rooms.js";
export class Quest {
    constructor(_key, _requiredItem, _questDescriptions, _questReward) {
        this.key = _key;
        this.isCompleted = false;
        this.requiredItem = _requiredItem;
        this.questDescriptions = _questDescriptions;
        this.questReward = _questReward;
    }
    completeQuest(_player) {
        this.isCompleted = true;
        if (this.questReward instanceof Item)
            this.rewardItem(this.questReward, _player);
        if (this.questReward instanceof Room) {
            this.rewardRoom(this.questReward, _player);
        }
    }
    rewardItem(_itemReward, _player) {
        _player.inventory.push(_itemReward);
        document.getElementById("gameText").innerHTML += "<br> <br>" + this.questDescriptions[1];
        document.getElementById("gameText").innerHTML += "<br> " + _itemReward.itemName + " has been added to you inventory!";
    }
    rewardRoom(_roomReward, _player) {
        if (_roomReward.southExit == _player.position && _player.position.northExit == null) {
            _player.position.northExit = _roomReward;
            _player.position.createRoomDescription();
            document.getElementById("gameText").innerHTML += "<br> <br>" + this.questDescriptions[1];
        }
        if (_roomReward.northExit == _player.position && _player.position.southExit == null) {
            _player.position.southExit = _roomReward;
            _player.position.createRoomDescription();
            document.getElementById("gameText").innerHTML += "<br> <br>" + this.questDescriptions[1];
        }
        if (_roomReward.eastExit == _player.position && _player.position.westExit == null) {
            _player.position.westExit = _roomReward;
            _player.position.createRoomDescription();
            document.getElementById("gameText").innerHTML += "<br> <br>" + this.questDescriptions[1];
        }
        if (_roomReward.westExit == _player.position && _player.position.eastExit == null) {
            _player.position.eastExit = _roomReward;
            _player.position.createRoomDescription();
            document.getElementById("gameText").innerHTML += "<br> <br>" + this.questDescriptions[1];
        }
    }
}
//# sourceMappingURL=Quests.js.map