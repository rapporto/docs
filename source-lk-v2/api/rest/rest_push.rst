Push
=====
Отправка push-уведомлений
--------------------------

В мобильных и веб push-уведомлениях доступна передача текста и, опционально, дополнительных параметров.

Примеры дополнительных параметров:

* заголовок; 
* изображения;
* кнопки выбора действия;
* :abbr:`HTML (HyperText Markup Language)`-страницы;
* шаблоны для передачи чувствительных данных;
* параметры для обогащения данных;
* данные без предварительной обработки (в формате JSON);
* клиентские данные для статистики;
* данные для обновления виджета :abbr:`Live Activity (Виджет Live Activity функционирует на устройствах с iOS)`;
* признак главного приложения;
* подписки мобильного приложения;
* указание провайдеров (:abbr:`APNS (Apple Push Notification Service)`, :abbr:`FCM (Firebase Cloud Messaging)`, :abbr:`HMS (Huawei Mobile Services)`, RuStore, PWA) для передачи данных.



.. _примеры-запросов:

Примеры запросов на отправку push-уведомлений
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

   <p style="line-height: 24px;">Для формирования тестового запроса с вашими параметрами 
       <a href="https://doc.rapporto.ru/generator/" target="_blank" class="button">
           <img src="../../_static/link-external-01.svg" class="bttn-icon" alt="Внешняя ссылка"> Открыть генератор запросов
       </a>
   </p>
   <style>
       .bttn-icon {
           width: 18px;
           height: 18px;
           vertical-align: middle;  /* Центрирует иконку по вертикали */
           border: 0;
           margin-right: 4px;
       }       
       .button {
           border: 0;
           height: 36px;
           text-decoration: none; /* Убирает подчеркивание */
           color: #000; /* Цвет текста */
           background-color: transparent; /* Цвет фона кнопки */
           padding: 4px 4px; /* Отступы */
           border-radius: 4px; /* Закругленные углы */
           display: inline-flex; /* Позволяет выровнять текст и иконку по центру */
           align-items: center; /* Центрирует содержимое кнопки */
           line-height: 1; /* Убирает лишние отступы */
       }
       .button:hover {
           background-color: #f8f7ff; /* Цвет фона при наведении */
           text-decoration: none; /* Убирает подчеркивание */
       }
   </style>

