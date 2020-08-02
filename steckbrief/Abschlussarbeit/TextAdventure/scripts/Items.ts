import { Player } from "./Player";

export abstract class Item {

    public key: string;
    public itemName: string;
    public itemDescription: string;


    constructor(_key: string, _itemName: string, _itemDescription: string) {

        this.key = _key;
        this.itemName = _itemName;
        this.itemDescription = _itemDescription;
    }

    abstract useItem(_player: Player): void;
}