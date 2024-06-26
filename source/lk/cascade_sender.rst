Отправка каскадной рассылки
================================ 
 
.. important:: Каскадная рассылка — последовательная отправка сообщений разных типов одному и тому же абоненту. Отправка следующего типа сообщения производится при недоставке сообщения предыдущего типа.

Для запуска каскадной рассылки необходимо выполнить следующие действия:
 
1. В личном кабинете перейти в раздел **“Рассылки”**, нажав на соответствующую иконку в левом меню страницы.
 
2. На открывшейся странице в правом верхнем углу нажать на кнопку **<Создать рассылку>**.
 
3. В блоке **“Параметры рассылки”**, при необходимости, указать значения параметров: отложенная отправка, дата окончания рассылки, расписание (включено по умолчанию), скорость рассылки. Подробнее о данных параметрах в статьях: 

   * :doc:`delayed_sender`; 

   * :doc:`date_of_end`;

   * :doc:`schedule`.
 
4. В блоке **“Получатели”** добавить список контактов — загрузить файл с номерами телефонов или указать их вручную. Подробнее о формировании файла в статье :doc:`file_sender`. Статус обработки списка контактов, а также информация о валидных и невалидных номерах будут отображены под формой предпросмотра текста сообщения.
 
5. Добавить каналы рассылки: SMS, Viber или наоборот.

6. В каждом из каналов выбрать имя отправителя и ввести текст сообщения. В параметрах Viber-рассылки можно дополнительно загрузить изображение, добавить название кнопки и ссылку, которая откроется при нажатии на кнопку. В форме предпросмотра, расположенной справа, будут отображены примеры сообщений. Для переключения между примерами необходимо нажать на соответствующие иконки в данной форме.

7. В блоке **“Настройка каскада”** задать условия, при которых будет запущена каскадная рассылка: указать время ожидания и ожидаемый статус. При необходимости можно изменить очередность каналов рассылки, потянув за левый край строки нужного канала.
 
8. Нажать на кнопку запуска рассылки в правом верхнем углу.

.. note:: На примере ниже представлен сценарий: если спустя 10 минут после отправки Viber-сообщения не вернулся статус “Доставлено”, — будет отправлено SMS-сообщение.

.. image:: media/viber-sms.gif
 
 
