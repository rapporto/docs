VK
===

VK Message Sending Request
--------------------------------

.. raw:: html

   <p style="line-height: 24px;">To generate a test request with your parameters please 
       <a href="https://doc.rapporto.ru/generator/" target="_blank" class="button">
           <img src="../../_static/link-external-01.svg" class="bttn-icon" alt="Внешняя ссылка"> open the request generator
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

    .. tab:: Request example

        .. code-block:: json
           :linenos:

            {
                "login":"YOUR_LOGIN",
                "password":"YOUR_PASSWORD",
                "useTimeDiff":true,
                "id":"8770630",
                "scheduleInfo":{
                    "timeBegin":"10:00",
                    "timeEnd":"12:00",
                    "weekdaysSchedule":"123"
                },
                "destAddr":"Subscriber's_Number",
                "message":{
                    "type":"VK",
                    "data":{
                    "text":"Message text",
                    "serviceNumber":"SENDER'S_NAME",
                    "ttl":10
                    }
                }
            }


.. _eng-Rest-VK-параметры-запроса:

Request Parameters
-------------------------
    
The **mandatory** parameters are highlighted **in bold**.

.. csv-table:: 
    :header: "Parameter", "Data type", "Description"
    :widths: 20, 15, 45
    :class: my-table

    "**login**", "string", "Partner's name in the system."
    "**password**", "string", "Partner's password in the system."
    "useTimeDiff", "boolean", "Taking into account the time zone when starting messaging. If *true*, the message is sent to the subscriber according to the messaging schedule and his time zone. If *false*, the message is sent according to the messaging initiator schedule UTC+3, regardless of the message recipient time zone. Default value: *false*."
    "id", "string", "Partner-side unique ID. This parameter is required to control re-sending and duplication (the control service is enabled separately). The Partner may recall the Service Provider (the request to send a message) with the same ID several times. In this case the message will be sent to the subscriber only once (upon the first request). In response to requests, the Service Provider will return the same message ID in the Service Provider's system to the Partner (the same as for the first request). The Service Provider optionally returns this ID to the Partner, if available in the message delivery report."
    "shortenLinks", "boolean", "This parameter controls the automatic shortening of long links in a message. Possible values are - *true* - to shorten links (default value), *false* - shortening link is not required. If the service is available to the Partner, the URL strings will be shorted by default if the parameter is not received in the request. The ability to use this service is pre-negotiated and configured by the Service Provider. For more details see: :doc:`eng_rest_short_link`."
    "scheduleInfo", "object", "Messaging schedule. If not specified, it is sent immediately upon receipt of the request."
    "scheduleInfo/timeBegin", "string", "Start time, for example, «10:00»."
    "scheduleInfo/timeEnd", "string", "End time, for example, «21:00»."
    "scheduleInfo/weekdaysSchedule", "string", "Messaging days. Specified by numbers from 1 (Monday) to 7 (Sunday), for example, «12345». If there are no restrictions on days of the week, this parameter can be empty or not delivered in the request."
    "scheduleInfo/deadline", "string", "The end date of the messaging, for example, *2019-05-10T16:29:30+0300*."
    "**destAddr**", "string", "Subscriber's phone number. It contains the country code, operator code and phone number. For the Russian Federation, the code can be '8', '7' or '+7'. Examples: 72101234567, +72101234567, 8-210-123-45-67, 82101234567."
    "**message**", "object", "Parameters of a message being sent."
    "**message/type**", "enum", "Message type. The value of *VK* is transmitted."
    "**message/data**", "object", "Parameters of the data being sent."
    "**message/data/text**", "string", "Text of a message being sent. Number of characters: no more than 2000."
    "**message/data/serviceNumber**", "string", "Sender's name from which the message is being sent."
    "**message/data/ttl**", "integer", "Message lifetime. Acceptable range in seconds: from 60 to 86400. When ttl = 0 or the parameter is absent in the request, the value from the default settings is used, which is set during the integration setup separately for each client."
    "message/data/ttlUnit", "enum", "Unit of measurement of the message delivery period. It is transmitted only with *ttl*. Possible values are: SECONDS; MINUTES (by default); HOURS." 
    "registeredDelivery", "integer", "Requirement of delivery reports. Possible values are: 0 - statuses are not required; 1 - statuses are required (by default); 2 - only «Undelivered» status is required."
    "notifyUrl", "string", "Hostname of the incoming api to obtain the delivery report. When sending parameter you need to consider the following: if the parameter is specified, it cannot be empty. The notifyUrl string must be no more than 2048 characters long. If any of the specified conditions are not met, an error will be generated and the request will not be executed."
    "extraParam", "string", "Additional parameters passed as *param1=value1,param2=value2*, where *param1* and *param2* – parameter names, *value1* and *value2* – values. The comma character cannot be included in the parameter name, but it can be included in its value - in this case it must be doubled. Example: string place=абзаково,name=гостевой дом-2,coordinates=53.8085896,, 58.6362112,from=23.02.09,to=05.03.09."
    "cascadeChainLink", "object", "Cascading message parameters. See :doc:`eng_rest_cascade`."



Response to the Request 
----------------------------

After sending a message the Service Provider returns a response synchronously. In case of successful sending Service Provider returns HTTP-code 200 OK.

Successful sending
~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::

    .. tab:: Response example

      .. code-block:: json
         :linenos:

          {
              "mtNum": "7390612217"
              "id": "8770599"
          }


    .. tab:: Response parameters

      .. csv-table:: 
          :header: "Parameter", "Data type", "Description"
          :widths: 30, 15, 35
          :class: my-table

          "mtNum", "string", "Sending chain identifier assigned by the Service Provider platform."
          "id", "string", "Partner-side unique ID. Available, if it was included when sending."
          


Sending Errors 
~~~~~~~~~~~~~~~~~~~~

For results with errors, a response HTTP code will differ from 200 (see :ref:`eng-Коды-ошибок-отправки-VK`).

.. _eng-Коды-ошибок-отправки-VK:      

Error Codes  
~~~~~~~~~~~~~~~~~~~~~~~

.. csv-table:: 
   :header: "Code", "Description", "HTTP code"
   :widths: 7, 30, 15
   :class: my-table

   1, "Service is unavailable", "503"
   2, "Invalid IP-address", "403"
   3, "Too many connections", "429"
   4, "Invalid request", "400"
   5, "Invalid login", "401"
   6, "Invalid password", "401"
   7, "serviceNumber is not defined", "400"
   8, "destAddr is not correct", "406"
   9, "Message type is not correct", "406"
   10, "Prohibited sending duplicates", "409"
   11, "Invalid TTL", "406"
   100, "100", "500"



VK message Delivery Statuses
-------------------------------

To receive VK message statuses, you need to set up a :doc:`eng_rest_status`.
