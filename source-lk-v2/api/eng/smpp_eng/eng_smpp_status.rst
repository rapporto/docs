Delivery Status Service
==========================
 
Delivery Report Transmission Overview
--------------------------------------------

The Service Provider transmits delivery status and read date to the Partner in separate ``deliver_sm`` packets.

If necessary, additional TLV parameters containing extended message information can be included in the ``deliver_sm`` packet.

The message delivery status is transmitted in the ``message_state`` TLV parameter.

.. important:: As of 01/03/2023 ``DELIVRD(2)`` and ``UNDELIV(5)`` statuses are no longer transmitted for SMS messages sent to MegaFon subscribers.

The number of message delivery reports the Service Provider sends to the Partner depends on the scenario and the configured resending mode (see :ref:`cascade_eng`). 

The table provides examples for a scenario where the *VK → SMS* sending combination is configured. 

+---------------------------------------------------------+------------------------+---------------------------------------------------------+
| Scenario                                                | Resending mode         | Notes                                                   |
+=========================================================+========================+=========================================================+
| The VK message was delivered to the subscriber and      | ``N`` – do not perform | Two reports will be sent:                               |
| then read by the subscriber within the message lifetime.| resending              |                                                         |
|                                                         |                        | 1. VK message delivered.                                |
|                                                         |                        | 2. VK message read.                                     |
+---------------------------------------------------------+------------------------+---------------------------------------------------------+
| The Service Provider did not receive any status from    | ``N`` – do not perform | No reports are sent.                                    |
| VK during the VK message's lifetime.                    | resending              |                                                         |
+---------------------------------------------------------+------------------------+---------------------------------------------------------+
| The VK message was not delivered to the subscriber      | ``N`` – do not perform | One report will be sent: VK message not delivered.      |
| (the Service Provider received an error from VK).       | resending              |                                                         |
|                                                         +------------------------+---------------------------------------------------------+
|                                                         | ``Y`` – perform        | One report will be sent: SMS message delivered          |
|                                                         | resending upon         | or not delivered.                                       |
|                                                         | receiving a            |                                                         |
|                                                         | “not delivered” status |                                                         |
+---------------------------------------------------------+------------------------+---------------------------------------------------------+ 
| The VK message was delivered to the subscriber but was  | ``S`` – same as        | Two reports will be sent:                               |
| not read by the subscriber within the message lifetime. | ``Y``, plus perform    |                                                         |
|                                                         | resending if a “viewed”| 1. VK message delivered.                                |
|                                                         | status is not          | 2. SMS message delivered or not delivered.              |
|                                                         | received within the    |                                                         |
|                                                         | message lifetime       |                                                         |
+---------------------------------------------------------+------------------------+---------------------------------------------------------+ 



Settings for Receiving Statuses
---------------------------------

To receive message delivery status notifications, the ``registered_delivery`` = 1 parameter should be specified when sending the ``submit_sm`` packet.

The ``deliver_sm`` packet with the ``esm_class`` = 0x04 parameter is used to send delivery reports from the Service Provider's platform to the Partner's service.
The packet format complies with the SMPP 3.4 specification, Appendix B.

The number of logical parts of the message is a calculated value determined internally within the Service Provider's platform. 
Therefore, only one ``deliver_sm`` packet will be sent for each received ``submit_sm`` packet.

The number of logical parts is specified in the ``sub`` field of the ``deliver_sm`` packet. If the long message was split on the Partner's side, 
then the number of logical parts for the entire (complete) message will be specified in each ``sub`` field of the corresponding ``deliver_sm``.


Send parameters
---------------------

The table below describes parameters of the ``deliver_sm`` packet transmitted from the Service Provider to the Partner.

+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| Parameter                 | Type                     | Description                                                                                                |
+===========================+==========================+============================================================================================================+
| source_addr               | string                   | Subscriber's phone number.                                                                                 |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| dest_addr                 | string                   | Service name.                                                                                              |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| short_message             | string                   | | Read report.                                                                                             |
|                           |                          | | The delivery/read report is formatted as a string:                                                       |
|                           |                          |   ``id: IIIIIIIIII sub: SSS dlvrd: DDD submit date: YYMMDDhhmm                                             |
|                           |                          |   done date: YYMMDDhhmm stat: DDDDDDD seen date: YYMMDDhhmm err: E text: ...``.                            |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| esm_class                 | string                   | Use ``esm_class`` = 4 when sending a delivery status notification.                                         |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+