.. tabs::

    .. tab:: расширенный запрос

        Описание параметров `useTimeDiff`_ ; `destAddr`_.  

        .. code-block:: json
           :linenos:
           :emphasize-lines: 4-14 

            {
               "login":"ВАШ_ЛОГИН",
               "password":"ВАШ_ПАРОЛЬ",
               "id":"8770630",
               "extraParam":"param1=value1,param2=value2",
               "registeredDelivery":"1",
               "notifyUrl":"URL_для_передачи_статусов",
               "useTimeDiff":true,
               "scheduleInfo":{
                  "timeBegin":"10:00",
                  "timeEnd":"12:00",
                  "weekdaysSchedule":"123",
                  "deadline": "2029-12-31T16:29:30+0300"
                  },
               "destAddr":"Номер_Абонента",
               "message":{
                  "type":"Push",
                  "data":{
                     "externalUserId": "ID_абонента",
                     "text":"Текст уведомления",
                     "serviceNumber":"НОМЕР_ОТПРАВИТЕЛЯ",
                     "ttl":10,
                     "ttlUnit": "SECONDS"
                  }
               }
            }   



    .. tab:: с текстом  
                       
        .. code-block:: json
           :linenos:
           :emphasize-lines: 9

             {
                "login":"ВАШ_ЛОГИН",
                "password":"ВАШ_ПАРОЛЬ",
                "id":"8770631",
                "destAddr":"Номер_Абонента",
                "message":{
                   "type":"PUSH",
                   "data":{
                      "text":"Текст уведомления",
                      "serviceNumber":"НОМЕР_ОТПРАВИТЕЛЯ",
                      "ttl":2
                   }
                }
             }


    .. tab:: с текстом и заголовком

        Описание параметра `title`_.

        .. code-block:: json
           :linenos:
           :emphasize-lines: 9,10

             {
                "login":"ВАШ_ЛОГИН",
                "password":"ВАШ_ПАРОЛЬ",
                "id":"8770631",
                "destAddr":"Номер_Абонента",
                "message":{
                   "type":"PUSH",
                   "data":{
                      "title":"Заголовок push-сообщения",
                      "text":"Текст уведомления",
                      "serviceNumber":"НОМЕР_ОТПРАВИТЕЛЯ",
                      "ttl":2
                   }
                }
             }


    .. tab:: с признаком главного приложения

        Описание параметра `primaryOn`_.

        .. code-block:: json
           :linenos:
           :emphasize-lines: 10

             {
                "login":"ВАШ_ЛОГИН",
                "password":"ВАШ_ПАРОЛЬ",
                "id":"8770631",
                "destAddr":"Номер_Абонента",
                "message":{
                   "type":"PUSH",
                   "data":{
                      "text":"Текст уведомления",
                      "primaryOn":true,
                      "serviceNumber":"НОМЕР_ОТПРАВИТЕЛЯ",
                      "ttl":2
                   }
                }
             }


    .. tab:: с изображением

        В данном примере сообщение передается по *externalUserId* клиента.
        
        Описание параметра `contentCategory`_.

        .. code-block:: json
           :linenos:
           :emphasize-lines: 13-16

             {
                "login": "ВАШ_ЛОГИН",
                "password": "ВАШ_ПАРОЛЬ",
                "id": "9999992",
                "message": {
                   "type": "PUSH",
                   "data": {
                      "externalUserId": "ИД_абонента",
                      "text": "Текст_сообщения",
                      "serviceNumber": "0000",
                      "ttl": 40,
                      "ttlUnit": "SECONDS",
                      "content": {
                         "contentCategory": "IMAGE",
                         "contentUrl": "https://i.pinimg.com/originals/11/ab/14/11ab147894a7d2ce866ff88a4aa63655.jpg"
                      }
                   }
                }
             }
    

    .. tab:: с изображением и кнопками

        В данном примере сообщение передается по *externalUserId* клиента.
        
        Описание параметров `contentCategory`_ ; `actions`_.

        .. code-block:: json
           :linenos:
           :emphasize-lines: 13-28

             {
                "login": "ВАШ_ЛОГИН",
                "password": "ВАШ_ПАРОЛЬ",
                "id": "9999992",
                "message": {
                   "type": "PUSH",
                   "data": {
                      "externalUserId": "ИД_абонента",
                      "text": "Текст_сообщения",
                      "serviceNumber": "0000",
                      "ttl": 40,
                      "ttlUnit": "SECONDS",
                      "content": {
                         "contentCategory": "IMAGE",
                         "contentUrl": "https://i.pinimg.com/originals/11/ab/14/11ab147894a7d2ce866ff88a4aa63655.jpg",
                         "actions": [
                            {
                               "title": "Открыть",
                               "action": "link",
                               "options": "https://doc.rapporto.ru/"
                            },
                            {
                               "title": "Открыть приложение",
                               "action": "open-app",
                               "options": ""
                            }
                         ]
                      }
                   }
                }
             }
    
                   
    .. tab:: с HTML-страницей

        Описание параметра `contentCategory`_.

        .. code-block:: json
           :linenos:
           :emphasize-lines: 13-16

             {
                "login": "ВАШ_ЛОГИН",
                "password": "ВАШ_ПАРОЛЬ",
                "id": "9999992",
                "destAddr":"Номер_Абонента",
                "message": {
                   "type": "PUSH",
                   "data": {
                      "text": "Текст_сообщение",
                      "serviceNumber": "0000",
                      "ttl": 40,
                      "ttlUnit": "SECONDS",
                      "content": {
                         "contentCategory": "HTML",
                         "contentUrl": "https://i.pinimg.com/originals/11/ab/14/11ab147894a7d2ce866ff88a4aa63655.jpg"
                      }
                   }
                }
             }


    .. tab:: с подписками

        Описание параметра `deviceSubscriptions`_.

        .. code-block:: json
           :linenos:
           :emphasize-lines: 14-16

            {
               "login":"ВАШ_ЛОГИН",
               "password":"ВАШ_ПАРОЛЬ",
               "id":"8770631",
               "destAddr":"Номер_Абонента",
               "message":{
                  "type":"PUSH",
                  "data":{
                     "externalUserId":"ИД_абонента",
                     "text":"Текст",
                     "serviceNumber":"Номер_отправителя",
                     "ttl":24,
                     "ttlUnit":"HOURS",
                     "deviceSubscriptions":[
                        "card"
                     ]
                  }
               }
            }

   

    .. tab:: с данными для приложения

        Описание параметра `customPayload`_.

        .. code-block:: json
           :linenos:
           :emphasize-lines:  14-16

            {
               "login":"ВАШ_ЛОГИН",
               "password":"ВАШ_ПАРОЛЬ",
               "id":"8770631",
               "destAddr":"Номер_Абонента",
               "message":{
                  "type":"PUSH",
                  "data":{
                     "title":"Заголовок Push-сообщения",
                     "text":"Текст_сообщения",
                     "serviceNumber":"Номер_отправителя",
                     "ttl":1,
                     "ttlUnit":"MINUTES",
                     "customPayload":{
                        "list":"card"
                     }
                  }
               }
            }

   
    .. tab:: с данными для статистики

        Описание параметра `callbackData`_.

        .. code-block:: json
           :linenos:
           :emphasize-lines: 16
           
            {
               "login":"ВАШ_ЛОГИН",
               "password":"ВАШ_ПАРОЛЬ",
               "id":"8770631",
               "destAddr":"Номер_Абонента",
               "message":{
                  "type":"PUSH",
                  "data":{
                     "title":"Заголовок Push-сообщения",
                     "text":"Текст_сообщения",
                     "serviceNumber":"Номер_отправителя",
                     "ttl":1,
                     "ttlUnit":"MINUTES"
                  }
               },
               "callbackData":"Данные_для_статистики"
            }



    .. tab:: с обогащенными данными
         
        .. tabs::
        
            .. tab:: RICH
            
                Параметры для альтернативного варианта отправки данных с контентом для мобильного приложения.       

                .. code-block:: json
                   :linenos:
                   :emphasize-lines: 14-22

                    {
                       "login":"ВАШ_ЛОГИН",
                       "password":"ВАШ_ПАРОЛЬ",
                       "id":"4560",
                       "message":{
                          "type":"PUSH",
                          "data":{
                             "externalUserId":"ИД_абонента",
                             "title":"Заголовок_до",
                             "text":"Тест_до",
                             "serviceNumber":"Номер_отправителя",
                             "ttl":30,
                             "ttlUnit":"SECONDS",
                             "extraOptions":[
                                {
                                   "param_name":"RICH",
                                   "param_value":{
                                      "title":"Заголовок_после",
                                      "message":"Текст_после"
                                   }
                                }
                             ]
                          }
                       }
                    }
        
        
            .. tab:: LIVE_ACTIVITY

                Параметры для обновления виджета Live Activity на устройствах с операционной системой iOS. 
        
                .. code-block:: json
                   :linenos:
                   :emphasize-lines: 14-28

                    {
                       "login":"ВАШ_ЛОГИН",
                       "password":"ВАШ_ПАРОЛЬ",
                       "id":"4560",
                       "message":{
                          "type":"PUSH",
                          "data":{
                             "externalUserId":"ИД_абонента",
                             "title":"Заголовок",
                             "text":"Текст",
                             "serviceNumber":"Номер_отправителя",
                             "ttl":30,
                             "ttlUnit":"SECONDS",
                             "extraOptions":[
                                {
                                   "param_name":"LIVE_ACTIVITY",
                                   "param_value":{
                                      "aps":{
                                         "timestamp":"2024-03-29T17:23:47.720Z",
                                         "event":"update",
                                         "content-state":{
                                            "deliveryStatus":2,
                                            "deliveryTime":5
                                         }
                                      }
                                   }
                                }
                             ]
                          }
                       }
                    }
        
        
            .. tab:: SECURE

                Параметры для передачи чувствительных данных в push-уведомлении. 
        
                .. code-block:: json
                   :linenos:
                   :emphasize-lines: 15-24

                    {
                       "login":"ВАШ_ЛОГИН",
                       "password":"ВАШ_ПАРОЛЬ",
                       "id":"4560",
                       "message":{
                          "type":"PUSH",
                          "data":{
                             "primaryOn":false,
                             "externalUserId":"ИД_абонента",
                             "title": "Код для получения %data%",
                             "text":"%name%, ваша карта с номером %card% готова к выпуску",
                             "serviceNumber":"Номер_отправителя",
                             "ttl":30,
                             "ttlUnit":"SECONDS",
                             "extraOptions":[
                                {
                                   "param_name":"SECURE",
                                   "param_value":{
                                      "name":"Имя",
                                      "card":"*0000",
                                      "data":"12345"
                                   }
                                }
                             ]
                          }
                       }
                    }


            .. tab:: SENDING_PLATFORM

                Параметры для отправки push-уведомлений на определенные типы платформ (:abbr:`APNS (Apple Push Notification Service)`, :abbr:`FCM (Firebase Cloud Messaging)`, :abbr:`HMS (Huawei Mobile Services)`, RuStore, PWA) по желанию Партнера. 
        
                .. tabs::

                  .. tab:: мобильный push 
 
                     .. code-block:: json
                        :linenos:
                        :emphasize-lines: 14-23

                        {
                           "login":"ВАШ_ЛОГИН",
                           "password":"ВАШ_ПАРОЛЬ",
                           "id":"1",
                           "message":{
                              "type":"PUSH",
                              "data":{
                                 "serviceNumber":"Сервисное_имя_отправителя",
                                 "externalUserId":"ИД_абонента",
                                 "text":"Текст_сообщения",
                                 "title":"Заголовок_сообщения",
                                 "ttl":24,
                                 "ttlUnit":"HOURS",
                                 "extraOptions":[
                                    {
                                       "param_name":"SENDING_PLATFORMS",
                                       "param_value":[
                                          "Android",
                                          "Ios",
                                          "RuStore"
                                       ]
                                    }
                                 ]
                              }
                           }
                        }

                  .. tab:: веб push

                     .. code-block:: json
                        :linenos:
                        :emphasize-lines: 14-23

                        {
                           "login":"ВАШ_ЛОГИН",
                           "password":"ВАШ_ПАРОЛЬ",
                           "id":"1",
                           "message":{
                              "type":"PUSH",
                              "data":{
                                 "serviceNumber":"Сервисное_имя_отправителя",
                                 "externalUserId":"ИД_абонента",
                                 "text":"Текст_сообщения",
                                 "title":"Заголовок_сообщения",
                                 "ttl":24,
                                 "ttlUnit":"HOURS",
                                 "extraOptions":[
                                    {
                                       "param_name":"SENDING_PLATFORMS",
                                       "param_value":[
                                          "Pwa",
                                       ]
                                    }
                                 ]
                              }
                           }
                        }


