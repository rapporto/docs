VK
===

VK Message Sending Request
--------------------------------

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

+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| Parameter             | Required | Data type   | Description                                                                     |
+=======================+==========+=============+=================================================================================+
| login                 | yes      | string      | Partner's name in the system.                                                   |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| password              | yes      | string      | Partner's password in the system.                                               |
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
| id                    | no       | string      | Partner's side unique ID.                                                       |
|                       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             This parameter is required to control re-sending and duplication    |
|                       |          |             |             (the control service is enabled separately). The Partner may recall |
|                       |          |             |             the Service Provider (the request to send a message) with the same  |
|                       |          |             |             ID several times.                                                   |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             In this case the message will be sent to the subscriber only once   |
|                       |          |             |             (upon the first request). In response to requests, the Service      |
|                       |          |             |             Provider will return the same message ID in the Service Provider's  |
|                       |          |             |             system to the Partner (the same as for the first request).          |
|                       |          |             |             The Service Provider optionally returns this ID to the Partner,     |
|                       |          |             |             if available in the message delivery report.                        |
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
|                       |          |             |             If it is not specified, it is sent immediately upon                 |
|                       |          |             |             receipt of the request.                                             |
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
|                       |          |             |             Example: <code>10:00</code>.                                        |
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
|                       |          |             |             Example: <code>21:00</code>.                                        |
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
|                       |          |             |             Specified by numbers from <code>1</code> (Monday) to <code>7</code> |
|                       |          |             |             (Sunday), for example, <code>12345</code>.                          |
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
|                       |          |             |             Example: <code>2024-05-10T16:29:30+0300</code>.                     |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
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
| message               | yes      | object      | Parameters of a message being sent.                                             |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+ 
| message/type          | yes      | enum        | Message type.                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             The value of <code>VK</code> is transmitted.                        |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+ 
| message/data          | yes      | object      | Parameters of the data being sent.                                              |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| | message/data/       | yes      | string      | Text of a message being sent.                                                   |
| | text                |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             Number of characters: no more than 2000.                            |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| | message/data/       | yes      | string      | Sender's name from which the message is being sent.                             |
| | serviceNumber       |          |             |                                                                                 |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+ 
| message/data/ttl      | yes      | integer     | Message lifetime.                                                               |
|                       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             Acceptable range in seconds: from 60 to 86400.                      |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     <div class="admonition note">                                               |
|                       |          |             |         <p class="admonition-title">Note</p>                                    |
|                       |          |             |         <p>When <code>ttl = 0</code> or the parameter is absent                 |
|                       |          |             |            in the request, the value from the default settings is used,         |
|                       |          |             |            which is set during   the integration setup separately for           |
|                       |          |             |            each client.</p>                                                     |
|                       |          |             |     </div>                                                                      |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| message/data/ttlUnit  | no       | enum        | Unit of measurement of the message delivery period.                             |
|                       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             It is transmitted only with <code>ttl</code>.                       |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             Possible values are: <code>SECONDS</code>; <code>MINUTES</code>     |   
|                       |          |             |             (by default); <code>HOURS</code>.                                   |
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
|                       |          |             |             Possible values are:                                                |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <ul>                                                                    |
|                       |          |             |             <li><code>0</code> — statuses are not required;</li>                |
|                       |          |             |             <li><code>1</code> — statuses are required (by default);</li>       |
|                       |          |             |             <li><code>2</code> — only "Undelivered" status is required.</li>    |
|                       |          |             |         </ul>                                                                   |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| notifyUrl             | no       | string      | Hostname of the incoming API to receive the delivery report.                    |
|                       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             This parameter is optional in the request, but if sent, you         |
|                       |          |             |             should consider the following: if the parameter is specified,       |
|                       |          |             |             it cannot be empty.                                                 |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             The <code>notifyUrl</code> string must be no more than 2048         |   
|                       |          |             |             characters long.                                                    |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             If any of the specified conditions are not met, an error will be    |   
|                       |          |             |             generated and the request will not be executed.                     |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| extraParam            | no       | string      | Additional parameters passed as ``param1=value1,param2=value2``, where          |
|                       |          |             | ``param1``and ``param2`` -- parameter names,                                    |
|                       |          |             | ``value1`` and ``value2`` -- values.                                            |
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
| cascadeChainLink      | no       | object      | Cascading message parameters.                                                   |
|                       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             See <a href="https://doc.rapporto.ru/api/rest/rest_cascade.html">   |                 
|                       |          |             |             Cascading Message Sending</a>.                                      |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+   

Response to the Request 
----------------------------

After sending a message the Service Provider returns a response synchronously. In case of successful sending Service Provider returns HTTP-code ``200 OK``.

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
          
         +-----------------------+--------------+--------------------------------------------------------------------+
         | Parameter             | Data type    | Description                                                        |
         +=======================+==============+====================================================================+
         | mtNum                 | string       | Sending chain identifier assigned by the Service Provider platform.| 
         +-----------------------+--------------+--------------------------------------------------------------------+
         | id                    | string       | Partner-side unique ID. Available, if it was included when sending.|
         +-----------------------+--------------+--------------------------------------------------------------------+

Sending Errors 
~~~~~~~~~~~~~~~~~~~~

For results with errors, a response HTTP code will differ from ``200`` (see :ref:`eng-Коды-ошибок-отправки-VK`).

.. _eng-Коды-ошибок-отправки-VK:      

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


VK message Delivery Statuses
-------------------------------

To receive VK message statuses, you need to set up the :doc:`eng_rest_status`.

Delivery Error Codes
~~~~~~~~~~~~~~~~~~~~~~~

Delivery error codes for each message type are provided in the corresponding tab of the :ref:`REST-ErrCodeDescr-eng` section.
