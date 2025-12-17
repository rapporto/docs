Delivery Status Service
==========================
 
Delivery Report Transmission Overview
--------------------------------------------

The Service Provider transmits delivery status and read date to the Partner in separate ``deliver_sm`` packets.

If necessary, additional TLV parameters containing extended message information can be included in the ``deliver_sm`` packet.

The message delivery status is transmitted in the ``message_state`` TLV parameter.

.. raw:: html
    
    <div class="admonition important">
        <p class="admonition-title">Important</p>
        <p>As of 01/03/2023 ``DELIVRD(2)`` and ``UNDELIV(5)`` statuses are no longer transmitted for SMS messages sent to MegaFon subscribers.</p>
    </div>                                                                           

The number of message delivery reports the Service Provider sends to the Partner depends on the scenario and the configured resending mode (see :ref:`cascade_eng`). 

The table provides examples for a scenario where the *VK → SMS* sending combination is configured. 

+---------------------------------------------------------+------------------------+---------------------------------------------------------+
| Scenario                                                | Resending mode         | Notes                                                   |
+=========================================================+========================+=========================================================+
| The VK message was delivered to the subscriber and      | ``N`` — do not perform | Two reports will be sent:                               |
| then read by the subscriber within the message lifetime.| resending              |                                                         |
|                                                         |                        | 1. VK message delivered.                                |
|                                                         |                        | 2. VK message read.                                     |
+---------------------------------------------------------+------------------------+---------------------------------------------------------+
| The Service Provider did not receive any status from    | ``N`` — do not perform | No reports are sent.                                    |
| VK during the VK message's lifetime.                    | resending              |                                                         |
+---------------------------------------------------------+------------------------+---------------------------------------------------------+
| The VK message was not delivered to the subscriber      | ``N`` — do not perform | One report will be sent: VK message not delivered.      |
| (the Service Provider received an error from VK).       | resending              |                                                         |
|                                                         +------------------------+---------------------------------------------------------+
|                                                         | ``Y`` — perform        | One report will be sent: SMS message delivered          |
|                                                         | resending upon         | or not delivered.                                       |
|                                                         | receiving a            |                                                         |
|                                                         | “not delivered” status |                                                         |
+---------------------------------------------------------+------------------------+---------------------------------------------------------+ 
| The VK message was delivered to the subscriber but was  | ``S`` — the same as    | Two reports will be sent:                               |
| not read by the subscriber within the message lifetime. | ``Y``, plus perform    |                                                         |
|                                                         | resending if a “viewed”| 1. VK message delivered.                                |
|                                                         | status is not          | 2. SMS message delivered or not delivered.              |
|                                                         | received within the    |                                                         |
|                                                         | message lifetime       |                                                         |
+---------------------------------------------------------+------------------------+---------------------------------------------------------+ 



Settings for Receiving Statuses
---------------------------------

To receive message delivery status notifications, the ``registered_delivery`` = <code>1</code> parameter should be specified when sending the ``submit_sm`` packet.

The ``deliver_sm`` packet with the ``esm_class`` = <code>0x04</code> parameter is used to send delivery reports from the Service Provider's platform to the Partner's service.
The packet format complies with the SMPP 3.4 specification, Appendix B.

The number of logical parts of the message is a calculated value determined internally within the Service Provider's platform. 
Therefore, only one ``deliver_sm`` packet will be sent for each received ``submit_sm`` packet.

The number of logical parts is specified in the ``sub`` field of the ``deliver_sm`` packet. If the long message was split on the Partner's side, 
then the number of logical parts for the entire (complete) message will be specified in each ``sub`` field of the corresponding ``deliver_sm``.


Transmitted Parameters
------------------------

The table below describes parameters of the ``deliver_sm`` packet transmitted from the Service Provider to the Partner.

