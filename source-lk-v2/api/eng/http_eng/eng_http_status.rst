Delivery Status Service
============================

Service Setup 
-----------------

The Service Provider sends a message delivery report to the Partner's URL configured to send delivery statuses. 

The URL for statuses is set in the integration settings when enabling the service.

The message delivery status is returned in the ``status`` parameter.

.. raw:: html
    
    <div class="admonition important">
        <p class="admonition-title">Important</p>
        <p>
        For SMS messages sent to subscribers of the MegaFon operator, the reporting of statuses 2 (delivered) and 5 (undelivered) has been discontinued since March 1, 2023.
        </p>
    </div>                                                                           


Extended statuses of sent messages are available optionally. To receive extended statuses you need to contact the :ref:`the Technical Support <eng-support>`.

HTTP method: GET.

Interaction protocol: HTTP 1.1.

The interaction is synchronous.

Interaction
~~~~~~~~~~~~~~

The way of interaction:

1. The Partner sends to the Service Provider a request to send a message.
2. The Service Provider processes the request, returns the message identifier to the Partner.
3. The Service Provider processes the message — sends the message to the Operator for sending to the subscriber.
4. The Operator sends a message to the subscriber and returns the delivery status to the Service Provider.
5. The Service Provider sends a request to the Partner containing information about the message delivery status.


GET Request 
--------------

