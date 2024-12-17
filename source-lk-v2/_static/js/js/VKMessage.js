import Message from "./Message.js";

export default class VKMessage extends Message {

    constructor(text) {

        super('VK', text);

    }

}