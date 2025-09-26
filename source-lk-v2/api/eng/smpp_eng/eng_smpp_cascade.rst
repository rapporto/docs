Cascade Message Sending
========================

Cascade message sending is not available by default. To enable it, the Partner should contact their supervising manager.

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
        |                           |                     |                   |                   | | The value represents an enumeration of message types                |
        |                           |                     |                   |                   |   (separated by commas).                                              |
        |                           |                     |                   |                   | | Possible values (case insensitive):                                 |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | - i – Viber;                                                          |
        |                           |                     |                   |                   | - s – SMS;                                                            |
        |                           |                     |                   |                   | - p – Push;                                                           |
        |                           |                     |                   |                   | - v – VK;                                                             |
        |                           |                     |                   |                   | - f – FlashingCall (VoiceCode).                                       |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | For example, “V,S” or “V,I,S”.                                        |
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
        |                           |                     |                   |                   | | This parameter is mandatory if a resending mode different           |
        |                           |                     |                   |                   |   from the default configuration is intended to be used.              |
        |                           |                     |                   |                   | | Possible values :                                                   |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | - “N” – do not resend;                                                |
        |                           |                     |                   |                   | - “Y” – resend if the status “not delivered” is received;             |
        |                           |                     |                   |                   | - “S” – resend if the “viewed” status is not received within          |
        |                           |                     |                   |                   |   the message lifetime.                                               |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | TLV Identifier for        | Tag                 | 2                 | Integer           | id = 0x1438                                                           |
        | service name reception    +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | 11                | Octet String      | Service name from which messages will be sent in resending mode.      |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | The parameter is being processed only after receiving the ``0x1437``  |
        |                           |                     |                   |                   | TLV parameter.                                                        |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | TLV Identifier for        | Tag                 | 2                 | Integer           | id = 0x1439                                                           |
        | alternative message       +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | text reception            | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | 1000              | Octet String      | Alternative text of the Viber message sent in resending mode.         |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | The parameter is being processed only after receiving the ``0x1437``  |
        |                           |                     |                   |                   | TLV parameter.                                                        |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | TLV Identifier for        | Tag                 | 2                 | Integer           | id = 0x1461                                                           |
        | for message lifetime      +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | reception                 | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | 16                | Octet String      | Lifetime for the message sent in resending mode.                      |
        |                           |                     |                   |                   | Format:  “YYMMDDhhmmsstnnp”.                                          |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | The parameter is being processed only after receiving the ``0x1437``  |
        |                           |                     |                   |                   | TLV parameter.                                                        |
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
        |                           |                     |                   |                   | | This parameter is mandatory if a resending mode different           |
        |                           |                     |                   |                   |   from the default configuration is intended to be used.              |
        |                           |                     |                   |                   | | Possible values :                                                   |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | - “N” – do not resend;                                                |
        |                           |                     |                   |                   | - “Y” – resend if the status “not delivered” is received;             |
        |                           |                     |                   |                   | - “S” – resend if the “viewed” status is not received within          |
        |                           |                     |                   |                   |   the message lifetime.                                               |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | TLV Identifier for        | Tag                 | 2                 | Integer           | id = 0x1455                                                           |
        | service name reception    +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | 11                | Octet String      | Service name from which messages will be sent in resending mode.      |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | The parameter is being processed only after receiving the ``0x1454``  |
        |                           |                     |                   |                   | TLV parameter.                                                        |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | TLV Identifier for        | Tag                 | 2                 | Integer           | id = 0x1456                                                           |
        | alternative message       +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | text reception            | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | 2048              | Octet String      | Alternative text of the VK message sent in resending mode.            |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | The parameter is being processed only after receiving the ``0x1454``  |
        |                           |                     |                   |                   | TLV parameter.                                                        |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | TLV Identifier for        | Tag                 | 2                 | Integer           | id = 0x1457                                                           |
        | for message lifetime      +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | reception                 | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | 16                | Octet String      | Lifetime for the message sent in resending mode.                      |
        |                           |                     |                   |                   | Format: “YYMMDDhhmmsstnnp”.                                           |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | The parameter is being processed only after receiving the ``0x1454``  |
        |                           |                     |                   |                   | TLV parameter.                                                        |
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
        |                           |                     |                   |                   | | This parameter is mandatory if a resending mode different           |
        |                           |                     |                   |                   |   from the default configuration is intended to be used.              |
        |                           |                     |                   |                   | | Possible values :                                                   |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | - “N” – do not resend;                                                |
        |                           |                     |                   |                   | - “Y” – resend if the status “not delivered” is received;             |
        |                           |                     |                   |                   | - “S” – resend if the “viewed” status is not received within          |
        |                           |                     |                   |                   |   the message lifetime.                                               |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | TLV Identifier for        | Tag                 | 2                 | Integer           | id = 0x1459                                                           |
        | service name reception    +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | 11                | Octet String      | Service name from which messages will be sent in resending mode.      |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | The parameter is being processed only after receiving the ``0x1458``  |
        |                           |                     |                   |                   | TLV parameter.                                                        |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | TLV Identifier for        | Tag                 | 2                 | Integer           | id = 0x1460                                                           |
        | alternative message       +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | text reception            | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | 2000              | Octet String      | Alternative text of the VK message sent in resending mode.            |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | The parameter is being processed only after receiving the ``0x1458``  |
        |                           |                     |                   |                   | TLV parameter.                                                        |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | TLV Identifier for        | Tag                 | 2                 | Integer           | id = 0x1442                                                           |
        | message lifetime          +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | reception                 | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | 16                | Octet String      | Lifetime for the message sent in resending mode.                      |
        |                           |                     |                   |                   | Format: “YYMMDDhhmmsstnnp”.                                           |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | The parameter is being processed only after receiving the ``0x1458``  |
        |                           |                     |                   |                   | TLV parameter.                                                        |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+



        