FlashingCall (Voice Code)
=====================================

When sending FlashingCall (Voice Code) messages via HTTP API the following restrictions apply to them:

* message text may contain up to 2000 characters;
* the text should necessarily contain a four-digit or six-digit code used to call the subscriber (otherwise the request is returned with an error *400, Invalid request, Flashing Call text should contain a 4(6)-digit code*);
* FlashingCall message lifetime – from 1 to 5 minutes.

To send **Voice Code** you need to specify the type of FlashingCall message and send a request containing the code. The specified code (without accompanying text) will be sent to the supplier, who will insert it into the text of the message template. The result of such a request will be a call to the subscriber's phone. When the subscriber picks up the phone, he will hear a voice message that will contain a 4-digit code. To connect this service please contact the Technical Support Service and agree on the text of the voice message template.


Sending Request 
------------------

POST and GET requests are allowed in the HTTP API.

Request Examples
~~~~~~~~~~~~~~~~~~~~

.. tabs::

    .. tab:: POST requests

        .. tabs::

            .. tab:: Text format

                POST request with a message in Latin “test“ in a simple text format.

                .. code-block::

                    {
                        POST /login HTTP/1.1
                        Host: 10.10.10.10:9080
                        Content-Type: application/x-www-form-urlencoded;charset=utf-8
                        Content-Length: 58
                        serviceId=login&pass=123&clientId=79161234567&message=test
                    }

            .. tab:: URL format

                POST request with the text of the message in Cyrillic “test“ in URL format.

                .. code-block::

                    {
                        POST /login HTTP/1.1
                        Host: 10.241.0.194:9080
                        Content-Type: application/x-www-form-urlencoded;charset=utf-8
                        Content-Length: 78
                        serviceId=login&pass=123&clientId=79161234567&message=%D1%82%D0%B5%D1%81%D1%82
                    }


    .. tab:: Text format

        .. tabs::

            .. tab:: Latin text

                GET request with a message in Latin “test“ in a simple text format.

                .. code-block::

                    {
                        http://partner.ru/login?clientId=79161234567&message=test&pass=123&serviceId=login
                    }

            .. tab:: Text in URL format

                GET request with the text of the message in Cyrillic “тест“ in URL format.

                .. code-block::

                    {
                        http://partner.ru/login?clientId=79161234567&message=%D1%82%D0%B5%D1%81%D1%82&pass=123&serviceId=login
                    }


Request Parameters
~~~~~~~~~~~~~~~~~~~~~~

The parameters are applicable for POST and GET requests.

The **mandatory** parameters are highlighted **in bold**.

