
SMS Sending with IDs
===========================

When creating an SMS mass messaging with identifiers it is necessary to take into account the :doc:`eng_ftp_file_require` as well as the following requirements: 

- text file is in Windows-1251 or UTF-8 encoding;
- the maximum length of a transmitted MT message is 2000 characters;
- service characters (line break, semicolon) can be used in the message text. To do this, the text of the message must be enclosed in quotation marks, 
  and significant quotation marks in the text must be doubled.


.. tabs::

    .. tab:: File format

        .. code-block:: 
           :linenos:

            name: 
            service_number: 
            date_start: 
            auto_start: 
            time_begin: 
            time_end: 
            use_timediff: 
                        
            identifier 1;number 1;message text 1
            identifier 2;number 2;message text 2
            ...
            identifier n;number n;text n

        .. note::
   
            In the file, an empty line should separate parameters and the list of numbers with message texts.
       
    .. tab:: File example

        .. code-block:: 
           :linenos:

            name: sendout20240916
            service_number: YOUR_SERVICE_NUMBER
            auto_start: Y
            
            272344713;79036533935;first message
            435235262;79037537935;another message
            ...

    .. tab:: Parameters description

        The **mandatory** parameters are highlighted **in bold**.

        +-------------------------+----------------------------------------------------------------------------------------------------------+
        | Parameter               | Description                                                                                              |
        +=========================+==========================================================================================================+
        | **name**                | The name of the messaging must be unique.                                                                |
        +-------------------------+----------------------------------------------------------------------------------------------------------+
        | **service_number**      | Sender's name.                                                                                           |
        +-------------------------+----------------------------------------------------------------------------------------------------------+
        | date_start              | | The start date of the messaging in YYYY-MM-DD format.                                                  |
        |                         | | Optional parameter.                                                                                    |
        |                         | | If the start date is not specified, the messaging will start on the current date.                      |  
        +-------------------------+----------------------------------------------------------------------------------------------------------+
        | auto_start              | Automatic start of the mass messaging.                                                                   |
        |                         | Possble values are:                                                                                      |
        |                         |                                                                                                          |          
        |                         | - Y - yes;                                                                                               |
        |                         | - N - no.                                                                                                |
        |                         |                                                                                                          |
        |                         | Using of this function is agreed separately.                                                             |
        +-------------------------+----------------------------------------------------------------------------------------------------------+
        | time_begin              | The lower bound of the time interval in which the delivery will be carried out in the hh:mm format.      |
        +-------------------------+----------------------------------------------------------------------------------------------------------+
        | time_end                | The upper bound of the time interval in which the delivery will be carried out in hh:mm format.          |
        +-------------------------+----------------------------------------------------------------------------------------------------------+
        | use_timediff            | Delivery according to the subscriber's time zone.                                                        |
        |                         | Possible values are:                                                                                     |
        |                         |                                                                                                          |          
        |                         | - Y - yes;                                                                                               |
        |                         | - N - no.                                                                                                |
        +-------------------------+----------------------------------------------------------------------------------------------------------+ 

   

