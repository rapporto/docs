Telegram Gateway Authorization Codes
======================================

This section describes the specifics of transmitting authorization codes via the HTTP protocol to Telegram Gateway.

Currently, digital codes can only be sent via Telegram by specifying the message type as ``SMS`` in the request. The messages will then be converted to the TG format and delivered to Telegram.

The Service Provider supports:

- sending authorization code messages via Telegram Gateway;
- receiving message delivery statuses.


.. raw:: html

     <details>
         <summary>About Telegram Gateway</summary>
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
     </details>


Connection
---------------

The service is connected by the :ref:`Technical Support Service <eng-support>` of the Service Provider. 

The Partner and the Service Provider must agree on the following to connect:

- a service name for transmitting authorization codes to Telegram;
- a message lifetime.

Sending Request 
-------------------

In the request for transmitting the authorization code to Telegram, it is necessary to specify a service name that has been separately agreed upon with the :ref:`Technical Support Service <eng-support>`.

It is recommended to include parameters and values related to the ``SMS`` message type in the request.

The message must contain a code consisting of four to eight digits.

Method: GET.

Request Examples
~~~~~~~~~~~~~~~~~~~~

.. tabs::

    .. tab:: Text Format

        A GET request containing the plain text Latin message ``code 12345``:

        .. code-block::

            http://partner.ru/login?serviceId=login&pass=123&clientId=79161234567&message=code%2012345 
            HTTP/1.1
            Host: 10.10.10.10:9080

    .. tab:: URL-encoded Text

        A GET request with a Cyrillic message text ``код 12345`` in URL-encoded format:

        .. code-block::

            http://partner.ru/login?serviceId=login&pass=123&clientId=79161234567&message=%D0%BA%D0%BE%D0%B4+12345 
            HTTP/1.1
            Host: 10.10.10.10:9080


Parameters
~~~~~~~~~~~~~~~~~~~~~~

