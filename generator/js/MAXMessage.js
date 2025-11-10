import Message from "./Message.js";

export default class MAXMessage extends Message {

    constructor(text) {

        super('MAX', text);

    }

    get jsonObject() {

        let obj = {};

        obj.type = this.type;
        obj.data = {};

        if (this.messageTypesWithTextInData.includes(this._type)) {

            obj.data.text = this.text;

        }

        if (this.serviceNumber != '') {

            obj.data.serviceNumber = this.serviceNumber;

        }

        return obj;

    }

}