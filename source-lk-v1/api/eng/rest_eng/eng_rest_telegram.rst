Telegram
==========

The following types of Telegram messages are supported:

*  text only;
*  text + link to follow.

Request to Send Telegram Messages
----------------------------------------------

Request Examples 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

   <p style="line-height: 24px;">To generate a test request with your parameters please 
       <a href="https://doc.rapporto.ru/generator/" target="_blank" class="button">
           <img src="../../../_static/link-external-01.svg" class="bttn-icon" alt="Внешняя ссылка"> open the request generator
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

   .. tab:: Text

      .. code-block:: json
         :linenos:
         :emphasize-lines: 5,7-11

         {
            "login": "Login",
            "password": "Password",
            "useTimeDiff": true,
            "id": "superId",
            "scheduleInfo": 
            {
               "timeBegin": "10:00",
               "timeEnd": "12:00",
               "weekdaysSchedule": "123"
            },
            "destAddr": "79211234567",
            "message": 
            {
               "type": "TELEGRAM",
               "data": 
               {
                  "text": "Hello, world!",
                  "serviceNumber": "0000",
                  "ttl": 3600,
                  "ttlUnit": "SECONDS"
               }
            }
         }
         



   .. tab:: Text + link

       .. code-block:: json
          :linenos:

            {
               "login": "Login",
               "password": "Password",
               "useTimeDiff": true,
               "id": "superId",
               "scheduleInfo": 
               {
                  "timeBegin": "10:00",
                  "timeEnd": "12:00",
                  "weekdaysSchedule": "123"
               },
               "destAddr": "79211234567",
               "message": 
               {
                  "type": "TELEGRAM",
                  "data": 
                  {
                     "text": "Hello, world!",
                     "link": "https://docs.rapporto.ru/",
                     "serviceNumber": "0000",
                     "ttl": 3600,
                     "ttlUnit": "SECONDS"
                  }
               }
            }


  

Parameters
~~~~~~~~~~~~~~

The **mandatory** parameters are highlighted **in bold**.


.. csv-table::
      :header: "Parameter", "Data type", "Description"
      :widths: 30, 15, 35
      :class: my-table

         "**login**", "string", "Partner's name."
         "**password**", "string", "Partner's password for sending messages."
         "useTimeDiff", "boolean", "Taking into account the time zone when starting messaging. If *true*, the message is sent to the subscriber according to the messaging schedule and his time zone. If *false*, the message is sent according to the messaging initiator schedule UTC+3 regardless of the message recipient time zone. Default value: *false*."
         "id", "string", "Unique identifier on the Partner's side. This parameter is necessary for controlling repeated submissions and duplication (the control service is activated separately). The Partner can call the Service Provider (request to send a message) multiple times with the same ID. In this case, the message will be sent to the subscriber only once (on the first request). In response to the requests, the Service Provider will return the same message identifier in the Service Provider's system to the Partner (the same as for the first request). The Service Provider optionally returns this identifier to the Partner in the message delivery report if it is available."
         "scheduleInfo", "object", "Messaging schedule. If not specified, it is sent immediately upon receipt of the request."
         "scheduleInfo/timeBegin", "string", "Start time, for example, «10:00»."
         "scheduleInfo/timeEnd", "string", "End time, for example, «21:00»."
         "scheduleInfo/weekdaysSchedule", "string", "Messaging days. Specified by numbers from 1 (Monday) to 7 (Sunday), for example, «12345». If there are no restrictions on days of the week, this parameter can be empty or not delivered in the request."
         "scheduleInfo/deadline", "string", "The end date of the messaging, for example, *2024-05-10T16:29:30+0300*."
         "**destAddr**", "string", "Subscriber's phone number. It contains the country code, operator code and phone number. For the Russian Federation, the code can be '8', '7' or '+7'. Examples: 72101234567, +72101234567, 8-210-123-45-67, 82101234567."
         "**message**", "object", "Parameters of a message being sent."
         "**message/type**", "enum", "Message type. The value of *TELEGRAM* is transmitted."
         "**message/data**", "object", "Parameters of the data being sent. To send only text, specify the *text* attribute. To send text and link specify the *text* and *link* attributes."
         "**message/data/text**", "string", "Message text. Character limit: no more than 1000. The text of the message can be in Cyrillic or Latin, and contain emojis."
         "message/data/link", "string", "Random URL, passed in the text of a Telegram message. Character limit: no more than 256. If the link length exceeds the specified value, the message will be rejected with an error. Error text: 'The value limit of link parameter is exceeded in the message'."
         "message/data/serviceNumber", "string", "Sender's name from which the message is being sent."
         "message/data/ttl", "integer", "Message lifetime. Acceptable range in seconds: from 30 to 86400. When ttl = 0 or the parameter is absent in the request, the value from the default settings is used, which is set during the integration setup separately for each client."
         "message/data/ttlUnit", "enum", "Unit of measurement of the message delivery period. It is transmitted only with *ttl*. Possible values are: SECONDS; MINUTES (by default); HOURS."
         "extraParam", "string", "Additional parameters passed as *param1=value1,param2=value2*, where *param1* and *param2* – parameter names, *value1* and *value2* – values. The comma character cannot be included in the parameter name, but it can be included in its value. In this case it must be doubled. Example: the string place=abzakovo,name=guest house-2,coordinates=53.8085896,, 58.6362112,from=23.02.09,to=05.03.09."
         "registeredDelivery", "integer", "Requirement of delivery reports. Possible values are: 0 - statuses are not required; 1 - statuses are required (by default); 2 - only «Undelivered» status is required."
         "notifyUrl", "string", "Hostname of the incoming API to obtain the delivery report. This parameter is optional in the request, but when sending you need to consider the following: if the parameter is specified, it cannot be empty. The notifyUrl string must be no more 2048 characters. If any of the specified conditions are not met, an error will be generated and the request will not be executed."
         "cascadeChainLink", "object", "Cascading message parameters. See :doc:`eng_rest_cascade`."