.. tabs::

    .. tab:: Example of GET request

      Example of a request from a Service Provider to a Partner to receive message statuses.

      .. code-block::
           
            {
              http://partner.url?msgType=SMS&transactionId=7986985&ptag=test&status=2
            }

    .. tab:: Parameters of GET request

      +---------------------+----------+----------+-----------------------------------------------------------------------------------------------------------------------------+
      | Parameter           | Required | Type     | Description                                                                                                                 |
      +=====================+==========+==========+=============================================================================================================================+
      | msgType             | no       | string   | Message type.                                                                                                               |
      |                     |          |          |                                                                                                                             |
      |                     |          |          | .. raw:: html                                                                                                               |
      |                     |          |          |                                                                                                                             |
      |                     |          |          |     <details>                                                                                                               |
      |                     |          |          |         <summary>More details</summary>                                                                                     |
      |                     |          |          |         <p>                                                                                                                 |
      |                     |          |          |             Possible values:                                                                                                |
      |                     |          |          |         </p>                                                                                                                |
      |                     |          |          |         <ul>                                                                                                                |
      |                     |          |          |             <li><code>VIBER</code>;</li>                                                                                    |           
      |                     |          |          |             <li><code>SMS</code>;</li>                                                                                      |
      |                     |          |          |             <li><code>VK</code>;</li>                                                                                       |
      |                     |          |          |             <li><code>WHATSAPP</code>;</li>                                                                                 |           
      |                     |          |          |             <li><code>PUSH</code>;</li>                                                                                     |
      |                     |          |          |             <li><code>FLASHINGCALL</code>.</li>                                                                             |
      |                     |          |          |         </ul>                                                                                                               |
      |                     |          |          |     </details>                                                                                                              |
      +---------------------+----------+----------+-----------------------------------------------------------------------------------------------------------------------------+
      | transactionId       | yes      | long     | Message identifier in the Service Provider database, which was sent to the Partner in the response body for request         |
      |                     |          |          | for message sending.                                                                                                        |
      |                     |          |          |                                                                                                                             |
      |                     |          |          | .. raw:: html                                                                                                               |
      |                     |          |          |                                                                                                                             |
      |                     |          |          |     <details>                                                                                                               |
      |                     |          |          |         <summary>More details</summary>                                                                                     |
      |                     |          |          |         <p>                                                                                                                 |
      |                     |          |          |             It is a 64-bit positive integer.                                                                                |
      |                     |          |          |         </p>                                                                                                                |
      |                     |          |          |     </details>                                                                                                              |
      +---------------------+----------+----------+-----------------------------------------------------------------------------------------------------------------------------+
      | ptag                | no       | string   | Message identifier in the Partner's system, which was passed to the Service Provider in the request to send                 |
      |                     |          |          | a message in the ``ptag`` parameter.                                                                                        |
      |                     |          |          |                                                                                                                             |
      |                     |          |          | .. raw:: html                                                                                                               |
      |                     |          |          |                                                                                                                             |
      |                     |          |          |     <details>                                                                                                               |
      |                     |          |          |         <summary>More details</summary>                                                                                     |
      |                     |          |          |         <p>                                                                                                                 |
      |                     |          |          |             Allowed length: from 1 to 50 characters.                                                                        |
      |                     |          |          |         </p>                                                                                                                |
      |                     |          |          |         <p>                                                                                                                 |
      |                     |          |          |             Valid characters: 0...9a...zA...Z-                                                                              |
      |                     |          |          |         </p>                                                                                                                |
      |                     |          |          |     </details>                                                                                                              | 
      +---------------------+----------+----------+-----------------------------------------------------------------------------------------------------------------------------+
      | status              | yes      | integer  | Message delivery status.                                                                                                    |
      |                     |          |          |                                                                                                                             |
      |                     |          |          | .. raw:: html                                                                                                               |
      |                     |          |          |                                                                                                                             |
      |                     |          |          |     <details>                                                                                                               |
      |                     |          |          |         <summary>More details</summary>                                                                                     |
      |                     |          |          |         <p>                                                                                                                 |
      |                     |          |          |             Possible values:                                                                                                |
      |                     |          |          |         </p>                                                                                                                |
      |                     |          |          |         <ul>                                                                                                                |
      |                     |          |          |             <li><code>0</code> — the message was sent to the Operator, the final status is not known yet;</li>              |  
      |                     |          |          |             <li><code>2</code> — the message is delivered;</li>                                                             |
      |                     |          |          |             <li><code>5</code> — the message is not delivered; </li>                                                        |
      |                     |          |          |             <li><code>9</code> — the message was read (for VK, Viber, WhatsApp, PUSH).</li>                                 |  
      |                     |          |          |         </ul>                                                                                                               |
      |                     |          |          |     </details>                                                                                                              |
      +---------------------+----------+----------+-----------------------------------------------------------------------------------------------------------------------------+
      | partnerMsgId        | no       | string   | Unique identifier of the message in the Partner's system, which was passed to the Service Provider in                       |
      |                     |          |          | the request to send the message in the ``partnerMsgId`` parameter.                                                          |
      |                     |          |          |                                                                                                                             |
      |                     |          |          | .. raw:: html                                                                                                               |
      |                     |          |          |                                                                                                                             |
      |                     |          |          |     <details>                                                                                                               |
      |                     |          |          |         <summary>More details</summary>                                                                                     |
      |                     |          |          |         <p>                                                                                                                 |
      |                     |          |          |             Maximum length: 50 characters.                                                                                  |
      |                     |          |          |         </p>                                                                                                                |
      |                     |          |          |     </details>                                                                                                              | 
      +---------------------+----------+----------+-----------------------------------------------------------------------------------------------------------------------------+
      | unifiedExtStatus    | no       | string   | Unified extended message delivery status.                                                                                   |
      |                     |          |          |                                                                                                                             |
      |                     |          |          | .. raw:: html                                                                                                               |
      |                     |          |          |                                                                                                                             |
      |                     |          |          |     <details>                                                                                                               |
      |                     |          |          |         <summary>More details</summary>                                                                                     |
      |                     |          |          |         <p>                                                                                                                 |
      |                     |          |          |             The error codes are described                                                                                   |
      |                     |          |          |             <a href="https://docs.rapporto.ru/api/eng/http_eng/eng_http_status.html#error-codes-parameter-unifiedextstatus">|
      |                     |          |          |             below</a>.                                                                                                      |
      |                     |          |          |         </p>                                                                                                                |
      |                     |          |          |     </details>                                                                                                              | 
      +---------------------+----------+----------+-----------------------------------------------------------------------------------------------------------------------------+

Response 
--------------

| The Partner must synchronously respond to the request with one of the HTTP statuses. 
| The description of the statuses, as well as the procedure for the actions of the Service Provider when receiving these statuses, are shown in the table.