.. _Rest-Push-параметры-запроса:

Параметры запросов  
~~~~~~~~~~~~~~~~~~~~

Звездочкой (*) отмечены параметры, которые **не работают** при отправке веб push-сообщений.

+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| Параметр              | Обязат. | Тип данных   | Описание                                                                                        |
+=======================+=========+==============+=================================================================================================+
| login                 | да      | string       | Имя Партнера в системе.                                                                         |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| password              | да      | string       | Пароль Партнера в системе.                                                                      |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| extraParam            | нет     | string       | Дополнительные параметры, передаваемые в виде ``param1=value1,param2=value2``,                  |
|                       |         |              | где:                                                                                            |
|                       |         |              |                                                                                                 |
|                       |         |              | - ``param1`` и ``param2`` — названия параметров;                                                |
|                       |         |              | - ``value1`` и ``value2`` — значения.                                                           |
|                       |         |              |                                                                                                 |
|                       |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |            Символ запятой в названии параметра использоваться не может, но может входить в его  |
|                       |         |              |            значение — в этом случае он должен удваиваться. Пример: строка                       |
|                       |         |              |            <code>место=абзаково,название=гостевой дом-2,координаты=53.8085896,,58.6362112,      |
|                       |         |              |            c=23.02.09,по=05.03.09</code>.                                                       |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| _`useTimeDiff`        | нет     | boolean      | Учитывание часового пояса при запуске рассылки.                                                 |
|                       |         |              |                                                                                                 |
|                       |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Если <code>true</code>, то отправка сообщения осуществляется абоненту согласно      |
|                       |         |              |              расписанию рассылки и его часовому поясу.                                          |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Если <code>false</code>, то сообщение отправляется согласно расписанию              |
|                       |         |              |             инициатора рассылки UTC+3, без учёта часового пояса получателя сообщения.           |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Значение по умолчанию: <code>false</code>.                                          |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| _`scheduleInfo`       | нет     | object       | Расписание рассылки.                                                                            |
|                       |         |              |                                                                                                 |
|                       |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Если не указано, отправляется сразу же, в момент получения запроса.                 |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | scheduleInfo/       | нет     | string       | Время начала.                                                                                   |
| | timeBegin           |         |              |                                                                                                 |
|                       |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Например, <code>10:00</code>.                                                       |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | scheduleInfo/       | нет     | string       | Время окончания.                                                                                |
| | timeEnd             |         |              |                                                                                                 |
|                       |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Например, <code>21:00</code>.                                                       |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | scheduleInfo/       | нет     | string       | Дни рассылки.                                                                                   |
| | weekdaysSchedule    |         |              |                                                                                                 |
|                       |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Задаются цифрами от <code>1</code> (понедельник) до <code>7</code> (воскресенье),   |
|                       |         |              |             например, <code>12345</code>.                                                       |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Если ограничений по дням недели нет, то данный параметр может быть пустой           |
|                       |         |              |             или не передан в запросе.                                                           |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | scheduleInfo/       | нет     | string       | Дата окончания рассылки.                                                                        |
| | deadline            |         |              |                                                                                                 |
|                       |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Например, <code>2024-09-10T16:29:30+0300</code>.                                    |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| _`id`                 | нет     | string       | Уникальный идентификатор на стороне Партнёра.                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Данный параметр нужен для  контроля повторных отправок и дублирования (сервис       |
|                       |         |              |             контроля включается отдельно).                                                      |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Партнёр может вызывать Сервис-провайдера (запрос на отправку сообщения)             |
|                       |         |              |             с одним и тем же id несколько раз. При этом: отправка сообщения абоненту            |
|                       |         |              |             будет выполнена только один раз (по первому запросу).                               |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             В ответах на запросы Сервис-провайдер вернет Партнёру один и тот же                 |
|                       |         |              |             идентификатор сообщения в системе Сервис-провайдера (тот же, что на первый запрос). |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Сервис-провайдер опционально возвращает Партнёру данный идентификатор               |
|                       |         |              |             при его наличии в отчёте о доставке сообщения.                                      |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| _`destAddr`           | нет     | string       | Номер телефона абонента.                                                                        |
|                       |         |              |                                                                                                 |
|                       |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Для Push-сообщений является обязательным при отсутствии                             |
|                       |         |              |             параметра <code>message/data/externalUserId</code>.                                 |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Содержит код страны, код оператора и номер телефона.                                |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |              Для РФ код может быть <code>8</code>, <code>7</code>                               |
|                       |         |              |              или <code>+7</code>.                                                               |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |              Примеры номеров: <code>72101234567</code>,                                         |
|                       |         |              |              <code>+72101234567</code>, <code>8-210-123-45-6</code>,                            |
|                       |         |              |              <code>82101234567</code>.                                                          |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| message               | да      | object       | Параметры отправляемого сообщения.                                                              |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| message/type          | да      | enum         | Тип сообщения. Передается значение ``PUSH``.                                                    |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| message/data          | да      | object       | Параметры отправляемых данных.                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     | string       | ID пользователя для отправки Push-сообщения (логин, email, UID).                                |
| | externalUserId      |         |              |                                                                                                 |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| message/data/ttl      | нет     | integer      | Срок жизни сообщения.                                                                           |
|                       |         |              |                                                                                                 |
|                       |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Допустимый диапазон, секунд: от 30 до 86400.                                        |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     <div class="admonition note">                                                               |
|                       |         |              |         <p class="admonition-title">Примечание</p>                                              |
|                       |         |              |         <p>При <code>ttl = 0</code> или отсутствии параметра в                                  |
|                       |         |              |            запросе берётся значение из настроек по умолчанию, которые задаются                  |
|                       |         |              |            при настройке интеграции отдельно для каждого клиента.</p>                           |
|                       |         |              |         <p>Если <code>ttl</code> не указан в данных местах, то запрос будет                     |
|                       |         |              |            отклонён системой и будет выведена ошибка.</p>                                       |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |     </div>                                                                                      |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     | enum         | Единица измерения периода доставки сообщения.                                                   |
| | ttlUnit             |         |              |                                                                                                 |
|                       |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Передается только вместе с <code>ttl</code>.                                        |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Допустимые значения:                                                                |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <ul>                                                                                    |
|                       |         |              |             <li><code>SECONDS</code>;</li>                                                      |
|                       |         |              |             <li><code>MINUTES</code>;</li>                                                      |
|                       |         |              |             <li><code>HOURS</code>.</li>                                                        |
|                       |         |              |         </ul>                                                                                   |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     | string       | Сервисное имя, от которого осуществляется отправка сообщения.                                   |
| | serviceNumber       |         |              |                                                                                                 |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| message/data/text     | да      | string       | Текст отправляемого сообщения.                                                                  |
|                       |         |              |                                                                                                 |
|                       |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Количество символов: не более 1000.                                                 |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| *Запрос с заголовком*  _`title`                                                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| message/data/title    | нет     | string       | Заголовок для текстового сообщения.                                                             |
|                       |         |              |                                                                                                 |
|                       |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Количество символов: не более 80.                                                   |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | *Запрос с признаком главного приложения* (_`primaryOn`)                                                                                        |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     | boolean      | Признак главного приложения, установленного на устройство абонента.                             |
| | primaryOn           |         |              |                                                                                                 |
|                       |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Допустимые значения:                                                                |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <ul>                                                                                    |
|                       |         |              |             <li><code>true</code> - отправка только на основное устройство                      |
|                       |         |              |             пользователя;</li>                                                                  |
|                       |         |              |             <li><code>false</code> - отправка на все устройства                                 |
|                       |         |              |              пользователя;</li>                                                                 |
|                       |         |              |         </ul>                                                                                   |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Если параметр отсутствует, то передается тоже на все устройства                     |
|                       |         |              |             пользователя.                                                                       |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| registeredDelivery    | нет     | integer      | Необходимость отчётов о доставке.                                                               |
|                       |         |              |                                                                                                 |
|                       |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Возможные значения:                                                                 |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <ul>                                                                                    |
|                       |         |              |             <li><code>0</code> — статусы не нужны;</li>                                         |
|                       |         |              |             <li><code>1</code> — нужны статусы (по умолчанию);</li>                             |
|                       |         |              |             <li><code>2</code> — нужны только статусы <code>НЕ ДОСТАВЛЕНО</code>.</li>          |
|                       |         |              |         </ul>                                                                                   |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| notifyUrl             | нет     | string       | Имя хоста входящего API для получения отчета о доставке (см. :doc:`rest_status`).               |
|                       |         |              |                                                                                                 |
|                       |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Этот параметр в запросе необязательный, но при его отправке нужно                   |
|                       |         |              |             учесть следующее:                                                                   |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <ul>                                                                                    |
|                       |         |              |             <li>если параметр указан, он не может быть пустым;</li>                             |
|                       |         |              |             <li>длина строки <code>notifyUrl</code> не должна превышать 2048                    |
|                       |         |              |             символов.</li>                                                                      |
|                       |         |              |         </ul>                                                                                   |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             При невыполнении любого из указанных условий будет                                  |
|                       |         |              |             сгенерирована ошибка, запрос не будет выполнен.                                     |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| *Запрос с указанием категории содержимого -- изображений, HTML-ссылок и кнопок*  (_`contentCategory`)                                            |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     | object       | Параметры для отправки изображений, HTML-ссылок и кнопок.                                       |
| | content             |         |              |                                                                                                 |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     | enum         | Категория содержимого по ссылке ``contentUrl``.                                                 |
| | content/            |         |              |                                                                                                 |
| | contentCategory     |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Возможные значения:                                                                 |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <ul>                                                                                    |
|                       |         |              |             <li><code>IMAGE</code> — для передачи в <code>contentUrl</code>                     |
|                       |         |              |                 ссылки на изображение;</li>                                                     |
|                       |         |              |             <li><code>HTML</code> — для передачи в <code>contentUrl</code>                      |
|                       |         |              |                 ссылки для перехода. При переходе в Push-сообщение передаваемая                 |
|                       |         |              |                 ссылка  откроется в webView.</li>                                               |
|                       |         |              |         </ul>                                                                                   |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     | string       | URL-адрес изображения или HTML.                                                                 |
| | content/            |         |              |                                                                                                 |
| | contentUrl          |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Максимальная длина ссылки: 512 символов.                                            |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Требования к изображению при <code>contentCategory = IMAGE</code>                   |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <ul>                                                                                    |
|                       |         |              |             <li>форматы изображения: JPEG, PNG, GIF, BMP;</li>                                  |
|                       |         |              |             <li>размер изображения: не более 1 МБ;</li>                                         |
|                       |         |              |             <li>соотношение сторон: 2:1.</li>                                                   |
|                       |         |              |         </ul>                                                                                   |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | *Запрос для отображения кнопок* (_`actions`)                                                                                                   |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     | array        | Массив, в котором передаются кнопки. Описание атрибутов кнопки приведено                        |
| | content/actions     |         |              | в таблице ниже.                                                                                 |
|                       |         |              |                                                                                                 |
|                       |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Кнопки позволяют:                                                                   |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <ul>                                                                                    |
|                       |         |              |             <li>открыть сообщение;</li>                                                         |
|                       |         |              |             <li>перейти по заданной ссылке.</li>                                                |
|                       |         |              |         </ul>                                                                                   |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     | string       | Надпись на кнопке.                                                                              |
| | content/actions/    |         |              |                                                                                                 |
| | title               |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Количество символов, не более: 64.                                                  |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     | string       | Текстовый идентификатор кнопки в мобильном приложении.                                          |
| | content/actions/    |         |              |                                                                                                 |
| | action              |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Определяет действие, которое будет выполняться при клике на кнопку.                 |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Параметр настраивается в мобильном приложении.                                      |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Количество символов, не более: 64.                                                  |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Допустимые значения:                                                                |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <ul>                                                                                    |
|                       |         |              |             <li><code>open-app</code> (открыть приложение);</li>                                |
|                       |         |              |             <li><code>link</code> (перейти по заданной ссылке). </li>                           |
|                       |         |              |         </ul>                                                                                   |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     | string       | Дополнительные параметры кнопки.                                                                |
| | content/actions/    |         |              |                                                                                                 |
| | options             |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Набор зависит от ОС, определяется разработчиком мобильного                          |
|                       |         |              |             приложения. Параметр настраивается в мобильном приложении.                          |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Количество символов, не более: 300.                                                 |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             В случае кнопки с <code>action = link</code> может быть указан URL-адрес для        |
|                       |         |              |             перехода.                                                                           |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
|                       |         |              |                                                                                                 |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| *Запрос с подписками*  (_`deviceSubscriptions`)                                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     | array        | Передаваемый массив с перечнем подписок мобильного приложения.                                  |
| | deviceSubscriptions |         |              |                                                                                                 |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| *Запрос с данными для приложения*  (_`customPayload`)                                                                                            |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     | JSON Object  | Данные, которые передаются в исходном виде для дальнейшей обработки на уровне                   |
| | customPayload       |         |              | клиентского приложения.                                                                         |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | *Запрос с данными для статистики*  (_`callbackData`)                                                                                           |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     | string       | Клиентские данные для статистики.                                                               |
| | callbackData        |         |              |                                                                                                 |
|                       |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             При получении сохраняются в передаваемом                                            |
|                       |         |              |             виде, при необходимости возможен вывод в статистических данных.                     |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | *Запрос с обогащенными данными*  (_`extraOptions`)                                                                                             |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     | array        | Массив объектов дополнительных данных от партнера.                                              |
| | extraOptions        |         |              |                                                                                                 |
|                       |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Содержит два обязательных параметра: <code>param_name</code> и                      |
|                       |         |              |             <code>param_value</code>.                                                           |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | да      | string       | Передача признака сообщения.                                                                    |
| | extraOptioparam_name|         |              |                                                                                                 |
|                       |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Возможные значения:                                                                 |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <ul>                                                                                    |
|                       |         |              |             <li><code>RICH</code> — данные для альтернативного варианта                         |
|                       |         |              |             отправки данных с контентом для мобильного приложения;</li>                         |
|                       |         |              |             <li><code>LIVE_ACTIVITY</code> — данные для обновления виджета                      |
|                       |         |              |              Live Activity на устройствах с операционной системой iOS;</li>                     |
|                       |         |              |             <li><code>SECURE</code> — параметры для передачи чувствительных                     |
|                       |         |              |              данных в push-уведомлении.</li>                                                    |
|                       |         |              |             <li><code>SENDING_PLATFORMS</code> — параметры для передачи                         |
|                       |         |              |              push-уведомлений на определенные типы платформ (APNS, FCM, HMS,                    |
|                       |         |              |              RuStore).</li>                                                                     |
|                       |         |              |         </ul>                                                                                   |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | да      | string       | В зависимости от переданного в ``param_name`` признака данные в ``param_value``                 |
| | extraOptions/       |         |              | будут отличаться.                                                                               |
| | param_value         |         |              |                                                                                                 |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | *param_name=RICH*                                                                                                                              |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     |  string      | Заголовок сообщения.                                                                            |
| | extraOptions/       |         |              |                                                                                                 |
| | param_value/title   |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Если приходит, то происходит подмена присланного                                    |
|                       |         |              |             заголовка или задается заголовок вместо пустого.                                    |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     |  string      | Текст сообщения.                                                                                |
| | exraOptions/        |         |              |                                                                                                 |
| | param_value/message |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Если приходит в <code>RICH</code>, то происходит подмена                            |
|                       |         |              |             присланного текста.                                                                 |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     |  string      | Тип контента.                                                                                   |
| | extraOptions/       |         |              |                                                                                                 |
| | param_value/        |         |              | .. raw:: html                                                                                   |
| | content-category    |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Если приходит, то заменяется вместе с url. Если URL пустой,                         |
|                       |         |              |             то <code>content-category</code> игнорируется.                                      |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     |  string      | Ссылка для контента.                                                                            |
| | extraOptions/       |         |              |                                                                                                 |
| | param_value/        |         |              | .. raw:: html                                                                                   |
| | content-url         |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Если не указан тип контента, то подставляется как url                               |
|                       |         |              |             вместо присланного. Если url не присылается и типа контента не                      |
|                       |         |              |             было прислано, то игнорируется.                                                     |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     |  string      | Пользовательские данные.                                                                        |
| | extraOptions/       |         |              |                                                                                                 |
| | param_value/        |         |              |                                                                                                 |
| | custom-payload      |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |            Если приходит, то заменяют присланные ранее или                                      |
|                       |         |              |            задаются новые данные, если не было прислано ранее.                                  |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     | array        | Список кнопок.                                                                                  |
| | extraOptions/       |         |              |                                                                                                 |
| | param_value/actions |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Если приходят не пустые данные, то происходит замена                                |
|                       |         |              |             присланного ранее контента.                                                         |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| *param_name=LIVE_ACTIVITY*                                                                                                                       |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     | timestamp    |  ``timestamp`` в формате ISO 860 — дата и время, когда Live Activity                            |
| | extraOptions/       |         |              |  считается устаревшим.                                                                          |
| | param_value/aps/    |         |              |                                                                                                 |
| | stale_date *        |         |              |                                                                                                 |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     | timestamp    | ``timestamp`` в формате ISO 8601 — дата и время, когда Live Activity                            |
| | extraOptions/       |         |              | закрывается на экране блокировки.                                                               |
| | param_value/aps/    |         |              |                                                                                                 |
| | dismissal_date *    |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             После того, как виджет перестанет быть активным, он может                           |
|                       |         |              |             еще 4 часа оставаться на экране блокировки, если его не закрыть.                    |
|                       |         |              |             Чтобы закрыть сразу и не ждать, можно указать дату,                                 |
|                       |         |              |             которая уже прошла.                                                                 |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | да      | timestamp    | ``timestamp`` в формате ISO 8601.                                                               |
| | extraOptions/       |         |              |                                                                                                 |
| | param_value/aps/    |         |              |                                                                                                 |
| | timestamp *         |         |              |                                                                                                 |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | да      | string       | Событие для обновления Live Activity.                                                           |
| | extraOptions/       |         |              |                                                                                                 |
| | param_value/aps/    |         |              | .. raw:: html                                                                                   |
| | event *             |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Принимает следующие значения:                                                       |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <ul>                                                                                    |
|                       |         |              |             <li><code>update</code> (для обновления);</li>                                      |
|                       |         |              |             <li><code>end</code> (для деактивации).</li>                                        |
|                       |         |              |         </ul>                                                                                   |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     | object       | Данные, которые будут отображаться в виджете Live Activity.                                     |
| | extraOptions/       |         |              |                                                                                                 |
| | param_value/aps/    |         |              | .. raw:: html                                                                                   |
| | content_state *     |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Параметры передаются разработчиком виджета.                                         |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Данный блок не валидируется.                                                        |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |             В demo приложении реализовано:                                                      |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <ul>                                                                                    |
|                       |         |              |          <li><i>deliveryStatus</i> — статус активити:                                           |
|                       |         |              |           <ul>                                                                                  |
|                       |         |              |            <li>1 — старт новой активити (при передаче в запросе придет обычное                  |
|                       |         |              |              push-уведомление);</li>                                                            |
|                       |         |              |            <li>2 — обновление запущенной активити с                                             |
|                       |         |              |                <code>event = update</code>;</li>                                                |
|                       |         |              |            <li>3 — завершение запущенной активити с                                             |
|                       |         |              |                <code>event = end</code>;</li>                                                   |
|                       |         |              |         </ul>                                                                                   |
|                       |         |              |           </li>                                                                                 |
|                       |         |              |           <li><i>deliveryTime</i> — время доставки                                              |
|                       |         |              |            push-уведомления;</li>                                                               |
|                       |         |              |           <li><i>alert</i> — содержит данные для отображения в                                  |
|                       |         |              |            виджете (реализуется на стороне мобильного приложения).</li>                         |
|                       |         |              |         </ul>                                                                                   |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | *param_name=SECURE*                                                                                                                            |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     | string       | Наименования параметров с чувствительными данными (``param_name = SECURE``).                    |
| | extraOptions/       |         |              |                                                                                                 |
| | param_value         |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             При отправке через облачных провайдеров чувствительные данные,                      |
|                       |         |              |             передаваемые в push-уведомлении, маскируются при помощи шаблонов                    |
|                       |         |              |             (подстановки в тексте и заголовке уведомления).                                     |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Требования к наименованию параметров с данными для подстановки:                     |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <ul>                                                                                    |
|                       |         |              |             <li>текст должен быть на латинице;</li>                                             |
|                       |         |              |             <li>использование спец. символов недопустимо.</li>                                  |
|                       |         |              |         </ul>                                                                                   |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             На примере выше (запрос с обогащенными данными <code>SECURE</code>)                 |
|                       |         |              |             в тексте и заголовке сообщения указаны переменные %name%, %card%                    |
|                       |         |              |             и %data%.                                                                           |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Соответственно, эти значения обязательно должны быть переданы в                     |
|                       |         |              |             <code>param_value</code> для дальнейшей подстановки.                                |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | *param_name=SENDING_PLATFORMS*                                                                                                                 |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+
| | message/data/       | нет     | string       | Перечень наименований провайдеров, на которые необходимо выполнить отправку                     |
| | extraOptions/       |         |              | сообщений.                                                                                      |
| | param_value         |         |              |                                                                                                 |
|                       |         |              | .. raw:: html                                                                                   |
|                       |         |              |                                                                                                 |
|                       |         |              |     <details>                                                                                   |
|                       |         |              |         <summary>Подробнее</summary>                                                            |
|                       |         |              |         <p>                                                                                     |
|                       |         |              |             Возможные значения:                                                                 |
|                       |         |              |         </p>                                                                                    |
|                       |         |              |         <ul>                                                                                    |
|                       |         |              |             <li>Android;</li>                                                                   |
|                       |         |              |             <li>IOS;</li>                                                                       |
|                       |         |              |             <li>Huawei;</li>                                                                    |
|                       |         |              |             <li>RuStore;</li>                                                                   |
|                       |         |              |             <li>Pwa (для отправки веб push-уведомлений).</li>                                   |
|                       |         |              |         </ul>                                                                                   |
|                       |         |              |     </details>                                                                                  |
+-----------------------+---------+--------------+-------------------------------------------------------------------------------------------------+



