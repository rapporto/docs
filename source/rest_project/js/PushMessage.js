import Message from "./Message.js";

export default class PushMessage extends Message {

    constructor(text) {

        super('Push', text);

        this.title = '';
        this.primaryOn = false;
        this.resetSubcriptions();
        this.customPayload = '';
        this.callbackData = '';
        this.useContent = false;
        this.resetActions();
        this.contentCategory = '';
        this.contentUrl = '';
        this.externalUserId = '';

    }

    get jsonObject() {

        let obj = super.jsonObject;
        
        if (this.title != '') obj.data.title = this.title;
        if (this.primaryOn) obj.data.primaryOn = this.primaryOn;
        if (this.deviceSubscriptions.length > 0) obj.data.deviceSubscriptions = this.deviceSubscriptions;
        if (this.customPayload != '') obj.data.customPayload = this.customPayload;
        if (this.callbackData != '') obj.data.callbackData = this.callbackData;
        if (this.externalUserId != '') obj.data.externalUserId = this.externalUserId;

        if (this.useContent) {

            obj.data.content = {};
            if (this.contentCategory != '') obj.data.content.contentCategory = this.contentCategory;
            if (this.contentUrl != '') obj.data.content.contentUrl = this.contentUrl;
            if (this.actions.length > 0) {

                obj.data.content.actions = [];
                this.actions.forEach(a => {

                    let action = {};
                    if (a.title != '') action.title = a.title;
                    if (a.action != '') action.action = a.action;
                    if (a.options != '') action.options = a.options;
                    obj.data.content.actions.push(action);
    
                });

            }

        }

        return obj;

    }

    get contentCategories() {

        return ['IMAGE', 'HTML'];

    }

    get deviceSubscriptionsAll() {

        return ['card', 'spam', 'info'];

    }

    get defaultContentCategory() {

        return 'IMAGE';

    }

    get actions() {

        return this._actions;

    }
    
    resetActions() {

        this._actions = [];

        if ((this.contentUrl == '') && (this.contentCategory == '') && (this.actions.length == 0)) this.useContent = false
        else this.useContent = true;

    }

    addAction(title, action, options) {

        this._actions.push({

            title: title || '',
            action: action || '',
            options: options || ''
        
        });

        if ((this.contentUrl == '') && (this.contentCategory == '') && (this.actions.length == 0)) this.useContent = false
        else this.useContent = true;

    }

    removeAction(title) {

        this.actions.forEach((r, g) => {

            if (r.title == title) this._actions.splice(g, 1);

        });

        if ((this.contentUrl == '') && (this.contentCategory == '') && (this.actions.length == 0)) this.useContent = false
        else this.useContent = true;

    }

    removeActionById(id) {

        this._actions.splice(id, 1);

        if ((this.contentUrl == '') && (this.contentCategory == '') && (this.actions.length == 0)) this.useContent = false
        else this.useContent = true;

    }

    get externalUserId() {

        return this._externalUserId;

    }

    set externalUserId(value) {

        this._externalUserId = value;

    }

    get contentUrl() {

        return this._contentUrl;

    }

    set contentUrl(value) {

        this._contentUrl = value;

        if ((this.contentUrl == '') && (this.contentCategory == '') && (this.actions.length == 0)) this.useContent = false
        else this.useContent = true;

    }

    get useContent() {

        return this._useContent;

    }

    set useContent(value) {

        this._useContent = value;

    }

    get contentCategory() {

        return this._contentCategory;

    }

    set contentCategory(value) {

        this._contentCategory = value;
        
        if ((this.contentUrl == '') && (this.contentCategory == '') && (this.actions.length == 0)) this.useContent = false
        else this.useContent = true;

        if (this.contentCategory == '') return;

        if (!this.contentCategories.includes(value)) console.warn(`Unknown content category: ${value}`);

    }

    get callbackData() {

        return this._callbackData;

    }

    set callbackData(value) {

        this._callbackData = value;

    }

    get customPayload() {

        return this._customPayload;

    }

    set customPayload(value) {

        this._customPayload = value;
        if (value == '') return;

        try {
            
            let d = JSON.parse(value);

        } catch (err) {

            console.warn(`Invalid JSON in customPayload: ${value}`);

        }

    }

    get deviceSubscriptions() {

        return this._deviceSubscriptions;

    }

    resetSubcriptions() {

        this._deviceSubscriptions = [];

    }

    addDeviceSubscriptions(...args) {

        for (let arg of args) {
            
            this._deviceSubscriptions.push(arg);
            if (!this.deviceSubscriptionsAll.includes(arg)) console.warn(`Unknown device subscription: ${arg}`);

        }

    }

    removeDeviceSubscriptions(...args) {

        for (let arg of args) {

            let i = this.deviceSubscriptions.indexOf(arg);
            if (i >= 0) this._deviceSubscriptions.splice(i, 1);

        }

    }

    get primaryOn() {

        return this._primaryOn;

    }

    set primaryOn(value) {

        this._primaryOn = value;

    }

    get title() {

        return this._title;

    }

    set title(value) {

        this._title = value;

    }

}