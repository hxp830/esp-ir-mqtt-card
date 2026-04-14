# ESP IR MQTT Card

[English](./README.md) | [中文](./README.zh-CN.md) | Русский

Это пользовательская карточка Lovelace для Home Assistant, предназначенная для работы с ИК-шлюзом ESPHome.

Карточка автоматически создает кнопки на основе сохраненных в MQTT имен ИК-команд. Через интерфейс Home Assistant можно:

- отправлять сохраненные команды
- сохранять только что изученный ИК-код под новым именем
- удалять сохраненные кнопки
- отправлять последний изученный код

![Card Preview](./assets/card-preview.png)

## Возможности

- совместимость с HACS
- динамические кнопки из MQTT-хранилища
- не нужно вручную прописывать список кнопок в Lovelace
- поддержка английского, китайского и русского интерфейса
- работает с темами ESPHome вида `newchuangan1/ir/...`

## Установка

### HACS

1. Откройте HACS
2. Перейдите в `Custom repositories`
3. Добавьте репозиторий:

```text
https://github.com/hxp830/esp-ir-mqtt-card
```

4. Категория: `Dashboard`
5. Установите `ESP IR MQTT Card`
6. Обновите страницу браузера

### Ручная установка

1. Скопируйте `esp-ir-mqtt-card.js` в:

```text
/config/www/community/esp-ir-mqtt-card/esp-ir-mqtt-card.js
```

2. Добавьте ресурс панели:

```yaml
url: /local/community/esp-ir-mqtt-card/esp-ir-mqtt-card.js
type: module
```

## Настройка Home Assistant

### 1. Создайте MQTT-сущности

```yaml
mqtt:
  sensor:
    - name: ESP IR Store
      unique_id: esp_ir_store
      state_topic: "newchuangan1/ir/store"
      value_template: >
        {% if value_json is mapping %}
          {{ value_json | count }}
        {% else %}
          0
        {% endif %}
      json_attributes_topic: "newchuangan1/ir/store"
    - name: ESP IR Last Learned
      unique_id: esp_ir_last_learned
      state_topic: "newchuangan1/ir/stored/last"

template:
  - binary_sensor:
      - name: ESP IR Device Online
        unique_id: esp_ir_device_online
        state: >
          {{ states('sensor.newchuangan1_mqtt_status') in ['connected', 'online', 'on', 'true', '连接', '已连接', '在线'] }}
```

Этот шаблонный `binary_sensor` читает диагностическую сущность ESPHome `sensor.newchuangan1_mqtt_status` и преобразует ее в надежное состояние `on/off` для карточки.

### 2. Добавьте карточку

```yaml
type: custom:esp-ir-mqtt-card
title: Панель ИК-кнопок
store_entity: sensor.esp_ir_store
mqtt_status_entity: binary_sensor.esp_ir_device_online
topic_prefix: newchuangan1/ir
columns: 3
default_example_name: test_ir
language: ru
```

Поддерживаемые языки:

- `en`
- `zh`
- `ru`

Необязательная настройка:

- `mqtt_status_entity`: сущность для отображения статуса MQTT, например `binary_sensor.esp_ir_device_online`

Рекомендуемый вариант: пусть карточка читает шаблонный `binary_sensor`, а не текстовый `sensor`. Так карточка получает стабильное состояние `on/off` для зеленого или серого индикатора.

После настройки в верхней части карточки появится индикатор:

- зеленый: подключено
- серый: не подключено

## Как это работает

Карточка публикует следующие MQTT-команды через сервис `mqtt.publish` Home Assistant:

- сохранить текущий изученный код: `newchuangan1/ir/save_as`
- отправить по имени: `newchuangan1/ir/send/named`
- удалить кнопку: `newchuangan1/ir/delete`
- отправить последний изученный код: `newchuangan1/ir/send/last`

Список динамических кнопок берется из:

- `newchuangan1/ir/store`

Этот JSON topic зеркалируется в attributes сущности `sensor.esp_ir_store`, после чего карточка автоматически строит кнопки.

## Примечания

- Карточка зависит от сервиса `mqtt.publish` в Home Assistant
- Ваш ИК-шлюз ESPHome должен быть подключен к тому же MQTT-брокеру
- Кнопки обновляются автоматически при изменении retained MQTT-хранилища
