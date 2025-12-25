Cascading Message Sending
===============================

Cascading message sending is not available by default. To enable it, the Partner needs to contact his supervising manager.

The service supports the following types of cascading message:

* FLASHINGCALL (VOICECODE);
* PUSH;
* SMS;
* TELEGRAM;
* TGCODE;
* VIBER;
* VK;
* WHATSAPP.

When sending it can be any sequence of message types.

The message is resent in case of receiving a status indicating that the message was not successfully sent (if no ``DELIVERED`` or ``READ`` statuses of the ``state`` parameter are received).

.. raw:: html

   <div class="admonition note">
       <p class="admonition-title">Note</p>
       <p>The default message lifetime is set when configuring the integration connection or transmitted in the <code>ttl</code> parameter when sending the message.</p>
       <p>The lifetime for each message from the cascade chain is set separately.</p>

   </div>                                                                           

Resending of the ``FLASHINGCALL (VOICECODE)`` type message is possible only for the ``DELIVERED`` status.

To receive reports on all types of messages when sending a cascading message chain you need to specify the value ``1`` in the ``registeredDelivery`` parameter.

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


    .. tab:: TELEGRAM > SMS

       A request for cascading message sending in a standard sending.

       .. code-block:: json
          :linenos:
          :emphasize-lines: 25-36

            {
               "login": "YOUR_LOGIN",
               "password": "YOUR_PASSWORD",
               "destAddr": "SUBSCRIBER'S_NUMBER",
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
                     "serviceNumber": "SENDER'S_NAME",
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
                      "serviceNumber": "SENDER'S_NAME",
                      "ttl": 1,
                      "ttlUnit": "MINUTES"
                    }
                  }
                }
              }



    .. tab:: TGCODE > SMS

       A request to send an authorization code to a subscriber via cascading message sending.     

       .. code-block:: json
          :linenos:
          :emphasize-lines: 21-32

            {
              "login": "YOUR_LOGIN",
              "password": "YOUR_PASSWORD",
              "destAddr": "SUBSCRIBER'S_NUMBER",
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
                  "text": "Your code: 12345.",
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
                    "text": "Your code: 12345.",
                    "serviceNumber": "SENDER'S_NAME",
                    "ttl": 1,
                    "ttlUnit": "MINUTES"
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

In order to send the chain of messages of various types, an additional block of ``CascadeChainLink`` parameters shall be transmitted in the request.
 
+--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
| Parameter                      | Required | Type         | Description                                                                      |
+================================+==========+==============+==================================================================================+ 
| cascadeChainLink               | no       | object       | Cascading message parameters.                                                    |
+--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
| | {cascadeChainLink}           | yes      | enum         | Status by which the message is resent.                                           |
| | state                        |          |              |                                                                                  |
|                                |          |              |                                                                                  |
|                                |          |              | .. raw:: html                                                                    |
|                                |          |              |                                                                                  |
|                                |          |              |     <details>                                                                    |
|                                |          |              |         <summary>More details</summary>                                          |
|                                |          |              |         <p>                                                                      |
|                                |          |              |             Possible values are:                                                 |
|                                |          |              |         </p>                                                                     |
|                                |          |              |         <ul>                                                                     |
|                                |          |              |             <li><code>DELIVERED</code> (to resend the message if the message is  |
|                                |          |              |                 not delivered during the message lifetime);</li>                 |
|                                |          |              |             <li><code>READ</code> (to resend the message if the message is not   |
|                                |          |              |                 read during the message lifetime).</li>                          |
|                                |          |              |         </ul>                                                                    |
|                                |          |              |     </details>                                                                   |
+--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
| | {cascadeChainLink}           | yes      | object       | Parameters of the message to be resent.                                          |
| | message                      |          |              |                                                                                  |
|                                |          |              | .. raw:: html                                                                    |
|                                |          |              |                                                                                  |
|                                |          |              |     <details>                                                                    |
|                                |          |              |         <summary>More details</summary>                                          |
|                                |          |              |         <p>                                                                      |
|                                |          |              |             Similar to the <code>message</code> object of the main message.      |
|                                |          |              |         </p>                                                                     |
|                                |          |              |     </details>                                                                   |
+--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
| | {cascadeChainLink}           | no       | object       | Parameters of the next message to be resent in the chain.                        |
| | nextLink                     |          |              |                                                                                  |
|                                |          |              | .. raw:: html                                                                    |
|                                |          |              |                                                                                  |
|                                |          |              |     <details>                                                                    |
|                                |          |              |         <summary>More details</summary>                                          |
|                                |          |              |         <p>                                                                      |
|                                |          |              |             Similar to the <code>cascadeChainLink</code> object.                 |
|                                |          |              |         </p>                                                                     |
|                                |          |              |     </details>                                                                   |
+--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
