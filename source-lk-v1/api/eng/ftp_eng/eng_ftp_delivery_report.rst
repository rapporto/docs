Delivery Report
=======================

The SMS delivery report is generated as a text file in Windows-1251 encoding.

Report Examples
----------------

Example of the mass messaging report with no IDs:

.. code-block::

    phone_number_1;delivery_status_1
    phone_number_2;delivery_status_2
    ...
    phone_number_N;delivery_status_N

Example of the mass messaging report with IDs:

.. code-block::

    id_1;phone_number_1;delivery_status_1
    id_2;phone_number_2;delivery_status_2
    ...
    id_N;phone_number_N;delivery_status_N


Parameters Description
-------------------------

+-------------------------+------------------------------------------------------------------------------------------+
| Parameter               | Description                                                                              |
+=========================+==========================================================================================+
| Phone number            | The number that was successfully downloaded from the source file.                        |
+-------------------------+------------------------------------------------------------------------------------------+
| Delivery_status         | It takes one of the values:                                                              |
|                         |                                                                                          |
|                         | - 0 - sending error;                                                                     |
|                         | - 1 - undelivered;                                                                       |
|                         | - 2 - dispatched, delivery status unknown;                                               |
|                         | - 3 - delivered.                                                                         |
+-------------------------+------------------------------------------------------------------------------------------+


.. important:: For SMS messages sent to subscribers of the Megafon operator, from the 1-st of March 2023 the transmission of the "DELIVERED" and "UNDELIVERED" statuses is stopped.
