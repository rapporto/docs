VK
=========

Features of VK messages
---------------------------------

When sending VK messages the following features should be taken into account:

1. A Partner can send text messages with a maximum length of 2048 characters.
2. Messages may contain links.
3. Messages are sent on behalf of the VK group to any VK user on his phone number.
4. A Partner can send no more than 50 messages per second from one VK group.
5. A Partner can send no more than 5 messages per day and night to one user from one VK group.
6. All VK groups and examples of texts of messages are subject to preliminary moderation with the presentation of a contract for the provision of services, a trademark and other necessary documents.
7. Messages are delivered within a period of lifetime from 1 minute to 24 hours. The message lifetime is configured on the Service Provider's side in agreement with the Partner.
8. Only delivered messages are charged.
9. Messages are delivered only to active VK users. Active users are those who have visited the site within the last 7 days (mobile or web version of the social network).

To enable sending VK messages, the Partner has to additionally provide the Service Provider with the URL of the VK group (on behalf of which the sending will be carried out), as well as provide examples of text messages for moderation.


Sending request 
---------------------

HTTP method: GET.

Request Examples
~~~~~~~~~~~~~~~~~~~~

.. tabs::

    .. tab:: Text format

        GET request with a message in Latin “test“ in a simple text format.

        .. code-block::

            http://partner.ru/login?clientId=79161234567&message=test&pass=123&serviceId=login

    .. tab:: Text in URL format

        GET request with the text of the message in Cyrillic “тест“ in URL format.

        .. code-block::

            http://partner.ru/login?clientId=79161234567&message=%D1%82%D0%B5%D1%81%D1%82&pass=123&serviceId=login


.. _engHTTP-VK-параметры-запроса:

Request Parameters
~~~~~~~~~~~~~~~~~~~~~~

