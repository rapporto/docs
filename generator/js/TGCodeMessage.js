import Message from "./Message.js";

export default class TGCodeMessage extends Message {

    constructor(text) {

        super('TGCode', text);

    }

}