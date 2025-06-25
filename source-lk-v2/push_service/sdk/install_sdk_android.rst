Инструкция по использованию PushService для Android
======================================================

Общая информация
--------------------

PushService — это мощная Android-библиотека для управления push-уведомлениями с расширенными возможностями персонализации, локального хранения и аналитики. Библиотека предоставляет единый фасад для работы с FCM, Huawei Push-Kit, Rustore и обладает богатым API для интеграции с вашим приложением.

Основные возможности библиотеки:

* регистрация в FCM и управление токенами;
* персонализация с привязкой пользователей по телефону/ID;
* локальное хранение истории уведомлений;
* кастомизация внешнего вида уведомлений;
* аналитика и отслеживание действий;
* гибкие настройки каналов и важности уведомлений.

Быстрый старт
----------------

**Инициализация SDK**

::

    class MainActivity : AppCompatActivity() {
    
        private lateinit var notificationSdk: NotificationSdk
    
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
        
            // Инициализируем SDK
            notificationSdk = NotificationSdk.getInstance(this)
            
            // Настраиваем и регистрируем push-токен
            setupPushNotifications()
        }
    
        private fun setupPushNotifications() {
            notificationSdk
                .setLogsEnabled(BuildConfig.DEBUG) // Логи только в debug-сборке
                .setLocalDatabaseEnabled(true) // Включаем локальное хранение
                .setNotificationIcon(
                    R.drawable.ic_notification, // Иконка уведомления
                    R.color.notification_accent  // Цвет иконки
                )
                .setNotificationImportance(NotificationImportance.High) // Высокая важность
                .setNotificationChannelName("Важные уведомления") // Имя канала
                .registerPushToken(
                    onSuccess = { token ->
                        Log.d("Push", "Push Token: $token")
                        // Сохраните токен или отправьте на ваш сервер
                    },
                    onError = { error ->
                        Log.e("Push", "Ошибка регистрации: ${error.message}")
                    }
                )
        }
    }

Управление пользователями
---------------------------

**Привязка пользователя (персонализация)**

::

    class UserManager {
    
        fun loginUser(
            sdk: NotificationSdk,
            userId: String,
            phoneNumber: String
        ) {
            // Номер телефона должен начинаться с "7" и содержать 11 цифр
            val formattedPhone = formatPhoneNumber(phoneNumber)
            
            sdk.personalize(
                user = userId,
                phone = formattedPhone,
                onSuccess = { userProfile ->
                    Log.d("User", "Пользователь авторизован: ${userProfile.externalUserId}")
                    // Обновите UI или сохраните данные профиля
                    updateUI(userProfile)
                },
                onError = { error ->
                    Log.e("User", "Ошибка авторизации: ${error.message}")
                    showErrorToUser(error.message)
                }
            )
        }
        
        private fun formatPhoneNumber(phone: String): String {
            // Приводим номер к формату, начинающемуся с "7"
            val cleanPhone = phone.replace(Regex("[^\\d]"), "")
            return when {
                cleanPhone.startsWith("8") && cleanPhone.length == 11 -> 
                    "7${cleanPhone.substring(1)}"
                cleanPhone.startsWith("7") && cleanPhone.length == 11 -> 
                    cleanPhone
                else -> throw IllegalArgumentException("Некорректный номер телефона")
            }
        }
        
        fun logoutUser(sdk: NotificationSdk) {
            sdk.depersonalize(
                onSuccess = {
                    Log.d("User", "Пользователь разлогинен")
                    // Очистите локальные данные и UI
                    clearUserData()
                },
                onError = { error ->
                    Log.e("User", "Ошибка при выходе: ${error.message}")
                }
            )
        }
        
        fun getCurrentUserProfile(sdk: NotificationSdk) {
            sdk.getUserProfile(
                onSuccess = { profile ->
                    Log.d("User", "Профиль: ID=${profile.id}, Phone=${profile.phone}")
                    displayUserProfile(profile)
                },
                onError = { error ->
                    Log.e("User", "Ошибка получения профиля: ${error.message}")
                }
            )
        }
    }

**Управление настройками установки**

