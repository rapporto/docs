Каскадные сообщения
=============================

:term:`Каскадная рассылка` сообщений по умолчанию недоступна. Для подключения Партнёру необходимо обратиться к курирующему менеджеру.

Типы сообщений, допустимые в каскадной рассылке:

* FlashingCall;
* Push;
* SMS;
* Viber;
* VK;
* WhatsApp.

Последовательность типов сообщений при отправке может быть произвольной.

Порядок и опции доотправки могут быть настроены на стороне Сервис-провайдера по заявке от Партнёра. В таком случае доотправка сообщений происходит с параметрами, заданными по умолчанию, и в теле запроса *не требуется передавать* никаких дополнительных параметров.

Также есть возможность передавать опции каскада, используя дополнительные параметры HTTP-запроса.


.. _HTTP-Параметры-запроса-каскада:

Параметры запроса 
----------------------------

Возможные параметры HTTP-запроса для отправки сообщений в каскаде.

+--------------------+--------------+----------------------------------------------------------------------------------------------------+
| Наименование       | Тип          | Описание параметра                                                                                 |
| параметра          |              |                                                                                                    |
+====================+==============+====================================================================================================+
| order_list         | string       | | Список, определяющий последовательность отправки.                                                |
|                    |              | | Типы сообщений следует перечислять в том порядке, в котором они должны быть отправлены.          |
|                    |              | | Возможные значения типов сообщений (регистр значения не имеет):                                  |
|                    |              |                                                                                                    |
|                    |              | * i – Viber;                                                                                       |
|                    |              | * s – SMS;                                                                                         |
|                    |              | * f – FlashingCall;                                                                                |
|                    |              | * v – VK;                                                                                          |
|                    |              | * p – Push;                                                                                        |
|                    |              | * w – WhatsApp.                                                                                    |
|                    |              |                                                                                                    |
|                    |              | .. note:: Например, *order_list=v,i,s* означает последовательную доотправку сообщений следующих    |
|                    |              |      типов: VK → Viber → SMS.                                                                      |
+--------------------+--------------+----------------------------------------------------------------------------------------------------+
| <тип>_resendCond   | string       | Параметр задает условие срабатывания доотправки для конкретного типа сообщений.                    |
|                    |              | Здесь <тип> – символ, задающий тип сообщения (i, s, v, f, p, w), для которого                      |
|                    |              | выполняется настройка.                                                                             |
|                    |              |                                                                                                    |
|                    |              | Возможные значения параметра (регистр значения не имеет):                                          |
|                    |              |                                                                                                    |
|                    |              | * N – не производить доотправку;                                                                   |
|                    |              | * Y – производить доотправку при получении статуса “Не доставлено”;                                |
|                    |              | * S – то же, что *“Y“*, плюс доотправка произойдет, если не получен статус “Просмотрено”           |
|                    |              |   в течение срока жизни сообщения.                                                                 |
|                    |              |                                                                                                    |
|                    |              | .. warning:: Значение *“S“* не применимо для SMS- и FlashingCall-сообщений, т.к. у них не          |
|                    |              |         предусмотрено статуса “Просмотрено“.                                                       |
|                    |              |                                                                                                    |
|                    |              | С помощью комбинации параметров можно задать различные настройки для разных типов сообщений.       |
|                    |              |                                                                                                    |
|                    |              | .. note:: Например, *v_resendCond=S&i_resendCond=Y&s_resendCond=N* означает, что:                  |
|                    |              |                                                                                                    |
|                    |              |       * для VK-сообщений учитывается статус *“Просмотрено“*;                                       |
|                    |              |       * для Viber-сообщений учитывается статус *“Не доставлено“*;                                  |
|                    |              |       * для SMS-сообщений доотправка не производится.                                              |
+--------------------+--------------+----------------------------------------------------------------------------------------------------+
| <тип>_resendSn     | string       | Параметр задает значение сервисного имени, от которого будут отправляться сообщения                |
|                    |              | определенного типа в режиме доотправки.                                                            |
|                    |              |                                                                                                    |
|                    |              | Здесь <тип> – символ, задающий тип сообщения (i, s, v, f, p или w), для которого выполняется       |
|                    |              | настройка.                                                                                         |
|                    |              |                                                                                                    |
|                    |              | .. note:: Например, *v_resendSn=0002&i_resendSn=0001&s_resendSn=0000* означает, что:               |
|                    |              |                                                                                                    |
|                    |              |      * VK-сообщения отправляются с имени *0002*;                                                   |
|                    |              |      * Viber-сообщения отправляются с имени *0001*;                                                |
|                    |              |      * SMS-сообщения отправляются с имени *0000*.                                                  |
|                    |              |                                                                                                    |
|                    |              |      Используемые сервисные имена должны быть доступны для Партнёра.                               |
|                    |              |      Для подключения сервисных имён обратитесь к своему курирующему менеджеру.                     |
+--------------------+--------------+----------------------------------------------------------------------------------------------------+
| <тип>_resendText   | string       | Параметр задает альтернативный текст сообщения для разных типов сообщений, который будет           |
|                    |              | отправляться в режиме доотправки.                                                                  |
|                    |              |                                                                                                    |
|                    |              | Здесь <тип> – символ, задающий тип сообщения (i, s, v, f, p или w), для которого выполняется       |
|                    |              | настройка.                                                                                         |
|                    |              |                                                                                                    |
|                    |              | .. note:: Например, *v_resendText=testVK&i_resendText=testViber&s_resendText=testSMS* означает,    |
|                    |              |      что:                                                                                          |
|                    |              |                                                                                                    |
|                    |              |      * VK-сообщения отправляются с текстом *“testVK“*;                                             |
|                    |              |      * Viber-сообщения отправляются с текстом *“testViber“*;                                       |
|                    |              |      *  SMS-сообщения отправляются с текстом *“testSMS“*.                                          |
|                    |              |                                                                                                    |
|                    |              | На текст сообщения действуют те же ограничения, что для соответствующих типов отдельных            |
|                    |              | сообщений (см. в соответствующих разделах “Параметры запроса“).                                    |
+--------------------+--------------+----------------------------------------------------------------------------------------------------+
| <тип>_resendValid  | string       | Параметр задает время жизни для разных типов сообщений, отправленных в режиме доотправки.          |
|                    |              | Здесь <тип> – символ, задающий тип сообщения (i, s, v, f, p или w), для которого выполняется       |
|                    |              | настройка.                                                                                         |
|                    |              |                                                                                                    |
|                    |              | Время жизни означает интервал, в течении которого оператор будет пытаться доставить сообщение до   |
|                    |              | абонента. Если время жизни сообщения истекло, и сообщение не доставлено, то оно уже не будет       |
|                    |              | доставлено абоненту.                                                                               |
|                    |              |                                                                                                    |
|                    |              | Формат значения для параметра: "YYMMDDhhmmsstnnp", где:                                            |
|                    |              |                                                                                                    |
|                    |              | * YYMMDDhhmmss – год, месяц, день, часы, минуты, секунды;                                          |
|                    |              | * t – десятые доли секунд;                                                                         |
|                    |              | * nn – четверти часа (по 15 минут), например, для 8 часов значение будет "32";                     |
|                    |              | * p – сдвиг. Возможные значения:                                                                   |
|                    |              |                                                                                                    |
|                    |              |     - “+” и “-” задают сдвиг времени от GMT в ту или иную сторону, то есть “08+” соответствует     |
|                    |              |       GMT+2, а “04-” соответствует GMT-1;                                                          |
|                    |              |     - “R” – значения *t* и *nn* игнорируется, всё остальное прибавляется к текущему локальному     |
|                    |              |       времени.                                                                                     |
|                    |              |                                                                                                    |
|                    |              | Допустимые диапазоны времени жизни для разных типов сообщений:                                     |
|                    |              |                                                                                                    |
|                    |              | * SMS – от 1 до 2880 минут (до 2 суток);                                                           |
|                    |              | * FlashingCall – от 1 до 5 минут;                                                                  |
|                    |              | * VK – от 60 до 86400 секунд (до 1 суток);                                                         |
|                    |              | * Viber – от 30 до 86400 секунд (до 1 суток);                                                      |
|                    |              | * Push – от 30 до 86400 секунд (до 1 суток);                                                       |
|                    |              | * WhatsApp – от 1 до 10080 минут (на стороне оператора значение округляется до суток).             |
+--------------------+--------------+----------------------------------------------------------------------------------------------------+
| shorten_list       | string       | Параметр служит для управления сокращением ссылок в различных типах сообщений каскада.             |
|                    |              |                                                                                                    |
|                    |              | .. important:: Данный параметр будет обработан, только если передан параметр *order_list*.         |
|                    |              |                                                                                                    |
|                    |              | Значение параметра может содержать:                                                                |
|                    |              |                                                                                                    |
|                    |              | * перечень типов сообщений (через запятую), для которых требуется сокращать ссылки;                |
|                    |              | * пустое значение (shorten_list=), если сокращать ссылки для всех типов сообщений не требуется.    |
|                    |              |                                                                                                    |
|                    |              | Возможные значения типов сообщений (регистр значения не имеет):                                    |
|                    |              |                                                                                                    |
|                    |              | * i – Viber;                                                                                       |
|                    |              | * s – SMS;                                                                                         |
|                    |              | * v – VK;                                                                                          |
|                    |              | * p – Push;                                                                                        |
|                    |              | * w – WhatsApp.                                                                                    |
|                    |              |                                                                                                    |
|                    |              | Например, *shorten_list=S,I* означает, что ссылки будут сокращены только в SMS- и Viber-сообщениях |
|                    |              | каскада.                                                                                           |
|                    |              |                                                                                                    |
|                    |              | .. note:: По умолчанию :doc:`http_short_link` недоступен. Для его подключения следует              |
|                    |              |     обратиться к своему курирующему менеджеру.                                                     |
+--------------------+--------------+----------------------------------------------------------------------------------------------------+


.. note:: Пример порядка обработки настроенной каскадной отправки VK → Viber → SMS:

    1. Сообщение будет отправлено в VK.
    2. Если сообщение успешно доставлено, то каскадная отправка заканчивается (переход к п. 6).
    3. Если сообщение не было доставлено из-за ошибки или в течение заданного времени жизни, то производится отправка через Viber.
    4. Если сообщение успешно доставлено, то каскадная отправка заканчивается (переход к п. 6).
    5. Если сообщение не было доставлено из-за ошибки или в течение заданного времени жизни, то производится отправка SMS.
    6. Партнёру сообщается финальный статус отправки сообщения (опционально – все промежуточные статусы).

