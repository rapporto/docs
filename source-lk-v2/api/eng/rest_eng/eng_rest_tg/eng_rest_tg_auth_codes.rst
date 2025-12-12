.. _tg-codes-eng:

Telegram Gateway Authorization Codes
======================================

This section describes the specifics of transmitting authorization codes through the platform to Telegram Gateway. 

To transmit a code, send a request including the corresponding code. The code (without any additional text) will be passed to the operator, who will insert it into the message template.

.. raw:: html

     <details>
         <summary>More details</summary>
         <p>
             The Telegram Gateway service is designed to deliver authorization and verification digital codes to Telegram Messenger users.
         </p>
         <p>
             Codes are sent from the Verification Codes official channel.
         </p>
         <p>
             Hiding one's phone number in Telegram settings does not affect message delivery. 
             The delivery of codes is also unaffected by whether the user has a Telegram Premium subscription or not.
         </p>
         <p>
             Currently, the service supports:
         </p>
         <ul>
             <li>sending authorization code messages via Telegram;</li>
             <li>receiving message delivery statuses;</li>
             <li>cascading message sending to alternative channels in case of non-delivery to Telegram (if necessary).</li>
         </ul>  
     </details>



.. _tg-sms-cascade-eng:

Sending Request
------------------------

.. tabs::

    .. tab:: Request Example 

        .. code-block:: json
           :linenos:

            {
              "login": "YOUR_LOGIN",
              "password": "YOUR_PASSWORD",
              "useTimeDiff": true,
              "id": "superId",
              "shortenLinks": false,
              "scheduleInfo": {
                "timeBegin": "10:00",
                "timeEnd": "12:00",
                "weekdaysSchedule": "123"
              },
              "destAddr": "SUBSCRIBER'S_PHONE_NUMBER",
              "message": {
                "type": "TGCODE",
                "data": {
                  "text": "12345",
                  "serviceNumber": "SENDER'S_NAME",
                  "ttl": 120,
                  "ttlUnit": "SECONDS"
                }
              }
            }



    .. tab:: Request Parameters
        
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
        | Parameter                      | Required | Data type    | Description                                                                      |
        +================================+==========+==============+==================================================================================+
        | login                          | yes      | string       | Partner's name.                                                                  |
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
        | password                       | yes      | string       | Partner's password for sending messages.                                         |
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
        | destAddr                       | yes      | string       | Subscriber's phone number.                                                       |
        |                                |          |              |                                                                                  |
        |                                |          |              | .. raw:: html                                                                    |
        |                                |          |              |                                                                                  |
        |                                |          |              |     <details>                                                                    |
        |                                |          |              |         <summary>More details</summary>                                          |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             It contains the country code, operator code and phone number.        |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             For the Russian Federation, the code can be <code>8</code>,          |
        |                                |          |              |             <code>7</code> or <code>+7</code>.                                   |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             Examples: <code>72101234567</code>, <code>+72101234567</code>,       |   
        |                                |          |              |             <code>8-210-123-45-67</code>, <code>82101234567</code>.              |                   
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |     </details>                                                                   |
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
        | id                             | no       | string       | Unique identifier on the Partner's side.                                         |
        |                                |          |              |                                                                                  |
        |                                |          |              |                                                                                  |
        |                                |          |              | .. raw:: html                                                                    |
        |                                |          |              |                                                                                  |
        |                                |          |              |     <details>                                                                    |
        |                                |          |              |         <summary>More details</summary>                                          |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             This parameter is necessary for controlling repeated submissions     |
        |                                |          |              |             and duplication (the control service is activated separately). The   |
        |                                |          |              |             Partner can call the Service Provider (request to send a message)    |
        |                                |          |              |             multiple times with the same ID.                                     |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             In this case, the message will be sent to the subscriber only once   |
        |                                |          |              |             (on the first request). In response to the requests, the Service     |
        |                                |          |              |             Provider will return the same message identifier in the Service      |
        |                                |          |              |             Provider's system to the Partner (the same as for the first          |
        |                                |          |              |             request). The Service Provider optionally returns this identifier    |
        |                                |          |              |             to the Partner in the message delivery report if it is available.    |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |     </details>                                                                   |
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
        | message                        | yes      | object       | Parameters of a message being sent.                                              |
        |                                |          |              |                                                                                  |
        |                                |          |              | .. raw:: html                                                                    |
        |                                |          |              |                                                                                  |
        |                                |          |              |     <details>                                                                    |
        |                                |          |              |         <summary>More details</summary>                                          |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |            It contains information about the message type and its content.       |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |     </details>                                                                   |
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
        | | {message}                    | yes      | enum         | Message type.                                                                    |
        | | type                         |          |              |                                                                                  |
        |                                |          |              | .. raw:: html                                                                    |
        |                                |          |              |                                                                                  |
        |                                |          |              |     <details>                                                                    |
        |                                |          |              |         <summary>More details</summary>                                          |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             Specify the <code>TGCODE</code> value.                               |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |     </details>                                                                   |
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
        | | {message}                    | yes      | object       | Parameters of the data being sent.                                               |
        | | data                         |          |              |                                                                                  |
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
        | | {message/data}               | yes      | string       | Message text.                                                                    |
        | | text                         |          |              |                                                                                  |
        |                                |          |              | .. raw:: html                                                                    |
        |                                |          |              |                                                                                  |
        |                                |          |              |     <details>                                                                    |
        |                                |          |              |         <summary>More details</summary>                                          |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |            The message must contain a code consisting of four to eight digits.   |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |            Messages without digit codes will not be delivered.                   |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |            Character limit: no more than 2000.                                   |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |            If the message contains multiple codes, only the first one will       |
        |                                |          |              |            be transmitted.                                                       |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |            Any accompanying text in Cyrillic or Latin (including emojis)         |
        |                                |          |              |            is ignored and replaced with a default Telegram template based        |
        |                                |          |              |            on the user interface language: <br />                                |
        |                                |          |              |            "Ваш код: <code>text</code>" / "Your code is <code>text</code>".      |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |     </details>                                                                   |
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
        | | {message/data}               | yes      | string       | Sender's name from which the message is being sent.                              |
        | | serviceNumber                |          |              |                                                                                  |
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
        | | {message/data}               | yes      | integer      | Message lifetime.                                                                |
        | | ttl                          |          |              |                                                                                  |
        |                                |          |              | .. raw:: html                                                                    |
        |                                |          |              |                                                                                  |
        |                                |          |              |     <details>                                                                    |
        |                                |          |              |         <summary>More details</summary>                                          |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             Acceptable range in seconds: from 31 to 86400.                       |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |     <div class="admonition note">                                                |
        |                                |          |              |         <p class="admonition-title">Note</p>                                     |
        |                                |          |              |         <p>When <code>ttl = 0</code> or the parameter is absent in               | 
        |                                |          |              |            the request, the value from the default settings is used, which is    |
        |                                |          |              |            set during the integration setup separately for each client.</p>      |
        |                                |          |              |     </div>                                                                       |
        |                                |          |              |     </details>                                                                   |
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
        | | {message/data}               | yes      | enum         | Unit of measurement of the message delivery period.                              |
        | | ttlUnit                      |          |              |                                                                                  |
        |                                |          |              | .. raw:: html                                                                    |
        |                                |          |              |                                                                                  |
        |                                |          |              |     <details>                                                                    |
        |                                |          |              |         <summary>More details</summary>                                          |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             It is transmitted only with <code>ttl</code>.                        |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             Possible values are:                                                 |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |         <ul>                                                                     |
        |                                |          |              |             <li><code>SECONDS</code>;</li>                                       |
        |                                |          |              |             <li><code>MINUTES</code> (by default);</li>                          |
        |                                |          |              |             <li><code>HOURS</code>.</li>                                         |
        |                                |          |              |         </ul>                                                                    |
        |                                |          |              |     </details>                                                                   |
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
        | extraParam                     | no       | string       | Additional parameters passed in the message.                                     |
        |                                |          |              |                                                                                  |
        |                                |          |              | .. raw:: html                                                                    |
        |                                |          |              |                                                                                  |
        |                                |          |              |     <details>                                                                    |
        |                                |          |              |         <summary>More details</summary>                                          |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             Parameters are passed as <code>param1=value1,param2=value2</code>,   |
        |                                |          |              |             where <code>param1</code> and <code>param2</code> — parameter names, |
        |                                |          |              |             <code>value1</code> and <code>value2</code> — values.                |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             Example: <code>place=abzakovo,name=guest house-3</code>              |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             The comma character cannot be included in the parameter name, but it |
        |                                |          |              |             can be included in its value — in this case it must be doubled.      |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             Example: <code>coordinates=53.8085896,,58.6362112</code>             |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |     </details>                                                                   |
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
        | registeredDelivery             | no       | integer      | Requirement of delivery reports.                                                 |
        |                                |          |              |                                                                                  |
        |                                |          |              | .. raw:: html                                                                    |
        |                                |          |              |                                                                                  |
        |                                |          |              |     <details>                                                                    |
        |                                |          |              |         <summary>More details</summary>                                          |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             Specify whether delivery reports are required to track statuses.     |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             Possible values are:                                                 |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |         <ul>                                                                     |
        |                                |          |              |             <li><code>0</code> — statuses are not required;</li>                 |
        |                                |          |              |             <li><code>1</code> — statuses are required (by default);</li>        |
        |                                |          |              |             <li><code>2</code> — only the <code>Undelivered</code> status is     |
        |                                |          |              |                 required.</li>                                                   |
        |                                |          |              |         </ul>                                                                    |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             For cascading message sending specify the <code>1</code> value to get|
        |                                |          |              |             reports on all message types.                                        |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |     </details>                                                                   |
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
        | notifyUrl                      | no       | string       | Hostname of the incoming API to obtain the delivery report.                      |
        |                                |          |              |                                                                                  |
        |                                |          |              | .. raw:: html                                                                    |
        |                                |          |              |                                                                                  |
        |                                |          |              |     <details>                                                                    |
        |                                |          |              |         <summary>More details</summary>                                          |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             This parameter is optional in the request, but when sending you      |
        |                                |          |              |             need to consider the following:                                      |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |         <ul>                                                                     |
        |                                |          |              |             <li>if the parameter is specified, it cannot be empty;</li>          |
        |                                |          |              |             <li>the <code>notifyUrl</code> string must be no more than 2048      |
        |                                |          |              |             characters.</li>                                                     |
        |                                |          |              |         </ul>                                                                    |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             If any of the specified conditions are not met, an error will be     |
        |                                |          |              |             generated and the request will not be executed.                      |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |     </details>                                                                   |
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+



