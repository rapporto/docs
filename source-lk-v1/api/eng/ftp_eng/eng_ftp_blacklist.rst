Blacklist
================

Blacklist is a feature of the platform that allows excluding the numbers of subscribers who have opted out of receiving notifications from the messaging list. 
Numbers on the blacklist will not be added to the messaging list during the upload. 

Numbers can be added to the blacklist by uploading from a file.
When creating a file to add to the blacklist, it is necessary to take into account the :doc:`eng_ftp_file_require` as well as the following requirements: 

- text file is in Windows-1251 encoding;
- the header of the file with parameters and the list of numbers with message texts are separated by an empty line.

.. tabs::

    .. tab:: File format

        .. code-block:: 
           :linenos:

            list_type: <list type: I - individual>

            Phone number 1; Remove number from existing messaging list Y/N; Note 1
            ...
            Phone number N; Remove number from existing messaging list Y/N; Note N

    .. tab:: File example

        .. code-block:: 
           :linenos:
            
            list_type: I
            
            79036533935;Y;unsubscribed from messaging 04.01.2024 
            79037537935;Y;unsubscribed from messaging 04.02.2024 
            ...






