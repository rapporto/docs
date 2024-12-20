Взаимодействие с платформой
===============================

Описание
-----------

| Файловый протокол обмена данными разработан с учетом синхронизации доступа к файлам между передающей и принимающей сторонами. В результате обработки исходный файл перемещается в специальный каталог, и рядом создается файл отчета.

| Загрузка файлов производится любым удобным методом, обеспечивающим достаточную безопасность, например по FTPS или FTP через ipsec-туннель. Дополнительно имеется возможность включить генерацию файлов с отчетами о доставке сообщений из рассылки абонентам.

.. note:: 

   На Платформе формат расчета длины многосегментных сообщений (сообщений, состоящих из нескольких частей) по направлению “РФ - Билайн” приведен в соответствии с алгоритмом, который использует оператор ПАО «ВымпелКом», а именно: 67 символов на одну часть составного сообщения в Unicode (кириллица) и 152 символа в кодировке GSM DEFAULT (латиница).


Порядок работы
--------------------

| Для каждого Партнера на файловой системе сервера Платформы Сервис-провайдер настраивает два каталога: 

* для загружаемых файлов;
* для архива обработанных файлов и файлов-отчетов. 
 
| Партнер записывает во входной каталог файл необходимого формата (см. :doc:`ftp_file_require`).

| Платформа периодически сканирует входной каталог на предмет появления файлов с расширением “.data” и обрабатывает их. Обработанный файл перемещается в каталог архива, там же создается файл отчета “<имя обработанного файла>.report”.

| Если включена генерация файла-отчета о доставке, то через сутки после рассылки в каталоге архива создается файл “<имя обработанного файла>.delivery”, содержащий информацию о статусах доставки сообщений абонентам.