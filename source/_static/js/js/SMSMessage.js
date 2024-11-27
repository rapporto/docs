import Message from "./Message.js";

export default class SMSMessage extends Message {

    constructor(text) {

        super('SMS', text);

    }

}