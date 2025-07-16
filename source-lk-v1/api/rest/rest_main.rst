
REST API
=========

| REST API v.7.0 предназначен для интеграции в систему клиента с целью отправки сообщений определённых типов и получения статусов отправленных сообщений. 
| Интеграция обеспечивает возможность отправки как входящего трафика (:term:`MT-сообщение`), так и исходящего (:term:`MO-сообщение`). 

Типы сообщений
---------------

При интеграции по REST API поддерживается передача следующих типов сообщений:

- :doc:`CARDSMOBILE <rest_cardsmobile>`;
- :doc:`FLASHINGCALL (VOICECODE) <rest_flashcall>`;
- :doc:`MAX <rest_max>`;
- :doc:`PUSH <rest_push>`;
- :doc:`SMS <rest_sms>`;
- :doc:`TELEGRAM <rest_tg/rest_telegram>`;
- :doc:`TGCODE <rest_tg/rest_tg_auth_codes>`;
- :doc:`VIBER <rest_viber>`;
- :doc:`VK <rest_vk>`;
- :doc:`WHATSAPP <rest_whatsapp>`.


.. toctree::
   :maxdepth: 1
   :hidden:

   rest_auth
   rest_request
   rest_sms
   rest_max
   rest_push
   rest_tg/index_tg
   rest_vk
   rest_viber
   rest_whatsapp
   rest_flashcall
   rest_cardsmobile
   rest_cascade
   rest_mo
   rest_status
   rest_short_link
