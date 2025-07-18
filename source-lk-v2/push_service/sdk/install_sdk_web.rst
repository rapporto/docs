Rapporto Web Push SDK
======================

Общая информация
-----------------

Данный комплект для разработки программного обеспечения (далее – SDK) предназначен для отправки сообщений в браузер/на мобильные устройства пользователей через сервисы отправки push-уведомлений. Распространение SDK осуществляется компанией Rapporto в форме :abbr:`SaaS (Software as a Service – программное обеспечение как услуга)`.

Основные возможности библиотеки:

* приём и отображение push-сообщений, отправленных в браузер/на мобильное устройство с помощью Push API через соответствующие сервисы, в том числе содержащих расширенный медиаконтент (изображения, кнопки);
* сохранение принятых сообщений в локальной базе данных;
* отслеживание доставки и открытия push-сообщений с отправкой соответствующих запросов на сервер.

Для внедрения SDK в мобильное приложение необходимо:

1. Добавить в приложение файл конфигурации ``ZGRConfig.json`` и скомпилированную в виде npm-пакета библиотеку ``@rapporto/web-push-sdk``. Файл ``ZGRConfig.json`` следует разместить в папке public.

2. Запросить у :ref:`Службы технической поддержки <support>` данные, необходимые для подключения к репозиторию Nexus компании Rapporto. При настройке доступа к репозиторию рекомендуется по возможности использовать корпоративный прокси-сервер для пакетов (например, Nexus или Artifactory). Это повысит общую безопасность и существенно облегчит работу: данные учетной записи не будут распространяться между разработчиками, а также не потребуется настраивать локальное подключение к репозиторию.

   Пример подключения репозитория в непрерывной интеграции (CI) с использованием предварительно настроенных переменных ``RAPPORTO_NPM_REGISTRY``, ``RAPPORTO_NPM_REGISTRY_USERNAME`` и ``RAPPORTO_NPM_REGISTRY_PASSWORD``:

   .. code-block:: bash
     
      npm config set @rapporto:registry "${RAPPORTO_NPM_REGISTRY}"
      npm config set //${RAPPORTO_NPM_REGISTRY#https://}:_auth=$(echo -n "${RAPPORTO_NPM_REGISTRY_USERNAME}:${RAPPORTO_NPM_REGISTRY_PASSWORD}" | base64)

   Пример подключения в локальном терминале с интерактивным вводом логина, пароля и любого адреса email:

   .. code-block:: bash

      npm adduser --auth-type=legacy --scope=@rapporto --registry=${RAPPORTO_NPM_REGISTRY}

   Подключение зависимости в package.json:

   .. code-block:: json
   
      "dependencies": {
          "@rapporto/web-push-sdk": "^1.0.0"
         }

3. Выполнить инициализацию механизма регистрации подписки на веб push-уведомления, следуя :ref:`нижеприведенным указаниям <инициализация-приложения-для-получения-веб-push-уведомлений>`.

Системные требования
---------------------

Информация о минимальных версиях поддерживаемых браузеров доступна по `ссылке <https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API#browser_compatibility>`_.

Быстрый старт
--------------

**Подключение библиотеки Web-push-sdk**

Основным классом ``@rapporto/web-push-sdk`` является ``ZGRMessaging``. Порождающий шаблон проектирования – одиночка (singleton).

.. code-block:: js

   import { ZGRMessaging } from '@rapporto/web-push-sdk'

   const messaging = new ZGRMessaging()

.. _инициализация-приложения-для-получения-веб-push-уведомлений:

Инициализация приложения для получения веб push-уведомлений
------------------------------------------------------------

**Этап 1. Запрос у пользователя разрешения на отправку ему веб push-уведомлений**

В ``ZGRMessaging`` доступно свойство ``isPushesGranted``:

.. code-block:: js

   const isPushGranted = messaging.isPushesGranted

   if(!isPushGranted) {
       showAlertAndRequestPermission()
   } else {
       registerSW()
   }

**Этап 2. Регистрация файла service-worker.js**

После успешной регистрации необходимо вызвать функцию ``sendNotificationToken()``:

.. code-block:: js

   navigator.serviceWorker.register('/service-worker.js')
   .then(serviceWorkerRegistration => {
       messaging.sendNotificationToken()
   })

**Этап 3. Получение подписки из центра авторизации и её отправка на сервер**

После успешной отправки информации на сервер SDK создаёт в функции ``sendNotificationToken`` событие ``getSubscription``, в котором передает приложению необходимую для получения подписки публичную часть VAPID-ключа. Полученная подписка отсылается на сервер вызовом функции ``savePushSubscription()``:

