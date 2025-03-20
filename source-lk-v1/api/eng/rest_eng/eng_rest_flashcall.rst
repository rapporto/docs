FlashingCall (VoiceCode)
===========================

FlashingCall (VoiceCode) Request
--------------------------------

To send the message with :term:`FlashingCall` type you need to make a request.

To send :term:`VoiceCode` you need to specify the :term:`FlashingCall` type and send a request, containing the code. 
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

      All parameters are mandatory.

      .. csv-table:: 
          :header: "Parameter", "Data type", "Description"
          :widths: 20, 15, 45
          :class: my-table

          "**login**", "string", "Partner's name in the system."
          "**password**", "string", "Partner's password in the system."
          "**destAddr**", "string", "Subscriber's phone number. It contains the country code, operator code and phone number. For the Russian Federation, the code can be '8', '7' or '+7'. Examples: 72101234567, +72101234567, 8-210-123-45-67, 82101234567."
          "**message**", "object", "Parameters of a message being sent."
          "**message/type**", "enum", "Message type. The value of *FLASHINGCALL* is transmitted."
          "**message/data**", "object", "Parameters of the data being sent."
          "**message/data/text**", "string", "Message text. Number of characters: no more than 2000. Text must contain the code used to call the subscriber number."
          "**message/data/ttl**", "integer", "FLASHINGCALL (Voice Code) message lifetime. The waiting interval for a response is from 1 to 5 minutes. Note. If ttl = 0 or if there are no parameter in the request the value is taken from the default settings set when configuring the integration for each client individually."



FlashingCall Request Result
--------------------------------

| The result of the request execution for :term:`FlashingCall` type message will be a call to the subscriber's phone from a special numbering capacity. 
| The last digits of the calling number are the code that is sent in the message text. 
| The sending message code in the text shall consist of 4 or 6 digits. 
| Response waiting period (ttl) on the call-making is from 1 to 5 minutes.
| After sending the message the Service Provider returns a response synchronously.


VoiceCode Request Result
----------------------------

| The result of the request :term:`VoiceCode` type message will be a call to the subscriber's phone. When the subscriber picks up the phone, he will hear a voice message that will contain a 4 digit code.
| To activate this service, you should contact the Technical Support Service and agree on the text of the voice message template.


FlashingCall (VoiceCode) Message Sending Errors 
-------------------------------------------------------

For results with errors, a response HTTP code will differ from 200 (see :ref:`eng-Коды-ошибок-отправки-FC`).

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

      .. csv-table:: 
        :header: "Parameter", "Data type", "Description"
        :widths: 30, 15, 35
        :class: my-table

        "error", "object", "Error information"
        "error/code", "int", "Error code"
        "error/description", "string", "A brief description of the error"
        "extendedDescription", "string", "Detailed description of the error (optional parameter)"


.. _eng-Коды-ошибок-отправки-FC:

Error Codes  
~~~~~~~~~~~~~~~

.. csv-table:: 
   :header: "Code", "Description", "HTTP code"
   :widths: 7, 30, 15
   :class: my-table

   1, "Service is unavailable", "503"
   2, "Invalid IP-address", "403"
   3, "Too many connections", "429"
   4, "Invalid request", "400"
   5, "Invalid login", "401"
   6, "Invalid password", "401"
   7, "serviceNumber is not defined", "400"
   8, "destAddr is not correct", "406"
   9, "Message type is not correct", "406"
   10, "Prohibited sending duplicates", "409"
   11, "Invalid TTL", "406"
   100, "100", "500"



FlashingCall (VoiceCode) Delivery Statuses
-------------------------------------------------

To receive FlashingCall (VoiceCode) message statuses you need to set up a :doc:`eng_rest_status`.
