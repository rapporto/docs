CardsMobile
==============

CardsMobile message type applies only to the “Wallet“ application.

In CardsMobile messages, it is possible to transmit a title, text, and optionally, an image.

  
Message Sending
-------------------------

.. tabs::

    .. tab:: Request example

        .. code-block:: json
           :linenos:

            {
               "login": "Login",
               "password": "Password",
               "destAddr": "79211234567",
               "message": {
                  "type": "CARDSMOBILE",
                  "data": {
                     "text": "Hello, world!",
                     "title": "Super Title!",
                     "serviceNumber": "0000",
                     "ttl": 3600,
                     "ttlUnit": "SECONDS",
                     "content": {
                     "contentUrl": "http://ya.ru/123.jpg"
                     },
                     "target": "campaign",
                     "campaignId": "123",
                     "pushType": "PROMO"
                  }
               }
            }


    .. tab:: Request parameters

         The **mandatory** parameters are highlighted **in bold**.

         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | Parameter                        | Data type        | Description                                                                    |
         +==================================+==================+================================================================================+
         | **login**                        | string           | Partner's name in the system.                                                  |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | **password**                     | string           | Partner's password in the system.                                              |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | extraParam                       | string           | | Additional parameters passed as *param1=value1,param2=value2*, where         |
         |                                  |                  |                                                                                |
         |                                  |                  | * *param1* and *param2* -- parameter names;                                    |
         |                                  |                  | * *value1* and *value2* -- values.                                             |
         |                                  |                  |                                                                                |
         |                                  |                  | | The comma character cannot be included in the parameter name, but it can be  |
         |                                  |                  |   included in its value -- in this case it must be doubled.                    |
         |                                  |                  | | Example: string place=абзаково,name=гостевой дом-2,coordinates=53.8085896,,  |
         |                                  |                  |   58.6362112,from=23.02.09,to=05.03.09.                                        |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | _`useTimeDiff`                   | boolean          | | Taking into account the time zone when starting messaging.                   |
         |                                  |                  | | If *true*, the message is sent to the subscriber according to the messaging  |
         |                                  |                  |   schedule and his time zone.                                                  |
         |                                  |                  | | If *false*, the message is sent according to the messaging initiator schedule|
         |                                  |                  |   UTC+3, regardless of the message recipient time zone.                        |
         |                                  |                  | | Default value: *false*.                                                      |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | _`scheduleInfo`                  | object           | | Messaging schedule. If not specified, it is sent immediately upon receipt    |
         |                                  |                  |   of the request.                                                              |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | scheduleInfo/timeBegin           | string           | Start time, for example, «10:00».                                              |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | scheduleInfo/timeEnd             | string           | End time, for example, «21:00».                                                |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | scheduleInfo/weekdaysSchedule    | string           | | Messaging days. Specified by numbers from 1 (Monday) to 7 (Sunday),          |
         |                                  |                  |   for example, «12345».                                                        |
         |                                  |                  | | If there are no restrictions on days of the week, this parameter can be empty|
         |                                  |                  |   or not delivered in the request.                                             |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | scheduleInfo/deadline            | string           | The end date of the messaging, for example, *2024-09-10T16:29:30+0300*.        |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | _`id`                            | string           | | Partner-side unique ID.                                                      |
         |                                  |                  |   This parameter is required to control re-sending and duplication.            |
         |                                  |                  |   The control service is enabled separately.                                   |
         |                                  |                  | | The Partner may recall the Service Provider (the request to send a message)  |
         |                                  |                  |   with the same ID several times. In this case the message will be sent to the |
         |                                  |                  |   subscriber only once (upon the first request).                               |
         |                                  |                  | | In response to requests, the Service Provider will return the same message   |
         |                                  |                  |   ID in the Service Provider's system to the Partner (the same as for the      |
         |                                  |                  |   first request).                                                              |
         |                                  |                  | | The Service Provider optionally returns this ID to the Partner, if available |
         |                                  |                  |   in the message delivery report.                                              |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | _`destAddr`                      | string           | | Subscriber's phone number. It contains the country code, operator code and   |
         |                                  |                  | | phone number. For the Russian Federation, the code can be '8', '7' or '+7'.  |
         |                                  |                  | | Examples: 72101234567, +72101234567, 8-210-123-45-67, 82101234567.           |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | **message**                      | object           | Parameters of a message being sent.                                            |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | **message/type**                 | enum             | Message type. The value of *CARDSMOBILE* is transmitted.                       |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | **message/data**                 | object           | Parameters of the data being sent.                                             |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | *message/data/ttl*               | integer          | | Message lifetime. Acceptable range in seconds: from 30 to 86400.             |
         |                                  |                  | | Notes. If *ttl = 0* or if there are no parameter in the request the value is |
         |                                  |                  |   taken from the default settings set when configuring the integration for     |
         |                                  |                  |   each client individually.                                                    |
         |                                  |                  | | If *ttl* is not specified in these places, the system will reject the request|
         |                                  |                  |   and will display the error.                                                  |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | message/data/ttlUnit             | enum             | | Unit of measurement of the message delivery period. It is transmitted only   |
         |                                  |                  |   with *ttl*.                                                                  |
         |                                  |                  | | Possible values are:                                                         |
         |                                  |                  |                                                                                |
         |                                  |                  | * SECONDS;                                                                     |
         |                                  |                  | * MINUTES;                                                                     |
         |                                  |                  | * HOURS.                                                                       |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | **message/data/serviceNumber**   | string           | | The service name from which the message is being sent.                       |
         |                                  |                  | | This parameter is optional for messages with the CardsMobile type.           |
         |                                  |                  | | If this parameter is not sent in the request, the value is taken from the    |
         |                                  |                  |   integration settings.                                                        |
         |                                  |                  | | Also, if there is no value for this parameter in the settings, the service   |
         |                                  |                  |   name “CARDSMOBILE“ will be used.                                             |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | **message/data/text**            | string           | The text of the message being sent. Number of characters is no more than 150.  |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | **message/data/title**           | string           | The header for the text message. Number of characters is no more than 50.      |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | message/data/target              | enum             | | A text constant for the CardsMobile messages.                                |
         |                                  |                  | | Defines the screen of the application to which the transition should be made |
         |                                  |                  |   when clicking on the message.                                                |
         |                                  |                  | | Possible values are:                                                         |
         |                                  |                  |                                                                                |
         |                                  |                  | - card — to the screen of the issued card;                                     |
         |                                  |                  | - campaign — to the screen of a specific promotion on the issued card;         |
         |                                  |                  | - campaigns — to the full list of promotions on the issued card.               |
         |                                  |                  |                                                                                |
         |                                  |                  | Default value: *card*.                                                         |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | *message/data/campaignId*        | string           | | The text identifier of the promotion for the transition.                     |
         |                                  |                  | | If *target=campaign* this parameter is mandatory.                            |
         |                                  |                  | | The promotion ID is indicated in the partner's system or in the partner's    |
         |                                  |                  |   Personal Account in the «Wallet for Business».                               |
         |                                  |                  | | Number of characters is no more than 128.                                    |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | message/data/pushType            | enum             | | A text constant for CardsMobile messages.                                    |
         |                                  |                  | | It determines the traffic type assigned to the message by the partner.       |
         |                                  |                  | | Possible values are:                                                         |
         |                                  |                  |                                                                                |
         |                                  |                  | * PROMO – advertising traffic;                                                 |
         |                                  |                  | * SERVICE – service traffic;                                                   |
         |                                  |                  | * TRANSACTION – transactional traffic.                                         |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | message/data/content             | object           | Parameters for sending images.                                                 |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | message/data/content/            | enum             | | Content category by the contentUrl link.                                     |
         | contentCategory                  |                  | | Possible value is: *IMAGE* – to send link to image in the *contentUrl*.      |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | message/data/content/contentUrl  | string           | | The URL of the image. The maximum length of links is 512 characters.         |
         |                                  |                  | | Image requirements:                                                          |
         |                                  |                  |                                                                                |
         |                                  |                  | * image formats are JPEG, PNG;                                                 |
         |                                  |                  | * image extension is no more than 1024х512 pixels.                             |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | registeredDelivery               | integer          | | The need for delivery reports.                                               |
         |                                  |                  | | Possible values are:                                                         |
         |                                  |                  |                                                                                |
         |                                  |                  | * 0 - statuses are not required;                                               |
         |                                  |                  | * 1 - statuses are required (by default);                                      |
         |                                  |                  | * 2 - only «Undelivered» status is required.                                   |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+
         | notifyUrl                        | string           | | Hostname of the incoming API to recieve the delivery report (see             |
         |                                  |                  |   :doc:`eng_rest_status`).                                                     |
         |                                  |                  | | This parameter is optional in the request, but if sent you should            |
         |                                  |                  |   consider the following:                                                      |
         |                                  |                  |                                                                                |
         |                                  |                  | * if the parameter is specified, it cannot be empty;                           |
         |                                  |                  | * the *notifyUrl* string must be no more than 2048 characters long.            |
         |                                  |                  |                                                                                |
         |                                  |                  | | If any of the specified conditions are not met, an error will be generated   |
         |                                  |                  |   and the request will not be executed.                                        |
         +----------------------------------+------------------+--------------------------------------------------------------------------------+


