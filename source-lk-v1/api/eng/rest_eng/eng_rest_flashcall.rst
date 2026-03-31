FlashingCall (VoiceCode)
===========================

FlashingCall (VoiceCode) Request
--------------------------------

To send the message with :term:`FlashingCall` type, you need to make a request.

To send :term:`VoiceCode`, you need to specify the :term:`FlashingCall` type and send a request, containing the code. 
The specified code (without accompanying text) will be passed to the operator, who will insert it into the text of the message template. 



.. tabs::

   .. tab:: Request example

      .. code-block:: json
         :linenos:


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
         }
         }


   .. tab:: Request parameters

+-----------------------+----------+--------------+----------------------------------------------------------------------------------------------------+
| Parameter             | Required | Type         | Description                                                                                        |
+=======================+==========+==============+====================================================================================================+
| login                 | yes      | string       | Partner's name in the system.                                                                      |
+-----------------------+----------+--------------+----------------------------------------------------------------------------------------------------+
| password              | yes      | string       | Partner's password in the system.                                                                  |
+-----------------------+----------+--------------+----------------------------------------------------------------------------------------------------+
| destAddr              | yes      | string       | Subscriber's phone number.                                                                         |
|                       |          |              |                                                                                                    |
|                       |          |              | .. raw:: html                                                                                      |
|                       |          |              |                                                                                                    |
|                       |          |              |     <details>                                                                                      |
|                       |          |              |         <summary>More details</summary>                                                            |
|                       |          |              |         <p>                                                                                        |
|                       |          |              |             It contains the country code, operator code and phone number.                          |
|                       |          |              |         </p>                                                                                       |
|                       |          |              |         <p>                                                                                        |
|                       |          |              |             For the Russian Federation, the code can be <code>8</code>, <code>7</code> or          |  
|                       |          |              |             <code>+7</code>.                                                                       |
|                       |          |              |         </p>                                                                                       |
|                       |          |              |         <p>                                                                                        |
|                       |          |              |             Examples: <code>72101234567</code>, <code>+72101234567</code>,                         |   
|                       |          |              |             <code>8-210-123-45-67</code>, <code>82101234567</code>.                                |
|                       |          |              |         </p>                                                                                       |
|                       |          |              |     </details>                                                                                     |
+-----------------------+----------+--------------+----------------------------------------------------------------------------------------------------+
| message               | yes      | object       | Parameters of a message being sent.                                                                |
+-----------------------+----------+--------------+----------------------------------------------------------------------------------------------------+ 
| message/type          | yes      | enum         | Message type.                                                                                      |
|                       |          |              |                                                                                                    |
|                       |          |              | The value of <code>FLASHINGCALL</code> is transmitted.                                             |
+-----------------------+----------+--------------+----------------------------------------------------------------------------------------------------+
| message/data          | yes      | object       | Parameters of the data being sent.                                                                 |
+-----------------------+----------+--------------+----------------------------------------------------------------------------------------------------+ 
| message/data/text     | yes      | string       | Message text.                                                                                      |
|                       |          |              |                                                                                                    |
|                       |          |              | The message shall contain either a 4-digit or 6-digit numeric code used to call the subscriber.    |
|                       |          |              |                                                                                                    |
|                       |          |              | .. raw:: html                                                                                      |
|                       |          |              |                                                                                                    |
|                       |          |              |     <details>                                                                                      |
|                       |          |              |         <summary>More details</summary>                                                            |
|                       |          |              |         <p>                                                                                        |
|                       |          |              |             By default, a four-digit code is set for sending.                                      |
|                       |          |              |         </p>                                                                                       |
|                       |          |              |         <p>                                                                                        |
|                       |          |              |             To configure the sending of a six-digit code, you should contact the support           |
|                       |          |              |             of the Service Provider.                                                               |
|                       |          |              |         </p>                                                                                       |
|                       |          |              |         <p>                                                                                        |
|                       |          |              |             If a message is sent without a code, the request will be rejected with the error       |
|                       |          |              |             <code>400, Invalid request. Flashing Call text should contain a 4(6)-digit code</code>.|
|                       |          |              |         </p>                                                                                       |
|                       |          |              |         <p>                                                                                        |
|                       |          |              |             Number of characters of the message text: no more than 2000.                           |
|                       |          |              |         </p>                                                                                       |
|                       |          |              |     </details>                                                                                     |
+-----------------------+----------+--------------+----------------------------------------------------------------------------------------------------+ 
| message/data/ttl      | yes      | integer      | FLASHINGCALL (Voice Code) message lifetime.                                                        |
|                       |          |              |                                                                                                    |
|                       |          |              | .. raw:: html                                                                                      |
|                       |          |              |                                                                                                    |
|                       |          |              |     <details>                                                                                      |
|                       |          |              |         <summary>More details</summary>                                                            |
|                       |          |              |         <p>                                                                                        |
|                       |          |              |             The waiting interval for a response is from 1 to 5 minutes.                            |
|                       |          |              |         </p>                                                                                       |
|                       |          |              |     <div class="admonition note">                                                                  |
|                       |          |              |         <p class="admonition-title">Note</p>                                                       |
|                       |          |              |         <p>If <code>ttl = 0</code> or if there are no parameter in the request the value is taken  |
|                       |          |              |            from the default settings set when configuring the integration for each client          |
|                       |          |              |            individually.</p>                                                                       |
|                       |          |              |     </div>                                                                                         |
|                       |          |              |     </details>                                                                                     |
+-----------------------+----------+--------------+----------------------------------------------------------------------------------------------------+ 


FlashingCall Request Result
--------------------------------

| The result of the request execution for :term:`FlashingCall` type message will be a call to the subscriber's phone from a special numbering capacity. 
| The last digits of the calling number are the code that is sent in the message text. 
| The sending code in the text shall consist of four or six digits. By default, a four-digit code is set for sending. To configure the sending of a six-digit code, you should contact the support of the Service Provider.
| Response waiting period (ttl) on the call-making is from 1 to 5 minutes.
| After sending the message the Service Provider returns a response synchronously.


VoiceCode Request Result
----------------------------

| The result of the :term:`VoiceCode` type message request will be a call to the subscriber's phone. When the subscriber picks up the phone, he will hear a voice message that will contain a 4 or 6 digit code.
| To activate this service, you should contact the Technical Support Service and agree on the text of the voice message template.


FlashingCall (VoiceCode) Message Sending Errors 
-------------------------------------------------------

For results with errors, a response HTTP code will differ from ``200`` (see :ref:`eng-Коды-ошибок-отправки-FC`).

.. tabs::

   .. tab:: Response example

      .. code-block:: json
         :linenos:

         { 
            "error": { 
               "code": 4, 
               "description": "Invalid request" 
            }, 
            "extendedDescription": "FlashingCall text should contain a 4-digit code." 
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


.. _eng-Коды-ошибок-отправки-FC:

Error Codes  
~~~~~~~~~~~~~~~

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


FlashingCall (VoiceCode) Delivery Statuses
-------------------------------------------------

To receive FlashingCall (VoiceCode) message statuses you need to set up the :doc:`eng_rest_status`.

Delivery Error Codes
~~~~~~~~~~~~~~~~~~~~~~~

Delivery error codes for each message type are provided in the corresponding tab of the :ref:`REST-ErrCodeDescr-eng` section.