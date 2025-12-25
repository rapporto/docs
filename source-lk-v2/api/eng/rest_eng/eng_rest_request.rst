
Request Structure
===================

Interaction with the Platform
-------------------------------

To interact with the Service Provider platform, the Partner makes standard requests in JSON format.

To send a message to a subscriber, the Partner calls the URL of the Service Provider and sends the subscriber's number, message text and other parameters. 

The Service Provider accepts the request, sends a message to the subscriber and returns the message identifier to the Partner in the body of the response to request. 


Content and Request Parameters 
-------------------------------------

-  URI;
-  HTTP method: POST;
-  Content-Type: application/json;
-  character encoding: UTF-8 is recommended.

   
