Сервис RPNS
====================================

Rapporto Push Notification System (далее RPNS) — это сервис, который позволяет управлять:

*  отправкой PUSH-сообщениями на мобильные приложения;

*  получением статусов отправки этих сообщений.

Технические возможности PUSH-сообщений позволяют разрабатывать более продуктивную и гибкую к поведению пользователя маркетинговую стратегию.

Сервис имеет следующие возможности:

*  отправка PUSH-сообщения как по номеру телефона, так и идентификатору пользователя в системе Партнёра;

*  отправка PUSH-сообщения с заголовками и текстом (см. рис. 1);

*  отправка PUSH-сообщения с изображениями (см. рис. 2);

*  отправка PUSH-сообщения с кнопками (см. рис. 3);

*  отправка PUSH-сообщения с webview – при открытии PUSH-сообщения пользователем выполняется переход на веб-ресурс или внутреннюю страницу приложения (см. рис. 4);

*  настройка подписок на уровне приложения (сегментирование клиентской базы, типизация трафика);

*  отображение истории PUSH–сообщений;

*  детализирование статусов PUSH–сообщений;

*  определять опциональный признак основного устройства, который позволяет осуществить как веерную доставку на несколько устройств, так и на одно основное;

*  осуществлять массовые рассылки сообщений по времени с отправкой в будущем;

*  отправка PUSH–сообщений с привязкой к часовому поясу получателя.



.. image:: media/push_text_1.png
   :alt: Pushg
   :align: center
   :width: 200

.. raw:: html

   <div style="text-align: center;">
       Рисунок 1. PUSH с заголовками и текстом.
   </div>


.. raw:: html

     <div class="container">
       <div class="row">
         <div class="col-sm">
            <br>
         </div>
       </div>
     </div>


.. image:: media/push_image_2.png
   :alt: Pushg
   :align: center
   :width: 200


.. raw:: html

   <div style="text-align: center;">
     Рисунок 2. PUSH с изображенем.
   </div>


.. raw:: html

     <div class="container">
       <div class="row">
         <div class="col-sm">
            <br>
         </div>
       </div>
     </div>


.. image:: media/push_buttons_3.png
   :alt: Pushg
   :align: center
   :width: 200

.. raw:: html

   <div style="text-align: center;">
    Рисунок 3. PUSH с кнопками.
   </div>


.. raw:: html

     <div class="container">
       <div class="row">
         <div class="col-sm">
            <br>
         </div>
       </div>
     </div>

.. image:: media/push_webview_4.png
   :alt: Pushg
   :align: center
   :width: 200


.. raw:: html

   <div style="text-align: center;">
    Рисунок 4. PUSH с webview.
   </div>


.. raw:: html

     <div class="container">
       <div class="row">
         <div class="col-sm">
            <br>
         </div>
       </div>
     </div>



.. .. raw:: html

..      <div class="container">
..        <div class="row">
..          <div class="col-sm">
..             <img width="200" height="400" src="./media/push_text_1.png" style="margin-right:250px;margin-left:25px;" alt="push">
..             <figcaption>Рисунок 1. PUSH с заголовками и текстом.</figcaption>
..          </div>
..          <div class="col-sm">
..             <img img width="200" height="400" src="./media/push_image_2.png" style="margin-left:25px;" alt="push">
..             <figcaption>Рисунок 2. PUSH с изображенем.</figcaption>
..          </div>
..        </div>
..      </div>




.. .. raw:: html

..      <div class="container">
..        <div class="row">
..          <div class="col-sm">
..             <br>
..          </div>
..        </div>
..      </div>




.. .. raw:: html

..      <div class="container">
..        <div class="row">
..          <div class="col-sm">
..             <img width="200" height="400" src="./media/push_buttons_3.png" style="margin-right:250px;margin-left:25px;" alt="push">
..             <figcaption>Рисунок 3. PUSH с кнопками.</figcaption>
..          </div>
..          <div class="col-sm">
..             <img width="200" height="400" src="./media/push_webview_4.png" style="margin-left:25px;" alt="push">
..             <figcaption>Рисунок 4. PUSH с webview.</figcaption>
..          </div>
..        </div>
..      </div>


.. .. raw:: html

..      <div class="container">
..        <div class="row">
..          <div class="col-sm">
..             <br>
..          </div>
..        </div>
..      </div>



Данный сервис дает возможность экономии средств за счет использования канала связи для отправки PUSH-сообщений вместо SMS-сообщений и также дает возможность настраивать гибкие каскады для отправки в разные каналы связи. PUSH Service поддерживает подключение PUSH–сообщений для устройств на базе Android и iOS. Для включения PUSH–сообщений необходимо предоставить сертификаты/приватные ключи Ваших мобильных приложений.  

Отправка PUSH-сообщения выполняется по REST-протоколу, подробное описание протокола смотрите в разделе документации Интеграция по REST-протоколу.

