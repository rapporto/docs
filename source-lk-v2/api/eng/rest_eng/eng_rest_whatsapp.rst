WhatsApp
=========

WhatsApp Message Sending
----------------------------

The following WhatsApp messages are supported:

*  text only;
*  image only.

.. raw:: html

   <div class="admonition note">
       <p class="admonition-title">Note</p>
       <p>It is not allowed to send two types of content at the same time (for example, a text and an image).</p>
   </div>                                                                           


Request Examples 
~~~~~~~~~~~~~~~~~~~~~~~

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

   .. tab:: Text

      .. code-block:: json
         :linenos:

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
                "type":"WHATSAPP",
                "data":
                {
                    "instantContent":
                    {
                        "type":"TEXT",
                        "data":
                        {
                        "text":"hatsApp message text"
                        }
                    },
                    "serviceNumber":"SENDER'S_NAME",
                    "ttl":1440
                }
            }
         }



   .. tab:: Image

       .. code-block:: json
          :linenos:

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
                   "type":"WHATSAPP",
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
                       "ttl":1440
                   }
               }
            }

.. _eng-Rest-WA-параметры-запроса:

Request Parameters
~~~~~~~~~~~~~~~~~~~~

+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| Parameter             | Required | Data type   | Description                                                                     |
+=======================+==========+=============+=================================================================================+
| login                 | yes      | string      | Partner's name.                                                                 |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| password              | yes      | string      | Partner's password for sending messages.                                        |
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
| id                    | no       | string      | Partner-side unique ID.                                                         |
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
|                       |          |             |             If not specified, it is sent immediately upon                       |
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
|                       |          |             |             The value of <code>WHATSAPP</code> is transmitted.                  |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+ 
| | message/data/       | yes      | object      | Parameters of the WhatsApp message being sent (images, buttons).                |
| | instantContent      |          |             |                                                                                 |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| | instantContent/     | yes      | enum        | Type of a message parameter.                                                    |
| | type                |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             Possible values are:                                                |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <ul>                                                                    |
|                       |          |             |             <li><code>TEXT</code> (to transmit text only);</li>                 |
|                       |          |             |             <li><code>IMAGE_URL</code> (image only).</li>                       |
|                       |          |             |         </ul>                                                                   |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+ 
| | instantContent/     | yes      | object      | Parameters of the data being sent.                                              |
| | data                |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             Possible values are:                                                |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <ul>                                                                    |
|                       |          |             |             <li><code>text</code> (message text);</li>                          |
|                       |          |             |             <li><code>imageURL</code> (URL of the image).</li>                  |
|                       |          |             |         </ul>                                                                   |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+ 
| | instantContent/     | yes      | string      | Message text.                                                                   |
| | data/text           |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |              Maximum length: 1000 characters.                                   |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+  
| | instantContent/     | yes      | string      | URL of an image to be transmitted.                                              |
| | data/imageURL       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |              400x400px image with JPG or PNG extension is recommended           |
|                       |          |             |              to be used.                                                        |     
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+  
| | message/data/       | no       | string      | Sender's name from which the message is being sent.                             |
| | serviceNumber       |          |             |                                                                                 |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+  
| | message/data/ttl    | no       | integer     | WhatsApp message lifetime.                                                      |
|                       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             Possible values in minutes are: <code>1440</code>,                  |
|                       |          |             |             <code>2880</code>, <code>4320</code>, <code>5760</code>,            |
|                       |          |             |             <code>7200</code>, <code>8640</code>, <code>10080</code>.           |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     <div class="admonition note">                                               |
|                       |          |             |         <p class="admonition-title">Note</p>                                    |
|                       |          |             |         <p>When <code>ttl = 0</code> or the parameter is absent                 |
|                       |          |             |            in the request, the value from the default settings is used,         |
|                       |          |             |            which is set during the integration setup separately for             |
|                       |          |             |            each client.</p>                                                     |
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
|                       |          |             |             Possible values are: <code>SECONDS</code>; <code>MINUTES</code>     |   
|                       |          |             |             (by default); <code>HOURS</code>.                                   |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| extraParam            | no       | string      | Additional parameters passed as ``param1=value1,param2=value2``, where          |
|                       |          |             | ``param1`` and ``param2`` -- parameter names,                                   |
|                       |          |             | ``value1`` and ``value2`` -- values.                                            |
|                       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |                              
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |            The comma character cannot be included in the parameter name,        |
|                       |          |             |            but it can be included in its value — in this case it must be        |
|                       |          |             |            doubled. Example: the string                                         | 
|                       |          |             |            <code>place=abzakovo,name=guest house-2,coordinates=53.8085896,,     |
|                       |          |             |            58.6362112,from=23.02.09,to=05.03.09</code>.                         |
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
-------------------------

After sending a message the Service Provider returns a response synchronously. In case of successful sending Service Provider returns HTTP-code ``200 OK``.

Successful Sending
~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::

    .. tab:: Response example

      .. code-block:: json
         :linenos:

          {
            "mtNum": "107930572",
            "id": "8770599"
          }


    .. tab:: Response parameters

         +-----------------------+--------------+--------------------------------------------------------------------+
         | Parameter             | Data type    | Description                                                        |
         +=======================+==============+====================================================================+
         | mtNum                 | string       | Identifier of the sending chain assigned by the Service Provider   | 
         |                       |              | platform.                                                          |
         +-----------------------+--------------+--------------------------------------------------------------------+
         | id                    | string       | Unique identifier on the Partner's side. It is present if it       |
         |                       |              | provided when sending.                                             |
         +-----------------------+--------------+--------------------------------------------------------------------+          
   


Sending Errors 
~~~~~~~~~~~~~~~

For results with errors, a response HTTP code will differ from ``200`` (see :ref:`eng-Коды-ошибок-отправки-WhatsApp`).

.. tabs::

    .. tab:: Response example

       .. code-block:: json
          :linenos:
   
           {
               "error": {
                   "code": 4,
                   "description": "Invalid request"
               },
               "extendedDescription": "Message is too long (2024 symbols). WHATSAPP message max length is 1000 symbols."
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

  
.. _eng-Коды-ошибок-отправки-WhatsApp:      

Error Codes  
~~~~~~~~~~~~~~~~~

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


WhatsApp Messages Delivery Statuses
-------------------------------------

To receive WhatsApp message statuses, you need to set up the :doc:`eng_rest_status`.

Delivery Error Codes
~~~~~~~~~~~~~~~~~~~~~~~

Delivery error codes for each message type are provided in the corresponding tab of the :ref:`REST-ErrCodeDescr-eng` section.
