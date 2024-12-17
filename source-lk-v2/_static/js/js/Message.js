export default class Message {

    constructor(type, text) {

        this.type = type || this.defaultMessageType;
        this.text = text || '';
        this.serviceNumber = this.defaultServiceNumber;
        this.ttl = 0;
        this.ttlUnit = '';
        this.state = '';

    }

    get json() {

        return JSON.stringify(this.jsonObject, null, 2);

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

        if (this.ttl > 0) {

            obj.data.ttl = this.ttl;
            
            if (this.ttlUnit != '') {

                obj.data.ttlUnit = this.ttlUnit;

            }

        }

        return obj;

    }

    get messageTypes() {

        return ['SMS', 'Viber', 'Push', 'WhatsApp', 'FlashingCall', 'VK', 'CardsMobile'];

    }

    static get canBeSeen() {

        return ['Viber', 'Push', 'WhatsApp', 'VK', 'CardsMobile'];

    }

    static get haveContent() {

        return ['Viber', 'Push', 'WhatsApp', 'CardsMobile'];

    }

    get states() {

        return ['DELIVERED', 'READ'];

    }
    
    get serviceNumbers() {

        return ['', 'Rapporto'];

    }
    
    get ttlUnits() {

        return ['', 'SECONDS', 'MINUTES', 'HOURS'];

    }
    
    get messageTypesWithTextInData() {

        return ['SMS', 'VK', 'FlashingCall', 'Push', 'CardsMobile'];

    }

    get defaultState() {

        return 'DELIVERED';

    }

    get defaultTtl() {

        return 60;

    }

    get defaultServiceNumber() {

        return '';

    }

    get defaultTtlUnit() {

        let unit, type = this.type;

        switch (type) {

            case 'SMS':
            case 'Viber':
            case 'WhatsApp':
            case 'FlashingCall':
            case 'VK':
                
                unit = 'MINUTES';
                break;

            case 'Push':
            case 'CardsMobile':

                unit = 'SECONDS';
                break;

        }

        return unit;

    }

    get defaultMessageType() {

        return 'SMS';

    }

    get state() {

        return this._state;

    }

    set state(value) {

        this._state = value;
        if (this.state == '') return;
        if (!this.states.includes(value)) console.warn(`Unknown state: ${value}`);

    }

    get ttl() {
        
        return this._ttl;

    }

    set ttl(value) {

        this._ttl = value;

    }

    get ttlUnit() {
        
        return this._ttlUnit;

    }

    set ttlUnit(value) {

        this._ttlUnit = value
        if (!this.ttlUnits.includes(value)) console.warn(`Unknown ttlUnit: ${value}`);

    }

    get text() {

        return this._text;

    }

    set text(value) {

        this._text = value;

    }

    get serviceNumber() {

        return this._serviceNumber;

    }

    set serviceNumber(value) {

        this._serviceNumber = value
        //if (!this.serviceNumbers.includes(value)) console.warn(`Unknown service number: ${value}`);

    }

    get type() {
        
        return this._type;

    }

    set type(value) {

        this._type = value
        if (!this.messageTypes.includes(value)) console.warn(`Unknown message type: ${value}`);

    }

}