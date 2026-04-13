# ESP IR MQTT Card v1.0.0

First public release.

## Included

- HACS-compatible custom Lovelace card
- Dynamic button rendering from MQTT-backed saved keys
- Save current learned key
- Send named key
- Delete named key
- Send last learned code
- Example Home Assistant MQTT sensor YAML
- Example Lovelace card YAML

## Recommended Home Assistant setup

1. Install through HACS as a `Dashboard` repository.
2. Create the MQTT sensor from `examples/home-assistant-mqtt.yaml`.
3. Add the card using `examples/lovelace-card.yaml`.
