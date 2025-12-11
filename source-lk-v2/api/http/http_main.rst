HTTP API
=============

| :abbr:`HTTP (HyperText Transfer Protocol — протокол передачи гипертекста)` :abbr:`API (Application Programming Interface — интерфейс взаимодействия компьютерных программ)`  v.5.0 предназначен для интеграции в систему клиента с целью отправки сообщений определённых типов (:term:`MT-сообщение`), получения ответных сообщений (:term:`MO-сообщение`), а также статусов отправленных сообщений. 

Типы сообщений
---------------

При интеграции по HTTP API поддерживается передача следующих типов сообщений:

- :doc:`FLASHINGCALL (VOICECODE) <http_flashcall>`;
- :doc:`PUSH <http_push>`;
- :doc:`SMS <http_sms>`;
- :doc:`VIBER <http_viber>`;
- :doc:`VK <http_vk>`;
- :doc:`WHATSAPP <http_whatsapp>`;
- :doc:`TGCODE <http_tg_auth_codes>`.


.. toctree::
   :maxdepth: 1
   :hidden:

   http_auth
   http_request
   http_sms
   http_viber
   http_whatsapp
   http_vk
   http_push
   http_flashcall
   http_tg_auth_codes
   http_cascade
   http_mo
   http_status
   http_short_link