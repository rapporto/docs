import Message from "./Message.js";

export default class FormCreator {

    constructor() {



    }

}

const messageTypes = ['SMS', 'Viber', 'Push', 'WhatsApp', 'FlashingCall', 'VK', 'CardsMobile'];
let table, row, cell;

table = $('#options-content').add('table');

addOptions();
addEvents();

addMessage(0);
addBetweenMessage(0);

function addOptions() {

    addInputRow('Логин', 'login', 'login');
    addInputRow('Пароль', 'password', 'password');
    addInputRow('Телефон абонента', 'destAddr', '79211234567');
    addCheckboxRow('Сокращать ссылки', 'shortenLinks');
    addInputRow('Дополнительные параметры', 'extraParam');
    addInputRow('Идентификатор сообщения', 'id');
    addRegisteredDelivery();
    addInputRow('URL для обработки статусов', 'notifyUrl');
    addCheckboxRow('Учитывать временную зону абонента', 'useTimeDiff');
    addDeadline();
    addTime('Время начала отправки', 'timeBegin');
    addTime('Время окончания отправки', 'timeEnd');
    addWeekdaysSchedule();

}

function addEvents() {

    $('#options-title').on('click', (e) => {

        $('#options-content').classList.toggle('hidden');

    });

    $('#messages-title').on('click', (e) => {

        $('#messages-content').classList.toggle('hidden');

    });

}

function addInputRow(caption, id, value) {

    row = table.insertRow();

    cell = row.insertCell();
    cell.add('span').innerHTML = caption;
    cell = row.insertCell();
    cell.add('input', {

        id: id,
        type: 'text',
        value: value ? value : ''

    });

}

function addCheckboxRow(caption, id, checked) {

    row = table.insertRow();

    cell = row.insertCell();
    cell.add('span').innerHTML = caption;
    cell = row.insertCell();
    cell.add('input', {

        id: id,
        type: 'checkbox',
        checked: checked

    });

}

function addRegisteredDelivery() {

    row = table.insertRow();

    cell = row.insertCell();
    cell.add('span').innerHTML = 'Отправлять отчеты о статусах';
    cell = row.insertCell();
    
    let input = cell.add('select');
    input.id = 'registeredDelivery';

    input.appendChild(new Option('', -1, true, true));
    input.appendChild(new Option('Не отправлять', 0, false, false));
    input.appendChild(new Option('Отправлять', 1, false, false));
    input.appendChild(new Option('Только "не доставлено"', 2, false, false));

}

function addDeadline() {

    row = table.insertRow();

    cell = row.insertCell();
    cell.add('span').innerHTML = 'Дедлайн';
    cell = row.insertCell();
    cell.add('input', {

        id: 'deadline',
        type: 'datetime-local'

    });

}

function addTime(caption, id) {

    row = table.insertRow();

    cell = row.insertCell();
    cell.add('span').innerHTML = caption;
    cell = row.insertCell();
    cell.add('input', {

        id: id,
        type: 'time'

    });

}

function addWeekdaysSchedule() {

    row = table.insertRow();

    cell = row.insertCell();
    cell.add('span').innerHTML = 'Допустимые дни недели';
    cell = row.insertCell();
    
    addWeekDayCheckbox(cell, 'Пн', 'day1', true);
    addWeekDayCheckbox(cell, 'Вт', 'day2', true);
    addWeekDayCheckbox(cell, 'Ср', 'day3', true);
    addWeekDayCheckbox(cell, 'Чт', 'day4', true);
    addWeekDayCheckbox(cell, 'Пт', 'day5', true);
    addWeekDayCheckbox(cell, 'Сб', 'day6', true);
    addWeekDayCheckbox(cell, 'Вс', 'day7', true);

}

function addWeekDayCheckbox(parent, caption, id, checked) {

    parent.add('label', {

        childs: [

            {

                etype: 'span',
                innerHTML: caption

            }, {

                etype: 'input',
                type: 'checkbox',
                checked: checked,
                id: id

            }

        ]
    });

}

function addBetweenMessage(order) {

    if (order > 5) return;
    
    let div = $('#messages-content').add();
    div.classList.add('between-message');
    div.id = `message-between-${order}`;

    div.add('span').innerHTML = '<b>если сообщение </b>';

    let select = div.add('select');
    select.id = `state-${order}`
    setState(order);

    div.add('span').innerHTML = ' ';

    select = div.add('select');
    select.id = `resend-${order}`
    select.appendChild(new Option('ничего не делать', 'NONE', true, true));
    select.appendChild(new Option('отправить следующее', 'RESEND', false, false));
    select.on('input', (e) => {

        if ((select.value == 'RESEND') && ($(`#message-div-${order + 1}`) == null)) {
            
            addMessage(order + 1);
            addBetweenMessage(order + 1);
        
        }

        if (select.value == 'NONE') clearAfter(order);

    });

}