::

    class InstallationManager {
    
        fun updatePushSettings(
            sdk: NotificationSdk,
            pushEnabled: Boolean,
            isPrimaryDevice: Boolean
        ) {
            // Получаем текущие настройки
            sdk.getInstallationInfo(
                onSuccess = { installationInfo ->
                    // Обновляем настройки
                    val updatedSettings = installationInfo.settings.map { setting ->
                        // Можно изменить значения настроек по необходимости
                        setting.copy(value = if (setting.name == "notifications") "enabled" else setting.value)
                    }
                    
                    // Сохраняем изменения
                    sdk.updateInstallationInfo(
                        pushEnabled = pushEnabled,
                        settings = updatedSettings,
                        primary = isPrimaryDevice,
                        onSuccess = {
                            Log.d("Settings", "Настройки обновлены")
                        },
                        onError = { error ->
                            Log.e("Settings", "Ошибка обновления: ${error.message}")
                        }
                    )
                },
                onError = { error ->
                    Log.e("Settings", "Ошибка получения настроек: ${error.message}")
                }
            )
        }
    }

Работа с уведомлениями
-------------------------

**Получение истории уведомлений**

::

    class NotificationHistory {
    
        fun loadRecentNotifications(sdk: NotificationSdk) {
            sdk.getNotificationsFromHistory(
                limit = 50,
                startFromId = 0L,
                dateFrom = null,
                dateTo = null,
                sortAsc = false, // Новые сначала
                onSuccess = { notifications ->
                    Log.d("History", "Загружено ${notifications.size} уведомлений")
                    displayNotifications(notifications)
                },
                onError = { error ->
                    Log.e("History", "Ошибка загрузки: ${error.message}")
                }
            )
        }
        
        fun loadNotificationsByDateRange(
            sdk: NotificationSdk,
            fromDate: Date,
            toDate: Date
        ) {
            sdk.getNotificationsFromHistory(
                limit = 100,
                startFromId = 0L,
                dateFrom = fromDate,
                dateTo = toDate,
                sortAsc = true, // Старые сначала
                onSuccess = { notifications ->
                    processNotificationsByDate(notifications)
                },
                onError = { error ->
                    handleError(error)
                }
            )
        }
        
        fun markNotificationAsRead(
            sdk: NotificationSdk,
            notification: NotificationDto
        ) {
            // Помечаем уведомление как прочитанное
            notification.setOpened()
            
            sdk.updateNotificationFromHistory(
                notificationDto = notification,
                onSuccess = {
                    Log.d("History", "Уведомление отмечено как прочитанное")
                },
                onError = { error ->
                    Log.e("History", "Ошибка обновления статуса: ${error.message}")
                }
            )
        }
        
        fun deleteNotification(sdk: NotificationSdk, notificationId: Long) {
            sdk.deleteNotificationFromHistory(
                notificationId = notificationId,
                onSuccess = {
                    Log.d("History", "Уведомление удалено")
                    refreshNotificationsList()
                },
                onError = { error ->
                    Log.e("History", "Ошибка удаления: ${error.message}")
                }
            )
        }
        
        fun clearAllNotifications(sdk: NotificationSdk) {
            sdk.deleteNotificationsFromHistory(
                onSuccess = {
                    Log.d("History", "Вся история очищена")
                    updateEmptyState()
                },
                onError = { error ->
                    Log.e("History", "Ошибка очистки: ${error.message}")
                }
            )
        }
    }

Кастомизация уведомлений
---------------------------

**Создание кастомного NotificationCustomizer**

