SMS
====

Request to Send SMS 
=========================

To send a message to the Partner, it is necessary to :ref:`establish a connection <linkSettingeng>` with the server and transmit the ``submit_sm`` packet to the Service Provider. This packet must contain all required message parameters and may also include optional :abbr:`TLV (Tag Length Value)` parameters.

.. note:: If additional functionality is required, specify the values for the corresponding TLV parameters. These parameters are described in the following sections of the website:

          - :doc:`eng_smpp_cascade`;
          - :doc:`eng_smpp_short_link`.
  

Main Request Parameters
---------------------------

+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| Parameter                 | Type                     | Description                                                                                                |
+===========================+==========================+============================================================================================================+
| source_addr               | string                   | | Service name from which the message is sent.                                                             |
|                           |                          | | If this parameter is absent, the message is sent from the default number configured on the               |
|                           |                          |   Service Provider's platform (as per the Partner's request).                                              |
|                           |                          | | The encoding for the ``source_addr`` parameter value is ASCII (according to the SMPP protocol).          |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| destination_addr          | string                   | | Subscriber's phone number, up to 25 characters. Examples: 79036550550, +79036550550, 8-903-655-05-50,    |
|                           |                          |  89036550550.                                                                                              |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| short_message             | string                   | | Message to be sent to the subscriber.                                                                    |
|                           |                          | | Maximum SMS message length: 2000 characters.                                                             | 
|                           |                          | | Maximum user data length for the ``short_message`` field: 254 octets.                                    | 
|                           |                          | | Long text messages (longer than 254 octets, multi-segment from an SMPP perspective) are recommended to   |
|                           |                          |   be sent in a single PDU by placing the text in the TLV parameter ``message_payload``, id = 0x0424.       | 
|                           |                          |   Message data should be inserted in the ``short_message`` field or in the ``message_payload`` field.      |
|                           |                          |   **Important!** Simultaneous use of both fields is not allowed. When using the ``message_payload``        |
|                           |                          |    field, the ``short_message`` field must remain empty.                                                   |
|                           |                          | | The Service Provider's SMPP server supports message concatenation (reassembly of segmented messages)     | 
|                           |                          |   using one of the following methods:                                                                      |
|                           |                          |                                                                                                            | 
|                           |                          | - UDH-8;                                                                                                   | 
|                           |                          | - UDH-16;                                                                                                  | 
|                           |                          | - using TLV parameters.                                                                                    |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| data_coding               | integer                  | | Encoding scheme/type of the message text. It is set in accordance with the GSM 03.38 standard.           |
|                           |                          | | Valid values:                                                                                            |
|                           |                          |                                                                                                            |
|                           |                          | - 0 – DEFAULT, default encoding;                                                                           |
|                           |                          | - 1 – ASCII;                                                                                               |
|                           |                          | - 3 – LATIN1;                                                                                              |
|                           |                          | - 6 – LATIN_CYR;                                                                                           |
|                           |                          | - 8 – UCS2.                                                                                                |
|                           |                          |                                                                                                            |
|                           |                          | | If the text encoding differs from those listed above, the platform will treat the message as binary.     |
|                           |                          | | It is recommended to use the ``UCS2`` encoding (data_coding = 8) to send the text of the message.        |
|                           |                          | | To send messages in Latin, it is possible to use ``data_coding`` = 0, which corresponds to the GSM       |
|                           |                          |   DEFAULT ALPHABET or ASCII, as chosen by the Partner (a unified setting for receiving and                 |
|                           |                          |   sending messages).                                                                                       |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| esm_class                 | integer                  | The set of values for this parameter is specified by the SMPP protocol version 3.4, section 5.2.12.        |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| registered_delivery       | integer                  | | This parameter specifies whether the Partner requires delivery status notifications.                     |
|                           |                          | | Possible values:                                                                                         |
|                           |                          |                                                                                                            |
|                           |                          | - 0 – the Partner does not require delivery status notification;                                           |
|                           |                          | - 1 – the Partner requires delivery status notification;                                                   |
|                           |                          | - 2 – the Partner requires notification only if the message is not delivered to the subscriber.            |
|                           |                          |                                                                                                            |
|                           |                          | | This option can be configured by default on the Service Provider's side (upon the Partner's request).    |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| schedule_delivery_time    | string                   | | Scheduled message delivery date and time.                                                                |
|                           |                          | | The Service Provider's platform has a restriction:                                                       | 
|                           |                          |   the scheduled time cannot be later than a certain period from the current moment.                        | 
|                           |                          | | The exact limits of this restriction should be clarified with the Service Provider's support team.       | 
|                           |                          | | The ``schedule_delivery_time`` field can be set in either relative or absolute format.                   |
|                           |                          | | Furthermore, a special format is available to specify a delivery interval based on the subscriber's      |
|                           |                          |   local time zone, derived automatically from their phone number.                                          |
|                           |                          | | Value format for the ``YYMMDDhhmmsstnnp`` parameter, where:                                              |
|                           |                          |                                                                                                            |
|                           |                          | - YYMMDDhhmmss – year, month, day, hours, minutes, seconds;                                                |
|                           |                          | - t – tenths of seconds;                                                                                   |
|                           |                          | - nn – quarters of an hour (15-minute intervals), e.g., for 8 hours the value will be “32”;                |
|                           |                          | - p – shift. Possible values:                                                                              |
|                           |                          |                                                                                                            |
|                           |                          |   * “+” and “–” specify the time shift in quarter hours relative to GMT,                                   |
|                           |                          |     for example, “08+” corresponds to GMT+2, and “04–” corresponds to GMT-1;                               |
|                           |                          |   * “R” – values *t* and *nn* are ignored, the rest is added to the current local time.                    |
|                           |                          |   * “А” – the date and time are considered to be in the subscriber's local time and specify the start of   |
|                           |                          |     a possible sending interval, while the quarters specify the length of this interval. Sending occurs    |
|                           |                          |     within the specified time, even if the date is in the past. For example, if the current time is        |
|                           |                          |     10:00 am and the window is set for “yesterday” from 3:00 pm to 6:00 pm, the message will not be sent   |
|                           |                          |     before 3:00 pm. If the interval has already ended on the current day, its start  is moved to the next  |
|                           |                          |     day.                                                                                                   |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| validity_period           | string                   | | Message validity period.                                                                                 |
|                           |                          | | Validity period for SMS: from 1 to 2880 minutes (up to 2 days).                                          |
|                           |                          | | Value format for the ``YYMMDDhhmmsstnnp`` parameter, where:                                              |
|                           |                          |                                                                                                            |
|                           |                          | - YYMMDDhhmmss – year, month, day, hours, minutes, seconds;                                                |
|                           |                          | - t – tenths of seconds;                                                                                   |
|                           |                          | - nn – quarters of an hour (15-minute intervals), e.g., for 8 hours the value will be “32”;                |
|                           |                          | - p – shift. Possible values:                                                                              |
|                           |                          |                                                                                                            |
|                           |                          |   * “+” и “–” specify the time shift in quarter hours relative to GMT,                                     |
|                           |                          |     for example, “08+” corresponds to GMT+2, and “04–” corresponds to GMT-1;                               |
|                           |                          |   * “R” – values *t* and *nn* are ignored, the rest is added to the current local time.                    |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| priority                  | integer                  | | This parameter indicates the message priority.                                                           |
|                           |                          | | Messages with higher priority are sent to the operator first.                                            |
|                           |                          | | Possible values are from 0 to 2, where:                                                                  |
|                           |                          |                                                                                                            |
|                           |                          | - 0 – lowest priority;                                                                                     |
|                           |                          | - 1 – normal priority;                                                                                     |
|                           |                          | - 2 – high priority.                                                                                       |
|                           |                          |                                                                                                            |
|                           |                          | .. note:: This parameter is disabled by default. Enabling this functionality should                        |
|                           |                          |     be agreed with your supervising manager.                                                               |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+


