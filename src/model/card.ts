export class Card {

    public type: string;
    public value: string | number;

    constructor(type: string, value: string | number) {
        this.type = type;
        this.value = value;
    }
}