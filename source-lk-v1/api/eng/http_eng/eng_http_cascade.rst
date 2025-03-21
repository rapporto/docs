Cascading Message Sending
=============================

Description
------------------

Cascading message sending is the sequential sending of a message via different channels over the message's lifetime. 

The message is resent in case of receiving a status indicating that the message was not successfully sent.

The service supports the following types of cascading message:

* FlashingCall;
* Push;
* SMS;
* Viber;
* VK;
* WhatsApp.

When sending it can be any sequence of message types.

The order and options for such resending can be configured on the Service Provider's side at the request of the Partner. In this case this additional sending of messages performs with the default parameters, and *no additional parameters need to be passed* in the request body.

It is possible to pass the desired cascade options using additional parameters of the HTTP request.


.. _engHTTP-Параметры-запроса-каскада:

Request Parameters 
----------------------------

Possible parameters of the HTTP request for cascade message resending.

+--------------------+--------------+----------------------------------------------------------------------------------------------------+
| Parameter          | Type         | Description                                                                                        |
+====================+==============+====================================================================================================+
| order_list         | string       | | A list specified the send sequence.                                                              |
|                    |              | | Types of messages should be listed in the order in which they should be sent.                    |
|                    |              | | Possible values for message types (case doesn't matter):                                         |
|                    |              |                                                                                                    |
|                    |              | * i – Viber;                                                                                       |
|                    |              | * s – SMS;                                                                                         |
|                    |              | * f – FlashingCall;                                                                                |
|                    |              | * v – VK;                                                                                          |
|                    |              | * p – Push;                                                                                        |
|                    |              | * w – WhatsApp.                                                                                    |
|                    |              |                                                                                                    |
|                    |              | .. note:: For example, *order_list=v,i,s* means that the following types of messages will be sent  |
|                    |              |      sequentially: VK → Viber → SMS.                                                               |
+--------------------+--------------+----------------------------------------------------------------------------------------------------+
| <type>_resendCond  | string       | The parameter specifies the cascade sending condition for a specific message type.                 |
|                    |              | Here <type> is a character that specifies the type of message (i, s, v, f, p, w) for which the     |
|                    |              | setting is being made.                                                                             |
|                    |              |                                                                                                    |
|                    |              | Possible parameter values (case doesn't matter):                                                   |
|                    |              |                                                                                                    |
|                    |              | * N – not to make a cascade sending;                                                               |
|                    |              | * Y – to make a cascade sending upon receipt of the “Undelivered” status;                          |
|                    |              | * S – the same as *“Y“* plus a cascade sending will be done if the “Seen” status was not received  |
|                    |              |   during the lifetime of the message.                                                              |
|                    |              |                                                                                                    |
|                    |              | .. warning:: The *“S“* value does not make sense for SMS and FlashingCall messages, since they     |
|                    |              |         do not have a “Seen“ status.                                                               |
|                    |              |                                                                                                    |
|                    |              | Using a combination of parameters, different settings for different types of messages may be       |
|                    |              | specified.                                                                                         |
|                    |              |                                                                                                    |
|                    |              | .. note:: For example, *v_resendCond=S&i_resendCond=Y&s_resendCond=N* means that:                  |
|                    |              |                                                                                                    |
|                    |              |       * for VK messages the *“Seen“* status is taken into account;                                 |
|                    |              |       * for Viber messages the *“Undelivered“* status is taken into account;                       |
|                    |              |       * for SMS messages the cascade sending is not performed.                                     |
+--------------------+--------------+----------------------------------------------------------------------------------------------------+
| <type>_resendSn    | string       | The parameter specifies the value of the service name from which messages of a certain type will be|
|                    |              | sent in the cascade mode.                                                                          |
|                    |              |                                                                                                    |
|                    |              | Here <type> is a character that specifies the type of message (i, s, v, f, p или w) for which the  |
|                    |              | setting is being made.                                                                             |
|                    |              |                                                                                                    |
|                    |              | .. note:: For example, *v_resendSn=0002&i_resendSn=0001&s_resendSn=0000* means that:               |
|                    |              |                                                                                                    |
|                    |              |      * VK messages are sent on behalf of *0002*;                                                   |
|                    |              |      * Viber messages are sent on behalf of *0001*;                                                |
|                    |              |      * SMS messages are sent on behalf of *0000*.                                                  |
|                    |              |                                                                                                    |
|                    |              |      The service names used must be available to the Partner.                                      |
|                    |              |      To make service names enabled please contact your supervising manager.                        |
+--------------------+--------------+----------------------------------------------------------------------------------------------------+
| <type>_resendText  | string       | The parameter specifies an alternative message text for different types of messages that will be   |
|                    |              | sent in the cascade mode.                                                                          |
|                    |              |                                                                                                    |
|                    |              | Here <type> is a character that specifies the type of message (i, s, v, f, p или w) for which the  |
|                    |              | setting is being made.                                                                             |
|                    |              |                                                                                                    |
|                    |              | .. note:: For example, *v_resendText=testVK&i_resendText=testViber&s_resendText=testSMS* means     |
|                    |              |      that:                                                                                         |
|                    |              |                                                                                                    |
|                    |              |      * VK messages are sent with the text *“testVK“*;                                              |
|                    |              |      * Viber messages are sent with the text *“testViber“*;                                        |
|                    |              |      * SMS messages are sent with the text *“testSMS“*.                                            |
|                    |              |                                                                                                    |
|                    |              | The message text is subject to the same restrictions as for the respective individual message types|
|                    |              | (see the relevant sections “Request parameters“).                                                  |
+--------------------+--------------+----------------------------------------------------------------------------------------------------+
| <type>_resendValid | string       | The parameter sets the lifetime for diffrenet types of messages sent in the resending mode.        |
|                    |              | Here <type> is a character that specifies the type of message (i, s, v, f, p или w) for which the  |
|                    |              | setting is being made.                                                                             |
|                    |              |                                                                                                    |
|                    |              | The lifetime means the interval during which the operator will try to deliver the message to the   |
|                    |              | subscriber. If the message lifetime has expired and the message is not delivered, it will no       |
|                    |              | longer be delivered to the subscriber.                                                             |
|                    |              |                                                                                                    |
|                    |              | Parameter format value: "YYMMDDhhmmsstnnp", where:                                                 |
|                    |              |                                                                                                    |
|                    |              | * YYMMDDhhmmss – year, month, day, hours, minutes, seconds;                                        |
|                    |              | * t – tenths of seconds;                                                                           |
|                    |              | * nn – hour quarters (each 15 minutes), for example, for 8 hours the value will be "32";           |
|                    |              | * p – shift. possible values:                                                                      |
|                    |              |                                                                                                    |
|                    |              |     - “+” и “-” set the time shift from GMT in one direction or another, i.e. “08+” corresponds    |
|                    |              |       to GMT+2 and “04-” corresponds to GMT-1;                                                     |
|                    |              |     - “R” means that  *t* and *nn* values are ignored, and everything else is added to the         |
|                    |              |       current local time.                                                                          |
|                    |              |                                                                                                    |
|                    |              | Valid lifetime ranges for different message types:                                                 |
|                    |              |                                                                                                    |
|                    |              | * SMS – from 1 to 2880 minutes (up to 2 days and nights);                                          |
|                    |              | * FlashingCall – from 1 to 5 minutes;                                                              |
|                    |              | * VK – from 60 to 86400 seconds (up to 1 day and night);                                           |
|                    |              | * Viber – from 30 to 86400 seconds (up to 1 day and night);                                        |
|                    |              | * Push – from 30 to 86400 seconds (up to 1 day and night);                                         |
|                    |              | * WhatsApp – from 1 to 10080 minutes (on the operator's side value is rounded up to day and night).|
+--------------------+--------------+----------------------------------------------------------------------------------------------------+
| shorten_list       | string       | The parameter is used to control link shortening in various types of messages.                     |
|                    |              |                                                                                                    |
|                    |              | .. important:: This parameter will be processed only if the *order_list* parameter is passed.      |
|                    |              |                                                                                                    |
|                    |              | The parameter value may contain:                                                                   |
|                    |              |                                                                                                    |
|                    |              | * a list of message types (separated by commas) for which you want to shorten links;               |
|                    |              | * empty value (shorten_list=) if you do not need to shorten links for all types of messages.       |
|                    |              |                                                                                                    |
|                    |              | Possible values for message types (case doesn't matter):                                           |
|                    |              |                                                                                                    |
|                    |              | * i – Viber;                                                                                       |
|                    |              | * s – SMS;                                                                                         |
|                    |              | * v – VK;                                                                                          |
|                    |              | * p – Push;                                                                                        |
|                    |              | * w – WhatsApp.                                                                                    |
|                    |              |                                                                                                    |
|                    |              | For example, *shorten_list=S,I* means that links would be shortened in SMS and Viber messages of   |
|                    |              | the cascade.                                                                                       |
|                    |              |                                                                                                    |
|                    |              | .. note:: By default :doc:`eng_http_short_link` is not available. To connect it you need to        |
|                    |              |     contact your supervising manager.                                                              |
+--------------------+--------------+----------------------------------------------------------------------------------------------------+


.. note:: An example of the processing procedure for configured cascade sending VK → Viber → SMS:

    1. The message will be sent into VK.
    2. If the message is successfully delivered, the cascading is completed (go to step 6).
    3. If the message is not delivered due to an error or within the specified time to live, the message will be resent via Viber.
    4. If the message is successfully delivered, the cascading is completed (go to step 6).
    5. If the message is not delivered due to an error or within the specified time to live, an SMS message will be sent.
    6. The Partner receives the final status of message sending (optionally - all intermediate statuses).