+--------------------+---------+--------------+----------------------------------------------------------------------------------------------------+
| Parameter          | Required| Type         | Description                                                                                        |
+====================+=========+==============+====================================================================================================+
| clientId           | yes     | string       | Subscriber's phone number, up to 25 characters.                                                    |
|                    |         |              |                                                                                                    |
|                    |         |              | .. raw:: html                                                                                      |
|                    |         |              |                                                                                                    |
|                    |         |              |     <details>                                                                                      |
|                    |         |              |         <summary>More details</summary>                                                            |
|                    |         |              |         <p>                                                                                        |
|                    |         |              |             Examples: <code>79036550550</code>, <code>+79036550550</code>,                         |                            
|                    |         |              |             <code>8-903-655-05-50</code>, <code>89036550550</code>.                                |
|                    |         |              |         </p>                                                                                       |
|                    |         |              |     </details>                                                                                     |  
+--------------------+---------+--------------+----------------------------------------------------------------------------------------------------+
| message            | yes     | string       | Message to be sent to the subscriber.                                                              |
|                    |         |              |                                                                                                    |
|                    |         |              | .. raw:: html                                                                                      |
|                    |         |              |                                                                                                    |
|                    |         |              |     <details>                                                                                      |
|                    |         |              |         <summary>More details</summary>                                                            |
|                    |         |              |         <p>                                                                                        |
|                    |         |              |             It contains a code consisting of four to eight digits.                                 |
|                    |         |              |         </p>                                                                                       |
|                    |         |              |         <p>                                                                                        |
|                    |         |              |             The text in this parameter must be UTF-8 encoded.                                      |
|                    |         |              |         </p>                                                                                       |
|                    |         |              |         <p>                                                                                        |
|                    |         |              |              Maximum message length is 2000 characters.                                            |
|                    |         |              |         </p>                                                                                       |
|                    |         |              |     </details>                                                                                     |
+--------------------+---------+--------------+----------------------------------------------------------------------------------------------------+
| serviceId          | yes     | string       | ID of the Partner’s service (login), which is used to send a message.                              |
|                    |         |              |                                                                                                    |
|                    |         |              | .. raw:: html                                                                                      |
|                    |         |              |                                                                                                    |
|                    |         |              |     <details>                                                                                      |
|                    |         |              |         <summary>More details</summary>                                                            |
|                    |         |              |         <p>                                                                                        |
|                    |         |              |             The Service Provider establishes <code>serviceId</code> while enabling the             |                                                   
|                    |         |              |             Partner’s service and reports it to the Partner.                                       |
|                    |         |              |         </p>                                                                                       |
|                    |         |              |     </details>                                                                                     |
+--------------------+---------+--------------+----------------------------------------------------------------------------------------------------+
| pass               | yes     | string       | Password for authorization in the service.                                                         |
|                    |         |              |                                                                                                    |
|                    |         |              | .. raw:: html                                                                                      |
|                    |         |              |                                                                                                    |
|                    |         |              |     <details>                                                                                      |
|                    |         |              |         <summary>More details</summary>                                                            |
|                    |         |              |         <p>                                                                                        |
|                    |         |              |             The Service Provider establishes the password while enabling the service and reports   |
|                    |         |              |             it to the Partner.                                                                     |
|                    |         |              |         </p>                                                                                       |
|                    |         |              |     </details>                                                                                     |
+--------------------+---------+--------------+----------------------------------------------------------------------------------------------------+
| ptag               | no      | string       | Message identifier in the Partner's system.                                                        |
|                    |         |              |                                                                                                    |
|                    |         |              | .. raw:: html                                                                                      |
|                    |         |              |                                                                                                    |
|                    |         |              |     <details>                                                                                      |
|                    |         |              |         <summary>More details</summary>                                                            |
|                    |         |              |         <p>                                                                                        |
|                    |         |              |             Valid characters: 0...9a...zA...Z-                                                     |
|                    |         |              |         </p>                                                                                       |
|                    |         |              |         <p>                                                                                        |
|                    |         |              |             It may contain from 1 to 50 characters.                                                |
|                    |         |              |         </p>                                                                                       |
|                    |         |              |         <p>                                                                                        |
|                    |         |              |             It may be any identifier in the Partner's system.                                      |
|                    |         |              |         </p>                                                                                       |
|                    |         |              |     <div class="admonition note">                                                                  |
|                    |         |              |         <p class="admonition-title">Note</p>                                                       |
|                    |         |              |         <p>For example, it may be the unique identifier of a message or the identifier of          |
|                    |         |              |            subdivision, which initiates the request for sending. In contrast to the                |
|                    |         |              |             <code>partnerMsgId</code> parameter, which is needed to control resending              |
|                    |         |              |            and duplication, the Service Provider does not control values sent in the               |
|                    |         |              |             <code>ptag</code> parameter (only format compliance is checked).                       |
|                    |         |              |            </p>                                                                                    |
|                    |         |              |     </div>                                                                                         |
|                    |         |              |         <p>                                                                                        |
|                    |         |              |             The Service Provider optionally returns this identifier to the Partner as part of a    |
|                    |         |              |             request for receiving the message delivery status (this functionality is described in  | 
|                    |         |              |             the section <a href="https://doc.rapporto.ru/api/eng/http_eng/eng_http_status.html">   |
|                    |         |              |             Delivery Status Service</a>).                                                          |
|                    |         |              |         </p>                                                                                       |
|                    |         |              |     </details>                                                                                     |
+--------------------+---------+--------------+----------------------------------------------------------------------------------------------------+
| source             | yes     | string       | Service name of the sender.                                                                        |
|                    |         |              |                                                                                                    |
|                    |         |              | .. raw:: html                                                                                      |
|                    |         |              |                                                                                                    |
|                    |         |              |     <details>                                                                                      |
|                    |         |              |         <summary>More details</summary>                                                            |
|                    |         |              |         <p>                                                                                        |
|                    |         |              |             Specify a service name in the request to send an authorization code (including         |
|                    |         |              |             for the main channel in a cascading message sending). This service name must be        |
|                    |         |              |             separately agreed upon with the Technical Support Service.                             |
|                    |         |              |         </p>                                                                                       |
|                    |         |              |     </details>                                                                                     |
+--------------------+---------+--------------+----------------------------------------------------------------------------------------------------+
| output             | no      | string       | Request response format.                                                                           |
|                    |         |              |                                                                                                    |
|                    |         |              | .. raw:: html                                                                                      |
|                    |         |              |                                                                                                    |
|                    |         |              |     <details>                                                                                      |
|                    |         |              |         <summary>More details</summary>                                                            |
|                    |         |              |         <p>                                                                                        |
|                    |         |              |             If <code>output = xml</code>, the response to request will be formed as XML,           |
|                    |         |              |             see <a href="#response-in-the-xml-format">                                             |
|                    |         |              |             Response in the XML Format</a>.                                                        |
|                    |         |              |         </p>                                                                                       |
|                    |         |              |         <p>                                                                                        |
|                    |         |              |             If the parameter is not defined or is different, the default format is used: text/plain|
|                    |         |              |             (see                                                                                   | 
|                    |         |              |             <a href="#response-to-a-request-in-text-format">                                       |
|                    |         |              |             Response to a request in text format</a>).                                             |
|                    |         |              |         </p>                                                                                       |
|                    |         |              |     </details>                                                                                     |
+--------------------+---------+--------------+----------------------------------------------------------------------------------------------------+
| partnerMsgId       | no      | string       | Message unique identifier in the Partner's system.                                                 |
|                    |         |              |                                                                                                    |
|                    |         |              | .. raw:: html                                                                                      |
|                    |         |              |                                                                                                    |
|                    |         |              |     <details>                                                                                      |
|                    |         |              |         <summary>More details</summary>                                                            |
|                    |         |              |         <p>                                                                                        |
|                    |         |              |             Allowed length: from 1 to 50 characters.                                               |
|                    |         |              |         </p>                                                                                       |
|                    |         |              |         <p>                                                                                        |
|                    |         |              |             This parameter is required for resending and duplicate control. The Partner can send   |
|                    |         |              |             a request to send a message several times with the same <code>partnerMsgId</code>.     |
|                    |         |              |         </p>                                                                                       |
|                    |         |              |         <p>                                                                                        |
|                    |         |              |             In this case:                                                                          |
|                    |         |              |         </p>                                                                                       |
|                    |         |              |         <ul>                                                                                       |
|                    |         |              |             <li>the message will be sent to the subscriber only once (when the first request is    |
|                    |         |              |             received);</li>                                                                        |
|                    |         |              |             <li>in responses to requests the Service Provider will return to the Partner the       |
|                    |         |              |                 same message identifier in the Service Provider system (the same that was sent     |
|                    |         |              |                 for the first request).</li>                                                       |
|                    |         |              |         </ul>                                                                                      |
|                    |         |              |         <p>                                                                                        |
|                    |         |              |             The Service Provider as an option returns this identifier to the Partner as part of    |
|                    |         |              |             the request for receiving the message delivery status (see section                     |
|                    |         |              |             <a href="https://doc.rapporto.ru/api/eng/http_eng/eng_http_status.html"                |
|                    |         |              |             >Delivery Status Service</a>).                                                         |
|                    |         |              |         </p>                                                                                       |
|                    |         |              |         <p>                                                                                        |
|                    |         |              |             This parameter is not available by default. To enable this functionality,              |
|                    |         |              |             please coordinate with your manager.                                                   |                                        
|                    |         |              |         </p>                                                                                       |
|                    |         |              |     </details>                                                                                     |
+--------------------+---------+--------------+----------------------------------------------------------------------------------------------------+
| smsPriority        | no      | integer      | Parameter indicates the priority of the message.                                                   |
|                    |         |              |                                                                                                    |
|                    |         |              | .. raw:: html                                                                                      |
|                    |         |              |                                                                                                    |
|                    |         |              |     <details>                                                                                      |
|                    |         |              |         <summary>More details</summary>                                                            |
|                    |         |              |         <p>                                                                                        |
|                    |         |              |             Messages with a higher priority are sent to the operator first.                        |
|                    |         |              |         </p>                                                                                       |
|                    |         |              |         <p>                                                                                        |
|                    |         |              |             Possible values:                                                                       |
|                    |         |              |         </p>                                                                                       |
|                    |         |              |         <ul>                                                                                       |
|                    |         |              |             <li><code>0</code> is the lowest priority;</li>                                        |
|                    |         |              |             <li><code>1</code> is a normal priority;</li>                                          |
|                    |         |              |             <li><code>2</code> is a high priority.</li>                                            |
|                    |         |              |         </ul>                                                                                      |
|                    |         |              |         <p>                                                                                        |
|                    |         |              |             This parameter is not available by default. The connection of this functionality       |
|                    |         |              |             should be agreed with your supervising manager.                                        |
|                    |         |              |         </p>                                                                                       |
|                    |         |              |     </details>                                                                                     |
+--------------------+---------+--------------+----------------------------------------------------------------------------------------------------+




