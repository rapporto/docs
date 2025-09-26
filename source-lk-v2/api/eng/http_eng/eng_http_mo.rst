Mobile Originated Messages
==================================

Mobile Originated message (MO message) is a message sent by a subscriber's device to the server.

To get MO messages from subscribers the Partner shall provide the Service Provider with an URL. The URL is set in the integration settings when enabling the service.

Setup
------------

To set up the service the Partner must provide the following data to the Service Provider:

* a keyword with synonyms (or a regular expression) for defining the Partner's messages;
* service name to which the service will be provided;
* URL of the Partner's service, where the interaction protocol for receiving incoming messages from the Service Provider is implemented;
* time out value – a period of time during which the Partner needs to return a response according to the exchange protocol;
* a text of a message being sent to the subscriber if the Partner's server is unavailable.

.. _engMO Взаимодействие с платформой:

Interaction with the Platform
------------------------------

| The Service Provider interacts with the Partner in one of two modes: *synchronous* or *asynchronous*. 
| The operation order for each of the modes is shown in table.

+-------+-------------------------------------------------+-----------------------------------------------------------------------------+
| Number| Synchronous Mode                                | Asynchronous Mode                                                           |
+=======+=================================================+=============================================================================+
| 1     | The subscriber sends a message to the short number of the Service Provider.                                                   |
+-------+-------------------------------------------------+-----------------------------------------------------------------------------+
| 2     | | The Service Provider sends an HTTP request to the Partner's service URL (parameters description see :ref:`below <eParams>`).| 
|       | | If the Partner's service doesn't respond to the Service Provider's requests, :ref:`the messages are re-processed.           |
|       |   <MO engПовторная обработка сообщений>`                                                                                      |
+-------+-------------------------------------------------+-----------------------------------------------------------------------------+
| 3     | The Partner processes the incoming request and  | The Partner accepts the request for processing and sends an HTTP response   |
|       | responds to it.                                 | with *204* status, which means that the Partner will respond to the         |
|       |                                                 | subscriber later.                                                           |
+-------+-------------------------------------------------+-----------------------------------------------------------------------------+
| 4     | The Service Provider processes the response and,| If it is necessary to send a response message to the subscriber,            |
|       | if necessary, sends a response message to       | the Partner uses the standard HTTP interface to send messages.              |
|       | the subscriber.                                 |                                                                             |
+-------+-------------------------------------------------+-----------------------------------------------------------------------------+

If no response from the Partner is received within the specified timeout, a message will be sent to the subscriber about the temporary unavailability of the service, and with an offer to repeat the request later.

Several separate messages may be sent in response to a single subscriber request. No messages may be sent in response to a subscriber's request in cases provided for by the service logic.

In order to provide the subscriber with the opportunity to use the service without limiting messages to keywords, the session functionality is provided (see :ref:`Sessions for SMS messages <MO engСессии для SMS-сообщений>`).


Request 
------------

Request from the Service Provider to the Partner's service.

The service provider transmits a message from the subscriber to the Partner via an HTTP request using the GET method.

.. _eParams:

.. tabs::

    .. tab:: Example of GET request

        .. code-block:: 

               {
                  http://partner.ru/service?clientId=79161234567&message=testText&connectorId=50&serviceId=login&receivedDate=2009-10-02%2012:00:00&shortNumber=0000
               }


    .. tab:: Description of the parameters
      
         The **mandatory** parameters are highlighted **in bold**.

         +-----------------------+-----------------------------+----------------------------------------------------+
         | Parameter             | Type                        | Description                                        |
         +=======================+=============================+====================================================+
         | **clientId**          | String                      | Subscriber phone number.                           |
         +-----------------------+-----------------------------+----------------------------------------------------+
         | **message**           | String                      | The text, which was sent by the subscriber, encoded|
         |                       |                             | in UTF-8. The service prefix (a template), to which|
         |                       |                             | the message refers, can be preliminary deleted     |
         |                       |                             | from the text.                                     |
         +-----------------------+-----------------------------+----------------------------------------------------+
         | **connectorId**       | integer                     | Code of the operator, through whose SMS center the |
         |                       |                             | message was received from the subscriber.          |
         +-----------------------+-----------------------------+----------------------------------------------------+
         | **serviceId**         | string                      | Identifier of the Partner's service, for which     | 
         |                       |                             | the message is addressed.                          |
         +-----------------------+-----------------------------+----------------------------------------------------+
         | **receivedDate**      | string                      | The date and time the message was received by the  |
         |                       |                             | Service Provider. Format: “YYYY-MM-DD HH:MM:SS”.   |
         +-----------------------+-----------------------------+----------------------------------------------------+
         | **shortNumber**       | string                      | Service name, to which the subscriber sent the     |
         |                       |                             | message.                                           |
         +-----------------------+-----------------------------+----------------------------------------------------+
         | **mtSent**            | integer                     | The value of the parameter is the number of        |
         |                       |                             | messages accumulated in the "Delayed" queue while  |
         |                       |                             | the Partner's service was unavailable              |
         |                       |                             | (see :ref:`Message Reprocessing.                   |
         |                       |                             | <MO engПовторная обработка сообщений>`)            |
         +-----------------------+-----------------------------+----------------------------------------------------+
         | **messageId**         | string                      | The unique identifier of the message.              |
         +-----------------------+-----------------------------+----------------------------------------------------+
         | **clientPhone**       | string                      | Subscriber phone number. Can be masked, i.e. not   |
         |                       |                             | all number digits will be sent, but last 4.        |
         |                       |                             |                                                    |
         |                       |                             | .. note:: The number masking is set according to   |
         |                       |                             |      an agreement with the PService Provider.      |
         |                       |                             |                                                    |
         |                       |                             | This parameter in some cases duplicates the        |
         |                       |                             | **clientId** parameter and is additional one.      |
         +-----------------------+-----------------------------+----------------------------------------------------+
         | **sum_sms**           | integer                     | Number of the incoming message segments.           |
         |                       |                             | The Partner can use it to keep its own billing     |
         |                       |                             | statistics.                                        |
         +-----------------------+-----------------------------+----------------------------------------------------+
         | hash                  | string                      | Encoded signature (hash). It gives the Partner     |
         |                       |                             | the ability to verify the request was actually sent|
         |                       |                             | by the Service Provider.                           |
         |                       |                             |                                                    |
         |                       |                             | The value is calculated by a string assembled from |
         |                       |                             | *clientId*, *message* and *messageId* parameters   |
         |                       |                             | put together in a row in the specified order.      |
         |                       |                             | The string is formed by taking the initial (row)   | 
         |                       |                             | parameters of the request – the full phone number, |
         |                       |                             | the original message and its identifier.           |
         |                       |                             |                                                    |
         |                       |                             | The hash parameter is calculated using the         |
         |                       |                             | HMACSHA256 algorithm, then the resulting binary    |
         |                       |                             | data is encoded into a Base64 string, which is     |
         |                       |                             | processed like a common URL parameter.             |
         |                       |                             |                                                    |
         |                       |                             | The key for hash generation is given to the Partner|
         |                       |                             | by the Service Provider. All string conversions use|
         |                       |                             | UTF-8 encoding.                                    |
         |                       |                             |                                                    |
         |                       |                             | .. note:: This feature is not available by default.|
         |                       |                             |         To enable it please contact your           |
         |                       |                             |         supervising manager.                       |
         +-----------------------+-----------------------------+----------------------------------------------------+
         | timestamp             | long                        | The number of seconds elapsed since the epoch      |
         |                       |                             | 1970-01-01T00: 00: 00Z. The value is used to       |
         |                       |                             | calculate the *token* parameter and comes with it. |
         +-----------------------+-----------------------------+----------------------------------------------------+
         | token                 | string                      | A token calculated from the *timestamp*, *clientId*|
         |                       |                             | and secret parameter *salt*, using the MD5         |
         |                       |                             | algorithm.                                         |
         |                       |                             |                                                    |
         |                       |                             | It can be used to verify the validity of a request.| 
         |                       |                             |                                                    |
         |                       |                             | .. note:: This feature is not available by default.|
         |                       |                             |         To enable it please contact your           |
         |                       |                             |         supervising manager.                       |
         +-----------------------+-----------------------------+----------------------------------------------------+


.. _MO engОтвет на запрос:

Response 
-----------

The Partner must respond to the request received from the Service Provider within the set timeout (10 seconds, unless otherwise specified separately) with one of the statuses shown in the table.

+-------------+-----------------------------------------------------------------------------------------------------+
| Status      | Description                                                                                         |
+=============+=====================================================================================================+
| 200         | ОК. The request is processed. The message text for sending to the subscriber is send in the         |
|             | response body                                                                                       |
+-------------+-----------------------------------------------------------------------------------------------------+
| 204         | No Content. The request is processed. The message is not to be sent to the subscriber.              |
|             | The message body must be empty.                                                                     |
+-------------+-----------------------------------------------------------------------------------------------------+
| 4хх, 5хх    | Error on the Partner's side. The request is not processed.                                          |
+-------------+-----------------------------------------------------------------------------------------------------+

Response Examples
~~~~~~~~~~~~~~~~~~~

Examples of the Partner's service responses to the Service Provider's request.

*Response example in case of correct operation of the service and one response message:*

.. code-block::

   HTTP/1.1 200
   Content-Length: <response length>
   Content-Type: text/plain; charset = utf-8
   Vash zapros prinyat, spasibo za uchastie.

*Response example in case of correct operation of the service and 4 response messages:*

.. code-block::

   HTTP/1.1 200
   Content-Length: <response length>
   Content-Type: text/plain; charset = utf-8
   Otvetnoe SMS nomer 1
   Otvetnoe SMS nomer 2
   Otvetnoe SMS nomer 3
   Otvetnoe SMS nomer 4

*Response example in case of incorrect operation of the service:*

.. code-block::

   HTTP/1.1 200
   Content-Length: <response length>
   Content-Type: text/plain; charset = utf-8
   Neverniy kod zaprosa, proverte i povtorite esche raz.

*Response example when no response message is sent to the client:*

.. code-block::

   HTTP/1.1 204

*Example of signaling of an internal service error on the Partner's side:*

.. code-block::

   HTTP/1.1 501
   Internal ErrorContent-Length: 31
   Content-Type: text/plain; charset= utf-8
   Unhandled error in SQL function


Successful Sending 
~~~~~~~~~~~~~~~~~~~

If the request is processed successfully and it is necessary to send a response message to the subscriber, the Partner sends the text of the response message in the body of the response to the request.

Features of generating a response to a request:

1. The response must contain the Content-Type header with indicated encoding. Possible values:

   * Content-Type: text/plain; charset = utf-8
   * Content-Type: text/plain; charset = cp1251

2. The response must contain the message text for sending to the subscriber in encoding, which is specified in the response header.
3. Several separate messages can be sent to the subscriber. Each new message is output in a new string of response and is separated by the characters sequence **<CR><LF>**.
4. If it is necessary to insert the newline character into the message text the **<CR>** symbol is used.



Sending Errors 
~~~~~~~~~~~~~~~~~~~~~~

If the response was not received from the Partner within the specified timeout, the message on the service unavailability will be sent to the subscriber (it can be set during the service registration). In case of repeated timeouts the Partner's service can be blocked.

When 4хх or 5хх statuses are received, the response from the Partner is saved in the log, but not sent to the subscriber. The subscriber might receive the error message, which was set during the service registration. In case of repeated timeouts the Partner's service can be blocked.



.. _MO engПовторная обработка сообщений:

Messages Reprocessing 
-------------------------------

If the Partner's service does not respond to the requests from the Service Provider (см. :ref:`Interaction with the platform <engMO Взаимодействие с платформой>`):

* all messages destined for this service are moved to the delayed messages queue;
* the service is marked as «down» and a period of time is set for it, within all messages received by the Service Provider and destined for this service are moved to the delayed messages queue. The period of time for which the service will be marked as «down» can be set individually for each service and equals to 20 seconds by default;
* all subscribers who have applied to a non-working service are sent a message about the unavailability of the service and a delay in the provision of services (only if this option is set for the service);
* when the period is over, the Service Provider attempts to send messages from the delayed messages queue to the Partner's service. If the service is not available again, it is marked as «down» again;
* maximum of 200 attempts to send are made for each message, after which the message will be removed from the queue.



.. _MO engСессии для SMS-сообщений:

SMS Messages Sessions
========================

Description
------------

The session feature allows the subscriber to use the service without limiting the processed messages by keywords.

The session is opened when the subscriber sends a message with the keyword to the service name. If the subscriber has sent the correct keyword, a session will be opened for him on this service name. The time interval of the active session is specified in the service configuration. Within this time interval, all messages sent by the subscriber to the given service name will be processed by the session service. All messages with a code word or messages from the session are transmitted to the Partner. In response, the subscriber receives a text provided by the Partner.

The session time extension occurs when the subscriber sends a message, if at the time of sending the message the session on the service name is active. At this point, the message may contain any text, except for the exit command from the session. The session is extended for the session activity time set in the service configuration.

The active session time expires if the subscriber has not sent any messages to the service name within the given time period. After the session activity time expires, the subscriber receives a message (optional) notifying him that the session time has expired and it will be closed. The subscriber can independently close the session. To do this, he has to send the session exit keyword. In response, the subscriber will receive a message confirming the closing of the session, and the session will be closed.

Сonnection
-----------

To make the features of the sessions enabled, the Partner has to additionally provide the manager with the following data:

* a keyword with synonyms (regular expression) to open the session;
* an indication of whether the Service Provider should respond to the subscriber's keyword when opening a session. If «yes», the Partner needs to provide the text of the message sent to the subscriber when the session is opened;
* a keyword with synonyms (regular expression) to close the session. The session closing keyword may be absent or similar for all Partner services;
* an indication of whether the Service Provider should respond to the subscriber's keyword when closing a session. If «yes», the Partner needs to provide the text of the message sent to the subscriber when the session is closed;
* the time interval during which the session will be active;
* the text of the message sent to the subscriber if the Partner's server is unavailable;
* URL of the Partner's service, where the interaction protocol is implemented to receive incoming messages from the Service Provider;
* time out value – the period of time during which the Partner needs to return a response according to the exchange protocol.


