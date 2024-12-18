import Message from './Message.js';
import SMSMessage from './SMSMessage.js';
import ViberMessage from './ViberMessage.js';
import WhatsAppMessage from './WhatsAppMessage.js';
import PushMessage from './PushMessage.js';
import FlashingCallMessage from './FlashingCallMessage.js';
import CardsMobileMessage from './CardsMobileMessage.js';
import VKMessage from './VKMessage.js';

export default class MessageFactory {

    constructor() {

    }

    createMessage(type, text) {

        let m;
        
        switch (type) {

            case 'SMS':
                m = new SMSMessage(text);
                break;

            case 'Viber':
                m = new ViberMessage(text);
                break;

            case 'VK':
                m = new VKMessage(text);
                break;

            case 'WhatsApp':
                m = new WhatsAppMessage(text);
                break;

            case 'Push':
                m = new PushMessage(text);
                break;

            case 'FlashinCall':
                m = new FlashingCallMessage(text);
                break;

            case 'CardsMobile':
                m = new CardsMobileMessage(text);
                break;

            default:
                m = new Message(type, text);
                break;

        }

        return m;

    }

}