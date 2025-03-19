
Link Shortening Service
===========================

Description 
-----------------

The functionality of the service:

* replacing :term:`long links <Длинная ссылка>` in the message text with short ones;
* link matching storage;
* redirecting from a :term:`short link <Короткая ссылка>` to a long one;
* collecting traffic statistics. 

| This service is provided by the Service Provider upon request from the Partner (see :ref:`eng-http-setup`).
| After the Service Provider has configured the Service, all received links in the message text will be shortened by default in accordance with the specified settings.
| If necessary, this setting can also be controlled using the optional *shortenLinks* parameters for single messages and *shorten_list* for cascading messages (see :ref:`engHTTP-Параметры-запроса-каскада`).
| If the service is configured and the parameter is not sent, the link will be shortened by default. The same applies to links passed in :ref:`cascading messages <engHTTP-Ссылки-в-каскаде>`.
| The link is shortened using the domain **http://kr4.me**.

Links are shortened for the following types of messages:

* SMS (see :ref:`engHTTP-SMS-параметры-запроса`);
* Viber (see :ref:`HTTP-engViber-параметры-запроса`);
* Push (see :ref:`engHTTP-Push-параметры-запроса`);
* VK (see :ref:`engHTTP-VK-параметры-запроса`);
* WhatsApp (see :ref:`engHTTP-WA-параметры-запроса`).


Service Operation 
~~~~~~~~~~~~~~~~~~~

1. When a long link is detected in the message, a new link is formed - the domain http://kr4.me/ is inserted at the beginning of the new link and a unique :term:`UID` is added, which length can be from 3 to 8 characters. An example of a link after an abbreviation: http://kr4.me/EQiCREB.
2. After the messages are delivered, when subscribers click on a short link, the link shortening service will identify the corresponding long link and redirect.
3. Clicks on each link will be recorded in the Platform statistics.


.. _eng-http-setup:

Service Setup
--------------------

To enable the service, the following data must be transmitted to :ref:`Technical Support <support>`:

* the number of characters after which the link must be shortened. For example, if the link is shortened by more than 26 characters, then the link https://rapporto.ru/ will be transmitted to the subscriber unchanged, and the link https://rapporto.ru/company/o_platforme_rapporto/ will be shortened, for example `http://kr4.me/QEiCRE/ <https://rapporto.ru/company/o_platforme_rapporto/>`_;
* the number of characters in the :term:`UID` that is added after the domain. This parameter affects the number of unique links that can be generated. For example, with a length of UID = 8 characters, about 281 trillion unique links can be generated;
* to clarify the necessity for forming of unique links for each subscriber. This parameter affects the traffic statistics. In the case of a single link, the total traffic statistics for all subscribers will be shown;
* the number of days after which an inactive link is deleted if there were no clicks on it;
* link lifetime is the number of days after which an inactive link is deleted, even if there were clicks on it.


.. _engHTTP-Ссылки-в-каскаде:

Shortening Links when Sending Cascading Messages
-----------------------------------------------------

If :doc:`cascading messages <eng_http_cascade>` are configured for the HTTP client, and if link shortening is enabled for the Partner, then the *shorten_list* parameter is used to control link shortening for messages (see :ref:`engHTTP-Параметры-запроса-каскада`).

Possible options for sendig the *shorten_list* parameter:

* the parameter is not sent in the request – links in all types of messages will be shortened by default;
* the parameter is sent with an empty value – link shortening is canceled for all types of messages;
* the parameter is sent in the request and the value is not empty – links are shortened only in those types of messages that are specified in the parameter value.

