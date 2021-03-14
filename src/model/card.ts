export class Card {

    public type: string;
    public value;

    constructor(type: string, value: string | number) {
        this.type = type;
        this.value = value;
    }

    public getValue(): number {
        if(isNaN(this.value)) {
            switch(this.value) {
                case ':boy:':
                    return 11;
                case ':girl:':
                    return 12;
                case ':crown:':
                    return 13;
                case ':regional_indicator_a:':
                    return 14;
            }
        } 
        return this.value;
    }
}