Response 
--------------------

After sending a message the Service Provider returns a response synchronously. 

Successful Sending
~~~~~~~~~~~~~~~~~~~~~~

In case of successful sending the Service Provider returns the ``200 OK`` HTTP-code.

.. tabs::

    .. tab:: Response example

      .. code-block:: json
         :linenos:

           {
              "mtNum": "7390612217"
              "id": "8770630"
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
~~~~~~~~~~~~~~~~~~~~

For results with errors, a response HTTP code will differ from ``200`` (see :ref:`eng-Коды-ошибок-отправки-Telegram`).

.. tabs::

    .. tab:: Response example

       .. code-block:: json
          :linenos:

           {
               "error": {
                   "code": 4,
                   "description": "Invalid request"
               },
               "extendedDescription": "В сообщении отсутствует код"
           }

       In this example, the Telegram message does not contain a digital authorization code.


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



.. _Коды-ошибок-отправки-tg-eng:          

Error Codes  
`````````````````````

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

Delivery Statuses
--------------------

To receive message statuses, you need to set up the :doc:`../eng_rest_status`.

Delivery Error Codes
~~~~~~~~~~~~~~~~~~~~~~~

Delivery error codes for each message type are provided in the corresponding tab of the :ref:`REST-ErrCodeDescr-eng` section.
