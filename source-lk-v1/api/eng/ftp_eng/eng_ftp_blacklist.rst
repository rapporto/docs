Blacklist
================

When creating a file to add to the blacklist, it is necessary to take into account the :doc:`eng_ftp_file_require` as well as the following requirements: 

* text file in Windows-1251 encoding;
* the header of the file with parameters and the list of numbers with message texts are separated by an empty line.

.. tabs::

    .. tab:: File example

        .. code-block:: 
           :linenos:
            
            list_type: I
            
            79036533935;Y;unsubscribed from mass messaging 04.01.2024 
            79037537935;Y;unsubscribed from mass messaging 04.02.2024 
            ...


    .. tab:: File format

        .. code-block:: 
           :linenos:

            list_type: <list type: I - individual>

            Phone number 1; Remove number from existing mass messaging list Y/N; Note 1
            ...
            Phone number N; Remove number from existing mass messaging list Y/N; Note N






