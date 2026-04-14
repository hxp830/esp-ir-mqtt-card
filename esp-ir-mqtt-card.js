class EspIrMqttCard extends HTMLElement {
  static DEFAULT_MQTT_STATUS_ENTITY = "binary_sensor.esp_ir_mqtt_online";
  static LEGACY_MQTT_STATUS_ENTITIES = new Set([
    "binary_sensor.esp_ir_device_online",
  ]);
  static DEFAULT_LEARNED_ENTITY = "sensor.esp_ir_last_learned";

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
      startLearn: "Start Learning",
      learning: "Listening for IR",
      learnWaiting: "Waiting for a newly learned IR code. Point the remote at the receiver and press a button.",
      learnCaptured: "New IR code captured.",
      learnQuestion: "Save this IR command?",
      learnNamePrompt: "Enter a name for this IR command",
      confirmSaveLearned: "Save Command",
      testLearned: "Test Command",
      cancel: "Cancel",
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
      learnedEntityRequired: "learned_entity is required",
      learnedUnavailable: "Learned entity <strong>{entity}</strong> is unavailable. Please create it first.",
      learnedPreview: "Learned code preview:",
      editorLearnEventEntity: "Learn event entity",
      editorTitle: "Title",
      editorStoreEntity: "Store entity",
      editorLearnedEntity: "Learned entity",
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
      startLearn: "开始学习",
      learning: "正在等待红外",
      learnWaiting: "正在等待新的红外学习结果。请将遥控器对准接收头并按下按键。",
      learnCaptured: "检测到新的红外命令。",
      learnQuestion: "是否保存这个红外命令？",
      learnNamePrompt: "请输入这个红外命令的名称",
      confirmSaveLearned: "确认学习",
      testLearned: "测试这个命令",
      cancel: "取消",
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
      learnedEntityRequired: "learned_entity 是必填项",
      learnedUnavailable: "学习实体 <strong>{entity}</strong> 当前不可用。请先创建它。",
      learnedPreview: "学习结果预览：",
      editorLearnEventEntity: "学习事件实体",
      editorTitle: "标题",
      editorStoreEntity: "存储实体",
      editorLearnedEntity: "学习结果实体",
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
      startLearn: "Начать обучение",
      learning: "Ожидание ИК",
      learnWaiting: "Ожидание нового изученного ИК-кода. Направьте пульт на приемник и нажмите кнопку.",
      learnCaptured: "Новый ИК-код получен.",
      learnQuestion: "Сохранить эту ИК-команду?",
      learnNamePrompt: "Введите имя для этой ИК-команды",
      confirmSaveLearned: "Сохранить команду",
      testLearned: "Проверить команду",
      cancel: "Отмена",
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
      learnedEntityRequired: "learned_entity обязателен",
      learnedUnavailable: "Сущность изученного кода <strong>{entity}</strong> недоступна. Сначала создайте ее.",
      learnedPreview: "Предпросмотр изученного кода:",
      editorLearnEventEntity: "Сущность события обучения",
      editorTitle: "Заголовок",
      editorStoreEntity: "Сущность хранилища",
      editorLearnedEntity: "Сущность изученного кода",
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
      learned_entity: EspIrMqttCard.DEFAULT_LEARNED_ENTITY,
      learn_event_entity: "",
      mqtt_status_entity: EspIrMqttCard.DEFAULT_MQTT_STATUS_ENTITY,
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
    const mqttStatusEntity = this._normalizeMqttStatusEntity(config.mqtt_status_entity);
    const learnEventEntity = this._normalizeLearnEventEntity(config.learn_event_entity, config.topic_prefix);
    this._config = {
      title: EspIrMqttCard.TRANSLATIONS[language].title,
      columns: 3,
      default_example_name: "test_ir",
      learned_entity: EspIrMqttCard.DEFAULT_LEARNED_ENTITY,
      learn_event_entity: learnEventEntity,
      mqtt_status_entity: mqttStatusEntity,
      language,
      ...config,
      learn_event_entity: learnEventEntity,
      mqtt_status_entity: mqttStatusEntity,
    };
    this._pendingDelete = null;
    this._learnDialog = null;
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }
    this._render();
  }

  set hass(hass) {
    const previousLearned = this._getLearnEventMarker();
    this._hass = hass;
    this._handleLearnedStateChange(previousLearned, this._getLearnEventMarker());
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

  _getLearnedEntity() {
    return this._config?.learned_entity
      ? this._hass?.states?.[this._config.learned_entity]
      : null;
  }

  _getLearnEventEntity() {
    return this._config?.learn_event_entity
      ? this._hass?.states?.[this._config.learn_event_entity]
      : null;
  }

  _getLearnedStateValue() {
    return (this._getLearnedEntity()?.state || "").toString();
  }

  _getLearnEventMarker() {
    const eventEntity = this._getLearnEventEntity();
    if (eventEntity) {
      return (eventEntity.state || "").toString();
    }
    return this._getLearnedStateValue();
  }

  _normalizeMqttStatusEntity(entityId) {
    const normalized = (entityId || "").trim();
    if (!normalized || EspIrMqttCard.LEGACY_MQTT_STATUS_ENTITIES.has(normalized)) {
      return EspIrMqttCard.DEFAULT_MQTT_STATUS_ENTITY;
    }
    return normalized;
  }

  _normalizeLearnEventEntity(entityId, topicPrefix) {
    const normalized = (entityId || "").trim();
    if (normalized) {
      return normalized;
    }
    const prefixRoot = ((topicPrefix || "").split("/")[0] || "").trim();
    if (!prefixRoot) {
      return "";
    }
    return `sensor.${prefixRoot}_ir_learn_event`;
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

  _handleLearnedStateChange(previousValue, nextValue) {
    if (!this._learnDialog || this._learnDialog.step !== "waiting") {
      return;
    }

    const next = (nextValue || "").trim();
    const baseline = (this._learnDialog.baseline || "").trim();
    if (!next || next === baseline || next === previousValue) {
      return;
    }

    this._learnDialog = {
      ...this._learnDialog,
      step: "review",
      captured: next,
    };
  }

  _startLearning() {
    if (this._getMqttStatusInfo().connectionState !== "connected") {
      return;
    }
    if (!this._getLearnedEntity()) {
      this._toast(this._t("learnedUnavailable", { entity: this._config.learned_entity }).replace(/<[^>]+>/g, ""));
      return;
    }
    this._learnDialog = {
      step: "waiting",
      baseline: this._getLearnEventMarker(),
      captured: "",
      name: this._config.default_example_name || "",
    };
    this._render();
  }

  _cancelLearning() {
    this._learnDialog = null;
    this._render();
  }

  _moveLearningToNaming() {
    if (!this._learnDialog) {
      return;
    }
    this._learnDialog = {
      ...this._learnDialog,
      step: "naming",
      name: this._learnDialog.name || this._config.default_example_name || "",
    };
    this._render();
    queueMicrotask(() => {
      this.shadowRoot?.getElementById("learn-name")?.focus();
    });
  }

  _updateLearnName(value) {
    if (!this._learnDialog) {
      return;
    }
    this._learnDialog = {
      ...this._learnDialog,
      name: value,
    };
  }

  _saveLearnedCode() {
    if (this._getMqttStatusInfo().connectionState !== "connected" || !this._learnDialog) {
      return;
    }
    const value = (this._learnDialog.name || "").trim();
    if (!value) {
      this._toast(this._t("enterKeyName"));
      return;
    }
    this._publish(`${this._config.topic_prefix}/save_as`, value);
    this._toast(this._t("savedAs", { value }));
    this._learnDialog = null;
    this._render();
  }

  _renderLearnDialog(mqttConnected) {
    if (!this._learnDialog) {
      return "";
    }

    const cancel = this._t("cancel");
    if (this._learnDialog.step === "waiting") {
      return `
        <div class="learn-modal-backdrop">
          <div class="learn-modal">
            <div class="learn-modal-title">${this._t("learning")}</div>
            <div class="learn-modal-text">${this._t("learnWaiting")}</div>
            <div class="learn-modal-actions">
              <button class="secondary" id="learn-cancel-btn">${cancel}</button>
            </div>
          </div>
        </div>
      `;
    }

    const capturedPreview = (this._learnDialog.captured || "").slice(0, 160);
    const previewLabel = this._t("learnedPreview");
    if (this._learnDialog.step === "review") {
      return `
        <div class="learn-modal-backdrop">
          <div class="learn-modal">
            <div class="learn-modal-title">${this._t("learnCaptured")}</div>
            <div class="learn-modal-text">${this._t("learnQuestion")}</div>
            <div class="learn-modal-preview">
              <strong>${previewLabel}</strong><br />
              <code>${capturedPreview}</code>
            </div>
            <div class="learn-modal-actions">
              <button class="secondary" id="learn-test-btn" ${mqttConnected ? "" : "disabled"}>${this._t("testLearned")}</button>
              <button class="primary" id="learn-save-step-btn" ${mqttConnected ? "" : "disabled"}>${this._t("confirmSaveLearned")}</button>
              <button class="secondary" id="learn-cancel-btn">${cancel}</button>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div class="learn-modal-backdrop">
        <div class="learn-modal">
          <div class="learn-modal-title">${this._t("confirmSaveLearned")}</div>
          <div class="learn-modal-text">${this._t("learnNamePrompt")}</div>
          <div class="learn-modal-preview">
            <strong>${previewLabel}</strong><br />
            <code>${capturedPreview}</code>
          </div>
          <input id="learn-name" value="${this._learnDialog.name || ""}" placeholder="${this._t("placeholder")}" ${mqttConnected ? "" : "disabled"} />
          <div class="learn-modal-actions">
            <button class="primary" id="learn-confirm-btn" ${mqttConnected ? "" : "disabled"}>${this._t("confirmSaveLearned")}</button>
            <button class="secondary" id="learn-test-btn" ${mqttConnected ? "" : "disabled"}>${this._t("testLearned")}</button>
            <button class="secondary" id="learn-cancel-btn">${cancel}</button>
          </div>
        </div>
      </div>
    `;
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
    const learnedStateObj = this._getLearnedEntity();
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
    const startLearn = this._t(this._learnDialog?.step === "waiting" ? "learning" : "startLearn");
    const sendLast = this._t("sendLast");
    const unavailable = this._t("unavailable", { entity: this._config.store_entity });
    const learnedUnavailable = this._t("learnedUnavailable", { entity: this._config.learned_entity });
    const sendTopic = this._t("sendTopic");
    const sendPayload = this._t("sendPayload");
    const send = this._t("send");
    const deleteLabel = this._t("delete");
    const confirmDelete = this._t("confirmDelete");
    const empty = this._t("empty");

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --esp-ir-accent: #03a9f4;
          --esp-ir-accent-bg: rgba(3, 169, 244, 0.1);
          --esp-ir-card-bg: var(--ha-card-background, var(--card-background-color, #fff));
          --esp-ir-text-main: var(--primary-text-color, #212121);
          --esp-ir-text-sub: var(--secondary-text-color, #727272);
          --esp-ir-border-radius: 16px;
          --esp-ir-shadow: 0 2px 10px rgba(0,0,0,0.05);
          display: block;
        }

        ha-card {
          background: var(--esp-ir-card-bg);
          border-radius: var(--esp-ir-border-radius);
          box-shadow: var(--esp-ir-shadow);
          border: 1px solid rgba(var(--rgb-primary-text-color), 0.05);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .wrap {
          padding: 24px;
          color: var(--esp-ir-text-main);
          position: relative;
        }

        .hero {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
          gap: 16px;
        }

        .hero > div:first-child {
          min-width: 0;
          flex: 1 1 auto;
        }

        .title {
          font-size: 1.4rem;
          font-weight: 500;
          letter-spacing: -0.02em;
        }

        .subtitle {
          color: var(--esp-ir-text-sub);
          font-size: 0.9rem;
          margin-top: 4px;
          opacity: 0.8;
        }

        .badge {
          background: var(--esp-ir-accent-bg);
          border-radius: 12px;
          padding: 10px 16px;
          font-size: 0.85rem;
          color: var(--esp-ir-accent);
          border: 1px solid rgba(3, 169, 244, 0.2);
          max-width: 40%;
        }

        .status-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 4px;
          font-weight: 500;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-dot.connected {
          background: #4caf50;
          box-shadow: 0 0 8px #4caf50;
        }

        .status-dot.disconnected {
          background: #f44336;
        }

        .status-label {
          color: var(--esp-ir-text-sub);
          font-weight: normal;
        }

        .controls {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }

        button {
          border: none;
          border-radius: 12px;
          padding: 12px 20px;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          outline: none;
        }

        .primary {
          background: var(--esp-ir-accent);
          color: #fff;
          box-shadow: 0 4px 12px rgba(3, 169, 244, 0.3);
        }

        .primary:hover {
          filter: brightness(1.1);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(3, 169, 244, 0.4);
        }

        .secondary {
          background: rgba(var(--rgb-primary-text-color), 0.04);
          color: var(--esp-ir-text-main);
        }

        .secondary:hover {
          background: rgba(var(--rgb-primary-text-color), 0.08);
        }

        button:disabled,
        input:disabled {
          opacity: 0.4;
          transform: none !important;
          box-shadow: none !important;
          cursor: not-allowed;
        }

        .shared-topic {
          background: rgba(var(--rgb-primary-text-color), 0.03);
          border: 1px solid rgba(var(--rgb-primary-text-color), 0.06);
          border-radius: 14px;
          padding: 14px 16px;
          margin-bottom: 18px;
          font-size: 0.8rem;
          color: var(--esp-ir-text-sub);
          line-height: 1.7;
        }

        .shared-topic strong {
          color: var(--esp-ir-text-main);
          font-weight: 600;
        }

        .shared-topic code {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 999px;
          background: rgba(3, 169, 244, 0.1);
          color: var(--esp-ir-accent);
          font-size: 0.8rem;
          word-break: break-all;
        }

        .keys {
          display: grid;
          grid-template-columns: repeat(${columns}, 1fr);
          gap: 16px;
        }

        .key {
          background: rgba(var(--rgb-primary-text-color), 0.02);
          border: 1px solid rgba(var(--rgb-primary-text-color), 0.05);
          border-radius: 16px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 110px;
          transition: border-color 0.2s;
        }

        .key:hover {
          border-color: var(--esp-ir-accent);
        }

        .key-name {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 8px;
          word-break: break-word;
        }

        .key-payload {
          font-size: 0.8rem;
          color: var(--esp-ir-text-sub);
          margin-bottom: 14px;
          font-family: monospace;
          word-break: break-all;
          opacity: 0.72;
        }

        .key-actions {
          display: flex;
          gap: 8px;
        }

        .key-actions button {
          padding: 8px;
          font-size: 0.85rem;
          flex: 1;
          border-radius: 8px;
        }

        .delete {
          background: transparent;
          color: #ef5350;
          opacity: 0.6;
        }

        .delete:hover {
          opacity: 1;
          background: rgba(239, 83, 80, 0.1);
        }

        .confirm {
          background: #ef5350;
          color: white;
        }

        .learn-modal-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 100;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .learn-modal {
          background: var(--esp-ir-card-bg);
          width: 100%;
          max-width: 400px;
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .learn-modal-title {
          font-size: 1.2rem;
          font-weight: 600;
        }

        .learn-modal-text {
          color: var(--esp-ir-text-sub);
          margin-top: 8px;
          line-height: 1.55;
        }

        .learn-modal-preview {
          background: rgba(var(--rgb-primary-text-color), 0.04);
          padding: 12px;
          border-radius: 12px;
          margin: 16px 0;
          font-size: 0.85rem;
        }

        .learn-modal-preview code {
          display: block;
          margin-top: 6px;
          white-space: normal;
          word-break: break-all;
        }

        input {
          background: rgba(var(--rgb-primary-text-color), 0.04);
          border: 1px solid rgba(var(--rgb-primary-text-color), 0.1);
          border-radius: 12px;
          padding: 12px 16px;
          width: 100%;
          box-sizing: border-box;
          color: var(--esp-ir-text-main);
          font-size: 1rem;
          margin-bottom: 16px;
          transition: border-color 0.2s;
        }

        input:focus {
          border-color: var(--esp-ir-accent);
          outline: none;
        }

        .learn-modal-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .learn-modal-actions button {
          flex: 1 1 150px;
        }

        .error,
        .offline-note {
          background: #fff5f5;
          color: #c53030;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 0.9rem;
          margin-bottom: 16px;
          border-left: 4px solid #fc8181;
        }

        .empty {
          grid-column: 1 / -1;
          padding: 40px 20px;
          text-align: center;
          color: var(--esp-ir-text-sub);
          border: 2px dashed rgba(var(--rgb-primary-text-color), 0.1);
          border-radius: 16px;
        }

        @media (max-width: 500px) {
          .keys {
            grid-template-columns: 1fr 1fr;
          }

          .hero {
            flex-direction: column;
            align-items: flex-start;
          }

          .badge {
            max-width: 100%;
            width: 100%;
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
            <button class="primary" id="learn-start-btn" ${mqttConnected ? "" : "disabled"}>${startLearn}</button>
            <button class="secondary" id="send-last-btn" ${mqttConnected ? "" : "disabled"}>${sendLast}</button>
          </div>

          ${
            !stateObj
              ? `<div class="error">${unavailable}</div>`
              : ""
          }

          ${
            learnedStateObj
              ? ""
              : `<div class="error">${learnedUnavailable}</div>`
          }

          ${
            mqttConnected
              ? ""
              : `<div class="offline-note">${mqttOfflineNotice}</div>`
          }

          <div class="shared-topic">
            <div><strong>${sendTopic}</strong> <code>${sendNamedTopic}</code></div>
            <div><strong>${sendPayload}</strong> 按键名称</div>
          </div>

          <div class="keys">
            ${
              keys.length
                ? keys
                    .map((key) => {
                      const confirming = this._pendingDelete === key;
                      return `
                        <div class="key">
                          <div class="key-name">${key}</div>
                          <div class="key-payload">${key}</div>
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

          ${this._renderLearnDialog(mqttConnected)}
        </div>
      </ha-card>
    `;

    this.shadowRoot.getElementById("learn-start-btn")?.addEventListener("click", () => this._startLearning());
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
    this.shadowRoot.getElementById("learn-cancel-btn")?.addEventListener("click", () => this._cancelLearning());
    this.shadowRoot.getElementById("learn-test-btn")?.addEventListener("click", () => this._sendLast());
    this.shadowRoot.getElementById("learn-save-step-btn")?.addEventListener("click", () => this._moveLearningToNaming());
    this.shadowRoot.getElementById("learn-confirm-btn")?.addEventListener("click", () => this._saveLearnedCode());
    this.shadowRoot.getElementById("learn-name")?.addEventListener("input", (ev) => this._updateLearnName(ev.currentTarget.value));
    this.shadowRoot.getElementById("learn-name")?.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        this._saveLearnedCode();
      }
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
      learned_entity: EspIrMqttCard.DEFAULT_LEARNED_ENTITY,
      learn_event_entity: this._config.learn_event_entity || "",
      mqtt_status_entity: EspIrMqttCard.DEFAULT_MQTT_STATUS_ENTITY,
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
          <label>${this._t("editorLearnedEntity")}</label>
          <input value="${config.learned_entity || ""}" configValue="learned_entity" />
        </div>
        <div class="field">
          <label>${this._t("editorLearnEventEntity")}</label>
          <input value="${config.learn_event_entity || ""}" configValue="learn_event_entity" />
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
