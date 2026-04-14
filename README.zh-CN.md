# ESP IR MQTT 卡片

[English](./README.md) | 中文 | [Русский](./README.ru.md)

这是一个给 Home Assistant 使用的自定义 Lovelace 卡片，适合配合 ESPHome 红外网关一起使用。

它会根据 MQTT 中已保存的红外键名自动生成按钮，你可以直接在 Home Assistant 页面里：

- 发射已保存的按键
- 把当前学习到的红外码保存成名字
- 删除已保存按键
- 发射最后一次学习到的红外码

![Card Preview](./assets/card-preview.png)

## 特性

- 兼容 HACS
- 根据 MQTT 存储自动生成动态按钮
- Lovelace 中不需要手动写死按键列表
- 支持英文、中文、俄语界面
- 适配 `newchuangan1/ir/...` 这类 ESPHome MQTT 主题

## 安装

### HACS

1. 打开 HACS
2. 进入 `Custom repositories`
3. 添加仓库：

```text
https://github.com/hxp830/esp-ir-mqtt-card
```

4. 类别选择 `Dashboard`
5. 安装 `ESP IR MQTT Card`
6. 刷新浏览器

### 手动安装

1. 把 `esp-ir-mqtt-card.js` 放到：

```text
/config/www/community/esp-ir-mqtt-card/esp-ir-mqtt-card.js
```

2. 在仪表盘资源中添加：

```yaml
url: /local/community/esp-ir-mqtt-card/esp-ir-mqtt-card.js
type: module
```

## Home Assistant 配置

### 1. 创建 MQTT 实体

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

### 2. 添加卡片

```yaml
type: custom:esp-ir-mqtt-card
title: 红外按键面板
store_entity: sensor.esp_ir_store
mqtt_status_entity: binary_sensor.esp_ir_device_online
topic_prefix: newchuangan1/ir
columns: 3
default_example_name: test_ir
language: zh
```

`language` 支持：

- `en`
- `zh`
- `ru`

可选配置：

- `mqtt_status_entity`：用于显示 MQTT 连接状态，建议填写 `binary_sensor.esp_ir_device_online`

配置后，卡片顶部会显示一个状态圆点：

- 绿色：连接
- 灰色：未连接

## 工作原理

卡片通过 Home Assistant 的 `mqtt.publish` 服务发送以下主题：

- 保存当前学习结果：`newchuangan1/ir/save_as`
- 按名字发射：`newchuangan1/ir/send/named`
- 删除按键：`newchuangan1/ir/delete`
- 发射最后学习结果：`newchuangan1/ir/send/last`

动态按钮列表来自：

- `newchuangan1/ir/store`

这个 JSON topic 会映射到 `sensor.esp_ir_store` 的 attributes，卡片再根据这些 attributes 自动生成按钮。

## 备注

- 卡片依赖 Home Assistant 的 `mqtt.publish` 服务
- 你的 ESPHome 红外网关必须已经连接到同一个 MQTT 服务器
- 当 retained 的红外键库变化时，按钮会自动更新