.. _tg-codes-Ответ на запрос-eng:

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

.. _tg-codes-Ответ-на-запрос-text-eng:

Response to a request in text format
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Successful Sending
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When sending an incorrect request, a short text error message may be transmitted in the response body.

.. tabs::

    .. tab:: Response example

        An example of an error response -- invalid  ``serviceId/pass`` combination:

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



Response in the XML Format
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

| To receive the response in :abbr:`XML (Xtensible Markup Language)` format the Partner needs to send the ``output = xml`` parameter in the body of the request.
| In this case the Service Provider synchronously responds to the request with one of the following HTTP codes:

* ``200`` — the request was successfully processed;
* ``500`` — internal server error, technical problems on the Service Provider's side.

Response Examples
^^^^^^^^^^^^^^^^^^

.. tabs::

    .. tab:: Successful sending

        Response example in XML format in case of successful request sending (HTTP code ``200``) .

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
            

        When receiving the ``500`` status or when the timeout of waiting for a response expires, the Partner needs to wait for at least 1 minute. 
        After the pause, the Partner can repeat the request.

        .. raw:: html

          <div class="admonition note">
             <p class="admonition-title">Note</p>
            <p>When receiving the <code>500</code> status more than 10 times, the request transmitting should be stopped. After that, the Partner needs to provide 
            <a href="https://doc.rapporto.ru/api/eng/eng_support.html#eng-support">Technical Support Service</a> with the most complete information about the conditions
            for the occurrence of this error for further analysis.</p>
         </div>                                                                           


    .. tab::  Description of XML elements
        +-----------------+---------+--------------------------------------------------+-------------------------------------------+
        | Name            | Required|         Description                              | Note                                      |
        +=================+=========+==================================================+===========================================+
        | xml version     | yes     | Number of XML version.                           | It is contained in the prologue of the    |
        |                 |         |                                                  | XML document.                             |
        +-----------------+---------+--------------------------------------------------+-------------------------------------------+
        | encoding        | no      | Encoding.                                        | It is contained in the prologue of the    |
        |                 |         |                                                  | XML document.                             |
        +-----------------+---------+--------------------------------------------------+-------------------------------------------+
        | response        | yes     | A root element. It contains                      |                                           |
        |                 |         | ``code``, ``text``, ``payload`` elements.        |                                           |
        +-----------------+---------+--------------------------------------------------+-------------------------------------------+
        | code            | yes     | A response code (values correspond to HTTP codes | For more details see                      |
        |                 |         | for responses of type text/plain).               | :ref:`Response to a request in text format|
        |                 |         |                                                  | <tg-codes-Ответ-на-запрос-text-eng>`.     |
        +-----------------+---------+--------------------------------------------------+-------------------------------------------+
        | text            | no      | Additional brief textual information about       | It may contain error information.         |
        |                 |         | the response.                                    |                                           |
        +-----------------+---------+--------------------------------------------------+-------------------------------------------+
        | payload         | no      | Information about the message, contains the      | Would be sent only if the request is      |
        |                 |         | ``id`` element.                                  | performed successfully (when              |
        +-----------------+---------+--------------------------------------------------+ ``code = 200``).                          |
        | id              | no      | The identifier assigned to the message           |                                           |
        |                 |         | by the Service Provider.                         |                                           |
        |                 |         | The identifier is a 64-bit positive integer.     |                                           |
        +-----------------+---------+--------------------------------------------------+-------------------------------------------+



Delivery Statuses
----------------------------

To receive message statuses, you need to set up the :doc:`eng_http_status`.

Delivery Error Codes
~~~~~~~~~~~~~~~~~~~~~~~

Delivery error codes for each message type are provided in the corresponding tab of the :ref:`engErrCodeDescr` section.


Cascading Message Sending
--------------------------

Cascading message sendin for delivering authorization codes via the HTTP protocol is not available (:ref:`Типы-сообщений-в-каскаде-eng`). 