.. code-block:: js

   self.addEventListener('getSubscription', getSubscriptionHandler)

   async function getSubscriptionHandler(event) {
       const key = event.detail
       const subs = await subscribeUserToPush(key)

       messaging.savePushSubscription(subs)
   }

**Этап 4. Регистрация пользователя**

После ввода логина/номера телефона пользователя необходимо отправить их на сервер, вызвав функцию ``saveUser(userPhone, userId)``:

.. code-block:: js

   messaging.saveUser(userPhone, userId)

Получение и отображение веб push-соообщений
--------------------------------------------

Получение и отображение веб push-соообщений с отправкой на сервер статуса ``DELIVERED`` ("Доставлено") на примере простых и RICH/SECURE push-сообщений:

.. code-block:: js
   :linenos:
   :caption: service-worker.js

   async function broadcastClients(message) {
     const clients = await self.clients.matchAll();
     clients.forEach(client => client.postMessage(message));
   }

   self.addEventListener('push', onPushEventHandler)

   function onPushEventHandler(event) {

     async function onPush(event) {
       // wake up SW on all pages
       await self.clients.claim();
   
       const data = event.data.json();
       const pushDeliveredMsg = { type: "pushDelivered", body: data };

       // Execute receive push actions
       const onPushActions = [
         broadcastClients(pushDeliveredMsg),
       ];

       // RICH/SECURE push-сообщения
       if(data.zgrExtraOptions) {
         const options = JSON.parse(data.zgrExtraOptions)

         if(options !== [] && (options[0] === 'RICH' || options[0] === 'SECURE')) {

           const notificationUpdateDataObj = { type: 'notifUpdate', body: data.zgrNotificationId };
           onPushActions.push(
             broadcastClients(notificationUpdateDataObj)
           )
         }
       }
       // ordinary
       else {
         const message = data.zgrNotificationText
         const title = data.zgrNotificationTitle

         let imageUrl = ''
         if(data.zgrNotificationContentCategory && data.zgrNotificationContentCategory.toLowerCase() === 'image'){
           imageUrl = data.zgrNotificationContentUrl
         }

         const zActions = data.zgrNotificationActions ? this.setActionsArray(data.zgrNotificationActions) : []
         const notificationOptions = { body: message, icon: imageUrl, data: data, actions: zActions, };

         onPushActions.push(
           await self.registration.showNotification(title, notificationOptions)
         )
       }

       await Promise.all(onPushActions)
     }

     event.waitUntil(
       onPush(event)
     )
   }

   // обновление данных в случае RICH/SECURE push-сообщений
   async function onNotificationUpdateEventHandler(event) {
       const updateData = event.data.object
       const message = updateData.zgrNotificationText
       const title = updateData.zgrNotificationTitle

       let imageUrl = ''
       if(updateData.zgrNotificationContentCategory && updateData.zgrNotificationContentCategory.toLowerCase() === 'image'){
         imageUrl = updateData.zgrNotificationContentUrl
       }

       const zActions = updateData.zgrNotificationActions ?  this.setActionsArray(updateData.zgrNotificationActions) : []

       self.registration.showNotification(title, {
         body: message,
         icon:  imageUrl,
         actions: zActions
       });
   }

   self.addEventListener('message', function(event) {
       switch (event.data.command) {
       ...
       case 'update':
           return self.onNotificationUpdateEventHandler(event)
       ...
   }

.. code-block:: js
   :linenos:
   :caption: main.jsx

   if ('serviceWorker' in navigator && 'PushManager' in window) {

       navigator.serviceWorker.addEventListener('message', function(event) {
           const messageType = event.data.type
           if(messageType == 'pushDelivered') {
               pushDeliveredHandler(event)
           } else if(messageType == 'pushClicked') {
               pushClickedHandler(event)
           } else if(messageType == 'notifUpdate') {
               notifUpdateHandler(event)
           }
       })
   }

   async function pushDeliveredHandler(event) {
       const data = event.data
       messaging.receiveNotification(data)
   }

   // в случае RICH/SECURE push-сообщений
   async function notifUpdateHandler(event) {
       const data = event.data
       messaging.updateRichNotificationData(data)
   }

   self.addEventListener('notificationUpdate', notificationUpdateHandler);

   async function notificationUpdateHandler(event) {
       const data = event.detail
       const updateObj = { 'command': 'update', 'object': data }

       navigator.serviceWorker.controller.postMessage(updateObj)
   }

Обработка событий
------------------

Обработка событий нажатия на контент уведомления или кнопку с отправкой на сервер статуса ``OPENED`` ("Открыто"):

.. code-block:: js
   :linenos:
   :caption: service-worker.js

   self.addEventListener('notificationclick', onNotificationClickEventHandler)

   function onNotificationClickEventHandler(event) {
       const clickedNotification = event.notification
       const notificationData = event.notification.data;

       const dataObj = { type: 'pushClicked', body: notificationData }
       broadcastClients(dataObj)

       const action = event.action
       if(action) {

           self.clients.openWindow(action);

       } else {

           event.waitUntil(
               // Retrieve a list of the clients of this service worker.
               self.clients.matchAll().then(function(clientList) {
               // If there is at least one client, focus it.
               if (clientList.length > 0) {
                   return clientList[0].focus();
               }

               // Otherwise, close notification.
               return clickedNotification.close();
           }))
       }
   }

.. code-block:: js
   :caption: main.jsx

   async function pushClickedHandler(event) {
       const data = event.data
       messaging.clickNotification(data)
   }

Профили пользователей
----------------------

**Получение профиля**

.. code-block:: js

   messaging.fetchUser()

Функция возвращает экземпляр класса ``ZGRUser``:

.. code-block:: js

   export class ZGRUser {
       this.externalUserId = 'some string value' ? ''
       this.phoneNumber = 'some string value' ? ''
   }

**Отправка внешнего идентификатора пользователя и/или номера телефона пользователя в ZGR**

.. code-block:: js

   messaging.saveUser(userPhone, userId) 

Функция возвращает экземпляр класса ``ZGRUser``.

**Обновление номера телефона в профиле**

.. code-block:: js

   messaging.saveUserPhone(phoneNumber)

Функция возвращает экземпляр класса ``ZGRUser``.

Персонализация
---------------

**Персонализация (привязка externalUserId)**

.. code-block:: js

   messaging.personalize(externalUserId)

Функция возвращает экземпляр класса ``ZGRUser``.

**Обезличивание (выход)**

.. code-block:: js

   messaging.depersonalize()

Настройки подписок
-------------------

**Получение настроек с подписками**

.. code-block:: js
   
   messaging.fetchInstallation()

Функция возвращает экземпляр класса ``ZGRInstallation``:

.. code-block:: js
   :linenos:

   export class ZGRInstallation {

       this.isPrimary = true ? false           /*< Primary device attribute */
       this.isPushOsEnabled = true ? false     /*< System level permission for push notifications */
       this.isPushEnabled = true ? false       /*< User level permission for push notifications */

       this.subscriptions = [ZGRSubscription, ZGRSubscription, ...] | []

   }

   export class ZGRSubscription {

       this.identifier = Int value
       this.type = 'PERMISSION' | 'SETTINGS'

       this.name = 'some string value'
       this.title = 'some string value'
       this.desc = 'some string value' ? ''
       this.value = 'some string value' ? ''
   }

**Изменение настроек и параметров подписок**

Доступно изменение свойств в классах ``ZGRInstallation`` и ``ZGRSubscription``. Описание атрибутов приведено в соответствующем блоке.

.. code-block:: js
 
   messaging.saveInstallation(installation)

Сохраняет на сервере переданный в качестве параметра экземпляр класса ``ZGRInstallation``.

Локальная история уведомлений
------------------------------

**Включение режима хранения локальной истории уведомлений**

.. code-block:: js

   messaging.isLocalDBEnabled = true

**Получение всех сохраненных уведомлений из базы данных**

.. code-block:: js

   messaging.fetchAllNotifications()

Возвращает массив уведомлений, экземпляров класса ``ZGRNotification``:

.. code-block:: js
   :linenos:

   export class ZGRNotification {

       this.identifier = 'some string value'
       this.title = 'some string value' ? '' 
       this.text = 'some string value' ? ''
       this.contentUrl = 'some string value, that can be converted into url' ? '' 
       this.contentCategory = 'html' | 'image' | 'other' | 'none' | ''
       this.customPayload = some object /*< Additional data for your's own purposes. Array, Dictionary or any other top-level object. */
       this.actions = [ZGRAction, ZGRAction, ...] | [] /*< Array of actions for buttons in push notification. */
   }

   export class ZGRAction {

       this.identifier = 'some string value' ? ''
       this.title = 'some string value' ? ''
       this.urlString = 'some string value, that can be converted into url' ? ''
       this.type = 'default' | 'dismiss' | 'other'
   }

При передаче ``contentUrl`` необходимо заполнить ``contentCategory``.

.. important:: Не все браузеры поддерживают функционал кнопок в push-сообщениях. Актуальная информация доступна в соответствующей документации.

**Удаление уведомления из базы данных**

.. code-block:: js

   messaging.delete(notification)

**Удаление массива уведомлений из базы данных**

.. code-block:: js

   messaging.deleteNotificationsArray(notificationsArray)

**Обновление статуса уведомления в базе данных**

.. code-block:: js

   messaging.updateNotification(notification, status)
