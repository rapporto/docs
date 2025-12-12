Telegram Message Sending
==========================

The following types of Telegram messages are supported:

*  text only;
*  text + link to follow.

Request Examples 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::

   .. tab:: Text

      .. code-block:: json
         :linenos:
         :emphasize-lines: 18

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
          :emphasize-lines: 18,19

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


  

Request Parameters
~~~~~~~~~~~~~~~~~~~~

+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| Parameter             | Required | Data type   | Description                                                                     |
+=======================+==========+=============+=================================================================================+
| login                 | yes      | string      | Partner's name.                                                                 |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| password              | yes      | string      | Partner's password for sending messages.                                        |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| destAddr              | yes      | string      | Subscriber's phone number.                                                      |
|                       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             It contains the country code, operator code and phone number.       |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             For the Russian Federation, the code can be <code>8</code>,         |
|                       |          |             |             <code>7</code> or <code>+7</code>.                                  |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             Examples: <code>72101234567</code>, <code>+72101234567</code>,      |   
|                       |          |             |             <code>8-210-123-45-67</code>, <code>82101234567</code>.             |                   
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
|                       |          |             |             messaging initiator schedule UTC+3 regardless of the message        |
|                       |          |             |             recipient time zone.                                                |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             Default value: <code>false</code>.                                  |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| id                    | no       | string      | Unique identifier on the Partner's side.                                        |
|                       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             This parameter is necessary for controlling repeated submissions    |
|                       |          |             |             and duplication (the control service is activated separately). The  |
|                       |          |             |             Partner can call the Service Provider (request to send a message)   |
|                       |          |             |             multiple times with the same ID.                                    |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             In this case, the message will be sent to the subscriber only once  |
|                       |          |             |             (on the first request). In response to the requests, the Service    |
|                       |          |             |             Provider will return the same message identifier in the Service     |
|                       |          |             |             Provider's system to the Partner (the same as for the first         |
|                       |          |             |             request). The Service Provider optionally returns this identifier   |
|                       |          |             |             to the Partner in the message delivery report if it is available.   |
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
|                       |          |             |             If not specified, it is sent immediately upon receipt of the        |
|                       |          |             |             request.                                                            |
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
|                       |          |             |             For example: <code>10:00</code>.                                    |
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
|                       |          |             |             For example: <code>21:00</code>.                                    |
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
|                       |          |             |             Specified by numbers from <code>1</code> (Monday)                   |
|                       |          |             |             to <code>7</code> (Sunday).                                         |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             For example: <code>12345</code>.                                    |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             If there are no restrictions on days of the week, this parameter    |
|                       |          |             |             can be empty or not delivered in the request.                       |
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
|                       |          |             |             Specify the end date for message sending.                           |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             For example: <code>2024-05-10T16:29:30+0300</code>.                 |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| message               | yes      | object      | Parameters of a message being sent.                                             |
|                       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |            It contains information about the message type and its content.      |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| message/type          | yes      | enum        | Message type.                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             Specify the <code>TELEGRAM</code> value.                            |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| message/data          | yes      | object      | Parameters of the data being sent.                                              |
|                       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             To send a text only, specify the <code>text</code> attribute.       |
|                       |          |             |         </p>                                                                    |
|                       |          |             |             To send a text and a link specify the <code>text</code> and         |
|                       |          |             |             <code>link</code> attributes.                                       |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| | message/data/       | yes      | string      | Message text.                                                                   | 
| | text                |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |            Character limit: no more than 1000.                                  |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <p>                                                                     |
|                       |          |             |            The text of the message can be in Cyrillic or Latin, and may contain |
|                       |          |             |            emojis.                                                              |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| | message/data/       | no       | string      | Random URL, passed in the text of a Telegram message.                           | 
| | link                |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             Number of characters: no more than 256.                             |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <p>                                                                     |
|                       |          |             |            If the link length exceeds the specified value, the message          |
|                       |          |             |            will be rejected with an error. The error text: "The value limit of  |
|                       |          |             |            the <code>link</code> parameter is exceeded in the message".         |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             If an empty parameter is passed, the message will be rejected with  |
|                       |          |             |             an error. The error text: "The message is missing a value for the   |
|                       |          |             |             <code>link</code> parameter".                                       |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| | message/data/       | no       | string      | Sender's name from which the message is being sent.                             |
| | serviceNumber       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |            To send the message successfully, please double-check that the       |
|                       |          |             |            service name is correct.                                             |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| | message/data/       | no       | integer     | Message lifetime.                                                               |
| | ttl                 |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             Acceptable range in seconds: from 30 to 86400.                      |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     <div class="admonition note">                                               |
|                       |          |             |         <p class="admonition-title">Note</p>                                    |
|                       |          |             |         <p>When <code>ttl = 0</code> or the parameter is absent in              | 
|                       |          |             |            the request, the value from the default settings is used, which is   |
|                       |          |             |            set during the integration setup separately for each client.</p>     |
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
|                       |          |             |             <li><code>MINUTES</code> (by default);</li>                         |
|                       |          |             |             <li><code>HOURS</code>.</li>                                        |
|                       |          |             |         </ul>                                                                   |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| extraParam            | no       | string      | Additional parameters passed in the message.                                    |
|                       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             Parameters are passed as <code>param1=value1,param2=value2</code>,  |
|                       |          |             |             where <code>param1</code> and <code>param2</code> — parameter names,|
|                       |          |             |             <code>value1</code> and <code>value2</code> — values.               |
|                       |          |             |                                                                                 |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             Example: the string                                                 |
|                       |          |             |             <code>place=abzakovo,name=guest house-3</code>                      |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <p>                                                                     |
|                       |          |             |            The comma character cannot be included in the parameter name, but it |
|                       |          |             |            can be included in its value — in this case it must be doubled.      |
|                       |          |             |            Example:                                                             | 
|                       |          |             |            <code>coordinates=53.8085896,,58.6362112</code>                      |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| registeredDelivery    | no       | integer     | Requirement of delivery reports.                                                |
|                       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             Specify whether delivery reports are required to track statuses.    |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             Possible values are:                                                |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <ul>                                                                    |
|                       |          |             |             <li><code>0</code> — statuses are not required;</li>                |
|                       |          |             |             <li><code>1</code> — statuses are required (by default);</li>       |
|                       |          |             |             <li><code>2</code> — only the <code>Undelivered</code>              |
|                       |          |             |                 status is required. </li>                                       |
|                       |          |             |         </ul>                                                                   |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| notifyUrl             | no       | string      | Hostname of the incoming API to obtain the delivery report.                     |
|                       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             This parameter is optional in the request, but when sending you     |
|                       |          |             |             need to consider the following:                                     |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <ul>                                                                    |
|                       |          |             |             <li>if the parameter is specified, it cannot be empty;</li>         |
|                       |          |             |             <li>the <code>notifyUrl</code> string must be no more than 2048     |
|                       |          |             |             characters.</li>                                                    |
|                       |          |             |         </ul>                                                                   |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             If any of the specified conditions are not met, an error will be    |
|                       |          |             |             generated and the request will not be executed.                     |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| cascadeChainLink      | no       | object      | Cascading message parameters.                                                   |
|                       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |        See                                                                      |
|                       |          |             |        <a href="https://doc.rapporto.ru/api/eng/rest_eng/eng_rest_cascade.html">|                 
|                       |          |             |        Cascading Message Sending</a>.                                           |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+ 


