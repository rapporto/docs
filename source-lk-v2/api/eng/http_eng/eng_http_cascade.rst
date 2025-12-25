Cascading Message Sending
=============================

Cascading message sending is the sequential sending of a message via different channels over the message's lifetime. 

The message is resent in case of receiving a status indicating that the message was not successfully sent.

Cascading message sending is not available by default. To enable it, the Partner must contact their supervising manager.

The service supports the following types of cascading message:

* FlashingCall;
* Push;
* SMS;
* Viber;
* VK;
* WhatsApp.

When sending, it can be any sequence of message types.

The order and options for such resending can be configured on the Service Provider's side at the request of the Partner. In this case this additional sending of messages performs with the default parameters, and *no additional parameters need to be passed* in the request body.

It is possible to pass the desired cascade options using additional parameters of the HTTP request.


.. _engHTTP-Параметры-запроса-каскада:

Request Parameters 
----------------------------

Possible parameters of the HTTP request for cascade message resending.

+--------------------+--------------+----------------------------------------------------------------------------------------------------+
| Parameter Name     | Type         |  Description                                                                                       |
+====================+==============+====================================================================================================+
| order_list         | string       | Parameter that defines the sequence of message sending.                                            |
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
|                    |              |             <li><code>s</code> — SMS;</li>                                                         |
|                    |              |             <li><code>p</code> — Push;</li>                                                        |
|                    |              |             <li><code>v</code> — VK;</li>                                                          |
|                    |              |             <li><code>i</code> — Viber;</li>                                                       |
|                    |              |             <li><code>w</code> — WhatsApp;</li>                                                    |
|                    |              |             <li><code>f</code> — FlashingCall.</li>                                                |
|                    |              |         </ul>                                                                                      |
|                    |              |         <p>                                                                                        |
|                    |              |             Example: <code>order_list = v,i,s</code> means sequential resending of messages of the |
|                    |              |             following types: VK → Viber → SMS.                                                     |
|                    |              |         </p>                                                                                       |
|                    |              |     </details>                                                                                     |
+--------------------+--------------+----------------------------------------------------------------------------------------------------+
| <type>_resendCond  | string       | Parameter that defines the conditions for triggering a resend.                                     |
|                    |              |                                                                                                    |
|                    |              | .. raw:: html                                                                                      |
|                    |              |                                                                                                    |
|                    |              |     <details>                                                                                      |
|                    |              |         <summary>More details</summary>                                                            |
|                    |              |         <p>                                                                                        |
|                    |              |             Here &lt;type&gt; is a character that defines the type of message (<code>i, s, v, f, p,|
|                    |              |             w</code>), for which the settings are applied.                                         |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             Possible values (case insensitive):                                                    |
|                    |              |         </p>                                                                                       |
|                    |              |         <ul>                                                                                       |
|                    |              |             <li><code>N</code> — do not resend;</li>                                               |
|                    |              |             <li><code>Y</code> — resend upon receiving status <code>Not Delivered</code>;</li>     |
|                    |              |             <li><code>S</code> — same as <code>Y</code>, plus resending will occur if status       |
|                    |              |                 <code>Viewed</code> is not received within the message's lifetime.</li>            |
|                    |              |         </ul>                                                                                      |
|                    |              |     <div class="admonition important">                                                             |
|                    |              |         <p class="admonition-title">Important</p>                                                  |
|                    |              |         <p>The value <code>S</code> is not applicable for SMS and FlashingCall                     |
|                    |              |            messages, as they do not have a <code>Viewed</code> status.</p>                         |
|                    |              |     </div>                                                                                         |
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
| <type>_resendSn    | string       | Parameter that defines the service names from which messages will be sent in resend mode.          |
|                    |              |                                                                                                    |
|                    |              | .. raw:: html                                                                                      |
|                    |              |                                                                                                    |
|                    |              |     <details>                                                                                      |
|                    |              |         <summary>More details</summary>                                                            |
|                    |              |         <p>                                                                                        |
|                    |              |             Here &lt;type&gt is a character that defines the type of message (<code>i, s, v, f, p, |
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
| <type>_resendText  | string       | Parameter that defines the alternative message text for different types of messages that will be   |
|                    |              | sent in resend mode.                                                                               |
|                    |              |                                                                                                    |
|                    |              | .. raw:: html                                                                                      |
|                    |              |                                                                                                    |
|                    |              |     <details>                                                                                      |
|                    |              |         <summary>More details</summary>                                                            |
|                    |              |         <p>                                                                                        |
|                    |              |             Here &lt;type&gt is a character that defines the type of message (<code>i, s, v, f, p, |
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
| <type>_resendValid | string       | Parameter that defines the lifespan for different types of messages sent in resend mode.           |
|                    |              |                                                                                                    |
|                    |              | .. raw:: html                                                                                      |
|                    |              |                                                                                                    |
|                    |              |     <details>                                                                                      |
|                    |              |         <summary>More details</summary>                                                            |
|                    |              |         <p>                                                                                        |
|                    |              |             Here &lt;type&gt is a character that defines the type of message (<code>i, s, v, f, p, |
|                    |              |             w</code>), for which the settings are applied.                                         |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             The lifespan means the interval during which the operator will attempt to deliver the  |
|                    |              |             message to the recipient. If the message lifespan has expired and the message has not  |
|                    |              |             been delivered, it will no longer be delivered to the recipient.                       |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             Acceptable lifespan ranges for different types of messages:                            |
|                    |              |         </p>                                                                                       |
|                    |              |         <ul>                                                                                       |
|                    |              |             <li>SMS — from 1 to 2880 minutes (up to 2 days);</li>                                  |
|                    |              |             <li>FlashingCall — from 1 to 5 minutes;</li>                                           |
|                    |              |             <li>VK — from 60 to 86400 seconds (up to 1 day);</li>                                  |
|                    |              |             <li>Viber — from 30 to 86400 seconds (up to 1 day);</li>                               |
|                    |              |             <li>Push — from 30 to 86400 seconds (up to 1 day);</li>                                |
|                    |              |             <li>WhatsApp — from 1 to 10080 minutes (on the operator's side, the value is rounded   |
|                    |              |                 to whole days).</li>                                                               |
|                    |              |         </ul>                                                                                      |
|                    |              |         <p>                                                                                        |
|                    |              |             The value format for the parameter is <code>YYMMDDhhmmsstnnp</code>, where:            |
|                    |              |         </p>                                                                                       |
|                    |              |         <ul>                                                                                       |
|                    |              |             <li><code>YY</code> — last two digits of the year;</li>                                |
|                    |              |             <li><code>MM</code> — a month (from 01 to 12);</li>                                    |
|                    |              |             <li><code>DD</code> — a day (from 01 to 31);</li>                                      |
|                    |              |             <li><code>hh</code> — an hour (from 00 to 23);</li>                                    |
|                    |              |             <li><code>mm</code> — a minute (from 00 to 59);</li>                                   |
|                    |              |             <li><code>ss</code> — a second (from 00 to 59);</li>                                   |
|                    |              |             <li><code>t</code> — a tenth of a second  (from 0 to 9);</li>                          |
|                    |              |             <li><code>nn</code> — a number of quarter-hours (15-minute intervals) indicating the   |
|                    |              |                 time difference between local time and UTC time (from 00 to 48). For example,      |
|                    |              |                 for 8 hours the value is 32;</li>                                                  |
|                    |              |             <li><code>p</code> — an attribute for scheduling message resending and lifespan        |
|                    |              |                 expiration (in absolute or relative time formats).</li>                            |
|                    |              |         </ul>                                                                                      |
|                    |              |         <p>                                                                                        |
|                    |              |             <i>Possible values for <code>p</code> in the absolute time format:</i>                 |
|                    |              |         </p>                                                                                       |
|                    |              |         <ul>                                                                                       |
|                    |              |             <li><code>+</code> — a shift of the local time in quarter-hour increments ahead of     |
|                    |              |                 UTC. For example, <code>08+</code> corresponds to GMT+2;</li>                      |
|                    |              |             <li><code>–</code> — a shift of the local time in quarter-hour increments behind UTC.  |
|                    |              |                 For example, <code>04–</code>responds to GMT–1.</li>                               |
|                    |              |         </ul>                                                                                      |
|                    |              |         <p>                                                                                        |
|                    |              |             Example 1. In the absolute time format 29.04.2025 22:00:00 (GMT+3) is encoded as       |
|                    |              |             <code>250429220000012+</code>.                                                         |
|                    |              |         </p>                                                                                       |
|                    |              |         <div class="admonition important">                                                         |
|                    |              |             <p class="admonition-title">Important</p>                                              |
|                    |              |             <p>In the absolute format <code>250429220000012+</code> for GMT+ timezones, the final  |
|                    |              |                plus sign must be appropriately encoded when sent in an HTTP request, i.e. in the   |
|                    |              |                query string it should appear as <code>250429220000012%2B</code>.</p>               |
|                    |              |         </div>                                                                                     |
|                    |              |         <p>                                                                                        |
|                    |              |             <i>The <code>p</code> attribute in the relative time format:</i>                       |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             <code>R</code> — message lifespan relative to the current time.                        |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             The values for tenths of a second (<code>t</code>) and the UTC offset (<code>nn</code>)|
|                    |              |             are ignored and must be set to <code>0</code> and <code>00</code>, respectively.       |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             Example 2. For a message lifespan of 3 minutes relative to the current time, the       |
|                    |              |             format is <code>000000000300000R</code>.                                               |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             <b>Absolute time format</b>                                                            |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             The default format. The scheduled resending time and message lifespan expiration are   |
|                    |              |             specified in the global UTC format, including a quarter-hour offset and a direction    |
|                    |              |             symbol (<code>+</code> or <code>–</code>).                                             |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             <b>Relative time format</b>                                                            |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             Relative time can be specified by setting the UTC orientation flag to <code>R</code>   |
|                    |              |             instead of <code>+</code> or <code>–</code>. In this format, the time is interpreted   |
|                    |              |             as a number of years, months, days, hours, minutes, and seconds relative to the        |
|                    |              |             current time.                                                                          |
|                    |              |             <br>For example, the following time format <code>020610233429000R</code>  will be      |
|                    |              |             interpreted as a relative period of 2 years, 6 months, 10 days, 23 hours, 34 minutes,  |
|                    |              |             and 29 seconds from the current time.                                                  |
|                    |              |         </p>                                                                                       |
|                    |              |     </details>                                                                                     |
+--------------------+--------------+----------------------------------------------------------------------------------------------------+
| shorten_list       | string       | Parameter designed to control the shortening of links in various types of cascaded messages.       |
|                    |              |                                                                                                    |
|                    |              | .. raw:: html                                                                                      |
|                    |              |                                                                                                    |
|                    |              |     <details>                                                                                      |
|                    |              |         <summary>More details</summary>                                                            |
|                    |              |     <div class="admonition important">                                                             |
|                    |              |         <p class="admonition-title">Important</p>                                                  |
|                    |              |         <p>This parameter will only be processed if the <code>order_list</code>                    |
|                    |              |            parameter is provided.</p>                                                              |
|                    |              |     </div>                                                                                         |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             The value of the <code>shorten_list</code> parameter may contain:                      |
|                    |              |         </p>                                                                                       |
|                    |              |         <ul>                                                                                       |
|                    |              |             <li>a list of message types (comma-separated) for which links need to be               |
|                    |              |                 shortened;</li>                                                                    |
|                    |              |             <li>an empty value (<code>shorten_list = </code>) if link shortening is not required   |
|                    |              |                 for all message types.</li>                                                        |
|                    |              |         </ul>                                                                                      |
|                    |              |         <p>                                                                                        |
|                    |              |             Possible values (case insensitive):                                                    |
|                    |              |         </p>                                                                                       |
|                    |              |         <ul>                                                                                       |
|                    |              |             <li><code>s</code> — SMS;</li>                                                         |
|                    |              |             <li><code>p</code> — Push;</li>                                                        |
|                    |              |             <li><code>v</code> — VK;</li>                                                          |
|                    |              |             <li><code>i</code> — Viber;</li>                                                       |
|                    |              |             <li><code>w</code> — WhatsApp.</li>                                                    |
|                    |              |         </ul>                                                                                      |
|                    |              |         <p>                                                                                        |
|                    |              |             Example: <code>shorten_list = S,I</code> means that links will be shortened only       |
|                    |              |             in SMS and Viber messages of the cascade.                                              |
|                    |              |         </p>                                                                                       |
|                    |              |         <p>                                                                                        |
|                    |              |             By default, the <a href="https://docs.rapporto.ru/api/http/http_short_link.html">Link  |
|                    |              |             Shortening Service</a> is not available. To enable it, please contact your account     |
|                    |              |             manager.                                                                               |
|                    |              |         </p>                                                                                       |
|                    |              |     </details>                                                                                     |
+--------------------+--------------+----------------------------------------------------------------------------------------------------+

.. raw:: html
    
    <div class="admonition note">
        <p class="admonition-title">Note</p>
        <p>
        Example of the sequence for a configured cascading message sending: VK → Viber → SMS.
        </p>
        <ol>
            <li>The message will be sent into VK.</li>
            <li>If the message is successfully delivered, the cascading is completed (go to step 6).</li>
            <li>If the message is not delivered due to an error or within the specified time to live, the message will be resent via Viber.</li>
            <li>If the message is successfully delivered, the cascading is completed (go to step 6).</li>
            <li>If the message is not delivered due to an error or within the specified time to live, an SMS message will be sent.</li>
            <li>The Partner receives the final status of message sending (optionally - all intermediate statuses).</li>
        </ol>
    </div>                                                                           