Additional TLV Parameters
------------------------------

+---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
| TLV Parameters            | Field               | Octets size       | Type              | Description                                                           |
+===========================+=====================+===================+===================+=======================================================================+
| receipted_message_id      | Tag                 | 2                 | Integer           | id = 0x001E                                                           |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Value               | 1 – 65            | Octet String      | Message identifier on the Service Provider's side.                    |
+---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
| message_state             | Tag                 | 2                 | Integer           | id = 0x0427                                                           |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Value               | 1                 | Integer           | | Message delivery status.                                            |
|                           |                     |                   |                   | | Possible values:                                                    |
|                           |                     |                   |                   |                                                                       |
|                           |                     |                   |                   | - ENROUTE(1) – message sent;                                          |
|                           |                     |                   |                   | - DELIVRD(2) – message delivered;                                     |
|                           |                     |                   |                   | - EXPIRED(3) – message deleted from the queue due to lifetime         |
|                           |                     |                   |                   |   expiration;                                                         |
|                           |                     |                   |                   | - DELETED(4) – message deleted;                                       |
|                           |                     |                   |                   | - UNDELIV(5) – all other undelivered cases;                           |
|                           |                     |                   |                   | - ACCEPTD(6) – message accepted by the platform for subsequent        | 
|                           |                     |                   |                   |   delivery to the subscriber;                                         |
|                           |                     |                   |                   | - UNKNOWN(7) –  the Service Provider platform did not receive a       | 
|                           |                     |                   |                   |   response from the operator within the established time;             |
|                           |                     |                   |                   | - REJECTD(8) – message rejected during sending                        | 
|                           |                     |                   |                   |   (message text failed moderation);                                   |
|                           |                     |                   |                   |                                                                       |
|                           |                     |                   |                   | If the message is read by the subscriber, the ``DELIVRD`` status is   |
|                           |                     |                   |                   | transmitted to the Partner along with the additional ``seen_date``    |
|                           |                     |                   |                   | TLV parameter in the “YYMMDDhhmm” format.                             |
+---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
| message_type              | Tag                 | 2                 | Integer           | id = 0x1440                                                           |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Value               | 6 or 4            | Octet String      | | Message type.                                                       |
|                           |                     |                   |                   | | Possible values:                                                    |
|                           |                     |                   |                   |                                                                       |
|                           |                     |                   |                   | - VIBER;                                                              |
|                           |                     |                   |                   | - VK;                                                                 | 
|                           |                     |                   |                   | - SMS;                                                                | 
|                           |                     |                   |                   | - FLASHINGCALL;                                                       | 
|                           |                     |                   |                   | - PUSH.                                                               |
|                           |                     |                   |                   |                                                                       |
|                           |                     |                   |                   | The value ends with the 0x00 byte.                                    |
+---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
| seen_date                 | Tag                 | 2                 | Integer           | id = 0x1441                                                           |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Value               | 13                | Octet String      | Message read date in the “YYMMDDhhmm” format.                         |
|                           |                     |                   |                   | The value ends with the 0x00 byte.                                    |
+---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
| ptag                      | Tag                 | 2                 | Integer           | id = 0x1411                                                           |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Value               | up to 50          | Octet String      | Message identifier in the Partner's system.                           |
|                           |                     |                   |                   |                                                                       |
|                           |                     |                   |                   | | May contain from 1 to 50 characters.                                |
|                           |                     |                   |                   | | Allowed characters: 0...9a...zA...Z-.                               |
|                           |                     |                   |                   | | It can be any identifier in the Partner's system.                   |
|                           |                     |                   |                   | | For example, a unique message identifier or an identifier of the    |
|                           |                     |                   |                   |   department initiating the sending request.                          |
|                           |                     |                   |                   | | The Service Provider does not control the values passed in the      |
|                           |                     |                   |                   |   ``ptag`` parameter (only format compliance is checked).             |
+---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+



Error Code Descriptions (*err* field)
-----------------------------------------

If a message is not delivered, an extended error code describing the reason for non-delivery is sent in the ``err`` field along with the undelivered status.

This section describes errors that may occur when sending different message types.

