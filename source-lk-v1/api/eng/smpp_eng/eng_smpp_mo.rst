
Mobile Originated Messages
===========================

A subscriber can reply to a Partner's message. To enable this, the Partner should configure the ability to receive incoming Mobile Originated messages.

Please contact your supervising manager to activate this functionality. Be prepared to provide the following information:

1. The keyword with synonyms (or a regular expression) to identify Partner's messages.
2. The service name to which the service will be provided.
3. The message text to be sent to the subscriber if the Partner's server is unavailable.

The ``deliver_sm`` PDU is used to send messages from the Service Provider's platform to the Partner's service.

The Partner responds to the ``deliver_sm`` packet with the ``deliver_sm_resp`` packet where ``command_status`` = 0.

If no response is received from the Partner within the specified timeout period, the message from point 3 will be sent to the subscriber.

The table below describes the parameters used in the Service Provider's request when processing incoming messages.

+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| Parameter                 | Type                     | Description                                                                                                |
+===========================+==========================+============================================================================================================+
| source_addr               | string                   | Sender. The subscriber's phone number.                                                                     |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| destination_addr          | string                   | Receiver. The service name.                                                                                |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+
| short_message             | string                   | Text of the message from the subscriber.                                                                   |
|                           |                          |                                                                                                            |
|                           |                          | .. raw:: html                                                                                              |
|                           |                          |                                                                                                            |
|                           |                          |     <details>                                                                                              |
|                           |                          |         <summary>More details</summary>                                                                    |
|                           |                          |         <p>                                                                                                |
|                           |                          |             Long messages made up of multiple parts can be sent to the Partner in different ways:          |         
|                           |                          |         </p>                                                                                               |
|                           |                          |         <ul>                                                                                               |
|                           |                          |             <li>as multiple PDUs with concatenation using the UDH-8 algorithm, which is the default        |
|                           |                          |                 setting;</li>                                                                              |
|                           |                          |             <li>as multiple PDUs with concatenation using the UDH-16 algorithm;</li>                       |
|                           |                          |             <li>as multiple PDUs with concatenation using TLV parameters (SAR parameters);</li>            |
|                           |                          |             <li>as a single PDU, with the text sent in the <code>message_payload</code>                    |
|                           |                          |                 (<code>0x0424</code> ).</li>                                                               |
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
|                           |                          |             Depending on the content, the text is sent in one of two encodings:                            |         
|                           |                          |         </p>                                                                                               |
|                           |                          |         <ul>                                                                                               |
|                           |                          |             <li>GSM DEFAULT ALPHABET (<code>data_coding</code> = <code>0</code>);</li>                     |
|                           |                          |             <li>UCS2 (<code>data_coding</code> = <code>8</code>).</li>                                     |
|                           |                          |         </ul>                                                                                              |  
|                           |                          |         <p>                                                                                                |
|                           |                          |             It is also possible to use the ASCII encoding for <code>data_coding</code> = <code>0</code>    |         
|                           |                          |             (a unified setting for receiving and sending messages).                                        |
|                           |                          |         </p>                                                                                               |   
|                           |                          |     </details>                                                                                             |
+---------------------------+--------------------------+------------------------------------------------------------------------------------------------------------+

If necessary, additional TLV parameters containing extended message information can be included in the packet.

