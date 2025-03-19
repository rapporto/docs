Request structure
=================

Interaction with the platform
-----------------------------

| To send a message to a subscriber, the Partner recalls a specific URL of the Service Provider via HTTP using the GET or POST method, in which it transmits the subscriber's number, message text and other parameters. 
| The Service Provider receives the request, processes it, sends a message to the subscriber and returns the message ID to the Partner. 
| A separate HTTP request is used to get the delivery status (see :doc:`eng_http_status`).

Interaction structure
~~~~~~~~~~~~~~~~~~~~~

- Request methods: POST or GET;
- Protocol version: HTTP 1.1;
- :term:`URI`;
- Interaction mode: synchronous;
- The HTTP request may contain the header **Connection: Keep-Alive**. It is used to work through a single connection instead of opening/closing a new connection for each request-response pair;
- For POST requests, the Content-Type must be set in **application/x-www-form-urlencoded**. 
- Character encoding: UTF-8 (recommended). 

.. raw:: html
        
    <p style="line-height: 24px;">The encoding must respond the following requirements: 
        <a href="http://www.w3.org/TR/2003/REC-xforms-20031014/slice11.html#serialize-urlencode" target="_blank" class="button">
            <img src="../../_static/link-external-01.svg" class="bttn-icon" alt="Внешняя ссылка"> Submit.
        </a>
    </p>
    <style>
        .bttn-icon {
            width: 18px;
            height: 18px;
            vertical-align: middle;  /* Центрирует иконку по вертикали */
            border: 0;
            margin-right: 4px;
        }       
        .button {
            border: 0;
            height: 36px;
            text-decoration: none; /* Убирает подчеркивание */
            color: #000; /* Цвет текста */
            background-color: transparent; /* Цвет фона кнопки */
            padding: 4px 4px; /* Отступы */
            border-radius: 4px; /* Закругленные углы */
            display: inline-flex; /* Позволяет выровнять текст и иконку по центру */
            align-items: center; /* Центрирует содержимое кнопки */
            line-height: 1; /* Убирает лишние отступы */
        }
        .button:hover {
            background-color: #f8f7ff; /* Цвет фона при наведении */
            text-decoration: none; /* Убирает подчеркивание */
        }
    </style>

