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


| <type>_resendCond  | string       | Parameter that defines the conditions for triggering a resend.                                    |
|                    |              |                                                                                                    |
|                    |              | .. raw:: html                                                                                      |
|                    |              |                                                                                                    |
|                    |              |     <details>                                                                                      |
|                    |              |         <summary>More details</summary>                                                           |
|                    |              |         <p>                                                                                        |
|                    |              |             Here <type> is a character that defines the message type (<code>i, s, v, f, p, w</code>), |
|                    |              |             for which the settings are applied.                                                  |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             Possible values (case insensitive):                                                    |
|                    |              |         </p>                                                                                       |
|                    |              |         <ul>                                                                                       |
|                    |              |             <li>N – do not perform resend;</li>                                                  |
|                    |              |             <li>Y – perform resend upon receiving the status <code>Not Delivered</code>;</li>     |
|                    |              |             <li>S – same as <code>Y</code>, plus the resend will occur if the status <code>Viewed</code> is not received within the message's lifetime.</li> |
|                    |              |         </ul>                                                                                      |
|                    |              |         <p>                                                                                        |
|                    |              |             Important! The value <code>S</code> is not applicable for SMS and FlashingCall messages, |
|                    |              |             as they do not have a <code>Viewed</code> status.                                     |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             By using a combination of parameters, different settings can be defined for different types |
|                    |              |             of messages.                                                                            |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             Example 1. Standard values with arbitrary order of message types:                     |
|                    |              |         <br>                                                                                       |
|                    |              |             <code>order_list = "W,V,S", W_resendCond = Y, V_resendCond = S</code>                |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             In this case, a resend will be performed to VK if the status <code>Not Delivered</code> is received for WhatsApp, and then to SMS if the status <code>Viewed</code> is not received for VK, or if the status <code>Not Delivered</code> is received. |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             Example 2. In this case, only the first message of the cascade (Flashing Call) will be sent: |
|                    |              |         <br>                                                                                       |
|                    |              |         <code>order_list = "F,S", F_resendCond = N, S_resendCond = Y</code>                      |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             The cascade SMS will not be sent, as the triggering of a cascade AFTER the Flashing Call message is prohibited (<code>F_resendCond = N</code>). |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             The parameter <code>S_resendCond = Y</code> has no effect here, as this is a setting for triggering the cascade AFTER SMS. |
|                    |              |         </p>                                                                                       |
|                    |              |     </details>                                                                                     |