Request TLV Parameters
---------------------------

TLV parameters for sending messages from the Partner to the Service Provider.

+---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
| TLV Parameter             | Field               | Octets size       | Type              | Description                                                           |
+===========================+=====================+===================+===================+=======================================================================+
| message_payload           | Tag                 | 2                 | Integer           | id = 0x0424                                                           |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Value               | up to 2048        | Octet String      | Used for a message text longer than 254 octets.                       |
|                           |                     |                   |                   |                                                                       |
|                           |                     |                   |                   | | The message text should be placed either in the ``short_message``   |
|                           |                     |                   |                   |   field or in the ``message_payload`` field.                          |
|                           |                     |                   |                   | | Simultaneous use of both fields is not allowed.                     |
|                           |                     |                   |                   | | When using the ``message_payload`` field, the ``short_message``     |
|                           |                     |                   |                   |   field should remain empty.                                          |
+---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
| ptag                      | Tag                 | 2                 | Integer           | id = 0x1411                                                           |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Value               | up to 1000        | Octet String      | Message identifier in the Partner's system.                           |
|                           |                     |                   |                   |                                                                       |
|                           |                     |                   |                   | | May contain from 1 to 50 characters.                                |
|                           |                     |                   |                   | | Allowed characters: 0...9a...zA...Z-.                               |
|                           |                     |                   |                   | | It can be any identifier in the Partner's system.                   |
|                           |                     |                   |                   | | For example, a unique message identifier or an identifier of the    |
|                           |                     |                   |                   |   department initiating sending a request.                            |
|                           |                     |                   |                   | | The Service Provider does not control the values passed in the      |
|                           |                     |                   |                   |   ``ptag`` parameter (only format compliance is checked).             |
|                           |                     |                   |                   |   The Service Provider optionally returns this identifier             |
|                           |                     |                   |                   |   to the Partner when sending the message delivery status             |
|                           |                     |                   |                   |   (see :doc:`eng_smpp_status`).                                       |
+---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+


