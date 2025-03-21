Cascading Message Sending
===============================

Description
------------------

Cascading message sending is the sequential sending of a message via different channels over the message's lifetime (*ttl* parameter). 

The message is resent in case of receiving a status indicating that the message was not successfully sent (if no "DELIVERED" or "READ" statuses of the *state* parameter are received).

The service supports the following types of cascading message:

* FlashingCall (Voice Code);
* Push;
* SMS;
* Telegram;
* Viber;
* VK;
* WhatsApp.

When sending it can be any sequence of message types.

The default message lifetime is set when configuring the integration connection or transmitted in the *ttl* parameter when sending the message. The lifetime for each message from the cascade chain is set separately.

Resending of the FlashingCall (Voice Code) type message is possible only for the "DELIVERED" status.

To receive reports on all types of messages when sending a cascading message chain you need to specify the value "1" in the *registeredDelivery* parameter.

Cascading message sending is not available by default. To enable it the Partner needs to contact his supervising manager.

Request Examples 
------------------

.. tabs::

    .. tab:: Push > SMS

       .. code-block:: json
          :linenos:
          :emphasize-lines: 15-22
 
            {
              "login":"YOUR_LOGIN",
                "password":"YOUR_PASSWORD",
                "id":"8770631",
                "destAddr":"Subscriber's_Number",
                "message":{
                  "type":"PUSH",
                  "data":{
                    "title":"Push message header",
                    "text":"Notification text",
                    "serviceNumber":"SENDER'S_NAME",
                    "ttl":2
                  }
                },
                "cascadeChainLink": {
                  "state": "DELIVERED",
                  "message": {
                    "type": "SMS",
                    "data": {
                      "text": "Text of SMS to be resent",
                      "serviceNumber": "SMS_SENDER'S_NAME",
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
              "login": "YOUR_LOGIN",
              "password": "YOUR_PASSWORD",
              "id": "8770100",
              "destAddr": "Subscriber's_Number",
              "message": {
                "type": "VIBER",
                "data": {
                  "instantContent": {
                    "type": "TEXT",
                    "data": {
                      "text": "VIBERMESS"
                    }
                  },
                  "serviceNumber": "SENDER'S_NAME",
                  "ttl": 1
                }
              },
              "cascadeChainLink": {
                "state": "READ",
                "message": {
                  "type": "SMS",
                  "data": {
                    "text": "SMSMESS",
                    "serviceNumber": "SENDER'S_NAME",
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
              "login": "YOUR_LOGIN",
              "password": "YOUR_PASSWORD",
              "destAddr": "Subscriber's_Number",
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
                    "text": "Text of SMS to be resent",
                    "serviceNumber": "SMS_SENDER'S_NAME",
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
                "login": "YOUR_LOGIN",
                "password": "YOUR_PASSWORD",
                "useTimeDiff": true,
                "id": "87706112",
                "scheduleInfo": {
                    "timeBegin": "09:00",
                    "timeEnd": "21:00",
                    "weekdaysSchedule": "12345",
                    "deadline": "2024-12-31T16:29:30+0300"
                },
                "destAddr": "Subscriber's_Number",
                "message": {
                    "type": "WHATSAPP",
                    "data": {
                        "instantContent": {
                            "type": "TEXT",
                            "data": {
                                "text": "WhatsApp message text"
                            }
                        },
                        "serviceNumber": "SENDER'S_NAME",
                        "ttl": 120,
                        "ttlUnit": "SECONDS"
                    }
                },
                "cascadeChainLink": {
                    "state": "DELIVERED",
                    "message": {
                        "type": "SMS",
                        "data": {
                            "text": "Text of SMS to be resent",
                            "serviceNumber": "SMS_SENDER'S_NAME",
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
              "login": "YOUR_LOGIN",
              "password": "YOUR_PASSWORD",
              "useTimeDiff": false,
              "id": "8770100",
              "scheduleInfo": {
                "timeBegin": "10:00",
                "timeEnd": "21:00",
                "weekdaysSchedule": "12345",
                "deadline": "2029-12-31T16:29:30+0300"
              },
              "destAddr": "SENDER'S_NUMBER",
              "message": {
                "type": "VK",
                "data": {
                  "text": "VK",
                  "serviceNumber": "SENDER'S_NAME",
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
                    "serviceNumber": "SENDER'S_NAME",
                    "ttl": 1
                  }
                },
                "nextLink": {
                  "state": "DELIVERED",
                  "message": {
                    "type": "FLASHINGCALL",
                    "data": {
                      "text": "Your code is 2268",
                      "ttl": 1
                    }
                  },
                  "nextLink": {
                    "state": "DELIVERED",
                    "message": {
                      "type": "SMS",
                      "data": {
                        "text": "SMS",
                        "serviceNumber": "SENDER'S_NAME",
                        "ttl": 1
                      }
                    }
                  }
                }
              }
            }


Request Parameters 
--------------------

In order to send the chain of messages of various types, an additional block of *CascadeChainLink* parameters shall be transmitted in the request.

The **mandatory** parameters are highlighted **in bold**.

.. csv-table::
      :header: "Parameter", "Data type", "Description"
      :widths: 30, 15, 35
      :class: my-table

         "cascadeChainLink", "object", "Cascading message parameters."
         "**cascadeChainLink/state**", "enum", "A status by which the message is resent. Possible values are: DELIVERED (to resend the message if the message is not delivered during the message lifetime); READ (to resend the message if the message is not read during the message lifetime)."
         "**cascadeChainLink/message**", "object", "Parameters of the message to be resent. Similar to the *message* object of the main message."
         "cascadeChainLink/nextLink", "object", "Parameters of the next message to be resent in the chain. Similar to the *cascadeChainLink* object."
 