function clearAfter(order) {

    let i = order + 1;
    while ($(`#message-div-${i}`)) {

        $('#messages-content').removeChild($(`#message-div-${i}`));
        if ($(`#message-between-${i}`)) $('#messages-content').removeChild($(`#message-between-${i}`));
        i++;

    }

    resetTypes();

}

function addMessage(order) {

    let div = $('#messages-content').add();
    div.classList.add('message');
    div.id = `message-div-${order}`;

    let mt = div.add('table'),
        select;

    mt.id = `table-${order}`;
    
    cell = addMRow(mt, 'Тип сообщения');
    select = cell.add('select');
    select.id = `type-${order}`;
    let usedMessages = getUsedMessages();
    messageTypes.forEach(type => {

        if (!usedMessages.includes(type)) select.appendChild(new Option(type, type, false, false));

    });
    resetTypes();
    select.on('change', (e) => {
        
        setState(order);
        resetTypes();
        resetContent(order);
        
    });

    cell = addMRow(mt, 'Сервисное имя');
    cell.add('input').id = `sname-${order}`;

    cell = addMRow(mt, 'Время жизни сообщения');
    cell.add('input').id = `ttl-${order}`;

    cell = addMRow(mt, 'Единица измерения времени жизни');
    select = cell.add('select');
    select.id = `ttlUnit-${order}`;
    select.appendChild(new Option('', '', true, true));
    select.appendChild(new Option('Секунды', 'SECONDS', false, false));
    select.appendChild(new Option('Минуты', 'MINUTES', false, false));
    select.appendChild(new Option('Часы', 'HOURS', false, false));

    cell = addMRow(mt, 'Текст сообщения');
    let text = cell.add('textarea');
    text.id = `text-${order}`;
    text.innerHTML = 'Hello, world!';

    cell = addMRow(mt, 'Тип контента');
    select = cell.add('select');
    select.id = `viber-instantContentType-${order}`;
    select.appendChild(new Option('Текст', 'TEXT', true, true));
    select.appendChild(new Option('Текст + изображение', 'IMAGE_URL', false, false));
    select.appendChild(new Option('Текст + изображение + кнопка', 'BUTTON', false, false));
    select.on('change', (e) => resetContent(order));

    cell = addMRow(mt, 'Тип контента');
    select = cell.add('select');
    select.id = `whatsApp-instantContentType-${order}`;
    select.appendChild(new Option('Текст', 'TEXT', true, true));
    select.appendChild(new Option('Текст + изображение', 'IMAGE_URL', false, false));
    select.on('change', (e) => resetContent(order));

    cell = addMRow(mt, 'Тип контента');
    select = cell.add('select');
    select.id = `push-contentCategory-${order}`;
    select.appendChild(new Option('', '', true, true));
    select.appendChild(new Option('Изображение', 'IMAGE', false, false));
    select.appendChild(new Option('HTML-страница', 'HTML', false, false));
    select.on('change', (e) => resetContent(order));

    cell = addMRow(mt, 'Тип контента');
    select = cell.add('select');
    select.id = `cardsmobile-contentCategory-${order}`;
    select.appendChild(new Option('', '', true, true));
    select.appendChild(new Option('Изображение', 'IMAGE', false, false));
    select.on('change', (e) => resetContent(order));

    addMRow(mt, 'Ссылка на изображение').add('input').id = `viber-image-url-${order}`;
    addMRow(mt, 'Надпись на кнопке').add('input').id = `viber-caption-url-${order}`;
    addMRow(mt, 'Ссылка для кнопки').add('input').id = `viber-action-url-${order}`;

    addMRow(mt, 'Ссылка на изображение').add('input').id = `whatsApp-image-url-${order}`;

    addMRow(mt, 'Ссылка на изображение').add('input').id = `push-image-url-${order}`;
    addMRow(mt, 'Ссылка на HTML-страницу').add('input').id = `push-html-url-${order}`;
    addMRow(mt, 'Заголовок сообщения').add('input').id = `push-title-${order}`;
    addMRow(mt, 'Идентификатор абонента').add('input').id = `push-externalUserId-${order}`;
    addMRow(mt, 'Отправить только на главную установку').add('input', {
        type: 'checkbox',
        id: `push-primaryOn-${order}`
    });
    addMRow(mt, 'Данные для передачи в приложение (JSON)').add('input').id = `push-customPayload-${order}`;
    addMRow(mt, 'Дополнительные данные').add('input').id = `push-callbackData-${order}`;
    cell = addMRow(mt, 'Подписки в приложении');
    addWeekDayCheckbox(cell, 'card', `push-card-${order}`, false);
    addWeekDayCheckbox(cell, 'spam', `push-spam-${order}`, false);
    addWeekDayCheckbox(cell, 'info', `push-info-${order}`, false);

    addMRow(mt, 'Ссылка на изображение').add('input').id = `cardsmobile-image-url-${order}`;

    resetContent(order);

}

