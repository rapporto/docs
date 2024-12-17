Каскадная рассылка
=====================

:term:`Каскадная рассылка` сообщений по умолчанию недоступна. Для подключения Партнёру необходимо обратиться к курирующему менеджеру.

Типы сообщений, допустимые в каскадной рассылке:

* FlashingCall (Voice Code);
* Push;
* SMS;
* Telegram;
* Viber;
* VK;
* WhatsApp.

Последовательность типов сообщений при отправке может быть произвольной.

Причиной для переотправки сообщения является неполучение одного из статусов параметра *state* "Получено (DELIVERED)" или "Прочитано (READ)" в течение времени жизни сообщения (параметр *ttl*). 

.. note::

    :term:`Время жизни сообщения` по умолчанию задается при настройке интеграционного клиента или передается в параметре *ttl* при отправке сообщения. Для каждого типа сообщения из цепочки каскада время жизни настраивается отдельно.

Для сообщения типа FlashingCall (Voice Code) возможна переотправка только по статусу "Получено (DELIVERED)".

Для получения отчётов по всем типам сообщений при отправке каскадной цепочки сообщений необходимо в параметре *registeredDelivery* указать значение "1".

Примеры каскадной рассылки
----------------------------

.. tabs::

    .. tab:: Push > SMS

       .. code-block:: json
          :linenos:
          :emphasize-lines: 15-22
 
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


    .. tab:: Viber > SMS

       .. code-block:: json
          :linenos:
          :emphasize-lines: 19-27

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


    .. tab:: FlashingCall (Voice Code) > SMS

       .. code-block:: json
          :linenos:
          :emphasize-lines: 12-19
 
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


    .. tab:: WhatsApp > SMS

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


    .. tab:: VK > Viber > FlashingCall (Voice Code) > SMS

       .. code-block:: json
          :linenos:
          :emphasize-lines: 21-52

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

Для отправки цепочки сообщений разного типа в запросе требуется передавать дополнительный блок параметров *CascadeChainLink*.

**Обязательные** параметры выделены **жирным** шрифтом.

.. csv-table::
      :header: "Параметр", "Тип данных", "Описание"
      :widths: 30, 15, 35
      :class: my-table

         "cascadeChainLink", "object", "Параметры каскадных сообщений."
         "**cascadeChainLink/state**", "enum", "Статус, по которому производится доотправка сообщения. Возможные значения: DELIVERED (производить доотправку, если сообщение не доставлено в течение времени жизни сообщения); READ (производить доотправку, если сообщение не прочитано в течение времени жизни сообщения)."
         "**cascadeChainLink/message**", "object", "Параметры доотправляемого сообщения. Аналогично объекту *message* основного сообщения."
         "cascadeChainLink/nextLink", "object", "Параметры следующего доотправляемого сообщения в цепочке. Аналогично объекту *cascadeChainLink*."
 
