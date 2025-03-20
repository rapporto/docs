Viber
==========

The following Viber messages are supported:

*  text only;
*  image only;
*  text + button to follow the link;
*  text + image + button to follow the link.

Request to Send Viber Messages 
-------------------------------

Request Examples
~~~~~~~~~~~~~~~~~

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
         :emphasize-lines: 20-24

         {
            "login":"YOUR_LOGIN",
            "password":"YOUR_PASSWORD",
            "useTimeDiff":false,
            "id":"8770100",
            "scheduleInfo":
            {
               "timeBegin":"10:00",
               "timeEnd":"20:00",
               "weekdaysSchedule":"12345"
            },
            "destAddr":"Subscriber's_Number",
            "message":
            {
               "type":"VIBER",
               "data":
               {
                  "instantContent":
                  {
                     "type":"TEXT",
                     "data":
                     {
                        "text":"VIBERMESS"
                     }
                  },
                  "serviceNumber":"SENDER'S_NAME",
                  "ttl":1
               }
            }
         }


   .. tab:: Image

      .. code-block:: json
         :linenos:
         :emphasize-lines: 19-23

         {
            "login":"YOUR_LOGIN",
            "password":"YOUR_PASSWORD",
            "id":"8770100",
            "scheduleInfo":
            {
               "timeBegin":"10:00",
               "timeEnd":"20:00",
               "weekdaysSchedule":"12345"
            },
            "destAddr":"Subscriber's_Number",
            "message":
            {
               "type":"VIBER",
               "data":
               {
                  "instantContent":
                  {
                     "type":"IMAGE_URL",
                     "data":
                     {
                        "imageURL":"https://example.ru/image"
                     }
                  },
                  "serviceNumber":"SENDER'S_NAME",
                  "ttl":1
               }
            }
         }

   .. tab:: Text + image + button

      .. code-block:: json
         :linenos:
         :emphasize-lines: 20-27

         {
            "login":"YOUR_LOGIN",
            "password":"YOUR_PASSWORD",
            "useTimeDiff":false,
            "id":"8770100",
            "scheduleInfo":
            {
               "timeBegin":"10:00",
               "timeEnd":"20:00",
               "weekdaysSchedule":"12345"
            },
            "destAddr":"Subscriber's_Number",
            "message":
            {
               "type":"VIBER",
               "data":
               {
                  "instantContent":
                  {
                     "type":"BUTTON",
                     "data":
                     {
                        "text":"VIBERMESS",
                        "imageURL":"https://example.ru/image",
                        "caption":"GO_TO",
                        "action":"https:// example.ru/image"
                     }
                  },
                  "serviceNumber":"SENDER'S_NAME",
                  "ttl":1
               }
            }
         }
           

.. _eng-Rest-Viber-параметры-запроса:



Parameters
~~~~~~~~~~~~~

The **mandatory** parameters are highlighted **in bold**.

.. csv-table::
      :header: "Parameter", "Data type", "Description"
      :widths: 30, 15, 35
      :class: my-table

         "**login**", "string", "Partner's name."
         "**password**", "string", "Partner's password for sending messages."
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
         "**message/type**", "enum", "Message type. The value of *VIBER* is transmitted."
         "**message/data**", "object", "Parameters of the data being sent."
         "**message/data/instantContent**", "object", "Parameters of the Viber message being sent (images, buttons)."
         "**instantContent/type**", "enum", "Type of a message parameter. Possible values are: TEXT (to transmit text only), IMAGE_URL (image only), BUTTON (text of the message, the URL of the image, the button name and the URL to follow by clicking on the button, see *instantContent/data*). **Important!** For business accounts that support the functionality of Viber sessions, messages with the type TEXT or IMAGE_URL. Messages with a different type return a 400 «Invalid request» error."
         "**instantContent/data**", "object", "Parameters of the data being sent when selecting the BUTTON value in *instantContent/type*. Possible values are: text (message text), imageURL (URL of the image), caption (button name), action (URL to follow by clicking on the button)."
         "**instantContent/data/text**", "string", "Message text. Character limit: 1000."
         "**instantContent/data/imageURL**", "string", ":term:`URL` of an image to be transmitted. 400x400px image with JPG or PNG extension is recommended to be used."
         "**instantContent/data/caption**", "string", "Button text in Viber message. Character limit: 30."
         "**instantContent/data/action**", "string", "Button link in Viber message. Character limit: 2048. URL for the link shall begin with 'http://' 'https://' 'viber://' 'mailto:' 'tel:'."
         "message/data/serviceNumber", "string", "Sender's name from which the message is being sent."
         "message/data/ttl", "integer", "Message lifetime. Acceptable range in seconds: from 30 to 86400. When ttl = 0 or the parameter is absent in the request, the value from the default settings is used, which is set during the integration setup separately for each client."
         "message/data/ttlUnit", "enum", "Unit of measurement of the message delivery period. It is transmitted with *ttl* only. Possible values are: SECONDS; MINUTES (by default); HOURS."
         "extraParam", "string", "Additional parameters passed as *param1=value1,param2=value2*, where *param1* and *param2* – parameter names, *value1* and *value2* – values. The comma character cannot be included in the parameter name, but it can be included in its value - in this case it must be doubled. Example: the string place=abzakovo,name=guest house-2,coordinates=53.8085896,, 58.6362112,from=23.02.09,to=05.03.09."
         "registeredDelivery", "integer", "Requirement of delivery reports. Possible values are: 0 - statuses are not required; 1 - statuses are required (by default); 2 - only «Undelivered» status is required."
         "notifyUrl", "string", "Hostname of the incoming API to obtain the delivery report. This parameter is optional in the request, but when sending you need to consider the following: if the parameter is specified, it cannot be empty. The notifyUrl string must be no more than 2048 characters long. If any of the specified conditions are not met, an error will be generated and the request will not be executed."
         "cascadeChainLink", "object", "Cascading message parameters. See :doc:`eng_rest_cascade`."



