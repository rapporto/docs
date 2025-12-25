SMS Sending with no IDs
=============================

When creating an SMS mass messaging without identifiers it is necessary to take into account the :doc:`eng_ftp_file_require` as well as the following requirements: 

- text file is in Windows-1251 or UTF-8 encoding;
- the maximum length of a transmitted message is 2000 characters;
- service characters (line break, semicolon) can be used in the message text. To do this, the text of the message must be enclosed in quotation marks,
  and significant quotation marks in the text must be doubled.


.. tabs::

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

        .. raw:: html
        
           <div class="admonition note">
               <p class="admonition-title">Note</p>
               <p>In the file, an empty line should separate parameters and the list of numbers with message texts.</p>
               <p> If the file contains the same phone numbers, only the first one in the list will be processed. The remaining numbers will be rejected by the system.</p>

           </div>                                                                           


    .. tab:: File example

        .. code-block:: 
           :linenos:

            name: sendout20240915
            service_number: YOUR_SERVICE_NUMBER
            auto_start: Y
            
            79031234567;first message
            79031234568;another message
            ...

    .. tab:: Parameters description

        +-------------------------+----------+----------------------------------------------------------------------------------------------------------+
        | Parameter               | Required | Description                                                                                              |
        +=========================+==========+==========================================================================================================+
        | name                    | yes      | Name of the messaging (must be unique).                                                                  |
        +-------------------------+----------+----------------------------------------------------------------------------------------------------------+
        | service_number          | yes      | Sender's name.                                                                                           |
        +-------------------------+----------+----------------------------------------------------------------------------------------------------------+
        | date_start              | no       | Start date of the messaging.                                                                             |
        |                         |          |                                                                                                          |
        |                         |          | .. raw:: html                                                                                            |
        |                         |          |                                                                                                          |
        |                         |          |     <details>                                                                                            |
        |                         |          |         <summary>More details</summary>                                                                  |                                       
        |                         |          |         <p>                                                                                              |
        |                         |          |          Format: <code>YYYY-MM-DD</code>.                                                                |        
        |                         |          |         </p>                                                                                             |
        |                         |          |         <p>                                                                                              |
        |                         |          |          Optional parameter.                                                                             |        
        |                         |          |         </p>                                                                                             |
        |                         |          |         <p>                                                                                              |
        |                         |          |          If the start date is not specified, the messaging will start on the current date.               |        
        |                         |          |         </p>                                                                                             |
        |                         |          |     </details>                                                                                           |
        +-------------------------+----------+----------------------------------------------------------------------------------------------------------+
        | auto_start              | no       | Automatic start of the messaging.                                                                        |
        |                         |          |                                                                                                          |
        |                         |          | .. raw:: html                                                                                            |
        |                         |          |                                                                                                          |
        |                         |          |     <details>                                                                                            |
        |                         |          |         <summary>More details</summary>                                                                  |
        |                         |          |         <p>                                                                                              |
        |                         |          |             Possble values are:                                                                          |
        |                         |          |         </p>                                                                                             |
        |                         |          |         <ul>                                                                                             |
        |                         |          |             <li><code>Y</code> — yes;</li>                                                               |           
        |                         |          |             <li><code>N</code> — no.</li>                                                                |
        |                         |          |         </ul>                                                                                            |
        |                         |          |         <p>                                                                                              |
        |                         |          |             The use of this function requires a separate agreement.                                      |
        |                         |          |         </p>                                                                                             |
        |                         |          |     </details>                                                                                           |
        +-------------------------+----------+----------------------------------------------------------------------------------------------------------+
        | time_begin              | no       | Lower bound of the time interval in which the delivery will be carried out.                              |
        |                         |          |                                                                                                          |
        |                         |          | .. raw:: html                                                                                            |
        |                         |          |                                                                                                          |
        |                         |          |     <details>                                                                                            |
        |                         |          |         <summary>More details</summary>                                                                  |                                       
        |                         |          |         <p>                                                                                              |
        |                         |          |          Format: <code>hh:mm</code>.                                                                     |        
        |                         |          |         </p>                                                                                             |
        |                         |          |     </details>                                                                                           |
        +-------------------------+----------+----------------------------------------------------------------------------------------------------------+
        | time_end                | no       | Upper bound of the time interval in which the delivery will be carried out.                              |
        |                         |          |                                                                                                          |
        |                         |          | .. raw:: html                                                                                            |
        |                         |          |                                                                                                          |
        |                         |          |     <details>                                                                                            |
        |                         |          |         <summary>More details</summary>                                                                  |                                       
        |                         |          |         <p>                                                                                              |
        |                         |          |          Format: <code>hh:mm</code>.                                                                     |        
        |                         |          |         </p>                                                                                             |
        |                         |          |     </details>                                                                                           |
        +-------------------------+----------+----------------------------------------------------------------------------------------------------------+
        | use_timediff            | no       | Delivery according to the subscriber's time zone.                                                        |
        |                         |          |                                                                                                          |
        |                         |          | .. raw:: html                                                                                            |
        |                         |          |                                                                                                          |
        |                         |          |     <details>                                                                                            |
        |                         |          |         <summary>More details</summary>                                                                  |
        |                         |          |         <p>                                                                                              |
        |                         |          |             Possble values are:                                                                          |
        |                         |          |         </p>                                                                                             |
        |                         |          |         <ul>                                                                                             |
        |                         |          |             <li><code>Y</code> — yes;</li>                                                               |           
        |                         |          |             <li><code>N</code> — no.</li>                                                                |
        |                         |          |         </ul>                                                                                            |
        |                         |          |     </details>                                                                                           |
        +-------------------------+----------+----------------------------------------------------------------------------------------------------------+ 

   
    
    
