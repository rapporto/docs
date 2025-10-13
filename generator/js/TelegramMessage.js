import Message from "./Message.js";

export default class TelegramMessage extends Message {

    constructor(text) {

        super('Telegram', text);

        this.contentType = this.defaultContentType;
        this.link = '';

    }
    
    get jsonObject() {

        let obj = super.jsonObject;

        obj.type = this.type;
        obj.data = {};

        obj.data.text = this.text;
        if (this.link != '') obj.data.link = this.link;

        if (this.serviceNumber != '') {

            obj.data.serviceNumber = this.serviceNumber;

        }

        if (this.ttl > 0) {

            obj.data.ttl = this.ttl;
            
            if (this.ttlUnit != '') {

                obj.data.ttlUnit = this.ttlUnit;

            }

        }

        return obj;

    }

    get contentTypes() {

        return ['TEXT', 'LINK'];

    }

    get defaultContentType() {

        return 'TEXT';

    }

    get link() {

        return this._link;

    }

    set link(value) {

        this._link = value;

    }

    get contentType() {

        return this._contentType;

    }

    set contentType(value) {

        this._contentType = value
        if (!this.contentTypes.includes(value)) console.warn(`Unknown content type: ${value}`);

    }

}