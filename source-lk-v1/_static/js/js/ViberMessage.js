import Message from "./Message.js";

export default class ViberMessage extends Message {

    constructor(text) {

        super('Viber', text);

        this.instantContentType = this.defaultInstantContentType;
        this.imageURL = '';
        this.caption = '';
        this.action = '';

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

            case 'BUTTON':
                if (this.imageURL != '') obj.data.instantContent.data.imageUrl = this.imageURL;
                if (this.caption != '') obj.data.instantContent.data.caption = this.caption;
                if (this.action != '') obj.data.instantContent.data.action = this.action;
                break;

        }

        return obj;

    }

    get instantContentTypes() {

        return ['TEXT', 'IMAGE_URL', 'BUTTON'];

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

    get caption() {

        return this._caption;

    }

    set caption(value) {

        this._caption = value;

    }

    get action() {

        return this._action;

    }

    set action(value) {

        this._action = value;

    }

    get instantContentType() {

        return this._instantContentType;

    }

    set instantContentType(value) {

        this._instantContentType = value
        if (!this.instantContentTypes.includes(value)) console.warn(`Unknown instant content type: ${value}`);

    }

}