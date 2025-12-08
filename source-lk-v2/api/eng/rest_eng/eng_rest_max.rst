MAX
=======

This section describes the features of sending messages to subscribers&#39; devices with the MAX messenger installed. 
Partners can interact with their customers through a bot in this messenger. 

Currently, the Service Provider ensures:

- sending text messages;
- receiving message delivery statuses;
- resending messages via SMS (cascading message): in case of non-delivery to MAX.

Sending Request 
--------------------

The content of the request complies with the requirements for a standard request (see :doc:`eng_rest_request`). 

.. tabs::

    .. tab:: Request example

        .. code-block:: json
           :linenos:

            {
              "login":"YOUR_LOGIN",
              "password":"YOUR_PASSWORD",
              "destAddr":"SUBSCRIBER'S_NUMBER",
              "message":{
                "type":"MAX",
                "data":{
                  "text":"MESSAGE TEXT.",
                  "serviceNumber":"SENDER'S_NAME"
                }
              }
            }           


    .. tab:: Request Parameters

        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
        | Parameter                      | Required | Data type    | Description                                                                      |
        +================================+==========+==============+==================================================================================+
        | login                          | yes      | string       | Partner's username.                                                              |
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
        | password                       | yes      | string       | Partner's password.                                                              |
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
        | destAddr                       | yes      | string       | Subscriber's phone number.                                                       |
        |                                |          |              |                                                                                  |
        |                                |          |              | .. raw:: html                                                                    |
        |                                |          |              |                                                                                  |
        |                                |          |              |     <details>                                                                    |
        |                                |          |              |         <summary>More details</summary>                                          |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |              A positive integer.                                                 |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             Maximum length: 15 digits.                                           |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             It contains a country code, operator code, and phone number.         |
        |                                |          |              |             For Russia, the code can be <code>8</code>, <code>7</code>           |
        |                                |          |              |             or <code>+7</code>.                                                  |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             Examples: <code>72101234567</code>, <code>+72101234567</code>,       |
        |                                |          |              |             <code>8-210-123-45-67</code>, <code>82101234567</code>.              |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             If the subscriber's number is not sent, or is not a valid            |
        |                                |          |              |              phone number, the request will be rejected with an error (see       |
        |                                |          |              |              <a href="#max-sending-errors">MAX Sending Errors</a>).              |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |     </details>                                                                   | 
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
        | message                        | yes      | object       | Parameters of the message to be sent.                                            |
        |                                |          |              |                                                                                  |
        |                                |          |              | .. raw:: html                                                                    |
        |                                |          |              |                                                                                  |
        |                                |          |              |     <details>                                                                    |
        |                                |          |              |         <summary>More details</summary>                                          |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             It contains information about the message type and its content.      |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |     </details>                                                                   |
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
        | | {message}                    | yes      | enum         | Message type.                                                                    |
        | | type                         |          |              |                                                                                  |
        |                                |          |              | Set the value to ``MAX``.                                                        |
        |                                |          |              |                                                                                  |
        |                                |          |              | .. raw:: html                                                                    |
        |                                |          |              |                                                                                  |
        |                                |          |              |     <details>                                                                    |
        |                                |          |              |         <summary>More details</summary>                                          |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             Set the value to <code>MAX</code>.                                   |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |     </details>                                                                   |
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
        | | {message}                    | yes      | object       | Parameters of the data to be sent.                                               |
        | | data                         |          |              |                                                                                  |
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
        | | {message/data}               | yes      | string       | Text of the message to be sent.                                                  | 
        | | text                         |          |              |                                                                                  |
        |                                |          |              | .. raw:: html                                                                    |
        |                                |          |              |                                                                                  |
        |                                |          |              |     <details>                                                                    |
        |                                |          |              |         <summary>More details</summary>                                          |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |            The message text can be in Cyrillic or Latin,                         |
        |                                |          |              |             and can contain emojis.                                              |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             Number of characters: no more than 4000.                             |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             If the parameter is not sent, or its value is invalid,               |
        |                                |          |              |             the request will be rejected with an error (see                      |
        |                                |          |              |             <a href="#max-sending-errors">MAX Sending Errors</a>).               |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |     </details>                                                                   |
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
        | | {message/data}               | yes      | string       | Service name from which the message is sent.                                     |
        | | serviceNumber                |          |              |                                                                                  |
        |                                |          |              | .. raw:: html                                                                    |
        |                                |          |              |                                                                                  |
        |                                |          |              |     <details>                                                                    |
        |                                |          |              |         <summary>More details</summary>                                          |
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             For cascade messaging, specify the service name in the request       |
        |                                |          |              |             (in the main MAX channel). The service name must be pre-approved     |
        |                                |          |              |             by the Service Provider's technical support service.                 |
        |                                |          |              |         </p>                                                                     |        
        |                                |          |              |         <p>                                                                      |
        |                                |          |              |             If the parameter is not sent, or its value is not valid,             |
        |                                |          |              |             the request will be rejected with an error (see                      |
        |                                |          |              |             <a href="#max-sending-errors">MAX Sending Errors</a>).               |
        |                                |          |              |         </p>                                                                     |
        |                                |          |              |     </details>                                                                   |
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+
        | cascadeChainLink               | no       | object       | | Parameters of cascading message. See :doc:`eng_rest_cascade`.                  |
        +--------------------------------+----------+--------------+----------------------------------------------------------------------------------+