Response 
---------------

After sending the message, the Service Provider synchronously returns a response. In case of a successful submission, HTTP code 200 OK is returned.


Successful Viber Sending
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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



Viber Sending Errors 
~~~~~~~~~~~~~~~~~~~~~~~~~~

For error responses, the HTTP response code will be different from 200 (see :ref:`eng-Коды-ошибок-отправки-Viber`).

.. tabs::

    .. tab:: Response example


       .. code-block:: json
         :linenos:
         
           { 
               "error": { 
                  "code": 4, 
                  "description": "Invalid request" 
               }, 
               "extendedDescription": "Capture is absent or length longer 30 characters" 
            }
        
       In this example *capture* parameter is missing in the BUTTON type of a Viber message or its length exceeds 30 characters.


    .. tab:: Response parameters

      .. csv-table:: 
        :header: "Parameter", "Data type", "Description"
        :widths: 30, 15, 35
        :class: my-table

        "error", "object", "Error information."
        "error/code", "int", "Error code."
        "error/description", "string", "A brief description of the error."
        "extendedDescription", "string", "Detailed description of the error (optional parameter)."

  
.. _eng-Коды-ошибок-отправки-Viber:      

Error Codes  
~~~~~~~~~~~~~~~~~~

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


Viber Delivery Statuses
-----------------------------------

To receive Viber message statuses, you need to set up a :doc:`eng_rest_status`.


Viber Session
===============

| Viber session is a feature that allows the Partner to communicate with subscribers within specific time frames for a fixed price per session.
| The reason for the inquiry can be anything: a question, a message about a problem, a booking confirmation, or a delivery status check – the user will receive a response in real time. 

.. note:: The functionality of Viber sessions is not available by default. To enable it, you should contact your account manager.


Viber Session Setup
-------------------------------

| Using sessions implies the presence of a special Viber business account.
| You can create a new Viber business account with the sessions functionality enabled.
| If you already have a valid business account and would like to enable sessions, please, contact your account manager.

.. important:: For business accounts that support the Viber sessions messages with the type “text only“ or “image only“ are available (the InstantContent.type parameter must be either “TEXT“ or “IMAGE_URL“).


Features of the Sessions
--------------------------

Start of the session:

* only subscriber can initiate a session;
* the session starts when the subscriber sends the first message to the Partner;
* the session cannot be initiated by an image;
* if only one sender is present in the correspondence (it doesn’t matter whether it’s a subscriber or a Partner), this is not considered a session, messages will be charged in the usual way.

Session limits:

* session duration is 24 hours by default;
* the Partner can send up to 60 messages (a new session starts automatically after exceeding this limit);
* the Partner can send up to 10 messages without a subscriber’s response (the session is automatically closed after exceeding this limit);
* the Partner can send messages with the type “text“ or “image“ only.

The session ends in the following cases:

* after 24 hours;
* after reaching the limit of 60 messages (a new session starts automatically);
* after reaching the limit of 10 unanswered messages from the Partner.


Billing for Viber Sessions
----------------------------

| A subscription fee is charged for using the session functionality. Please check the session size with the account manager when creating a business account.
| All sessions are paid for a fixed (identical) price. Messages within sessions are not charged.
| Messages outside the session are charged as usual.