::

    import im.zgr.pushservice.notification.NotificationCustomizer
    import androidx.core.app.NotificationCompat
    import android.content.Context
    import android.graphics.Bitmap

    class MyNotificationCustomizer : NotificationCustomizer {
        
        override fun customize(
            builder: NotificationCompat.Builder,
            context: Context,
            title: String,
            text: String,
            bitmap: Bitmap?,
            customPayload: String?
        ) {
            // Кастомизируем стиль уведомления
            builder.apply {
                // Устанавливаем расширенный стиль текста
                setStyle(
                    NotificationCompat.BigTextStyle()
                        .bigText(text)
                        .setBigContentTitle(title)
                )
                
                // Добавляем изображение, если есть
                bitmap?.let { 
                    setStyle(
                        NotificationCompat.BigPictureStyle()
                            .bigPicture(it)
                            .setBigContentTitle(title)
                            .setSummaryText(text)
                    )
                }
                
                // Обрабатываем кастомные данные
                customPayload?.let { payload ->
                    try {
                        val jsonData = JSONObject(payload)
                        
                        // Добавляем действия на основе payload
                        if (jsonData.has("actions")) {
                            addCustomActions(this, jsonData.getJSONArray("actions"), context)
                        }
                        
                        // Устанавливаем приоритет на основе данных
                        if (jsonData.has("priority")) {
                            setPriority(jsonData.getInt("priority"))
                        }
                        
                    } catch (e: Exception) {
                        Log.e("Customizer", "Ошибка парсинга payload: ${e.message}")
                    }
                }
                
                // Добавляем системные действия
                addAction(
                    R.drawable.ic_mark_read, 
                    "Прочитано",
                    createReadActionPendingIntent(context)
                )
                
                addAction(
                    R.drawable.ic_delete,
                    "Удалить",
                    createDeleteActionPendingIntent(context)
                )
            }
        }
        
        private fun addCustomActions(
            builder: NotificationCompat.Builder,
            actions: JSONArray,
            context: Context
        ) {
            for (i in 0 until actions.length()) {
                val action = actions.getJSONObject(i)
                val title = action.getString("title")
                val actionId = action.getString("id")
                
                builder.addAction(
                    R.drawable.ic_action,
                    title,
                    createCustomActionPendingIntent(context, actionId)
                )
            }
        }
    }

**Подключение кастомизатора**

::

    class NotificationSetup {
    
        fun setupCustomNotifications(sdk: NotificationSdk) {
            sdk.setNotificationCustomizer(MyNotificationCustomizer::class.java)
                .setNotificationIcon(R.drawable.ic_notification, R.color.primary)
                .setNotificationChannelName("Персонализированные уведомления")
                .setNotificationImportance(NotificationImportance.High)
        }
    }

Подписка на события
----------------------

**Отслеживание получения уведомлений**

::

    class NotificationListener : AppCompatActivity() {
    
        private lateinit var sdk: NotificationSdk
        
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            
            sdk = NotificationSdk.getInstance(this)
            subscribeToNotificationEvents()
        }
        
        private fun subscribeToNotificationEvents() {
            // Подписываемся на получение новых сообщений
            sdk.subscribeOnAppMessage { messageId ->
                Log.d("Notification", "Получено новое сообщение: $messageId")
                
                // Загружаем полные данные сообщения
                sdk.fetch(
                    id = messageId,
                    onSuccess = { messageResponse ->
                        messageResponse?.let { 
                            handleNewMessage(it)
                        } ?: Log.w("Notification", "Сообщение не найдено или удалено")
                    },
                    onError = { error ->
                        Log.e("Notification", "Ошибка загрузки сообщения: ${error.message}")
                    }
                )
            }
            
            // Подписываемся на действия с уведомлениями
            sdk.subscribeOnAppMessageAction { actionData ->
                Log.d("Action", "Действие с уведомлением: ${actionData.notificationEvent}")
                
                when (actionData.notificationEvent) {
                    NotificationEvent.OPENED -> {
                        handleNotificationOpened(actionData.notificationDto)
                    }
                    NotificationEvent.DISMISSED -> {
                        handleNotificationDismissed(actionData.notificationDto)
                    }
                    NotificationEvent.CUSTOM_ACTION -> {
                        actionData.notificationCustomActionDto?.let { customAction ->
                            handleCustomAction(actionData.notificationDto, customAction)
                        }
                    }
                }
            }
        }
        
        private fun handleNewMessage(message: MessageResponse) {
            // Обновляем счетчик непрочитанных
            updateUnreadCounter()
            
            // Показываем badge или обновляем UI
            updateNotificationBadge()
            
            // Отправляем аналитику
            trackNotificationReceived(message)
        }
        
        private fun handleNotificationOpened(notification: NotificationDto) {
            // Открываем соответствующий экран
            when (notification.contentCategory) {
                NotificationDto.HTML -> openWebView(notification.contentUrl)
                NotificationDto.IMAGE -> openImageViewer(notification.contentUrl)
                NotificationDto.VIDEO -> openVideoPlayer(notification.contentUrl)
                NotificationDto.YOUTUBE -> openYouTubeVideo(notification.contentUrl)
                else -> openDefaultScreen(notification)
            }
            
            // Помечаем как прочитанное
            notification.setOpened()
            sdk.updateNotificationFromHistory(notification)
        }
        
        override fun onDestroy() {
            super.onDestroy()
            // Отписываемся от событий
            sdk.subscribeOnAppMessage(null)
            sdk.subscribeOnAppMessageAction(null)
        }
    }

