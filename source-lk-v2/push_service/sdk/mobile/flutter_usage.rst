Использование библиотеки ZGRImSDK в мобильном приложении, основанном на фреймворке Flutter
=============================================================================================

.. raw:: html
   
   <p style="line-height: 24px;">Рекомендуется тщательно ознакомиться с документацией по 
       <a href="https://flutter.dev" target="_blank" class="button">
           <img src="../../../_static/link-external-01.svg" class="bttn-icon" alt="Внешняя ссылка"> Flutter.
       </a>
   </p>
   <style>
       .bttn-icon {
           width: 18px;
           height: 18px;
           vertical-align: middle;  /* Центрирует иконку по вертикали */
           border: 0;
           margin-right: 4px;
       }       
       .button {
           border: 0;
           height: 36px;
           text-decoration: none; /* Убирает подчеркивание */
           color: #726CFF; /* Цвет текста */
           background-color: transparent; /* Цвет фона кнопки */
           padding: 4px 4px; /* Отступы */
           border-radius: 4px; /* Закругленные углы */
           display: inline-flex; /* Позволяет выровнять текст и иконку по центру */
           align-items: center; /* Центрирует содержимое кнопки */
           line-height: 1; /* Убирает лишние отступы */
       }
       .button:hover {
           background-color: #f8f7ff; /* Цвет фона при наведении */
           text-decoration: none; /* Убирает подчеркивание */
       }
   </style>


Интеграция SDK в приложение
-----------------------------

Для интеграции ZGRImSDK в приложение, основанное на фреймворке Flutter, достаточно просто импортировать SDK в необходимый файл (например, в файл AppDelegate). 
    
.. image:: media/fl_1.png
    
При этом функция ``setupWindow()`` могла бы выглядеть примерно так:

.. image:: media/fl_2.png
