import Message from "./Message.js";

export default class WhatsAppMessage extends Message {

    constructor(text) {

        super('WhatsApp', text);

        this.instantContentType = this.defaultInstantContentType;
        this.imageURL = '';

    }

    get jsonObject() {

        let obj = super.jsonObject;
        
        obj.data.instantContent = {};
        obj.data.instantContent.type = this.instantContentType;

        obj.data.instantContent.data = {};
        obj.data.instantContent.data.text = this.text;

        switch (this.instantContentType) {

            case 'IMAGE_URL':
                if (this.imageURL != '') obj.data.instantContent.data.imageUrl = this.imageURL;
                break;

        }

        return obj;

    }

    get instantContentTypes() {

        return ['TEXT', 'IMAGE_URL'];

    }

    get defaultInstantContentType() {

        return 'TEXT';

    }

    get imageURL() {

        return this._imageURL;

    }

    set imageURL(value) {

        this._imageURL = value;

    }

    get instantContentType() {

        return this._instantContentType;

    }

    set instantContentType(value) {

        this._instantContentType = value
        if (!this.instantContentTypes.includes(value)) console.warn(`Unknown instant content type: ${value}`);

    }

}