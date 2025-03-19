Delivery Status Receipt Service
=========================================

Description of the service
--------------------------

The Service Provider sends a message delivery report to the Partner, transmitting it to the configured URL for sending delivery statuses. 

The URL for sending statuses is set in the integration settings when the service is connected.

Extended statuses of sent messages are available optionally. To receive extended statuses you need to contact the :ref:`technical support <support>` of the Service Provider.

Data transfer method: GET.

Interaction protocol: HTTP 1.1.

The interaction is synchronous.

The scheme of interaction:

1. The Partner sends to the Service Provider a request to send a message.
2. The Service Provider processes the request, returns the message identifier to the Partner.
3. The Service Provider processes the message – sends the message to the Operator for sending to the subscriber.
4. The Operator sends a message to the subscriber and returns the delivery status to the Service Provider.
5. The Service Provider sends a request to the Partner containing information about the message delivery status.


GET request 
--------------

.. tabs::

    .. tab:: Example of GET request

      Example of a request from a Service Provider to a Partner to receive message statuses.

      .. code-block::
           
            {
              http://partner.url?msgType=SMS&transactionId=7986985&ptag=test&status=2
            }

    .. tab:: Parameters of GET request

      The **mandatory** parameters are highlighted **in bold**.

      +---------------------+----------+---------------------------------------------------------------------------------+
      | Parameter           | Type     | Description                                                                     |
      +=====================+==========+=================================================================================+
      | msgType             | string   | | Message type.                                                                 |
      |                     |          | | Possible values:                                                              |
      |                     |          |                                                                                 |
      |                     |          | * VIBER;                                                                        |
      |                     |          | * SMS;                                                                          |
      |                     |          | * VK;                                                                           |
      |                     |          | * WHATSAPP;                                                                     |
      |                     |          | * PUSH;                                                                         |
      |                     |          | * FLASHINGCALL.                                                                 |
      +---------------------+----------+---------------------------------------------------------------------------------+
      | **transactionId**   | long     | The message identifier in the Service Provider data base, which was sent to     |
      |                     |          | the Partner in the response body for request for message sending.               |
      |                     |          |                                                                                 |
      |                     |          | It is a 64-bit positive integer.                                                |
      +---------------------+----------+---------------------------------------------------------------------------------+
      | ptag                | string   | Message identifier in the Partner's system, which was passed to the Service     |
      |                     |          | Provider in the request to send a message in the *ptag* parameter.              |
      |                     |          |                                                                                 |
      |                     |          | | Maximum length: from 1 to 50 characters.                                      |
      |                     |          | | Valid characters: 0...9a...zA...Z-                                            |  
      +---------------------+----------+---------------------------------------------------------------------------------+
      | **status**          | integer  | Message delivery status. Possible values:                                       |
      |                     |          |                                                                                 |
      |                     |          | * 0 – the message was sent to the Operator, the final status is not known yet;  |
      |                     |          | * 2 – the message is delivered;                                                 |
      |                     |          | * 5 – the message is not delivered;                                             |
      |                     |          | * 9 – the message was read (for VK, Viber, WhatsApp, PUSH).                     |
      |                     |          |                                                                                 |
      |                     |          | .. warning:: For SMS messages sent to subscribers of the Megafon operator,      |
      |                     |          |      the transmission of the statuses "Delivered" and "Undelivered" has been    |
      |                     |          |      discontinued since 01.03.2023.                                             |
      +---------------------+----------+---------------------------------------------------------------------------------+
      | partnerMsgId        | string   | The unique identifier of the message in the Partner's system, which was passed  |
      |                     |          | to the Service Provider in the request to send the message in the               |
      |                     |          | *partnerMsgId* parameter.                                                       |
      |                     |          |                                                                                 |
      |                     |          | The length of the parameter: no more than 50 characters.                        |
      +---------------------+----------+---------------------------------------------------------------------------------+
      | unifiedExtStatus    | string   | Unified extended message delivery status.                                       |
      |                     |          |                                                                                 |
      |                     |          | The error codes are described :ref:`below <engErrCodeDescr>`.                   |
      +---------------------+----------+---------------------------------------------------------------------------------+

Response to the request
------------------------

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

Description of error codes (parameter *unifiedExtStatus*)
----------------------------------------------------------

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
 
      .. tab:: Viber

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

            +----------------------------+--------------------------------------------------------------------------------+
            | Value of unifiedExtStatus  | Description of statuses                                                        | 
            +============================+================================================================================+
            | 1                          | An error unknown to the platform occurred during the the message delivery      |
            |                            | process, or the operator did not provide an error in the delivery report.      |
            +----------------------------+--------------------------------------------------------------------------------+
            | 8                          | The subscriber's phone number is incorrect, or the subscriber's phone has been |
            |                            | switched off for a very long time.                                             |
            +----------------------------+--------------------------------------------------------------------------------+
            | 9                          | The message was discarded by the platform as the function of cutting duplicate |
            |                            | messages was activated.                                                        |
            +----------------------------+--------------------------------------------------------------------------------+
            | 11                         | Routing error at the platform configuration.                                   |
            +----------------------------+--------------------------------------------------------------------------------+
            | 13                         | Sending a message from a sender's name that is not registered by the operator. |
            +----------------------------+--------------------------------------------------------------------------------+


