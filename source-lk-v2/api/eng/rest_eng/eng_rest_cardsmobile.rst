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

         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | Parameter             | Required | Data type   | Description                                                                     |
         +=======================+==========+=============+=================================================================================+
         | login                 | yes      | string      | Partner's name in the system.                                                   |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | password              | yes      | string      | Partner's password in the system.                                               |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | extraParam            | no       | string      | Additional parameters passed as ``param1=value1,param2=value2``, where          |
         |                       |          |             |                                                                                 |
         |                       |          |             | * ``param1`` and ``param2`` -- parameter names;                                 |
         |                       |          |             | * ``value1`` and ``value2``-- values.                                           |
         |                       |          |             |                                                                                 |
         |                       |          |             | .. raw:: html                                                                   |
         |                       |          |             |                                                                                 |
         |                       |          |             |     <details>                                                                   |
         |                       |          |             |         <summary>More details</summary>                                         |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |            The comma character cannot be included in the parameter name,        |
         |                       |          |             |            but it can be included in its value — in this case it must be doubled|
         |                       |          |             |            Example: the string                                                  | 
         |                       |          |             |            <code>place=abzakovo,name=guest house-2,coordinates=53.8085896,,     |
         |                       |          |             |            58.6362112,from=23.02.09,to=05.03.09</code>.                         |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |     </details>                                                                  |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | useTimeDiff           | no       | boolean     | Taking into account the time zone when starting messaging.                      |
         |                       |          |             |                                                                                 |
         |                       |          |             | .. raw:: html                                                                   |
         |                       |          |             |                                                                                 |
         |                       |          |             |     <details>                                                                   |
         |                       |          |             |         <summary>More details</summary>                                         |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |             If <code>true</code>, the message is sent to the subscriber         |
         |                       |          |             |             according to the messaging schedule and his time zone.              |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |             If <code>false</code>, the message is sent according to the         |
         |                       |          |             |             messaging initiator schedule UTC+3, regardless of the message       |
         |                       |          |             |             recipient time zone.                                                |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |             Default value: <code>false</code>.                                  |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |     </details>                                                                  |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | scheduleInfo          | no       | object      | Messaging schedule.                                                             |
         |                       |          |             |                                                                                 |                              
         |                       |          |             | .. raw:: html                                                                   |
         |                       |          |             |                                                                                 |
         |                       |          |             |     <details>                                                                   |
         |                       |          |             |         <summary>More details</summary>                                         |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |             If not specified, it is sent immediately upon receipt               |
         |                       |          |             |             of the request.                                                     |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |     </details>                                                                  |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | | scheduleInfo/       | no       | string      | Start time.                                                                     |
         | | timeBegin           |          |             |                                                                                 |                              
         |                       |          |             | .. raw:: html                                                                   |
         |                       |          |             |                                                                                 |
         |                       |          |             |     <details>                                                                   |
         |                       |          |             |         <summary>More details</summary>                                         |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |             Example <code>10:00</code>.                                         |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |     </details>                                                                  |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | | scheduleInfo/       | no       | string      | End time.                                                                       |
         | | timeEnd             |          |             |                                                                                 |                              
         |                       |          |             | .. raw:: html                                                                   |
         |                       |          |             |                                                                                 |
         |                       |          |             |     <details>                                                                   |
         |                       |          |             |         <summary>More details</summary>                                         |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |             Example <code>21:00</code>.                                         |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |     </details>                                                                  |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | | scheduleInfo/       | no       | string      | Messaging days.                                                                 |
         | | weekdaysSchedule    |          |             |                                                                                 |
         |                       |          |             | .. raw:: html                                                                   |
         |                       |          |             |                                                                                 |
         |                       |          |             |     <details>                                                                   |
         |                       |          |             |         <summary>More details</summary>                                         |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |              Specified by numbers from <code>1</code> (Monday) to               |
         |                       |          |             |              <code>7</code> (Sunday), for example, <code>12345</code>.          |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |              If there are no restrictions on days of the week, this parameter   |
         |                       |          |             |              can be empty or not delivered in the request.                      |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |     </details>                                                                  |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+  
         | | scheduleInfo/       | no       | string      | End date of the messaging.                                                      |
         | | deadline            |          |             |                                                                                 |
         |                       |          |             | .. raw:: html                                                                   |
         |                       |          |             |                                                                                 |
         |                       |          |             |     <details>                                                                   |
         |                       |          |             |         <summary>More details</summary>                                         |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |              Example: <code>2024-09-10T16:29:30+0300</code>.                    |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |     </details>                                                                  |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | id                    | no       | string      | Partner-side unique ID.                                                         |
         |                       |          |             |                                                                                 |
         |                       |          |             | .. raw:: html                                                                   |
         |                       |          |             |                                                                                 |
         |                       |          |             |     <details>                                                                   |
         |                       |          |             |         <summary>More details</summary>                                         |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |             This parameter is required to control re-sending and duplication.   |
         |                       |          |             |             The control service is enabled separately. The Partner may recall   |
         |                       |          |             |             the Service Provider (the request to send a message) with the same  |
         |                       |          |             |             ID several times.                                                   |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |             In this case the message will be sent to the subscriber only once   |                                                                  
         |                       |          |             |             (upon the first request).                                           |
         |                       |          |             |             In response to requests, the Service Provider will return the       |
         |                       |          |             |             same message ID in the Service Provider’s system to the Partner     |
         |                       |          |             |             (the same as for the first request).                                |
         |                       |          |             |             The Service Provider optionally returns this ID to the Partner,     |
         |                       |          |             |             if available in the message delivery report.                        |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |     </details>                                                                  |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | destAddr              | no       | string      | Subscriber's phone number.                                                      |
         |                       |          |             |                                                                                 |
         |                       |          |             | .. raw:: html                                                                   |
         |                       |          |             |                                                                                 |
         |                       |          |             |     <details>                                                                   |
         |                       |          |             |         <summary>More details</summary>                                         |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |            It contains the country code, operator code and phone number.        |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |            For the Russian Federation, the code can be <code>8</code>,          |
         |                       |          |             |            <code>7</code> or <code>+7</code>.                                   |  
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |            Examples: <code>72101234567</code>,                                  |
         |                       |          |             |            <code>+72101234567</code>, <code>8-210-123-45-67</code>,             |
         |                       |          |             |            <code>82101234567</code>.                                            |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |     </details>                                                                  |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | message               | yes      | object      | Parameters of a message being sent.                                             |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | message/type          | yes      | enum        | Message type.                                                                   |
         |                       |          |             |                                                                                 |
         |                       |          |             | .. raw:: html                                                                   |
         |                       |          |             |                                                                                 |
         |                       |          |             |     <details>                                                                   |
         |                       |          |             |         <summary>More details</summary>                                         |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |              The value of <code>CARDSMOBILE</code> is transmitted.              |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |     </details>                                                                  |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | message/data          | yes      | object      | Parameters of the data being sent.                                              |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | message/data/ttl      | yes      | integer     | Message lifetime.                                                               |
         |                       |          |             |                                                                                 |
         |                       |          |             | .. raw:: html                                                                   |
         |                       |          |             |                                                                                 |
         |                       |          |             |     <details>                                                                   |
         |                       |          |             |         <summary>More details</summary>                                         |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |            Acceptable range in seconds: from 30 to 86400.                       |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |     <div class="admonition note">                                               |
         |                       |          |             |         <p class="admonition-title">Note</p>                                    |
         |                       |          |             |         <p>If <code>ttl = 0</code> or if there are no parameter                 |
         |                       |          |             |            in the request the value is taken from the default settings set      |
         |                       |          |             |            when configuring the integration for each client individually.</p>   |
         |                       |          |             |         <p> If <code>ttl</code> is not specified in these places,               |
         |                       |          |             |             the system will reject the request and will display the error.</p>  |
         |                       |          |             |     </div>                                                                      |
         |                       |          |             |     </details>                                                                  |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | | message/data/       | no       | enum        | Unit of measurement of the message delivery period.                             |
         | | ttlUnit             |          |             |                                                                                 |
         |                       |          |             | .. raw:: html                                                                   |
         |                       |          |             |                                                                                 |
         |                       |          |             |     <details>                                                                   |
         |                       |          |             |         <summary>More details</summary>                                         |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |             It is transmitted only with <code>ttl</code>.                       |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |             Possible values are:                                                |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |         <ul>                                                                    |
         |                       |          |             |             <li><code>SECONDS</code>;</li>                                      |
         |                       |          |             |             <li><code>MINUTE</code>;</li>                                       |
         |                       |          |             |             <li><code>HOURS</code>.</li>                                        |
         |                       |          |             |         </ul>                                                                   |
         |                       |          |             |     </details>                                                                  |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | | message/data/       | yes      | string      | Service name from which the message is being sent.                              |
         | | serviceNumber       |          |             |                                                                                 |
         |                       |          |             | .. raw:: html                                                                   |
         |                       |          |             |                                                                                 |
         |                       |          |             |     <details>                                                                   |
         |                       |          |             |         <summary>More details</summary>                                         |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |            This parameter is optional for messages with the CardsMobile type.   |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |            If this parameter is not sent in the request, the value is taken     |
         |                       |          |             |            from the integration settings.                                       |  
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |            Also, if there is no value for this parameter in the settings,       |
         |                       |          |             |            the service name <code>CARDSMOBILE</code> will be used.              |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |     </details>                                                                  |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | | message/data/       | yes      | string      | Text of the message being sent.                                                 |
         | | text                |          |             |                                                                                 |
         |                       |          |             | .. raw:: html                                                                   |
         |                       |          |             |                                                                                 |
         |                       |          |             |     <details>                                                                   |
         |                       |          |             |         <summary>More details</summary>                                         |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |             Number of characters is no more than 150.                           |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |     </details>                                                                  |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | | message/data/       | yes      | string      | Header for the text message.                                                    |
         | | title               |          |             |                                                                                 |
         |                       |          |             | .. raw:: html                                                                   |
         |                       |          |             |                                                                                 |
         |                       |          |             |     <details>                                                                   |
         |                       |          |             |         <summary>More details</summary>                                         |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |             Number of characters is no more than 50.                            |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |     </details>                                                                  |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | | message/data/       | no       | enum        | Text constant for the CardsMobile messages.                                     |
         | | target              |          |             |                                                                                 |
         |                       |          |             | .. raw:: html                                                                   |
         |                       |          |             |                                                                                 |
         |                       |          |             |     <details>                                                                   |
         |                       |          |             |         <summary>More details</summary>                                         |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |             Defines the screen of the application to which the transition       |
         |                       |          |             |             should be made when clicking on the message.                        |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |             Possible values are:                                                |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |         <ul>                                                                    |
         |                       |          |             |             <li><code>card</code> — to the screen of the issued card;</li>      |
         |                       |          |             |             <li><code>campaign</code> — to the screen of a specific promotion   |
         |                       |          |             |             on the issued card;</li>                                            |
         |                       |          |             |             <li><code>campaigns</code> — to the full list of promotions         |
         |                       |          |             |             on the issued card.</li>                                            |
         |                       |          |             |         </ul>                                                                   |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |             Default value: <code>card</code>.                                   |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |     </details>                                                                  |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | | message/data/       | yes      | string      | Text identifier of the promotion for the transition.                            |
         | | campaignId          |          |             |                                                                                 |
         |                       |          |             | .. raw:: html                                                                   |
         |                       |          |             |                                                                                 |
         |                       |          |             |     <details>                                                                   |
         |                       |          |             |         <summary>More details</summary>                                         |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |            If <code>target = campaign</code> this parameter                     |
         |                       |          |             |            is mandatory.                                                        |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |            The promotion ID is indicated in the partner's system or in          |
         |                       |          |             |            the partner's Personal Account in the «Wallet for Business».         |  
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |            Number of characters is no more than 128.                            |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |     </details>                                                                  |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | | message/data/       | no       | enum        | Text constant for CardsMobile messages.                                         |
         | | pushType            |          |             |                                                                                 |
         |                       |          |             | .. raw:: html                                                                   |
         |                       |          |             |                                                                                 |
         |                       |          |             |     <details>                                                                   |
         |                       |          |             |         <summary>More details</summary>                                         |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |             It determines the traffic type assigned to the message              |
         |                       |          |             |             by the partner.                                                     |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |             Possible values are:                                                |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |         <ul>                                                                    |
         |                       |          |             |             <li><code>PROMO</code> — advertising traffic;</li>                  |
         |                       |          |             |             <li><code>SERVICE</code> — service traffic;</li>                    |
         |                       |          |             |             <li><code>TRANSACTION</code> — transactional traffic.</li>          |
         |                       |          |             |         </ul>                                                                   |
         |                       |          |             |     </details>                                                                  |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | | message/data/       | no       | object      | Parameters for sending images.                                                  |
         | | content             |          |             |                                                                                 |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | | message/data/       | no       | enum        | Content category by the contentUrl link.                                        |
         | | content/            |          |             |                                                                                 |
         | | contentCategory     |          |             | .. raw:: html                                                                   |
         |                       |          |             |                                                                                 |
         |                       |          |             |     <details>                                                                   |
         |                       |          |             |         <summary>More details</summary>                                         |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |               Possible value is: <code>IMAGE</code> — to send link to           |
         |                       |          |             |               image in the <code>contentUrl</code>.                             |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |     </details>                                                                  |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | | message/data/       | no       | string      | URL of the image.                                                               |
         | | content/contentUrl  |          |             |                                                                                 |
         |                       |          |             | .. raw:: html                                                                   |
         |                       |          |             |                                                                                 |
         |                       |          |             |     <details>                                                                   |
         |                       |          |             |         <summary>More details</summary>                                         |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |             The maximum length of links is 512 characters.                      |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |             Image requirements:                                                 |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |         <ul>                                                                    |
         |                       |          |             |             <li>image formats are JPEG, PNG;</li>                               |
         |                       |          |             |             <li>image extension is no more than 1024х512 pixels.</li>           |
         |                       |          |             |         </ul>                                                                   |
         |                       |          |             |     </details>                                                                  |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | registeredDelivery    | no       | integer     | Requirement for delivery reports.                                               |
         |                       |          |             |                                                                                 |
         |                       |          |             | .. raw:: html                                                                   |
         |                       |          |             |                                                                                 |
         |                       |          |             |     <details>                                                                   |
         |                       |          |             |         <summary>More details</summary>                                         |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |           Possible values are:                                                  |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |         <ul>                                                                    |
         |                       |          |             |             <li><code>0</code> — statuses are not required;</li>                |
         |                       |          |             |             <li><code>1</code> — statuses are required (by default);</li>       |
         |                       |          |             |             <li><code>2</code> — only «Undelivered» status is required.</li>    |
         |                       |          |             |         </ul>                                                                   |
         |                       |          |             |     </details>                                                                  |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+
         | notifyUrl             | no       | string      | Hostname of the incoming API to recieve the delivery report (see                |
         |                       |          |             | :doc:`eng_rest_status`).                                                        |
         |                       |          |             |                                                                                 |
         |                       |          |             | .. raw:: html                                                                   |
         |                       |          |             |                                                                                 |
         |                       |          |             |     <details>                                                                   |
         |                       |          |             |         <summary>More details</summary>                                         |
         |                       |          |             |         <p>                                                                     |
         |                       |          |             |           This parameter is optional in the request, but if sent you should     |
         |                       |          |             |           consider the following:                                               |
         |                       |          |             |         </p>                                                                    |
         |                       |          |             |         <ul>                                                                    |
         |                       |          |             |             <li>if the parameter is specified, it cannot be empty;</li>         |
         |                       |          |             |             <li>the <code>notifyUrl</code> string must be no more than 2048     |
         |                       |          |             |              characters long.</li>                                              |
         |                       |          |             |         </ul>                                                                   |
         |                       |          |             |     </details>                                                                  |
         +-----------------------+----------+-------------+---------------------------------------------------------------------------------+


