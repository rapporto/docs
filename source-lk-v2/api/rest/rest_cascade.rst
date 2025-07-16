Каскадная рассылка
=====================

:term:`Каскадная рассылка` сообщений по умолчанию недоступна. Для подключения Партнёру необходимо обратиться к курирующему менеджеру.

Типы сообщений, допустимые в каскадной рассылке:

- FLASHINGCALL (VOICECODE);
- MAX;
- PUSH;
- SMS;
- TELEGRAM;
- TGCODE;
- VIBER;
- VK;
- WHATSAPP.

Последовательность типов сообщений при отправке может быть произвольной.

Причиной для переотправки сообщения является неполучение одного из статусов ``DELIVERED`` ("Получено") или ``READ`` ("Прочитано") параметра ``state`` в течение времени жизни сообщения. 

.. note::

    :term:`Время жизни сообщения` по умолчанию задается при настройке интеграционного клиента или передается в параметре ``ttl`` при отправке сообщения. 
    
    Для каждого типа сообщения из цепочки каскада время жизни настраивается отдельно.

Для сообщения типа ``FLASHINGCALL (VOICECODE)`` возможна переотправка только по статусу ``DELIVERED`` ("Получено").

Для получения отчётов по всем типам сообщений при отправке каскадной цепочки сообщений необходимо в параметре ``registeredDelivery`` указать значение ``1``.

Примеры каскадной рассылки
----------------------------