Тестирование
----------------

**Отправка тестового уведомления**

::

    class TestingUtils {
    
        fun sendTestNotification(sdk: NotificationSdk) {
            sdk.requestNotification(
                onSuccess = {
                    Log.d("Test", "Тестовое уведомление отправлено")
                    showToast("Проверьте панель уведомлений")
                },
                onError = { error ->
                    Log.e("Test", "Ошибка отправки тестового уведомления: ${error.message}")
                    showErrorDialog(error.message)
                }
            )
        }
    }

Модели данных
-----------------

**NotificationDto**

::

    // Основная структура уведомления
    data class NotificationDto(
        var id: Long?,                    // ID в локальной БД
        var pushServiceId: Int,           // ID в push-сервисе
        var text: String?,                // Текст уведомления
        var title: String?,               // Заголовок
        var contentUrl: String?,          // URL контента
        var contentCategory: String?,     // Категория: "html", "image", "video", "youtube"
        var customActionList: List<NotificationCustomActionDto>?, // Кастомные действия
        var date: Date,                   // Дата получения
        var customPayload: String?,       // JSON с дополнительными данными
        var status: String                // Статус: "Delivered", "Opened", "Swiped"
    )

**UserProfileDto**

::

    // Профиль пользователя
    data class UserProfileDto(
        val id: Long,                     // Внутренний ID
        val phone: String?,               // Номер телефона
        val externalUserId: String?       // Внешний ID пользователя
    )

**InstallationInfoDto**

::

    // Информация об установке
    data class InstallationInfoDto(
        val id: String,                           // ID установки
        var pushOsEnabled: Boolean?,              // Push включены в ОС
        var pushEnabled: Boolean,                 // Push включены в приложении
        val settings: List<InstallationInfoSettingDto>, // Настройки
        var primary: Boolean                      // Основное устройство
    )

**Цепочка вызовов**

Все методы возвращают экземпляр ``NotificationSdk`` для удобного построения цепочек:

::

    NotificationSdk.getInstance(context)
        .setLogsEnabled(true)
        .setLocalDatabaseEnabled(true)
        .setNotificationIcon(R.drawable.icon, R.color.accent)
        .registerPushToken({ token -> }, { error -> })

Лучшие практики
-------------------

**1. Инициализация в Application**

::

    class MyApplication : Application() {
    
        companion object {
            lateinit var notificationSdk: NotificationSdk
                private set
        }
        
        override fun onCreate() {
            super.onCreate()
            
            notificationSdk = NotificationSdk.getInstance(this)
                .setLogsEnabled(BuildConfig.DEBUG)
                .setLocalDatabaseEnabled(true)
        }
    }

**2. Использование в MVVM архитектуре**

::

    class NotificationRepository @Inject constructor(
        private val sdk: NotificationSdk
    ) {
        
        fun getNotifications(limit: Int = 50): Flow<List<NotificationDto>> = flow {
            suspendCoroutine<List<NotificationDto>> { continuation ->
                sdk.getNotificationsFromHistory(
                    limit = limit,
                    startFromId = 0L,
                    dateFrom = null,
                    dateTo = null,
                    onSuccess = { notifications ->
                        continuation.resume(notifications)
                    },
                    onError = { error ->
                        continuation.resumeWithException(error)
                    }
                )
            }.let { emit(it) }
        }
        
        suspend fun markAsRead(notification: NotificationDto) {
            suspendCoroutine<Unit> { continuation ->
                notification.setOpened()
                sdk.updateNotificationFromHistory(
                    notification,
                    onSuccess = { continuation.resume(Unit) },
                    onError = { continuation.resumeWithException(it) }
                )
            }
        }
    }

**3. Обработка ошибок**

Всегда предусматривайте обработку ошибок:

::

    sdk.personalize(userId, phone,
        onSuccess = { profile ->
            // Успешная обработка
        },
        onError = { throwable ->
            when (throwable) {
                is NetworkException -> showNetworkError()
                is ValidationException -> showValidationError(throwable.message)
                else -> showGenericError()
            }
        }
    )