Ответ на запрос 
-----------------

После отправки сообщения Сервис-провайдер синхронно возвращает ответ. В случае успешной отправки возвращается HTTP-код ``200 OK``.

Ответ при успешной отправке
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::

    .. tab:: Пример ответа

      .. code-block:: json
         :linenos:

           {
              "mtNum": "7390612217"
              "id": "8770599"
           }


    .. tab:: Параметры ответа

      +-----------------------+--------------+--------------------------------------------------------------------+
      | Параметр              | Тип данных   | Описание                                                           |
      +=======================+==============+====================================================================+
      | mtNum                 | string       | Идентификатор цепочки отправки, присваиваемый платформой           |
      |                       |              | Сервис-провайдера.                                                 |
      +-----------------------+--------------+--------------------------------------------------------------------+
      | id                    | string       | Уникальный идентификатор на стороне Партнёра. Присутствует, если   |
      |                       |              | был передан при отправке.                                          |
      +-----------------------+--------------+--------------------------------------------------------------------+
          


Ошибки при отправке  
~~~~~~~~~~~~~~~~~~~~~~~

Для ошибочных результатов HTTP-код ответа будет отличный от ``200 OK`` (см. :ref:`Коды-ошибок-отправки-push`).

.. tabs::

   .. tab:: Пример ответа с ошибкой

      .. code-block:: json   
           :linenos:

            { 
                "error": { 
                   "code": 1, 
                   "description": "Service is unavailable" 
                }
            }



   .. tab:: Параметры ответа

      +-----------------------+--------------+--------------------------------------------------------------------+
      | Параметр              | Тип данных   | Описание                                                           |
      +=======================+==============+====================================================================+
      | error                 | object       | Информация об ошибке.                                              |
      +-----------------------+--------------+--------------------------------------------------------------------+
      | error/code            | int          | Код ошибки.                                                        |
      +-----------------------+--------------+--------------------------------------------------------------------+
      | error/description     | string       | Краткое описание ошибки.                                           |
      +-----------------------+--------------+--------------------------------------------------------------------+
      | extendedDescription   | string       | Подробное описание ошибки (необязательный параметр).               |
      +-----------------------+--------------+--------------------------------------------------------------------+


