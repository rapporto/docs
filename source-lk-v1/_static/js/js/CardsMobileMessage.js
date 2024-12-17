import Message from "./Message.js";

export default class CardsMobileMessage extends Message {

    constructor(text) {

        super('CardsMobile', text);

        this.title = '';
        this.useContent = false;
        this.contentCategory = '';
        this.contentUrl = '';
        this.target = '';
        this.campaignId = '';
        this.pushType = '';

    }

    get jsonObject() {

        let obj = super.jsonObject;
        
        if (this.title != '') obj.data.title = this.title;

        if (this.useContent) {

            obj.data.content = {};
            if (this.contentCategory != '') obj.data.content.contentCategory = this.contentCategory;
            if (this.contentUrl != '') obj.data.content.contentUrl = this.contentUrl;

        }

        if (this.target != '') obj.data.target = this.target;
        if (this.campaignId != '') obj.data.campaignId = this.campaignId;
        if (this.pushType != '') obj.data.pushType = this.pushType;

        return obj;

    }

    get pushTypes() {

        return ['PROMO', 'SERVICE', 'TRANSACTION'];

    }

    get targets() {

        return ['card', 'campaign', 'campaigns'];

    }

    get contentCategories() {

        return ['IMAGE'];

    }

    get defaultPushType() {

        return 'PROMO';

    }

    get defaultTarget() {

        return 'card';

    }

    get defaultContentCategory() {

        return 'IMAGE';

    }

    get campaignId() {

        return this._campaignId;

    }

    set campaignId(value) {

        this._campaignId = value;

    }

    get pushType() {

        return this._pushType;

    }

    set pushType(value) {

        this._pushType = value;

        if (this.pushType == '') return;

        if (!this.pushTypes.includes(value)) console.warn(`Unknown push type: ${value}`);

    }

    get target() {

        return this._target;

    }

    set target(value) {

        this._target = value;

        if (this.target == '') return;

        if (!this.targets.includes(value)) console.warn(`Unknown target: ${value}`);

    }

    get contentUrl() {

        return this._contentUrl;

    }

    set contentUrl(value) {

        this._contentUrl = value;

        if ((this.contentUrl == '') && (this.contentCategory == '')) this.useContent = false
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
        
        if ((this.contentUrl == '') && (this.contentCategory == '')) this.useContent = false
        else this.useContent = true;

        if (this.contentCategory == '') return;

        if (!this.contentCategories.includes(value)) console.warn(`Unknown content category: ${value}`);

    }

    get title() {

        return this._title;

    }

    set title(value) {

        this._title = value;

    }

}