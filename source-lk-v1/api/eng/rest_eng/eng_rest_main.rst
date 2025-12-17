

REST API
=========

REST API v.6.0 is designed to be integrated into the Partner's system in order to send certain types of messages as well as to receive statuses of sent messages. 

The API provides the ability to send both incoming traffic (Mobile Terminated message) and outgoing traffic (Mobile Originated message). 

Types of Messages
-------------------

When integrating via REST API, the transmission of the following types of messages is supported:

- :doc:`CARDSMOBILE <eng_rest_cardsmobile>`;
- :doc:`FLASHINGCALL (VOICECODE) <eng_rest_flashcall>`;
- :doc:`PUSH <eng_rest_push>`;
- :doc:`SMS <eng_rest_sms>`;
- :doc:`TELEGRAM <eng_rest_telegram>`;
- :doc:`VIBER <eng_rest_viber>`;
- :doc:`VK <eng_rest_vk>`;
- :doc:`WHATSAPP <eng_rest_whatsapp>`.

.. toctree::
   :maxdepth: 1
   :hidden:

   eng_rest_auth
   eng_rest_request
   eng_rest_sms
   eng_rest_viber
   eng_rest_telegram
   eng_rest_push
   eng_rest_vk
   eng_rest_whatsapp
   eng_rest_flashcall
   eng_rest_cardsmobile
   eng_rest_cascade
   eng_rest_mo
   eng_rest_status
   eng_rest_short_link
