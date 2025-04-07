Delivery Status Service
==============================

Service Setup
--------------------

The Service Provider sends a message delivery report to the Partner's URL configured to send delivery statuses. 

The URL for statuses is set in the integration settings when enabling the service, it can also be sent in  *notifyUrl* parameter. The URL sent in the parameter is deemed priority, and if the parameter
is not sent or an incorrect URL is sent, the message delivery report is sent to the URL specified when the connection was configured.

HTTP method: POST.


.. _eng-REST-Статус-параметры:

Delivery Report
------------------

.. tabs::

    .. tab:: Example of delivery report

        .. code-block:: json
           :linenos:

            {
              "id":"8770599",
              "mtNum":"107930572",
              "status":2,
              "type":"SMS",
              "doneDate":"2019-05-05T10:20:35+0300",
              "submitDate":"2019-05-05T10:19:55+0300",
              "sourceAddr":"SOURCE",
              "destAddr": "72101234567",
              "text":"message_text",
              "partCount":"001",
              "errorCode":"0",
              "mccMnc":"25012",
              "trafficType":0
            }

    .. tab:: Parameters of delivery report

        +-------------+---------+--------------------------------------------+
        | id          | string  | Partner-side unique ID.                    |
        |             |         | If not sent by the Partner, then the       |
        |             |         | value is empty.                            |
        +-------------+---------+--------------------------------------------+
        | mtNum       | string  | Sending chain identifier assigned          |
        |             |         | by the Service Provider platform.          |
        +-------------+---------+--------------------------------------------+
        | status      | integer | Delivery status. It returns the following  |
        |             |         | values:                                    |
        |             |         |                                            |
        |             |         | * 0 -- sent to the Operator,               |
        |             |         |   the final status is not known yet;       |
        |             |         | * 2 -- delivered;                          |
        |             |         | * 5 -- undelivered. The reason of          |
        |             |         |   non-delivery is specified in errorCode;  |
        |             |         | * 9 -- read (except for FlashingCall, SMS).|
        +-------------+---------+--------------------------------------------+
        | type        | string  | Type of message: SMS, VIBER, VK, PUSH,     |
        |             |         | WHATSAPP, TELEGRAM, FLASHINGCALL.          |
        +-------------+---------+--------------------------------------------+
        | doneDate    | date    | Date/time of delivery. If undelivered,     |
        |             |         | then the value is empty.                   |
        +-------------+---------+--------------------------------------------+
        | submitDate  | date    | Date/time of message sending.              |
        +-------------+---------+--------------------------------------------+
        | destAddr    | string  | Subscriber's number.                       |
        +-------------+---------+--------------------------------------------+
        | sourceAddr  | string  | Service number where the message was       |
        |             |         | sent from.                                 |
        +-------------+---------+--------------------------------------------+
        | text        | string  | Message text.                              |
        +-------------+---------+--------------------------------------------+
        | partCount   | string  | Amount of message parts.                   |
        +-------------+---------+--------------------------------------------+
        | errorCode   | string  | Error code.                                |
        |             |         |                                            |
        |             |         | If sending is successful, the errorCode    |
        |             |         | parameter is 0.                            |
        |             |         | If status = 5 it returns the error code.   |
        |             |         | The set of codes depends on the type of    |
        |             |         | message. The codes are described below.    |
        +-------------+---------+--------------------------------------------+
        | mccMnc      | string  | MCC and MNC codes. Parameter contains an   |
        |             |         | MCC code which usually consists of 3 digits|
        |             |         | and an MNC code of 2 digits.               |
        |             |         | It is transmitted optionally.              |
        +-------------+---------+--------------------------------------------+
        | trafficType | integer | Type of traffic. It returns the following  |
        |             |         | type of traffic:                           |
        |             |         |                                            |
        |             |         | -  0 – promotional;                        |
        |             |         | -  1 – transactional;                      |
        |             |         | -  2 – service;                            |
        |             |         | -  5 – informational;                      |
        |             |         | -  6 – authorization;                      |
        |             |         | -  7 – promotional templated.              |
        +-------------+---------+--------------------------------------------+


