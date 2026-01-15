HTTP API
=============

:abbr:`HTTP (HyperText Transfer Protocol)` :abbr:`API (Application Programming Interface)` v.5.0 is designed to be integrated into the Partner's system 
in order to send certain types of messages as well as to receive statuses of sent messages.

The API provides the ability to send both incoming traffic (Mobile Terminated message) and outgoing traffic (Mobile Originated message). 


Types of Messages
-------------------

When integrating via HTTP API, the transmission of the following types of messages is supported:


- :doc:`FLASHINGCALL (VOICECODE) <eng_http_flashcall>`;
- :doc:`PUSH <eng_http_push>`;
- :doc:`SMS <eng_http_sms>`;
- :doc:`VIBER <eng_http_viber>`;
- :doc:`VK <eng_http_vk>`;
- :doc:`WHATSAPP <eng_http_whatsapp>`;
- :doc:`TGCODE <eng_http_tg_auth_codes>`.

.. toctree::
   :maxdepth: 1
   :hidden:

   eng_http_auth
   eng_http_request
   eng_http_sms
   eng_http_viber
   eng_http_whatsapp
   eng_http_vk
   eng_http_push
   eng_http_flashcall
   eng_http_tg_auth_codes
   eng_http_cascade
   eng_http_mo
   eng_http_status
   