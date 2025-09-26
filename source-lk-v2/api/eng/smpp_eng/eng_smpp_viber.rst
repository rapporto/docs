Viber
==========

The following types of Viber messages are supported:

- text only;
- image only;
- text + button – a text message with a button below it. When the button is clicked, the user is directed to the specified link; 
- text + button + image – a text message with an image and a button below it. When the button is clicked, the user is directed to the specified link.

The type of Viber message is determined automatically based on the set of parameters passed. If the text of the button is passed, then the link for the button must also be passed (and vice versa).

Request to Send Viber Messages
=================================

To send a message, the Partner needs to :ref:`establish a connection <linkSettingeng>` to the server and transmit the ``submit_sm`` packet to the Service Provider.
This packet contains all the necessary message parameters and may also include optional :abbr:`TLV (Tag Length Value)` parameters.

.. note:: If additional functionality is required, specify the values for the corresponding TLV parameters. These parameters are described in the following sections of the website:

          - :doc:`eng_smpp_cascade`;
          - :doc:`eng_smpp_short_link`.


Main Request Parameters
---------------------------

+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| Parameter                 | Type                     | Description                                                                                                |
+===========================+==========================+============================================================================================================+
| source_addr               | string                   | | Service name from which the message is sent.                                                             |
|                           |                          | | If this parameter is absent, the message is sent from the default name configured on the                 |
|                           |                          |   Service Provider's platform (as per the Partner's request).                                              |
|                           |                          | | The encoding for the ``source_addr`` parameter value is ASCII (according to the SMPP protocol).          |
|                           |                          | | The sender’s number (chat name) in Viber may contain Unicode symbols, including Cyrillic.                |
|                           |                          | | If a non-ASCII signature is used, the Partner is assigned a service name consisting of ASCII             |
|                           |                          |   characters for SMPP operations, and the substitution to the Unicode version is implemented on the        |
|                           |                          |   interface between the Service Provider’s and Viber’s platforms.                                          |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| destination_addr          | string                   | | Subscriber's phone number.                                                                               |
|                           |                          | | Maximum length is 25 characters.                                                                         |
|                           |                          | | Examples: 79036550550, +79036550550, 8-903-655-05-50, 89036550550.                                       |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| short_message             | string                   | | Message to be sent to the subscriber.                                                                    |
|                           |                          | | Maximum Viber message length is 1000 characters.                                                         |
|                           |                          | | Maximum user data length for the ``short_message`` field: 254 octets.                                    |
|                           |                          |                                                                                                            |
|                           |                          | | Text messages longer than 254 octets are recommended to be sent in a single PDU in the TLV parameter     |
|                           |                          |   ``message_payload``(id = ``0x0424``).                                                                    |
|                           |                          |                                                                                                            |
|                           |                          | .. warning:: Simultaneous use of both fields is not allowed. When using the ``message_payload``            |
|                           |                          |   parameter, the value of the ``short_message`` parameter should not be specified.                         |
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
|                           |                          |                                                                                                            |
|                           |                          | | The Service Provider's platform has a restriction, namely, the scheduled date and time cannot be later   |
|                           |                          |   than a specified period from the current moment.                                                         |
|                           |                          | | The exact limits of this restriction should be clarified with the Service Provider's support team.       |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| validity_period           | string                   | | Message lifetime.                                                                                        |
|                           |                          | | Validity period for Viber: from 30 to 86400 seconds (up 24 hours).                                       |
|                           |                          | | Value format for the  ``YYMMDDhhmmsstnnp`` parameter, where:                                             |
|                           |                          |                                                                                                            |
|                           |                          | - YYMMDDhhmmss – year, month, day, hours, minutes, seconds;                                                |
|                           |                          | - t – tenths of seconds;                                                                                   |
|                           |                          | - nn – quarters of an hour (15-minute intervals), e.g., for 8 hours the value will be “32”;                |
|                           |                          | - p – shift. Possible values:                                                                              |
|                           |                          |                                                                                                            |
|                           |                          |   * “+” and “–” specify the time shift in quarter hours relative to GMT,                                   |
|                           |                          |     for example, “08+” corresponds to GMT+2, and “04–” corresponds to GMT-1;                               |
|                           |                          |   * “R” – values *t* and *nn* are ignored, the rest is added to the current local time.                    |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+


TLV Parameters
--------------------

TLV parameters for sending messages from the Partner to the Service Provider.

