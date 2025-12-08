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
| id                    | no       | string      | Unique identifier on the Partner's side.                                        |
|                       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             This parameter is necessary                                         |
|                       |          |             |             for controlling repeated submissions and duplication (the control   |
|                       |          |             |             service is activated separately). The Partner can call the Service  |
|                       |          |             |             Provider (request to send a message) multiple times with the same   |
|                       |          |             |             ID.                                                                 |
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
| shortenLinks          | no       | boolean     | Parameter controls the automatic shortening of long links in the message.       |
|                       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             Possible values are:                                                |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <ul>                                                                    |
|                       |          |             |             <li><code>true</code> — to shorten links (by default);</li>         |           
|                       |          |             |             <li><code>false</code> — shortening link is not required.</li>      |
|                       |          |             |         </ul>                                                                   |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             If the parameter is not included in the request, but the service    |
|                       |          |             |             is available to the Partner, the links will be shortened            |
|                       |          |             |             by default.                                                         |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             The ability to use this service is discussed and configured         |
|                       |          |             |             in advance by the Service Provider.                                 |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <p>                                                                     |
|                       |          |             |         For more details:                                                       |
|                       |          |             |         <a href="https://doc.rapporto.ru/api/eng/rest_eng/                      |
|                       |          |             |         eng_rest_short_link.html">Link Shortening Service</a>.                  |
|                       |          |             |         </p>                                                                    |  
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
|                       |          |             |             The value of <code>VIBER</code> is transmitted.                     |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+ 
| message/data          | yes      | object      | Parameters of the data being sent.                                              |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+
| | message/data/       | yes      | object      | Parameters of the Viber message being sent (images, buttons).                   |
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
|                       |          |             |             <li><code>IMAGE_URL</code> (image only);</li>                       |
|                       |          |             |             <li><code>BUTTON</code> (text of the message, the URL of the image, |
|                       |          |             |              the button name and the URL to follow by clicking on the button,   |
|                       |          |             |              see <i>instantContent/data</i>)</li>                               |
|                       |          |             |         </ul>                                                                   |
|                       |          |             |     <div class="admonition important">                                          |
|                       |          |             |         <p class="admonition-title">Important</p>                               |
|                       |          |             |         <p>For business accounts that support the functionality of Viber        |
|                       |          |             |            sessions, messages with the type <code>TEXT</code> or sessions,      |
|                       |          |             |            messages with the type <code>TEXT</code> or <code>IMAGE_URL</code>.  |
|                       |          |             |            Messages with a different type return the 400 "Invalid request"      |
|                       |          |             |            error.</p>                                                           |
|                       |          |             |     </div>                                                                      |
|                       |          |             |     </div>                                                                      |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+     
| | instantContent/     | yes      | object      | Parameters of the data being sent when selecting the ``BUTTON`` value           |
| | data                |          |             | in *instantContent/type*.                                                       |
|                       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             Possible values are:                                                |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <ul>                                                                    |
|                       |          |             |             <li><code>text</code> (message text);</li>                          |
|                       |          |             |             <li><code>imageURL</code> (URL of the image);</li>                  |
|                       |          |             |             <li><code>caption</code> (button name);</li>                        |
|                       |          |             |             <li><code>action</code> (URL to follow by clicking on               |
|                       |          |             |              the button).</li>                                                  |
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
|                       |          |             |              Character limit: 1000.                                             |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+     
| | instantContent/     | yes      | string      | :term:`URL` of an image to be transmitted.                                      |
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
| | instantContent/     | yes      | string      | Button text in Viber message.                                                   |
| | data/caption        |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |              Character limit: 30.                                               |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+    
| | instantContent/     | yes      | string      | Button link in Viber message.                                                   |
| | data/action         |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |              Character limit: 2048.                                             |
|                       |          |             |         </p>                                                                    |
|                       |          |             |         <p>                                                                     |
|                       |          |             |              URL for the link shall begin with "http://", "https://",           |
|                       |          |             |              "viber://", "mailto:", "tel:".                                     |
|                       |          |             |         </p>                                                                    |
|                       |          |             |     </details>                                                                  |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+        
| | message/data/       | no       | string      | Sender's name from which the message is being sent.                             |
| | serviceNumber       |          |             |                                                                                 |
+-----------------------+----------+-------------+---------------------------------------------------------------------------------+ 
| | message/data/ttl    | no       | integer     | Message lifetime.                                                               |
|                       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |             Acceptable range in minutes: from 30 to 86400.                      |
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
| extraParam            | no       | string      | Additional parameters passed as ``param1=value1,param2=value2``,                |
|                       |          |             | where ``param1`` and ``param2`` — parameter names, ``value1`` and ``value2`` —  |
|                       |          |             | values.                                                                         |
|                       |          |             |                                                                                 |
|                       |          |             | .. raw:: html                                                                   |
|                       |          |             |                                                                                 |                              
|                       |          |             |                                                                                 |
|                       |          |             |     <details>                                                                   |
|                       |          |             |         <summary>More details</summary>                                         |
|                       |          |             |         <p>                                                                     |
|                       |          |             |            The comma character cannot be included in the parameter name, but it |
|                       |          |             |            can be included in its value — in this case it must be doubled.      |
|                       |          |             |            Example: the string                                                  | 
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
|                       |          |             |             This parameter is optional in the request, but if sent you          |
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