.. tabs::

    .. tab:: PUSH > SMS

       .. code-block:: json
          :linenos:
          :emphasize-lines: 15-25
 
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
              },
              "cascadeChainLink": {
                "state": "DELIVERED",
                "message": {
                  "type": "SMS",
                  "data": {
                    "text": "Текст доотправляемого SMS-сообщения",
                    "serviceNumber": "НОМЕР_ОТПРАВИТЕЛЯ_SMS",
                    "ttl": 2
                  }
                }
              }
            }


    .. tab:: MAX > SMS

       .. code-block:: json
          :linenos:
          :emphasize-lines: 12-21

            {
              "login": "ВАШ_ЛОГИН",
              "password": "ВАШ_ПАРОЛЬ",
              "destAddr": "НОМЕР_АБОНЕНТА",
              "message": {
                "type": "MAX",
                "data": {
                  "text": "ТЕКСТ_СООБЩЕНИЯ.",
                  "serviceNumber": "ИМЯ_ОТПРАВИТЕЛЯ_ДЛЯ_MAX"
                }
              },
              "cascadeChainLink": {
                "state": "DELIVERED",
                "message": {
                  "type": "SMS",
                  "data": {
                    "text": "ТЕКСТ_СООБЩЕНИЯ.",
                    "serviceNumber": "ИМЯ_ОТПРАВИТЕЛЯ_ДЛЯ_SMS"
                  }
                }
              }
            }


    .. tab:: VIBER > SMS

       .. code-block:: json
          :linenos:
          :emphasize-lines: 19-30

            {
              "login": "ВАШ_ЛОГИН",
              "password": "ВАШ_ПАРОЛЬ",
              "id": "8770100",
              "destAddr": "Номер_Абонента",
              "message": {
                "type": "VIBER",
                "data": {
                  "instantContent": {
                    "type": "TEXT",
                    "data": {
                      "text": "VIBERMESS"
                    }
                  },
                  "serviceNumber": "НОМЕР_ОТПРАВИТЕЛЯ",
                  "ttl": 1
                }
              },
              "cascadeChainLink": {
                "state": "READ",
                "message": {
                  "type": "SMS",
                  "data": {
                    "text": "SMSMESS",
                    "serviceNumber": "НОМЕР_ОТПРАВИТЕЛЯ",
                    "ttl": 1,
                    "ttlUnit": "HOURS"
                  }
                }
              }
            }


    .. tab:: FLASHINGCALL (VOICECODE) > SMS

       .. code-block:: json
          :linenos:
          :emphasize-lines: 12-22
 
            {
              "login": "ВАШ_ЛОГИН",
              "password": "ВАШ_ПАРОЛЬ",
              "destAddr": "НОМЕР_АБОНЕНТА",
              "message": {
                "type": "FLASHINGCALL",
                "data": {
                  "text": "1234", 
                  "ttl": 1 
                }
              },
              "cascadeChainLink": {
                "state": "DELIVERED",
                "message": {
                  "type": "SMS",
                  "data": {
                    "text": "Текст доотправляемого SMS-сообщения",
                    "serviceNumber": "НОМЕР_ОТПРАВИТЕЛЯ_SMS",
                    "ttl": 2
                  }
                }
              }
            }


    .. tab:: WHATSAPP > SMS

       .. code-block:: json
          :linenos:
          :emphasize-lines: 27-37
 
            {
                "login": "ВАШ_ЛОГИН",
                "password": "ВАШ_ПАРОЛЬ",
                "useTimeDiff": true,
                "id": "87706112",
                "scheduleInfo": {
                    "timeBegin": "09:00",
                    "timeEnd": "21:00",
                    "weekdaysSchedule": "12345",
                    "deadline": "2024-12-31T16:29:30+0300"
                },
                "destAddr": "НОМЕР_АБОНЕНТА",
                "message": {
                    "type": "WHATSAPP",
                    "data": {
                        "instantContent": {
                            "type": "TEXT",
                            "data": {
                                "text": "Текст WhatsApp-сообщения"
                            }
                        },
                        "serviceNumber": "ИМЯ_ОТПРАВИТЕЛЯ",
                        "ttl": 120,
                        "ttlUnit": "SECONDS"
                    }
                },
                "cascadeChainLink": {
                    "state": "DELIVERED",
                    "message": {
                        "type": "SMS",
                        "data": {
                            "text": "Текст доотправляемого SMS-сообщения",
                            "serviceNumber": "НОМЕР_ОТПРАВИТЕЛЯ_SMS",
                            "ttl": 10
                        }
                    }
                }
            }


    .. tab:: TELEGRAM > SMS

       Запрос на каскадную отправку сообщений в стандартной рассылке.

       .. code-block:: json
          :linenos:
          :emphasize-lines: 25-36

            {
               "login": "ВАШ_ЛОГИН",
               "password": "ВАШ_ПАРОЛЬ",
               "destAddr": "НОМЕР_АБОНЕНТА",
               "useTimeDiff": true,
               "id": "superId",
               "scheduleInfo": 
               {
                  "timeBegin": "10:00",
                  "timeEnd": "12:00",
                  "weekdaysSchedule": "123"
               },
               "message": 
               {
                  "type": "TELEGRAM",
                  "data": 
                  {
                     "text": "Hello, world!",
                     "link": "https://docs.rapporto.ru/",
                     "serviceNumber": "ИМЯ_ОТПРАВИТЕЛЯ",
                     "ttl": 3600,
                     "ttlUnit": "SECONDS"
                  }
                },
                "cascadeChainLink": {
                  "state": "DELIVERED",
                  "message": {
                    "type": "SMS",
                    "data": {
                      "text": "Hello, world! Follow link <https://docs.rapporto.ru>",
                      "serviceNumber": "ИМЯ_ОТПРАВИТЕЛЯ",
                      "ttl": 1,
                      "ttlUnit": "MINUTES"
                    }
                  }
                }
              }



    .. tab:: TGCODE > SMS

       Запрос на каскадную отправку абоненту авторизационного кода.      

       .. code-block:: json
          :linenos:
          :emphasize-lines: 21-32

            {
              "login": "ВАШ_ЛОГИН",
              "password": "ВАШ_ПАРОЛЬ",
              "destAddr": "НОМЕР_АБОНЕНТА",
              "useTimeDiff": true,
              "id": "superId",
              "scheduleInfo": {
                "timeBegin": "10:00",
                "timeEnd": "12:00",
                "weekdaysSchedule": "123"
              },
              "message": {
                "type": "TGCODE",
                "data": {
                  "text": "Ваш код: 12345.",
                  "serviceNumber": "ИМЯ_ОТПРАВИТЕЛЯ",
                  "ttl": 120,
                  "ttlUnit": "SECONDS"
                }
              },
              "cascadeChainLink": {
                "state": "DELIVERED",
                "message": {
                  "type": "SMS",
                  "data": {
                    "text": "Ваш код: 12345.",
                    "serviceNumber": "ИМЯ_ОТПРАВИТЕЛЯ",
                    "ttl": 1,
                    "ttlUnit": "MINUTES"
                  }
                }
              }
            }


    .. tab:: VK > VIBER > FLASHINGCALL (VOICECODE) > SMS

       .. code-block:: json
          :linenos:
          :emphasize-lines: 21-57

            {
              "login": "ВАШ_ЛОГИН",
              "password": "ВАШ_ПАРОЛЬ",
              "useTimeDiff": false,
              "id": "8770100",
              "scheduleInfo": {
                "timeBegin": "10:00",
                "timeEnd": "21:00",
                "weekdaysSchedule": "12345",
                "deadline": "2029-12-31T16:29:30+0300"
              },
              "destAddr": "НОМЕР_ОТПРАВИТЕЛЯ",
              "message": {
                "type": "VK",
                "data": {
                  "text": "VK",
                  "serviceNumber": "ВАШ_СЕРВИСНЫЙ_НОМЕР",
                  "ttl": 1
                }
              },
              "cascadeChainLink": {
                "state": "DELIVERED",
                "message": {
                  "type": "VIBER",
                  "data": {
                    "instantContent": {
                      "type": "TEXT",
                      "data": {
                        "text": "VIBER"
                      }
                    },
                    "serviceNumber": "ВАШ_СЕРВИСНЫЙ_НОМЕР",
                    "ttl": 1
                  }
                },
                "nextLink": {
                  "state": "DELIVERED",
                  "message": {
                    "type": "FLASHINGCALL",
                    "data": {
                      "text": "Ваш код 2268",
                      "ttl": 1
                    }
                  },
                  "nextLink": {
                    "state": "DELIVERED",
                    "message": {
                      "type": "SMS",
                      "data": {
                        "text": "SMS",
                        "serviceNumber": "ВАШ_СЕРВИСНЫЙ_НОМЕР",
                        "ttl": 1
                      }
                    }
                  }
                }
              }
            }




