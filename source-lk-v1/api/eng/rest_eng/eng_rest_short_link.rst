
Link Shortening Service
===========================

Description 
-------------

The functionality of the service:

* replacing :term:`long links <Длинная ссылка>` in the message text with short ones;
* link matching storage;
* redirecting from a :term:`short link <Короткая ссылка>` to a long one;
* collecting traffic statistics. 

| This service is provided by the Service Provider upon request from the Partner (see :ref:`eng-Rest-Setup`).
| After the Service Provider has configured the Service, all received links in the message text will be shortened by default in accordance with the specified settings.
| If necessary, this setting can also be controlled using the optional *shortenLinks* parameter, which can be sent in the request.
| If the service is configured and the parameter is not sent, the link will be shortened by default. The same applies to links passed in :ref:`cascading messages <eng-Ссылки-в-каскаде>`.
| The link is shortened using the domain **http://kr4.me**.

Links are shortened for the following types of messages:

* SMS (see :ref:`eng-Rest-SMS-параметры-запроса`);
* Viber (see :ref:`eng-Rest-Viber-параметры-запроса`);
* Push (see :ref:`eng-Rest-Push-параметры-запроса`);
* VK (see :ref:`eng-Rest-VK-параметры-запроса`);
* WhatsApp (see :ref:`eng-Rest-WA-параметры-запроса`).


Service Operation
~~~~~~~~~~~~~~~~~~

1. When a long link is detected in the message, a new link is formed - the domain http://kr4.me/ is inserted at the beginning of the new link and a unique :term:`UID` is added, which length can be from 3 to 8 characters. An example of a link after an abbreviation: http://kr4.me/EQiCREB.
2. After the messages are delivered, when subscribers click on a short link, the link shortening service will identify the corresponding long link and redirect.
3. Clicks on each link will be recorded in the Platform statistics.


.. _eng-Rest-Setup:

Service Setup
---------------

To enable the Service, the following data must be provided to the :ref:`Technical Support: <support>`:

* amount of characters after which the link must be shortened. For example, if the link is shortened by more than 26 characters, then the link https://rapporto.ru/ will be transmitted to the subscriber unchanged, and the link https://rapporto.ru/company/o_platforme_rapporto/ will be shortened, for example `http://kr4.me/QEiCRE/ <https://rapporto.ru/company/o_platforme_rapporto/>`_;
* amount of characters in the :term:`UID` that is added after the domain. This parameter affects the number of unique links that can be generated. For example, with a length of UID = 8 characters, about 281 trillion unique links can be generated;
* to clarify the necessity for forming of unique links for each subscriber. This parameter affects the traffic statistics. In the case of a single link, the total traffic statistics for all subscribers will be shown;
* the number of days after which an inactive link is removed if there have been no clicks on it;
* the number of days after which an inactive link is removed, even if there have been clicks on it (link lifetime ).


.. _eng-Ссылки-в-каскаде:

Shortening Links when Sending Cascading Messages
-----------------------------------------------------

If :doc:`eng_rest_cascade` are configured for the REST client, then the same requirements are met for the sent messages as for single ones:

* when the Service is enabled, links are shortened automatically for all cascading messages;
* the *shortenLinks* parameter is used to control link shortening for messages. If the parameter is not passed, the links in the message are shortened;
* the *shortenLinks* parameter must be specified in the *message* block for each cascading message.
