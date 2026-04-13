class EspIrMqttCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement("esp-ir-mqtt-card-editor");
  }

  static getStubConfig() {
    return {
      store_entity: "sensor.esp_ir_store",
      topic_prefix: "newchuangan1/ir",
      title: "红外按键面板",
    };
  }

  setConfig(config) {
    if (!config.store_entity) {
      throw new Error("store_entity is required");
    }
    if (!config.topic_prefix) {
      throw new Error("topic_prefix is required");
    }
    this._config = {
      title: "红外按键面板",
      columns: 3,
      ...config,
    };
    this._pendingDelete = null;
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  getCardSize() {
    return 6;
  }

  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      rows: 8,
    };
  }

  _publish(topic, payload) {
    return this._hass.callService("mqtt", "publish", {
      topic,
      payload,
      qos: 0,
      retain: false,
    });
  }

  _getStoreEntity() {
    return this._hass?.states?.[this._config.store_entity];
  }

  _extractKeys(stateObj) {
    if (!stateObj) {
      return [];
    }

    const keys = new Set();

    if (typeof stateObj.state === "string" && stateObj.state.trim().startsWith("{")) {
      try {
        const parsed = JSON.parse(stateObj.state);
        Object.keys(parsed).forEach((key) => keys.add(key));
      } catch (_err) {
        // Ignore invalid JSON state and fall back to attributes.
      }
    }

    const ignored = new Set([
      "friendly_name",
      "icon",
      "device_class",
      "state_class",
      "unit_of_measurement",
      "entity_picture",
      "attribution",
      "assumed_state",
      "supported_features",
      "restored",
    ]);

    Object.keys(stateObj.attributes || {}).forEach((key) => {
      if (!ignored.has(key) && !key.startsWith("_")) {
        keys.add(key);
      }
    });

    return [...keys].sort((a, b) => a.localeCompare(b));
  }

  _saveCurrent() {
    const input = this.shadowRoot?.getElementById("save-name");
    const value = input?.value?.trim();
    if (!value) {
      this._toast("请先输入按键名称");
      return;
    }
    this._publish(`${this._config.topic_prefix}/save_as`, value);
    input.value = "";
    this._toast(`已保存为 ${value}`);
  }

  _sendNamed(name) {
    this._publish(`${this._config.topic_prefix}/send/named`, name);
    this._toast(`正在发送 ${name}`);
  }

  _deleteNamed(name) {
    this._publish(`${this._config.topic_prefix}/delete`, name);
    this._pendingDelete = null;
    this._toast(`已删除 ${name}`);
    this._render();
  }

  _sendLast() {
    this._publish(`${this._config.topic_prefix}/send/last`, "1");
    this._toast("正在发送最近学习结果");
  }

  _toast(message) {
    if (!this._hass) return;
    const event = new CustomEvent("hass-notification", {
      bubbles: true,
      composed: true,
      detail: { message },
    });
    this.dispatchEvent(event);
  }

  _render() {
    if (!this.shadowRoot || !this._config) {
      return;
    }

    const stateObj = this._getStoreEntity();
    const keys = this._extractKeys(stateObj);
    const columns = Math.max(1, Number(this._config.columns) || 3);
    const entityState = stateObj ? stateObj.state : "unavailable";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --esp-ir-accent: #0f766e;
          --esp-ir-accent-soft: #ccfbf1;
          --esp-ir-border: rgba(15, 118, 110, 0.18);
          --esp-ir-surface: linear-gradient(180deg, #f8fffd 0%, #eefbf8 100%);
          --esp-ir-text: #163331;
          --esp-ir-muted: #5e7874;
          display: block;
        }
        ha-card {
          background: var(--esp-ir-surface);
          border: 1px solid var(--esp-ir-border);
          border-radius: 22px;
          overflow: hidden;
        }
        .wrap {
          padding: 18px;
          color: var(--esp-ir-text);
        }
        .hero {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: flex-start;
          margin-bottom: 16px;
        }
        .title {
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: 0.01em;
        }
        .subtitle {
          color: var(--esp-ir-muted);
          font-size: 0.92rem;
          margin-top: 4px;
        }
        .badge {
          background: rgba(255,255,255,0.8);
          border: 1px solid var(--esp-ir-border);
          border-radius: 999px;
          padding: 8px 12px;
          font-size: 0.82rem;
          white-space: nowrap;
        }
        .controls {
          display: grid;
          grid-template-columns: 1.6fr auto auto;
          gap: 10px;
          margin-bottom: 18px;
        }
        input {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid rgba(22, 51, 49, 0.12);
          border-radius: 14px;
          padding: 12px 14px;
          outline: none;
          font-size: 0.95rem;
          background: rgba(255,255,255,0.92);
          color: var(--esp-ir-text);
        }
        input:focus {
          border-color: var(--esp-ir-accent);
          box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.12);
        }
        button {
          border: 0;
          border-radius: 14px;
          padding: 12px 14px;
          font-size: 0.94rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 120ms ease, opacity 120ms ease, background 120ms ease;
        }
        button:hover {
          transform: translateY(-1px);
        }
        .primary {
          background: var(--esp-ir-accent);
          color: white;
        }
        .secondary {
          background: white;
          color: var(--esp-ir-text);
          border: 1px solid var(--esp-ir-border);
        }
        .keys {
          display: grid;
          grid-template-columns: repeat(${columns}, minmax(0, 1fr));
          gap: 12px;
        }
        .key {
          background: rgba(255,255,255,0.88);
          border: 1px solid rgba(22, 51, 49, 0.08);
          border-radius: 18px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-height: 104px;
        }
        .key-name {
          font-weight: 700;
          line-height: 1.3;
          word-break: break-word;
        }
        .key-actions {
          display: flex;
          gap: 8px;
        }
        .key-actions button {
          flex: 1;
          padding: 10px 12px;
          font-size: 0.88rem;
        }
        .delete {
          background: #fff1f2;
          color: #be123c;
          border: 1px solid rgba(190, 18, 60, 0.14);
        }
        .confirm {
          background: #be123c;
          color: white;
        }
        .empty {
          padding: 24px 14px;
          text-align: center;
          color: var(--esp-ir-muted);
          background: rgba(255,255,255,0.6);
          border-radius: 18px;
          border: 1px dashed rgba(22, 51, 49, 0.15);
        }
        .error {
          padding: 18px 16px;
          margin-bottom: 16px;
          border-radius: 18px;
          background: #fff7ed;
          color: #9a3412;
          border: 1px solid rgba(154, 52, 18, 0.15);
          line-height: 1.5;
        }
        @media (max-width: 720px) {
          .hero {
            flex-direction: column;
          }
          .controls {
            grid-template-columns: 1fr;
          }
          .keys {
            grid-template-columns: 1fr 1fr;
          }
        }
      </style>
      <ha-card>
        <div class="wrap">
          <div class="hero">
            <div>
              <div class="title">${this._config.title}</div>
              <div class="subtitle">先在 ESPHome 上学习红外，再在 Home Assistant 里保存、发射和删除按键。</div>
            </div>
            <div class="badge">存储实体：${this._config.store_entity} | 当前状态：${entityState}</div>
          </div>

          <div class="controls">
            <input id="save-name" placeholder="输入按键名称，例如 空调打开 或 ac_power_on" />
            <button class="primary" id="save-btn">一键保存当前学习结果</button>
            <button class="secondary" id="send-last-btn">发送最近学习结果</button>
          </div>

          ${
            !stateObj
              ? `<div class="error">存储实体 <strong>${this._config.store_entity}</strong> 当前不可用。请先创建 MQTT 传感器，然后重载 Home Assistant。</div>`
              : ""
          }

          <div class="keys">
            ${
              keys.length
                ? keys
                    .map((key) => {
                      const confirming = this._pendingDelete === key;
                      return `
                        <div class="key">
                          <div class="key-name">${key}</div>
                          <div class="key-actions">
                            <button class="primary send-btn" data-key="${key}">发送</button>
                            ${
                              confirming
                                ? `<button class="confirm delete-confirm-btn" data-key="${key}">确认删除</button>`
                                : `<button class="delete delete-btn" data-key="${key}">删除</button>`
                            }
                          </div>
                        </div>
                      `;
                    })
                    .join("")
                : `<div class="empty">还没有保存任何按键。请先学习红外，然后点击“一键保存当前学习结果”。</div>`
            }
          </div>
        </div>
      </ha-card>
    `;

    this.shadowRoot.getElementById("save-btn")?.addEventListener("click", () => this._saveCurrent());
    this.shadowRoot.getElementById("send-last-btn")?.addEventListener("click", () => this._sendLast());
    this.shadowRoot.querySelectorAll(".send-btn").forEach((button) => {
      button.addEventListener("click", (ev) => this._sendNamed(ev.currentTarget.dataset.key));
    });
    this.shadowRoot.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", (ev) => {
        this._pendingDelete = ev.currentTarget.dataset.key;
        this._render();
      });
    });
    this.shadowRoot.querySelectorAll(".delete-confirm-btn").forEach((button) => {
      button.addEventListener("click", (ev) => this._deleteNamed(ev.currentTarget.dataset.key));
    });
  }
}

class EspIrMqttCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = config;
  }
}

customElements.define("esp-ir-mqtt-card", EspIrMqttCard);
customElements.define("esp-ir-mqtt-card-editor", EspIrMqttCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "esp-ir-mqtt-card",
  name: "ESP 红外遥控卡片",
  preview: true,
  description: "为 ESPHome MQTT 红外网关动态生成中文按键按钮。",
});
