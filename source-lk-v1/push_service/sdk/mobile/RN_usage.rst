Использование библиотеки ZGRImSDK в мобильном приложении, основанном на фреймворке React Native
=================================================================================================

.. raw:: html
   
   <p style="line-height: 24px;">Рекомендуется тщательно ознакомиться с документацией по 
       <a href="https://reactnative.dev" target="_blank" class="button">
           <img src="../../../_static/link-external-01.svg" class="bttn-icon" alt="Внешняя ссылка"> React Native.
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

Взаимодействие Swift и React Native
----------------------------------------

Для того, чтобы Swift заработал в React Native-проекте, нужно создать bridge-файл. XCode предложит сделать это автоматически при создании первого swift-файла.
Примерное содержание файла *react_app-Bridging-Header.h*:

.. image:: media/rn_1_.png

Взаимодействие между кодом React Native и iOS-частью (obj-C/swift) можно обеспечить с помощью вспомогательного файла Connect.

Допустим, необходимо вызвать из js-кода функцию ``sdkLogin()``, определенную в файле *AppDelegate.swift*:

.. image:: media/rn_2_.png

В основной папке iOS-части проекта необходимо создать файлы *Connect.m* и *ConnectFile.swift*, в которых нужно объявить внешние (extern) по отношению к js-коду методы.  

.. image:: media/rn_3_.png

При разработке каждый экспортируемый в JavaScript элемент должен быть помечен атрибутом ``@objc``, чтобы его можно было использовать в Objective-C runtime.

.. image:: media/rn_4_.png

.. image:: media/rn_5_.png

Также необходимо импортировать *NativeModules* и объявить ``const { Connect } = NativeModules;``.

После этого функция ``sdkLogin()`` доступна в js-коде через вызов ``Connect.sdkLogin()``:

.. image:: media/rn_6_.png

Библиотека ZGRImSDK в приложении
------------------------------------

Допустим, необходимо в приложении, написанном на React Native, отобразить историю push-уведомлений, полученную с помощью вызова метода ``fetchAllNotifications()`` нашего SDK. Одним из решений может быть использование класса ``RCTRootView``, необходимый массив данных для отображения которому будет передан в качестве параметра ``initialProperties``, как в данном примере:

.. image:: media/rn_7_.png

Код для функции ``getPushes()`` мог бы выглядеть примерно так:

.. image:: media/rn_8_.png
