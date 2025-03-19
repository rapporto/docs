SMS
====

Request to Send SMS 
-------------------------

Request Examples
~~~~~~~~~~~~~~~~~

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
              "destAddr":"Subscriber's_Number",
              "message":{
                "type":"SMS",
                "data":{
                  "text":"Текст. Follow link: <http://verylongurl.com/very/long/url>",
                  "serviceNumber":"SENDER'S_NAME",
                  "ttl":10
                }
              }
            }           

    .. tab:: Example of extended request

        .. code-block:: json
           :linenos:
           :emphasize-lines: 5,7-11 

            {
              "login":"YOUR_LOGIN",
              "password":"YOUR_PASSWORD",
              "useTimeDiff":true,
              "id":"8770630",
              "shortenLinks":false,
              "registeredDelivery":"1",
              "notifyUrl":"URL_for_sending_statuses"
              "scheduleInfo":{
                "timeBegin":"10:00",
                "timeEnd":"12:00",
                "weekdaysSchedule":"123"
              },
              "destAddr":"Subscriber's_Number",
              "message":{
                "type":"SMS",
                "data":{
                  "text":"Текст. Follow link: <http://verylongurl.com/very/long/url>",
                  "serviceNumber":"SENDER'S_NAME",
                  "ttl":10
                }
              }
            }           



.. _eng-Rest-SMS-параметры-запроса:

Parameters
~~~~~~~~~~~~~

The **mandatory** parameters are highlighted **in bold**.

.. csv-table:: 
    :header: "Parameter", "Data type", "Description"
    :widths: 20, 15, 45
    :class: my-table

    "**login**", "string", "Partner's name in the system."
    "**password**", "string", "Partner's password in the system."
    "useTimeDiff", "boolean", "Taking into account the time zone when starting messaging. If *true*, the message is sent to the subscriber according to the messaging schedule and his time zone. If *false*, the message is sent according to the messaging initiator schedule UTC+3, regardless of the message recipient time zone. Default value: *false*."
    "id", "string", "Unique identifier on the Partner's side. This parameter is necessary for controlling repeated submissions and duplication (the control service is activated separately). The Partner can call the Service Provider (request to send a message) multiple times with the same ID. In this case, the message will be sent to the subscriber only once (on the first request). In response to the requests, the Service Provider will return the same message identifier in the Service Provider's system to the Partner (the same as for the first request). The Service Provider optionally returns this identifier to the Partner in the message delivery report if it is available."
    "shortenLinks", "boolean", "The parameter controls the automatic shortening of long links in the message. Possible values are *true* (to shorten links, default value) and *false* (no link shortening required). If the parameter is not included in the request, but the service is available to the Partner, links will be shortened by default. The ability to use this service is discussed and configured in advance by the Service Provider. For more details: :doc:`eng_rest_short_link`."
    "scheduleInfo", "object", "Messaging schedule. If not specified, it is sent immediately upon receipt of the request."
    "scheduleInfo/timeBegin", "string", "Start time, for example, «10:00»."
    "scheduleInfo/timeEnd", "string", "End time, for example, «21:00»."
    "scheduleInfo/weekdaysSchedule", "string", "Messaging days. Specified by numbers from 1 (Monday) to 7 (Sunday), for example, «12345». If there are no restrictions on days of the week, this parameter can be empty or not delivered in the request."
    "scheduleInfo/deadline", "string", "The end date of the messaging, for example, *2024-05-10T16:29:30+0300*."
    "**destAddr**", "string", "Subscriber's phone number. It contains the country code, operator code and phone number. For the Russian Federation, the code can be '8', '7' or '+7'. Examples: 72101234567, +72101234567, 8-210-123-45-67, 82101234567."
    "**message**", "object", "Parameters of a message being sent."
    "**message/type**", "enum", "Message type. The value of *SMS* is transmitted."
    "**message/data**", "object", "Parameters of the data being sent."
    "**message/data/text**", "string", "The text of the message being sent. Character limit: no more than 2000."
    "message/data/serviceNumber", "string", "Sender's name from which the message is being sent."
    "message/data/ttl", "integer", "Message lifetime. Acceptable range in minutes: from 1 to 2880. When ttl = 0 or the parameter is absent in the request, the value from the default settings is used, which is set during the integration setup separately for each client."
    "message/data/ttlUnit", "enum", "Unit of measurement of the message delivery period. It is transmitted only with *ttl*. Possible values are: SECONDS; MINUTES (by default); HOURS." 
    "registeredDelivery", "integer", "Requirement of delivery reports. Possible values are: 0 - statuses are not required; 1 - statuses are required (by default); 2 - only «Undelivered» status is required."
    "notifyUrl", "string", "Hostname of the incoming API to receive the delivery report. This parameter is optional in the request, but if sent you should consider the following: if the parameter is specified, it cannot be empty. The notifyUrl string must be no more than 2048 characters long. If any of the specified conditions are not met, an error will be generated and the request will not be executed."
    "extraParam", "string", "Additional parameters passed as *param1=value1,param2=value2*, where *param1* and *param2* – parameter names, *value1* and *value2* – values. The comma character cannot be included in the parameter name, but it can be included in its value - in this case it must be doubled. Example: the string place=abzakovo,name=guest house-2,coordinates=53.8085896,, 58.6362112,from=23.02.09,to=05.03.09."
    "cascadeChainLink", "object", "Cascading message parameters. See :doc:`eng_rest_cascade`."




Response 
--------------

After sending the message, the Service Provider synchronously returns a response. In case of a successful submission, HTTP code 200 OK is returned.

Successful SMS Sending
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

          "mtNum", "string", "Identifier of the sending chain assigned by the Service Provider platform."
          "id", "string", "Unique identifier on the Partner's side. It is present if it was provided when sending."
          


SMS sending Errors 
~~~~~~~~~~~~~~~~~~~~~~~~~~

For error responses, the HTTP response code will be different from 200 (see :ref:`eng-Коды-ошибок-отправки-SMS`).

.. tabs::

   .. tab:: Response example

       .. code-block:: json   
          :linenos:

            {
                "error": {
                    "code": 9,
                    "description": "Message type is not correct"
                },
                "extendedDescription": "SMS sending is not allowed for *user*."
            }

   .. tab:: Response parameters

      .. csv-table:: 
        :header: "Parameter", "Data type", "Description"
        :widths: 30, 15, 35
        :class: my-table

        "error", "object", "Error information."
        "error/code", "int", "Error code."
        "error/description", "string", "A brief description of the error."
        "extendedDescription", "string", "Detailed description of the error (optional parameter)."


.. _eng-Коды-ошибок-отправки-SMS:          

Error Codes  
~~~~~~~~~~~~~~~~~~~~~~~

.. csv-table:: 
   :header: "Code", "Description", "HTTP-code"
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


SMS Delivery Statuses
-------------------------------

To receive SMS message statuses, you need to set up a :doc:`eng_rest_status`.

.. warning:: 

    For SMS messages sent to subscribers of the Megafon operator, from the 01.03.2023 the transmission of the "Delivered" and "Undelivered" statuses is stopped.
