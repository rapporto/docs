ZGR Messaging SDK (push service)
=====================================

Общая информация
--------------------

Данный комплект для разработки программного обеспечения (далее — SDK) предназначен для отправки сообщений на мобильные устройства пользователей при помощи сервисов отправки push-уведомлений от Apple. Распространение SDK осуществляется в форме SaaS (программное обеспечение как услуга) от ZGR.IM.

Основные возможности библиотеки:

* приём и отображение push-сообщений, отправленных на мобильное устройство с помощью  Apple Push Notification Service, в том числе содержащих расширенный медиа-контент (изображения, видео и т.д.);
* сохранение принятых сообщений в локальной базе данных;
* отслеживание доставки и открытия push-сообщений с отправкой соответствующих запросов на сервер.

Для внедрения SDK в мобильное приложение необходимо:

1. Настроить интеграцию приложения с Apple Push Notification Service (APNS).
2. Добавить в приложение файл конфигурации *ZGRConfig.json* и библиотеку, скомпилированную в виде динамического фреймворка *ZGRImSDK.xcframework*. 
3. Добавить вызов методов регистрации токена и телефона пользователя или его внешнего идентификатора (*externalUserId*).


Системные требования
-----------------------

Минимальная версия поддерживаемой OS: iOS 11. 
Для работы SDK также требуется доступ к Интернету.


Установка SDK
-----------------

В настоящий момент доступны три варианта установки:

* вручную (процесс подробно изложен в файле `manually_installation.md` в каталоге `installation`);
* в качестве `pod` с помощью менеджера пакетов CocoaPods (файл `pod_installation.md` в каталоге `installation`);
* с помощью Swift Package Manager (файл `spm_installation.md` в каталоге `installation`).


Взаимодействие с кроссплатформенными приложениями
---------------------------------------------------

Библиотека гарантированно работает без изменений с приложениями, разработанными с помощью кроссплатформенных фреймворков Flutter и React Native.
Варианты интеграции SDK и приложений описаны в соответствующих файлах `flutter_installation.md`/`rn_installation.md` в каталоге `installation`, а также `flutter_usage.md`/`rn_usage.md` в каталоге `crossplatform`.


Интеграция приложения с APNS
------------------------------

Для интеграции приложения с APNS необходимо включить возможность отправки push-нотификаций в настройках проекта, а также в настройках аккаунта разработчика. После этого на старте приложения зарегистрировать его в службе APNS и получить уникальный токен для устройства. Подробно процесс описан по `ссылке <https://developer.apple.com/documentation/usernotifications/registering_your_app_with_apns>`_. 


Основные шаги интеграции
---------------------------

В приложенном тестовом проекте вы найдете примеры использования всех возможностей SDK. Ниже приведены только основные сценарии работы с SDK.


1. Подключение библиотеки ZGR к *AppDelegate*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Swift:

``import ZGRImSDK``


2. Отправка запроса на получение от системы push-токена и передача полученного токена в ZGR
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: swift

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    application.registerForRemoteNotifications()
    return true
}

func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    ZGRMessaging.sharedInstance().register(forRemoteNotifications: deviceToken)
}


3. Отправка внешнего идентификатора пользователя и/или номера телефона пользователя в ZGR
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: swift

ZGRMessaging.sharedInstance().sendUserPhoneNumber("79876543210", externalUserId: "id1") {
    // Perform any code
}


4. Реализация протокола делегата UNUserNotificationCenterDelegate
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: swift

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    application.registerForRemoteNotifications()
    
    UNUserNotificationCenter.current().delegate = self
    UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { (granted, error) in
        
    }
    return true
}


5. Перенаправление push-уведомления в ZGR
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: swift

func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
    ZGRMessaging.sharedInstance().userNotificationCenter(center, didReceive: response) { (notification, action) in
        // Handle notification from ZGR
    }
    
    // My own code
    
    completionHandler()
}


6. Метод для изменения статуса уведомлений ZGRNotification
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: swift

ZGRMessaging.shared.updateNotificationStatus("Seen", forNotification: identifier)


7. Метод для проверки, разрешены ли push-уведомления в системе
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: swift

ZGRMessaging.shared.checkIsPushGranted()


8. Метод для изменения счётчика push в бейдже приложения
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Допустим, что вызов метода происходит в AppDelegate.swift

.. code-block:: swift

ZGRMessaging.shared.application(app, setApplicationBadgeNumber: 5)


9. Рассылка системной нотификации в момент открытия push-уведомления
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Допустим, в AppDelegate.swift подписываемся на событие zgrDidOpenRemoteNotification

.. code-block:: swift

NotificationCenter.default.addObserver(self, selector: #selector(handleDidOpenPushNotification), name: .zgrDidOpenRemoteNotification, object: nil)


И прописываем метод-обработчик события:

.. code-block:: swift

func handleDidReceivePushNotification(_ notification: Notification) {
    //print(" handleDidReceivePushNotification called. params = \(notification)")
}


Работа с БД SDK
--------------------

Получение push с одной определенной даты по другую определенную дату или запрос push с определенным статусом
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

В данном случае рекомендуем использовать класс ZGRDatabaseRequest, который имеет следующее определение:

.. code-block:: swift

@objc public final class ZGRDatabaseRequest: NSObject {
    
    @objc public var fetchLimit: UInt = .max /* Default: NSUIntegerMax */
    @objc public var pageOffset: UInt = 0 /*< Default: 0. Offsets results by provided number of pages (size of page is equal to ` fetchLimit`) */
    @objc public var fromDate: Date?
    @objc public var toDate: Date?
    @objc public var status: String?
    
}


В таком случае класс мог бы выглядеть примерно так:

.. code-block:: swift

final class ControllerPushes {
    
    private var request = ZGRDatabaseRequest()
    private var notifications = [ZGRNotification]()
    private var isDataNil = true

    ...

    override func viewDidLoad() {
        super.viewDidLoad()

        ...

        fetchData()
    }

    ...

    ...

    private func fetchData() {
        
        ZGRMessaging.shared.fetchNotifications(with: request, completionHandler: { [weak self] nAr, _ in
            guard let self = self else { return }
            
            self.clearDataObjects()
            
            if let notifArray = nAr {
                self.isDataNil = false

                self.notifications = notifArray
                self.createDataSource(self.notifications)
                
            } else {
                self.isDataNil = true
            }
            
            UI { self.reloadData() }
        })
    }
}


И расширение, в котором задаются даты запроса:

.. code-block:: swift

extension ControllerPushes: UpdateRequestWithDatesProtocol {

    func updateRequestWithDates(dateFrom: Date?, dateTo: Date?) {
        request.fromDate = dateFrom
        request.toDate = dateTo
        
        fetchData()
    }
}
