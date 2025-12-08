

Link Shortening Service
===========================

Description
-------------------

The functionality of the service:

* replacing long links in the message text with short ones;
* link matching storage;
* redirecting from a short link to a long one;
* collecting traffic statistics. 

| Please contact your supervising manager to enable the link shortening service.
| After the Service Provider has configured the link shortening service, all found links in the message text will be shortened by default in accordance with the specified settings.
| If necessary, this setting can also be controlled using the optional ``shortenLinks`` parameter, which can be sent in the request.
| If the service is configured and the parameter is not sent, the link will be shortened by default. The same applies to links passed in :ref:`cascading messages <eng-Ссылки-в-каскаде>`.
| The link is shortened using the **http://kr4.me** domain.

Links are shortened for the following types of messages:

- Viber;
- SMS;
- Push;
- VK.

Service Operation
-------------------------

1. When a long link is detected in the message, a new link is formed - the http://kr4.me/ domain is inserted at the beginning of the new link and a unique ``UID`` is added, which length can be from 3 to 8 characters. Example of a link after shortening: http://kr4.me/EQiCREB.
2. After messages are delivered, when subscribers click the short link, the URL shortening service will identify the corresponding long URL and perform the redirection.
3. Clicks on each link will be recorded in the Platform statistics.



Service Setup
-------------------------

To enable the service, the following data must be provided to the :ref:`Technical Support Service <eng-support>`:

* the number of characters after which the link must be shortened. For example, if the link is shortened by more than 26 characters, then the https://rapporto.ru/ link will be transmitted to the subscriber unchanged, and the https://rapporto.ru/company/o_platforme_rapporto/ link will be shortened, for example `http://kr4.me/QEiCRE/ <https://rapporto.ru/company/o_platforme_rapporto/>`_;
* the number of characters in the ``UID`` that is added after the domain. This parameter affects the number of unique links that can be generated. For example, with a length of UID = 8 characters, about 281 trillion unique links can be generated;
* clarify the need to generate unique links for each subscriber. This parameter affects the traffic statistics. If a single link is used for all subscribers, the total traffic statistics for all subscribers will be displayed;
* the number of days after which an inactive link is deleted if there were no clicks on it;
* the link lifetime — the number of days after which an inactive link is deleted, even if there were clicks on it.



TLV Parameters for Link Shortening
-----------------------------------------

Two different parameters are used to shorten links in message texts:

- ``shorten_links`` — for shortening links in the text of individual messages;
- ``shorten_list`` — for shortening links in the texts of messages within the cascade message.

 
.. tabs:: 

    .. tab:: shorten_links

        Shortening links in the text of individual messages.

        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | TLV Parameter             | Field               | Octets size       | Type              | Description                                                           |
        +===========================+=====================+===================+===================+=======================================================================+
        | shorten_links             | Tag                 | 2                 | Integer           | id = 0x4001                                                           |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | 1                 | Octet String      | Shortening links in the text of the message.                          |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | .. raw:: html                                                         |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   |     <details>                                                         |
        |                           |                     |                   |                   |         <summary>More details</summary>                               |
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             The byte representation of the <code>true</code>          | 
        |                           |                     |                   |                   |             or <code>false</code> values can be specified here        |                      
        |                           |                     |                   |                   |             to indicate whether URL shortening is required.           |        
        |                           |                     |                   |                   |         </p>                                                          |
        |                           |                     |                   |                   |     </details>                                                        |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+


    .. tab:: shorten_list

        Shortening links in the texts of messages within a cascade message.

        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        | shorten_list              | Tag                 | 2                 | Integer           | id = 0x4002                                                           |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Length              | 2                 | Integer           | Length of the parameter in octets.                                    |
        |                           +---------------------+-------------------+-------------------+-----------------------------------------------------------------------+
        |                           | Value               | up to 1000        | Octet String      | Shortening links in the cascade message.                              |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   | .. raw:: html                                                         |
        |                           |                     |                   |                   |                                                                       |
        |                           |                     |                   |                   |     <details>                                                         |
        |                           |                     |                   |                   |         <summary>More details</summary>                               |
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             The parameter value must contain a list of message types  |   
        |                           |                     |                   |                   |             (comma-separated) for which link shortening is required.  |
        |                           |                     |                   |                   |         </p>                                                          |
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             Possible message type values (case insensitive):          |  
        |                           |                     |                   |                   |         </p>                                                          |
        |                           |                     |                   |                   |         <ul>                                                          |
        |                           |                     |                   |                   |             <li><code>i</code> — Viber;</li>                          |                                                                              
        |                           |                     |                   |                   |             <li><code>s</code> — SMS;</li>                            |                                                                             
        |                           |                     |                   |                   |             <li><code>p</code> — Push;</li>                           |
        |                           |                     |                   |                   |             <li><code>v</code> — VK;</li>                             |                                                                           
        |                           |                     |                   |                   |         </ul>                                                         |
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             For example, “V,S” means that URLs should be shortened in |   
        |                           |                     |                   |                   |             VK and SMS messages, but not in Viber messages.           |
        |                           |                     |                   |                   |         </p>                                                          |
        |                           |                     |                   |                   |         <p>                                                           |
        |                           |                     |                   |                   |             If URL shortening is enabled for the Partner, the         |     
        |                           |                     |                   |                   |             following scenarios are possible:                         |      
        |                           |                     |                   |                   |         <ul>                                                          |
        |                           |                     |                   |                   |             <li>the parameter is not passed in the request — links are|  
        |                           |                     |                   |                   |                 shortened for all message types by default;</li>      |                                                                           
        |                           |                     |                   |                   |             <li>the parameter is passed and its value is empty —      |                  
        |                           |                     |                   |                   |                 link shortening is disabled for all message           |    
        |                           |                     |                   |                   |                 types;</li>                                           |      
        |                           |                     |                   |                   |             <li>the parameter is passed in the request and the value  | 
        |                           |                     |                   |                   |                 is not empty — links are shortened only for the       |
        |                           |                     |                   |                   |                 message types specified in the parameter value.</li>  |                                                                 
        |                           |                     |                   |                   |         </ul>                                                         |
        |                           |                     |                   |                   |         </p>                                                          |
        |                           |                     |                   |                   |     </details>                                                        |
        +---------------------------+---------------------+-------------------+-------------------+-----------------------------------------------------------------------+

