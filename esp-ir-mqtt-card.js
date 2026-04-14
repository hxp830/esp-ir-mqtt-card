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
      batchLearn: "Batch Learn",
      batchLearning: "Batch Learning",
      batchLearnWaiting: "Keep pressing remote buttons. Each captured IR code will be added below.",
      batchLearnEmpty: "No IR codes captured yet.",
      batchSaveAll: "Save All",
      batchStop: "Stop",
      batchDelete: "Batch Delete",
      batchDeleteConfirm: "Delete Selected",
      batchDeleteCancel: "Cancel Selection",
      selectedCount: "{count} selected",
      removeCaptured: "Remove",
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
      batchLearn: "批量学习",
      batchLearning: "批量学习中",
      batchLearnWaiting: "持续按遥控器按键即可，检测到的红外命令会不断追加到下面。",
      batchLearnEmpty: "还没有捕获到新的红外命令。",
      batchSaveAll: "统一保存",
      batchStop: "停止",
      batchDelete: "批量删除",
      batchDeleteConfirm: "删除所选",
      batchDeleteCancel: "取消选择",
      selectedCount: "已选择 {count} 项",
      removeCaptured: "移除",
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
      batchLearn: "Пакетное обучение",
      batchLearning: "Пакетное обучение",
      batchLearnWaiting: "Продолжайте нажимать кнопки на пульте. Каждый принятый ИК-код будет добавлен в список ниже.",
      batchLearnEmpty: "Пока не получено ни одного ИК-кода.",
      batchSaveAll: "Сохранить все",
      batchStop: "Остановить",
      batchDelete: "Массовое удаление",
      batchDeleteConfirm: "Удалить выбранные",
      batchDeleteCancel: "Отменить выбор",
      selectedCount: "Выбрано: {count}",
      removeCaptured: "Убрать",
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
    this._batchLearn = null;
    this._batchDeleteMode = false;
    this._selectedKeys = new Set();
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
    if (this._batchLearn?.active) {
      const marker = (nextValue || "").trim();
      const baseline = (this._batchLearn.baseline || "").trim();
      if (marker && marker !== baseline && marker !== previousValue) {
        const code = this._getLearnedStateValue().trim();
        if (code) {
          const itemNumber = (this._batchLearn.items?.length || 0) + 1;
          const baseName = this._config.default_example_name || "ir_key";
          this._batchLearn = {
            ...this._batchLearn,
            baseline: marker,
            items: [
              ...this._batchLearn.items,
              {
                id: `${Date.now()}_${itemNumber}`,
                code,
                name: `${baseName}_${itemNumber}`,
              },
            ],
          };
          this._render();
        }
      }
    }

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

  _startBatchLearning() {
    if (this._getMqttStatusInfo().connectionState !== "connected") {
      return;
    }
    if (!this._getLearnedEntity()) {
      this._toast(this._t("learnedUnavailable", { entity: this._config.learned_entity }).replace(/<[^>]+>/g, ""));
      return;
    }
    this._batchLearn = {
      active: true,
      baseline: this._getLearnEventMarker(),
      items: [],
    };
    this._render();
  }

  _stopBatchLearning() {
    this._batchLearn = null;
    this._render();
  }

  _updateBatchItemName(id, value) {
    if (!this._batchLearn) return;
    this._batchLearn = {
      ...this._batchLearn,
      items: this._batchLearn.items.map((item) => item.id === id ? { ...item, name: value } : item),
    };
  }

  _removeBatchItem(id) {
    if (!this._batchLearn) return;
    this._batchLearn = {
      ...this._batchLearn,
      items: this._batchLearn.items.filter((item) => item.id !== id),
    };
    this._render();
  }

  _testPronto(code) {
    if (this._getMqttStatusInfo().connectionState !== "connected" || !code) {
      return;
    }
    this._publish(`${this._config.topic_prefix}/send/pronto`, code);
  }

  async _saveBatchLearned() {
    if (!this._batchLearn || this._getMqttStatusInfo().connectionState !== "connected") {
      return;
    }
    const items = this._batchLearn.items
      .map((item) => ({ ...item, name: (item.name || "").trim() }))
      .filter((item) => item.name && item.code);
    if (!items.length) {
      this._toast(this._t("batchLearnEmpty"));
      return;
    }
    for (const item of items) {
      await this._publish(`${this._config.topic_prefix}/save_payload`, JSON.stringify({
        key: item.name,
        code: item.code,
      }));
    }
    this._toast(this._t("savedAs", { value: `${items.length}` }));
    this._batchLearn = null;
    this._render();
  }

  _toggleBatchDeleteMode() {
    this._batchDeleteMode = !this._batchDeleteMode;
    if (!this._batchDeleteMode) {
      this._selectedKeys = new Set();
    }
    this._render();
  }

  _toggleKeySelection(key) {
    if (!this._batchDeleteMode) return;
    if (this._selectedKeys.has(key)) {
      this._selectedKeys.delete(key);
    } else {
      this._selectedKeys.add(key);
    }
    this._render();
  }

  async _deleteSelectedKeys() {
    if (!this._batchDeleteMode || !this._selectedKeys.size) {
      return;
    }
    const keys = [...this._selectedKeys];
    for (const key of keys) {
      await this._publish(`${this._config.topic_prefix}/delete`, key);
    }
    this._selectedKeys = new Set();
    this._batchDeleteMode = false;
    this._pendingDelete = null;
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

  _renderBatchLearnPanel(mqttConnected) {
    if (!this._batchLearn?.active) {
      return "";
    }
    const items = this._batchLearn.items || [];
    return `
      <div class="batch-panel">
        <div class="batch-panel-head">
          <div>
            <div class="batch-panel-title">${this._t("batchLearning")}</div>
            <div class="batch-panel-text">${this._t("batchLearnWaiting")}</div>
          </div>
          <div class="batch-panel-actions">
            <button class="primary" id="batch-save-btn" ${mqttConnected ? "" : "disabled"}>${this._t("batchSaveAll")}</button>
            <button class="secondary" id="batch-stop-btn">${this._t("batchStop")}</button>
          </div>
        </div>
        <div class="batch-items">
          ${
            items.length
              ? items.map((item) => `
                <div class="batch-item">
                  <input class="batch-name-input" data-id="${item.id}" value="${item.name || ""}" placeholder="${this._t("placeholder")}" ${mqttConnected ? "" : "disabled"} />
                  <div class="batch-item-actions">
                    <button class="secondary batch-test-btn" data-id="${item.id}" ${mqttConnected ? "" : "disabled"}>${this._t("testLearned")}</button>
                    <button class="secondary batch-remove-btn" data-id="${item.id}">${this._t("removeCaptured")}</button>
                  </div>
                </div>
              `).join("")
              : `<div class="empty">${this._t("batchLearnEmpty")}</div>`
          }
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
    const batchLearn = this._t("batchLearn");
    const sendLast = this._t("sendLast");
    const batchDelete = this._t("batchDelete");
    const batchDeleteConfirm = this._t("batchDeleteConfirm");
    const batchDeleteCancel = this._t("batchDeleteCancel");
    const selectedCount = this._t("selectedCount", { count: this._selectedKeys.size });
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
          position: relative;
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
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-bottom: 18px;
        }
        .selection-bar {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
          padding: 12px 14px;
          border-radius: 16px;
          background: rgba(15, 118, 110, 0.08);
          border: 1px solid rgba(15, 118, 110, 0.14);
        }
        .selection-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .learn-modal-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(11, 26, 23, 0.42);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          z-index: 10;
        }
        .learn-modal {
          width: min(100%, 520px);
          background: rgba(255,255,255,0.98);
          border: 1px solid var(--esp-ir-border);
          border-radius: 20px;
          padding: 18px;
          box-shadow: 0 22px 60px rgba(15, 23, 42, 0.18);
        }
        .learn-modal-title {
          font-size: 1.04rem;
          font-weight: 700;
        }
        .learn-modal-text {
          margin-top: 8px;
          color: var(--esp-ir-muted);
          line-height: 1.6;
        }
        .learn-modal-preview {
          margin-top: 12px;
          padding: 12px;
          background: rgba(15, 118, 110, 0.06);
          border-radius: 14px;
          color: var(--esp-ir-text);
          line-height: 1.55;
        }
        .learn-modal-preview code {
          display: block;
          margin-top: 6px;
          white-space: normal;
          word-break: break-all;
        }
        .learn-modal input {
          margin-top: 12px;
        }
        .learn-modal-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 14px;
        }
        .learn-modal-actions button {
          flex: 1 1 150px;
        }
        .batch-panel {
          margin-bottom: 18px;
          padding: 16px;
          background: rgba(255,255,255,0.9);
          border: 1px solid var(--esp-ir-border);
          border-radius: 18px;
        }
        .batch-panel-head {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 12px;
          align-items: flex-start;
          margin-bottom: 14px;
        }
        .batch-panel-title {
          font-size: 1rem;
          font-weight: 700;
        }
        .batch-panel-text {
          margin-top: 6px;
          color: var(--esp-ir-muted);
          line-height: 1.5;
        }
        .batch-panel-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .batch-items {
          display: grid;
          gap: 10px;
        }
        .batch-item {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 10px;
          align-items: center;
        }
        .batch-item-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
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
        .key-select {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--esp-ir-muted);
          font-size: 0.84rem;
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
          .batch-item {
            grid-template-columns: 1fr;
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
            <button class="secondary" id="batch-learn-btn" ${mqttConnected ? "" : "disabled"}>${batchLearn}</button>
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

          ${this._renderBatchLearnPanel(mqttConnected)}

          ${
            this._batchDeleteMode
              ? `
                <div class="selection-bar">
                  <div>${selectedCount}</div>
                  <div class="selection-actions">
                    <button class="delete" id="batch-delete-confirm-btn" ${this._selectedKeys.size ? "" : "disabled"}>${batchDeleteConfirm}</button>
                    <button class="secondary" id="batch-delete-cancel-btn">${batchDeleteCancel}</button>
                  </div>
                </div>
              `
              : `<div class="controls"><button class="secondary" id="batch-delete-btn" ${mqttConnected ? "" : "disabled"}>${batchDelete}</button></div>`
          }

          <div class="keys">
            ${
              keys.length
                ? keys
                    .map((key) => {
                      const confirming = this._pendingDelete === key;
                      return `
                        <div class="key">
                          ${
                            this._batchDeleteMode
                              ? `<label class="key-select"><input type="checkbox" class="key-select-checkbox" data-key="${key}" ${this._selectedKeys.has(key) ? "checked" : ""} />${key}</label>`
                              : `<div class="key-name">${key}</div>`
                          }
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

          ${this._renderLearnDialog(mqttConnected)}
        </div>
      </ha-card>
    `;

    this.shadowRoot.getElementById("learn-start-btn")?.addEventListener("click", () => this._startLearning());
    this.shadowRoot.getElementById("batch-learn-btn")?.addEventListener("click", () => this._startBatchLearning());
    this.shadowRoot.getElementById("send-last-btn")?.addEventListener("click", () => this._sendLast());
    this.shadowRoot.getElementById("batch-delete-btn")?.addEventListener("click", () => this._toggleBatchDeleteMode());
    this.shadowRoot.getElementById("batch-delete-cancel-btn")?.addEventListener("click", () => this._toggleBatchDeleteMode());
    this.shadowRoot.getElementById("batch-delete-confirm-btn")?.addEventListener("click", () => this._deleteSelectedKeys());
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
    this.shadowRoot.querySelectorAll(".key-select-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", (ev) => this._toggleKeySelection(ev.currentTarget.dataset.key));
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
    this.shadowRoot.getElementById("batch-save-btn")?.addEventListener("click", () => this._saveBatchLearned());
    this.shadowRoot.getElementById("batch-stop-btn")?.addEventListener("click", () => this._stopBatchLearning());
    this.shadowRoot.querySelectorAll(".batch-name-input").forEach((input) => {
      input.addEventListener("input", (ev) => this._updateBatchItemName(ev.currentTarget.dataset.id, ev.currentTarget.value));
    });
    this.shadowRoot.querySelectorAll(".batch-test-btn").forEach((button) => {
      button.addEventListener("click", (ev) => {
        const item = this._batchLearn?.items?.find((entry) => entry.id === ev.currentTarget.dataset.id);
        this._testPronto(item?.code || "");
      });
    });
    this.shadowRoot.querySelectorAll(".batch-remove-btn").forEach((button) => {
      button.addEventListener("click", (ev) => this._removeBatchItem(ev.currentTarget.dataset.id));
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