Response to the Request 
--------------------------

After sending a message, the Service Provider returns a response synchronously. In case of successful sending, the Service Provider returns ``200 OK`` HTTP code.

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

         +-----------------------+--------------+--------------------------------------------------------------------+
         | Parameter             | Data type    | Description                                                        |
         +=======================+==============+====================================================================+
         | mtNum                 | string       | Sending chain ID assigned by the Service Provider platform.        | 
         +-----------------------+--------------+--------------------------------------------------------------------+
         | id                    | string       | Partner-side unique ID. Available, if it was included when         |
         |                       |              | sending.                                                           |
         +-----------------------+--------------+--------------------------------------------------------------------+


Sending Errors  
~~~~~~~~~~~~~~~~~~~~~~~

For results with errors, a response HTTP code will differ from ``200`` (see :ref:`eng-Коды-ошибок-отправки-CardsMobile`).

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


.. _eng-Коды-ошибок-отправки-CardsMobile:

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

        



CardsMobile Delivery Statuses
-----------------------------------------

To receive CardsMobile message statuses, you need to set up the :doc:`eng_rest_status`.

Delivery Error Codes
~~~~~~~~~~~~~~~~~~~~~~~

Delivery error codes for each message type are provided in the corresponding tab of the :ref:`REST-ErrCodeDescr-eng` section.