+--------------------+---------+--------------+-------------------------------------------------------------------------------------------------------------------+
| Parameter          | Required| Type         | Description                                                                                                       |
+====================+=========+==============+===================================================================================================================+
| clientId           | yes     | string       | Subscriber's phone number, no more than 25 characters.                                                            |
|                    |         |              |                                                                                                                   |
|                    |         |              | .. raw:: html                                                                                                     |
|                    |         |              |                                                                                                                   |
|                    |         |              |     <details>                                                                                                     |
|                    |         |              |         <summary>More details</summary>                                                                           |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             Examples: <code>79036550550</code>, <code>+79036550550</code>, <code>8-903-655-05-50</code>,          |                            
|                    |         |              |             <code>89036550550</code>.                                                                             |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |     </details>                                                                                                    |  
+--------------------+---------+--------------+-------------------------------------------------------------------------------------------------------------------+
| message            | no      | string       | Text of the message in UTF-8 encoding.                                                                            |
|                    |         |              |                                                                                                                   |               
|                    |         |              | .. raw:: html                                                                                                     |
|                    |         |              |                                                                                                                   |
|                    |         |              |     <details>                                                                                                     |
|                    |         |              |         <summary>More details</summary>                                                                           |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             Maximum length: 2048 characters.                                                                      |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |     </details>                                                                                                    |
+--------------------+---------+--------------+-------------------------------------------------------------------------------------------------------------------+
| serviceId          | yes     | string       | ID of the Partner’s service (login), which is used to send a message.                                             |
|                    |         |              |                                                                                                                   |
|                    |         |              | .. raw:: html                                                                                                     |
|                    |         |              |                                                                                                                   |
|                    |         |              |     <details>                                                                                                     |
|                    |         |              |         <summary>More details</summary>                                                                           |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             The Service Provider establishes <code>serviceId</code> while enabling the Partner’s service and      |                                                   
|                    |         |              |             reports it to the Partner.                                                                            |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |     </details>                                                                                                    |
+--------------------+---------+--------------+-------------------------------------------------------------------------------------------------------------------+
| pass               | yes     | string       | Password for authorization in the service.                                                                        |
|                    |         |              |                                                                                                                   |
|                    |         |              | .. raw:: html                                                                                                     |
|                    |         |              |                                                                                                                   |
|                    |         |              |     <details>                                                                                                     |
|                    |         |              |         <summary>More details</summary>                                                                           |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             The Service Provider establishes the password while enabling the service and reports it to the        |
|                    |         |              |             Partner.                                                                                              |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |     </details>                                                                                                    |
+--------------------+---------+--------------+-------------------------------------------------------------------------------------------------------------------+
| ptag               | no      | string       | Message identifier in the Partner's system.                                                                       |
|                    |         |              |                                                                                                                   |
|                    |         |              | .. raw:: html                                                                                                     |
|                    |         |              |                                                                                                                   |
|                    |         |              |     <details>                                                                                                     |
|                    |         |              |         <summary>More details</summary>                                                                           |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |            It may contain from 1 to 50 characters.                                                                |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |            Valid characters: 0...9a...zA...Z-                                                                     |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             It may be any identifier in the Partner's system.                                                     |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |     <div class="admonition note">                                                                                 |
|                    |         |              |         <p class="admonition-title">Note</p>                                                                      |
|                    |         |              |         <p>For example, it may be the unique identifier of a message or the identifier of                         |
|                    |         |              |            subdivision, which initiates the request for sending. In contrast to the                               |
|                    |         |              |             <code>partnerMsgId</code> parameter, which is needed to control resending                             |
|                    |         |              |            and duplication, the Service Provider does not control values sent in the                              |
|                    |         |              |             <code>ptag</code> parameter (only format compliance is checked).                                      |
|                    |         |              |            </p>                                                                                                   |
|                    |         |              |     </div>                                                                                                        |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             The Service Provider optionally returns this identifier to the Partner as part of a request for       |
|                    |         |              |             receiving the message delivery status (this functionality is described in the section                 | 
|                    |         |              |             <a href="https://doc.rapporto.ru/api/eng/http_eng/eng_http_status.html">                              |
|                    |         |              |             Delivery Status Service</a>).                                                                         |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |     </details>                                                                                                    |
+--------------------+---------+--------------+-------------------------------------------------------------------------------------------------------------------+
| sending_time       | no      | string       | Local time to send a message to a subscriber.                                                                     |
|                    |         |              |                                                                                                                   |
|                    |         |              | .. raw:: html                                                                                                     |
|                    |         |              |                                                                                                                   |
|                    |         |              |     <details>                                                                                                     |
|                    |         |              |         <summary>More details</summary>                                                                           |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             Specified in the <code>hh_hh</code> format, where two hour values specify the time period in which    |
|                    |         |              |             the message should be sent.                                                                           |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |     <div class="admonition warning">                                                                              |
|                    |         |              |         <p class="admonition-title">Warning</p>                                                                   |
|                    |         |              |         <p>If the parameter is specified, then its value cannot be empty.                                         |
|                    |         |              |            </p>                                                                                                   |
|                    |         |              |     </div>                                                                                                        |
|                    |         |              |     <div class="admonition note">                                                                                 |
|                    |         |              |         <p class="admonition-title">Note</p>                                                                      |
|                    |         |              |         <p>For example, if the parameter value is                                                                 |
|                    |         |              |            <code>sending_time = 10_20</code>, the message will be sent within the period from 10:00 to 20:00      |
|                    |         |              |             local time in the time zone of the subscriber.                                                        |
|                    |         |              |            </p>                                                                                                   |
|                    |         |              |     </div>                                                                                                        |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             The time zone of the subscriber is determined <i>not</i> by actual location of the subscriber.        |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             If the Partner doesn't send the <code>time_zone</code> parameter, the time zone of the subscriber     |
|                    |         |              |              will be determined by the phone number.                                                              |                                
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             If the Partner sends the time zone in the <code>time_zone</code> parameter, the message will be       |
|                    |         |              |             sent to the subscriber according to local time of this time zone.                                     |        
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |     </details>                                                                                                    |
+--------------------+---------+--------------+-------------------------------------------------------------------------------------------------------------------+
| time_zone          | no      | string       | Time zone of the subscriber.                                                                                      |
|                    |         |              |                                                                                                                   |
|                    |         |              | .. raw:: html                                                                                                     |
|                    |         |              |                                                                                                                   |
|                    |         |              |     <details>                                                                                                     |
|                    |         |              |         <summary>More details</summary>                                                                           |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             Specified in the <code>±hh:mm</code> format. For details see                                          |
|                    |         |              |             <a href="https://www.isotc154.org/posts/2019-08-27-introduction-to-the-new-8601/">ISO 8601</a>.       |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             If the Partner sends the value time zone in this parameter, the message will be sent to the subscriber|
|                    |         |              |             according to local time of this time zone, otherwise the time zone of the subscriber will             |
|                    |         |              |             be determined by the subscriber's phone number.                                                       |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |     <div class="admonition note">                                                                                 |
|                    |         |              |         <p class="admonition-title">Note</p>                                                                      |
|                    |         |              |         <p>The subscriber with the number from Khabarovsk is in Moscow. The following sending options are         |
|                    |         |              |            available:</p>                                                                                         |
|                    |         |              |             <ol>                                                                                                  |
|                    |         |              |                <li>                                                                                               |
|                    |         |              |                   <p>The values are received: <code>sending_time = 10_20</code>, <code>time_zone = +04:00</code>  |
|                    |         |              |                     (Moscow time).</p>                                                                            |
|                    |         |              |                   <p>The message will be sent within the period from 10:00 to 20:00 Moscow time.</p>              |
|                    |         |              |                </li>                                                                                              |
|                    |         |              |                <li>                                                                                               |
|                    |         |              |                   <p>The <code>sending_time = 10_20</code> value was received and the <code>time_zone</code>      |
|                    |         |              |                     parameter wasn't passed.</p>                                                                  |
|                    |         |              |                   <p>The message will be sent within the period from 10:00 to 20:00 (Khabarovsk time).</p>        |
|                    |         |              |                </li>                                                                                              |
|                    |         |              |             </ol>                                                                                                 |
|                    |         |              |     </div>                                                                                                        |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             For the zero zone it is necessary to specify a "+" or "–" sign.                                       |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             The "+" sign will be transformed into <code>%2B</code> when encoded in URL. For example, the          |
|                    |         |              |             +04:00 time zone will be sent as <code>time_zone = %2B04:00</code>.                                   |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |     </details>                                                                                                    |
+--------------------+---------+--------------+-------------------------------------------------------------------------------------------------------------------+
| source             | no      | string       | Name of the sender.                                                                                               |
|                    |         |              |                                                                                                                   |
|                    |         |              | .. raw:: html                                                                                                     |
|                    |         |              |                                                                                                                   |
|                    |         |              |     <details>                                                                                                     |
|                    |         |              |         <summary>More details</summary>                                                                           |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             The message will be sent to the subscriber from the service name specified in this parameter.         |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             This parameter is optional. If the parameter is missing in the request, the message will be sent      |
|                    |         |              |             to the subscriber from the default service name (setting on the Service Provider's side).             |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |     <div class="admonition important">                                                                            |
|                    |         |              |         <p class="admonition-title">Important</p>                                                                 |
|                    |         |              |         <p>This parameter is not available for the Partner by default. This feature can be activated              |
|                    |         |              |            only after approval by the Service Provider. In this case, the list of allowed senders' names          |
|                    |         |              |            is set for the Partner's service or the dynamic signature feature is activated.</p>                    |
|                    |         |              |     </div>                                                                                                        |
|                    |         |              |     </details>                                                                                                    |
+--------------------+---------+--------------+-------------------------------------------------------------------------------------------------------------------+
| output             | no      | string       | Request response format.                                                                                          |
|                    |         |              |                                                                                                                   |
|                    |         |              | .. raw:: html                                                                                                     |
|                    |         |              |                                                                                                                   |
|                    |         |              |     <details>                                                                                                     |
|                    |         |              |         <summary>More details</summary>                                                                           |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             If <code>output = xml</code>, the response to request will be formed as XML,                          |
|                    |         |              |             see <a href="https://doc.rapporto.ru/api/eng/http_eng/eng_http_vk.html#response-in-the-xml-format">   |
|                    |         |              |             Response in the XML Format</a>.                                                                       |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             If the parameter is not defined or is different, the default format is used: text/plain               |
|                    |         |              |             (see <a href="https://doc.rapporto.ru/api/eng/http_eng/eng_http_vk.html#response">                    |
|                    |         |              |             Response to the request</a>).                                                                         |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |     </details>                                                                                                    |
+--------------------+---------+--------------+-------------------------------------------------------------------------------------------------------------------+
| partnerMsgId       | no      | string       | Message unique identifier in the Partner's system.                                                                |
|                    |         |              |                                                                                                                   |
|                    |         |              | .. raw:: html                                                                                                     |
|                    |         |              |                                                                                                                   |
|                    |         |              |     <details>                                                                                                     |
|                    |         |              |         <summary>More details</summary>                                                                           |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             Allowed length: from 1 to 50 characters.                                                              |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             This parameter is required for resending and duplicate control. The Partner can send a request to send|
|                    |         |              |             a message several times with the same <code>partnerMsgId</code>.                                      |
|                    |         |              |                                                                                                                   |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             In this case:                                                                                         |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |         <ul>                                                                                                      |
|                    |         |              |             <li>the message will be sent to the subscriber only once (when the first request is received);</li>   |
|                    |         |              |             <li>in responses to requests the Service Provider will return to the Partner the same message         |
|                    |         |              |                 identifier in the Service Provider system (the same that was sent for the first request).</li>    |
|                    |         |              |         </ul>                                                                                                     |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             The Service Provider as an option returns this identifier to the Partner as part of the request       |
|                    |         |              |             for receiving the message delivery status (see section                                                |
|                    |         |              |             <a href="https://doc.rapporto.ru/api/eng/http_eng/eng_http_status.html">Delivery Status Service</a>). |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             This parameter is not available by default. To enable this functionality, please coordinate with      |
|                    |         |              |             your manager.                                                                                         |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |     </details>                                                                                                    |
+--------------------+---------+--------------+-------------------------------------------------------------------------------------------------------------------+
| shortenLinks       | no      | boolean      | Parameter specifies whether to shorten links in the message text.                                                 |
|                    |         |              |                                                                                                                   |
|                    |         |              | .. raw:: html                                                                                                     |
|                    |         |              |                                                                                                                   |
|                    |         |              |     <details>                                                                                                     |
|                    |         |              |         <summary>More details</summary>                                                                           |
|                    |         |              |     <div class="admonition important">                                                                            |    
|                    |         |              |         <p class="admonition-title">Important</p>                                                                 |
|                    |         |              |         <p>It is used for single messages only.</p>                                                               |
|                    |         |              |     </div>                                                                                                        |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             If cascade resending, you need to use the <code>shorten_list</code> parameter  (see                   |
|                    |         |              |             <a href="https://doc.rapporto.ru/api/eng/http_eng/eng_http_cascade.html">                             |
|                    |         |              |             Cascading Message Sending</a>).                                                                       |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |     <div class="admonition important">                                                                            |
|                    |         |              |         <p class="admonition-title">Important</p>                                                                 |
|                    |         |              |         <p>This option is not available by default. The activation of this functionality should be agreed with    |
|                    |         |              |            your manager.</p>                                                                                      |                                                                          
|                    |         |              |     </div>                                                                                                        |
|                    |         |              |         <p>                                                                                                       |
|                    |         |              |             For more details: see                                                                                 |
|                    |         |              |             <a href="https://doc.rapporto.ru/api/eng/http_eng/eng_http_short_link.html">                          |
|                    |         |              |             Link Shortening Service</a>.                                                                          |
|                    |         |              |         </p>                                                                                                      |
|                    |         |              |     </details>                                                                                                    |
+--------------------+---------+--------------+-------------------------------------------------------------------------------------------------------------------+



.. _VK engОтвет на запрос:

Response 
-----------------

| After receiving and processing the request, the Service Provider synchronously returns the response to the Partner. 
| By default, the response from the Service Provider comes in the :abbr:`text/plain (Simple text)` format.
| The response can be generated in :abbr:`XML (Xtensible Markup Language)` format (optionally). 


.. raw:: html

   <div class="admonition note">
       <p class="admonition-title">Note</p>
       <p>The Service Provider sends messages to subscribers only if the request is successfully processed.</p>
   </div>                                                                           

Successful Sending 
~~~~~~~~~~~~~~~~~~~~~~~

In case of successful processing of the request the Service Provider returns to the Partner:

* HTTP code ``200 OK``; 
* the ID of the message in the Service Provider's system. 

.. tabs::

    .. tab:: Response example

        .. code-block:: 

               OK
               4095284974


    .. tab:: Response parameters

        +---------------+-----------------------------------------------------------+-----------------------------------------------------------+
        | Response Code | Description                                               | Possible Partner's action                                 |
        +===============+===========================================================+===========================================================+
        | 200           | | Successful processing of the request.                   | Common action with the service.                           |
        |               | | In the body of the response, the identifier assigned    |                                                           |
        |               |   to the message by the Service Provider is transmitted.  |                                                           |
        |               | | The identifier is a 64-bit positive integer.            |                                                           |
        +---------------+-----------------------------------------------------------+-----------------------------------------------------------+


.. _vКод-ош-при-отпр-запроса:

Sending Errors
~~~~~~~~~~~~~~~~~~

When sending an incorrect request, a short text error message may be transmitted in the response body.

.. tabs::

    .. tab:: Response example

        An example of an error response -- invalid *serviceId/pass* combination:

        .. code-block::

                Invalid password


    .. tab:: Error codes when sending the request

        +---------------+-----------------------------------------------------------+------------------------------------------------------------------------------------+
        | Response Code | Description                                               | Possible Partner's action                                                          |
        +===============+===========================================================+====================================================================================+
        | 400           | Mandatory parameters are unavailable or they are set      | .. raw:: html                                                                      |
        |               | incorrectly.                                              |                                                                                    |
        |               |                                                           |     <details>                                                                      |
        |               | .. raw:: html                                             |         <summary>Troubleshooting</summary>                                         |
        |               |                                                           |         <p>                                                                        |
        |               |    <details>                                              |             Please repeat the request with the correct combination of parameters   |
        |               |        <summary>More details</summary>                    |             and their correct values.                                              |
        |               |                                                           |         </p>                                                                       |      
        |               |        <p>                                                |     </details>                                                                     |
        |               |            For example, the <code>message</code>          |                                                                                    |
        |               |            parameter is not set (where it's needed).      |                                                                                    |
        |               |        </p>                                               |                                                                                    |
        |               |    </details>                                             |                                                                                    |
        +---------------+-----------------------------------------------------------+------------------------------------------------------------------------------------+
        | 401           | Incorrect combination of ``serviceId`` and ``pass``.      | .. raw:: html                                                                      |
        |               |                                                           |                                                                                    |
        |               |                                                           |     <details>                                                                      |
        |               |                                                           |         <summary>Troubleshooting</summary>                                         |
        |               |                                                           |         <p>                                                                        |
        |               |                                                           |             Please repeat the request with the correct <code>serviceId</code>      |
        |               |                                                           |             and <code>pass</code>.                                                 |
        |               |                                                           |         </p>                                                                       |
        |               |                                                           |     </details>                                                                     |
        +---------------+-----------------------------------------------------------+------------------------------------------------------------------------------------+
        | 402           | The balance of paid messages has been exhausted           | .. raw:: html                                                                      |
        |               | (for Partners working on prepaid).                        |                                                                                    |
        |               |                                                           |     <details>                                                                      |
        |               |                                                           |         <summary>Troubleshooting</summary>                                         |
        |               |                                                           |         <p>                                                                        |
        |               |                                                           |             To resume sending messages, the Partner needs to make an advance       |
        |               |                                                           |             payment and contact the supervising manager.                           |
        |               |                                                           |         </p>                                                                       |
        |               |                                                           |         <p>                                                                        |
        |               |                                                           |             The Partner shouldn't repeat the request.                              |
        |               |                                                           |         </p>                                                                       |
        |               |                                                           |     </details>                                                                     |
        +---------------+-----------------------------------------------------------+------------------------------------------------------------------------------------+
        | 403           | The service with the ``serviceId`` parameter being sent   | .. raw:: html                                                                      |
        |               | is unavailable or inactive.                               |                                                                                    |
        |               |                                                           |     <details>                                                                      |
        |               |                                                           |         <summary>Troubleshooting</summary>                                         |
        |               |                                                           |         <p>                                                                        |
        |               |                                                           |             Please contact your supervising manager.                               |
        |               |                                                           |         </p>                                                                       |
        |               |                                                           |         <p>                                                                        |
        |               |                                                           |             The Partner shouldn't repeat the request.                              |
        |               |                                                           |         </p>                                                                       |
        |               |                                                           |     </details>                                                                     |
        +---------------+-----------------------------------------------------------+------------------------------------------------------------------------------------+
        | 406           | Impossible to send a message to a subscriber with         | .. raw:: html                                                                      |
        |               | ``clientId``.                                             |                                                                                    |
        |               |                                                           |     <details>                                                                      |
        |               |                                                           |         <summary>Troubleshooting</summary>                                         |
        |               |                                                           |         <p>                                                                        |
        |               |                                                           |             The Partner shouldn't repeat the request.                              |
        |               |                                                           |         </p>                                                                       |
        |               |                                                           |     </details>                                                                     |
        +---------------+-----------------------------------------------------------+------------------------------------------------------------------------------------+
        | 408           | Allowable rate of message sending is exceeded.            | .. raw:: html                                                                      |
        |               |                                                           |                                                                                    |
        |               |                                                           |     <details>                                                                      |
        |               | .. raw:: html                                             |         <summary>Troubleshooting</summary>                                         |
        |               |                                                           |         <p>                                                                        |
        |               |    <details>                                              |             The Partner can repeat the request without exceeding the allowed rate. |
        |               |        <summary>More details</summary>                    |         </p>                                                                       |
        |               |     <div class="admonition note">                         |     </details>                                                                     |
        |               |       <p class="admonition-title">Note</p>                |                                                                                    |
        |               |         <p>The Partner's service is set to a permissible  |                                                                                    |
        |               |            speed of 10 requests per second. The Partner   |                                                                                    |
        |               |            sent 12 requests per second. The first 10      |                                                                                    |
        |               |            requests will be successfully processed: in    |                                                                                    |
        |               |            response to these requests the Service Provider|                                                                                    |
        |               |            will return the <code>200</code> status and    |                                                                                    |
        |               |            send messages to subscribers. In response to   |                                                                                    |
        |               |            the last 2 requests the Service Provider will  |                                                                                    |
        |               |            return the <code>408</code> status to the      |                                                                                    |
        |               |            Partner and won`t send messages to subscribers.|                                                                                    |
        |               |            </p>                                           |                                                                                    |
        |               |      </div>                                               |                                                                                    |
        |               |    </details>                                             |                                                                                    |
        +---------------+-----------------------------------------------------------+------------------------------------------------------------------------------------+
        | 409           | Sending duplicates prohibited.                            | .. raw:: html                                                                      |
        |               |                                                           |                                                                                    |
        |               | .. raw:: html                                             |     <details>                                                                      |
        |               |                                                           |         <summary>Troubleshooting</summary>                                         |                                
        |               |    <details>                                              |         <p>                                                                        |
        |               |        <summary>More details</summary>                    |             The Partner shouldn't repeat the request.                              |                                        
        |               |     <div class="admonition note">                         |         </p>                                                                       |
        |               |       <p class="admonition-title">Note</p>                |         <p>                                                                        |
        |               |          <p>The duplicate blocking feature is activated   |             If it is necessary to send a duplicate                                 |
        |               |             for the Partner's service. During 24 hours    |             message, the Partner can contact the                                   |
        |               |             the Partner sent 3 requests to send the       |             <a href="https://doc.rapporto.ru/api/eng/eng_support.html#eng-support">|
        |               |             message with the same text to the same number.|             Technical Support Service</a> and provide it                           |
        |               |             The first request will be processed           |             with the most complete information about the                           |
        |               |             successfully and the message will be sent to  |             conditions for this situation.                                         |
        |               |             the subscriber. In response to the last 2     |         </p>                                                                       |
        |               |             requests the Service Provider will return the |      </details>                                                                    |
        |               |             <code>409</code> status and won't send these  |                                                                                    |
        |               |             2 messages to the subscriber. </p>            |                                                                                    |
        |               |     </div>                                                |                                                                                    |
        |               |        <p>                                                |                                                                                    |
        |               |            The duplicate blocking feature is deactivated  |                                                                                    |
        |               |            for the Partner by default. The feature can be |                                                                                    |
        |               |            activated by the Partner's request. The Service|                                                                                    |
        |               |            Provider can also activate the duplicate       |                                                                                    |
        |               |            blocking feature for the Partner, if necessary:|                                                                                    |
        |               |            for example, in case of subscribers complaints.|                                                                                    |
        |               |        </p>                                               |                                                                                    |
        |               |    </details>                                             |                                                                                    |
        +---------------+-----------------------------------------------------------+------------------------------------------------------------------------------------+
        | 414           | The allowed length of the message body sent in the        | .. raw:: html                                                                      |
        |               | ``message`` parameter.                                    |                                                                                    |
        |               |                                                           |     <details>                                                                      |
        |               |                                                           |         <summary>Troubleshooting</summary>                                         |
        |               |                                                           |         <p>                                                                        |
        |               |                                                           |             The Partner can repeat the request after shortening the message text   |
        |               |                                                           |             to the allowed length.                                                 |
        |               |                                                           |         </p>                                                                       |
        |               |                                                           |     </details>                                                                     |
        +---------------+-----------------------------------------------------------+------------------------------------------------------------------------------------+
        | 500           | Server internal error. Technical difficulties at the      | .. raw:: html                                                                      |
        |               | Service Provider side.                                    |                                                                                    |
        |               |                                                           |     <details>                                                                      |
        |               |                                                           |         <summary>Troubleshooting</summary>                                         |
        |               |                                                           |         <p>                                                                        |
        |               |                                                           |             When receiving the <code>500</code> status or when the timeout         |
        |               |                                                           |             of waiting for a response expires, the Partner needs to wait for at    |
        |               |                                                           |             least 1 minute. After the pause, the Partner can repeat the request.   |
        |               |                                                           |         </p>                                                                       |
        |               |                                                           |         <p>                                                                        |
        |               |                                                           |             If you receive the <code>500</code> status more than 10 times, you have|
        |               |                                                           |             to stop transmitting the request. After that, you should provide the   |
        |               |                                                           |             <a href="https://doc.rapporto.ru/api/eng/eng_support.html#eng-support">|
        |               |                                                           |             Technical Support Service</a> with the most complete information about |
        |               |                                                           |             the conditions for the occurrence of this error for further analysis.  |
        |               |                                                           |         </p>                                                                       |
        |               |                                                           |     </details>                                                                     |
        +---------------+-----------------------------------------------------------+------------------------------------------------------------------------------------+
        | 503           | The request is being currently processed.                 | .. raw:: html                                                                      |
        |               |                                                           |                                                                                    |
        |               |                                                           |     <details>                                                                      |
        |               | .. raw:: html                                             |         <summary>Troubleshooting</summary>                                         |
        |               |                                                           |         <p>                                                                        |
        |               |    <details>                                              |             The Partner should wait for a response to the first request with       |
        |               |        <summary>More details</summary>                    |             the <code>partnerMsgId</code> parameter value                          |
        |               |        <p>                                                |             sent.                                                                  |
        |               |            The error might appear if the Partner almost   |         </p>                                                                       |
        |               |            simultaneously sends several requests with     |         <p>                                                                        |
        |               |            the same <code>partnerMsgId</code>             |             The Partner can repeat the request if the first request is not         |
        |               |            value.                                         |             answered.                                                              |
        |               |        </p>                                               |         </p>                                                                       |
        |               |        <p>                                                |     </details>                                                                     |
        |               |            Until the first request is processed the       |                                                                                    |
        |               |            Service Provider will return the               |                                                                                    |
        |               |            <code>503</code> status                        |                                                                                    |
        |               |            to the Partner for all                         |                                                                                    |
        |               |            following requests with the same               |                                                                                    |
        |               |            <code>partnerMsgId</code>.                     |                                                                                    |
        |               |        </p>                                               |                                                                                    |
        |               |    </details>                                             |                                                                                    |
        +---------------+-----------------------------------------------------------+------------------------------------------------------------------------------------+



.. _VK engОтвет в формате XML:

Response in the XML Format
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

| To receive the response in :abbr:`XML (Xtensible Markup Language)` format the Partner needs to send the ``output = xml`` parameter in the body of the request.
| In this case the Service Provider synchronously responds to the request with one of the following HTTP codes:

* ``200`` — the request was successfully processed;
* ``500`` — internal server error, technical problems on the Service Provider's side.

Response Examples
^^^^^^^^^^^^^^^^^^

.. tabs::

    .. tab:: Successful sending

        | Response example in XML format in case of successful request sending (HTTP code ``200``) .
        | The description of the response content is given in "Description of XML elements" tab.

        .. code-block::

                <?xml version="1.0" encoding="utf-8"?>
                <response>
                    <code>200</code>
                    <text>OK</text>
                    <payload>
                        <id>4095284976</id>
                    </payload>
                </response>



    .. tab:: Error sending

        Response example in XML format in case of error request sending: invalid combination of ``serviceId/pass``.

        .. code-block::

                <?xml version="1.0" encoding="utf-8"?>
                <response>
                    <code>401</code>
                    <text>Invalid password</text>
                </response>

        When receiving the status ``500`` or when the timeout of waiting for a response expires, the Partner needs to wait for at least 1 minute. 
        After the pause, the Partner can repeat the request.

        .. raw:: html

          <div class="admonition note">
             <p class="admonition-title">Note</p>
            <p>When receiving the <code>500</code> status more than 10 times, the request transmitting should be stopped. After that, the Partner needs to provide 
            <a href="https://doc.rapporto.ru/api/eng/eng_support.html#eng-support">Technical Support Service</a> with the most complete information about the conditions
            for the occurrence of this error for further analysis.</p>
         </div>                                                                           


    .. tab:: Description of XML elements

        +-----------------+---------+--------------------------------------------------+------------------------------------------+
        | Name            | Required|         Description                              | Note                                     |
        +=================+=========+==================================================+==========================================+
        | xml version     | yes     | Number of XML version.                           | It is contained in the prologue of the   |
        |                 |         |                                                  | XML document.                            |
        +-----------------+---------+--------------------------------------------------+------------------------------------------+
        | encoding        | no      | Encoding.                                        | It is contained in the prologue of the   |
        |                 |         |                                                  | XML document.                            |
        +-----------------+---------+--------------------------------------------------+------------------------------------------+
        | response        | yes     | A root element. It contains                      |                                          |
        |                 |         | ``code``, ``text``, ``payload`` elements.        |                                          |
        +-----------------+---------+--------------------------------------------------+------------------------------------------+
        | code            | yes     | A response code (values correspond to HTTP codes | For more details see                     |
        |                 |         | for responses of type text/plain).               | :ref:`above. <vКод-ош-при-отпр-запроса>` |
        +-----------------+---------+--------------------------------------------------+------------------------------------------+
        | text            | no      | Additional brief textual information about       | It may contain an error information.     |
        |                 |         | the response.                                    |                                          |
        +-----------------+---------+--------------------------------------------------+------------------------------------------+
        | payload         | no      | Information about the message, contains the      | Would be sent only if the request is     |
        |                 |         | ``id`` element.                                  | performed successfully (when             |
        +-----------------+---------+--------------------------------------------------+ ``code = 200``).                         |
        | id              | no      | The identifier assigned to the message           |                                          |
        |                 |         | by the Service Provider.                         |                                          |
        |                 |         | The identifier is a 64-bit positive integer.     |                                          |
        +-----------------+---------+--------------------------------------------------+------------------------------------------+

VK message Delivery Statuses
--------------------------------------------

To receive statuses of push notifications, you need to set up the :doc:`eng_http_status`.

Delivery Error Codes
~~~~~~~~~~~~~~~~~~~~~~~

Delivery error codes for each message type are provided in the corresponding tab of the :ref:`engErrCodeDescr` section.

Moderation Rules in VK Social Network
-----------------------------------------------------

These moderation rules are applied for all message templates, which are submitted for approval for further mass messaging to end users of Mail.Ru Group projects. A sender (a company) and the text (a template) of the message are being moderated.

When checking a company, the industry to which the company belongs, the type of company, its reputation in the market are taken into account. Messages from following companies are not accepted for review:

1. Microlenders.
2. Debt collection agencies (including corresponding divisions of banks).
3. Betting offices.
4. Online casinos.
5. Jewelry stores.
6. Cigarette manufacturers.
7. Drug product manufacturers.
8. Alcohol producers.

When moderating text, the following rules apply:

1. Advertising texts are not being accepted for review. Any messages, which are addressed to any number of unspecified persons and intended for drawing attention to advertised object, formation or sustaining an interest to it or its marketing, are deemed as advertising.
2. If the template of message submitted for moderation contains both service and advertising component, it will not pass the moderation.
3. All message templates must comply with the requirements of the legislation of the Russian Federation and the legislation of the country in which the users to whom the message is addressed are located, as well as existing ethical norms and principles (templates should not contain messages that offend human dignity, promote violence, racial or national hatred, etc.).
4. Message templates should not contain information directly or indirectly compromising the Mail.Ru Group and all projects and products that are part of the group of companies. Message templates should not contain information that can advertise products that compete in price or consumer properties with services provided by projects and services of the Mail.Ru Group.
5. Message templates should contain information, which is strictly related to the interaction between the user and the owner of official group, on behalf of which the message is sent.
6. Message templates should contain information concerning only orders and/or actions of users, which were performed immediately prior to the information message sending.
7. Templates might contain URL to WEB pages and sites only after individual approval.