+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| Parameter                 | Type                     | Description                                                                                                |
+===========================+==========================+============================================================================================================+
| source_addr               | string                   | Subscriber's phone number.                                                                                 |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| dest_addr                 | string                   | Service name.                                                                                              |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| short_message             | string                   | | Read report.                                                                                             |
|                           |                          | | The delivery/read report is generated as a string:                                                       |
|                           |                          |   ``id: IIIIIIIIII sub: SSS dlvrd: DDD submit date: YYMMDDhhmm                                             |
|                           |                          |   done date: YYMMDDhhmm stat: DDDDDDD seen date: YYMMDDhhmm err: E text: ...``.                            |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| esm_class                 | string                   | Use ``esm_class`` = ``4`` when sending a delivery status notification.                                     |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+



Additional TLV Parameters
------------------------------

+---------------------------+---------------------+-------------------+-------------------+--------------------------------------------------------------------------------+
| TLV Parameters            | Field               | Octets size       | Type              | Description                                                                    |
+===========================+=====================+===================+===================+================================================================================+
| receipted_message_id      | Tag                 | 2                 | Integer           | id = 0x001E                                                                    |
|                           +---------------------+-------------------+-------------------+--------------------------------------------------------------------------------+
|                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                             |
|                           +---------------------+-------------------+-------------------+--------------------------------------------------------------------------------+
|                           | Value               | 1 – 65            | Octet String      | Message identifier on the Service Provider's side.                             |
+---------------------------+---------------------+-------------------+-------------------+--------------------------------------------------------------------------------+
| message_state             | Tag                 | 2                 | Integer           | id = 0x0427                                                                    |
|                           +---------------------+-------------------+-------------------+--------------------------------------------------------------------------------+
|                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                             |
|                           +---------------------+-------------------+-------------------+--------------------------------------------------------------------------------+
|                           | Value               | 1                 | Integer           | Message delivery status.                                                       |
|                           |                     |                   |                   |                                                                                |
|                           |                     |                   |                   | .. raw:: html                                                                  |
|                           |                     |                   |                   |                                                                                |
|                           |                     |                   |                   |     <details>                                                                  |
|                           |                     |                   |                   |         <summary>More details</summary>                                        |
|                           |                     |                   |                   |         <p>                                                                    |
|                           |                     |                   |                   |             Possible values:                                                   |                                                   
|                           |                     |                   |                   |         </p>                                                                   |
|                           |                     |                   |                   |         <ul>                                                                   |
|                           |                     |                   |                   |             <li><code>ENROUTE(1)</code> — message sent;</li>                   |                                                                              
|                           |                     |                   |                   |             <li><code>DELIVRD(2)</code> — message delivered; </li>             |                                                                             
|                           |                     |                   |                   |             <li><code>EXPIRED(3)</code> — message deleted from the queue due to|
|                           |                     |                   |                   |                 lifetime expiration;</li>                                      |
|                           |                     |                   |                   |             <li><code>DELETED(4)</code> — message deleted;</li>                |                                                                           
|                           |                     |                   |                   |             <li><code>UNDELIV(5)</code> — all other undelivered cases;</li>    |                                                                           
|                           |                     |                   |                   |             <li><code>ACCEPTD(6)</code> — message accepted by the platform for |                                                  
|                           |                     |                   |                   |                 subsequent to the subscriber;</li>                             |
|                           |                     |                   |                   |             <li><code>UNKNOWN(7)</code> — the Service Provider platform did not|                                                                              
|                           |                     |                   |                   |                  receive a response from the operator within the established   |
|                           |                     |                   |                   |                  time;</li>                                                    |
|                           |                     |                   |                   |             <li><code>REJECTD(8)</code> — message rejected during sending      |
|                           |                     |                   |                   |                  (message text failed moderation).</li>                        |
|                           |                     |                   |                   |         </ul>                                                                  |
|                           |                     |                   |                   |         <p>                                                                    |
|                           |                     |                   |                   |             If the message is read by the subscriber, the                      |   
|                           |                     |                   |                   |             </code>DELIVRD</code> status is transmitted to the Partner along   |              
|                           |                     |                   |                   |             with the additional <code>seen_date</code> TLV parameter in the    |
|                           |                     |                   |                   |             <code>YYMMDDhhmm</code> format.                                    |      
|                           |                     |                   |                   |         </p>                                                                   |
|                           |                     |                   |                   |     </details>                                                                 |
+---------------------------+---------------------+-------------------+-------------------+--------------------------------------------------------------------------------+
| message_type              | Tag                 | 2                 | Integer           | id = 0x1440                                                                    |
|                           +---------------------+-------------------+-------------------+--------------------------------------------------------------------------------+
|                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                             |
|                           +---------------------+-------------------+-------------------+--------------------------------------------------------------------------------+
|                           | Value               | 6 or 4            | Octet String      | Message type.                                                                  |
|                           |                     |                   |                   |                                                                                |
|                           |                     |                   |                   | .. raw:: html                                                                  |
|                           |                     |                   |                   |                                                                                |
|                           |                     |                   |                   |     <details>                                                                  |
|                           |                     |                   |                   |         <summary>More details</summary>                                        |
|                           |                     |                   |                   |         <p>                                                                    |
|                           |                     |                   |                   |             Possible values:                                                   |                                                   
|                           |                     |                   |                   |         </p>                                                                   |
|                           |                     |                   |                   |         <ul>                                                                   |
|                           |                     |                   |                   |             <li>VIBER;</li>                                                    |                                                                              
|                           |                     |                   |                   |             <li>VK;</li>                                                       |                                                                             
|                           |                     |                   |                   |             <li>SMS;</li>                                                      |
|                           |                     |                   |                   |             <li>FLASHINGCALL;</li>                                             |                                                                           
|                           |                     |                   |                   |             <li>PUSH.</li>                                                     |                                                                           
|                           |                     |                   |                   |         </ul>                                                                  |
|                           |                     |                   |                   |         <p>                                                                    |
|                           |                     |                   |                   |             The value ends with the 0x00 byte.                                 |                                                   
|                           |                     |                   |                   |         </p>                                                                   |
|                           |                     |                   |                   |     </details>                                                                 |
+---------------------------+---------------------+-------------------+-------------------+--------------------------------------------------------------------------------+
| seen_date                 | Tag                 | 2                 | Integer           | id = 0x1441                                                                    |
|                           +---------------------+-------------------+-------------------+--------------------------------------------------------------------------------+
|                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                             |
|                           +---------------------+-------------------+-------------------+--------------------------------------------------------------------------------+
|                           | Value               | 13                | Octet String      | Message read date in the ``YYMMDDhhmm`` format.                                |
|                           |                     |                   |                   |                                                                                |
|                           |                     |                   |                   | .. raw:: html                                                                  |
|                           |                     |                   |                   |                                                                                |
|                           |                     |                   |                   |     <details>                                                                  |
|                           |                     |                   |                   |         <summary>More details</summary>                                        |
|                           |                     |                   |                   |         <p>                                                                    |
|                           |                     |                   |                   |             The value ends with the 0x00 byte.                                 |                                                   
|                           |                     |                   |                   |         </p>                                                                   |
|                           |                     |                   |                   |     </details>                                                                 |
+---------------------------+---------------------+-------------------+-------------------+--------------------------------------------------------------------------------+
| ptag                      | Tag                 | 2                 | Integer           | id = 0x1411                                                                    |
|                           +---------------------+-------------------+-------------------+--------------------------------------------------------------------------------+
|                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                             |
|                           +---------------------+-------------------+-------------------+--------------------------------------------------------------------------------+
|                           | Value               | up to 50          | Octet String      | Message identifier in the Partner's system.                                    |
|                           |                     |                   |                   |                                                                                |
|                           |                     |                   |                   | .. raw:: html                                                                  |
|                           |                     |                   |                   |                                                                                |
|                           |                     |                   |                   |     <details>                                                                  |
|                           |                     |                   |                   |         <summary>More details</summary>                                        |
|                           |                     |                   |                   |         <p>                                                                    |
|                           |                     |                   |                   |             May contain from 1 to 50 characters.                               |  
|                           |                     |                   |                   |         </p>                                                                   |
|                           |                     |                   |                   |         <p>                                                                    |
|                           |                     |                   |                   |             Allowed characters: 0...9a...zA...Z-.                              |  
|                           |                     |                   |                   |         </p>                                                                   |     
|                           |                     |                   |                   |         <p>                                                                    |
|                           |                     |                   |                   |             It can be any identifier in the Partner's system.                  |  
|                           |                     |                   |                   |         </p>                                                                   |  
|                           |                     |                   |                   |         <p>                                                                    |
|                           |                     |                   |                   |             For example, a unique message identifier or an identifier of the   |  
|                           |                     |                   |                   |             department initiating the sending request.                         |
|                           |                     |                   |                   |         </p>                                                                   |
|                           |                     |                   |                   |         <p>                                                                    |
|                           |                     |                   |                   |             The Service Provider does not control the values passed in the     |  
|                           |                     |                   |                   |             <code>ptag</code> parameter (only format compliance is checked).   |
|                           |                     |                   |                   |         </p>                                                                   |     
|                           |                     |                   |                   |     </details>                                                                 |
+---------------------------+---------------------+-------------------+-------------------+--------------------------------------------------------------------------------+