+----------------------+-------------------------------------------------------------------+---------------------------------------------+
| Status               | Description                                                       | Service Provider's Action                   |
+======================+===================================================================+=============================================+
| 200                  | ОК. Successful processing of the request by the Partner.          | Final status. Regular work.                 |
+----------------------+-------------------------------------------------------------------+---------------------------------------------+
| 400                  | Incorrect values of parameters: *transactionId* or *ptag*         | The Service Provider resends the request to |
|                      | identifiers that do not exist in the Partner's database.          | the Partner according to the service        |
+----------------------+-------------------------------------------------------------------+ configuration.                              |
| 500                  | Server internal error. Technical difficulties at the Partner's    |                                             |
|                      | side.                                                             |                                             |
+----------------------+-------------------------------------------------------------------+---------------------------------------------+


.. _engErrCodeDescr:

Error codes (parameter *unifiedExtStatus*)
----------------------------------------------

This section describes the reasons for non-delivery of various types of messages.

.. tabs::

      .. tab:: FlashingCall (VoiceCode)

            +----------------------------+--------------------------------------------------------------------------------+
            | Value of unifiedExtStatus  | Description of statuses                                                        |
            +============================+================================================================================+
            | 1                          | An error unknown to the platform occurred during the the message delivery      |
            |                            | process, or the operator did not provide an error in the delivery report.      |
            +----------------------------+--------------------------------------------------------------------------------+
            | 2                          | The subscriber's device was turned off or it was out of network coverage       |
            |                            | during the entire attempt to deliver the message.                              |
            +----------------------------+--------------------------------------------------------------------------------+
            | 4                          | An error occurred at the transport layer of the signaling network during the   |
            |                            | delivery of the message.                                                       |
            +----------------------------+--------------------------------------------------------------------------------+
            | 6                          | The subscriber does not have a message receiving service activated.            |
            +----------------------------+--------------------------------------------------------------------------------+
            | 16                         | The subscriber's number is busy.                                               |
            +----------------------------+--------------------------------------------------------------------------------+

      .. tab:: SMS

            +----------------------------+--------------------------------------------------------------------------------+
            | Value of unifiedExtStatus  | Description of statuses                                                        |
            +============================+================================================================================+
            | 1                          | An error unknown to the platform occurred during the the message delivery      |
            |                            | process, or the operator did not provide an error in the delivery report.      |
            +----------------------------+--------------------------------------------------------------------------------+
            | 2                          | The subscriber's device was turned off or it was out of network coverage       |
            |                            | during the entire attempt to deliver the message.                              |
            +----------------------------+--------------------------------------------------------------------------------+
            | 3                          | The subscriber's device is blocked, either the subscriber has the ban on       |
            |                            | receiving messages enabled, or the subscriber is in roaming with the ban on    |
            |                            | receiving messages while roaming enabled.                                      |
            +----------------------------+--------------------------------------------------------------------------------+
            | 4                          | An error occurred at the transport layer of the signaling network during the   |
            |                            | delivery of the message.                                                       |
            +----------------------------+--------------------------------------------------------------------------------+
            | 5                          | The subscriber's phone memory is full.                                         |
            +----------------------------+--------------------------------------------------------------------------------+
            | 6                          | The subscriber does not have the message receiving service activated.          |
            +----------------------------+--------------------------------------------------------------------------------+
            | 7                          | The switching equipment on which the subscriber is registered isn't responding.|
            +----------------------------+--------------------------------------------------------------------------------+
            | 8                          | The subscriber's phone number is incorrect, or the subscriber's phone has been |
            |                            | switched off for a very long time.                                             |
            +----------------------------+--------------------------------------------------------------------------------+
            | 9                          | The message was discarded by the platform as the function of cutting duplicate |
            |                            | messages was activated.                                                        |
            +----------------------------+--------------------------------------------------------------------------------+
            | 10                         | The message was discarded by the platform because one of the message filters,  |
            |                            | such as a spam filter, was triggered.                                          |
            +----------------------------+--------------------------------------------------------------------------------+
            | 11                         | Routing error at the platform configuration.                                   |
            +----------------------------+--------------------------------------------------------------------------------+
            | 12                         | The subscriber's number is on the operator's blacklist.                        |
            +----------------------------+--------------------------------------------------------------------------------+
            | 13                         | Sending a message from a sender's name that is not registered by the operator. |
            +----------------------------+--------------------------------------------------------------------------------+
            | 14                         | On the operator's side, a SPAM filter was activated based on the text of the   |
            |                            | message.                                                                       |
            +----------------------------+--------------------------------------------------------------------------------+
            | 16                         | At the time of SMS message delivery, the phone was busy either receiving or    |
            |                            | transmitting another short message.                                            |
            +----------------------------+--------------------------------------------------------------------------------+
            | 18                         | When sending a message, one or more SMS message parameters were specified      |
            |                            | incorrectly, or mandatory parameters were not included.                        |
            +----------------------------+--------------------------------------------------------------------------------+
            | 20                         | The subscriber's phone does not accept SMS messages.                           |
            +----------------------------+--------------------------------------------------------------------------------+
            | 28                         | The SMS message was sent to a number belonging to another mobile operator.     |
            +----------------------------+--------------------------------------------------------------------------------+



      .. tab:: Viber

            +----------------------------+--------------------------------------------------------------------------------+
            | Value of unifiedExtStatus  | Description of statuses                                                        |
            +============================+================================================================================+
            | 1                          | An error unknown to the platform occurred during the the message delivery      |
            |                            | process, or the operator did not provide an error in the delivery report.      |
            +----------------------------+--------------------------------------------------------------------------------+
            | 2                          | The subscriber's device was turned off or it was out of network coverage       |
            |                            | during the entire attempt to deliver the message.                              |
            +----------------------------+--------------------------------------------------------------------------------+
            | 3                          | The subscriber's device is blocked, either the subscriber has the ban on       |
            |                            | receiving messages enabled, or the subscriber is in roaming with the ban on    |
            |                            | receiving messages while roaming enabled.                                      |
            +----------------------------+--------------------------------------------------------------------------------+
            | 5                          | The subscriber's phone memory is full.                                         |
            +----------------------------+--------------------------------------------------------------------------------+
            | 6                          | The subscriber does not have the message receiving service activated.          |
            +----------------------------+--------------------------------------------------------------------------------+
            | 7                          | The switching equipment on which the subscriber is registered isn't responding.|
            +----------------------------+--------------------------------------------------------------------------------+
            | 9                          | The message was discarded by the platform as the function of cutting duplicate |
            |                            | messages was activated.                                                        |
            +----------------------------+--------------------------------------------------------------------------------+
            | 11                         | Routing error at the platform configuration.                                   |
            +----------------------------+--------------------------------------------------------------------------------+

      .. tab:: VK

            +----------------------------+--------------------------------------------------------------------------------+
            | Value of unifiedExtStatus  | Description of statuses                                                        |
            +============================+================================================================================+
            | 1                          | An error unknown to the platform occurred during the the message delivery      |
            |                            | process, or the operator did not provide an error in the delivery report.      |
            +----------------------------+--------------------------------------------------------------------------------+
            | 3                          | The subscriber's device is blocked, either the subscriber has the ban on       |
            |                            | receiving messages enabled, or the subscriber is in roaming with the ban on    |
            |                            | receiving messages while roaming enabled.                                      |
            +----------------------------+--------------------------------------------------------------------------------+
            | 6                          | The subscriber does not have the message receiving service activated.          |
            +----------------------------+--------------------------------------------------------------------------------+
            | 10                         | The message was discarded by the platform because one of the message filters,  |
            |                            | such as a spam filter, was triggered.                                          |
            +----------------------------+--------------------------------------------------------------------------------+
            | 11                         | Routing error at the platform configuration.                                   | 
            +----------------------------+--------------------------------------------------------------------------------+

      .. tab:: WhatsApp

            +----------------------------+--------------------------------------------------------------------------------+
            | Value of unifiedExtStatus  | Description of statuses                                                        |
            +============================+================================================================================+
            | 3                          | The subscriber's device is blocked, either the subscriber has the ban on       |
            |                            | receiving messages enabled, or the subscriber is in roaming with the ban on    |
            |                            | receiving messages while roaming enabled.                                      |
            +----------------------------+--------------------------------------------------------------------------------+
            | 6                          | The subscriber does not have the message receiving service activated.          |
            +----------------------------+--------------------------------------------------------------------------------+
            | 7                          | The switching equipment on which the subscriber is registered isn't responding.|
            +----------------------------+--------------------------------------------------------------------------------+
            | 10                         | The message was discarded by the platform because one of the message filters,  |
            |                            | such as a spam filter, was triggered.                                          |
            +----------------------------+--------------------------------------------------------------------------------+
      
      .. tab:: Push

            +----------------------------+---------------------------------------------------------------------------------+
            | Value of unifiedExtStatus  | Description of statuses                                                         | 
            +============================+=================================================================================+
            | 1                          | An unknown platform error occurred during message delivery, or the operator     |
            |                            | did not provide an error in the delivery report.                                |
            +----------------------------+---------------------------------------------------------------------------------+
            | 7                          | The switching equipment on which the subscriber is registered is not responding.|
            +----------------------------+---------------------------------------------------------------------------------+
            | 8                          | Incorrect subscriber number, or the subscriber's phone has been turned off for  |
            |                            | a very long period of time.                                                     |
            +----------------------------+---------------------------------------------------------------------------------+
            | 9                          | The message was discarded by the platform because the duplicate message         |
            |                            | suppression mechanism was triggered.                                            |
            +----------------------------+---------------------------------------------------------------------------------+
            | 11                         | Routing error in the platform configuration.                                    |
            +----------------------------+---------------------------------------------------------------------------------+
            | 13                         | Sending a message from an unregistered sender name with the operator.           |
            +----------------------------+---------------------------------------------------------------------------------+
            | 18                         | Incorrect request parameters were specified, or mandatory parameters were not   |
            |                            | specified.                                                                      |
            +----------------------------+---------------------------------------------------------------------------------+
            | 19                         | No card found with the transmitted subscriber identifier.                       |
            +----------------------------+---------------------------------------------------------------------------------+
            | 20                         | No card found with the transmitted subscriber phone number.                     |
            +----------------------------+---------------------------------------------------------------------------------+
            | 21                         | The device is not primary. If sending was performed to the primary device       |
            |                            | (primaryOn = true).                                                             |
            +----------------------------+---------------------------------------------------------------------------------+
            | 22                         | No active installations of the mobile application were found on the user’s      |
            |                            | device.                                                                         |
            +----------------------------+---------------------------------------------------------------------------------+
            | 23                         | The user of the mobile application has a restriction on receiving push          |
            |                            | notifications at the application level.                                         |
            +----------------------------+---------------------------------------------------------------------------------+
            | 24                         | The user of the mobile application has a restriction on receiving push          |
            |                            | notifications at the operating system level.                                    | 
            +----------------------------+---------------------------------------------------------------------------------+
            | 25                         | Subscriptions that are not configured for the user's mobile application         |
            |                            | installation were specified when sending the message.                           |
            +----------------------------+---------------------------------------------------------------------------------+
            | 26                         | No installation of the mobile application was found on the user’s device.       |
            +----------------------------+---------------------------------------------------------------------------------+
            | 27                         | The application version is lower than the minimum acceptable version. This      |
            |                            | is currently relevant only for iOS.                                             |
            +----------------------------+---------------------------------------------------------------------------------+
            | 28                         | The cloud provider (:abbr:`APNS (Apple Push Notification Service)`,             |
            |                            | :abbr:`FCM (Firebase Cloud Messaging)`, :abbr:`HMS (Huawei Mobile Services)`,   | 
            |                            | RuStore, or Web Push API), through which the notification is sent, returned     |
            |                            | an error.                                                                       |
            +----------------------------+---------------------------------------------------------------------------------+
            | 31                         | No installation found with the specified platform (provider).                   |
            +----------------------------+---------------------------------------------------------------------------------+