Response to the Request 
--------------------------

After sending a message, the Service Provider returns a response synchronously. In case of successful sending, the Service Provider returns `200 OK` HTTP code.

Response upon Successful Sending
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

          "mtNum", "string", "Sending chain ID assigned by the Service Provider platform."
          "id", "string", "Partner-side unique ID. Available, if it was included when sending."
          


Sending Errors  
~~~~~~~~~~~~~~~~~~~~~~~

For results with errors, a response HTTP code will differ from 200 (see :ref:`eng-Коды-ошибок-отправки-CardsMobile`).

.. tabs::

   .. tab:: Response example with error

      .. code-block:: json   
           :linenos:

            { 
                "error": { 
                   "code": 1, 
                   "description": "Service is unavailable" 
                }
            }



   .. tab:: Response parameters

      .. csv-table:: 
        :header: "Parameter", "Data type", "Description"
        :widths: 30, 15, 35
        :class: my-table

        "error", "object", "Error information."
        "error/code", "int", "Error code."
        "error/description", "string", "A brief description of the error."
        "extendedDescription", "string", "Detailed description of the error (optional)."


.. _eng-Коды-ошибок-отправки-CardsMobile:

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
        



CardsMobile Delivery Statuses
-----------------------------------------

To receive CardsMobile message statuses, you need to set up a :doc:`eng_rest_status`.
