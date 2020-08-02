import { Room } from "./Rooms.js"
import { Item } from "./Items.js";
import { EnemyNPC } from "./EnemyNPCs.js";
import { FriendlyNPC } from "./FriendlyNPC.js";
import { NPC } from "./NPCs.js";
import { QuestItem } from "./QuestItems.js";
import { HealingItem } from "./HealingItems.js";
import { Quest } from "./Quests.js";
import { AttackItem } from "./AttackItems.js";

export let map: Room[] = [];
export let activeItems: Item[] = [];
export let activeNpcs: NPC[] = [];
export let activeQuests: Quest[] = [];

export let startRoom = new Room("Room01", "Barely Lit Room", [], [], []);
startRoom.roomDescription = "You are inside a barely lit Room. The only light comes from up ahead.";

export function initGame() {

    map = [];
    activeItems = [];
    activeNpcs = [];
    activeQuests = [];

    startRoom.roomContent = [];

    map.push(startRoom);

    let darkHall = new Room("Room02", "Dark Storage Hall", [], [], []);
    darkHall.roomDescription = "You are inside a big storage hall, that is lit with Torches on the walls. The stone looks darker then you have seen it befor in other ruins."
    map.push(darkHall);
    let smallCorrdior = new Room("Room03", "Small Corridor", [], [], []);
    map.push(smallCorrdior);
    smallCorrdior.roomDescription = "A small corridor with a view vases and a little altar in the corner. You can spot you friend Joffrey in the shadows of the torches. He doesn't seem okay."
    let redHallway = new Room("Room04", "Hallway with red Stonewalls", [], [], []);
    map.push(redHallway);
    redHallway.roomDescription = "A strangly build Hallway with walls that appear red in the torch light. The stone of the floor and wall seems to be moist for some reason."
    let miniBoosRoom = new Room("Room05", "Sacrafical Room", [], [], []);
    miniBoosRoom.roomDescription = "The Room lights up in blood red as the light of you torch hits it. Everything is covered in a deep red mist."
    map.push(miniBoosRoom);
    let cornerRoom = new Room("Room06", "Corner Room", [], [], []);
    cornerRoom.roomDescription = "You are inside a corner room. There is not much around, expect a view urns that lay shattered on the ground."
    map.push(cornerRoom);
    let greatHall = new Room("Room07", "Great Hall", [], [], []);
    greatHall.roomDescription = "A gigantic Hall with a high celing that is supported by four great pillars. <br> In the center of the room stands a deep black Obelisk. It looks like it's out of the purest obsidian with a perfectly smooth surface. <br> The black monument seems to suck up all the light around it."
    map.push(greatHall);
    let smallStorageRoom = new Room("Room08", "Small Storage Room", [], [], []);
    smallStorageRoom.roomDescription = "A small storage Room. There a two tables with urnes around it and wooden crates in the back."
    map.push(smallStorageRoom);
    let greatHallway = new Room("Room09", "Great Hallway", [], [], []);
    greatHallway.roomDescription = "You are in a long streched Hallway. With a bigger area in the middle, where some torches are lighting a wall with strange glyphs."
    map.push(greatHallway);
    let smallTomb = new Room("Room10", "Small Tomb", [], [], []);
    smallTomb.roomDescription = "A small Tomb. Who was burried here? <br> The grave goods are still around. This would be a great finding for every treasur hunter and archeologist alike."
    map.push(smallTomb);
    let greatTombHall = new Room("Room11", "Great Tomb Hall", [], [], []);
    greatTombHall.roomDescription = "As you enter what appears to be the main tomb chamber. You are overcome by a feeling of dread and fear. <br> Suddenly a voice is penetrating your mind. In a language you have never heard, but you still seem to understand. <br> <br> 'Doubter. Aren't you?' <br> 'You doubt the first of the pharohs!' <br> 'Doubt the first of the summoners!' <br> <br> 'Show yourself!', you scream! <br> <br> 'ahaha', the voice replies. <br> SO BE IT! <br> <br> Darkness floods the great chamber. The celing is breaking away and reveals a dimension of enternal darkness beyond. <br> You feel like loosing all hope gazing upon the dread that lies in front of your eyes. <br>You are hit by a necrotic stench. <br> Over you is hovering a dark figure. A Pharaoh."
    map.push(greatTombHall);
    let creditRoom = new Room("Room12", "Credit Room", [], [], []);
    creditRoom.roomDescription = "The End. <br> <br> This game was inspired by a story from J.M Nelson as part of his Seven Spires anthology. <br> <br> Thank you for playing!"
    map.push(creditRoom);
    let altarRoom = new Room("Room13", "Altar Room", [], [], []);
    map.push(altarRoom);
    altarRoom.roomDescription = "Center of the room is a big altar with countless offerings around it. The walls look damaged and are covered in ancient glyphs. Some egyptian, and others something diffrent. Was Joffrey right?"


    let mummy01 = new EnemyNPC("mummy01", "Mummy", "It's an undead mummy! Wraped in old Bandages. With only black holes where the eyes should be!", 30, 30, redHallway, [redHallway, cornerRoom, greatHall], 20, []);
    activeNpcs.push(mummy01);
    let mummy02 = new EnemyNPC("mummy02", "Mummy", "It's an undead mummy! Wraped in old Bandages. With only black holes where the eyes should be!", 30, 30, altarRoom, [smallStorageRoom, altarRoom, smallTomb], 20, []);
    activeNpcs.push(mummy02);

    let abomination01 = new EnemyNPC("miniBoss01", "Abomination", "A grotesque looking creature. It appears to be some kind of humanoid wolf with three tentacles where his right arm should be. It's lower Jaw is missing. Red Liquid that appears to be Blood is dripping from it's remaing Jaw. It is a living Nightmare!", 100, 100, miniBoosRoom, [miniBoosRoom], 30, []);
    activeNpcs.push(abomination01);

    let joffrey = new FriendlyNPC("joffrey", "Joffrey", "Joffrey seems scared of something. He stares at the southern wall. His gaze seems empty and gone.", 10, 10, smallCorrdior, [smallCorrdior], [], ["Beyond...", "Only Darkness..."]);
    activeNpcs.push(joffrey);

    let nephren = new FriendlyNPC("boss01", "Nephren-Ka", "The black Pharaoh. ... covered in dark Bandages. With a crown on his head that is covered in gazing eyes. <br> ... <br> It's ... <br>It's hard catching a thought... <br> while beeing in his presence.", 9999, 9999, greatTombHall, [greatTombHall], [], ["First of the summoners I am. <br> The greatest of the Pharohs. Whom in my likeness they build such great wonders. <br> I am the great priest of the others. <br> I am the one who speaks with the devourer of stars. <br> I am the bender of realms. <br> I AM NEPHREN-KA! <br> GAZE UPON THE MIGHT OF THE BLACK EMPIRE!", "Step trough the gates of realms. Join your destiny in the city of lost souls, Doubter."]);
    activeNpcs.push(nephren);

    let rubyKey = new QuestItem("key01", "Ruby", "A strange looking Ruby. It seems to be pulsating inside. Can it be used for something?");
    activeItems.push(rubyKey);

    let obsidianKey = new QuestItem("key01", "Obsidian-Dagger", "A curved Dagger with bandaging around it's handle. You feeling dizzy after looking at it for a while.");
    activeItems.push(obsidianKey);

    let bandages01 = new HealingItem("bandages01", "Bandages", "Simple Bandages. Can be used for first aid.", 30);
    activeItems.push(bandages01);
    let bandages02 = new HealingItem("bandages02", "Bandages", "Simple Bandages. Can be used for first aid.", 30);
    activeItems.push(bandages02);
    let bandages03 = new HealingItem("bandages03", "Bandages", "Simple Bandages. Can be used for first aid.", 30);
    activeItems.push(bandages03);


    let spear01 = new AttackItem("spear01", "Spear", "An ancient wooden Spear with a stone tip. It looks old but could still be used to defend yourself.", 10);
    activeItems.push(spear01);

    let machete01 = new AttackItem("machete01", "Machete", "A very used looking Machete. It seems like it has blood stains on the blade.", 20);
    activeItems.push(machete01);

    let gun01 = new AttackItem("gun01", "Revolver", "Joffreys old Magnum... More Damage can't be done... ", 50);
    activeItems.push(gun01);


    let RedRoomQuest01 = new Quest("keyQuest01", rubyKey, ["There seems to be some kind of socket on the western wall.", "The wall begins to open up, while red mist is engolfing you. There is a growling in the darkness ahead of you."], miniBoosRoom)
    activeQuests.push(RedRoomQuest01);

    let BossRoomQuest01 = new Quest("keyQuest02", obsidianKey, ["The Obelisk seems to ... want something ...?", "You grib the edge of the blade with you palm tightly until it starts bleeding. Your Hand wanders to the surface of the Obelisk on its own. <br> A strong pulse is going through you body that brings you to your knees. <br> While you are trying to get up you see the great doors opening behind the Obelisk."], greatTombHall)
    activeQuests.push(BossRoomQuest01);


    startRoom.northExit = darkHall;

    darkHall.westExit = smallCorrdior;
    darkHall.northExit = greatHall;
    darkHall.southExit = startRoom;
    darkHall.eastExit = smallTomb;
    darkHall.roomContent.push(spear01);

    smallCorrdior.northExit = redHallway;
    smallCorrdior.eastExit = darkHall;
    smallCorrdior.roomContent.push(bandages01);
    smallCorrdior.roomCharacters.push(joffrey);

    redHallway.southExit = smallCorrdior;
    redHallway.northExit = cornerRoom;
    redHallway.roomCharacters.push(mummy01);
    redHallway.roomQuests.push(RedRoomQuest01);

    miniBoosRoom.eastExit = redHallway;
    miniBoosRoom.roomCharacters.push(abomination01);

    cornerRoom.southExit = redHallway;
    cornerRoom.eastExit = greatHall;
    cornerRoom.roomContent.push(rubyKey);

    greatHall.westExit = cornerRoom;
    greatHall.southExit = greatHallway;
    greatHall.eastExit = smallStorageRoom;
    greatHall.roomQuests.push(BossRoomQuest01);

    greatHallway.northExit = greatHall;
    greatHallway.southExit = darkHall;

    smallStorageRoom.southExit = altarRoom;
    smallStorageRoom.westExit = greatHall;
    smallStorageRoom.roomContent.push(machete01);

    smallTomb.westExit = darkHall;
    smallTomb.northExit = altarRoom;

    altarRoom.northExit = smallStorageRoom;
    altarRoom.southExit = smallTomb;
    altarRoom.roomCharacters.push(mummy02);
    altarRoom.roomContent.push(bandages03);

    greatTombHall.northExit = creditRoom;
    greatTombHall.southExit = greatHall;
    greatTombHall.roomCharacters.push(nephren);


    abomination01.inventory.push(obsidianKey);
    joffrey.inventory.push(gun01);
    mummy02.inventory.push(bandages02);
}
