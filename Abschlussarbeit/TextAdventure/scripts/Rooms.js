export class Room {
    constructor(_key, _roomTitle, _roomContent, _roomCharacters, _roomQuests, _roomDescription, _northExit, _southExit, _eastExit, _westExit) {
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
        let roomText = "";
        roomText += this.roomDescription + "<br> <br>";
        roomText += this.checkForCharacters();
        roomText += this.checkForItems();
        roomText += this.checkForQuests();
        roomText += this.checkForExits();
        document.getElementById("gameText").innerHTML = roomText;
    }
    checkForQuests() {
        let roomText = "";
        for (let questsIndex = 0; questsIndex < this.roomQuests.length; questsIndex++) {
            if (this.roomQuests[questsIndex].isCompleted == false)
                roomText += this.roomQuests[questsIndex].questDescriptions[0] + "<br> <br>";
        }
        return roomText;
    }
    checkForExits() {
        let roomText = "";
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
    checkForCharacters() {
        let roomText = "";
        if (this.roomCharacters.length != 0) {
            roomText += "There is <br>";
            for (let index = 0; index < this.roomCharacters.length; index++) {
                roomText += this.roomCharacters[index].npcName + "<br> <br>";
            }
        }
        return roomText;
    }
    checkForItems() {
        let roomText = "";
        if (this.roomContent.length != 0) {
            roomText += "You can see <br>";
            for (let index = 0; index < this.roomContent.length; index++) {
                roomText += this.roomContent[index].itemName + "<br>";
            }
            roomText += "in the Room <br> <br>";
        }
        return roomText;
    }
}
//# sourceMappingURL=Rooms.js.map