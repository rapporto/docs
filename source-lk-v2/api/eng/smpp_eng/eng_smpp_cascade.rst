Cascading Message Sending
===========================

Cascading message sending is not available by default. To enable it, the Partner should contact their supervising manager.

The service supports the following types of cascading message:

- FlashingCall (VoiceCode);
- Push;
- SMS;
- Viber;
- VK.

The order and resend options can be configured on the Service Provider's side (based on a request from the Partner to the Service Provider's :ref:`Technical Support Service <eng-support>`).

In this case, messages will be resent with default parameters, and no additional parameters need to be passed in the packet.

The required order of message resending is passed in the ``cascade_order`` TLV parameter, id = ``0x1444``.

Additionally, it is possible to specify required cascade options using additional TLV parameters in the packet. These parameters differ for different message types. 
Their values can also be modified upon the Partner's request.

If the message is split in parts, the TLV parameters must be included in all its parts.


.. _cascade_eng:
 
Request TLV Parameters
-------------------------

.. tabs::

    .. tab:: Cascade Order

        Sequence of message types in the cascade.

        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | TLV Parameter             | Field               | Octets size       | Type              | Description                                                           |
        +===========================+=====================+===================+===================+=======================================================================+
        | cascade_order             | Tag                 | 2                 | Integer           | id = 0x1444                                                           |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | up to 1000        | Octet String      | Sequence of message types in the cascade.                             |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | .. raw:: html                                                         |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   |     <details>                                                         |
        |                           |                     |                   |                   |         <summary>More details</summary>                               |
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             The value represents an enumeration of message types      |  
        |                           |                     |                   |                   |             (separated by commas)                                     | 
        |                           |                     |                   |                   |         </p>                                                          |
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             Possible values (case insensitive):                       |  
        |                           |                     |                   |                   |         </p>                                                          |     
        |                           |                     |                   |                   |         <ul>                                                          |
        |                           |                     |                   |                   |             <li><code>i</code> — Viber;</li>                          |
        |                           |                     |                   |                   |             <li><code>s</code> — SMS;</li>                            |
        |                           |                     |                   |                   |             <li><code>p</code> — Push;</li>                           |
        |                           |                     |                   |                   |             <li><code>v</code> — VK;</li>                             |
        |                           |                     |                   |                   |             <li><code>f</code> — FlashingCall (VoiceCode).</li>       |
        |                           |                     |                   |                   |         </ul>                                                         |  
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             For example, "V,S" or "V,I,S".                            |  
        |                           |                     |                   |                   |         </p>                                                          |  
        |                           |                     |                   |                   |     </details>                                                        |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+


    .. tab:: Viber

        Viber Message Resending.

        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | TLV Parameter             | Field               | Octets size       | Type              | Description                                                           |
        +===========================+=====================+===================+===================+=======================================================================+
        | TLV Identifier for        | Tag                 | 2                 | Integer           | id = 0x1437                                                           |
        | resending mode reception  +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | 1                 | Octet String      | Resending mode.                                                       |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | .. raw:: html                                                         |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   |     <details>                                                         |
        |                           |                     |                   |                   |         <summary>More details</summary>                               |
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             This parameter is mandatory if a resending mode different |  
        |                           |                     |                   |                   |             from the default configuration is intended to be used.    |      
        |                           |                     |                   |                   |         </p>                                                          |
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             Possible values:                                          |  
        |                           |                     |                   |                   |         </p>                                                          |     
        |                           |                     |                   |                   |         <ul>                                                          |
        |                           |                     |                   |                   |             <li><code>N</code> — do not resend;</li>                  |            
        |                           |                     |                   |                   |             <li><code>Y</code> — resend if the “not delivered” status |
        |                           |                     |                   |                   |                 is received;</li>                                     |
        |                           |                     |                   |                   |             <li><code>S</code> — resend if the “viewed” status is not |
        |                           |                     |                   |                   |                 received within the message lifetime. </li>           |
        |                           |                     |                   |                   |         </ul>                                                         |    
        |                           |                     |                   |                   |     </details>                                                        |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | TLV Identifier for        | Tag                 | 2                 | Integer           | id = 0x1438                                                           |
        | service name reception    +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | 11                | Octet String      | Service name from which messages will be sent in the resending mode.  |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | .. raw:: html                                                         |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   |     <details>                                                         |
        |                           |                     |                   |                   |         <summary>More details</summary>                               |
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             The parameter is being processed only after receiving the |  
        |                           |                     |                   |                   |             <code>0x1437</code> TLV parameter.                        |      
        |                           |                     |                   |                   |         </p>                                                          |   
        |                           |                     |                   |                   |     </details>                                                        |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | TLV Identifier for        | Tag                 | 2                 | Integer           | id = 0x1439                                                           |
        | alternative message       +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | text reception            | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | 1000              | Octet String      | Alternative text of the Viber message sent in the resending mode.     |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | .. raw:: html                                                         |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   |     <details>                                                         |
        |                           |                     |                   |                   |         <summary>More details</summary>                               |
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             The parameter is being processed only after receiving the |  
        |                           |                     |                   |                   |             <code>0x1437</code> TLV parameter.                        |      
        |                           |                     |                   |                   |         </p>                                                          |   
        |                           |                     |                   |                   |     </details>                                                        |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | TLV Identifier for        | Tag                 | 2                 | Integer           | id = 0x1461                                                           |
        | for message lifetime      +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | reception                 | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | 16                | Octet String      | Lifetime for the message sent in the resending mode.                  |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | .. raw:: html                                                         |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   |     <details>                                                         |
        |                           |                     |                   |                   |         <summary>More details</summary>                               |
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             Format: <code>YYMMDDhhmmsstnnp</code>.                    |  
        |                           |                     |                   |                   |         </p>                                                          |  
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             The parameter is being processed only after receiving the |  
        |                           |                     |                   |                   |             <code>0x1437</code> TLV parameter.                        |      
        |                           |                     |                   |                   |         </p>                                                          |   
        |                           |                     |                   |                   |     </details>                                                        |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+


    .. tab:: VK

        VK Message Resending.

        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | TLV Parameter             | Field               | Octets size       | Type              | Description                                                           |
        +===========================+=====================+===================+===================+=======================================================================+
        | TLV Identifier for        | Tag                 | 2                 | Integer           | id = 0x1454                                                           |
        | resending mode reception  +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | 1                 | Octet String      | Resending mode.                                                       |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | .. raw:: html                                                         |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   |     <details>                                                         |
        |                           |                     |                   |                   |         <summary>More details</summary>                               |
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             This parameter is mandatory if a resending mode different |  
        |                           |                     |                   |                   |             from the default configuration is intended to be used.    |      
        |                           |                     |                   |                   |         </p>                                                          |
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             Possible values:                                          |  
        |                           |                     |                   |                   |         </p>                                                          |     
        |                           |                     |                   |                   |         <ul>                                                          |
        |                           |                     |                   |                   |             <li><code>N</code> — do not resend;</li>                  |            
        |                           |                     |                   |                   |             <li><code>Y</code> — resend if the “not delivered” status |
        |                           |                     |                   |                   |                 is received;</li>                                     |
        |                           |                     |                   |                   |             <li><code>S</code> — resend if the “viewed” status is not |
        |                           |                     |                   |                   |                 received within the message lifetime. </li>           |
        |                           |                     |                   |                   |         </ul>                                                         |    
        |                           |                     |                   |                   |     </details>                                                        |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | TLV Identifier for        | Tag                 | 2                 | Integer           | id = 0x1455                                                           |
        | service name reception    +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | 11                | Octet String      | Service name from which messages will be sent in the resending mode.  |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | .. raw:: html                                                         |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   |     <details>                                                         |
        |                           |                     |                   |                   |         <summary>More details</summary>                               |
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             The parameter is being processed only after receiving the |  
        |                           |                     |                   |                   |             <code>0x1437</code> TLV parameter.                        |      
        |                           |                     |                   |                   |         </p>                                                          |   
        |                           |                     |                   |                   |     </details>                                                        |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | TLV Identifier for        | Tag                 | 2                 | Integer           | id = 0x1456                                                           |
        | alternative message       +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | text reception            | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | 2048              | Octet String      | Alternative text of the VK message sent in the resending mode.        |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | .. raw:: html                                                         |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   |     <details>                                                         |
        |                           |                     |                   |                   |         <summary>More details</summary>                               |
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             The parameter is being processed only after receiving the |  
        |                           |                     |                   |                   |             <code>0x1454</code> TLV parameter.                        |      
        |                           |                     |                   |                   |         </p>                                                          |   
        |                           |                     |                   |                   |     </details>                                                        |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | TLV Identifier for        | Tag                 | 2                 | Integer           | id = 0x1457                                                           |
        | for message lifetime      +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | reception                 | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | 16                | Octet String      | Lifetime for the message sent in the resending mode.                  |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | .. raw:: html                                                         |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   |     <details>                                                         |
        |                           |                     |                   |                   |         <summary>More details</summary>                               |
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             Format: <code>YYMMDDhhmmsstnnp</code>.                    |  
        |                           |                     |                   |                   |         </p>                                                          | 
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             The parameter is being processed only after receiving the |  
        |                           |                     |                   |                   |             <code>0x1454</code> TLV parameter.                        |      
        |                           |                     |                   |                   |         </p>                                                          |   
        |                           |                     |                   |                   |     </details>                                                        |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+



    .. tab:: SMS

        SMS Message Resending.

        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | TLV Parameter             | Field               | Octets size       | Type              | Description                                                           |
        +===========================+=====================+===================+===================+=======================================================================+
        | TLV Identifier for        | Tag                 | 2                 | Integer           | id = 0x1458                                                           |
        | resending mode reception  +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | 1                 | Octet String      | Resending mode.                                                       |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | .. raw:: html                                                         |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   |     <details>                                                         |
        |                           |                     |                   |                   |         <summary>More details</summary>                               |
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             This parameter is mandatory if a resending mode different |  
        |                           |                     |                   |                   |             from the default configuration is intended to be used.    |      
        |                           |                     |                   |                   |         </p>                                                          |
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             Possible values:                                          |  
        |                           |                     |                   |                   |         </p>                                                          |     
        |                           |                     |                   |                   |         <ul>                                                          |
        |                           |                     |                   |                   |             <li><code>N</code> — do not resend;</li>                  |            
        |                           |                     |                   |                   |             <li><code>Y</code> — resend if the status “not delivered” |
        |                           |                     |                   |                   |                 is received;</li>                                     |
        |                           |                     |                   |                   |             <li><code>S</code> — resend if the “viewed” status is not |
        |                           |                     |                   |                   |                 received within the message lifetime. </li>           |
        |                           |                     |                   |                   |         </ul>                                                         |    
        |                           |                     |                   |                   |     </details>                                                        |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | TLV Identifier for        | Tag                 | 2                 | Integer           | id = 0x1459                                                           |
        | service name reception    +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | 11                | Octet String      | Service name from which messages will be sent in the resending mode.  |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | .. raw:: html                                                         |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   |     <details>                                                         |
        |                           |                     |                   |                   |         <summary>More details</summary>                               |
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             The parameter is being processed only after receiving the |  
        |                           |                     |                   |                   |             <code>0x1458</code> TLV parameter.                        |      
        |                           |                     |                   |                   |         </p>                                                          |   
        |                           |                     |                   |                   |     </details>                                                        |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | TLV Identifier for        | Tag                 | 2                 | Integer           | id = 0x1460                                                           |
        | alternative message       +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | text reception            | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | 2000              | Octet String      | Alternative text of the VK message sent in the resending mode.        |
        |                           |                     |                   |                   | TLV parameter.                                                        |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | .. raw:: html                                                         |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   |     <details>                                                         |
        |                           |                     |                   |                   |         <summary>More details</summary>                               |
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             The parameter is being processed only after receiving the |  
        |                           |                     |                   |                   |             <code>0x1458</code> TLV parameter.                        |      
        |                           |                     |                   |                   |         </p>                                                          |   
        |                           |                     |                   |                   |     </details>                                                        |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | TLV Identifier for        | Tag                 | 2                 | Integer           | id = 0x1442                                                           |
        | message lifetime          +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | reception                 | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | 16                | Octet String      | Lifetime for the message sent in the resending mode.                  |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | .. raw:: html                                                         |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   |     <details>                                                         |
        |                           |                     |                   |                   |         <summary>More details</summary>                               |
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             Format: <code>YYMMDDhhmmsstnnp</code>                     |  
        |                           |                     |                   |                   |         </p>                                                          |  
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             The parameter is being processed only after receiving the |  
        |                           |                     |                   |                   |             <code>0x1458</code> TLV parameter.                        |      
        |                           |                     |                   |                   |         </p>                                                          |   
        |                           |                     |                   |                   |     </details>                                                        |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+



        