Delivery Statuses
-------------------

.. csv-table:: 
    :header: "Code", "Delivery status", "Description"
    :widths: 7, 15, 30
    :class: my-table

     0, "SEND", "Sent to the operator, the final status is not known yet."
     2, "DELIVERED", "Delivered to the operator, after delivery it is possible to wait for the status of reading by the subscriber."
     5, "UNDELIVERED, REJECTED", "Rejected by the operator/undelivered to the operator. The reason of non-delivery is specified in the *errorCode* parameter. It is the final status, no further statuses are expected."
     9, "READ", "Status indicating the message is read by a subscriber. *For all messages except FlashingCall and SMS*. It is the final status, no further statuses are expected."


Description of Error Codes (parameter *status=5*)
--------------------------------------------------

The section provides a description of the reasons for the non-delivery of messages of various types.

.. tabs::


    .. tab:: Push

      +---------+----------------------------+-----------------------------+
      | Code    | Error message              | Error description           |
      +=========+============================+=============================+
      | 1       | unknown                    | An error unknown to the     |
      |         |                            | platform occurred during    |
      |         |                            | the message delivery process|
      |         |                            | or the operator did not     |
      |         |                            | provide an error in the     |
      |         |                            | delivery report.            |
      +---------+----------------------------+-----------------------------+
      | 7       | timeout                    | The switching equipment on  |
      |         |                            | which the subscriber is     |
      |         |                            | registered isn't responding.|
      +---------+----------------------------+-----------------------------+
      | 8       | unknown-subscriber         | The subscriber's phone      |
      |         |                            | number is incorrect, or the |
      |         |                            | subscriber's phone has been |
      |         |                            | switched off for a very     |
      |         |                            | long time.                  |
      +---------+----------------------------+-----------------------------+
      | 9       | duplicated                 | A message was discarded by  |
      |         |                            | the platform as the function|
      |         |                            | of cutting duplicate        |
      |         |                            | messages was activated.     |
      +---------+----------------------------+-----------------------------+
      | 11      | unrouted                   | Routing error at the        |
      |         |                            | platform configurationы.    |
      +---------+----------------------------+-----------------------------+
      | 13      | oper-invsrcaddr            | Message sending from a      |
      |         |                            | sender's name that is not   |
      |         |                            | registered by the operator. |
      +---------+----------------------------+-----------------------------+
      | 18      | bad-params                 | Invalid request parameters  |
      |         |                            | were specified or required  |
      |         |                            | parameters were not         |
      |         |                            | specified.                  |
      +---------+----------------------------+-----------------------------+
      | 19      | consumer-id-not-found      | The card with the subscriber|
      |         |                            | ID being sent was not found.|
      +---------+----------------------------+-----------------------------+
      | 20      | consumer-phone-not-found   | The card with the           |
      |         |                            | subscriber's telephone      |
      |         |                            | number being sent was not   |
      |         |                            | found.                      |
      +---------+----------------------------+-----------------------------+
      | 21      | no-primary-devices         | The device is not the       |
      |         |                            | primary one. In case the    |
      |         |                            | sending was made to the     |
      |         |                            | primary device              |
      |         |                            | (primaryOn=true).           |      
      +---------+----------------------------+-----------------------------+
      | 22      | no-active-installations    | No active mobile application|
      |         |                            | installations were found on |
      |         |                            | the user's device.          |
      +---------+----------------------------+-----------------------------+
      | 23      | push-disabled              | The mobile application user |
      |         |                            | has a ban on receiving push |
      |         |                            | notifications at the        |
      |         |                            | application level.          |
      +---------+----------------------------+-----------------------------+
      | 24      | push-os-disabled           | The user's mobile           |
      |         |                            | application has a ban on    |
      |         |                            | receiving push notifications|
      |         |                            | at the operating system     |
      |         |                            | level.                      |
      +---------+----------------------------+-----------------------------+
      | 25      | subscription-failed        | When sending the message    |
      |         |                            | subscriptions were specified|
      |         |                            | that were not configured    |
      |         |                            | on the user's mobile        |
      |         |                            | application installation.   |
      +---------+----------------------------+-----------------------------+
      | 26      | no-application             | No installation of the      |
      |         |                            | mobile application on the   |
      |         |                            | user's device was found.    |
      +---------+----------------------------+-----------------------------+  
      | 27      | below-min-version          | The application version is  |
      |         |                            | less than the minimum       |
      |         |                            | acceptable version. In the  |
      |         |                            | current implementation it is|
      |         |                            | relevant for IOS only.      |   
      +---------+----------------------------+-----------------------------+
      | 28      | provider-error             | APNS, FCM or HMS returned   |
      |         |                            | an error.                   |
      +---------+----------------------------+-----------------------------+


    .. tab:: SMS

      +---------+----------------------------+----------------------------+
      | Code    | Error message              | Error description          |
      +=========+============================+============================+
      | 1       | unknown                    | An error unknown to the    |
      |         |                            | platform occurred during   |
      |         |                            | the message delivery       |
      |         |                            | process, or the operator   |
      |         |                            | did not provide an error in|
      |         |                            | the delivery report.       |
      +---------+----------------------------+----------------------------+
      | 2       | absent-subscriber          | The subscriber's device was|
      |         |                            | turned off or it was out   |
      |         |                            | of network coverage during |
      |         |                            | entire attempt to deliver  |
      |         |                            | the message.               |
      +---------+----------------------------+----------------------------+
      | 3       | call-barred                | The subscriber's device is |
      |         |                            | blocked, either the        |
      |         |                            | subscriber has the ban on  |
      |         |                            | receiving messages enabled |
      |         |                            | or the subscriber is in    |
      |         |                            | roaming with the ban on    |
      |         |                            | receiving messages while   |
      |         |                            | roaming enabled.           |
      +---------+----------------------------+----------------------------+
      | 4       | failure                    | An error occurred at the   |
      |         |                            | transport layer of the     |
      |         |                            | signaling network during   |
      |         |                            | message delivery.          |
      +---------+----------------------------+----------------------------+
      | 5       | memory-capacity-exceeded   | The subscriber's phone     |
      |         |                            | memory is full.            |
      +---------+----------------------------+----------------------------+
      | 6       |teleservice-not-provisioned | The subscriber doesn't have|
      |         |                            | the message receiving      |
      |         |                            | service activated.         |
      +---------+----------------------------+----------------------------+
      | 7       | timeout                    | The switching equipment    |
      |         |                            | on which the subscriber    |
      |         |                            | s registered is not        |
      |         |                            | responding.                |
      +---------+----------------------------+----------------------------+
      | 8       | unknown-subscriber         | The subscriber's phone     |
      |         |                            | number is incorrect, or the|
      |         |                            | subscriber's phone has been|
      |         |                            | switched off for a very    |
      |         |                            | long time.                 |
      +---------+----------------------------+----------------------------+
      | 9       | duplicated                 | A message was discarded by |
      |         |                            | the platform as the        |
      |         |                            | function cutting duplicate |
      |         |                            | messages was activated.    |
      +---------+----------------------------+----------------------------+
      | 10      | filtered                   | The message was discarded  |
      |         |                            | by the platform because one|
      |         |                            | of the message filters,    |
      |         |                            | such as a spam filter,     |
      |         |                            | was triggered.             |
      +---------+----------------------------+----------------------------+
      | 11      | unrouted                   | Routing error at the       |
      |         |                            | platform configuration.    |
      +---------+----------------------------+----------------------------+
      | 12      | oper-blacklisted           | Subscriber's number is on  |
      |         |                            | the operator's blacklist.  |
      +---------+----------------------------+----------------------------+
      | 13      | oper-invsrcaddr            | Message sending from a     |
      |         |                            | sender's name that is not  |
      |         |                            | registered by the operator.|
      +---------+----------------------------+----------------------------+
      | 14      | oper-spamfiltered          | On the operator's side, a  |
      |         |                            | SPAM filter was activated  |
      |         |                            | based on the text of the   |
      |         |                            | message.                   |
      +---------+----------------------------+----------------------------+


    .. tab:: Telegram

      +---------+----------------------------+----------------------------+
      | Code    | Error message              | Error description          |
      +=========+============================+============================+
      | 1       | unknown                    | An error unknown to the    |
      |         |                            | platform occurred during   |
      |         |                            | the message delivery       |
      |         |                            | process, or the operator   |
      |         |                            | did not provide an error   |
      |         |                            | in the delivery report.    |
      +---------+----------------------------+----------------------------+
      | 2       | absent-subscriber          | The subscriber's device    |
      |         |                            | was turned off or was out  |
      |         |                            | of network coverage during |
      |         |                            | the entire delivery        |
      |         |                            | attempts.                  |
      +---------+----------------------------+----------------------------+
      | 3       | call-barred                | The subscriber's device    |
      |         |                            | is blocked, or the         |
      |         |                            | subscriber has a           |
      |         |                            | restriction on receiving   |
      |         |                            | messages, or the subscriber|
      |         |                            | is roaming with a          |
      |         |                            | restriction on receiving   |
      |         |                            | messages while roaming.    |
      +---------+----------------------------+----------------------------+
      | 4       | failure                    | An error occurred during   |
      |         |                            | the delivery of the message|
      |         |                            | at the transport layer of  |
      |         |                            | the signaling network.     |
      +---------+----------------------------+----------------------------+
      | 5       | memory-capacity-exceeded   | The subscriber's phone     |
      |         |                            | memory is full.            |
      +---------+----------------------------+----------------------------+
      | 6       |teleservice-not-provisioned | The subscriber does not    |
      |         |                            | have the message reception |
      |         |                            | service activated.         |
      +---------+----------------------------+----------------------------+
      | 7       | timeout                    | The switching equipment    |
      |         |                            | where the subscriber is    |
      |         |                            | registered is not          |
      |         |                            | responding.                |
      +---------+----------------------------+----------------------------+
      | 8       | unknown-subscriber         | Invalid subscriber number, |
      |         |                            | or the subscriber's phone  |
      |         |                            | was turned off for an      |
      |         |                            | extended period.           |
      +---------+----------------------------+----------------------------+
      | 9       | duplicated                 | The message was discarded  |
      |         |                            | by the platform due to the |
      |         |                            | duplicate message          |
      |         |                            | filtering mechanism.       |
      +---------+----------------------------+----------------------------+
      | 10      | filtered                   | The message was discarded  |
      |         |                            | by the platform because one|
      |         |                            | of the message filters,    |
      |         |                            | such as a spam filter,     |
      |         |                            | was triggered.             |
      +---------+----------------------------+----------------------------+
      | 11      | unrouted                   | Routing error in the       |
      |         |                            | platform configuration.    |
      +---------+----------------------------+----------------------------+
      | 12      | oper-blacklisted           | The subscriber's number is |
      |         |                            | on operator's blacklist.   |
      +---------+----------------------------+----------------------------+
      | 13      | oper-invsrcaddr            | Message sending from       |
      |         |                            | an unregistered sender's   |
      |         |                            | name by an operator.       |
      +---------+----------------------------+----------------------------+
      | 14      | oper-spamfiltered          | A spam filter on the       |
      |         |                            | operator's side was        |
      |         |                            | triggered based on         |
      |         |                            | the message text.          |
      +---------+----------------------------+----------------------------+
      | 15      | verification               | The subscriber does not    |
      |         |                            | have the message reception |
      |         |                            | service activated.         |
      +---------+----------------------------+----------------------------+
      | 16      | busy                       | The subscriber's number    |
      |         |                            | is busy.                   |
      +---------+----------------------------+----------------------------+
      | 18      | bad-params                 | Incorrect request          | 
      |         |                            | specified, or mandatory    |
      |         |                            | parameters are not         |
      |         |                            | specified.                 |
      +---------+----------------------------+----------------------------+
      | 21      | no-primary-devices         | The device is not primary. |
      |         |                            | In case, when a message    |
      |         |                            | was sent to the primary    |
      |         |                            | device (primaryOn=true).   |
      +---------+----------------------------+----------------------------+
      | 22      | no-active-installations    | No active installations    |
      |         |                            | of the mobile application  |
      |         |                            | were found on the user's   |
      |         |                            | device.                    |
      +---------+----------------------------+----------------------------+
      | 26      | no-application             | No installation of the     |
      |         |                            | mobile application was     |
      |         |                            | found on the user's device.|
      +---------+----------------------------+----------------------------+  
      | 27      | below-min-version          | The application version is |
      |         |                            | lower than the minimum     |
      |         |                            | required version. Currently|
      |         |                            | relevant only for iOS.     |   
      +---------+----------------------------+----------------------------+
      | 29      | unrouted-account           | Account configuration      |
      |         |                            | is missing.                |
      +---------+----------------------------+----------------------------+
      | 30      | unknown-layout             | Invalid layout.            |
      +---------+----------------------------+----------------------------+


    .. tab:: Viber

      +---------+------------------------------+----------------------------+
      | Code    | Error message                | Error description          |
      +=========+==============================+============================+
      | 1       | unknown                      | An error unknown to the    |
      |         |                              | platform occurred during   |
      |         |                              | the message delivery       |
      |         |                              | process, or the operator   |
      |         |                              | did not provide an error   |
      |         |                              | in the delivery report.    |
      +---------+------------------------------+----------------------------+
      | 2       | absent-subscriber            | The subscriber's device was|
      |         |                              | turned off or it was out   |
      |         |                              | of network coverage during |
      |         |                              | entire attempt to deliver  |
      |         |                              | the message.               |    
      +---------+------------------------------+----------------------------+
      | 3       | call-barred                  | The subscriber's device is |
      |         |                              | blocked, either the        |
      |         |                              | subscriber has the ban on  |
      |         |                              | receiving messages enabled,|
      |         |                              | or the subscriber is in    |
      |         |                              | roaming with the ban on    |
      |         |                              | receiving messages while   |
      |         |                              | roaming enabled.           |
      +---------+------------------------------+----------------------------+
      | 5       | memory-capacity-exceeded     | The subscriber's phone     |
      |         |                              | memory is full.            |
      +---------+------------------------------+----------------------------+
      | 6       | teleservice-not-provisioned  | The subscriber doesn't have|
      |         |                              | the message receiving      |
      |         |                              | service activated.         |
      +---------+------------------------------+----------------------------+
      | 7       | timeout                      | The switching equipment on |
      |         |                              | which the subscriber is    |
      |         |                              | registered is not          |
      |         |                              | responding.                |
      +---------+------------------------------+----------------------------+
      | 9       | duplicated                   | A message was discarded by |
      |         |                              | the platform as the        |
      |         |                              | function of cutting        |
      |         |                              | duplicate messages was     |
      |         |                              | activated.                 |
      +---------+------------------------------+----------------------------+
      | 11      | unrouted                     | Routing error at the       |
      |         |                              | platform configuration.    |
      +---------+------------------------------+----------------------------+


    .. tab:: VK

      +---------+-----------------------------+----------------------------+
      | Code    | Error message               | Error description          |
      +=========+=============================+============================+
      | 1       | unknown                     | An error unknown to the    |
      |         |                             | platform occurred during   |
      |         |                             | the message delivery       |
      |         |                             | process, or the operator   |
      |         |                             | did not provide an error   |
      |         |                             | in the delivery report.    |
      +---------+-----------------------------+----------------------------+
      | 3       | call-barred                 | The subscriber's device is |
      |         |                             | blocked, either the        |
      |         |                             | subscriber has the ban on  |
      |         |                             | receiving messages enabled,|
      |         |                             | or the subscriber is in    |
      |         |                             | roaming with the ban on    |
      |         |                             | receiving messages while   |
      |         |                             | roaming enabled.           |
      +---------+-----------------------------+----------------------------+
      | 6       |teleservice-not-provisioned  | The subscriber doesn't have|
      |         |                             | the message receiving      |
      |         |                             | service activated.         |
      +---------+-----------------------------+----------------------------+
      | 10      | filtered                    | The message was discarded  |
      |         |                             | by the platform because one|
      |         |                             | of the message filters,    |
      |         |                             | such as a spam filter,     |
      |         |                             | was triggered.             |
      +---------+-----------------------------+----------------------------+
      | 11      | unrouted                    | Routing error at the       |
      |         |                             | platform configuration.    |
      +---------+-----------------------------+----------------------------+


    .. tab:: WhatsApp

      +---------+------------------------------+----------------------------+
      | Code    | Error message                | Error description          |
      +=========+==============================+============================+
      | 3       | call-barred                  | The subscriber's device is |
      |         |                              | blocked, either the        |
      |         |                              | subscriber has the ban on  |
      |         |                              | receiving messages enabled,|
      |         |                              | or the subscriber is in    |
      |         |                              | roaming with the ban on    |
      |         |                              | receiving messages while   |
      |         |                              | roaming enabled.           |
      +---------+------------------------------+----------------------------+
      | 6       | teleservice-not-provisioned  | The subscriber doesn't have|
      |         |                              | the message receiving      |
      |         |                              | service activated.         |
      +---------+------------------------------+----------------------------+
      | 7       | timeout                      | The switching equipment on |
      |         |                              | which the subscriber is    |
      |         |                              | registered is not          |
      |         |                              | responding.                |
      +---------+------------------------------+----------------------------+
      |10       | filtered                     | The message was discarded  |
      |         |                              | by the platform because one|
      |         |                              | of the message filters,    |
      |         |                              | such as a spam filter,     |
      |         |                              | was triggered.             |
      +---------+------------------------------+----------------------------+



    .. tab:: FlashingCall (VoiceCode)

      +---------+------------------------------+----------------------------+
      | Code    | Error message                | Error description          |
      +=========+==============================+============================+
      | 1       | unknown                      | An error unknown to the    |
      |         |                              | platform occurred during   |
      |         |                              | the message delivery       |
      |         |                              | process, or the operator   |
      |         |                              | did not provide an error   |
      |         |                              | in the delivery report.    |
      +---------+------------------------------+----------------------------+
      | 4       | failure                      | An error occurred at the   |
      |         |                              | transport layer of the     |
      |         |                              | signaling network during   |
      |         |                              | message delivery.          |
      +---------+------------------------------+----------------------------+
      | 6       | teleservice-not-provisioned  | The subscriber doesn't have|
      |         |                              | the message receiving      |
      |         |                              | service activated.         |
      +---------+------------------------------+----------------------------+
      | 16      | busy                         | The subscriber's number is |
      |         |                              | busy.                      |
      +---------+------------------------------+----------------------------+



    .. tab:: CardsMobile

      +---------+----------------------------+----------------------------+
      | Code    | Error message              | Error description          |
      +=========+============================+============================+
      | 1       | unknown                    | An error unknown to the    |
      |         |                            | platform occurred during   |
      |         |                            | the message delivery       |
      |         |                            | process, or the operator   |
      |         |                            | did not provide an error   |
      |         |                            | in the delivery report.    |
      +---------+----------------------------+----------------------------+
      | 3       | call-barred                | The subscriber's device is |
      |         |                            | blocked, either the        |
      |         |                            | subscriber has the ban on  |
      |         |                            | receiving messages enabled,|
      |         |                            | or the subscriber is in    |
      |         |                            | roaming with the ban on    |
      |         |                            | receiving messages while   |
      |         |                            | roaming enabled.           |
      +---------+----------------------------+----------------------------+
      | 8       | unknown-subscriber         | The subscriber's phone     |
      |         |                            | number is incorrect, or the|
      |         |                            | subscriber's phone has been|
      |         |                            | switched off for a very    |
      |         |                            | long time.                 |
      +---------+----------------------------+----------------------------+