.. _SMPP-ErrCodeDescr-eng:

Error Code Descriptions (*err* field)
-----------------------------------------

If a message is not delivered, an extended error code describing the reason for non-delivery is sent in the ``err`` field along with the undelivered status.

This section describes errors that may occur when sending different message types.

.. tabs::

    .. tab:: SMS

      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | Code    | Error Description                                                                                                                              |
      +=========+================================================================================================================================================+
      | 1       | An unknown error (to the platform) occurred during message delivery, or the operator did not provide an error in the delivery report.          |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 2       | The subscriber's device was powered off or out of network coverage throughout the duration of the message delivery attempts.                   |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 3       | The subscriber’s device is blocked, or the subscriber has message reception disabled, or the subscriber is in roaming with message             |
      |         | reception banned while roaming.                                                                                                                |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 4       | An error occurred at the transport layer of the signaling network during the delivery of the message.                                          |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 5       | The subscriber’s device memory is full.                                                                                                        |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 6       | The subscriber does not have the message receiving service subscribed.                                                                         |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 7       | The switching equipment on which the subscriber is registered is not responding.                                                               |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 8       | The subscriber's number is invalid, or the subscriber's device has been powered off for a very long period of time.                            |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 9       | The message was discarded by the platform because the duplicate message filtering mechanism was triggered.                                     |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 10      | The message was discarded by the platform because one of the message filters, such as a spam filter, was triggered.                            |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 11      | Routing error in the platform configuration.                                                                                                   |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 12      | The subscriber’s number is on the operator’s blacklist.                                                                                        |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 13      | Sending a message from a sender name that is not registered by the operator.                                                                   |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 14      | On the operator’s side, a spam filter was triggered by the message text.                                                                       |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 16      | At the time of SMS message delivery, the subscriber’s device was busy receiving or transmitting another short message.                         |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 18      | During message transmission, one or more SMS message parameters were specified incorrectly, or mandatory parameters were not specified.        |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 20      | The subscriber’s device does not accept SMS messages.                                                                                          |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 28      | The SMS message was sent to a number belonging to another mobile operator.                                                                     |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+



    .. tab:: VIBER

      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | Code    | Error Description                                                                                                                              |
      +=========+================================================================================================================================================+
      | 1       | An unknown error (to the platform) occurred during message delivery, or the operator did not provide an error in the delivery report.          |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 3       | The subscriber’s device is blocked, or the subscriber has message reception disabled, or the subscriber is in roaming with message reception   |
      |         | disabled in roaming.                                                                                                                           |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 5       | The subscriber’s device memory is full.                                                                                                        |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 6       | The subscriber does not have the message receiving service subscribed.                                                                         |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 7       | The switching equipment on which the subscriber is registered is not responding.                                                               |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 9       | The message was discarded by the platform as the duplicate message filtering mechanism was triggered.                                          |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 11      | Routing error in the platform configuration.                                                                                                   |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+


    .. tab:: VK

      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | Code    | Error Description                                                                                                                              |
      +=========+================================================================================================================================================+
      | 1       | An unknown error (to the platform) occurred during message delivery, or the operator did not provide an error in the delivery report.          |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 3       | The subscriber’s device is blocked, or the subscriber has message reception disabled, or the subscriber is in roaming with message reception   |
      |         | disabled in roaming.                                                                                                                           |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 6       | The subscriber does not have the message receiving service subscribed.                                                                         |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 10       | The message was discarded by the platform because one of the message filters, such as a spam filter, was triggered.                           |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 11      | Routing error in the platform configuration.                                                                                                   |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+

    .. tab:: PUSH

      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | Код     | Error Description                                                                                                                              |
      +=========+================================================================================================================================================+
      | 1       | An unknown error (to the platform) occurred during message delivery, or the operator did not provide an error in the delivery report.          |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 7       | The switching equipment on which the subscriber is registered is not responding.                                                               |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 8       | The subscriber's number is invalid, or the subscriber's device has been powered off for a very long period of time.                            |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 9       | The message was discarded by the platform because the duplicate message filtering mechanism was triggered.                                     |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 11      | Routing error in the platform configuration.                                                                                                   |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 13      | Sending a message from a sender name that is not registered by the operator.                                                                   |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 18      | During message transmission, one or more message parameters were specified incorrectly, or mandatory parameters were not specified.            |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 19      | No card found with the transmitted subscriber identifier.                                                                                      |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 20      | No card found with the transmitted subscriber phone number.                                                                                    |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 21      | The device is not primary. If sending was performed to the primary device (primaryOn=true).                                                    |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 22      | No active installations of the mobile application were found on the user’s device.                                                             |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 23      | The user of the mobile application has a restriction on receiving push notifications at the application level.                                 |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 24      | The user of the mobile application has a restriction on receiving push notifications at the operating system level.                            |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 25      | Subscriptions that are not configured for the user’s mobile application installation were specified when sending the message.                  |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 26      | No installation of the mobile application was found on the user’s device.                                                                      |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 27      | The application version is lower than the minimum acceptable version. This is currently relevant only for iOS.                                 |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 28      | The cloud provider (:abbr:`APNS (Apple Push Notification Service)`, :abbr:`FCM (Firebase Cloud Messaging)`,                                    |
      |         | :abbr:`HMS (Huawei Mobile Services)`, RuStore or Web Push API) used to send the notification returned an error.                                |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 31      | No installation found with the specified platform (provider).                                                                                  |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+


    .. tab:: FLASHINGCALL (VOICECODE)

      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | Code    | Error Description                                                                                                                              |
      +=========+================================================================================================================================================+
      | 1       | An unknown error (to the platform) occurred during message delivery, or the operator did not provide an error in the delivery report.          |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 2       | The subscriber's device was powered off or out of network coverage throughout the duration of the message delivery attempts.                   |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 4       | An error occurred at the transport layer of the signaling network during the delivery of the message.                                          |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 5       | The subscriber’s device memory is full.                                                                                                        |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 6       | The subscriber does not have the message receiving service subscribed.                                                                         |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 16      | The subscriber’s number is busy.                                                                                                               |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+




