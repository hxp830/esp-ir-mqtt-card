# ESP IR MQTT Card

English | [中文](./README.zh-CN.md) | [Русский](./README.ru.md)

A Home Assistant custom Lovelace card for an ESPHome infrared bridge that stores learned keys in MQTT.

It automatically renders buttons from your saved key list and gives you a clean control surface to:

- send a saved key
- save the currently learned key with a new name
- delete a saved key
- send the last learned code

![Card Preview](./assets/card-preview.png)

## Features

- HACS-compatible frontend repository
- Dynamic key buttons from an MQTT-backed saved key store
- No hardcoded key list inside Lovelace
- Simple setup with Home Assistant `mqtt.publish`
- Multilingual UI support: English, Chinese, and Russian
- Works well with ESPHome topics such as `newchuangan1/ir/...`

## Install

### HACS

1. Open HACS.
2. Open `Custom repositories`.
3. Add:

```text
https://github.com/hxp830/esp-ir-mqtt-card
```

4. Category: `Dashboard`
5. Install `ESP IR MQTT Card`
6. Refresh your browser

### Manual

1. Copy `esp-ir-mqtt-card.js` to:

```text
/config/www/community/esp-ir-mqtt-card/esp-ir-mqtt-card.js
```

2. Add a dashboard resource:

```yaml
url: /local/community/esp-ir-mqtt-card/esp-ir-mqtt-card.js
type: module
```

## Home Assistant YAML

### 1. MQTT entities

Copy from [examples/home-assistant-mqtt.yaml](./examples/home-assistant-mqtt.yaml):

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

  binary_sensor:
    - name: ESP IR Device Online
      unique_id: esp_ir_device_online
      state_topic: "newchuangan1/status"
      payload_on: "online"
      payload_off: "offline"
```

### 2. Lovelace card

```yaml
type: custom:esp-ir-mqtt-card
title: ESP IR Remote Panel
store_entity: sensor.esp_ir_store
mqtt_status_entity: binary_sensor.esp_ir_device_online
topic_prefix: newchuangan1/ir
columns: 3
default_example_name: test_ir
language: en
```

Supported `language` values:

- `en`
- `zh`
- `ru`

Optional config:

- `mqtt_status_entity`: entity used to show MQTT connection status, for example `binary_sensor.esp_ir_device_online`

When configured, the card header shows a status dot:

- green: connected
- gray: disconnected

If `language` is omitted, the card tries to follow the Home Assistant language automatically.

## How It Works

The card publishes these MQTT commands through Home Assistant:

- save the current learned code: `newchuangan1/ir/save_as`
- send by key name: `newchuangan1/ir/send/named`
- delete a saved key: `newchuangan1/ir/delete`
- send the last learned code: `newchuangan1/ir/send/last`

The dynamic button list comes from:

- `newchuangan1/ir/store`

This JSON topic is mirrored into `sensor.esp_ir_store` as JSON attributes.

## More Languages

- Chinese guide: [README.zh-CN.md](./README.zh-CN.md)
- Russian guide: [README.ru.md](./README.ru.md)

## Release

- Current version: `1.0.0`
- Release notes: [RELEASE_NOTES_v1.0.0.md](./RELEASE_NOTES_v1.0.0.md)
- Download package: use GitHub source download or package the repository root as zip
