SMPP API
=========

.. toctree::
   :maxdepth: 1
   :hidden:

   eng_smpp_auth
   eng_smpp_request
   eng_smpp_sms
   eng_smpp_viber
   eng_smpp_vk
   eng_smpp_push
   eng_smpp_flashcall
   eng_smpp_tg_auth_codes
   eng_smpp_cascade
   eng_smpp_mo
   eng_smpp_status
   eng_smpp_short_link



| :abbr:`SMPP (Short Message Peer to Peer)` API v.3.0 is designed for integration into the Partner's system to enable sending specific types of messages and receiving statuses of sent messages.
| The integration enables the sending of both incoming traffic (Mobile Terminated message) and outgoing traffic (Mobile Originated message).

Types of Messages
------------------

When integrating via the SMPP API, the transmission of the following types of messages is supported:

- FlashingCall (VoiceCode);
- Push;
- SMS;
- Viber;
- VK.


Functional Features
--------------------

Connection Types
~~~~~~~~~~~~~~~~~

The following connection types are available:

- single-socket connection (transceiver);
- dual-socket connection (transmitter/receiver).

SMPP Sessions
~~~~~~~~~~~~~~

The maximum number of simultaneously active SMPP sessions with one login is configured individually for each Partner, depending on current requirements.

Interface Protection
~~~~~~~~~~~~~~~~~~~~~

Protection is implemented using IP addresses – the Service Provider's SMPP server rejects connections from IP addresses not authorized by the Partner.

Additional Security Measures 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Traffic encryption is supported through a VPN connection between the Service Provider's and the Partner's systems.