Response 
---------------

After sending the message, the Service Provider synchronously returns a response. In case of a successful submission, HTTP code ``200 OK`` is returned.


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

         +-----------------------+--------------+--------------------------------------------------------------------+
         | Parameter             | Data type    | Description                                                        |
         +=======================+==============+====================================================================+
         | mtNum                 | string       | Identifier of the sending chain assigned by the Service Provider   | 
         |                       |              | platform.                                                          |
         +-----------------------+--------------+--------------------------------------------------------------------+
         | id                    | string       | Unique identifier on the Partner's side. It is present if it       |
         |                       |              | provided when sending.                                             |
         +-----------------------+--------------+--------------------------------------------------------------------+



Viber Sending Errors 
~~~~~~~~~~~~~~~~~~~~~~~~~~

For error responses, the HTTP response code will be different from ``200`` (see :ref:`eng-Коды-ошибок-отправки-Viber`).

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
  
.. _eng-Коды-ошибок-отправки-Viber:      

Error Codes  
~~~~~~~~~~~~~~~~~~

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


Viber Delivery Statuses
-----------------------------------

To receive Viber message statuses, you need to set up the :doc:`eng_rest_status`.

Delivery Error codes
~~~~~~~~~~~~~~~~~~~~~~~

Delivery error codes for each message type are provided in the corresponding tab of the :ref:`REST-ErrCodeDescr-eng` section.

Viber Session
===============

| Viber session is a feature that allows the Partner to communicate with subscribers within specific time frames for a fixed price per session.
| The reason for the inquiry can be anything: a question, a message about a problem, a booking confirmation, or a delivery status check — the user will receive a response in real time. 

.. raw:: html

   <div class="admonition note">
       <p class="admonition-title">Note</p>
       <p>The functionality of Viber sessions is not available by default. To enable it, you should contact your account manager.</p>
   </div>                                                                           

Viber Session Setup
-------------------------------

| Using sessions implies the presence of a special Viber business account.
| You can create a new Viber business account with the sessions functionality enabled.
| If you already have a valid business account and would like to enable sessions, please contact your account manager.

.. raw:: html

  <div class="admonition important">
       <p class="admonition-title">Important</p>
       <p>For business accounts that support Viber sessions, messages with the type “text only“ or “image only“ are available (the value of InstantContent.type parameter must be <code>TEXT</code> or <code>IMAGE_URL</code>).</p>
  </div>                                                                           

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