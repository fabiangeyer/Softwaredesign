import { Item } from "./Items.js";
import { Room } from "./Rooms.js";
import { Player } from "./Player.js";

export class Quest {

    public key: string;
    public isCompleted: boolean;
    public requiredItem: Item;
    public questDescriptions: string[];
    public questReward: (Item | Room);

    constructor(_key: string, _requiredItem: Item, _questDescriptions: string[], _questReward: (Item | Room)) {
        this.key = _key;
        this.isCompleted = false;
        this.requiredItem = _requiredItem;
        this.questDescriptions = _questDescriptions;
        this.questReward = _questReward;
    }

    completeQuest(_player: Player): void {
        this.isCompleted = true;
        if (this.questReward instanceof Item)
            this.rewardItem(this.questReward, _player);
        if (this.questReward instanceof Room) {
            this.rewardRoom(this.questReward, _player);
        }
    }



    private rewardItem(_itemReward: Item, _player: Player): void {

        _player.inventory.push(_itemReward);
        document.getElementById("gameText").innerHTML += "<br> <br>" + this.questDescriptions[1];
        document.getElementById("gameText").innerHTML += "<br> " + _itemReward.itemName + " has been added to you inventory!";

    }

    private rewardRoom(_roomReward: Room, _player: Player): void {
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