Параметры каскадной рассылки
-------------------------------

Для отправки в запросе цепочки сообщений разного типа требуется передавать дополнительный блок параметров ``CascadeChainLink``.

+--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
| Параметр                       | Обязат.  | Тип          | Описание                                                                         |
+================================+==========+==============+==================================================================================+ 
| cascadeChainLink               | нет      | object       | | Параметры каскадных сообщений.                                                 |
+--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
| | {cascadeChainLink}           | да       | enum         | | Статус, по которому производится доотправка сообщения.                         |
| | state                        |          |              | | Обязательный параметр, если требуется передача сообщения в каскаде.            |
|                                |          |              |                                                                                  |
|                                |          |              | .. raw:: html                                                                    |
|                                |          |              |                                                                                  |
|                                |          |              |     <details>                                                                    |
|                                |          |              |         <summary>Подробнее</summary>                                             |
|                                |          |              |         <p>                                                                      |
|                                |          |              |             Возможные значения:                                                  |
|                                |          |              |         </p>                                                                     |
|                                |          |              |         <ul>                                                                     |
|                                |          |              |             <li><code>DELIVERED</code> – производить доотправку, если сообщение  |
|                                |          |              |                 не доставлено в течение времени жизни сообщения;</li>            |
|                                |          |              |             <li><code>READ</code> – производить доотправку, если сообщение не    |
|                                |          |              |                 прочитано в течение времени жизни сообщения.</li>                |
|                                |          |              |         </ul>                                                                    |
|                                |          |              |     </details>                                                                   |
+--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
| | {cascadeChainLink}           | да       | object       | | Параметры доотправляемого сообщения.                                           |
| | message                      |          |              | | Обязательный параметр, если требуется передача сообщения в каскаде.            |
|                                |          |              | | Аналогично объекту ``message`` основного сообщения.                            |
+--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
| | {cascadeChainLink}           | нет      | object       | | Параметры следующего доотправляемого сообщения в цепочке.                      |
| | nextLink                     |          |              | | Аналогично объекту ``cascadeChainLink``.                                       |
+--------------------------------+----------+--------------+----------------------------------------------------------------------------------+

