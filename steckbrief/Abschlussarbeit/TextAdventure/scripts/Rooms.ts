import { Item } from "./Items.js"
import { NPC } from "./NPCs.js"
import { Quest } from "./Quests.js";

export class Room {

    public key: string;
    public roomTitle: string;
    public roomDescription: string;

    public northExit: Room;
    public southExit: Room;
    public eastExit: Room;
    public westExit: Room;

    public roomContent: Item[];
    public roomCharacters: NPC[];
    public roomQuests: Quest[];

    constructor(_key: string, _roomTitle: string, _roomContent: Item[], _roomCharacters: NPC[], _roomQuests: Quest[], _roomDescription?: string, _northExit?: Room, _southExit?: Room, _eastExit?: Room, _westExit?: Room,) {
        this.key = _key;
        this.roomTitle = _roomTitle;
        this.roomDescription = _roomDescription;
        this.northExit = _northExit;
        this.southExit = _southExit;
        this.eastExit = _eastExit;
        this.westExit = _westExit;
        this.roomContent = _roomContent;
        this.roomCharacters = _roomCharacters;
        this.roomQuests = _roomQuests;
    }

    createRoomDescription() {

        let roomText: string = "";

        roomText += this.roomDescription + "<br> <br>";


        roomText += this.checkForCharacters();
        roomText += this.checkForItems();
        roomText += this.checkForQuests();
        roomText += this.checkForExits();


        document.getElementById("gameText").innerHTML = roomText;
    }


    private checkForQuests() {

        let roomText: string = "";
        for (let questsIndex: number = 0; questsIndex < this.roomQuests.length; questsIndex++) {
            if (this.roomQuests[questsIndex].isCompleted == false)
                roomText += this.roomQuests[questsIndex].questDescriptions[0] + "<br> <br>"
        }

        return roomText;
    }

    private checkForExits() {

        let roomText: string = "";
        if (this.northExit != null)
            roomText += "In the north is a " + this.northExit.roomTitle + "<br>";
        if (this.southExit != null)
            roomText += "In the south is a " + this.southExit.roomTitle + "<br>";
        if (this.eastExit != null)
            roomText += "In the east is a " + this.eastExit.roomTitle + "<br>";
        if (this.westExit != null)
            roomText += "In the west is a " + this.westExit.roomTitle + "<br>";

        return roomText;

    }

    private checkForCharacters() {

        let roomText: string = "";
        if (this.roomCharacters.length != 0) {
            roomText += "There is <br>";
            for (let index: number = 0; index < this.roomCharacters.length; index++) {
                roomText += this.roomCharacters[index].npcName + "<br> <br>"
            }
        }
        return roomText;
    }

    private checkForItems() {

        let roomText: string = "";
        if (this.roomContent.length != 0) {
            roomText += "You can see <br>";
            for (let index: number = 0; index < this.roomContent.length; index++) {
                roomText += this.roomContent[index].itemName + "<br>"
            }
            roomText += "in the Room <br> <br>";
        }
        return roomText;

    }
}