.. _Коды-ошибок-отправки-push:

Коды ошибок отправки  
~~~~~~~~~~~~~~~~~~~~~~~

+------------+--------------------------------+----------------+
| Код        | Описание                       | HTTP-код       |
+============+================================+================+
| 1          | Service is unavailable         | 503            |
+------------+--------------------------------+----------------+
| 2          | Invalid IP-address             | 403            |
+------------+--------------------------------+----------------+
| 3          | Too many connections           | 429            |
+------------+--------------------------------+----------------+
| 4          | Invalid request                | 400            |
+------------+--------------------------------+----------------+
| 5          | Invalid login                  | 401            |
+------------+--------------------------------+----------------+
| 6          | Invalid password               | 401            |
+------------+--------------------------------+----------------+
| 7          | serviceNumber is not defined   | 400            |
+------------+--------------------------------+----------------+
| 8          | destAddr is not correct        | 406            |
+------------+--------------------------------+----------------+
| 9          | Message type is not correct    | 406            |
+------------+--------------------------------+----------------+
| 10         | Prohibited sending duplicates  | 409            |
+------------+--------------------------------+----------------+
| 11         | Invalid TTL                    | 406            |
+------------+--------------------------------+----------------+
| 100        | 100                            | 500            |
+------------+--------------------------------+----------------+


Статусы доставки push-уведомлений
------------------------------------

Для получения статусов push-уведомлений необходимо настроить :doc:`rest_status`.

Коды ошибок доставки
~~~~~~~~~~~~~~~~~~~~~~~

Коды ошибок доставки, в зависимости от типа сообщения, приведены в соответствующей вкладке в разделе :ref:`REST-ErrCodeDescr`.
