Отчет о доставке
=======================

Отчет о доставке SMS-рассылок формируется в виде текстового файла в кодировке Windows-1251.

Примеры отчетов
----------------

Пример отчета рассылки без идентификаторов:

.. code-block::

    номер_телефона_1;статус_доставки_1
    номер_телефона_2;статус_доставки_2
    ...
    номер_телефона_N;статус_доставки_N

Пример отчета рассылки с идентификаторами:

.. code-block::

    идентификатор_1;номер_телефона_1;статус_доставки_1
    идентификатор_2;номер_телефона_2;статус_доставки_2
    ...
    идентификатор_N;номер_телефона_N;статус_доставки_N


Описание параметров
--------------------

+-------------------------+------------------------------------------------------------------------------------------+
| Параметр                | Описание                                                                                 |
+=========================+==========================================================================================+
| Номер телефона          | Номер, который был успешно загружен из исходного файла.                                  |
+-------------------------+------------------------------------------------------------------------------------------+
| Статус_доставки         | Принимает одно из значений:                                                              |
|                         |                                                                                          |
|                         | * 0 - ошибка отправки;                                                                   |
|                         | * 1 - не доставлено;                                                                     |
|                         | * 2 - отправлено, статус доставки неизвестен;                                            |
|                         | * 3 - доставлено.                                                                        |
+-------------------------+------------------------------------------------------------------------------------------+


.. important:: Для SMS-сообщений, отправленных абонентам оператора Мегафон, с 01.03.2023 прекращена передача статусов "Доставлено" и "Не доставлено".
