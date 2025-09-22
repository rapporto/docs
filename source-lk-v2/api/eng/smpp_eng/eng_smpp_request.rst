
Request Structure
===================

Interaction with the Platform
-------------------------------

Interaction between the :abbr:`RCS (Rapporto Communication System)` Platform service and the Partner's service is based on the SMPP protocol (version 3.4).

To send a message to a subscriber, the Partner's service establishes a connection with the Service Provider's server and transmits a ``submit_sm`` packet. The packet contains all the necessary message parameters, including :abbr:`TLV (Tag Length Value)` (optional).

The Service Provider receives the packet, processes it, sends the message to the subscriber and responds to the Partner with the ``submit_sm_resp`` packet.

Separate ``deliver_sm`` and ``deliver_sm_resp`` packet pairs are used to receive delivery statuses (see :doc:`eng_smpp_status`).

For optimal performance of message delivery from the Partner to the Service Provider, it's recommended to:

* use two-socket SMPP (transmitter/receiver);
* use multiple parallel connections with the same login. While this is allowed, take into account that the SMPP server treats them as equivalent connections;
* note that the delivery report may be sent to a different physical socket than the one from which the original ``submit_sm`` PDU was transmitted to the server;
* send messages asynchronously with a limited transmission buffer:
    
  - send the next ``submit_sm`` PDU to the socket without waiting for the ``submit_sm_resp`` for the previous ``submit_sm`` PDU;
  - ensure that the total number of PDUs sent to the socket for which responses have not yet been received does not exceed the established values 
    (this limit depends on the quality of the network channel between the client and the server. The recommended range for this value is: from 5 to 50).



.. _linkSettingeng:

Establishing a Connection
--------------------------

| To establish a connection in various modes, BIND packets are used: ``bind_transmitter`` / ``bind_receiver`` / ``bind_transceiver``.
| The Service Provider's SMPP server ignores the following parameters:

- ``system_type``;
- ``interface_version``;
- ``addr_ton``;
- ``addr_npi``; 
- ``address_range``;
- ``source_addr_ton``;
- ``source_addr_npi``;
- ``dest_addr_ton``;
- ``dest_addr_npi``.

| In response to a connection request, the Service Provider's server sends one of the following :abbr:`PDUs (Protocol Data Unit)`: ``bind_transmitter_resp`` / ``bind_receiver_resp`` / ``bind_transceiver_resp``.
| The table below details the possible error codes returned.

+---------------+---------------------------------------------------------------------------+
| Error code    | Description                                                               |
+===============+===========================================================================+
| 0x00          | Successful authentication.                                                |
+---------------+---------------------------------------------------------------------------+
| 0x0F          | Invalid service identifier (login).                                       |
+---------------+---------------------------------------------------------------------------+
| 0x0E          | Invalid password.                                                         |
+---------------+---------------------------------------------------------------------------+
| 0x05          | The limit on the number of concurrent active connections                  |
|               | to the server has been exceeded.                                          |
+---------------+---------------------------------------------------------------------------+
| 0x0D          | Connection attempt from an unauthorized IP address.                       |
+---------------+---------------------------------------------------------------------------+


Maintaining the Connection
---------------------------

| The ``enquire_link`` PDU is used to maintain the connection during periods of no traffic. The server sends the ``enquire_link`` packet once per minute if there is no traffic on the connection during this period.
| If there is no adequate response from the client (the ``enquire_link_resp`` PDU) within 30 seconds (the timeout is configurable on the Service Provider's platform), the server terminates the connection without sending the ``unbind`` packet.
| The client can also send the ``enquire_link`` packet to the Server at any time and should expect an immediate ``enquire_link_resp`` response.



.. _eng_reprocessing:

Message Reprocessing
-------------------------------

If the Partner's service does not respond to the Service Provider's requests:

1.	The service is marked as “non-working”. All messages received by the Service Provider that are intended for this service are placed in a deferred message queue. The service will remain non-working until the Partner reconnects.
2.	All subscribers attempting to access a non-working service receive a message informing them that the service is unavailable and that there may be a delay in service delivery (only if such an option is configured for the service).
3.	The number of attempts to send a message is specified in the integration connection settings, in the “Max. number of MO message delivery attempts” parameter (which can accept any integer value). If the value is not specified or is equal to 0, the system will continue to attempt message delivery until the message lifetime expires.

