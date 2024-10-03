
MO-сообщения
============

:term:`MO-сообщение` передаётся на настроенный URL Партнёра.


.. tabs::

   .. group-tab:: SMS

      **Пример запроса**

      .. code-block:: json
         :linenos:

          { 
            "transactionId": "20190418175651967013", 
            "destAddr": "0000", 
            "sourceAddr": "72101234567", 
            "type": "SMS", 
            "message": "Сообщение для партнёра", 
            "partCount": 1,
            "receivedDate": "2022-06-22T10:22:45+0300" 
          } 

   .. group-tab:: Viber (изображение)

      **Пример запроса**

      .. code-block:: json
         :linenos:

          {
            "transactionId": "20190418175651967019",
            "destAddr": "0000",
            "sourceAddr": "72101234567",
            "type": "VIBER",
            "partCount": 1,
            "mediaURL": "http://url/image_001.jpg",
            "receivedDate": "2022-06-22T10:22:45+0300"
          }

   .. group-tab:: Viber (изображение + текст)

      **Пример запроса**

      .. code-block:: json
         :linenos:

         {
            "transactionId": "20190418175651967019",
            "destAddr": "0000",
            "sourceAddr": "72101234567",
            "type": "VIBER",
            "message": "Текст сообщения",
            "partCount": 1,
            "mediaURL": "http://url/image_001.jpg",
            "receivedDate": "2022-06-22T10:22:45+0300"
          }

   .. group-tab:: WhatsApp (изображение)

      **Пример запроса**

      .. code-block:: json
         :linenos:

          { 
            "transactionId": "20190418175651967014", 
            "destAddr": "0000", 
            "sourceAddr": "72101234567", 
            "type": "WHATSAPP", 
            "partCount": 1,
            "receivedDate": "2022-09-22T10:22:45+0300",
            "mediaURL": "https://image.service/WHATSAPP_TEST/3GfxBJRj-bN3QA.jpg"
          }

   .. group-tab:: WhatsApp (изображение + подпись)

      **Пример запроса**

      .. code-block:: json
         :linenos:

          { 
            "transactionId": "20190418175651967014", 
            "destAddr": "0000", 
            "sourceAddr": "72101234567", 
            "type": "WHATSAPP", 
            "message": "Подпись к изображению", 
            "partCount": 1,
            "receivedDate": "2022-09-22T10:22:45+0300",
            "mediaURL": "https://image.service/WHATSAPP_TEST/3GfxBJRj-bN3QA.jpg"
          }

.. tabs::

   .. group-tab:: SMS

      **Параметры запроса**

      .. csv-table::
        :header: "Параметр", "Тип", "Описание"
        :widths: 20, 15, 40
        :class: my-table

        "transactionId", "string", "Идентификатор транзакции, созданный системой Сервис-Провайдера."
        "destAddr", "string", "Сервисный номер, на который абонент отправил сообщение."
        "sourceAddr", "string", "Номер абонента."
        "type", "string", "Тип сообщения. Указать следует: SMS."
        "message", "string", "Текст сообщения Партнёру от абонента."
        "partCount", "integer", "Количество частей сообщения."
        "receivedDate", "string", "Дата получения данного MO-сообщения от абонента."

   .. group-tab:: Viber (изображение)

      **Параметры запроса**

      .. csv-table::
        :header: "Параметр", "Тип", "Описание"
        :widths: 20, 15, 40
        :class: my-table

        "transactionId", "string", "Идентификатор транзакции, созданный системой Сервис-Провайдера."
        "destAddr", "string", "Сервисный номер, на который абонент отправил сообщение."
        "sourceAddr", "string", "Номер абонента."
        "type", "string", "Тип сообщения. Указать следует: Viber."
        "partCount", "integer", "Количество частей сообщения."
        "receivedDate", "string", "Дата получения данного MO-сообщения от абонента."
        "mediaURL", "string", "Ссылка на изображение. Параметр необязательный, если вложение отсутствует."


   .. group-tab:: Viber (изображение + текст)

      **Параметры запроса**

      .. csv-table::
        :header: "Параметр", "Тип", "Описание"
        :widths: 20, 15, 40
        :class: my-table

        "transactionId", "string", "Идентификатор транзакции, созданный системой Сервис-Провайдера."
        "destAddr", "string", "Сервисный номер, на который абонент отправил сообщение."
        "sourceAddr", "string", "Номер абонента."
        "type", "string", "Тип сообщения. Указать следует: Viber."
        "message", "string", "Текст сообщения Партнёру от абонента. Количество символов, не более: 2000. **Важно!** Если МО-сообщение не содержит текст сообщения, то параметр *message* в JSON должен отсутствовать."
        "partCount", "integer", "Количество частей сообщения."
        "receivedDate", "string", "Дата получения данного MO-сообщения от абонента."
        "mediaURL", "string", "Ссылка на изображение. Параметр необязательный, если вложение отсутствует."

   .. group-tab:: WhatsApp (изображение)

      **Параметры запроса**

      .. csv-table::
        :header: "Параметр", "Тип", "Описание"
        :widths: 20, 15, 40
        :class: my-table

        "transactionId", "string", "Идентификатор транзакции, созданный системой Сервис-Провайдера."
        "destAddr", "string", "Сервисный номер, на который абонент отправил сообщение."
        "sourceAddr", "string", "Номер абонента."
        "type", "string", "Тип сообщения. Указать следует: WhatsApp."
        "partCount", "integer", "Количество частей сообщения."
        "receivedDate", "string", "Дата получения данного MO-сообщения от абонента."
        "mediaURL", "string", "Ссылка на изображение. Параметр необязательный, если вложение отсутствует."

   .. group-tab:: WhatsApp (изображение + подпись)

      **Параметры запроса**

      .. csv-table::
        :header: "Параметр", "Тип", "Описание"
        :widths: 20, 15, 40
        :class: my-table

        "transactionId", "string", "Идентификатор транзакции, созданный системой Сервис-Провайдера."
        "destAddr", "string", "Сервисный номер, на который абонент отправил сообщение."
        "sourceAddr", "string", "Номер абонента."
        "type", "string", "Тип сообщения. Указать следует: WhatsApp."
        "message", "string", "Подпись к изображению. Количество символов, не более: 1024. **Важно!** Если МО-сообщение не содержит текст сообщения, то параметр *message* в JSON должен отсутствовать."
        "partCount", "integer", "Количество частей сообщения."
        "receivedDate", "string", "Дата получения данного MO-сообщения от абонента."
        "mediaURL", "string", "Ссылка на изображение. Параметр необязательный, если вложение отсутствует."