Response to Request 
========================

In response to the ``submit_sm`` packet, the Service Provider's server replies with the ``submit_sm_resp`` packet containing the ``command_status`` field.

If the packet is accepted and processed successfully, the body of the ``submit_sm_resp`` packet will contain ``message_id`` – a unique identifier (a positive integer) 
assigned to this PDU by the Service Provider's server. 

Subsequently, the ``message_id`` value is used by the Partner to receive and analyze message delivery statuses.

Possible values for the ``command_status`` field are provided in the tables below.

Successful Send Response
----------------------------

In case of successful sending, the response code (HEX) ``0x00`` is returned.
          
+---------------------+-----------------------------------------------------+---------------------------------------------------------+
| Code (HEX)          | Description                                         | Partner Action                                          |
+=====================+=====================================================+=========================================================+
| 0x00                | The packet received successfully.                   | No errors, normal service operation.                    |
+---------------------+-----------------------------------------------------+---------------------------------------------------------+


Send Errors 
----------------------

For invalid results, the response code (HEX) will be different from ``0x00``. 

+---------------------+-----------------------------------------------------+---------------------------------------------------------+
| Code (HEX)          | Description                                         | Partner Action                                          |
+=====================+=====================================================+=========================================================+
| 0x01                | Message text length exceeded.                       | The Partner can shorten the text to the allowed values  |
|                     |                                                     | and retry sending the message.                          |
+---------------------+-----------------------------------------------------+---------------------------------------------------------+
| 0x03                | The Partner sent a PDU of an unsupported type       | The Partner fixes the errors on their side.             |
|                     | (query_sm, submit_multi, data_sm, etc.).            |                                                         |
+---------------------+-----------------------------------------------------+---------------------------------------------------------+
| 0x08                | System error on the server.                         | | The Partner can retry sending the message.            |
|                     |                                                     | | If the error persists, stop trying to send the        |
|                     |                                                     |   message and contact the                               |
|                     |                                                     |   :ref:`Technical Support Service <eng-support>`,       |
|                     |                                                     |   providing the most comprehensive information about    |
|                     |                                                     |   the conditions for the occurrence of this error.      |
+---------------------+-----------------------------------------------------+---------------------------------------------------------+
| 0x0A                | | Invalid sender name.                              | The Partner must fix the errors on their side and can   |
|                     | | The Partner sent in the ``source_addr``           | resend the message with the correct ``source_addr``     |
|                     |   parameter a value from which sending messages     | parameter value.                                        |
|                     |   to subscribers is not allowed.                    |                                                         |
+---------------------+-----------------------------------------------------+---------------------------------------------------------+
| 0x0B                | | Invalid recipient number.                         | | The Partner should not resend messages.               |
|                     | | An attempt was made to send a message             | | The Partner should contact the Service Provider's     |
|                     |   to a number that is not allowed to send messages. |   manager to find out whether it is possible to send    |
|                     |                                                     |   messages to this number.                              |
+---------------------+-----------------------------------------------------+---------------------------------------------------------+
| 0x0C                | Invalid ptag TLV parameter value passed             | The Partner corrects the parameter value and can retry  |
|                     | (id = 0x1411).                                      | to send the message.                                    |
+---------------------+-----------------------------------------------------+---------------------------------------------------------+
| 0x14                | | The queue for sending messages from the           | | The Partner pauses the SMS sending process            |
|                     |   Partner has reached the maximum allowed value.    |   (``submit_sm``) for 5 seconds, then resumes sending.  |
|                     | | Example: The maximum number of messages           | | The Partner can retry sending the messages that       |
|                     |   in the queue for sending to subscribers is set    |   failed.                                               |
|                     |   to 100 messages for the Partner's service.        | | If the error repeats more than five times in a row,   |
|                     | | If more than 100 messages accumulate,             |   stop sending messages and contact the                 |
|                     |   the Service Provider will respond with this       |   :ref:`Technical Support Service <eng-support>`,       |
|                     |   error code until the queue is reduced.            |   providing the most comprehensive information about    |
|                     |                                                     |   the conditions for the occurrence of this error.      |
+---------------------+-----------------------------------------------------+---------------------------------------------------------+
| 0x45                | An attempt to send messages after the end of        | The Partner must not retry sending the message.         |
|                     | the trial period or when the number of              |                                                         |
|                     | messages allowed for the trial period is exceeded.  |                                                         |
+---------------------+-----------------------------------------------------+---------------------------------------------------------+
| 0x55                | The threshold for the maximum number of response    | The Partner needs to wait for the next incoming message |
|                     | messages for the “request-response” or “mixed”      | from the subscriber.                                    |
|                     | mode has been exceeded.                             |                                                         |
+---------------------+-----------------------------------------------------+---------------------------------------------------------+
| 0x58                | | The bandwidth set for the Partner has been        | | The Partner stops the sending process (``submit_sm``) |
|                     |   exceeded.                                         |   for 5 seconds, then resumes sending without           |
|                     | | Example. The Partner service has a rate limit     |   exceeding the allowed speed.                          |
|                     |   of 10 messages per second.                        | | The Partner can retry sending the messages that       |
|                     |   The Partner sent 12 messages per second.          |   failed.                                               |
|                     |   The first 10 messages will be successfully        |                                                         |
|                     |   processed: the Service Provider will send messages|                                                         |
|                     |   to subscribers.                                   |                                                         |
|                     | | In response to the last 2 messages, the           |                                                         |
|                     |   Service Provider will return the ``0x58`` error   |                                                         |
|                     |   code to the Partner and will not send these       |                                                         |
|                     |   2 messages to subscribers.                        |                                                         |
+---------------------+-----------------------------------------------------+---------------------------------------------------------+
| 0x61                | Incorrect value of the ``schedule_delivery_time``   | The Partner must fix the errors on their side and can   |
|                     | parameter specified.                                | then retry with the correct ``schedule_delivery_time``. |
+---------------------+-----------------------------------------------------+---------------------------------------------------------+
| 0x62                | | Transaction duration limit exceeded.              | The Partner can retry sending with the correct          |
|                     | | The error occurs if the value passed in the       | ``schedule_delivery_time`` value.                       |
|                     |   ``schedule_delivery_time`` parameter is out       |                                                         |
|                     |   of range.                                         |                                                         |
+---------------------+-----------------------------------------------------+---------------------------------------------------------+
| 0xAB                | | An attempt to send a duplicate message was made.  | The Partner must not retry sending the message.         |
|                     | | Example. The duplicate blocking feature is        |                                                         |
|                     |   enabled for the Partner's service. The Partner    |                                                         |
|                     |   sent 3 requests to send a message to the same     |                                                         |
|                     |   subscriber number with the same text within       |                                                         |
|                     |   24 hours. The first request will be successfully  |                                                         |
|                     |   processed and the message will be sent to the     |                                                         |
|                     |   subscriber.                                       |                                                         |
|                     | | In response to the last 2 requests, the Service   |                                                         |
|                     |   Provider will return the ``0xAB`` error code to   |                                                         |
|                     |   the Partner and will not send these 2 messages    |                                                         |
|                     |   to the subscriber.                                |                                                         |
|                     | | The feature of blocking duplicates is             |                                                         |
|                     |   disabled by default for the Partner. The feature  |                                                         |
|                     |   can be enabled at the request of the Partner.     |                                                         |
+---------------------+-----------------------------------------------------+---------------------------------------------------------+
| 0xC4                | The partner sent an incorrect value in one of       | The Partner must fix the errors on their side and can   |
|                     | the TLV parameters.                                 | then retry sending the message with the correct set     |
|                     |                                                     | of parameters.                                          |
+---------------------+-----------------------------------------------------+---------------------------------------------------------+
| 0x500               | The error will appear if a certain merging          | When this error occurs, the Partner stops the process   |
|                     | method is specified in the settings of the          | of sending messages, changes the method of sending      |
|                     | integration SMPP client in the “Protocol Parameters“| these messages on their side (TLV or UDH), repeats      |
|                     | protocol parameters (“Merge via UDH“ or             | sending these messages.                                 |
|                     | “Merge via TLV“), and a packet that does not match  |                                                         |
|                     | this processing type is received from the SMPP      | If the error appears again after the changes made,      |
|                     | client.                                             | contact the                                             |
|                     |                                                     | :ref:`Technical Support Service <eng-support>`,         |
|                     | The error will not appear if the                    | providing the most comprehensive information about      |
|                     | “Detect automatically” option (default value)       | the conditions for the occurrence of this error.        |
|                     | is selected. In this case, when receiving data from |                                                         |
|                     | the SMPP client, the type of packet is              |                                                         |
|                     | automatically determined and the message is merged  |                                                         |
|                     | according to a certain method.                      |                                                         |
+---------------------+-----------------------------------------------------+---------------------------------------------------------+

