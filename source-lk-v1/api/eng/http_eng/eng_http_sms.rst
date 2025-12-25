SMS
=======

Acceptable data types when sending a request:

* text data are transmitted as a text SMS message;
* binary data are transmitted in the body of SMS message. 

| Lifetime of SMS messages: from 1 to 2880 minutes (no more than 48 hours).
| The message lifetime is configured on the Service Provider's side in agreement with the Partner.

Sending Request 
--------------------

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
                    

.. _engHTTP-SMS-параметры-запроса:

Request Parameters
~~~~~~~~~~~~~~~~~~~~~~

The parameters are applicable for POST and GET requests.

+---------------------------+---------+-------------------------+----------------------------------------------------------------------------------------------------+
| Parameter                 |Required | Type                    | Description                                                                                        |
+===========================+=========+=========================+====================================================================================================+
| clientId                  | yes     | string                  | Subscriber's phone number, no more than 25 characters.                                             |
|                           |         |                         |                                                                                                    |
|                           |         |                         | .. raw:: html                                                                                      |
|                           |         |                         |                                                                                                    |
|                           |         |                         |     <details>                                                                                      |
|                           |         |                         |         <summary>More details</summary>                                                            |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             Examples: <code>79036550550</code>, <code>+79036550550</code>,                         |   
|                           |         |                         |             <code>8-903-655-05-50</code>, <code>89036550550</code>.                                |                   
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |     </details>                                                                                     |
+---------------------------+---------+-------------------------+----------------------------------------------------------------------------------------------------+
| message                   | yes     | string                  | Message to send to the subscriber.                                                                 |
|                           |         |                         |                                                                                                    |
|                           |         |                         | .. raw:: html                                                                                      |
|                           |         |                         |                                                                                                    |
|                           |         |                         |     <details>                                                                                      |
|                           |         |                         |         <summary>More details</summary>                                                            |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |              The text must be encoded in UTF-8.                                                    |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             Maximum allowed message length for SMS: 2000 characters.                               |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |     </details>                                                                                     |
+---------------------------+---------+-------------------------+----------------------------------------------------------------------------------------------------+
| serviceId                 | yes     | string                  | ID of the Partner’s service (login), which is used to send a message.                              |
|                           |         |                         |                                                                                                    |
|                           |         |                         | .. raw:: html                                                                                      |
|                           |         |                         |                                                                                                    |
|                           |         |                         |     <details>                                                                                      |
|                           |         |                         |         <summary>More details</summary>                                                            |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             The Service Provider establishes <code>serviceId</code> while enabling the Partner’s   |
|                           |         |                         |             service and reports it to the Partner.                                                 |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |     </details>                                                                                     |
+---------------------------+---------+-------------------------+----------------------------------------------------------------------------------------------------+
| pass                      | yes     | string                  | Password for authorization in the service.                                                         |
|                           |         |                         |                                                                                                    |
|                           |         |                         | .. raw:: html                                                                                      |
|                           |         |                         |                                                                                                    |
|                           |         |                         |     <details>                                                                                      |
|                           |         |                         |         <summary>More details</summary>                                                            |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             The Service Provider establishes the password while enabling the service and reports   |
|                           |         |                         |              it to the Partner.                                                                    |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |     </details>                                                                                     |
+---------------------------+---------+-------------------------+----------------------------------------------------------------------------------------------------+
| ptag                      | no      | string                  | Message identifier in the Partner's system.                                                        |
|                           |         |                         |                                                                                                    |
|                           |         |                         | .. raw:: html                                                                                      |
|                           |         |                         |                                                                                                    |
|                           |         |                         |     <details>                                                                                      |
|                           |         |                         |         <summary>More details</summary>                                                            |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             It may contain from 1 to 50 characters.                                                |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             Valid characters: 0...9a...zA...Z-                                                     |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             It may be any identifier in the Partner's system.                                      |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |     <div class="admonition note">                                                                  |
|                           |         |                         |         <p class="admonition-title">Note</p>                                                       |
|                           |         |                         |         <p>For example, it may be the unique identifier of a message or the identifier of          |
|                           |         |                         |            subdivision, which initiates the request for sending. In contrast to the                |
|                           |         |                         |             <code>partnerMsgId</code> parameter, which is needed to control resending              |
|                           |         |                         |            and duplication, the Service Provider does not control values sent in the               |
|                           |         |                         |             <code>ptag</code> parameter (only format compliance is checked).                       |
|                           |         |                         |            </p>                                                                                    |
|                           |         |                         |     </div>                                                                                         |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             The Service Provider optionally returns this identifier to the Partner as part         |
|                           |         |                         |             of the request for receiving the message delivery  status (this functionality          | 
|                           |         |                         |             is described in the section                                                            |
|                           |         |                         |             <a href="https://doc.rapporto.ru/api/eng/http_eng/eng_http_status.html">               |
|                           |         |                         |             Delivery Status Service</a>).                                                          |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |     </details>                                                                                     |
+---------------------------+---------+-------------------------+----------------------------------------------------------------------------------------------------+
| sending_time              | no      | string                  | Local time to send a message to a subscriber.                                                      | 
|                           |         |                         |                                                                                                    |
|                           |         |                         | .. raw:: html                                                                                      |
|                           |         |                         |                                                                                                    |
|                           |         |                         |     <details>                                                                                      |
|                           |         |                         |         <summary>More details</summary>                                                            |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             Specified in the <code>hh_hh</code> format, where two hour values specify the time     |
|                           |         |                         |             period in which the message should be sent.                                            |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |     <div class="admonition warning">                                                               |
|                           |         |                         |         <p class="admonition-title">Warning</p>                                                    |
|                           |         |                         |         <p>If the parameter is specified, then its value cannot be empty.                          |
|                           |         |                         |            </p>                                                                                    |
|                           |         |                         |     </div>                                                                                         |
|                           |         |                         |     <div class="admonition note">                                                                  |
|                           |         |                         |         <p class="admonition-title">Note</p>                                                       |
|                           |         |                         |         <p>For example, if the parameter value is                                                  |
|                           |         |                         |            <code>sending_time = 10_20</code>, the message will be sent within                      |
|                           |         |                         |            the period from 10:00 to 20:00 local time in the time zone of the                       |
|                           |         |                         |            subscriber.                                                                             |
|                           |         |                         |            </p>                                                                                    |
|                           |         |                         |     </div>                                                                                         |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             The time zone of the subscriber is determined <i>not</i> by actual                     |
|                           |         |                         |             location of the subscriber.                                                            | 
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             If the Partner doesn't send the <code>time_zone</code> parameter,                      |
|                           |         |                         |             the time zone of the subscriber will be determined by the phone number.                |                                
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             If the Partner sends the time zone in the <code>time_zone</code>                       |
|                           |         |                         |             parameter, the message will be sent to the subscriber according to                     |        
|                           |         |                         |             local time of this time zone.                                                          |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |     </details>                                                                                     |
+---------------------------+---------+-------------------------+----------------------------------------------------------------------------------------------------+
| time_zone                 | no      | string                  | Time zone of the subscriber.                                                                       |
|                           |         |                         |                                                                                                    |
|                           |         |                         | .. raw:: html                                                                                      |
|                           |         |                         |                                                                                                    |
|                           |         |                         |     <details>                                                                                      |
|                           |         |                         |         <summary>More details</summary>                                                            |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             Specified in the <code>±hh:mm</code> format. For details see                           |
|                           |         |                         |             <a href="https://www.isotc154.org/posts/2019-08-27-introduction-to-the-new-8601/">ISO  |
|                           |         |                         |             8601</a>.                                                                              |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             If the Partner sends the value time zone in this parameter, the message will be        |
|                           |         |                         |             sent to the subscriber according to local time of this time zone, otherwise the        |
|                           |         |                         |             time zone of the subscriber will be determined by the subscriber's phone number.       |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |     <div class="admonition note">                                                                  |
|                           |         |                         |         <p class="admonition-title">Note</p>                                                       |
|                           |         |                         |         <p>The subscriber with the number from Khabarovsk is in Moscow. The following sending      |
|                           |         |                         |            options are available:</p>                                                              |
|                           |         |                         |             <ol>                                                                                   |
|                           |         |                         |                <li>                                                                                |
|                           |         |                         |                   <p>The values are received: <code>sending_time = 10_20</code>,                   |
|                           |         |                         |                    <code>time_zone = +04:00</code> (Moscow time).</p>                              |
|                           |         |                         |                   <p>The message will be sent within the period from 10:00 to 20:00 Moscow         |
|                           |         |                         |                      time.</p>                                                                     |
|                           |         |                         |                </li>                                                                               |
|                           |         |                         |                <li>                                                                                |
|                           |         |                         |                   <p>The <code>sending_time = 10_20</code> value was received and the              |
|                           |         |                         |                    <code>time_zone</code> parameter wasn't passed.</p>                             |
|                           |         |                         |                   <p>The message will be sent within the period from 10:00 to 20:00                |
|                           |         |                         |                    (Khabarovsk time).</p>                                                          |
|                           |         |                         |                </li>                                                                               |
|                           |         |                         |             </ol>                                                                                  |
|                           |         |                         |     </div>                                                                                         |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             For the zero zone it is necessary to specify a "+" or "–" sign.                        |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             The "+" sign will be transformed into <code>%2B</code> when encoded in URL. For        |
|                           |         |                         |             example, the +04:00 time zone will be sent as <code>time_zone = %2B04:00</code>.       |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |     </details>                                                                                     |
+---------------------------+---------+-------------------------+----------------------------------------------------------------------------------------------------+
| flash                     | no      | string                  | Attribute of sending Flash-SMS.                                                                    | 
|                           |         |                         |                                                                                                    |
|                           |         |                         | .. raw:: html                                                                                      |
|                           |         |                         |                                                                                                    |
|                           |         |                         |     <details>                                                                                      |
|                           |         |                         |         <summary>More details</summary>                                                            |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             If <code>flash = 1</code>, Flash-SMS will be sent to the subscriber.                   |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             If the parameter is missing or not equal to <code>1</code>, a                          |
|                           |         |                         |             common SMS message will be sent.                                                       |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             The maximum length of SMS messages with the <code>flash</code>                         |
|                           |         |                         |             attribute set:                                                                         |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |         <ul>                                                                                       |
|                           |         |                         |             <li>70 characters (for Cyrillic text);</li>                                            |
|                           |         |                         |             <li>140 characters (for unicode text).</li>                                            |
|                           |         |                         |         </ul>                                                                                      |
|                           |         |                         |     </details>                                                                                     |
+---------------------------+---------+-------------------------+----------------------------------------------------------------------------------------------------+
| source                    | no      | string                  | Service name of the sender.                                                                        |
|                           |         |                         |                                                                                                    |
|                           |         |                         | .. raw:: html                                                                                      |
|                           |         |                         |                                                                                                    |
|                           |         |                         |     <details>                                                                                      |
|                           |         |                         |         <summary>More details</summary>                                                            |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             This parameter is optional. If the parameter is missing in the request, the message    |
|                           |         |                         |             will be sent to the subscriber from the default service name (setting on the Service   |
|                           |         |                         |             Provider's side).                                                                      |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |     <div class="admonition important">                                                             |
|                           |         |                         |         <p class="admonition-title">Important</p>                                                  |
|                           |         |                         |         <p>This parameter is not available for the Partner by default.                             |
|                           |         |                         |            This feature can be activated only after approval by the Service Provider.              |
|                           |         |                         |            In this case, the list of allowed sender names is set for the Partner's service         |
|                           |         |                         |            or the dynamic signature feature is activated.</p>                                      |
|                           |         |                         |     </div>                                                                                         |
|                           |         |                         |     </details>                                                                                     |
+---------------------------+---------+-------------------------+----------------------------------------------------------------------------------------------------+
| output                    | no      | string                  | Request response format.                                                                           |
|                           |         |                         |                                                                                                    |
|                           |         |                         | .. raw:: html                                                                                      |
|                           |         |                         |                                                                                                    |
|                           |         |                         |     <details>                                                                                      |
|                           |         |                         |         <summary>More details</summary>                                                            |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             If <code>output = xml</code>, the response to request will be formed as XML,           |
|                           |         |                         |             see <a href="https://doc.rapporto.ru/api/eng/http_eng/eng_http_sms.html#sms-eng-xml">  |
|                           |         |                         |             Response in the XML Format</a>.                                                        |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             If the parameter is not defined or is different, the default format is used: text/plain|
|                           |         |                         |             (see <a href="https://doc.rapporto.ru/api/eng/http_eng/eng_http_sms.html#sms-eng">     |
|                           |         |                         |             Response to the request</a>).                                                          |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |     </details>                                                                                     |
+---------------------------+---------+-------------------------+----------------------------------------------------------------------------------------------------+
| partnerMsgId              | no      | string                  | Message unique identifier in the Partner's system.                                                 |
|                           |         |                         |                                                                                                    |
|                           |         |                         | .. raw:: html                                                                                      |
|                           |         |                         |                                                                                                    |
|                           |         |                         |     <details>                                                                                      |
|                           |         |                         |         <summary>More details</summary>                                                            |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             Allowed length: from 1 to 50 characters.                                               |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             This parameter is required for resending and duplicate control.                        |
|                           |         |                         |             The Partner can send a request to send a message several times with the same           |
|                           |         |                         |             <code>partnerMsgId</code>.                                                             |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             In this case:                                                                          |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |         <ul>                                                                                       |
|                           |         |                         |             <li>the message will be sent to the subscriber only once (when the first               |
|                           |         |                         |                 request is received);</li>                                                         |
|                           |         |                         |             <li>in responses to requests the Service Provider will return to the Partner           |
|                           |         |                         |                 the same message identifier in the Service Provider system (the same that          |
|                           |         |                         |                 was sent for the first request).</li>                                              |
|                           |         |                         |         </ul>                                                                                      |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             The Service Provider as an option returns this identifier to the Partner               |
|                           |         |                         |             as part of the request for receiving the message delivery status (see section          |
|                           |         |                         |             <a href="https://doc.rapporto.ru/api/eng/http_eng/eng_http_status.html">               |
|                           |         |                         |             Delivery Status Service</a>).                                                          |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             This parameter is not available by default. To enable this functionality, please       |
|                           |         |                         |             consult with your manager.                                                             |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |     </details>                                                                                     |
+---------------------------+---------+-------------------------+----------------------------------------------------------------------------------------------------+
| smsPriority               | no      | integer                 | Parameter indicates the priority of the message.                                                   |
|                           |         |                         |                                                                                                    |
|                           |         |                         | .. raw:: html                                                                                      |
|                           |         |                         |                                                                                                    |
|                           |         |                         |     <details>                                                                                      |
|                           |         |                         |         <summary>More details</summary>                                                            |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             Messages with a higher priority are sent to the operator first.                        |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             Possible values:                                                                       |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |         <ul>                                                                                       |
|                           |         |                         |             <li><code>0</code> is the lowest priority; </li>                                       |
|                           |         |                         |             <li><code>1</code> is a normal priority;</li>                                          |
|                           |         |                         |             <li><code>2</code> is a high priority. </li>                                           |
|                           |         |                         |         </ul>                                                                                      |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             This parameter is not available by default. The connection of this functionality       |
|                           |         |                         |             should be agreed with your supervising manager.                                        |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |     </details>                                                                                     |
+---------------------------+---------+-------------------------+----------------------------------------------------------------------------------------------------+
| shortenLinks              | no      | boolean                 | Parameter controls the automatic shortening of long links in the message.                          |
|                           |         |                         |                                                                                                    |
|                           |         |                         | .. raw:: html                                                                                      |
|                           |         |                         |                                                                                                    |
|                           |         |                         |     <details>                                                                                      |
|                           |         |                         |         <summary>More details</summary>                                                            |
|                           |         |                         |     <div class="admonition important">                                                             |    
|                           |         |                         |         <p class="admonition-title">Important</p>                                                  |
|                           |         |                         |         <p>It is used for single messages only.</p>                                                |
|                           |         |                         |     </div>                                                                                         |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             If cascade resending, you need to use the <code>shorten_list</code> parameter          |
|                           |         |                         |              (see                                                                                  |
|                           |         |                         |             <a href="https://doc.rapporto.ru/api/eng/http_eng/eng_http_cascade.html">              |
|                           |         |                         |             Cascading Message Sending</a>).                                                        |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |     <div class="admonition important">                                                             |
|                           |         |                         |         <p class="admonition-title">Important</p>                                                  |
|                           |         |                         |         <p>This option is not available by default. The connection of this functionality           |
|                           |         |                         |             should be agreed with your supervising manager.</p>                                    |                                                                          
|                           |         |                         |     </div>                                                                                         |
|                           |         |                         |         <p>                                                                                        |
|                           |         |                         |             For more details: see                                                                  |
|                           |         |                         |             <a href="https://doc.rapporto.ru/api/eng/http_eng/eng_http_short_link.html">           |
|                           |         |                         |             Link Shortening Service</a>.                                                           |
|                           |         |                         |         </p>                                                                                       |
|                           |         |                         |     </details>                                                                                     |
+---------------------------+---------+-------------------------+----------------------------------------------------------------------------------------------------+



Requests with Binary Data
------------------------------------

When transmitting binary data, a sequence of bytes in the hexadecimal number system is transmitted in the message text.

To send binary data, you need to indicate additional parameters specified in the table below.

Method: GET.

Request Examples
~~~~~~~~~~~~~~~~~~~

.. code-block::

    http://partner.ru/login?clientId=79161234567&message=0605040b8423f0dc0601ae02056a0045c60b03687474703a2f2f7761702e7A616772757A6B612e636F6D0001035A616772757A6B6155524C000101&serviceId=login&pass=123&smpp_encoding=245&smpp_esm_class=64


Parameters for binary data sending in a request 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

+------------------+---------+-------------------------+----------------------------------------------------------------------------------+
| Parameter        |Required |         Type            | Description                                                                      |
+==================+=========+=========================+==================================================================================+
| message          | yes     | string                  | Message to be sent to the subscriber.                                            |
|                  |         |                         |                                                                                  |
|                  |         |                         | .. raw:: html                                                                    |
|                  |         |                         |                                                                                  |
|                  |         |                         |     <details>                                                                    |
|                  |         |                         |         <summary>More details</summary>                                          |
|                  |         |                         |         <p>                                                                      |
|                  |         |                         |             When sending binary data, the parameter contains a sequence of bytes |
|                  |         |                         |             in hexadecimal representation (standard HEX Decimal).                |
|                  |         |                         |         </p>                                                                     |
|                  |         |                         |         <p>                                                                      |
|                  |         |                         |             Other characters in the text is unacceptable.                        |
|                  |         |                         |         </p>                                                                     |
|                  |         |                         |         <p>                                                                      |
|                  |         |                         |             To send a binary SMS message, the text must be in UTF-8 encoding.    |
|                  |         |                         |         </p>                                                                     |
|                  |         |                         |         <p>                                                                      |
|                  |         |                         |              Maximum allowed message length for SMS: 2000 characters.            |
|                  |         |                         |         </p>                                                                     |
|                  |         |                         |     </details>                                                                   |
+------------------+---------+-------------------------+----------------------------------------------------------------------------------+
| smpp_encoding    | no      | integer                 | Interpretation of data                                                           |
|                  |         |                         |                                                                                  |
|                  |         |                         | .. raw:: html                                                                    |
+------------------+---------+-------------------------+                                                                                  |
| smpp_esm_class   | no      | integer                 |     <details>                                                                    |
|                  |         |                         |         <summary>More details</summary>                                          |
|                  |         |                         |         <p>                                                                      |
|                  |         |                         |             For the correct delivery of a binary SMS message additional          |
|                  |         |                         |             parameters in the request must be transmitted that ensure the correct|
|                  |         |                         |             interpretation of the data after sending using the SMPP protocol     |
|                  |         |                         |             version 3.4.                                                         |
|                  |         |                         |         </p>                                                                     |
|                  |         |                         |         <p>                                                                      |
|                  |         |                         |             For certain types of messages, one of the parameters (or both at the |
|                  |         |                         |             same time) is specified.                                             |
|                  |         |                         |         </p>                                                                     |
|                  |         |                         |         <p>                                                                      |
|                  |         |                         |             Many of the values for these parameters are specified by SMPP version|
|                  |         |                         |             3.4.                                                                 |
|                  |         |                         |         </p>                                                                     |
|                  |         |                         |         <p>                                                                      |
|                  |         |                         |             When sending a binary message to a subscriber, the specified values  |
|                  |         |                         |             of the <code>smpp_encoding</code> and <code>smpp_esm_class</code>    |
|                  |         |                         |             parameters are put in all its parts.                                 |
|                  |         |                         |         </p>                                                                     |
|                  |         |                         |         <p>                                                                      |
|                  |         |                         |             If none of the <code>smpp_encoding</code> and                        |
|                  |         |                         |             <code>smpp_esm_class</code> parameters are specified,                |
|                  |         |                         |             the message will be processed as the text message.                   |
|                  |         |                         |         </p>                                                                     |
|                  |         |                         |     </details>                                                                   |                  
+------------------+---------+-------------------------+----------------------------------------------------------------------------------+


.. _SMS engОтвет на запрос:

Response 
------------

| After receiving and processing the request, the Service Provider synchronously returns the response to the Partner. 
| By default, the response from the Service Provider comes in the :abbr:`text/plain (Simple text)` format.
| In agreement with the Partner, the response can be generated in :abbr:`XML (Xtensible Markup Language)` format. 

.. raw:: html

   <div class="admonition note">
       <p class="admonition-title">Note</p>
       <p>The Service Provider sends messages to subscribers only if the request is successfully processed.</p>
   </div>                                                                           

.. _sms-Ответ-на-запрос-text-eng:

Response in the Text Format
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Successful Sending 
^^^^^^^^^^^^^^^^^^^^^^^

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




Sending Errors 
^^^^^^^^^^^^^^^^^^^^

When sending an incorrect request, a short text error message may be transmitted in the response body.

.. tabs::

    .. tab:: Response example

        An example of an error response -- invalid ``serviceId/pass`` combination:

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
        |               |             the Partner sent 3 requests to send the       |             the technical support service of the Service Provider                  |
        |               |             message with the same text to the same number.|             and provide it with the most complete information about                |
        |               |             The first request will be processed           |             the conditions for this situation.                                     |
        |               |             successfully and the message will be sent to  |         </p>                                                                       |
        |               |             the subscriber. In response to the last 2     |      </details>                                                                    |
        |               |             requests the Service Provider will return the |                                                                                    |
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



.. _SMS engОтвет в формате XML:

Response in the XML Format
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

| To receive the response in :abbr:`XML (Xtensible Markup Language)` format the Partner needs to send the ``output = ml`` parameter in the body of the request.
| In this case, the Service Provider synchronously responds to the request with one of the following HTTP codes:

* ``200`` — the request was successfully processed;
* ``500`` — internal server error, technical problems on the Service Provider's side.

Response Examples
^^^^^^^^^^^^^^^^^^

.. tabs::

    .. tab:: Successful sending

        Response example in XML format in case of successful request sending (HTTP code ``200``).

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

        Response example in XML format in case of error request sending: invalid combination of serviceId/pass.

        .. code-block::

                <?xml version="1.0" encoding="utf-8"?>
                <response>
                    <code>401</code>
                    <text>Invalid password</text>
                </response>

        When receiving the ``500`` status or when the timeout of waiting for a response expires, the Partner needs to wait for at least 1 minute. 
        After the pause, the Partner can repeat the request.

        .. raw:: html

          <div class="admonition note">
             <p class="admonition-title">Note</p>
            <p>When receiving the <code>500</code> status  more than 10 times, the request transmitting should be stopped. After that, the Partner needs to provide the
            <a href="https://doc.rapporto.ru/api/eng/eng_support.html#eng-support">Technical Support Service</a> with the most complete information about the conditions
            for the occurrence of this error for further analysis.</p>
         </div>                                                                           


    .. tab:: Description of XML elements

        +-----------------+---------+--------------------------------------------------+------------------------------------------+
        | Name            |Required |        Description                               | Note                                     |
        +=================+=========+==================================================+==========================================+
        | xml version     | yes     | Number of XML version.                           | It is contained in the prologue of the   |
        |                 |         |                                                  | XML document.                            |
        +-----------------+---------+--------------------------------------------------+------------------------------------------+
        | encoding        | no      | Encoding.                                        | It is contained in the prologue of the   |
        |                 |         |                                                  | XML document.                            |
        +-----------------+---------+--------------------------------------------------+------------------------------------------+
        | response        | yes     | A root element. It contains the                  |                                          |
        |                 |         | ``code``, ``text``, ``payload`` elements.        |                                          |
        +-----------------+---------+--------------------------------------------------+------------------------------------------+
        | code            | yes     | A response code (values correspond to HTTP codes | For more details see section             |
        |                 |         | for responses of type *text/plain*).             | :ref:`Response in the Text Format        |
        |                 |         |                                                  | <sms-Ответ-на-запрос-text-eng>`.         |
        +-----------------+---------+--------------------------------------------------+------------------------------------------+
        | text            | no      | Additional brief textual information about       | It may contain an error information.     |
        |                 |         | the response.                                    |                                          |
        +-----------------+---------+--------------------------------------------------+------------------------------------------+
        | payload         | no      | Information about the message, contains the      | Would be sent only if the request is     |
        |                 |         | ``id`` element.                                  | performed successfully                   |
        +-----------------+---------+--------------------------------------------------+ (when ``code = 200``).                   |
        | id              | no      | The identifier assigned to the message           |                                          |
        |                 |         | by the Service Provider.                         |                                          |
        |                 |         | The identifier is a 64-bit positive integer.     |                                          |
        +-----------------+---------+--------------------------------------------------+------------------------------------------+


SMS Delivery Statuses
--------------------------

To receive statuses of push notifications, you need to set up the :doc:`eng_http_status`.

Delivery Error Codes
~~~~~~~~~~~~~~~~~~~~~~~

Delivery error codes for each message type are provided in the corresponding tab of the :ref:`engErrCodeDescr` section.