+---------------------------+-------------------------+----------------------------------------------------------------------------------+
| Parameter                 | Type                    | Description                                                                      |
+===========================+=========================+==================================================================================+
| **clientId**              | string                  | | Subscriber's phone number, no more than 25 character.                          |
|                           |                         | | Examples: 79036550550, +79036550550, 8-903-655-05-50, 89036550550.             |
+---------------------------+-------------------------+----------------------------------------------------------------------------------+
| **message**               | string                  | | A message to send to the subscriber.                                           |
|                           |                         | | The partner must send in this parameter:                                       |
|                           |                         |                                                                                  |
|                           |                         | * for the GET method, the text must be encoded in UTF—8 while sending            |
|                           |                         |   a text message;                                                                |
|                           |                         | * for the POST method, the text must be encoded in UTF-8, which is specified     |
|                           |                         |   in the request header.                                                         |
|                           |                         |                                                                                  |
|                           |                         | | Maximum allowed message length for FlashingCall (Voice Code): 2000 characters. |
|                           |                         |                                                                                  |
|                           |                         | .. warning::                                                                     |
|                           |                         |                                                                                  |
|                           |                         |     When sending *FlashingCall* messages keep in mind that the message text must |
|                           |                         |     contain a 4- or 6-digit numeric code that is used to call the subscriber.    |
|                           |                         |     Otherwise the request is returned with an error ``400, Invalid request,      |
|                           |                         |     Flashing Call text should contain a 4-digit code.``                          |
+---------------------------+-------------------------+----------------------------------------------------------------------------------+
| **serviceId**             | string                  | An ID of the Partner’s service (login), which is used to send a message.         |
|                           |                         | The Service Provider establishes serviceId while enabling the Partner’s service  |
|                           |                         | and reports it to the Partner.                                                   |
+---------------------------+-------------------------+----------------------------------------------------------------------------------+
| **pass**                  | string                  | A password for authorization in the service. The Service Provider establishes    |
|                           |                         | the password while enabling the service and reports it to the Partner.           |
+---------------------------+-------------------------+----------------------------------------------------------------------------------+
| ptag                      | string                  | Message identifier in the Partner's system. It may contain from 1 to 50          |
|                           |                         | characters. Valid characters: 0...9a...zA...Z-                                   |
|                           |                         |                                                                                  |
|                           |                         | It may be any identifier in the Partner's system.                                |
|                           |                         |                                                                                  |
|                           |                         | .. note::                                                                        |
|                           |                         |     For example, it may be the unique identifier of message or the identifier    |
|                           |                         |     of subdivision, which initiates the request for sending. In contrast to      |
|                           |                         |     *partnerMsgId* parameter, which is needed to control resending and           |
|                           |                         |     duplication, the Service Provider does not control values sent in            |
|                           |                         |     *ptag* parameter (only format compliance is checked).                        |
|                           |                         |                                                                                  |
|                           |                         | The Service Provider optionally returns this identifier to the Partner as part   |
|                           |                         | of a request for receiving of the message delivery status (this functionality is |
|                           |                         | described in the section «Service of message delivery status receiving»)         |
|                           |                         |                                                                                  |
+---------------------------+-------------------------+----------------------------------------------------------------------------------+
| sending_time              | string                  | | Local time to send a message to a subscriber.                                  | 
|                           |                         | | Specified in the **hh_hh** format, where two hour values specify the time      |
|                           |                         |   period in which the message should be sent.                                    | 
|                           |                         |                                                                                  |
|                           |                         | .. warning:: If the parameter is specified, then its value cannot be empty.      |
|                           |                         |                                                                                  |
|                           |                         | .. note:: For example, if the parameter value is *sending_time=10_20*,           |
|                           |                         |     the message will be sent within the period from 10:00 to 20:00 local time    |
|                           |                         |     in the time zone of the subscriber.                                          |
|                           |                         |                                                                                  |
|                           |                         | | The time zone of the subscriber is determined **not** by actual location       |
|                           |                         |   of the subscriber.                                                             |
|                           |                         | | If the Partner doesn't send the *time_zone* parameter, the time zone of the    |
|                           |                         |   subscriber will be determined by the phone number.                             |
|                           |                         | | If the Partner sends the time zone in the *time_zone* parameter, the message   |
|                           |                         |   will be sent to the subscriber according to local time of this time zone.      |
+---------------------------+-------------------------+----------------------------------------------------------------------------------+
| time_zone                 | string                  | The time zone of the subscriber. Specified in the *±hh:mm* format. For details   |
|                           |                         | see `ISO 8601 <http://en.wikipedia.org/wiki/ISO_8601#Time_offsets_from_UTC>`_.   |
|                           |                         |                                                                                  |
|                           |                         | If the Partner sends the value time zone in this parameter, the message will be  |  
|                           |                         | sent to the subscriber according to local time of this time zone, otherwise the  |
|                           |                         | time zone of the subscriber will be determined by the subscriber's phone number. |
|                           |                         |                                                                                  |
|                           |                         | .. note:: The subscriber with the number from Khabarovsk is in Moscow.           |
|                           |                         |     The following sending options are available:                                 |
|                           |                         |                                                                                  |
|                           |                         |     1. The values are received: **sending_time=10_20**, **time_zone=+04:00**     |
|                           |                         |        (Moscow time).                                                            |
|                           |                         |                                                                                  |
|                           |                         |        The message will be sent within the period from 10:00 to 20:00 Moscow     |
|                           |                         |        time.                                                                     |
|                           |                         |                                                                                  |
|                           |                         |     2. The value **sending_time=10_20** was received and *time_zone* parameter   |
|                           |                         |        wasn't passed.                                                            |
|                           |                         |        The message will be sent within the period from 10:00 to 20:00 Khabarovsk |
|                           |                         |        time.                                                                     |
|                           |                         |                                                                                  |
|                           |                         | | For the zero zone it is necessary to specify a sign "+" or "-".                |
|                           |                         | | The "+" sign will be transformed into "%2B" when encoded in URL.               |
|                           |                         | | For example, the +04:00 time zone will be sent as time_zone= %2B04:00.         |
+---------------------------+-------------------------+----------------------------------------------------------------------------------+
| source                    | string                  | Name of the sender. The message will be sent to the subscriber from the service  |
|                           |                         | name specified in this parameter.                                                |
|                           |                         |                                                                                  |
|                           |                         | This parameter is optional. If the parameter is missing in the request,          |
|                           |                         | the message will be sent to the subscriber from the default service name         |
|                           |                         | (setting on the Service Provider's side).                                        |
|                           |                         |                                                                                  |
|                           |                         | .. important:: This parameter is not available for the Partner by default.       |
|                           |                         |     This feature can be activated only after approval by the Service Provider.   |
|                           |                         |     In this case, the list of allowed senders' names is set for the Partner's    |
|                           |                         |     service or the dynamic signature feature is activated.                       |
+---------------------------+-------------------------+----------------------------------------------------------------------------------+
| output                    | string                  | Request response format.                                                         |
|                           |                         |                                                                                  |
|                           |                         | If *output=xml*, the response to request will be formed as XML                   |
|                           |                         | (for details see «Response in XML format»).                                      |
|                           |                         |                                                                                  |
|                           |                         | In all other cases (the parameter is not specified or has a different value)     |
|                           |                         | the default format is used: plain-текст (for details see the section             |
|                           |                         | «Response to the request»).                                                      |
+---------------------------+-------------------------+----------------------------------------------------------------------------------+
| partnerMsgId              | string                  | The message unique identifier in the Partner's system.                           |
|                           |                         | Allowable length: from 1 to 50 characters.                                       |
|                           |                         |                                                                                  |
|                           |                         | This parameter is required for resending and duplicate control.                  |
|                           |                         | The Partner can send a request to send a message several times with the same     |
|                           |                         | *partnerMsgId*.                                                                  |
|                           |                         |                                                                                  |
|                           |                         | At that:                                                                         |
|                           |                         |                                                                                  |
|                           |                         | * the message will be sent to the subscriber only once                           |
|                           |                         |   (when the first request is received);                                          |
|                           |                         | * in responses to requests the Service Provider will return to the Partner       |
|                           |                         |   the same message identifier in the Service Provider system (the same that      |
|                           |                         |   was sent for the first request).                                               |
|                           |                         |                                                                                  | 
|                           |                         | The Service Provider as an option returns this identifier to the Partner         |
|                           |                         | as a part of the request for receiving the message delivery status (this         |
|                           |                         | functionality isdescribed in the section «Service of message delivery status     |
|                           |                         | receiving»).                                                                     |
|                           |                         | This parameter is not available by default.                                      |
|                           |                         | The connection of this functionality should be agreed with your manager.         |
+---------------------------+-------------------------+----------------------------------------------------------------------------------+



Response  
---------

| After receiving and processing the request, the Service Provider synchronously returns the response to the Partner. 
| By default, the response from the Service Provider comes in the :abbr:`text/plain (Simple text)` format.
| In agreement with the Partner, the response can be generated in :abbr:`XML (Xtensible Markup Language)` format. 


.. note:: The Service Provider sends messages to subscribers only if the request is successfully processed.


Successful Sending
~~~~~~~~~~~~~~~~~~~~~~

In case of successful processing of the request Service Provider returns to the Partner:

* HTTP code "200 OK"; 
* the ID of the message in the Service Provider's system. 

.. tabs::

    .. tab:: Response example

      .. code-block:: 

          {
               OK
               4095284974
          }


    .. tab:: Response parameters

        +---------------+-----------------------------------------------------------+-----------------------------------------------------------+
        | Response Code | Description                                               | Possible Partners' actions                                |
        +===============+===========================================================+===========================================================+
        | 200           | | Successful processing of the request.                   | Common action with the service.                           |
        |               | | In the body of the response, the identifier assigned    |                                                           |
        |               |   to the message by the Service Provider is transmitted.  |                                                           |
        |               | | The identifier is a 64-bit positive integer.            |                                                           |
        +---------------+-----------------------------------------------------------+-----------------------------------------------------------+




Sending Errors
~~~~~~~~~~~~~~~~~~~~~~

When sending an incorrect request a short text error message may be transmitted in the response body.

.. tabs::

    .. tab:: Response example

        An example of an error response -- invalid *serviceId/pass* combination:

        .. code-block::

            {
                Invalid password
            }


    .. tab:: Error codes when sending the request

        +---------------+-----------------------------------------------------------+-----------------------------------------------------------+
        | Response Code | Description                                               | Possible Partners' actions                                |
        +===============+===========================================================+===========================================================+
        | 400           | Mandatory parameters are unavailable or they are set      | Please repeat the request with the correct combination    |
        |               | incorrectly.                                              | of parameters and their correct values.                   |
        |               |                                                           |                                                           |
        |               | For example, the *message* parameter is not set           |                                                           |
        |               | (where it's needed).                                      |                                                           |
        +---------------+-----------------------------------------------------------+-----------------------------------------------------------+
        | 401           | Incorrect combination of **serviceId** and **pass**       | Please repeat the request with the correct **serviceId**  |
        |               | parameter is sent.                                        | and **pass** values.                                      |
        +---------------+-----------------------------------------------------------+-----------------------------------------------------------+
        | 402           | The balance of paid messages has been exhausted           | To resume sending messages, the Partner needs to make an  |
        |               | (for Partners working on prepaid).                        | advance payment and contact your supervising manager.     |
        |               |                                                           |                                                           |
        |               |                                                           | The Partner shouldn't repeat the request.                 |
        +---------------+-----------------------------------------------------------+-----------------------------------------------------------+
        | 403           | The service with the **serviceId** parameter being sent   | Please contact your supervising manager.                  |
        |               | is unavailable or inactive.                               |                                                           |
        |               |                                                           | The Partner shouldn't repeat the request.                 |
        +---------------+-----------------------------------------------------------+-----------------------------------------------------------+
        | 406           | Impossible to send a message to a subscriber with         | The Partner shouldn't repeat the request.                 |
        |               | **clientId** sent.                                        |                                                           |
        +---------------+-----------------------------------------------------------+-----------------------------------------------------------+
        | 408           | Allowable rate of message sending is exceeded.            | The Partner can repeat the request without exceeding      | 
        |               |                                                           | the allowed rate.                                         |
        |               | .. note:: The Partner's service is set to a permissible   |                                                           |
        |               |       speed of 10 requests per second. The Partner sent   |                                                           |
        |               |       12 requests per second. The first 10 requests will  |                                                           |
        |               |       be successfully processed: in response to these     |                                                           |
        |               |       requests the Service Provider will return the status|                                                           |
        |               |       200 and send messages to subscribers. In response   |                                                           |
        |               |       to the last 2 requests the Service Provider will    |                                                           |
        |               |       return the Partner status 408 and won`t send        |                                                           |
        |               |       messages to subscribers.                            |                                                           |
        +---------------+-----------------------------------------------------------+-----------------------------------------------------------+
        | 409           | Sending duplicates prohibited.                            | The Partner shouldn't repeat the request.                 |
        |               |                                                           |                                                           |
        |               | .. note:: The duplicate blocking feature is activated     | If it is necessary to send a duplicate message,           |
        |               |       for the Partner's service. During 24 hours the      | the Partner can contact                                   |
        |               |       Partner sent 3 requests to send the message with    | :ref:`the Technical Support <eng-support>`                |
        |               |       the same text to the same number.                   | and provide it with the most complete information         |
        |               |       The first request will be processed successfully    | about the conditions for this situation.                  |
        |               |       and the message will be sent to the subscriber. In  |                                                           |
        |               |       response to the last 2 requests Service Provider    |                                                           |
        |               |       will return 409 status and won't send these 2       |                                                           |
        |               |       messages to the subscriber.                         |                                                           |
        |               |                                                           |                                                           |
        |               | The duplicate blocking feature is deactivated for the     |                                                           |
        |               | Partner by default. The feature can be activated by the   |                                                           |
        |               | Partner's request. The Service Provider can also activate |                                                           |
        |               | the duplicate blocking feature for the Partner, if        |                                                           |
        |               | necessary: for example, in case of subscribers complaints.|                                                           |
        +---------------+-----------------------------------------------------------+-----------------------------------------------------------+
        | 414           | The allowed length of the message body sent in the        | The Partner can repeat the request after shortening the   |
        |               | **message** parameter is exceeded.                        | message text to the allowed length.                       |
        +---------------+-----------------------------------------------------------+-----------------------------------------------------------+
        | 500           | Server internal error. Technical difficulties at the      | When receiving the status 500 or when the timeout of      |
        |               | Service Provider side.                                    | waiting for a response expires, the Partner need to wait  | 
        |               |                                                           | for at least 1 minute. After the pause, the Partner can   |
        |               |                                                           | repeat the request.                                       |
        |               |                                                           |                                                           |
        |               |                                                           | If you receive 500 status more than 10 times you have to  | 
        |               |                                                           | stop transmitting the request. After that, you should     |
        |               |                                                           | transmit to :ref:`the Technical Support <eng-support>`    |
        |               |                                                           | the most complete information about the conditions for    |
        |               |                                                           | the occurrence of this error for further analysis.        |
        +---------------+-----------------------------------------------------------+-----------------------------------------------------------+
        | 503           | The request is being currently processed.                 | The Partner should wait for a response to the first       | 
        |               |                                                           | request with the **partnerMsgId** parameter value sent.   |
        |               | The error might appear if the Partner almost              |                                                           |
        |               | simultaneously sends several requests with the same value | The Partner can repeat the request if the first request   |
        |               | **partnerMsgId**.                                         | is not answered.                                          |
        |               | Until the first request is processed the Service Provider |                                                           |
        |               | will return the state 503 to the Partner for all          |                                                           |
        |               | following requests with the same **partnerMsgId**.        |                                                           |
        +---------------+-----------------------------------------------------------+-----------------------------------------------------------+



Response in the XML Format
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

| To receive the response in :abbr:`XML (Xtensible Markup Language)` format the Partner need to send the **output=xml** parameter in the body of the request.
| In this case the Service Provider synchronously responds to the request with one of the following HTTP codes:

* 200 – the request was successfully processed;
* 500 – internal server error, technical problems on the Service Provider's side.

Response Examples
^^^^^^^^^^^^^^^^^^

.. tabs::

    .. tab:: Successful sending

        | Response example in XML format in case of successful request sending (HTTP code **200**) .
        | The description of the response content is given in "XML elements" tab.

        .. code-block::

            {
                <?xml version="1.0" encoding="utf-8"?>
                <response>
                    <code>200</code>
                    <text>OK</text>
                    <payload>
                        <id>4095284976</id>
                    </payload>
                </response>
            }



    .. tab:: Error sending

        Response example in XML format in case of error request sending: invalid combination of serviceId/pass.

        .. code-block::

            {
                <?xml version="1.0" encoding="utf-8"?>
                <response>
                    <code>401</code>
                    <text>Invalid password</text>
                </response>
            }

        When receiving the status **500** or when the timeout of waiting for a response expires, the Partner needs to wait for at least 1 minute. 
        After the pause, the Partner can repeat the request.

        .. note:: When receiving the status **500** more than 10 times, the request transmitting should be stopped. 
                  After that, the Partner needs to transmit to :ref:`the Technical Support <eng-support>` the most complete information 
                  about the conditions for the occurrence of this error for further analysis.


    .. tab:: Description of XML elements

        The **mandatory** parameters are highlighted **in bold**.

        +-----------------+--------------------------------------------------+------------------------------------------+
        | Name            | Description                                      | Note                                     |
        +=================+==================================================+==========================================+
        | **xml version** | Number of XML version.                           | It is contained in the prologue of the   |
        |                 |                                                  | XML document.                            |
        +-----------------+--------------------------------------------------+------------------------------------------+
        | encoding        | Encoding.                                        | It is contained in the prologue of the   |
        |                 |                                                  | XML document.                            |
        +-----------------+--------------------------------------------------+------------------------------------------+
        | **response**    | A root element. It contains                      |                                          |
        |                 | *code*, *text*, *payload* elements.              |                                          |
        +-----------------+--------------------------------------------------+------------------------------------------+
        | **code**        | A response code (values correspond to HTTP codes | A detailed description of these codes is |
        |                 | for responses of type text/plain).               | given above in the section *“Response    |
        |                 |                                                  | to the request“*.                        |
        +-----------------+--------------------------------------------------+------------------------------------------+
        | text            | Additional brief textual information about       | It may contain an error information.     |
        |                 | the response.                                    |                                          |
        +-----------------+--------------------------------------------------+------------------------------------------+
        | payload         | Information about the message, contains the      | Transmitted only in case of a            |
        |                 | *id* element.                                    | successful request execution             |
        +-----------------+--------------------------------------------------+ (when the value is code=200).            |
        | id              | The identifier assigned to the message           |                                          |
        |                 | by the Service Provider.                         |                                          |
        |                 | The identifier is a 64-bit positive integer.     |                                          |
        +-----------------+--------------------------------------------------+------------------------------------------+






