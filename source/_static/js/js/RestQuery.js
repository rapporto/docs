import MessageFactory from "./MessageFactory.js";

export default class RestQuery {

    constructor() {

        this.reset();

    }

    get json() {

        return JSON.stringify(this.jsonObject, null, 2);

    }

    get jsonObject() {

        let obj = {};

        if (this.login != '') obj.login = this.login;
        if (this.password != '') obj.password = this.password;
        if (this.destAddr != '') obj.destAddr = this.destAddr;
        if (this.extraParam != '') obj.extraParam = this.extraParam;
        if (this.id != '') obj.id = this.id;
        if (this.shortenLinks) obj.shortenLinks = this.shortenLinks;
        if (this.registeredDelivery >= 0) obj.registeredDelivery = this.registeredDelivery;
        if (this.notifyUrl != '') obj.notifyUrl = this.notifyUrl;
        if (this.useTimeDiff) obj.useTimeDiff = this.useTimeDiff;

        if ((this.deadline != '') || ((this.weekdaysSchedule != '') && (this.weekdaysSchedule != '1234567')) || (this.timeBegin != '') || (this.timeEnd != '')) {

            obj.scheduleInfo = {};

            if (this.deadline != '') obj.scheduleInfo.deadline = this.deadline;
            if ((this.weekdaysSchedule != '') && (this.weekdaysSchedule != '1234567')) obj.scheduleInfo.weekdaysSchedule = this.weekdaysSchedule;
            if (this.timeBegin != '') obj.scheduleInfo.timeBegin = this.timeBegin;
            if (this.timeEnd != '') obj.scheduleInfo.timeEnd = this.timeEnd;

        }
        
        if (this.messages.length > 0) {
            
            obj.message = this.messages[0].jsonObject;

            if (this.messages.length > 1) {

                obj.cascadeChainLink = {};
                if (this.messages[1].state != '') obj.cascadeChainLink.state = this.messages[1].state;
                obj.cascadeChainLink.message = this.messages[1].jsonObject;

                let cascade = obj.cascadeChainLink;

                for (let i = 2; i < this.messages.length; i++) {

                    cascade.nextLink = {};
                    if (this.messages[1].state != '') cascade.nextLink.state = this.messages[i].state;
                    cascade.nextLink.message = this.messages[i].jsonObject;
                    cascade = cascade.nextLink;

                }

            }

        }

        return obj;

    }

    get registeredDeliveries() {

        return [-1, 0, 1, 2];

    }

    get defaultRegisteredDelivery() {

        return 1;

    }

    get notifyUrl() {

        return this._notifyUrl;

    }

    set notifyUrl(value) {

        this._notifyUrl = value;

    }

    get timeBegin() {

        return this._timeBegin;

    }

    set timeBegin(value) {

        this._timeBegin = value;

    }

    get timeEnd() {

        return this._timeEnd;

    }

    set timeEnd(value) {

        this._timeEnd = value;

    }

    get weekdaysSchedule() {

        return this._weekdaysSchedule;

    }

    set weekdaysSchedule(value) {

        this._weekdaysSchedule = value;

    }

    get deadline() {

        return this._deadline;

    }

    set deadline(value) {

        this._deadline = value;

    }

    get useTimeDiff() {

        return this._useTimeDiff;

    }

    set useTimeDiff(value) {

        this._useTimeDiff = value;

    }

    get registeredDelivery() {

        return this._registeredDelivery;

    }

    set registeredDelivery(value) {

        this._registeredDelivery = value;
        if (!this.registeredDeliveries.includes(value)) console.warn(`Unknown registered delivery: ${value}`);

    }

    get shortenLinks() {

        return this._shortenLinks;

    }

    set shortenLinks(value) {

        this._shortenLinks = value;

    }

    get destAddr() {

        return this._destAddr;

    }

    set destAddr(value) {

        this._destAddr = value;

    }

    get id() {

        return this._id;

    }

    set id(value) {

        this._id = value;

    }

    get extraParam() {

        return this._extraParam;

    }

    set extraParam(value) {

        this._extraParam = value;

    }

    get login() {

        return this._login;

    }

    set login(value) {

        this._login = value;

    }

    get password() {

        return this._password;

    }

    set password(value) {

        this._password = value;

    }

    message(type) {

        let result = false;

        this.messages.some(m => {

            if (m.type == type) {
                
                result = m;
                return true;

            } else return false;

        });

        return result;

    }

    removeMessage(type) {

        this.messages.forEach((m, i) => {

            if (m.type == type) this.messages.splice(i, 1);

        })

    }

    removeMessageById(id) {

        if ((id >= 0) && (id < this.messages.length)) this.messages.splice(id, 1);

    }

    addMessage(type, text) {

        let mf = new MessageFactory();
        let message = mf.createMessage(type, text);

        this.messages.push(message);

        return message;

    }

    get messages() {

        return this._messages;

    }

    resetMessages() {

        this._messages = [];

    }

    reset() {

        this.resetMessages();

        this.login = '';
        this.password = '';
        this.extraParam = '';
        this.id = '';
        this.destAddr = '';
        this.shortenLinks = false;
        this.registeredDelivery = -1;
        this.useTimeDiff = false;
        this.deadline = '';
        this.weekdaysSchedule = '';
        this.timeBegin = '';
        this.timeEnd = '';
        this.notifyUrl = '';

    }

}