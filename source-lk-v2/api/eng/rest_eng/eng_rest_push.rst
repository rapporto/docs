Push
=====
Push Notifications Sending
-----------------------------

Text sending and additional parameters are available in push notifications.

Examples of additional parameters:

* title; 
* images;
* buttons;
* HTML pages;
* templates for sending sensitive data;
* parameters for data enrichment;
* data without preprocessing (in JSON format);
* client data for statistics;
* data for updating :abbr:`Live Activity (Live Activity works on iOS devices)`;
* primary application attribute;
* mobile app subscriptions;
* providers indication (:abbr:`APNS (Apple Push Notification Service)`, :abbr:`FCM (Firebase Cloud Messaging)`, :abbr:`HMS (Huawei Mobile Services)`, RuStore) for sending data.



.. _eng-примеры-запросов:

Request Examples 
~~~~~~~~~~~~~~~~~~~~~

Request examples to send push notifications.

.. raw:: html

   <p style="line-height: 24px;">To generate a test request with your parameters, please 
       <a href="https://doc.rapporto.ru/generator/" target="_blank" class="button">
           <img src="../../../_static/link-external-01.svg" class="bttn-icon" alt="Внешняя ссылка"> open the request generator.
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

    .. tab:: extended request

        Description of `useTimeDiff`_ ; `destAddr`_ parameters.  

        .. code-block:: json
           :linenos:
           :emphasize-lines: 4-14 

             {
                "login":"YOUR_LOGIN",
                "password":"YOUR_PASSWORD",
                "id":"8770630",
                "extraParam":"param1=value1,param2=value2",
                "registeredDelivery":"1",
                "notifyUrl":"URL_for_sending_statuses"
                "useTimeDiff":true,
                "scheduleInfo":{
                  "timeBegin":"10:00",
                  "timeEnd":"12:00",
                  "weekdaysSchedule":"123",
                  "deadline": "2029-12-31T16:29:30+0300"
                },
                "destAddr":"Subscriber's_Number",
                "message":{
                  "type":"Push",
                  "data":{
                    "externalUserId": "subscriber's_ID",
                    "text":"Notification text",
                    "serviceNumber":"SENDER'S_NAME",
                    "ttl":10,
                    "ttlUnit": "SECONDS",
                  }
                }
             }           




    .. tab:: text  
                       
        .. code-block:: json
           :linenos:
           :emphasize-lines: 9

             {
                "login":"YOUR_LOGIN",
                "password":"YOUR_PASSWORD",
                "id":"8770631",
                "destAddr":"Subscriber's_Number",
                "message":{
                   "type":"PUSH",
                   "data":{
                      "text":"Notification text",
                      "serviceNumber":"SENDER'S_NAME",
                      "ttl":2
                   }
                }
             }


    .. tab:: text and header

        Description of the `title`_ parameter.

        .. code-block:: json
           :linenos:
           :emphasize-lines: 9,10

             {
                "login":"YOUR_LOGIN",
                "password":"YOUR_PASSWORD",
                "id":"8770631",
                "destAddr":"Subscriber's_Number",
                "message":{
                   "type":"PUSH",
                   "data":{
                      "title":"Push notification header",
                      "text":"Notification text",
                      "serviceNumber":"SENDER'S_NAME",
                      "ttl":2
                   }
                }
             }


    .. tab:: primary application attribute

        Description of the `primaryOn`_ parameter.

        .. code-block:: json
           :linenos:
           :emphasize-lines: 10

             {
                "login":"YOUR_LOGIN",
                "password":"YOUR_PASSWORD",
                "id":"8770631",
                "destAddr":"Subscriber's_Number",
                "message":{
                   "type":"PUSH",
                   "data":{
                      "text":"Notification text",
                      "primaryOn":true,
                      "serviceNumber":"SENDER'S_NAME",
                      "ttl":2
                   }
                }
             }


    .. tab:: image

        In this example the message is transmitted over the client's *externalUserId*.
        
        Description of the `contentCategory`_ parameter.

        .. code-block:: json
           :linenos:
           :emphasize-lines: 13-16

             {
                "login": "YOUR_LOGIN",
                "password": "YOUR_PASSWORD",
                "id": "9999992",
                "message": {
                   "type": "PUSH",
                   "data": {
                      "externalUserId": "Subscriber's_ID",
                      "text": "Message_text",
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
    

    .. tab:: image and buttons

        In this example the message is transmitted over the client's *externalUserId*.
        
        Description of `contentCategory`_ ; `actions`_ parameters.

        .. code-block:: json
           :linenos:
           :emphasize-lines: 13-28

             {
                "login": "YOUR_LOGIN",
                "password": "YOUR_PASSWORD",
                "id": "9999992",
                "message": {
                   "type": "PUSH",
                   "data": {
                      "externalUserId": "Subscriber's_ID",
                      "text": "Message_text",
                      "serviceNumber": "0000",
                      "ttl": 40,
                      "ttlUnit": "SECONDS",
                      "content": {
                         "contentCategory": "IMAGE",
                         "contentUrl": "https://i.pinimg.com/originals/11/ab/14/11ab147894a7d2ce866ff88a4aa63655.jpg",
                         "actions": [
                            {
                               "title": "Open",
                               "action": "link",
                               "options": "https://doc.rapporto.ru/"
                            },
                            {
                               "title": "Open application",
                               "action": "open-app",
                               "options": ""
                            }
                         ]
                      }
                   }
                }
             }
    
                   
    .. tab:: HTML

        Description of the `contentCategory`_ parameter.

        .. code-block:: json
           :linenos:
           :emphasize-lines: 13-16

             {
                "login": "YOUR_LOGIN",
                "password": "YOUR_PASSWORD",
                "id": "9999992",
                "destAddr":"Subscriber's_Number",
                "message": {
                   "type": "PUSH",
                   "data": {
                      "text": "Message_text",
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


    .. tab:: subscriptions

        Description of the `deviceSubscriptions`_ parameter.

        .. code-block:: json
           :linenos:
           :emphasize-lines: 14-16

            {
               "login":"YOUR_LOGIN",
               "password":"YOUR_PASSWORD",
               "id":"8770631",
               "destAddr":"Subscriber's_Number",
               "message":{
                  "type":"PUSH",
                  "data":{
                     "externalUserId":"Subscriber's_ID",
                     "text":"Текст",
                     "serviceNumber":"SENDER'S_NAME",
                     "ttl":24,
                     "ttlUnit":"HOURS",
                     "deviceSubscriptions":[
                        "card"
                     ]
                  }
               }
            }

   

    .. tab:: data for application

        Description of the `customPayload`_ parameter.

        .. code-block:: json
           :linenos:
           :emphasize-lines: 14-16

            {
               "login":"YOUR_LOGIN",
               "password":"YOUR_PASSWORD",
               "id":"8770631",
               "destAddr":"Subscriber's_Number",
               "message":{
                  "type":"PUSH",
                  "data":{
                     "title":"Push message header",
                     "text":"Notification_text",
                     "serviceNumber":"SENDER'S_NAME",
                     "ttl":1,
                     "ttlUnit":"MINUTES",
                     "customPayload":{
                        "list":"card"
                     }
                  }
               }
            }

   
    .. tab:: data for statistics

        Description of the `callbackData`_ parameter.

        .. code-block:: json
           :linenos:
           :emphasize-lines: 16
           
            {
               "login":"YOUR_LOGIN",
               "password":"YOUR_PASSWORD",
               "id":"8770631",
               "destAddr":"Subscriber's_Number",
               "message":{
                  "type":"PUSH",
                  "data":{
                     "title":"Push message header",
                     "text":"Notification_text",
                     "serviceNumber":"SENDER'S_NAME",
                     "ttl":1,
                     "ttlUnit":"MINUTES"
                  }
               },
               "callbackData":"Data_for_statistics"
            }

    .. tab:: data enrichment
         
        .. tabs::
        
            .. tab:: RICH
            
                Parameters for an alternative sending data with content for a mobile application.       

                .. code-block:: json
                   :linenos:
                   :emphasize-lines: 14-22

                    {
                       "login":"YOUR_LOGIN",
                       "password":"YOUR_PASSWORD",
                       "id":"4560",
                       "message":{
                          "type":"PUSH",
                          "data":{
                             "externalUserId":"Subscriber's_ID",
                             "title":"Previous_header",
                             "text":"Previous_text",
                             "serviceNumber":"SENDER'S_NAME",
                             "ttl":30,
                             "ttlUnit":"SECONDS",
                             "extraOptions":[
                                {
                                   "param_name":"RICH",
                                   "param_value":{
                                      "title":"New_header",
                                      "message":"New_text"
                                   }
                                }
                             ]
                          }
                       }
                    }
        
        
            .. tab:: LIVE_ACTIVITY

                Parameters to update Live Activity on iOS devices. 
        
                .. code-block:: json
                   :linenos:
                   :emphasize-lines: 14-28

                    {
                       "login":"YOUR_LOGIN",
                       "password":"YOUR_PASSWORD",
                       "id":"4560",
                       "message":{
                          "type":"PUSH",
                          "data":{
                             "externalUserId":"Subscriber's_ID",
                             "title":"Header",
                             "text":"Text",
                             "serviceNumber":"SENDER'S_NAME",
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

                Parameters to send sensitive data in a push notification. 
        
                .. code-block:: json
                   :linenos:
                   :emphasize-lines: 15-24

                    {
                       "login":"YOUR_LOGIN",
                       "password":"YOUR_PASSWORD",
                       "id":"4560",
                       "message":{
                          "type":"PUSH",
                          "data":{
                             "primaryOn":false,
                             "externalUserId":"Subscriber's_ID",
                             "title": "Code to receive %data%",
                             "text":"%name%, your card with number %card% is ready for issue",
                             "serviceNumber":"SENDER'S_NAME",
                             "ttl":30,
                             "ttlUnit":"SECONDS",
                             "extraOptions":[
                                {
                                   "param_name":"SECURE",
                                   "param_value":{
                                      "name":"Name",
                                      "card":"*0000",
                                      "data":"12345"
                                   }
                                }
                             ]
                          }
                       }
                    }


            .. tab:: SENDING_PLATFORM

                Parameters to send push notifications to certain types of platforms (:abbr:`APNS (Apple Push Notification Service)`, :abbr:`FCM (Firebase Cloud Messaging)`, :abbr:`HMS (Huawei Mobile Services)`, RuStore) at the request of the Partner. 
        
                .. code-block:: json
                   :linenos:
                   :emphasize-lines: 14-23

                    {
                       "login":"YOUR_LOGIN",
                       "password":"YOUR_PASSWORD",
                       "id":"1",
                       "message":{
                          "type":"PUSH",
                          "data":{
                             "serviceNumber":"Service_sender's_name",
                             "externalUserId":"Subscriber's_ID",
                             "text":"Message_text",
                             "title":"Message_header",
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


.. _eng-Rest-Push-параметры-запроса:

Request Parameters  
~~~~~~~~~~~~~~~~~~~~

+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| Parameter             | Required | Data type    | Description                                                                    |
+=======================+==========+==============+================================================================================+
| login                 | yes      | string       | Partner's name in the system.                                                  |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| password              | yes      | string       | Partner's password in the system.                                              |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| extraParam            | no       | string       | Additional parameters passed as ``param1=value1,param2=value2``,               |
|                       |          |              | where:                                                                         |
|                       |          |              |                                                                                |
|                       |          |              | * ``param1`` and ``param2`` -- parameter names;                                |
|                       |          |              | * ``value1`` and ``value2`` -- values.                                         |
|                       |          |              |                                                                                |
|                       |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |            The comma character cannot be included in the parameter name, but   |
|                       |          |              |            it can be included in its value — in this case it must be doubled.  |
|                       |          |              |            Example: the string                                                 |
|                       |          |              |            <code>place=abzakovo,name=guest house-2,coordinates=53.8085896,,    |
|                       |          |              |            58.6362112,from=23.02.09,to=05.03.09</code>.                        |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| _`useTimeDiff`        | no       | boolean      | Taking into account the time zone when starting messaging.                     |
|                       |          |              |                                                                                |
|                       |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             If <code>true</code>, the message is sent to the subscriber        |
|                       |          |              |             according to the messaging schedule and his time zone.             |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             If <code>false</code>, the message is sent according to the        |
|                       |          |              |             messaging initiator schedule UTC+3 regardless of the message       |
|                       |          |              |             recipient time zone.                                               |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             Default value: <code>false</code>.                                 |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| _`scheduleInfo`       | no       | object       | Messaging schedule.                                                            |
|                       |          |              |                                                                                |
|                       |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             If it is not specified, it is sent immediately upon                |
|                       |          |              |             receipt of the request.                                            |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| scheduleInfo/timeBegin| no       | string       | Start time.                                                                    |
|                       |          |              |                                                                                |
|                       |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             Example: <code>10:00</code>.                                       |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| scheduleInfo/timeEnd  | no       | string       | End time.                                                                      |
|                       |          |              |                                                                                |
|                       |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             Example: <code>21:00</code>.                                       |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | scheduleInfo/       | no       | string       | Messaging days.                                                                |
| | weekdaysSchedule    |          |              |                                                                                |
|                       |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             Specified by numbers from <code>1</code> (Monday) to <code>7</code>|
|                       |          |              |             (Sunday), for example, <code>12345</code>.                         |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             If there are no restrictions on days of the week, this parameter   |
|                       |          |              |             can be empty or not delivered in the request.                      |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| scheduleInfo/deadline | no       | string       | End date of the messaging.                                                     |
|                       |          |              |                                                                                |
|                       |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             Example: <code>2024-09-10T16:29:30+0300</code>.                    |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| _`id`                 | no       | string       | Partner-side unique ID.                                                        |
|                       |          |              |                                                                                |
|                       |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             This parameter is required to control re-sending and duplication   |
|                       |          |              |             (the control service is enabled separately).                       |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             The Partner may recall the Service Provider (the request to send   |
|                       |          |              |             a message) with the same ID several times. In this case the        |
|                       |          |              |             message will be sent to the subscriber only once                   |
|                       |          |              |             (upon the first request).                                          |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             In response to requests, the Service Provider will return the      |
|                       |          |              |             same message ID in the Service Provider's system to the Partner    |
|                       |          |              |             (the same as for the first request).                               |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             The Service Provider optionally returns this ID to the Partner,    |
|                       |          |              |             if available in the message delivery report.                       |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| _`destAddr`           | no       | string       | Subscriber's phone number.                                                     |
|                       |          |              |                                                                                |
|                       |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             Mandatory in case of push message if the                           |
|                       |          |              |             <code>message/data/externalUserId</code> parameter is missing.     |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             It contains the country code, operator code and phone number.      |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <p>                                                                    |
|                       |          |              |              For the Russian Federation, the code  <code>8</code>,             |
|                       |          |              |              <code>7</code> or <code>+7</code>.                                |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <p>                                                                    |
|                       |          |              |              Examples: <code>72101234567</code>,                               |
|                       |          |              |              <code>+72101234567</code>, <code>8-210-123-45-6</code>,           |
|                       |          |              |              <code>82101234567</code>.                                         |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| message               | yes      | object       | Parameters of a message being sent.                                            |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| message/type          | yes      | enum         | Message type. The value of *PUSH* is transmitted.                              |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| message/data          | yes      | object       | Parameters of the data being sent.                                             |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | string       | User ID to send push messages (login, email, UID).                             |
| | externalUserId      |          |              |                                                                                |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| message/data/ttl      | no       | integer      | Message lifetime. Acceptable range in seconds: from 30 to 86400.               |
|                       |          |              |                                                                                |
|                       |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             Acceptable range in seconds: from 30 to 86400.                     |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     <div class="admonition note">                                              |
|                       |          |              |         <p class="admonition-title">Note</p>                                   |
|                       |          |              |         <p>When <code>ttl = 0 </code> or the parameter is absent               |
|                       |          |              |            in the request, the value from the default settings is used,        |
|                       |          |              |            which is set during the integration setup separately for            |
|                       |          |              |            each client.</p>                                                    |
|                       |          |              |         <p>If <code>ttl</code> is not specified in these places the request    |
|                       |          |              |            will be rejected by the system and an error will be displayed.</p>  |
|                       |          |              |         <p>                                                                    |
|                       |          |              |     </div>                                                                     |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| message/data/ttlUnit  | no       | enum         | Unit of measurement of the message delivery period.                            |
|                       |          |              |                                                                                |
|                       |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             It is transmitted only with <code>ttl</code>.                      |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             Possible values are:                                               |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <ul>                                                                   |
|                       |          |              |             <li><code>SECONDS</code>;</li>                                     |
|                       |          |              |             <li><code>MINUTES</code>;</li>                                     |
|                       |          |              |             <li><code>HOURS</code>.</li>                                       |
|                       |          |              |         </ul>                                                                  |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | string       | Sender's name from which the message is being sent.                            |
| | serviceNumber       |          |              |                                                                                |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| message/data/text     | yes      | string       | Message text.                                                                  |
|                       |          |              |                                                                                |
|                       |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             Maximum length: 1000 characters.                                   |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| *Request with a header*  _`title`                                                                                                |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| message/data/title    | no       | string       | Header of the text message.                                                    |
|                       |          |              |                                                                                |
|                       |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             Amount of characters is no more than: 80.                          |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| *Request with the primary application attribute* (_`primaryOn`)                                                                  |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | boolean      | Indication of the primary application installed on the subscriber's device.    |
| | primaryOn           |          |              |                                                                                |
|                       |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             Possible values are:                                               |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <ul>                                                                   |
|                       |          |              |             <li><code>true</code> — sending only to the user's primary         |
|                       |          |              |             device;</li>                                                       |
|                       |          |              |             <li><code>false</code> — sending to all the user's devices.</li>   |
|                       |          |              |         </ul>                                                                  |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             If the parameter is missing, it is also sent to all user devices.  |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| registeredDelivery    | no       | integer      | Requirement of delivery reports.                                               |
|                       |          |              |                                                                                |
|                       |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             Possible values are:                                               |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <ul>                                                                   |
|                       |          |              |             <li><code>0</code> — statuses are not required;</li>               |
|                       |          |              |             <li><code>1</code> — statuses are required (by default);</li>      |
|                       |          |              |             <li><code>2</code> — only "Undelivered" status is required. </li>  |
|                       |          |              |         </ul>                                                                  |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| notifyUrl             | no       | string       | Hostname of the incoming API to obtain the delivery report (see                |
|                       |          |              | :doc:`eng_rest_status`).                                                       |
|                       |          |              |                                                                                |
|                       |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             This parameter is optional in the request, but when sending        |
|                       |          |              |             you need to consider the following:                                |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <ul>                                                                   |
|                       |          |              |             <li>if the parameter is specified, it cannot be empty;</li>        |
|                       |          |              |             <li>the <code>notifyUrl</code> string must be no more than 2048    |
|                       |          |              |             characters long.</li>                                              |
|                       |          |              |         </ul>                                                                  |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             If any of the specified conditions are not met, an error will      |
|                       |          |              |             be generated and the request will not be executed.                 |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| *Request specifying the category of content -- images, HTML links and buttons* (_`contentCategory`)                              |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| message/data/content  | no       | object       | Parameters for sending images, HTML links and buttons.                         |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | enum         | Content category by the ``contentUrl`` link.                                   |
| | content/            |          |              |                                                                                |
| | contentCategory     |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             Possible values are:                                               |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <ul>                                                                   |
|                       |          |              |             <li><code>IMAGE</code> - to send in the <code>contentUrl</code>    |
|                       |          |              |                 link to the image;</li>                                        |
|                       |          |              |             <li><code>HTML</code> - to send in <code>contentUrl</code> link    |
|                       |          |              |                 to go to. After opening push message the transmitted link      |
|                       |          |              |                 will open in the webView. </li>                                |
|                       |          |              |         </ul>                                                                  |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | string       | URL of the image or HTML.                                                      |
| | content/contentUrl  |          |              |                                                                                |
|                       |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             Maximum link length: 512 characters.                               |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             Image requirements to <code>contentCategory = IMAGE</code>:        |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <ul>                                                                   |
|                       |          |              |             <li>image formats:JPEG, PNG, GIF, BMP;</li>                        |
|                       |          |              |             <li>image size: no more than 1 Mb;</li>                            |
|                       |          |              |             <li>proportion: 2:1.</li>                                          |
|                       |          |              |         </ul>                                                                  |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| *Request to display buttons* (_`actions`)                                                                                        |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | array        | | Array containing buttons.                                                    |
| | content/actions     |          |              | | The description of the button attributes is given in the tabLe below.        |
|                       |          |              |                                                                                |
|                       |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             The buttons allow to:                                              |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <ul>                                                                   |
|                       |          |              |             <li>open a message;</li>                                           |
|                       |          |              |             <li>follow the specified link.</li>                                |
|                       |          |              |         </ul>                                                                  |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | string       | Inscription on the button.                                                     |
| | content/actions/    |          |              |                                                                                |
| | title               |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             Amount of characters: no more than 64.                             |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | string       | Text ID of the button in the mobile application.                               |
| | content/actions/    |          |              |                                                                                |
| | action              |          |              |                                                                                |
|                       |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             It defines the action to be performed when the button is clicked.  |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             The parameter is configured in the mobile application.             |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             Amount of characters: no more than 64.                             |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             Possible values are:                                               |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <ul>                                                                   |
|                       |          |              |             <li><code>open-app</code> (open the application);</li>             |
|                       |          |              |             <li><code>link</code> (follow the specified link).</li>            |
|                       |          |              |         </ul>                                                                  |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | string       | Additional button parameters.                                                  |
| | content/actions/    |          |              |                                                                                |
| | options             |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             The set depends on the OS and is determined by the developer       |
|                       |          |              |             of the mobile application. The parameter is configured in the      |
|                       |          |              |             mobile application.                                                |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             Number of characters: no more than 300.                            |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             In case of a button with <code>action = link</code> the URL        |
|                       |          |              |             for the transition can be specified.                               |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| *Request with subscriptions*  (_`deviceSubscriptions`)                                                                           |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | array        | Transmitted array with a list of mobile app subscriptions.                     |
| | deviceSubscriptions |          |              |                                                                                |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| *Request with data for the application*  (_`customPayload`)                                                                      |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | JSON Object  | Data which are transmitted in its original form for further use                |
| | customPayload       |          |              | in the mobile application.                                                     |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| *Request with data for statistics*  (_`callbackData`)                                                                            |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | string       | Client data for statistics.                                                    |
| | callbackData        |          |              |                                                                                |
|                       |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             They are saved in the transmitted form upon receipt, an output     |
|                       |          |              |             in statistical data is possible, if necessary.                     |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| *Request with enriched data*  (_`extraOptions`)                                                                                  |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | array        | Array of additional data objects from the partner.                             |
| | extraOptions        |          |              |                                                                                |
|                       |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             It contains two mandatory parameters: <code>param_name</code> and  |
|                       |          |              |             <code>param_value</code>.                                          |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | yes      | string       | Transmission of the message attribute.                                         |
| | extraOptions/       |          |              |                                                                                |
| | param_name          |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             Possible values are:                                               |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <ul>                                                                   |
|                       |          |              |             <li><code>RICH</code> — data for an alternative sending data with  |
|                       |          |              |              content for a mobile application;</li>                            |
|                       |          |              |             <li><code>LIVE_ACTIVITY</code> — data for updating the             |
|                       |          |              |              Live Activity widget on iOS devices;</li>                         |
|                       |          |              |             <li><code>SECURE</code> — parameters for transmitting sensitive    |
|                       |          |              |              data in a push notification;</li>                                 |
|                       |          |              |             <li><code>SENDING_PLATFORMS</code> — parameters for sending        |
|                       |          |              |              push notifications to certain types of platforms (APNS, FCM, HMS, |
|                       |          |              |              RuStore).</li>                                                    |
|                       |          |              |         </ul>                                                                  |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | yes      | string       | Depending on the attribute passed to ``param_name`` the data in ``param_value``|
| | extraOptions/       |          |              | will be differ.                                                                |
| | param_value         |          |              |                                                                                |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| *param_name=RICH*                                                                                                                |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | string       | Header of the message.                                                         |
| | extraOptions/       |          |              |                                                                                |
| | param_value/title   |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             If this parameter is received, the sent header is                  |
|                       |          |              |             replaced or the header is set instead of an empty one.             |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | string       | Message text.                                                                  |
| | extraOptions/       |          |              |                                                                                |
| | param_value/message |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>Подробнее</summary>                                           |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             If it is sent in <code>RICH</code>, then the sent text             |
|                       |          |              |             is replaced.                                                       |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | string       | Content type.                                                                  |
| | extraOptions/       |          |              |                                                                                |
| | param_value/        |          |              | .. raw:: html                                                                  |
| | content-category    |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             If it is sent, it is replaced along with the url. If the URL is    |
|                       |          |              |             empty, the <code>content-category</code> is ignored.               |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | string       | Link for the content.                                                          |
| | extraOptions/       |          |              |                                                                                |
| | param_value/        |          |              | .. raw:: html                                                                  |
| | content-url         |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             If the content type is not specified, it is substituted as a url   |
|                       |          |              |             instead of the sent one. If the url is not sent and the            |
|                       |          |              |             content type has not been sent, it is ignored.                     |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | string       | User data.                                                                     |
| | extraOptions/       |          |              |                                                                                |
| | param_value/        |          |              | .. raw:: html                                                                  |
| | custom-payload      |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |            If they are sent, the previously sent data are replaced             |
|                       |          |              |            or new data are set if they were not sent earlier.                  |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | array        | List of buttons.                                                               |
| | extraOptions/       |          |              |                                                                                |
| | param_value/actions |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             If the data is not empty, then the previously sent                 |
|                       |          |              |             content is replaced.                                               |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| *param_name=LIVE_ACTIVITY*                                                                                                       |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | timestamp    | *timestamp* in ISO 860 format — date and time when Live Activity is considered |
| | extraOptions/       |          |              | obsolete.                                                                      |
| | param_value/aps/    |          |              |                                                                                |
| | stale_date *        |          |              |                                                                                |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | timestamp    | *timestamp* in ISO 8601 format — date and time when Live Activity closes on    |
| | extraOptions/       |          |              | the lock screen.                                                               |
| | param_value/aps/    |          |              |                                                                                |
| | dismissal_date *    |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             After the widget stops being active, it can remain on the lock     |
|                       |          |              |             screen for another 4 hours if it is not closed. To close it        |
|                       |          |              |             immediately and not wait, you can specify a date that has          |
|                       |          |              |             already passed.                                                    |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | yes      | timestamp    | *timestamp* in ISO 8601 format.                                                |
| | extraOptions/       |          |              |                                                                                |
| | param_value/aps/    |          |              |                                                                                |
| | timestamp *         |          |              |                                                                                |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | yes      | string       | Event for updating the Live Activity.                                          |
| | extraOptions/       |          |              |                                                                                |
| | param_value/aps/    |          |              | .. raw:: html                                                                  |
| | event *             |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             This parameter can take the following values:                      |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <ul>                                                                   |
|                       |          |              |             <li><code>update</code> (for update);</li>                         |
|                       |          |              |             <li><code>end</code> (for deactivation).</li>                      |
|                       |          |              |         </ul>                                                                  |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | object       | Data that will be displayed in the Live Activity widget.                       |
| | extraOptions/       |          |              |                                                                                |
| | param_value/aps/    |          |              | .. raw:: html                                                                  |
| | content_state *     |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             The widget developer sends these parameters.                       |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             This block is not validated.                                       |
|                       |          |              |         </p>                                                                   |
|                       |          |              |             The following data is realized in demo application:                |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <ul>                                                                   |
|                       |          |              |          <li><i>deliveryStatus</i> — status of the activity:                   |
|                       |          |              |           <ul>                                                                 |
|                       |          |              |            <li>1 — start of a new activity (the usual push notification will   |
|                       |          |              |              be sent in the request);</li>                                     |
|                       |          |              |            <li>2 — updating a started activity with                            |
|                       |          |              |                <code>event = update</code>;</li>                               |
|                       |          |              |            <li>3 — ending of the started activity with                         |
|                       |          |              |                <code>event = end</code>;</li>                                  |
|                       |          |              |         </ul>                                                                  |
|                       |          |              |           </li>                                                                |
|                       |          |              |           <li><i>deliveryTime</i> — push notification delivery                 |
|                       |          |              |            time;</li>                                                          |
|                       |          |              |           <li><i>alert</i> — contains data to be displayed in the              |
|                       |          |              |            widget (implemented on the mobile application side).</li>           |
|                       |          |              |         </ul>                                                                  |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| *param_name=SECURE*                                                                                                              |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | string       | Names of parameters with sensitive data (``param_name = SECURE``).             |
| | extraOptions/       |          |              |                                                                                |
| | param_value         |          |              |                                                                                |
|                       |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             When sending via cloud providers, sensitive data transmitted       |
|                       |          |              |             in a push notification is masked using templates (substitutions in |
|                       |          |              |             the text and in the title of the notification).                    |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             Requirements for naming parameters with data for substitution:     |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <ul>                                                                   |
|                       |          |              |             <li>the text must be in Latin;</li>                                |
|                       |          |              |             <li>the use of special characters is unacceptable.</li>            |
|                       |          |              |         </ul>                                                                  |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             In the example above (a request with enriched <code>SECURE</code>  |
|                       |          |              |             data) the variables %name%, %card% and %data% are specified        |
|                       |          |              |             in the text and in the header of the message.                      |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             These values must be passed in <code>param_value</code>            |
|                       |          |              |             for further substitution.                                          |
|                       |          |              |         </p>                                                                   |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| *param_name=SENDING_PLATFORMS*                                                                                                   |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+
| | message/data/       | no       | string       | List of names of providers to which you need to send messages.                 |
| | extraOptions/       |          |              |                                                                                |
| | param_value         |          |              | .. raw:: html                                                                  |
|                       |          |              |                                                                                |
|                       |          |              |     <details>                                                                  |
|                       |          |              |         <summary>More details</summary>                                        |
|                       |          |              |         <p>                                                                    |
|                       |          |              |             Possible values are:                                               |
|                       |          |              |         </p>                                                                   |
|                       |          |              |         <ul>                                                                   |
|                       |          |              |             <li><code>Android</code>;</li>                                     |
|                       |          |              |             <li><code>IOS</code>;</li>                                         |
|                       |          |              |             <li><code>Huawei</code>;</li>                                      |
|                       |          |              |             <li><code>RuStore</code>;</li>                                     |
|                       |          |              |             <li><code>Pwa</code> (for sending web push notifications).</li>    |
|                       |          |              |         </ul>                                                                  |
|                       |          |              |     </details>                                                                 |
+-----------------------+----------+--------------+--------------------------------------------------------------------------------+



Response to the Request 
---------------------------

After sending a message the Service Provider returns a response synchronously. In case of successful sending the Service Provider returns HTTP-code ``200 OK``.

Successful Sending
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::

    .. tab:: Response example

      .. code-block:: json
         :linenos:

           {
              "mtNum": "7390612217"
              "id": "8770599"
           }


    .. tab:: Response parameters

      +-----------------------+--------------+--------------------------------------------------------------------+
      | Parameter             | Data type    | Description                                                        |
      +=======================+==============+====================================================================+
      | mtNum                 | string       | Sending chain identifier assigned by the Service Provider platform.|
      +-----------------------+--------------+--------------------------------------------------------------------+
      | id                    | string       | Partner-side unique ID. Available, if it was included when sending.|
      +-----------------------+--------------+--------------------------------------------------------------------+



Sending Errors  
~~~~~~~~~~~~~~~~~~~~~~~

For results with errors, a response HTTP code will differ from ``200`` (see :ref:`eng-Коды-ошибок-отправки-push`).

.. tabs::

   .. tab:: Response example

      .. code-block:: json   
           :linenos:

            { 
                "error": { 
                   "code": 1, 
                   "description": "Service is unavailable" 
                }
            }



   .. tab:: Response parameters

      +-----------------------+--------------+--------------------------------------------------------------------+
      | Parameter             | Data type    | Description                                                        |
      +=======================+==============+====================================================================+
      | error                 | object       | Error information.                                                 |
      +-----------------------+--------------+--------------------------------------------------------------------+
      | error/code            | int          | Error code.                                                        |
      +-----------------------+--------------+--------------------------------------------------------------------+
      | error/description     | string       | A brief description of the error.                                  |
      +-----------------------+--------------+--------------------------------------------------------------------+
      | extendedDescription   | string       | Detailed description of the error (optional parameter).            |
      +-----------------------+--------------+--------------------------------------------------------------------+


.. _eng-Коды-ошибок-отправки-push:

Error Codes  
~~~~~~~~~~~~~~~~~~~~~~~

+------------+--------------------------------+----------------+
| Code       | Description                    | HTTP-code      |
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


Push Notification Delivery Statuses
------------------------------------

To receive statuses of push notifications, you need to set up the :doc:`eng_rest_status`.

Delivery Error Codes
~~~~~~~~~~~~~~~~~~~~~~~

Delivery error codes for each message type are provided in the corresponding tab of the :ref:`REST-ErrCodeDescr-eng` section.
