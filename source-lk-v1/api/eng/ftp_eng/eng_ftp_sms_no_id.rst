SMS mass messaging without identifiers
========================================

When creating an SMS mass messaging without identifiers it is necessary to take into account the :doc:`eng_ftp_file_require` as well as the following requirements: 

* text file in Windows-1251 or UTF-8 encoding;
* the maximum length of a transmitted MT message - 2000 characters;
* service characters (line break, semicolon) can be used in the message text. To do this, the text of the message must be enclosed in quotation marks and significant quotation marks in the text must be doubled.


.. tabs::

    .. tab:: File example

        .. code-block:: 
           :linenos:

            name: sendout20240915
            service_number: YOUR_SERVICE_NUMBER
            auto_start: Y
            
            79031234567;first message
            79031234568;another message
            ...

    .. tab:: File format

        .. code-block:: 
           :linenos:

            name: 
            service_number: 
            auto_start: 

            number 1;message text 1
            number 2;message text 2
            ...
            number n;text n

        .. note::
   
            | In the file an empty line should separate parameters and the list of numbers with message texts.
            | If the file contains the same phone numbers, only the first one in the list will be processed. The remaining numbers will be rejected by the system. 


    .. tab:: Parameters description

        .. note:: The mandatory parameters are highlighted **in bold**.

        +-------------------------+----------------------------------------------------------------------------------------------------------+
        | Parameter               | Description                                                                                              |
        +=========================+==========================================================================================================+
        | **name**                | The name of the mass messaging must be unique.                                                           |
        +-------------------------+----------------------------------------------------------------------------------------------------------+
        | **service_number**      | Sender's name.                                                                                           |
        +-------------------------+----------------------------------------------------------------------------------------------------------+
        | date_start              | | The start date of the mass messaging in YYYY-MM-DD format.                                             |
        |                         | | Optional parameter. If the start date is not specified, the messaging will start on the current date.  |    
        +-------------------------+----------------------------------------------------------------------------------------------------------+
        | auto_start              | Automatic start of the mass messaging.                                                                   |
        |                         | Possble values are:                                                                                      |
        |                         |                                                                                                          |          
        |                         | * Y - yes;                                                                                               |
        |                         | * N - no.                                                                                                |
        |                         |                                                                                                          |
        |                         | The use of this function is agreed separately.                                                           |
        +-------------------------+----------------------------------------------------------------------------------------------------------+
        | time_begin              | The lower bound of the time interval in which the delivery will be carried out in the hh:mm format.      |
        +-------------------------+----------------------------------------------------------------------------------------------------------+
        | time_end                | The upper bound of the time interval in which the delivery will be carried out in hh:mm format.          |
        +-------------------------+----------------------------------------------------------------------------------------------------------+
        | use_timediff            | Delivery according to the subscriber's time zone.                                                        |
        |                         | Possible values are:                                                                                     |
        |                         |                                                                                                          |          
        |                         | * Y - yes;                                                                                               |
        |                         | * N - no.                                                                                                |
        +-------------------------+----------------------------------------------------------------------------------------------------------+ 

   
    
    
