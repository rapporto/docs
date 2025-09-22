VK
===

Features of VK Messages
-----------------------------------

When sending VK messages, the following features should be considered:

1.	The Partner can only send text messages with a maximum length of 2048 characters.
2.	Messages may contain links. If necessary, links may be shortened (see :doc:`eng_smpp_short_link`).
3.	Messages are sent from a VK group to any VK user via their phone number.
4.	The Partner can send no more than 50 messages per second from one VK group.
5.	The Partner can send no more than 5 messages per day to one user from one VK group.
6.	All VK groups and examples of message texts are subject to preliminary moderation with the presentation of a service agreement, a trademark certificate and other necessary documents.
7.	Messages have a time-to-live period from 1 minute to 24 hours. If the notification is not received by the user's device within the time to live period, it will not be delivered and displayed to the end user.
8.  Only delivered messages are charged.
9.	Messages are delivered only to active VK users. A user is considered active if they have visited the website (via the mobile or web version of the social network) within the last 7 days.

Connecting the VK Message Sending Service
------------------------------------------

To enable the VK message sending service, the Partner has to additionally provide the Service Provider with:

- the URL of the VK group (on whose behalf the messages will be sent); 
- examples of text messages for moderation.

VKontakte Network Moderation Rules
-------------------------------------

| These moderation rules are applied for all message templates, which are submitted for approval for further mass messaging to end users of *Mail.Ru Group* projects. 
| Both the sender (a company) and the text (a template) of the message are moderated. The following criteria are taken into account when checking a company: the industry to which the company belongs, the company type, its market reputation. 

Messages from the following companies are not accepted for review:

1.	Microfinance organizations.
2.	Debt collection agencies (including relevant bank departments).
3.	Bookmakers.
4.	Online casinos.
5.	Jewelry stores.
6.	Cigarette manufacturers.
7.	Pharmaceutical manufacturers.
8.	Alcoholic beverage producers.

The following rules apply to text moderation:

1.	Advertising texts are not being accepted for consideration. Advertising includes any messages addressed to an indefinite number of persons and aimed at attracting attention to an object of advertising, forming or maintaining interest in it, and promoting it in the market.
2.	If a message template submitted for moderation contains both a service component and an advertising component, it will not pass moderation.
3.	All message templates must comply with the requirements of the legislation of the Russian Federation and the legislation of the country in which the users to whom the message is addressed are located, as well as existing ethical norms and principles (templates should not contain messages that offend human dignity, promote violence, racial or national hatred, etc.).
4.	Message templates should not contain information directly or indirectly compromising the Mail.Ru Group and all projects and products that are part of the group of companies. Message templates should not contain information that may advertise products that compete in terms of price or consumer properties with services provided by projects and services of the *Mail.Ru Group*.
5.	Message templates should contain information strictly related to the interaction between the user and the owner of the official group, on behalf of which the message is sent.
6.	Message templates should contain information concerning only orders and/or actions of users that were performed immediately prior to the sending of the informational message.
7.	Templates might contain URL to WEB pages and sites only after individual approval.


Request to Send Messages 
==========================

To send a message to the Partner, you need to :ref:`establish a connection <linkSettingeng>` to the server and transmit the ``submit_sm`` packet to the Service Provider.
This packet contains all the necessary message parameters and may also include optional :abbr:`TLV (Tag Length Value)` parameters.

.. note:: If additional functionality is required, specify the values of the corresponding TLV parameters. Their descriptions are provided in the following sections of the website:
    
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
| destination_addr          | string                   | | Subscriber's phone number.                                                                               |
|                           |                          | | Maximum length: 25 characters.                                                                           | 
|                           |                          | | Examples: 79036550550, +79036550550, 8-903-655-05-50, 89036550550.                                       | 
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| short_message             | string                   | | Message to be sent to the subscriber.                                                                    |
|                           |                          | | Maximum Viber message length: 2048 characters.                                                           | 
|                           |                          | | Maximum user data length for the ``short_message`` field: 254 octets.                                    | 
|                           |                          |                                                                                                            | 
|                           |                          | | Text messages longer than 254 octets are recommended to be sent in a single PDU in the TLV parameter     |
|                           |                          |   ``message_payload``(id = ``0x0424``).                                                                    | 
|                           |                          |                                                                                                            |
|                           |                          | .. warning:: Simultaneous use of both fields is not allowed. When using the ``message_payload``            |
|                           |                          |    parameter, the value of the ``short_message`` parameter should not be specified.                        |
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
|                           |                          |    local time zone, derived automatically from their phone number.                                         |
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
|                           |                          |     before 3:00 pm. If the interval has already ended on the current day, its start is moved to the next   |
|                           |                          |     day.                                                                                                   |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| validity_period           | string                   | | Message validity period.                                                                                 |
|                           |                          | | Validity period for VK: from 60 to 86400 seconds (up to 24 hours).                                       |
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


Request TLV Parameters
-----------------------

TLV parameters for sending messages from the Partner to the Service Provider.

+---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
| TLV Parameter             | Field               | Octets size       | Type              | Description                                                           |
+===========================+=====================+===================+===================+=======================================================================+
| message_payload           | Tag                 | 2                 | Integer           | id = 0x0424                                                           |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
|                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
|                           | Value               | up to 2048        | Octet String      | Used for message text longer than 254 octets                          |
|                           |                     |                   |                   | (an SMPP multi-segment message).                                      |
|                           |                     |                   |                   |                                                                       |
|                           |                     |                   |                   | The Service Provider's SMPP server supports concatenation of messages |
|                           |                     |                   |                   | split into parts using one of the following methods:                  |
|                           |                     |                   |                   |                                                                       |
|                           |                     |                   |                   | - UDH-8;                                                              |
|                           |                     |                   |                   | - UDH-16;                                                             |
|                           |                     |                   |                   | - using TLV parameters.                                               |
|                           |                     |                   |                   |                                                                       |
|                           |                     |                   |                   | .. note:: Text messages shorter than 254 octets should be sent in the |
|                           |                     |                   |                   |    ``short_message`` parameter.                                       |
|                           |                     |                   |                   |    Simultaneous use of the ``message_payload`` and ``short_message``  |
|                           |                     |                   |                   |    parameters is not allowed.                                         |
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
|                           |                     |                   |                   |   The Service Provider optionally returns this identifier             |
|                           |                     |                   |                   |   to the Partner when sending the message delivery status             |
|                           |                     |                   |                   |   (see :doc:`eng_smpp_status`).                                       |
+---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+


Response to Request 
=====================

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
| 0x08                | System error on the server.                         | | The Partner can retry to send the message.            |
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
|                     |    Service Provider will return the ``0x58`` error  |                                                         |
|                     |   code to the Partner and will not send these       |                                                         |
|                     |   2 messages to subscribers.                        |                                                         |
+---------------------+-----------------------------------------------------+---------------------------------------------------------+
| 0x61                | Incorrect value of the ``schedule_delivery_time``   | The Partner must fix the errors on their side and can   |
|                     | parameter specified.                                | then retry with the correct ``schedule_delivery_time``. |
+---------------------+-----------------------------------------------------+---------------------------------------------------------+
| 0x62                | | Transaction duration limit exceeded.              | The Partner can retry sending with the correct          |
|                     | | An error occurs if the value passed in the        | ``schedule_delivery_time`` value.                       |
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
===============================

To receive the VK message statuses, you need to configure the :doc:`eng_smpp_status`.
