# ESP IR MQTT Card

A Home Assistant custom card for your ESPHome infrared bridge.

It renders dynamic buttons from your saved key store and lets you:

- send a saved key
- save the current learned key with a name
- delete a saved key
- send the last learned key

## Package Contents

- `esp-ir-mqtt-card.js`: Lovelace card
- `hacs.json`: HACS metadata
- `package.json`: package metadata
- `INSTALL.md`: short install guide
- `LICENSE`: MIT license

## Install

### Option 1: HACS custom repository

1. Put these files in a Git repository or release zip.
2. In HACS, open the three-dot menu and choose `Custom repositories`.
3. Add the repository URL.
4. Category: `Dashboard`.
5. Install `ESP IR MQTT Card`.
6. Refresh the browser.

### Option 2: Manual

1. Copy [esp-ir-mqtt-card.js](./esp-ir-mqtt-card.js) to `/config/www/community/esp-ir-mqtt-card/esp-ir-mqtt-card.js`
2. In Home Assistant, add a dashboard resource:

```yaml
url: /local/community/esp-ir-mqtt-card/esp-ir-mqtt-card.js
type: module
```

## Required MQTT entity

The card needs one Home Assistant entity that mirrors your retained topic:

- topic: `newchuangan1/ir/store`

Example Home Assistant YAML:

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
```

This makes the saved key names available as attributes on `sensor.esp_ir_store`.

## Lovelace config

```yaml
type: custom:esp-ir-mqtt-card
title: Living Room IR
store_entity: sensor.esp_ir_store
topic_prefix: newchuangan1/ir
columns: 3
```

## How it works

- `Save Current` publishes to `newchuangan1/ir/save_as`
- `Send` publishes to `newchuangan1/ir/send/named`
- `Delete` publishes to `newchuangan1/ir/delete`
- `Send Last` publishes to `newchuangan1/ir/send/last`

## Notes

- The card depends on Home Assistant's `mqtt.publish` service.
- The ESP device must already be connected to the same MQTT broker.
- Saved buttons update automatically when `newchuangan1/ir/store` changes.
- A ready-to-upload zip can be created from this folder for website download distribution.
