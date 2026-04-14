# Quick Install

## HACS

1. Upload this folder to a Git repository.
2. In Home Assistant HACS, add the repository as a `Dashboard` custom repository.
3. Install `ESP IR MQTT Card`.
4. Refresh the browser.

## Manual

1. Download `esp-ir-mqtt-card.js`.
2. Copy it to:

```text
/config/www/community/esp-ir-mqtt-card/esp-ir-mqtt-card.js
```

3. Add dashboard resource:

```yaml
url: /local/community/esp-ir-mqtt-card/esp-ir-mqtt-card.js
type: module
```

4. Create the MQTT sensor:

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

This template binary sensor wraps the ESPHome diagnostic entity `sensor.newchuangan1_mqtt_status` and converts it into a reliable `on/off` state for the card.

5. Add the card:

```yaml
type: custom:esp-ir-mqtt-card
title: ESP IR Remote
store_entity: sensor.esp_ir_store
topic_prefix: newchuangan1/ir
columns: 3
```