Response 
--------------

After sending a message, the Service Provider synchronously returns a response.

Successful MAX Sending 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In case of successful sending, the HTTP code ``200 OK`` is returned.

.. tabs::

    .. tab:: Response example

      .. code-block:: json
         :linenos:

           {
              "mtNum": "7390612217"
              "id": "1234567"
           }

    .. tab:: Response parameters

         +-----------------------+--------------+--------------------------------------------------------------------+
         | Parameter             | Data type    | Description                                                        |
         +=======================+==============+====================================================================+
         | mtNum                 | string       | Identifier of the sending chain assigned by the Service Provider   | 
         |                       |              | platform.                                                          |
         +-----------------------+--------------+--------------------------------------------------------------------+
         | id                    | string       | Unique identifier on the Partner's side. It is present if it       |
         |                       |              | provided when sending.                                             |
         +-----------------------+--------------+--------------------------------------------------------------------+


MAX Sending Errors 
~~~~~~~~~~~~~~~~~~~~~~~~~~

For results with errors, a response HTTP code will differ from ``200 OK`` (see :ref:`Error-codes-max`).

.. tabs::

   .. tab:: Response example

       .. code-block:: json   
          :linenos:

            {
                "error": {
                    "code": 8,
                    "description": "destAddr is not correct"
                },
                "extendedDescription": "Invalid number: 7999999999999999"
            }

   .. tab:: Response parameters

      +-----------------------+--------------+--------------------------------------------------------------------+
      | Parameter             | Data type    | Description                                                        |
      +=======================+==============+====================================================================+
      | error                 | object       | Error information.                                                 | 
      +-----------------------+--------------+--------------------------------------------------------------------+
      | error/code            | int          | Error code.                                                        |
      +-----------------------+--------------+--------------------------------------------------------------------+
      | error/description     | string       | A brief description of the error.                                  | 
      +-----------------------+--------------+--------------------------------------------------------------------+
      | extendedDescription   | string       | Detailed description of the error (optional parameter).            |
      +-----------------------+--------------+--------------------------------------------------------------------+

.. _Error-codes-max:          

Error Codes 
~~~~~~~~~~~~~~~~~~~~~~~

+------------+--------------------------------+----------------+
| Code       | Description                    | HTTP-code      |
+============+================================+================+
| 1          | Service is unavailable         | 503            |
+------------+--------------------------------+----------------+
| 2          | Invalid IP-address             | 403            |
+------------+--------------------------------+----------------+
| 3          | Too many connections           | 429            |
+------------+--------------------------------+----------------+
| 4          | Invalid request                | 400            |
+------------+--------------------------------+----------------+
| 5          | Invalid login                  | 401            |
+------------+--------------------------------+----------------+
| 6          | Invalid password               | 401            |
+------------+--------------------------------+----------------+
| 7          | serviceNumber is not defined   | 400            |
+------------+--------------------------------+----------------+
| 8          | destAddr is not correct        | 406            |
+------------+--------------------------------+----------------+
| 9          | Message type is not correct    | 406            |
+------------+--------------------------------+----------------+
| 10         | Prohibited sending duplicates  | 409            |
+------------+--------------------------------+----------------+
| 11         | Invalid TTL                    | 406            |
+------------+--------------------------------+----------------+
| 100        | 100                            | 500            |
+------------+--------------------------------+----------------+



MAX Delivery Statuses
-------------------------------

To receive statuses of messages, you need to set up a :doc:`eng_rest_status`.

