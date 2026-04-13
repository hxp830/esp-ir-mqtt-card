# ESP IR MQTT Card v1.0.0

First public release of `ESP IR MQTT Card`, a Home Assistant custom Lovelace card for an ESPHome infrared bridge that stores learned keys in MQTT.

## Highlights

- Dynamic buttons generated from saved MQTT-backed IR keys
- Send saved keys directly from Home Assistant
- Save the current learned key with a custom name
- Delete saved keys from the UI
- Send the last learned code
- HACS-compatible repository layout
- Bilingual documentation
- Ready-to-copy Home Assistant MQTT and Lovelace examples

## Included in this release

- `esp-ir-mqtt-card.js`
- `hacs.json`
- `README.md`
- `INSTALL.md`
- `CHANGELOG.md`
- `examples/home-assistant-mqtt.yaml`
- `examples/lovelace-card.yaml`
- Preview assets

## Installation

### HACS

Add this repository as a custom HACS repository:

```text
https://github.com/hxp830/esp-ir-mqtt-card
```

Category:

```text
Dashboard
```

### Manual

Copy `esp-ir-mqtt-card.js` to:

```text
/config/www/community/esp-ir-mqtt-card/esp-ir-mqtt-card.js
```

Then add it as a Lovelace resource:

```yaml
url: /local/community/esp-ir-mqtt-card/esp-ir-mqtt-card.js
type: module
```

## Home Assistant Example

The repository includes ready-to-use examples:

- `examples/home-assistant-mqtt.yaml`
- `examples/lovelace-card.yaml`

## Notes

- This release is designed for ESPHome infrared bridges using MQTT topics such as `newchuangan1/ir/...`
- The card depends on Home Assistant's `mqtt.publish` service
- Saved buttons update automatically when the retained MQTT key store changes