.. note:: If the Partner's service does not respond to the Service Provider's requests, :ref:`eng_reprocessing` is performed.


Message Delivery Statuses
============================

To receive the SMS message statuses, it is necessary to configure the :doc:`eng_smpp_status`.


SMS Session
=============

The SMS session functionality allows a subscriber to use the service without limiting messages to keywords.

A session is opened when a subscriber sends a message containing a session-opening keyword to the service name.  

All messages with a code word or messages from the session are transmitted to the Partner. 

In return, the subscriber receives the text provided by the Partner.

The active session time interval is defined in the service configuration. During this time interval, all messages sent by the subscriber to this service 
name will be processed by the session service. The session time is extended when the subscriber sends a message, if the session on the  
service name is active at the time of sending the message. This message can contain any text except a session-ending command. The session is extended for  
the session activity time set in the service configuration.

The active session time expires if the subscriber has not sent a single message to the service name during this time period. After the active session   
time has expired, the subscriber receives a message (optionally) notifying that the session time has expired and the session is closed. 

A subscriber can close the session manually by sending the session-ending keyword. A confirmation message will be sent to the subscriber, and 
the session will be terminated.


Connection 
----------------

To enable the SMS session functionality, the Partner must additionally provide the Service Provider's manager with the following information:

1. The desired keyword with synonyms (regular expression) for opening a session.
2. Whether the Service Provider should reply to the subscriber's keyword upon opening the session. If “yes”, it is necessary to provide the text of the message sent to the subscriber when the session is opened.
3. The desired keyword with synonyms (regular expression) for closing a session. The closing keyword may be absent or be the same for all of the Partner's services.
4. Whether the Service Provider should reply to the subscriber's keyword upon closing the session. If “yes”, it is necessary to provide the text of the message sent to the subscriber when the session is closed.
5. The time interval during which the session will be active.
6. The text of the message sent to the subscriber if the Partner's server is unavailable.