.. tabs::

    .. tab:: SMS

      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | Code    | Error description                                                                                                                              |
      +=========+================================================================================================================================================+
      | 1       | An error unknown to the platform occurred during message delivery, or the operator did not provide an error in the delivery report.            |                                  
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 2       | The subscriber's phone was switched off or out of coverage for the duration of the message delivery attempts.                                  |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 3       | The subscriber’s device is blocked, either the subscriber has the ban on receiving messages enabled, or the subscriber is in roaming with      |
      |         | the ban on receiving messages while roaming enabled.                                                                                           |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 4       | An error occurred at the transport layer of the signaling network during the delivery of the message.                                          |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 5       | The subscriber’s phone memory is full.                                                                                                         |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 6       | The subscriber does not have the message receiving service activated.                                                                          |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 7       | The switching equipment on which the subscriber is registered is not responding.                                                               |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 8       | Invalid subscriber number, or the subscriber's phone has been switched off for a very long period of time.                                     |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 9       | The message was discarded by the platform as the function of cutting duplicate messages was activated.                                         |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 10      | The message was discarded by the platform because one of the message filters, such as a spam filter, was triggered.                            |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 11      | Routing error in the platform configuration.                                                                                                   |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 12      | The subscriber’s number is on the operator’s blacklist.                                                                                        |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 13      | Sending a message from a sender name that is not registered by the operator.                                                                   |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 14      | On the operator’s side, a SPAM filter was activated based on the text of the message.                                                          |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 16      | At the time of SMS message delivery, the phone was busy either receiving or transmitting another short message.                                |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 18      | When sending a message, one or more SMS message parameters were specified incorrectly, or mandatory parameters were not included.              |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 20      | The subscriber’s phone does not accept SMS messages.                                                                                           |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 28      | The SMS message was sent to a number belonging to another mobile operator.                                                                     |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+



    .. tab:: VIBER

      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | Code    | Error description                                                                                                                              |
      +=========+================================================================================================================================================+
      | 1       | An error unknown to the platform occurred during message delivery, or the operator did not provide an error in the delivery report.            |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 3       | The subscriber’s device is blocked, either the subscriber has the ban on receiving messages enabled, or the subscriber is in roaming with      |
      |         | the ban on receiving messages while roaming enabled.                                                                                           |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 5       | The subscriber’s phone memory is full.                                                                                                         |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 6       | The subscriber does not have the message receiving service activated.                                                                          |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 7       | The switching equipment on which the subscriber is registered isn’t responding.                                                                |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 9       | The message was discarded by the platform as the function of cutting duplicate messages was activated.                                         |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 11      | Routing error in the platform configuration.                                                                                                   |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+


    .. tab:: VK

      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | Code    | Error description                                                                                                                              |
      +=========+================================================================================================================================================+
      | 1       | An error unknown to the platform occurred during message delivery, or the operator did not provide an error in the delivery report.            |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 3       | The subscriber’s device is blocked, either the subscriber has the ban on receiving messages enabled, or the subscriber is in roaming with      |
      |         | the ban on receiving messages while roaming enabled.                                                                                           |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 6       | The subscriber does not have the message receiving service activated.                                                                          |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 10      |  The message was discarded by the platform because one of the message filters, such as a spam filter, was triggered.                           |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 11      | Routing error in the platform configuration.                                                                                                   |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+


    .. tab:: PUSH

      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | Код     | Error description                                                                                                                              |
      +=========+================================================================================================================================================+
      | 1       | An error unknown to the platform occurred during message delivery, or the operator did not provide an error in the delivery report.            |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 7       | The switching equipment on which the subscriber is registered isn’t responding.                                                                |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 8       | Invalid subscriber number, or the subscriber's phone has been switched off for a very long period of time.                                     |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 9       | The message was discarded by the platform as the function of cutting duplicate messages was activated.                                         |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 11      | Routing error in the platform configuration.                                                                                                   |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 13      | Sending a message from a sender name that is not registered by the operator.                                                                   |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 18      | Incorrect request parameters were specified, or mandatory parameters were not specified.                                                       |
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
      | Code    | Error description                                                                                                                              |
      +=========+================================================================================================================================================+
      | 1       | An error unknown to the platform occurred during message delivery, or the operator did not provide an error in the delivery report.            |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 2       | The subscriber's phone was switched off or out of coverage for the duration of the message delivery attempts.                                  |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 4       | An error occurred at the transport layer of the signaling network during the delivery of the message.                                          |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 6       | The subscriber does not have the message receiving service activated.                                                                          |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+
      | 16      | The subscriber’s number is busy.                                                                                                               |
      +---------+------------------------------------------------------------------------------------------------------------------------------------------------+







