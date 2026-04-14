class EspIrMqttCard extends HTMLElement {
  static TRANSLATIONS = {
    en: {
      title: "ESP IR Remote Panel",
      subtitle: "Learn IR codes first, then save, send, and delete buttons in Home Assistant.",
      storeEntityRequired: "store_entity is required",
      topicPrefixRequired: "topic_prefix is required",
      enterKeyName: "Please enter a key name",
      savedAs: "Saved as {value}",
      sendingNamed: "Sending {name}",
      deletedNamed: "Deleted {name}",
      sendingLast: "Sending the most recently learned code",
      badge: "State: {state}",
      placeholder: "Enter a key name, e.g. AC Power or ac_power_on",
      saveCurrent: "Save Current Learned Code",
      sendLast: "Send Last Learned Code",
      unavailable: "Store entity <strong>{entity}</strong> is unavailable. Please create the MQTT sensor first, then reload Home Assistant.",
      sendTopic: "Send topic:",
      sendPayload: "Payload:",
      send: "Send",
      delete: "Delete",
      confirmDelete: "Confirm Delete",
      empty: "No saved keys yet. Learn an IR code first, then click “Save Current Learned Code”.",
      mqttStatus: "MQTT:",
      connected: "Connected",
      disconnected: "Disconnected",
      mqttOfflineNotice: "MQTT is disconnected. All controls are disabled until the connection is restored.",
      editorTitle: "Title",
      editorStoreEntity: "Store entity",
      editorMqttStatusEntity: "MQTT status entity",
      editorTopicPrefix: "Topic prefix",
      editorColumns: "Columns",
      editorDefaultName: "Default key name",
      editorLanguage: "Language",
    },
    zh: {
      title: "红外按键面板",
      subtitle: "先学习红外，再在 Home Assistant 里保存、发射和删除按钮。",
      storeEntityRequired: "store_entity 是必填项",
      topicPrefixRequired: "topic_prefix 是必填项",
      enterKeyName: "请先输入按键名称",
      savedAs: "已保存为 {value}",
      sendingNamed: "正在发送 {name}",
      deletedNamed: "已删除 {name}",
      sendingLast: "正在发送最近学习结果",
      badge: "当前状态：{state}",
      placeholder: "输入按键名称，例如 空调打开 或 ac_power_on",
      saveCurrent: "一键保存当前学习结果",
      sendLast: "发送最近学习结果",
      unavailable: "存储实体 <strong>{entity}</strong> 当前不可用。请先创建 MQTT 传感器，然后重载 Home Assistant。",
      sendTopic: "发送主题：",
      sendPayload: "发送内容：",
      send: "发送",
      delete: "删除",
      confirmDelete: "确认删除",
      empty: "还没有保存任何按键。请先学习红外，然后点击“一键保存当前学习结果”。",
      mqttStatus: "MQTT：",
      connected: "连接",
      disconnected: "未连接",
      mqttOfflineNotice: "MQTT 未连接，下面的输入框和按钮已禁用，连接恢复后才可使用。",
      editorTitle: "标题",
      editorStoreEntity: "存储实体",
      editorMqttStatusEntity: "MQTT 状态实体",
      editorTopicPrefix: "主题前缀",
      editorColumns: "列数",
      editorDefaultName: "默认按键名",
      editorLanguage: "语言",
    },
    ru: {
      title: "Панель ИК-кнопок",
      subtitle: "Сначала обучите ИК-коды, затем сохраняйте, отправляйте и удаляйте кнопки в Home Assistant.",
      storeEntityRequired: "store_entity обязателен",
      topicPrefixRequired: "topic_prefix обязателен",
      enterKeyName: "Сначала введите имя кнопки",
      savedAs: "Сохранено как {value}",
      sendingNamed: "Отправка {name}",
      deletedNamed: "Удалено {name}",
      sendingLast: "Отправка последнего изученного кода",
      badge: "Состояние: {state}",
      placeholder: "Введите имя кнопки, например AC Power или ac_power_on",
      saveCurrent: "Сохранить текущий код",
      sendLast: "Отправить последний код",
      unavailable: "Сущность хранилища <strong>{entity}</strong> недоступна. Сначала создайте MQTT-сенсор, затем перезагрузите Home Assistant.",
      sendTopic: "Тема отправки:",
      sendPayload: "Полезная нагрузка:",
      send: "Отправить",
      delete: "Удалить",
      confirmDelete: "Подтвердить удаление",
      empty: "Сохраненных кнопок пока нет. Сначала изучите ИК-код, затем нажмите «Сохранить текущий код».",
      mqttStatus: "MQTT:",
      connected: "Подключено",
      disconnected: "Не подключено",
      mqttOfflineNotice: "MQTT отключен. Все элементы управления заблокированы до восстановления подключения.",
      editorTitle: "Заголовок",
      editorStoreEntity: "Сущность хранилища",
      editorMqttStatusEntity: "Сущность статуса MQTT",
      editorTopicPrefix: "Префикс topic",
      editorColumns: "Колонки",
      editorDefaultName: "Имя кнопки по умолчанию",
      editorLanguage: "Язык",
    },
  };

  static getConfigElement() {
    return document.createElement("esp-ir-mqtt-card-editor");
  }

  static getStubConfig() {
    return {
      store_entity: "sensor.esp_ir_store",
      mqtt_status_entity: "binary_sensor.esp_ir_device_online",
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
    const language = this._resolveLanguage(config.language);
    this._config = {
      title: EspIrMqttCard.TRANSLATIONS[language].title,
      columns: 3,
      default_example_name: "test_ir",
      mqtt_status_entity: "binary_sensor.esp_ir_device_online",
      language,
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

  _getMqttStatusEntity() {
    return this._config?.mqtt_status_entity
      ? this._hass?.states?.[this._config.mqtt_status_entity]
      : null;
  }

  _getMqttStatusInfo() {
    const stateObj = this._getMqttStatusEntity();
    const rawState = (stateObj?.state ?? "").toString();
    const normalized = rawState.trim().toLowerCase();

    const disconnectedTokens = [
      "disconnected",
      "disconnect",
      "offline",
      "off",
      "false",
      "unavailable",
      "unknown",
      "未连接",
      "离线",
      "断开",
    ];
    const connectedTokens = [
      "connected",
      "connect",
      "online",
      "on",
      "true",
      "连接",
      "已连接",
      "在线",
      "连接成功",
    ];

    const matchesToken = (tokens) =>
      tokens.some((token) => normalized === token || normalized.includes(token));

    let connectionState = "disconnected";
    if (!stateObj || !normalized) {
      connectionState = "disconnected";
    } else if (matchesToken(disconnectedTokens)) {
      connectionState = "disconnected";
    } else if (matchesToken(connectedTokens)) {
      connectionState = "connected";
    }

    return {
      connectionState,
      rawState: rawState || "unknown",
      entityId: this._config?.mqtt_status_entity || "",
    };
  }

  _resolveLanguage(lang) {
    const normalized = (lang || "").toLowerCase();
    if (normalized.startsWith("zh")) return "zh";
    if (normalized.startsWith("ru")) return "ru";
    if (normalized.startsWith("en")) return "en";
    const hassLang = (this._hass?.language || this._hass?.locale?.language || "").toLowerCase();
    if (hassLang.startsWith("zh")) return "zh";
    if (hassLang.startsWith("ru")) return "ru";
    return "en";
  }

  _t(key, vars = {}) {
    const language = this._resolveLanguage(this._config?.language);
    const pack = EspIrMqttCard.TRANSLATIONS[language] || EspIrMqttCard.TRANSLATIONS.en;
    const template = pack[key] || EspIrMqttCard.TRANSLATIONS.en[key] || key;
    return template.replace(/\{(\w+)\}/g, (_match, name) => (vars[name] ?? "").toString());
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
    if (this._getMqttStatusInfo().connectionState !== "connected") {
      return;
    }
    const input = this.shadowRoot?.getElementById("save-name");
    const value = input?.value?.trim();
    if (!value) {
      this._toast(this._t("enterKeyName"));
      return;
    }
    this._publish(`${this._config.topic_prefix}/save_as`, value);
    input.value = "";
    this._toast(this._t("savedAs", { value }));
  }

  _sendNamed(name) {
    if (this._getMqttStatusInfo().connectionState !== "connected") {
      return;
    }
    this._publish(`${this._config.topic_prefix}/send/named`, name);
    this._toast(this._t("sendingNamed", { name }));
  }

  _deleteNamed(name) {
    if (this._getMqttStatusInfo().connectionState !== "connected") {
      return;
    }
    this._publish(`${this._config.topic_prefix}/delete`, name);
    this._pendingDelete = null;
    this._toast(this._t("deletedNamed", { name }));
    this._render();
  }

  _sendLast() {
    if (this._getMqttStatusInfo().connectionState !== "connected") {
      return;
    }
    this._publish(`${this._config.topic_prefix}/send/last`, "1");
    this._toast(this._t("sendingLast"));
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
    const exampleName = this._config.default_example_name || "test_ir";
    const sendNamedTopic = `${this._config.topic_prefix}/send/named`;
    const title = this._config.title || this._t("title");
    const subtitle = this._t("subtitle");
    const badge = this._t("badge", { state: entityState });
    const mqttStatus = this._getMqttStatusInfo();
    const mqttConnected = mqttStatus.connectionState === "connected";
    const mqttStatusText = this._t(mqttStatus.connectionState);
    const mqttStatusLabel = this._t("mqttStatus");
    const mqttOfflineNotice = this._t("mqttOfflineNotice");
    const placeholder = this._t("placeholder");
    const saveCurrent = this._t("saveCurrent");
    const sendLast = this._t("sendLast");
    const unavailable = this._t("unavailable", { entity: this._config.store_entity });
    const sendTopic = this._t("sendTopic");
    const sendPayload = this._t("sendPayload");
    const send = this._t("send");
    const deleteLabel = this._t("delete");
    const confirmDelete = this._t("confirmDelete");
    const empty = this._t("empty");

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
        .hero > div:first-child {
          min-width: 0;
          flex: 1 1 auto;
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
          border-radius: 18px;
          padding: 8px 12px;
          font-size: 0.82rem;
          white-space: normal;
          overflow-wrap: anywhere;
          word-break: break-word;
          line-height: 1.45;
          flex: 0 1 340px;
          max-width: 100%;
          text-align: left;
        }
        .status-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
          color: var(--esp-ir-text);
          font-size: 0.84rem;
          font-weight: 600;
        }
        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex: 0 0 10px;
          background: #9ca3af;
          box-shadow: 0 0 0 3px rgba(156, 163, 175, 0.14);
        }
        .status-dot.connected {
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.14);
        }
        .status-dot.disconnected {
          background: #9ca3af;
          box-shadow: 0 0 0 3px rgba(156, 163, 175, 0.14);
        }
        .status-label {
          color: var(--esp-ir-muted);
          font-weight: 500;
        }
        .offline-note {
          margin-bottom: 16px;
          padding: 12px 14px;
          border-radius: 16px;
          background: rgba(156, 163, 175, 0.12);
          border: 1px solid rgba(156, 163, 175, 0.24);
          color: var(--esp-ir-muted);
          font-size: 0.88rem;
          line-height: 1.5;
        }
        .controls {
          display: grid;
          grid-template-columns: 1.6fr auto auto;
          gap: 10px;
          margin-bottom: 18px;
        }
        .topic code {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 999px;
          background: rgba(15, 118, 110, 0.08);
          color: #0f5e57;
          font-size: 0.84rem;
          word-break: break-all;
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
        button:disabled,
        input:disabled {
          cursor: not-allowed;
          opacity: 0.5;
          transform: none;
        }
        button:disabled:hover {
          transform: none;
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
        .topic {
          color: var(--esp-ir-muted);
          font-size: 0.82rem;
          line-height: 1.55;
          word-break: break-word;
        }
        .key-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .key-actions button {
          flex: 1 1 calc(50% - 4px);
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
          .badge {
            width: 100%;
            box-sizing: border-box;
            flex-basis: auto;
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
              <div class="title">${title}</div>
              <div class="subtitle">${subtitle}</div>
            </div>
            <div class="badge">
              <div>${badge}</div>
              <div class="status-row">
                <span class="status-dot ${mqttStatus.connectionState}"></span>
                <span class="status-label">${mqttStatusLabel}</span>
                <span>${mqttStatusText}</span>
              </div>
            </div>
          </div>

          <div class="controls">
            <input id="save-name" value="${exampleName}" placeholder="${placeholder}" ${mqttConnected ? "" : "disabled"} />
            <button class="primary" id="save-btn" ${mqttConnected ? "" : "disabled"}>${saveCurrent}</button>
            <button class="secondary" id="send-last-btn" ${mqttConnected ? "" : "disabled"}>${sendLast}</button>
          </div>

          ${
            !stateObj
              ? `<div class="error">${unavailable}</div>`
              : ""
          }

          ${
            mqttConnected
              ? ""
              : `<div class="offline-note">${mqttOfflineNotice}</div>`
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
                          <div class="topic">
                            ${sendTopic}<code>${sendNamedTopic}</code><br />
                            ${sendPayload}<code>${key}</code>
                          </div>
                          <div class="key-actions">
                            <button class="primary send-btn" data-key="${key}" ${mqttConnected ? "" : "disabled"}>${send}</button>
                            ${
                              confirming
                                ? `<button class="confirm delete-confirm-btn" data-key="${key}" ${mqttConnected ? "" : "disabled"}>${confirmDelete}</button>`
                                : `<button class="delete delete-btn" data-key="${key}" ${mqttConnected ? "" : "disabled"}>${deleteLabel}</button>`
                            }
                          </div>
                        </div>
                      `;
                    })
                    .join("")
                : `<div class="empty">${empty}</div>`
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
        if (!mqttConnected) {
          return;
        }
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
  static TRANSLATIONS = EspIrMqttCard.TRANSLATIONS;

  setConfig(config) {
    this._config = config;
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _resolveLanguage(lang) {
    const normalized = (lang || "").toLowerCase();
    if (normalized.startsWith("zh")) return "zh";
    if (normalized.startsWith("ru")) return "ru";
    if (normalized.startsWith("en")) return "en";
    const hassLang = (this._hass?.language || this._hass?.locale?.language || "").toLowerCase();
    if (hassLang.startsWith("zh")) return "zh";
    if (hassLang.startsWith("ru")) return "ru";
    return "en";
  }

  _t(key) {
    const language = this._resolveLanguage(this._config?.language);
    const pack = EspIrMqttCardEditor.TRANSLATIONS[language] || EspIrMqttCardEditor.TRANSLATIONS.en;
    return pack[key] || EspIrMqttCardEditor.TRANSLATIONS.en[key] || key;
  }

  _valueChanged(ev) {
    const target = ev.target;
    const key = target.getAttribute("configValue");
    if (!key) {
      return;
    }

    const nextConfig = { ...this._config };
    const value = target.type === "number" ? Number(target.value) : target.value;

    if (target.value === "") {
      delete nextConfig[key];
    } else {
      nextConfig[key] = value;
    }

    this._config = nextConfig;
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: nextConfig },
      bubbles: true,
      composed: true,
    }));
  }

  _render() {
    if (!this.shadowRoot || !this._config) {
      return;
    }

    const config = {
      columns: 3,
      default_example_name: "test_ir",
      mqtt_status_entity: "binary_sensor.esp_ir_device_online",
      ...this._config,
    };

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .form {
          display: grid;
          gap: 12px;
        }
        .field {
          display: grid;
          gap: 6px;
        }
        label {
          font-size: 0.85rem;
          color: var(--secondary-text-color);
          font-weight: 600;
        }
        input,
        select {
          width: 100%;
          box-sizing: border-box;
          padding: 10px 12px;
          border: 1px solid var(--divider-color);
          border-radius: 10px;
          background: var(--card-background-color);
          color: var(--primary-text-color);
          font: inherit;
        }
      </style>
      <div class="form">
        <div class="field">
          <label>${this._t("editorTitle")}</label>
          <input value="${config.title || ""}" configValue="title" />
        </div>
        <div class="field">
          <label>${this._t("editorStoreEntity")}</label>
          <input value="${config.store_entity || ""}" configValue="store_entity" />
        </div>
        <div class="field">
          <label>${this._t("editorMqttStatusEntity")}</label>
          <input value="${config.mqtt_status_entity || ""}" configValue="mqtt_status_entity" />
        </div>
        <div class="field">
          <label>${this._t("editorTopicPrefix")}</label>
          <input value="${config.topic_prefix || ""}" configValue="topic_prefix" />
        </div>
        <div class="field">
          <label>${this._t("editorColumns")}</label>
          <input type="number" min="1" max="6" value="${config.columns || 3}" configValue="columns" />
        </div>
        <div class="field">
          <label>${this._t("editorDefaultName")}</label>
          <input value="${config.default_example_name || ""}" configValue="default_example_name" />
        </div>
        <div class="field">
          <label>${this._t("editorLanguage")}</label>
          <select configValue="language">
            <option value="zh" ${config.language === "zh" ? "selected" : ""}>中文</option>
            <option value="en" ${config.language === "en" ? "selected" : ""}>English</option>
            <option value="ru" ${config.language === "ru" ? "selected" : ""}>Русский</option>
          </select>
        </div>
      </div>
    `;

    this.shadowRoot.querySelectorAll("input, select").forEach((field) => {
      field.addEventListener("change", (ev) => this._valueChanged(ev));
      field.addEventListener("input", (ev) => this._valueChanged(ev));
    });
  }
}

customElements.define("esp-ir-mqtt-card", EspIrMqttCard);
customElements.define("esp-ir-mqtt-card-editor", EspIrMqttCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "esp-ir-mqtt-card",
  name: "ESP IR MQTT Card",
  preview: true,
  description: "Multilingual ESPHome MQTT infrared card for Home Assistant.",
});
