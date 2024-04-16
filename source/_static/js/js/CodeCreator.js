import RestQuery from "./RestQuery.js";

export default class CodeCreator {

    constructor() {

        $('#copy').on('click', (e) => {

            navigator.clipboard.writeText(this.makeQuery().json)
                .then(() => {
                    $('#copy_result').classList.remove('hidden');
                    setTimeout(() => {
                        $('#copy_result').classList.add('hidden');
                    }, 1000);
                })
                .catch(err => {
                    console.error('Something went wrong', err);
                });

        });

    }

    refresh() {

        let query = this.makeQuery();
        this.code.innerHTML = query.json;
        this.highlight();

    }

    makeQuery() {

        let query = new RestQuery();

        this._setQueryOptions(query);
        this._setMessageOptions(query);

        return query;

    }

    highlight() {

        hljs.highlightElement(this.code);

    }

    _setQueryOptions(query) {

        query.login = $('#login').value;
        query.password = $('#password').value;
        query.destAddr = $('#destAddr').value;
        query.shortenLinks = $('#shortenLinks').checked;
        query.extraParam = $('#extraParam').value;
        query.id = $('#id').value;
        query.registeredDelivery = +$('#registeredDelivery').value;
        query.notifyUrl = $('#notifyUrl').value;
        query.useTimeDiff = $('#useTimeDiff').checked;

        let deadline = $('#deadline').value;
        query.deadline = deadline == '' ? deadline : deadline + ':00+0300';

        query.timeBegin = $('#timeBegin').value;
        query.timeEnd = $('#timeEnd').value;

        let weekdaysSchedule = '';
        for (let i = 1; i < 8; i++)
            if ($(`#day${i}`).checked) weekdaysSchedule += i;
        query.weekdaysSchedule = weekdaysSchedule;

    }

    _setMessageOptions(query) {

        let order = 0;

        while ($(`#message-div-${order}`)) {

            let type = $(`#type-${order}`).value;
            let message = query.addMessage(type, $(`#text-${order}`).value);
            message.serviceNumber = $(`#sname-${order}`).value;
            message.ttl = $(`#ttl-${order}`).value;
            message.ttlUnit = $(`#ttlUnit-${order}`).value;
            if (order > 0) message.state = $(`#state-${order - 1}`).value;

            if (type == 'Viber') {

                let instantContentType = $(`#viber-instantContentType-${order}`).value;
                message.instantContentType = instantContentType;

                if ((instantContentType == 'IMAGE_URL') || (instantContentType == 'BUTTON')) message.imageURL = $(`#viber-image-url-${order}`).value;

                if (instantContentType == 'BUTTON') {

                    message.caption = $(`#viber-caption-url-${order}`).value;
                    message.action = $(`#viber-action-url-${order}`).value;

                }

            }

            if (type == 'WhatsApp') {

                let instantContentType = $(`#whatsApp-instantContentType-${order}`).value;
                message.instantContentType = instantContentType;

                if (instantContentType == 'IMAGE_URL') message.imageURL = $(`#whatsApp-image-url-${order}`).value;

            }

            if (type == 'Push') {

                let contentCategory = $(`#push-contentCategory-${order}`).value;
                message.contentCategory = contentCategory;

                if (contentCategory == 'IMAGE') message.contentUrl = $(`#push-image-url-${order}`).value;
                if (contentCategory == 'HTML') message.contentUrl = $(`#push-html-url-${order}`).value;

                message.title = $(`#push-title-${order}`).value;
                message.primaryOn = $(`#push-primaryOn-${order}`).checked;
                message.customPayload = $(`#push-customPayload-${order}`).value;
                message.callbackData = $(`#push-callbackData-${order}`).value;
                message.externalUserId = $(`#push-externalUserId-${order}`).value;

                if ($(`#push-card-${order}`).checked) message.addDeviceSubscriptions('card');
                if ($(`#push-spam-${order}`).checked) message.addDeviceSubscriptions('spam');
                if ($(`#push-info-${order}`).checked) message.addDeviceSubscriptions('info');

            }

            if (type == 'CardsMobile') {

                let contentCategory = $(`#cardsmobile-contentCategory-${order}`).value;
                message.contentCategory = contentCategory;

                if (contentCategory == 'IMAGE') message.contentUrl = $(`#cardsmobile-image-url-${order}`).value;

            }

            order++;

        }

    }

    get code() {

        return $('#code');

    }

}