+---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
| TLV Parameter             | Field               | Octets size       | Type              | Description                                                           |
+===========================+=====================+===================+===================+=======================================================================+
| message_payload           | Tag                 | 2                 | Integer           | id = 0x0424                                                           |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Value               | up to 2048        | Octet String      | Contains the extended short message user data, longer than 254 octets.|
|                           |                     |                   |                   |                                                                       |
|                           |                     |                   |                   | .. note:: The short message data should be inserted in either the     |
|                           |                     |                   |                   |    ``short_message`` or ``message_payload`` fields. Both fields       |
|                           |                     |                   |                   |    should not be used simultaneously.                                 |
|                           |                     |                   |                   |                                                                       |
|                           |                     |                   |                   |    The ``sm_length`` field should be set to zero if using the         |
|                           |                     |                   |                   |    ``message_payload`` parameter.                                     |
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
|                           |                     |                   |                   |   department initiating the sending request.                          |
|                           |                     |                   |                   | | The Service Provider does not control the values passed in the      |
|                           |                     |                   |                   |   ``ptag`` parameter (only format compliance is checked).             |
|                           |                     |                   |                   |   The Service Provider optionally return this identifier              |
|                           |                     |                   |                   |   to the Partner when sending the message delivery status             |
|                           |                     |                   |                   |   (see :doc:`eng_smpp_status`).                                       |
+---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
| imageURL                  | Tag                 | 2                 | Integer           | id = 0x1436                                                           |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Value               | up to 2048        | Octet String      | Link to the image to be sent in the Viber message.                    |
|                           |                     |                   |                   |                                                                       |
|                           |                     |                   |                   | | Maximum length: 2048 characters.                                    |
|                           |                     |                   |                   | | The URL must begin with ``http://`` or ``https://``.                |
|                           |                     |                   |                   | | Characters that are not allowed in the URL according to the HTTP    |
|                           |                     |                   |                   |   protocol standard (special characters, Cyrillic, Unicode) must be   |
|                           |                     |                   |                   |   encoded (URLEncoded) using UTF-8 encoding.                          |
+---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
| action                    | Tag                 | 2                 | Integer           | id = 0x1433                                                           |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Value               | up to 2048        | Octet String      | | Button link in the Viber message.                                   |
|                           |                     |                   |                   | | Clicking the button navigates to the specified URL.                 |
|                           |                     |                   |                   |                                                                       |
|                           |                     |                   |                   | | Maximum length: 2048 characters.                                    |
|                           |                     |                   |                   | | The URL must begin with ``http://`` or ``https://``.                |
|                           |                     |                   |                   | | Characters that are not allowed in the URL according to the HTTP    |
|                           |                     |                   |                   |   protocol standard (special characters, Cyrillic, Unicode) must be   |
|                           |                     |                   |                   |   encoded (URLEncoded) using UTF-8 encoding.                          |
|                           |                     |                   |                   | | Example: ``0x68,0x74,0x74,0x70,0x3A,0x2F,                           |
|                           |                     |                   |                   |   0x2F,0x77,0x77,0x77,0x2E,0x62,0x75,0x74,                            |
|                           |                     |                   |                   |   0x74,0x6F,0x6E, 0x2E,0x72,0x75,0x00``                               |
|                           |                     |                   |                   |   – corresponds to the string ``http://www.button.ru/``.              |
|                           |                     |                   |                   | | The use of NULL characters at the end of the string value is        |
|                           |                     |                   |                   |   optional.                                                           |
+---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
| caption                   | Tag                 | 2                 | Integer           | id = 0x1434                                                           |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Value               | up to 20          | Octet String      | | Text displayed on the button in the Viber message.                  |
|                           |                     |                   |                   |                                                                       |
|                           |                     |                   |                   | | Maximum length: 20 characters.                                      |
|                           |                     |                   |                   | | If the text contains Cyrillic characters, UTF-8 encoding should     |
|                           |                     |                   |                   |   be used.                                                            |
|                           |                     |                   |                   | | Example: ``0xD0,0xBA,0xD0,0xBD,0xD0,0xBE,0xD0,                      |
|                           |                     |                   |                   |   0xBF,0xD0,0xBA,0xD0,0xB0`` – corresponds to the string ``button``.  |
+---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
| viberTTL                  | Tag                 | 2                 | Integer           | id = 0x1435                                                           |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Value               | up to 5           | Octet String      | Viber message lifetime, specified in seconds.                         |
|                           |                     |                   |                   |                                                                       |
|                           |                     |                   |                   | | Minimum value: 30.                                                  |
|                           |                     |                   |                   | | Recommended minimum value: 60.                                      |
|                           |                     |                   |                   | | Maximum value: 86400.                                               |
|                           |                     |                   |                   |                                                                       |
|                           |                     |                   |                   | | Values outside the minimum and maximum values will be rounded       |
|                           |                     |                   |                   |   to these limits.                                                    |
|                           |                     |                   |                   | | If the parameter is not passed, the default value will be used      |
|                           |                     |                   |                   |   (agreed upon when the service was launched).                        |
|                           |                     |                   |                   |                                                                       | 
|                           |                     |                   |                   | .. note:: Viber will attempt to deliver the message to the subscriber |
|                           |                     |                   |                   |    during the message lifetime. If this time expires, the message     |
|                           |                     |                   |                   |    is assigned the “not delivered” status.                            |
+---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+


