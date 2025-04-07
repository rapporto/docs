Report on Completed Actions
===================================

After performing actions, for example, creating a messaging list, adding to the blacklist, a text file is created in the following format:

- Windows-1251 encoding;
- the header of the file and the errors description are separated by an empty line.

.. code-block:: 
    :linenos:

    The name of the action
    Action date/time (YYYY-MM-DD HH:MI:SS format)
    Action result (Success/Fail)

    Description of the error (phone number in the line with the error, if the result of the action is *Success*).

If the result of the action is *Fail*, then the loading failed, the description of the error indicates the reason.

| By the *Success* result some lines of the source file may not be loaded. 
| Possible reasons:

- the number is in the blacklist;
- duplicate number is in the file;
- invalid number.

.. note:: If the file contains the same phone numbers, only the first one in the list will be processed. The remaining numbers will be rejected by the system. 