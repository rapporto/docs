import Message from "./Message.js";

export default class FlashingCallMessage extends Message {

    constructor(text) {

        super('FlashingCall', text);

    }

}