Response to Request 
====================

In response to the ``submit_sm`` packet, the Service Provider's server replies with the ``submit_sm_resp`` packet containing the ``command_status`` field.

If the packet is accepted and processed successfully, the body of the ``submit_sm_resp`` packet will contain a ``message_id`` unique identifier (a positive integer) 
assigned to this PDU by the Service Provider's server. 

Subsequently, the ``message_id`` value is used by the Partner to receive and analyze message delivery statuses.

Possible values for the ``command_status`` field are provided in the tables below.


Successful Send Response
----------------------------

In case of successful sending, the ``0x00`` response code (HEX) is returned.
          
+---------------------+-----------------------------------------------------+---------------------------------------------------------+
| Code (HEX)          | Description                                         | Partner Action                                          |
+=====================+=====================================================+=========================================================+
| 0x00                | The packet received successfully.                   | No errors, common service's operation.                  |
|                     |                                                     | No Partner's action needed.                             |
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
|                     | (``query_sm``, ``submit_multi``, ``data_sm``, etc.) |                                                         |
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
| 0x500               | The error will occur if in the settings of          | When this error occurs, the Partner stops the process   |
|                     | the integrated SMPP client under the protocol       | of sending messages, changes the method of sending      |
|                     | parameters ("Protocol Parameters"), a specific      | these messages on their side (TLV or UDH), repeats      |
|                     | concatenation method ("Concatenate via UDH" or      | sending these messages.                                 |
|                     | "Concatenate via TLV") is selected, and the SMPP    |                                                         |
|                     | client sends a packet that does not conform         | If the error occurs again after the changes made,       |
|                     | to this type of processing.                         | please contact the                                      |
|                     |                                                     | :ref:`Technical Support Service <eng-support>`,         |
|                     | The error will not occur if the                     | providing the most comprehensive information about      |
|                     | “Detect automatically” option (set by default)      | the conditions for the occurrence of this error.        |
|                     | is selected. In this case, upon receiving data from |                                                         |
|                     | the SMPP client, the packet type is                 |                                                         |
|                     | automatically determined, and the message           |                                                         |
|                     | concatenation is performed according to             |                                                         |
|                     | the specified method.                               |                                                         |
+---------------------+-----------------------------------------------------+---------------------------------------------------------+

.. note:: If the Partner's service does not respond to the Service Provider's requests, :ref:`eng_reprocessing` is performed.



Message Delivery Statuses
==============================

To receive Viber message statuses, you need to configure the :doc:`eng_smpp_status`.


Viber Sessions
===============

| Viber sessions are a feature that allows a Partner to communicate with subscribers at a fixed price per session within a certain time frame. 
| The reason for starting a session can be anything: a question, a problem report, a booking inquiry, or a delivery status check. The user will receive a response in real time.

.. note:: The Viber Sessions feature is not available by default. Please contact your supervising manager to enable it.


Setup 
------------------

| A special Viber business account is required to use Viber sessions.
| You can create a new Viber business account with the sessions feature enabled.
| If you already have an existing business account and would like to enable sessions for it, please contact your supervising manager.

.. important:: For business accounts that support the Viber Sessions feature, only text messages or only images are available.


Pricing
----------------

| Using the Viber sessions feature requires a subscription fee. Please check the amount with your supervising manager when creating your business account.
| All sessions are charged at a fixed price. Messages within an active session are not charged.
| Any messages sent outside of a session are charged at the standard rate.