function resetContent(order) {

    let type = $(`#type-${order}`).value;

    if (type == 'Viber') {

        showById(`viber-instantContentType-${order}`);
        let instantContentType = $(`#viber-instantContentType-${order}`).value;

        switch (instantContentType) {

            case 'TEXT':
                hideById(`viber-image-url-${order}`);
                hideById(`viber-caption-url-${order}`);
                hideById(`viber-action-url-${order}`);
                break;

            case 'IMAGE_URL':
                showById(`viber-image-url-${order}`);
                hideById(`viber-caption-url-${order}`);
                hideById(`viber-action-url-${order}`);
                break;

            case 'BUTTON':
                showById(`viber-image-url-${order}`);
                showById(`viber-caption-url-${order}`);
                showById(`viber-action-url-${order}`);
                break;

        }

    } else {
        
        hideById(`viber-instantContentType-${order}`);
        hideById(`viber-image-url-${order}`);
        hideById(`viber-caption-url-${order}`);
        hideById(`viber-action-url-${order}`);

    }

    if (type == 'WhatsApp') {

        showById(`whatsApp-instantContentType-${order}`);
        let instantContentType = $(`#whatsApp-instantContentType-${order}`).value;

        if (instantContentType == 'TEXT') hideById(`whatsApp-image-url-${order}`)
        else showById(`whatsApp-image-url-${order}`);

    } else {
        
        hideById(`whatsApp-instantContentType-${order}`);
        hideById(`whatsApp-image-url-${order}`);

    }

    if (type == 'Push') {

        showById(`push-contentCategory-${order}`);
        let contentCategory = $(`#push-contentCategory-${order}`).value;

        showById(`push-title-${order}`);
        showById(`push-primaryOn-${order}`);
        showById(`push-customPayload-${order}`);
        showById(`push-callbackData-${order}`);
        showById(`push-externalUserId-${order}`);
        $(`#push-card-${order}`).parentNode.parentNode.parentNode.classList.remove('hidden');

        switch (contentCategory) {

            case '':
                hideById(`push-image-url-${order}`);
                hideById(`push-html-url-${order}`);
                break;

            case 'IMAGE':
                showById(`push-image-url-${order}`);
                hideById(`push-html-url-${order}`);
                break;

            case 'HTML':
                hideById(`push-image-url-${order}`);
                showById(`push-html-url-${order}`);
                break;

        }

    } else {
        
        hideById(`push-contentCategory-${order}`);
        hideById(`push-image-url-${order}`);
        hideById(`push-html-url-${order}`);
        hideById(`push-title-${order}`);
        hideById(`push-primaryOn-${order}`);
        hideById(`push-customPayload-${order}`);
        hideById(`push-callbackData-${order}`);
        hideById(`push-externalUserId-${order}`);
        $(`#push-card-${order}`).parentNode.parentNode.parentNode.classList.add('hidden');

    }

    if (type == 'CardsMobile') {

        showById(`cardsmobile-contentCategory-${order}`);
        let contentCategory = $(`#cardsmobile-contentCategory-${order}`).value;

        if (contentCategory == 'IMAGE') showById(`cardsmobile-image-url-${order}`)
        else hideById(`cardsmobile-image-url-${order}`);

    } else {
        
        hideById(`cardsmobile-contentCategory-${order}`);
        hideById(`cardsmobile-image-url-${order}`);

    }

}

function hideById(id) {

    $(`#${id}`).parentNode.parentNode.classList.add('hidden');

}

function showById(id) {

    $(`#${id}`).parentNode.parentNode.classList.remove('hidden');

}

function resetTypes() {

    let usedMessages = getUsedMessages(),
        i = 0;
    
    while ($(`#type-${i}`)) {

        let select = $(`#type-${i}`),
        value = select.value;

        select.clr();

        messageTypes.forEach(type => {

            if ((!usedMessages.includes(type)) || (type == value)) select.appendChild(new Option(type, type, false, false));
    
        });
        select.value = value;
        if (select.selectedIndex < 0) select.selectedIndex = 0;

        i++;

    }

}

function getUsedMessages() {

    let usedMessages = [],
        i = 0;
    
    while ($(`#type-${i}`)) {

        usedMessages.push($(`#type-${i}`).value);
        i++;

    }

    return usedMessages;

}

function setState(order) {

    let select = $(`#state-${order}`);
    let type = $(`#type-${order}`).value;
    let selected = select.selectedIndex;

    select.clr();
    select.appendChild(new Option('не доставлено', 'DELIVERED', true, true));
    if (Message.canBeSeen.includes(type)) select.appendChild(new Option('не прочитано', 'READ', false, false));

    if (select.options.length > selected) select.selectedIndex = selected;
    if (select.selectedIndex < 0) select.selectedIndex = 0;

}

function addMRow(mtable, caption) {

    row = mtable.insertRow();

    cell = row.insertCell();
    cell.innerHTML = caption;

    cell = row.insertCell();

    return cell;

}