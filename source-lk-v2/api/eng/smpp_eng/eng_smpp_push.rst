Push
=====

Text sending and additional parameters are available in push notifications.


Request to Send Messages  
==========================

To send a message, the Partner needs to :ref:`establish a connection <linkSettingeng>` to the server and transmit the ``submit_sm`` packet to the Service Provider.
This packet must contain all required message parameters and may also include optional :abbr:`TLV (Tag Length Value)` parameters.

.. raw:: html
    
    <div class="admonition note">
        <p class="admonition-title">Note</p>
        <p>If additional functionality is required, specify the values for the corresponding TLV parameters. Their descriptions are provided in the following sections of the website:
        <li><a href="https://doc.rapporto.ru/api/eng/smpp_eng/eng_smpp_cascade.html">Cascade Message Sending</a> </li> 
        <li><a href="https://doc.rapporto.ru/api/eng/smpp_eng/eng_smpp_short_link.html">Link Shortening Service</a> </li> 
    </div>                                                                           


Main Request Parameters
----------------------------

+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| Parameter                 | Type                     | Description                                                                                                |
+===========================+==========================+============================================================================================================+
| source_addr               | string                   | Service name from which the message is sent.                                                               |
|                           |                          |                                                                                                            |
|                           |                          | .. raw:: html                                                                                              |
|                           |                          |                                                                                                            |
|                           |                          |     <details>                                                                                              |
|                           |                          |         <summary>More details</summary>                                                                    |
|                           |                          |         <p>                                                                                                |
|                           |                          |             If this parameter is absent, the message is sent from the default name configured on the       |                                                   
|                           |                          |             Service Provider's platform (as per the Partner's request).                                    |
|                           |                          |         </p>                                                                                               |
|                           |                          |         <p>                                                                                                |                                                   
|                           |                          |             The encoding for the <code>source_addr</code> parameter value is ASCII (according to the SMPP  |
|                           |                          |             protocol).                                                                                     |
|                           |                          |         </p>                                                                                               |
|                           |                          |     </details>                                                                                             |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| destination_addr          | string                   | Subscriber's phone number.                                                                                 |
|                           |                          |                                                                                                            |
|                           |                          | .. raw:: html                                                                                              |
|                           |                          |                                                                                                            |
|                           |                          |     <details>                                                                                              |
|                           |                          |         <summary>More details</summary>                                                                    |
|                           |                          |         <p>                                                                                                |
|                           |                          |             Maximum length is 25 characters.                                                               |                                                   
|                           |                          |         </p>                                                                                               |
|                           |                          |         <p>                                                                                                |
|                           |                          |             Examples: <code>79036550550</code>, <code>+79036550550</code>, <code>8-903-655-05-50</code>,   |  
|                           |                          |             <code>89036550550</code>.                                                                      |
|                           |                          |         </p>                                                                                               |
|                           |                          |     </details>                                                                                             |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| short_message             | string                   | Message to be sent to the subscriber.                                                                      |
|                           |                          |                                                                                                            | 
|                           |                          | .. raw:: html                                                                                              |
|                           |                          |                                                                                                            |
|                           |                          |     <details>                                                                                              |
|                           |                          |         <summary>More details</summary>                                                                    |
|                           |                          |         <p>                                                                                                |
|                           |                          |             Maximum push message length is 1000 characters.                                                |                                                   
|                           |                          |         </p>                                                                                               |
|                           |                          |         <p>                                                                                                |
|                           |                          |             Maximum user data length for the <code>short_message</code> field: 254 octets.                 |                                                   
|                           |                          |         </p>                                                                                               |
|                           |                          |         <p>                                                                                                |
|                           |                          |             Text messages longer than 254 octets are recommended to be sent in a single PDU in the TLV     |  
|                           |                          |             parameter: <code>message_payload</code>, <code>id = 0x0424</code>. Message data should be      |
|                           |                          |             inserted either into the <code>short_message</code> field or into the                          |
|                           |                          |             <code>message_payload</code> field.                                                            |
|                           |                          |         </p>                                                                                               |
|                           |                          |     <div class="admonition warning">                                                                       |
|                           |                          |         <p class="admonition-title">Warning</p>                                                            |
|                           |                          |         <p>Simultaneous use of both fields is not allowed. When using the                                  |
|                           |                          |            <code>message_payload</code> parameter, the value of the <code>short_message</code>             |
|                           |                          |            parameter should not be specified.</p>                                                          |
|                           |                          |     </div>                                                                                                 |
|                           |                          |         <p>                                                                                                |
|                           |                          |            The Service Provider's SMPP server supports the reassembly of multipart messages using one      |  
|                           |                          |            of the following methods:                                                                       |
|                           |                          |         </p>                                                                                               |
|                           |                          |         <ul>                                                                                               |
|                           |                          |             <li>UDH-8;</li>                                                                                |
|                           |                          |             <li>UDH-16;</li>                                                                               |
|                           |                          |             <li>Using TLV parameters.</li>                                                                 |
|                           |                          |         </ul>                                                                                              |
|                           |                          |     </details>                                                                                             |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| data_coding               | integer                  | Encoding scheme/type of the message text.                                                                  |
|                           |                          |                                                                                                            |
|                           |                          | .. raw:: html                                                                                              |
|                           |                          |                                                                                                            |
|                           |                          |     <details>                                                                                              |
|                           |                          |         <summary>More details</summary>                                                                    |
|                           |                          |         <p>                                                                                                |
|                           |                          |             It is set in accordance with the GSM 03.38 standard.                                           |                                                   
|                           |                          |         </p>                                                                                               |
|                           |                          |         <p>                                                                                                |
|                           |                          |             Valid values:                                                                                  |                                                   
|                           |                          |         </p>                                                                                               |
|                           |                          |         <ul>                                                                                               |
|                           |                          |             <li><code>0</code> — DEFAULT, default encoding;</li>                                           |
|                           |                          |             <li><code>1</code> — ASCII;</li>                                                               |
|                           |                          |             <li><code>3</code> — LATIN1;</li>                                                              |
|                           |                          |             <li><code>6</code> — LATIN_CYR;</li>                                                           |
|                           |                          |             <li><code>8</code> — UCS2.</li>                                                                |
|                           |                          |         </ul>                                                                                              |
|                           |                          |         <p>                                                                                                |
|                           |                          |             If the text encoding differs from those listed above, the platform will treat the message      |   
|                           |                          |             as binary.                                                                                     |           
|                           |                          |         </p>                                                                                               |
|                           |                          |         <p>                                                                                                |
|                           |                          |             It is recommended to use the <code>UCS2</code> encoding                                        | 
|                           |                          |             (<code>data_coding = 8</code>) to send the text of the message.                                |
|                           |                          |         </p>                                                                                               |
|                           |                          |         <p>                                                                                                |
|                           |                          |             To send messages in Latin, it is possible to use <code>data_coding = 0</code>,                 | 
|                           |                          |             which corresponds to the GSM DEFAULT ALPHABET or ASCII, as chosen by the Partner               |
|                           |                          |             (a unified setting for receiving and sending messages).                                        |
|                           |                          |         </p>                                                                                               |
|                           |                          |     </details>                                                                                             |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| esm_class                 | integer                  | Set of values for this parameter is specified by the SMPP protocol version 3.4, section 5.2.12.            |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| registered_delivery       | integer                  | Parameter specifies whether the Partner requires delivery status notifications.                            |
|                           |                          |                                                                                                            |
|                           |                          | .. raw:: html                                                                                              |
|                           |                          |                                                                                                            |
|                           |                          |     <details>                                                                                              |
|                           |                          |         <summary>More details</summary>                                                                    |
|                           |                          |         <p>                                                                                                |
|                           |                          |             Possible values:                                                                               |                                                   
|                           |                          |         </p>                                                                                               |
|                           |                          |         <ul>                                                                                               |
|                           |                          |             <li><code>0</code> — the Partner does not require delivery status notification;</li>           |
|                           |                          |             <li><code>1</code> — the Partner requires delivery status notification;</li>                   |
|                           |                          |             <li><code>2</code> — the Partner requires notification only if the message is not delivered    |
|                           |                          |                  to the subscriber.</li>                                                                   |
|                           |                          |         </ul>                                                                                              |
|                           |                          |         <p>                                                                                                |
|                           |                          |             This option can be configured by default on the Service Provider's side                        |   
|                           |                          |             (upon the Partner's request).                                                                  |           
|                           |                          |         </p>                                                                                               |
|                           |                          |     </details>                                                                                             |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| schedule_delivery_time    | string                   | Scheduled message delivery date and time.                                                                  |
|                           |                          |                                                                                                            |
|                           |                          | .. raw:: html                                                                                              |
|                           |                          |                                                                                                            |
|                           |                          |     <details>                                                                                              |
|                           |                          |         <summary>More details</summary>                                                                    |
|                           |                          |         <p>                                                                                                |
|                           |                          |             The Service Provider's platform has a restriction, namely, the scheduled date and time         |          
|                           |                          |             cannot be later than a specified period from the current moment.                               |
|                           |                          |         </p>                                                                                               |
|                           |                          |         <p>                                                                                                |
|                           |                          |             The exact limits of this restriction should be clarified with the Service Provider's           |      
|                           |                          |             support team.                                                                                  |
|                           |                          |         </p>                                                                                               |
|                           |                          |         <p>                                                                                                |
|                           |                          |             The <code>schedule_delivery_time</code> field can be set in either relative or absolute format.|          
|                           |                          |         </p>                                                                                               |
|                           |                          |         <p>                                                                                                |
|                           |                          |             Furthermore, a special format is available to specify a delivery interval based on the         |          
|                           |                          |             subscriber's local time zone, derived automatically from their phone number.                   |                
|                           |                          |         </p>                                                                                               |
|                           |                          |         <p>                                                                                                |
|                           |                          |             Value format for the <code>YYMMDDhhmmsstnnp</code> parameter, where:                           |                                                   
|                           |                          |         </p>                                                                                               |
|                           |                          |         <ul>                                                                                               |
|                           |                          |             <li><code>YYMMDDhhmmss</code> — year, month, day, hours, minutes, seconds;</li>                |
|                           |                          |             <li><code>t</code> — tenths of seconds;</li>                                                   |
|                           |                          |             <li><code>nn</code> — quarters of an hour (15-minute intervals), e.g., for 8 hours the value   |
|                           |                          |                 will be <code>32</code>;</li>                                                              |
|                           |                          |             <li><code>p</code> — shift. Possible values: </li>                                             |
|                           |                          |         </ul>                                                                                              |
|                           |                          |         <ul>                                                                                               |
|                           |                          |             <ul>                                                                                           |
|                           |                          |                 <li><code>+</code> and <code>–</code> specify the time shift in quarter hours relative to  |
|                           |                          |                 GMT, for example, <code>08+</code> corresponds to GMT+2, and <code>04–</code> corresponds  |
|                           |                          |                 to GMT-1;</li>                                                                             |
|                           |                          |                 <li><code>R</code> — values <code>t</code> and <code>nn</code> are ignored, the rest is    |
|                           |                          |                 added to the current local time;</li>                                                      |
|                           |                          |                 <li><code>А</code> — the date and time are considered to be in the subscriber's local      |
|                           |                          |                 time and specify the start of a possible sending interval, while the quarters specify      |
|                           |                          |                 the length of this interval. Sending occurs within the specified time, even if the date    |
|                           |                          |                 is in the past. For example, if the current time is 10:00 am and the window is set for     |
|                           |                          |                 "yesterday" from 3:00 pm to 6:00 pm, the message will not be sent before 3:00 pm. If the   |
|                           |                          |                 interval has already ended on the current day, its start is moved to the next day.</li>    |
|                           |                          |             </ul>                                                                                          |
|                           |                          |         </ul>                                                                                              |
|                           |                          |     </details>                                                                                             |  
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| validity_period           | string                   | Message lifetime.                                                                                          |
|                           |                          |                                                                                                            |
|                           |                          | .. raw:: html                                                                                              |
|                           |                          |                                                                                                            |
|                           |                          |     <details>                                                                                              |
|                           |                          |         <summary>More details</summary>                                                                    |
|                           |                          |         <p>                                                                                                |
|                           |                          |             Validity period for push: from 30 to 86400 seconds (up to 24 hours).                           |          
|                           |                          |         </p>                                                                                               |
|                           |                          |         <p>                                                                                                |
|                           |                          |              Value format for the <code>YYMMDDhhmmsstnnp</code> parameter, where:                          |          
|                           |                          |         </p>                                                                                               |
|                           |                          |         <ul>                                                                                               |
|                           |                          |             <li><code>YYMMDDhhmmss</code> — year, month, day, hours, minutes, seconds;</li>                |
|                           |                          |             <li><code>t</code> — tenths of seconds;</li>                                                   |
|                           |                          |             <li><code>nn</code> — quarters of an hour (15-minute intervals), e.g., for 8 hours the value   |
|                           |                          |                 will be <code>32</code>;</li>                                                              |
|                           |                          |             <li><code>p</code> — shift. Possible values:</li>                                              |  
|                           |                          |         </ul>                                                                                              |
|                           |                          |         <ul>                                                                                               |
|                           |                          |             <ul>                                                                                           |
|                           |                          |                 <li><code>+</code> and <code>–</code> specify the time shift in quarter hours relative to  |
|                           |                          |                 GMT, for example, <code>08+</code> corresponds to GMT+2, and <code>04–</code>              |
|                           |                          |                 corresponds to GMT-1;</li>                                                                 |
|                           |                          |                 <li><code>R</code> — values <code>t</code> and <code>nn</code> are ignored,                |
|                           |                          |                 the rest is added to the current local time.</li>                                          |
|                           |                          |     </details>                                                                                             | 
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+


TLV Parameters
-----------------------

TLV parameters for sending messages from the Partner to the Service Provider.

+---------------------------+---------------------+-------------------+-------------------+--------------------------------------------------------------------------------------+
| TLV Parameter             | Field               | Octets size       | Type              | Description                                                                          |
+===========================+=====================+===================+===================+======================================================================================+
| message_payload           | Tag                 | 2                 | Integer           | id = 0x0424                                                                          |
|                           +---------------------+-------------------+-------------------+--------------------------------------------------------------------------------------+
|                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                                   |
|                           +---------------------+-------------------+-------------------+--------------------------------------------------------------------------------------+
|                           | Value               | up to 2048        | Octet String      | Contains the extended short message user data, longer than 254 octets.               |
|                           |                     |                   |                   |                                                                                      |
|                           |                     |                   |                   | .. raw:: html                                                                        |
|                           |                     |                   |                   |                                                                                      |
|                           |                     |                   |                   |     <details>                                                                        |
|                           |                     |                   |                   |         <summary>More details</summary>                                              |
|                           |                     |                   |                   |         <p>                                                                          |
|                           |                     |                   |                   |             The short message data should be inserted in either the                  |  
|                           |                     |                   |                   |             <code>short_message</code> or <code>message_payload</code> fields.       | 
|                           |                     |                   |                   |             Both fields should not be used simultaneously.                           |
|                           |                     |                   |                   |         </p>                                                                         |
|                           |                     |                   |                   |         <p>                                                                          |
|                           |                     |                   |                   |             Both fields should not be used simultaneously.                           |
|                           |                     |                   |                   |         </p>                                                                         |
|                           |                     |                   |                   |         <p>                                                                          |
|                           |                     |                   |                   |             The <code>short_message</code> field should be set to zero if using the  |  
|                           |                     |                   |                   |             <code>message_payload</code> field.                                      | 
|                           |                     |                   |                   |         </p>                                                                         |
|                           |                     |                   |                   |     </details>                                                                       |  
+---------------------------+---------------------+-------------------+-------------------+--------------------------------------------------------------------------------------+
| ptag                      | Tag                 | 2                 | Integer           | id = 0x1411                                                                          |
|                           +---------------------+-------------------+-------------------+--------------------------------------------------------------------------------------+
|                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                                   |
|                           +---------------------+-------------------+-------------------+--------------------------------------------------------------------------------------+
|                           | Value               | up to 1000        | Octet String      | Message identifier in the Partner's system.                                          |
|                           |                     |                   |                   |                                                                                      |
|                           |                     |                   |                   | .. raw:: html                                                                        |
|                           |                     |                   |                   |                                                                                      |
|                           |                     |                   |                   |     <details>                                                                        |
|                           |                     |                   |                   |         <summary>More details</summary>                                              |
|                           |                     |                   |                   |         <p>                                                                          |
|                           |                     |                   |                   |             May contain from 1 to 50 characters.                                     |  
|                           |                     |                   |                   |         </p>                                                                         |
|                           |                     |                   |                   |         <p>                                                                          |
|                           |                     |                   |                   |             Allowed characters: 0...9a...zA...Z-.                                    |  
|                           |                     |                   |                   |         </p>                                                                         |     
|                           |                     |                   |                   |         <p>                                                                          |
|                           |                     |                   |                   |             It can be any identifier in the Partner's system.                        |  
|                           |                     |                   |                   |         </p>                                                                         |  
|                           |                     |                   |                   |         <p>                                                                          |
|                           |                     |                   |                   |             For example, a unique message identifier or an identifier                |  
|                           |                     |                   |                   |             of the department initiating sending a request.                          |
|                           |                     |                   |                   |         </p>                                                                         |
|                           |                     |                   |                   |         <p>                                                                          |
|                           |                     |                   |                   |             The Service Provider does not control the values passed in               |  
|                           |                     |                   |                   |             the <code>ptag</code> parameter (only format compliance is               |
|                           |                     |                   |                   |             checked). The Service Provider optionally returns this                   |
|                           |                     |                   |                   |             identifier to the Partner when sending the message delivery              |                                                 
|                           |                     |                   |                   |             status (see                                                              |                                 
|                           |                     |                   |                   |             <a href="https://doc.rapporto.ru/api/eng/smpp_eng/eng_smpp_status.html"> | 
|                           |                     |                   |                   |             Delivery Status Service</a>).                                            |
|                           |                     |                   |                   |         </p>                                                                         |     
|                           |                     |                   |                   |     </details>                                                                       |
+---------------------------+---------------------+-------------------+-------------------+--------------------------------------------------------------------------------------+


Response  
===========

In response to the ``submit_sm`` packet, the Service Provider's server replies with the ``submit_sm_resp`` packet containing the ``command_status`` field.

If the packet is accepted and processed successfully, the body of the ``submit_sm_resp`` packet will contain a ``message_id`` unique identifier (a positive integer) 
assigned to this PDU by the Service Provider's server. 

Subsequently, the ``message_id`` value is used by the Partner to receive and analyze message delivery statuses.

Possible values for the ``command_status`` field are provided in the tables below.


Successful Sending 
---------------------

In case of successful sending, the ``0x00`` response code (HEX) is returned.
          
+---------------------+-----------------------------------------------------+---------------------------------------------------------+
| Code (HEX)          | Description                                         | Partner Action                                          |
+=====================+=====================================================+=========================================================+
| 0x00                | The packet received successfully.                   | No errors, common service's operation.                  |
|                     |                                                     | No Partner's action needed.                             |
+---------------------+-----------------------------------------------------+---------------------------------------------------------+


Sending Errors  
------------------

For invalid results, the response code (HEX) will be different from ``0x00``. 

+---------------------+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------+
| Code (HEX)          | Description                                               | Partner Action                                                                                   |
+=====================+===========================================================+==================================================================================================+
| 0x01                | Message text length exceeded.                             | .. raw:: html                                                                                    |
|                     |                                                           |                                                                                                  |
|                     |                                                           |     <details>                                                                                    |
|                     |                                                           |         <summary>Troubleshooting</summary>                                                       |
|                     |                                                           |         <p>                                                                                      |
|                     |                                                           |             The Partner can shorten the text to the allowed values and retry sending the         |
|                     |                                                           |             message.                                                                             |
|                     |                                                           |         </p>                                                                                     |
|                     |                                                           |     </details>                                                                                   |
+---------------------+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------+
| 0x03                | The Partner sent a PDU of an unsupported type             | .. raw:: html                                                                                    |
|                     | (``query_sm``, ``submit_multi``, ``data_sm``, etc.).      |                                                                                                  |
|                     |                                                           |     <details>                                                                                    |
|                     |                                                           |         <summary>Troubleshooting</summary>                                                       |
|                     |                                                           |         <p>                                                                                      |
|                     |                                                           |            The Partner fixes the errors on their side.                                           |
|                     |                                                           |         </p>                                                                                     |
|                     |                                                           |     </details>                                                                                   |
+---------------------+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------+
| 0x08                | System error on the server.                               | .. raw:: html                                                                                    |
|                     |                                                           |                                                                                                  |
|                     |                                                           |     <details>                                                                                    |
|                     |                                                           |         <summary>Troubleshooting</summary>                                                       |
|                     |                                                           |         <p>                                                                                      |
|                     |                                                           |             The Partner can retry sending the message.                                           |
|                     |                                                           |         </p>                                                                                     |
|                     |                                                           |         <p>                                                                                      |
|                     |                                                           |             If the error persists, stop trying to send the                                       |
|                     |                                                           |             message and contact the                                                              |                      
|                     |                                                           |             <a href="https://doc.rapporto.ru/api/eng/eng_support.html#technical-support-service">|   
|                     |                                                           |             Technical Support Service</a>,                                                       |        
|                     |                                                           |             providing the most comprehensive information about                                   |
|                     |                                                           |             the conditions for the occurrence of this error.                                     |
|                     |                                                           |         </p>                                                                                     |
|                     |                                                           |     </details>                                                                                   |
+---------------------+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------+
| 0x0A                | Invalid sender name.                                      | .. raw:: html                                                                                    |
|                     |                                                           |                                                                                                  |
|                     | .. raw:: html                                             |     <details>                                                                                    |
|                     |                                                           |         <summary>Troubleshooting</summary>                                                       |
|                     |    <details>                                              |         <p>                                                                                      |
|                     |        <summary>More details</summary>                    |             The Partner must fix the errors on their side and can resend the message with        |
|                     |        <p>                                                |             the correct <code>source_addr</code> parameter value.                                |
|                     |            The Partner sent in the                        |         </p>                                                                                     |
|                     |            <code>source_addr</code> parameter a value     |     </details>                                                                                   |
|                     |            from which sending messages to subscribers is  |                                                                                                  |
|                     |            not allowed.                                   |                                                                                                  |
|                     |        </p>                                               |                                                                                                  |
|                     |    </details>                                             |                                                                                                  |
+---------------------+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------+
| 0x0B                | Invalid recipient number.                                 | .. raw:: html                                                                                    |
|                     |                                                           |                                                                                                  |
|                     | .. raw:: html                                             |     <details>                                                                                    |
|                     |                                                           |         <summary>Troubleshooting</summary>                                                       |
|                     |    <details>                                              |         <p>                                                                                      |
|                     |        <summary>More details</summary>                    |             The Partner should not resend messages.                                              |
|                     |        <p>                                                |         </p>                                                                                     |
|                     |            An attempt was made to send a message          |         <p>                                                                                      |
|                     |            to a number that is not allowed to send        |             The Partner should contact the Service Provider's manager to find out                |
|                     |            messages.                                      |             whether it is possible to send messages to this number.                              |
|                     |        </p>                                               |         </p>                                                                                     |
|                     |     </details>                                            |      </details>                                                                                  |
|                     |                                                           |                                                                                                  |
+---------------------+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------+
| 0x0C                | Invalid ptag TLV parameter value passed (``id = 0x1411``).| .. raw:: html                                                                                    |
|                     |                                                           |                                                                                                  |
|                     |                                                           |     <details>                                                                                    |
|                     |                                                           |         <summary>Troubleshooting</summary>                                                       |
|                     |                                                           |         <p>                                                                                      |
|                     |                                                           |             The Partner corrects the parameter value and can retry to send the message.          |
|                     |                                                           |         </p>                                                                                     |
|                     |                                                           |     </details>                                                                                   |
+---------------------+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------+
| 0x14                | The queue for sending messages from the                   | .. raw:: html                                                                                    |
|                     | Partner has reached the maximum allowed value.            |                                                                                                  |
|                     |                                                           |                                                                                                  |
|                     | .. raw:: html                                             |     <details>                                                                                    |
|                     |                                                           |         <summary>Troubleshooting</summary>                                                       |
|                     |    <details>                                              |         <p>                                                                                      |
|                     |        <summary>More details</summary>                    |             The Partner pauses the SMS sending process (<code>submit_sm</code>)                  |
|                     |        <p>                                                |             for 5 seconds, then resumes sending. The Partner can retry sending the messages      |
|                     |            Example: The maximum number of messages        |             that failed.                                                                         |
|                     |            in the queue for sending to subscribers is set |         </p>                                                                                     |
|                     |            to 100 messages for the Partner's service.     |         <p>                                                                                      |
|                     |        </p>                                               |             If the error repeats more than five times in a row, stop sending messages and        |
|                     |        <p>                                                |             contact the                                                                          |                                                                       
|                     |           If more than 100 messages accumulate,           |             <a href="https://doc.rapporto.ru/api/eng/eng_support.html#technical-support-service">|
|                     |           the Service Provider will respond with this     |             Technical Support Service</a>, providing the most comprehensive information about    |
|                     |           error code until the queue is reduced.          |             the conditions for the occurrence of this error.                                     |
|                     |        </p>                                               |         </p>                                                                                     |          
|                     |     </details>                                            |      </details>                                                                                  | 
+---------------------+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------+
| 0x45                | An attempt to send messages after the end of              | .. raw:: html                                                                                    |
|                     | the trial period or when the number of                    |                                                                                                  |
|                     | messages allowed for the trial period is exceeded.        |     <details>                                                                                    |
|                     |                                                           |         <summary>Troubleshooting</summary>                                                       |
|                     |                                                           |         <p>                                                                                      |
|                     |                                                           |             The Partner must not retry sending the message.                                      |
|                     |                                                           |         </p>                                                                                     |
|                     |                                                           |     </details>                                                                                   |
+---------------------+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------+
| 0x55                | The threshold for the maximum number of response          | .. raw:: html                                                                                    |
|                     | messages for the “request-response” or “mixed”            |                                                                                                  |
|                     | mode has been exceeded.                                   |     <details>                                                                                    |
|                     |                                                           |         <summary>Troubleshooting</summary>                                                       |
|                     |                                                           |         <p>                                                                                      |
|                     |                                                           |             The Partner needs to wait for the next incoming message from the subscriber.         |
|                     |                                                           |         </p>                                                                                     |
|                     |                                                           |     </details>                                                                                   |
+---------------------+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------+
| 0x58                | The bandwidth set for the Partner has been                | .. raw:: html                                                                                    |
|                     | exceeded.                                                 |                                                                                                  |
|                     |                                                           |                                                                                                  |
|                     | .. raw:: html                                             |     <details>                                                                                    |
|                     |                                                           |         <summary>Troubleshooting</summary>                                                       |
|                     |    <details>                                              |         <p>                                                                                      |
|                     |        <summary>More details</summary>                    |             The Partner stops the sending process                                                |
|                     |        <p>                                                |             (<code>submit_sm</code>) for 5 seconds, then resumes sending without exceeding       |
|                     |            Example. The Partner service has a rate limit  |              the allowed speed.                                                                  |
|                     |            of 10 messages per second.                     |         </p>                                                                                     |
|                     |            The Partner sent 12 messages per second.       |         <p>                                                                                      |
|                     |            The first 10 messages will be successfully     |             The Partner can retry sending the messages that                                      |
|                     |            processed: the Service Provider will send      |             failed.                                                                              |
|                     |            messages to subscribers.                       |         </p>                                                                                     |
|                     |        </p>                                               |       </details>                                                                                 |
|                     |        <p>                                                |                                                                                                  |                                                                       
|                     |           In response to the last 2 messages, the         |                                                                                                  |
|                     |           Service Provider will return the                |                                                                                                  |
|                     |           <code>0x58</code> error code to the Partner     |                                                                                                  |
|                     |           and will not send these 2 messages to           |                                                                                                  |    
|                     |           subscribers.                                    |                                                                                                  |
|                     |         </p>                                              |                                                                                                  | 
|                     |    </details>                                             |                                                                                                  | 
+---------------------+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------+
| 0x61                | Incorrect value of the ``schedule_delivery_time``         | .. raw:: html                                                                                    |
|                     | parameter specified.                                      |                                                                                                  |
|                     |                                                           |     <details>                                                                                    |
|                     |                                                           |         <summary>Troubleshooting</summary>                                                       |
|                     |                                                           |         <p>                                                                                      |
|                     |                                                           |             The Partner must fix the errors on their side and can then retry with the            |
|                     |                                                           |             the correct <code>schedule_delivery_time</code>.                                     |                        
|                     |                                                           |         </p>                                                                                     |
|                     |                                                           |     </details>                                                                                   |
+---------------------+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------+
| 0x62                | Transaction duration limit exceeded.                      | .. raw:: html                                                                                    |
|                     |                                                           |                                                                                                  |
|                     | .. raw:: html                                             |     <details>                                                                                    |
|                     |                                                           |         <summary>Troubleshooting</summary>                                                       |
|                     |    <details>                                              |         <p>                                                                                      |
|                     |        <summary>More details</summary>                    |             The Partner can retry sending with the correct <code>schedule_delivery_time</code>   |
|                     |        <p>                                                |             value.                                                                               |
|                     |           The error occurs if the value passed in the     |         </p>                                                                                     |
|                     |           <code>schedule_delivery_time</code>             |     </details>                                                                                   |
|                     |           parameter is out of range.                      |                                                                                                  |
|                     |        </p>                                               |                                                                                                  |
|                     |    </details>                                             |                                                                                                  | 
+---------------------+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------+
| 0xAB                | An attempt to send a duplicate message was made.          | .. raw:: html                                                                                    |
|                     |                                                           |                                                                                                  |
|                     | .. raw:: html                                             |     <details>                                                                                    |
|                     |                                                           |         <summary>Troubleshooting</summary>                                                       |
|                     |    <details>                                              |         <p>                                                                                      |
|                     |        <summary>More details</summary>                    |             The Partner must not retry sending the message.                                      |
|                     |        <p>                                                |         </p>                                                                                     |
|                     |            Example. The duplicate blocking feature is     |     </details>                                                                                   |
|                     |            enabled for the Partner's service. The Partner |                                                                                                  |
|                     |            sent 3 requests to send a message to the same  |                                                                                                  |
|                     |            subscriber number with the same text within    |                                                                                                  |
|                     |            24 hours. The first request will be            |                                                                                                  |
|                     |            successfully processed and the message will    |                                                                                                  |
|                     |            be sent to the subscriber.                     |                                                                                                  |
|                     |        </p>                                               |                                                                                                  |
|                     |        <p>                                                |                                                                                                  |
|                     |            In response to the last 2 requests, the Service|                                                                                                  |
|                     |            Provider will return the <code>0xAB</code>     |                                                                                                  |
|                     |            error code to  the Partner and will not send   |                                                                                                  |
|                     |            these 2 messages to the subscriber.            |                                                                                                  |
|                     |        </p>                                               |                                                                                                  |
|                     |        <p>                                                |                                                                                                  |
|                     |            The feature of blocking duplicates is          |                                                                                                  |
|                     |            disabled by default for the Partner. The       |                                                                                                  |
|                     |            feature can be enabled at the request of the   |                                                                                                  |
|                     |            Partner.                                       |                                                                                                  |
|                     |        </p>                                               |                                                                                                  |
|                     |    </details>                                             |                                                                                                  | 
+---------------------+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------+
| 0xC4                | The partner sent an incorrect value in one of             | .. raw:: html                                                                                    |
|                     | the TLV parameters.                                       |                                                                                                  |
|                     |                                                           |     <details>                                                                                    |
|                     |                                                           |         <summary>Troubleshooting</summary>                                                       |
|                     |                                                           |         <p>                                                                                      |
|                     |                                                           |             The Partner must fix the errors on their side and can then retry sending             |
|                     |                                                           |             the message with the correct set of parameters.                                      |
|                     |                                                           |         </p>                                                                                     |
|                     |                                                           |     </details>                                                                                   |
+---------------------+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------+
| 0x500               | The error will occur if in the settings of the integrated | .. raw:: html                                                                                    |
|                     | SMPP client under the protocol parameters (“Protocol      |                                                                                                  |
|                     | Parameters”), a specific concatenation method             |     <details>                                                                                    |
|                     | (“Concatenate via UDH” or “Concatenate via TLV”)          |         <summary>Troubleshooting</summary>                                                       |
|                     | is selected, and the SMPP client sends a packet that      |         <p>                                                                                      |
|                     | does not conform to this type of processing.              |             When this error occurs, the Partner stops the process of sending messages, changes   |
|                     |                                                           |             the method of sending these messages on their side (TLV or UDH), repeats             |
|                     | .. raw:: html                                             |             sending these messages.                                                              |
|                     |                                                           |         </p>                                                                                     |
|                     |    <details>                                              |         <p>                                                                                      |
|                     |        <summary>More details</summary>                    |             If the error occurs again after the changes made, please contact the                 |
|                     |        <p>                                                |             <a href="https://doc.rapporto.ru/api/eng/eng_support.html#technical-support-service">|
|                     |            The error will not occur if the “Detect        |             Technical Support Service</a> providing the most comprehensive information about     |
|                     |            automatically” option (set by default)         |             the conditions for the occurrence of this error.                                     |
|                     |            is selected. In this case, upon receiving data |         </p>                                                                                     |
|                     |            from the SMPP client, the packet type is       |       </details>                                                                                 |
|                     |            automatically determined, and the message      |                                                                                                  |
|                     |            concatenation is performed according to        |                                                                                                  |
|                     |            the specified method.                          |                                                                                                  |
|                     |        </p>                                               |                                                                                                  |
|                     |    </details>                                             |                                                                                                  |
+---------------------+-----------------------------------------------------------+--------------------------------------------------------------------------------------------------+

.. raw:: html
    
    <div class="admonition note">
        <p class="admonition-title">Note</p>
        <p>If the Partner's service does not respond to the Service Provider's requests,
        <a href="https://doc.rapporto.ru/api/eng/smpp_eng/eng_smpp_request.html#eng-reprocessing">Message Reprocessing</a> is performed.</p>
    </div>                                                                           




Push Notification Delivery Statuses
=====================================

To receive push notification statuses, you need to configure the :doc:`eng_smpp_status`.

Delivery Error Codes
-----------------------

Delivery error codes for each message type are provided in the corresponding tab of the :ref:`SMPP-ErrCodeDescr-eng` section.