+--------------------+--------------+----------------------------------------------------------------------------------------------------+
| Parameter Name     | Type         |  Description                                                                                       |
+====================+==============+====================================================================================================+
| order_list         | string       | A parameter that defines the sequence of message sending.                                          |
|                    |              |                                                                                                    |
|                    |              | .. raw:: html                                                                                      |
|                    |              |                                                                                                    |
|                    |              |     <details>                                                                                      |
|                    |              |         <summary>More details</summary>                                                            |
|                    |              |         <p>                                                                                        |
|                    |              |             Message types should be listed in the order they are to be sent.                       |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             Possible values (case insensitive):                                                    |
|                    |              |         </p>                                                                                       |
|                    |              |         <ul>                                                                                       |
|                    |              |             <li>s – SMS;</li>                                                                      |
|                    |              |             <li>p – Push;</li>                                                                     |
|                    |              |             <li>v – VK;</li>                                                                       |
|                    |              |             <li>i – Viber;</li>                                                                    |
|                    |              |             <li>w – WhatsApp;</li>                                                                 |
|                    |              |             <li>f – FlashingCall.</li>                                                             |
|                    |              |         </ul>                                                                                      |
|                    |              |         <p>                                                                                        |
|                    |              |             Example: <code>order_list=v,i,s</code> means sequential resending of messages of the   |
|                    |              |             following types: VK → Viber → SMS.                                                     |
|                    |              |         </p>                                                                                       |
|                    |              |     </details>                                                                                     |
+--------------------+--------------+----------------------------------------------------------------------------------------------------+
| <type>_resendCond  | string       | A parameter that defines the conditions for triggering a resend.                                   |
|                    |              |                                                                                                    |
|                    |              | .. raw:: html                                                                                      |
|                    |              |                                                                                                    |
|                    |              |     <details>                                                                                      |
|                    |              |         <summary>More details</summary>                                                            |
|                    |              |         <p>                                                                                        |
|                    |              |             Here <type> is a character that defines the type of message (<code>i, s, v, f, p,      |
|                    |              |             w</code>), for which the settings are applied.                                         |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             Possible values (case insensitive):                                                    |
|                    |              |         </p>                                                                                       |
|                    |              |         <ul>                                                                                       |
|                    |              |             <li>N – do not resend;</li>                                                            |
|                    |              |             <li>Y – resend upon receiving status <code>Not Delivered</code>;</li>                  |
|                    |              |             <li>S – same as <code>Y</code>, plus resending will occur if status                    |
|                    |              |                 <code>Viewed</code> is not received within the message's lifetime.</li>            |
|                    |              |         </ul>                                                                                      |
|                    |              |         <p>                                                                                        |
|                    |              |             Important! The value <code>S</code> is not applicable for SMS and FlashingCall         |
|                    |              |             messages, as they do not have a <code>Viewed</code> status.                            |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             Using a combination of parameters, various settings can be defined for different       |
|                    |              |             types of messages.                                                                     |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             Example 1. Standard values with arbitrary order of message types:                      |
|                    |              |         <br>                                                                                       |
|                    |              |             <code>order_list = "W,V,S", W_resendCond = Y, V_resendCond = S</code>                  |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             In this case, a resend will be performed to VK if the status                           |
|                    |              |             <code>Not Delivered</code> is received for WhatsApp, and then to SMS if the status     |
|                    |              |             <code>Viewed</code> is not received, or if the status                                  |
|                    |              |             <code>Not Delivered</code> is received for VK.                                         |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             Example 2. In this case, only the first message of the cascade (Flashing Call)         |
|                    |              |             will be sent:                                                                          |
|                    |              |         <br>                                                                                       |
|                    |              |         <code>order_list = "F,S", F_resendCond = N, S_resendCond = Y</code>                        |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             The cascaded SMS will not be sent, as the triggering of a cascade AFTER the            |
|                    |              |             Flashing Call message is prohibited (<code>F_resendCond = N</code>).                   |
|                    |              |         <br>                                                                                       |
|                    |              |             The parameter <code>S_resendCond = Y</code> has no effect here, as this is             |
|                    |              |             a setting for triggering the cascade AFTER SMS.                                        |
|                    |              |         </p>                                                                                       |
|                    |              |     </details>                                                                                     |
+--------------------+--------------+----------------------------------------------------------------------------------------------------+
| <type>_resendSn    | string       | A parameter that defines the service names from which messages will be sent in resend mode.        |
|                    |              |                                                                                                    |
|                    |              | .. raw:: html                                                                                      |
|                    |              |                                                                                                    |
|                    |              |     <details>                                                                                      |
|                    |              |         <summary>More details</summary>                                                            |
|                    |              |         <p>                                                                                        |
|                    |              |             Here <type> is a character that defines the type of message (<code>i, s, v, f, p,      |
|                    |              |             w</code>), for which the settings are applied.                                         |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             Example. <code>v_resendSn=0002&i_resendSn=0001&s_resendSn=0000</code> means that:      |
|                    |              |         </p>                                                                                       |
|                    |              |         <ul>                                                                                       |
|                    |              |             <li>VK messages are sent from the <code>0002</code> name;</li>                         |
|                    |              |             <li>Viber messages are sent from the <code>0001</code> name;</li>                      |
|                    |              |             <li>SMS messages are sent from the <code>0000</code> name.</li>                        |
|                    |              |         </ul>                                                                                      |
|                    |              |         <p>                                                                                        |
|                    |              |             The service names used must be available for the Partner.                              |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             To use service names, please contact your account manager.                             |
|                    |              |         </p>                                                                                       |
|                    |              |     </details>                                                                                     |
+--------------------+--------------+----------------------------------------------------------------------------------------------------+
| <type>_resendText  | string       | A parameter that defines the alternative message text for different types of messages that will be |
|                    |              | sent in resend mode.                                                                               |
|                    |              |                                                                                                    |
|                    |              | .. raw:: html                                                                                      |
|                    |              |                                                                                                    |
|                    |              |     <details>                                                                                      |
|                    |              |         <summary>More details</summary>                                                            |
|                    |              |         <p>                                                                                        |
|                    |              |             Here <type> is a character that defines the type of message (<code>i, s, v, f, p,      |
|                    |              |             w</code>), for which the settings are applied.                                         |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             Example: <code>v_resendText=textVK&i_resendText=textViber&s_resendText=textSMS</code>  |
|                    |              |             means that:                                                                            |
|                    |              |         </p>                                                                                       |
|                    |              |         <ul>                                                                                       |
|                    |              |             <li>VK messages are sent with the text <code>textVK</code>;</li>                       |
|                    |              |             <li>Viber messages are sent with the text <code>textViber</code>;</li>                 |
|                    |              |             <li>SMS messages are sent with the text <code>textSMS</code>.</li>                     |
|                    |              |         </ul>                                                                                      |
|                    |              |         <p>                                                                                        |
|                    |              |             The message text is subject to the same restrictions as the corresponding types of     |
|                    |              |             individual messages (see the relevant sections “Request Parameters”).                  |
|                    |              |         </p>                                                                                       |
|                    |              |     </details>                                                                                     |
+--------------------+--------------+----------------------------------------------------------------------------------------------------+
| <type>_resendValid | string       | A parameter that defines the lifespan for different types of messages sent in resend mode.         |
|                    |              |                                                                                                    |
|                    |              | .. raw:: html                                                                                      |
|                    |              |                                                                                                    |
|                    |              |     <details>                                                                                      |
|                    |              |         <summary>More details</summary>                                                            |
|                    |              |         <p>                                                                                        |
|                    |              |             Here <type> is a character that defines the type of message (<code>i, s, v, f, p,      |
|                    |              |             w</code>), for which the settings are applied.                                         |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             The lifespan means the interval during which the operator will attempt to deliver the  |
|                    |              |             message to the recipient. If the message lifespan has expired and the message has not  |
|                    |              |             been delivered, it will no longer be delivered to the recipient.                       |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             The value format for the parameter is: <code>YYMMDDhhmmsstnnp</code>, where:           |
|                    |              |         </p>                                                                                       |
|                    |              |         <ul>                                                                                       |
|                    |              |             <li><code>YYMMDDhhmmss</code> – year, month, day, hours, minutes, seconds;</li>        |
|                    |              |             <li><code>t</code> – tenths of seconds;</li>                                           |
|                    |              |             <li><code>nn</code> – quarters of an hour (15 minutes each), for example, for 8 hours  |
|                    |              |                 the value will be <code>32</code>;</li>                                            |
|                    |              |             <li><code>p</code> – offset.</li>                                                      |
|                    |              |         </ul>                                                                                      |
|                    |              |         <p>                                                                                        |
|                    |              |             Possible values for <code>p</code>:                                                    |
|                    |              |         </p>                                                                                       |
|                    |              |         <ul>                                                                                       |
|                    |              |             <li><code>+</code> and <code>–</code> specify the time offset from GMT in either       |
|                    |              |                 direction, i.e., <code>08+</code> corresponds to GMT+2, and <code>04–</code>       |
|                    |              |                 corresponds to GMT–1;</li>                                                         |
|                    |              |             <li><code>R</code> – the values of <code>t</code> and <code>nn</code> are ignored,     |
|                    |              |                 everything else is added to the current local time.</li>                           |
|                    |              |         </ul>                                                                                      |
|                    |              |         <p>                                                                                        |
|                    |              |             Acceptable lifespan ranges for different types of messages:                            |
|                    |              |         </p>                                                                                       |
|                    |              |         <ul>                                                                                       |
|                    |              |             <li>SMS – from 1 to 2880 minutes (up to 2 days);</li>                                  |
|                    |              |             <li>FlashingCall – from 1 to 5 minutes;</li>                                           |
|                    |              |             <li>VK – from 60 to 86400 seconds (up to 1 day);</li>                                  |
|                    |              |             <li>Viber – from 30 to 86400 seconds (up to 1 day);</li>                               |
|                    |              |             <li>Push – from 30 to 86400 seconds (up to 1 day);</li>                                |
|                    |              |             <li>WhatsApp – from 1 to 10080 minutes (on the operator's side, the value is rounded   |
|                    |              |                 to whole days).</li>                                                               |
|                    |              |         </ul>                                                                                      |
|                    |              |     </details>                                                                                     |
+--------------------+--------------+----------------------------------------------------------------------------------------------------+
| shorten_list       | string       | A parameter designed to control the shortening of links in various types of cascaded messages.     |
|                    |              |                                                                                                    |
|                    |              | .. raw:: html                                                                                      |
|                    |              |                                                                                                    |
|                    |              |     <details>                                                                                      |
|                    |              |         <summary>More details</summary>                                                            |
|                    |              |         <p>                                                                                        |
|                    |              |             Important! This parameter will only be processed if the <code>order_list</code>        |
|                    |              |             parameter is provided.                                                                 |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             The value of the <code>shorten_list</code> parameter may contain:                      |
|                    |              |         </p>                                                                                       |
|                    |              |         <ul>                                                                                       |
|                    |              |             <li>a list of message types (comma-separated) for which links need to be               |
|                    |              |                 shortened;</li>                                                                    |
|                    |              |             <li>an empty value (<code>shorten_list=</code>) if link shortening is not required     |
|                    |              |                 for all message types.</li>                                                        |
|                    |              |         </ul>                                                                                      |
|                    |              |         <p>                                                                                        |
|                    |              |             Possible values (case insensitive):                                                    |
|                    |              |         </p>                                                                                       |
|                    |              |         <ul>                                                                                       |
|                    |              |             <li>s – SMS;</li>                                                                      |
|                    |              |             <li>p – Push;</li>                                                                     |
|                    |              |             <li>v – VK;</li>                                                                       |
|                    |              |             <li>i – Viber;</li>                                                                    |
|                    |              |             <li>w – WhatsApp.</li>                                                                 |
|                    |              |         </ul>                                                                                      |
|                    |              |         <p>                                                                                        |
|                    |              |             Example: <code>shorten_list=S,I</code> means that links will be shortened only         |
|                    |              |             in SMS and Viber messages of the cascade.                                              |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             By default, the <a href="https://docs.rapporto.ru/api/http/http_short_link.html">Link  |
|                    |              |             Shortening Service</a> is not available. To enable it, please contact your account     |
|                    |              |             manager.                                                                               |
|                    |              |         </p>                                                                                       |
|                    |              |     </details>                                                                                     |
+--------------------+--------------+----------------------------------------------------------------------------------------------------+


.. note:: An example of the processing procedure for configured cascade sending VK → Viber → SMS:

    1. The message will be sent into VK.
    2. If the message is successfully delivered, the cascading is completed (go to step 6).
    3. If the message is not delivered due to an error or within the specified time to live, the message will be resent via Viber.
    4. If the message is successfully delivered, the cascading is completed (go to step 6).
    5. If the message is not delivered due to an error or within the specified time to live, an SMS message will be sent.
    6. The Partner receives the final status of message sending (optionally - all intermediate statuses).