Response 
--------------------

After sending a message the Service Provider returns a response synchronously. In case of successful sending Service Provider returns HTTP-code 200 OK.

Successful Telegram Sending
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
        


Telegram Sending Errors
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For results with errors, a response HTTP code will differ from 200 (см. :ref:`eng-Коды-ошибок-отправки-Telegram`).

.. tabs::

    .. tab:: Response example

       .. code-block:: json
          :linenos:

           {
               "error": {
                   "code": 4,
                   "description": "Invalid request"
               },
               "extendedDescription": "Telegram message is absent"
           }

       In this example, there is no text in the Telegram message, but only a link is transmitted, which is an error.


    .. tab:: Response parameters

      .. csv-table:: 
        :header: "Parameter", "Data type", "Description"
        :widths: 30, 15, 35
        :class: my-table

        "error", "object", "Error information."
        "error/code", "int", "Error code."
        "error/description", "string", "A brief description of the error."
        "extendedDescription", "string", "Detailed description of the error (optional parameter)."


.. _eng-Коды-ошибок-отправки-Telegram:      

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



Telegram Delivery Statuses
--------------------------------------

To receive Telegram message statuses, you need to set up a :doc:`eng_rest_status`.

Request Example
~~~~~~~~~~~~~~~~~~

Description of parameters is given in the paragraph :ref:`eng-REST-Статус-параметры`.


.. code-block:: json
   :linenos:

      {
         "mtNum": "107930572",
         "status": 9,
         "type": "TELEGRAM",
         "doneDate": "2024-05-05T10:20:35+0300",
         "submitDate": "2024-05-05T10:19:55+0300",
         "sourceAddr": "TG_NAME",
         "destAddr": "72101234567",
         "text": "Hello!",
         "partCount": "001",
         "errorCode": "0",
         "mccMnc": "25012",
         "trafficType": 0
      }


Event Notification
~~~~~~~~~~~~~~~~~~~

Additional parameters are intended for transmitting accurate statistics in Telegram messages.

.. tabs::

    .. tab:: Request example

      .. code-block:: json
         :linenos:
         :emphasize-lines: 14-17

          {
               "mtNum": "107930572",
               "status": 9,
               "type": "TELEGRAM",
               "doneDate": "2024-05-05T10:20:35+0300",
               "submitDate": "2024-05-05T10:19:55+0300",
               "sourceAddr": "TG_NAME",
               "destAddr": "72101234567",
               "text": "Hello!",
               "partCount": "001",
               "errorCode": "0",
               "mccMnc": "25012",
               "trafficType": 0,
               "eventType": "view",
               "eventDate": "2024-05-05T10:30:35+0300",
               "viewsCount": 2,
               "clicksCount": 0
          }



    .. tab:: Description of the parameters 

         All parameters are **mandatory** in the event notification.

         +---------------------------+-------------------------+----------------------------------------------------------------------------------+
         | Parameter                 | Type                    | Description                                                                      |
         +===========================+=========================+==================================================================================+
         | **eventType**             | string                  | | Event type.                                                                    |
         |                           |                         | | Possible values are:                                                           |
         |                           |                         |                                                                                  |
         |                           |                         | * view — display notification;                                                   |
         |                           |                         | * click — clicking notification;                                                 |
         |                           |                         | * subscribe — subscription notification.                                         |
         +---------------------------+-------------------------+----------------------------------------------------------------------------------+
         | **eventDate**             | string                  | Date and time of the event in “YYYY-MM-DDThh:mm:ss+TMZN” format.                 |
         +---------------------------+-------------------------+----------------------------------------------------------------------------------+
         | **viewsCount**            | integer                 | The total number of displays for the message, including the current display.     |
         +---------------------------+-------------------------+----------------------------------------------------------------------------------+
         | **clicksCount**           | integer                 | The total number of clicking for the message, including the current click.       |
         +---------------------------+-------------------------+----------------------------------------------------------------------------------+

