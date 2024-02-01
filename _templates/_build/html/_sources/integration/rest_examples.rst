
Примеры сообщений
============================================

В данном разделе приведены примеры сообщений с разными комбинациями необязательных параметров для всех каналов отправки сообщений.



SMS
----


.. code-block:: json

    {
     {
       "login":"ВАШ_ЛОГИН",
       "password":"ВАШ_ПАРОЛЬ",
       "useTimeDiff":true,
       "id":"8770630",
       "shortenLinks":false,
       "scheduleInfo":{
         "timeBegin":"10:00",
         "timeEnd":"12:00",
         "weekdaysSchedule":"123"
       },
       "destAddr":"Номер_Абонента",
       "message":{
         "type":"SMS",
         "data":{
           "text":"Текст. Follow link: <http://verylongurl.com/very/long/url>",
           "serviceNumber":"НОМЕР_ОТПРАВИТЕЛЯ",
           "ttl":10
         }
       }
     }           
    }



Viber
------


Поддерживаются следующие варианты Viber-сообщений:

* только текст (в InstantContent задаётся атрибут type = TEXT);

* только изображение (в InstantContent задаётся атрибут type = IMAGE_URL);

* текст, кнопка для перехода (в InstantContent задаётся атрибут type = BUTTON с текстом, наименованием кнопки и URL для перехода);

* текст, изображение, кнопка для перехода (в InstantContent задаётся атрибут type = BUTTON с текстом сообщения, адресом изображения, наименованием кнопки и URL для перехода).



Viber-сообщение (только текст)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


.. code-block:: json

    {
       "login":"ВАШ_ЛОГИН",
       "password":"ВАШ_ПАРОЛЬ",
       "useTimeDiff":false,
       "id":"8770100",
       "scheduleInfo":
       {
          "timeBegin":"10:00",
          "timeEnd":"20:00",
          "weekdaysSchedule":"12345"
       },
       "destAddr":"Номер_Абонента",
       "message":
       {
          "type":"VIBER",
          "data":
          {
             "instantContent":
             {
                "type":"TEXT",
                "data":
                {
                   "text":"VIBERMESS"
                }
             },
             "serviceNumber":"НОМЕР_ОТПРАВИТЕЛЯ",
             "ttl":1
          }
       }
    }




Viber-сообщение (только изображение)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


.. code-block:: json

    {
       "login":"ВАШ_ЛОГИН",
       "password":"ВАШ_ПАРОЛЬ",
       "id":"8770100",
       "scheduleInfo":
       {
          "timeBegin":"10:00",
          "timeEnd":"20:00",
          "weekdaysSchedule":"12345"
       },
       "destAddr":"Номер_Абонента",
       "message":
       {
          "type":"VIBER",
          "data":
          {
             "instantContent":
             {
                "type":"IMAGE_URL",
                "data":
                {
                   "imageURL":"https://example.ru/image"
                }
             },
             "serviceNumber":"НОМЕР_ОТПРАВИТЕЛЯ",
             "ttl":1
          }
       }
    }



Viber-сообщение (текст + изображение + кнопка)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json

    {
       "login":"ВАШ_ЛОГИН",
       "password":"ВАШ_ПАРОЛЬ",
       "useTimeDiff":false,
       "id":"8770100",
       "scheduleInfo":
       {
          "timeBegin":"10:00",
          "timeEnd":"20:00",
          "weekdaysSchedule":"12345"
       },
       "destAddr":"Номер_Абонента",
       "message":
       {
          "type":"VIBER",
          "data":
          {
             "instantContent":
             {
                "type":"BUTTON",
                "data":
                {
                   "text":"VIBERMESS",
                   "imageURL":"https://example.ru/image",
                   "caption":"ПЕРЕЙТИ",
                   "action":"https:// example.ru/image"
                }
             },
             "serviceNumber":"НОМЕР_ОТПРАВИТЕЛЯ",
             "ttl":1
          }
       }
    }




PUSH
----

Push-сообщение (только текст с заголовком)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json

    {
      "login":"ВАШ_ЛОГИН",
      "password":"ВАШ_ПАРОЛЬ",
      "id":"8770631",
      "destAddr":"Номер_Абонента",
      "message":{
        "type":"PUSH",
        "data":{
          "title":"Заголовок Push-cсообщения",
          "text":"Текст уведомления",
          "serviceNumber":"НОМЕР_ОТПРАВИТЕЛЯ",
          "ttl":2
        }
      }
    }


Push-сообщение (с картинкой и кнопками)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

В данном примере сообщение передается по externalUserId клиента.

.. code-block:: json


     {
       "login": "ВАШ_ЛОГИН",
       "password": "ВАШ_ПАРОЛЬ",
       "id": "9999992",
       "message": {
         "type": "PUSH",
         "data": {
           "externalUserId": "ИД_абонента",
           "text": "Текст_сообщение",
           "serviceNumber": "0000",
           "ttl": 40,
           "ttlUnit": "SECONDS",
           "content": {
             "contentUrl": "https://i.pinimg.com/originals/11/ab/14/11ab147894a7d2ce866ff88a4aa63655.jpg",
             "contentCategory": "IMAGE",
             "actions": [
               {
                 "title": "Открыть",
                 "action": "link",
                 "options": ""
               },
               {
                 "title": "Скрыть",
                 "action": "open-app",
                 "options": ""
               },
               {
                 "title": "Удалить",
                 "action": "clear",
                 "options": ""
               }
             ]
           }
         }
       }
     }




Push-сообщение (с HTML WebView)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json

    {
      "login": "ВАШ_ЛОГИН",
      "password": "ВАШ_ПАРОЛЬ",
      "id": "9999992",
      "destAddr":"Номер_Абонента",
      "message": {
        "type": "PUSH",
        "data": {
          "text": "Текст_сообщение",
          "serviceNumber": "0000",
          "ttl": 40,
          "ttlUnit": "SECONDS",
          "content": {
            "contentUrl": "https://i.pinimg.com/originals/11/ab/14/11ab147894a7d2ce866ff88a4aa63655.jpg",
            "contentCategory": "HTML"
          }
        }
      }
    }