Response 
--------------------

After sending a message the Service Provider returns a response synchronously. 

Successful Telegram Sending
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In case of successful sending the Service Provider returns the ``200 OK`` HTTP-code.

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


Telegram Sending Errors
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
               "extendedDescription": "Telegram message is absent"
           }

       In this example, there is no text in the Telegram message, but only a link is transmitted, which is an error.


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



.. _eng-Коды-ошибок-отправки-Telegram:      

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


Telegram Delivery Statuses
--------------------------------------

To receive Telegram message statuses, you need to set up the :doc:`../eng_rest_status`.

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

Delivery Error Codes
~~~~~~~~~~~~~~~~~~~~~~~

Delivery error codes for each message type are provided in the corresponding tab of the :ref:`REST-ErrCodeDescr-eng` section.

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

         +-----------------+----------+-------------------------+----------------------------------------------------------------------------------+
         | Parameter       | Required | Type                    | Description                                                                      |
         +=================+==========+=========================+==================================================================================+
         | eventType       | yes      | string                  | Event type.                                                                      |
         |                 |          |                         |                                                                                  |
         |                 |          |                         | .. raw:: html                                                                    |
         |                 |          |                         |                                                                                  |
         |                 |          |                         |     <details>                                                                    |
         |                 |          |                         |         <summary>More details</summary>                                          |
         |                 |          |                         |         <p>                                                                      |
         |                 |          |                         |             Possible values are:                                                 |
         |                 |          |                         |         </p>                                                                     |
         |                 |          |                         |         <ul>                                                                     |
         |                 |          |                         |             <li><code>view</code> — display notification;</li>                   |
         |                 |          |                         |             <li><code>click</code> — clicking notification;</li>                 |
         |                 |          |                         |             <li><code>subscribe</code> — subscription notification.</li>         |
         |                 |          |                         |         </ul>                                                                    |
         |                 |          |                         |     </details>                                                                   |
         +-----------------+----------+-------------------------+----------------------------------------------------------------------------------+
         | eventDate       | yes      | string                  | Date and time of the event in ``YYYY-MM-DDThh:mm:ss+TMZN`` format.               |
         +-----------------+----------+-------------------------+----------------------------------------------------------------------------------+
         | viewsCount      | yes      | integer                 | Total number of displays for the message, including the current display.         |
         +-----------------+----------+-------------------------+----------------------------------------------------------------------------------+
         | clicksCount     | yes      | integer                 | Total number of clicking for the message, including the current click.           |
         +-----------------+----------+-------------------------+----------------------------------------------------------------------------------+

