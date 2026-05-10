(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/node-fetch/browser.js
  var require_browser = __commonJS({
    "node_modules/node-fetch/browser.js"(exports, module) {
      "use strict";
      var getGlobal = function() {
        if (typeof self !== "undefined") {
          return self;
        }
        if (typeof window !== "undefined") {
          return window;
        }
        if (typeof global !== "undefined") {
          return global;
        }
        throw new Error("unable to locate global object");
      };
      var globalObject = getGlobal();
      module.exports = exports = globalObject.fetch;
      if (globalObject.fetch) {
        exports.default = globalObject.fetch.bind(globalObject);
      }
      exports.Headers = globalObject.Headers;
      exports.Request = globalObject.Request;
      exports.Response = globalObject.Response;
    }
  });

  // node_modules/depd/lib/browser/index.js
  var require_browser2 = __commonJS({
    "node_modules/depd/lib/browser/index.js"(exports, module) {
      "use strict";
      module.exports = depd;
      function depd(namespace) {
        if (!namespace) {
          throw new TypeError("argument namespace is required");
        }
        function deprecate(message) {
        }
        deprecate._file = void 0;
        deprecate._ignored = true;
        deprecate._namespace = namespace;
        deprecate._traced = false;
        deprecate._warned = /* @__PURE__ */ Object.create(null);
        deprecate.function = wrapfunction;
        deprecate.property = wrapproperty;
        return deprecate;
      }
      function wrapfunction(fn, message) {
        if (typeof fn !== "function") {
          throw new TypeError("argument fn must be a function");
        }
        return fn;
      }
      function wrapproperty(obj, prop, message) {
        if (!obj || typeof obj !== "object" && typeof obj !== "function") {
          throw new TypeError("argument obj must be object");
        }
        var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
        if (!descriptor) {
          throw new TypeError("must call property on owner object");
        }
        if (!descriptor.configurable) {
          throw new TypeError("property must be configurable");
        }
      }
    }
  });

  // node_modules/setprototypeof/index.js
  var require_setprototypeof = __commonJS({
    "node_modules/setprototypeof/index.js"(exports, module) {
      "use strict";
      module.exports = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? setProtoOf : mixinProperties);
      function setProtoOf(obj, proto) {
        obj.__proto__ = proto;
        return obj;
      }
      function mixinProperties(obj, proto) {
        for (var prop in proto) {
          if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
            obj[prop] = proto[prop];
          }
        }
        return obj;
      }
    }
  });

  // node_modules/statuses/codes.json
  var require_codes = __commonJS({
    "node_modules/statuses/codes.json"(exports, module) {
      module.exports = {
        "100": "Continue",
        "101": "Switching Protocols",
        "102": "Processing",
        "103": "Early Hints",
        "200": "OK",
        "201": "Created",
        "202": "Accepted",
        "203": "Non-Authoritative Information",
        "204": "No Content",
        "205": "Reset Content",
        "206": "Partial Content",
        "207": "Multi-Status",
        "208": "Already Reported",
        "226": "IM Used",
        "300": "Multiple Choices",
        "301": "Moved Permanently",
        "302": "Found",
        "303": "See Other",
        "304": "Not Modified",
        "305": "Use Proxy",
        "307": "Temporary Redirect",
        "308": "Permanent Redirect",
        "400": "Bad Request",
        "401": "Unauthorized",
        "402": "Payment Required",
        "403": "Forbidden",
        "404": "Not Found",
        "405": "Method Not Allowed",
        "406": "Not Acceptable",
        "407": "Proxy Authentication Required",
        "408": "Request Timeout",
        "409": "Conflict",
        "410": "Gone",
        "411": "Length Required",
        "412": "Precondition Failed",
        "413": "Payload Too Large",
        "414": "URI Too Long",
        "415": "Unsupported Media Type",
        "416": "Range Not Satisfiable",
        "417": "Expectation Failed",
        "418": "I'm a Teapot",
        "421": "Misdirected Request",
        "422": "Unprocessable Entity",
        "423": "Locked",
        "424": "Failed Dependency",
        "425": "Too Early",
        "426": "Upgrade Required",
        "428": "Precondition Required",
        "429": "Too Many Requests",
        "431": "Request Header Fields Too Large",
        "451": "Unavailable For Legal Reasons",
        "500": "Internal Server Error",
        "501": "Not Implemented",
        "502": "Bad Gateway",
        "503": "Service Unavailable",
        "504": "Gateway Timeout",
        "505": "HTTP Version Not Supported",
        "506": "Variant Also Negotiates",
        "507": "Insufficient Storage",
        "508": "Loop Detected",
        "509": "Bandwidth Limit Exceeded",
        "510": "Not Extended",
        "511": "Network Authentication Required"
      };
    }
  });

  // node_modules/statuses/index.js
  var require_statuses = __commonJS({
    "node_modules/statuses/index.js"(exports, module) {
      "use strict";
      var codes = require_codes();
      module.exports = status;
      status.message = codes;
      status.code = createMessageToStatusCodeMap(codes);
      status.codes = createStatusCodeList(codes);
      status.redirect = {
        300: true,
        301: true,
        302: true,
        303: true,
        305: true,
        307: true,
        308: true
      };
      status.empty = {
        204: true,
        205: true,
        304: true
      };
      status.retry = {
        502: true,
        503: true,
        504: true
      };
      function createMessageToStatusCodeMap(codes2) {
        var map = {};
        Object.keys(codes2).forEach(function forEachCode(code) {
          var message = codes2[code];
          var status2 = Number(code);
          map[message.toLowerCase()] = status2;
        });
        return map;
      }
      function createStatusCodeList(codes2) {
        return Object.keys(codes2).map(function mapCode(code) {
          return Number(code);
        });
      }
      function getStatusCode(message) {
        var msg = message.toLowerCase();
        if (!Object.prototype.hasOwnProperty.call(status.code, msg)) {
          throw new Error('invalid status message: "' + message + '"');
        }
        return status.code[msg];
      }
      function getStatusMessage(code) {
        if (!Object.prototype.hasOwnProperty.call(status.message, code)) {
          throw new Error("invalid status code: " + code);
        }
        return status.message[code];
      }
      function status(code) {
        if (typeof code === "number") {
          return getStatusMessage(code);
        }
        if (typeof code !== "string") {
          throw new TypeError("code must be a number or string");
        }
        var n = parseInt(code, 10);
        if (!isNaN(n)) {
          return getStatusMessage(n);
        }
        return getStatusCode(code);
      }
    }
  });

  // node_modules/inherits/inherits_browser.js
  var require_inherits_browser = __commonJS({
    "node_modules/inherits/inherits_browser.js"(exports, module) {
      if (typeof Object.create === "function") {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          }
        };
      } else {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {
            };
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          }
        };
      }
    }
  });

  // node_modules/toidentifier/index.js
  var require_toidentifier = __commonJS({
    "node_modules/toidentifier/index.js"(exports, module) {
      "use strict";
      module.exports = toIdentifier;
      function toIdentifier(str) {
        return str.split(" ").map(function(token) {
          return token.slice(0, 1).toUpperCase() + token.slice(1);
        }).join("").replace(/[^ _0-9a-z]/gi, "");
      }
    }
  });

  // node_modules/http-errors/index.js
  var require_http_errors = __commonJS({
    "node_modules/http-errors/index.js"(exports, module) {
      "use strict";
      var deprecate = require_browser2()("http-errors");
      var setPrototypeOf = require_setprototypeof();
      var statuses = require_statuses();
      var inherits = require_inherits_browser();
      var toIdentifier = require_toidentifier();
      module.exports = createError;
      module.exports.HttpError = createHttpErrorConstructor();
      module.exports.isHttpError = createIsHttpErrorFunction(module.exports.HttpError);
      populateConstructorExports(module.exports, statuses.codes, module.exports.HttpError);
      function codeClass(status) {
        return Number(String(status).charAt(0) + "00");
      }
      function createError() {
        var err;
        var msg;
        var status = 500;
        var props = {};
        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          var type = typeof arg;
          if (type === "object" && arg instanceof Error) {
            err = arg;
            status = err.status || err.statusCode || status;
          } else if (type === "number" && i === 0) {
            status = arg;
          } else if (type === "string") {
            msg = arg;
          } else if (type === "object") {
            props = arg;
          } else {
            throw new TypeError("argument #" + (i + 1) + " unsupported type " + type);
          }
        }
        if (typeof status === "number" && (status < 400 || status >= 600)) {
          deprecate("non-error status code; use only 4xx or 5xx status codes");
        }
        if (typeof status !== "number" || !statuses.message[status] && (status < 400 || status >= 600)) {
          status = 500;
        }
        var HttpError = createError[status] || createError[codeClass(status)];
        if (!err) {
          err = HttpError ? new HttpError(msg) : new Error(msg || statuses.message[status]);
          Error.captureStackTrace(err, createError);
        }
        if (!HttpError || !(err instanceof HttpError) || err.status !== status) {
          err.expose = status < 500;
          err.status = err.statusCode = status;
        }
        for (var key in props) {
          if (key !== "status" && key !== "statusCode") {
            err[key] = props[key];
          }
        }
        return err;
      }
      function createHttpErrorConstructor() {
        function HttpError() {
          throw new TypeError("cannot construct abstract class");
        }
        inherits(HttpError, Error);
        return HttpError;
      }
      function createClientErrorConstructor(HttpError, name, code) {
        var className = toClassName(name);
        function ClientError(message) {
          var msg = message != null ? message : statuses.message[code];
          var err = new Error(msg);
          Error.captureStackTrace(err, ClientError);
          setPrototypeOf(err, ClientError.prototype);
          Object.defineProperty(err, "message", {
            enumerable: true,
            configurable: true,
            value: msg,
            writable: true
          });
          Object.defineProperty(err, "name", {
            enumerable: false,
            configurable: true,
            value: className,
            writable: true
          });
          return err;
        }
        inherits(ClientError, HttpError);
        nameFunc(ClientError, className);
        ClientError.prototype.status = code;
        ClientError.prototype.statusCode = code;
        ClientError.prototype.expose = true;
        return ClientError;
      }
      function createIsHttpErrorFunction(HttpError) {
        return function isHttpError(val) {
          if (!val || typeof val !== "object") {
            return false;
          }
          if (val instanceof HttpError) {
            return true;
          }
          return val instanceof Error && typeof val.expose === "boolean" && typeof val.statusCode === "number" && val.status === val.statusCode;
        };
      }
      function createServerErrorConstructor(HttpError, name, code) {
        var className = toClassName(name);
        function ServerError(message) {
          var msg = message != null ? message : statuses.message[code];
          var err = new Error(msg);
          Error.captureStackTrace(err, ServerError);
          setPrototypeOf(err, ServerError.prototype);
          Object.defineProperty(err, "message", {
            enumerable: true,
            configurable: true,
            value: msg,
            writable: true
          });
          Object.defineProperty(err, "name", {
            enumerable: false,
            configurable: true,
            value: className,
            writable: true
          });
          return err;
        }
        inherits(ServerError, HttpError);
        nameFunc(ServerError, className);
        ServerError.prototype.status = code;
        ServerError.prototype.statusCode = code;
        ServerError.prototype.expose = false;
        return ServerError;
      }
      function nameFunc(func, name) {
        var desc = Object.getOwnPropertyDescriptor(func, "name");
        if (desc && desc.configurable) {
          desc.value = name;
          Object.defineProperty(func, "name", desc);
        }
      }
      function populateConstructorExports(exports2, codes, HttpError) {
        codes.forEach(function forEachCode(code) {
          var CodeError;
          var name = toIdentifier(statuses.message[code]);
          switch (codeClass(code)) {
            case 400:
              CodeError = createClientErrorConstructor(HttpError, name, code);
              break;
            case 500:
              CodeError = createServerErrorConstructor(HttpError, name, code);
              break;
          }
          if (CodeError) {
            exports2[code] = CodeError;
            exports2[name] = CodeError;
          }
        });
      }
      function toClassName(name) {
        return name.slice(-5) === "Error" ? name : name + "Error";
      }
    }
  });

  // node_modules/@vitalets/google-translate-api/dist/esm/index.js
  var import_node_fetch = __toESM(require_browser(), 1);
  var import_http_errors = __toESM(require_http_errors(), 1);

  // node_modules/@vitalets/google-translate-api/dist/esm/helpers.js
  function extractTooManyRequestsInfo(html) {
    const ip = html?.match(/IP address: (.+?)<br>/)?.[1] || "";
    const time = html?.match(/Time: (.+?)<br>/)?.[1] || "";
    const url = (html?.match(/URL: (.+?)<br>/)?.[1] || "").replace(/&amp;/g, "&");
    return { ip, time, url };
  }

  // node_modules/@vitalets/google-translate-api/dist/esm/index.js
  var defaults = {
    from: "auto",
    to: "en",
    host: "translate.google.com"
  };
  async function translate(inputText, options) {
    return new Translator(inputText, options).translate();
  }
  var Translator = class {
    constructor(inputText, options) {
      this.inputText = inputText;
      this.options = Object.assign({}, defaults, options);
    }
    async translate() {
      const url = this.buildUrl();
      const fetchOptions = this.buildFetchOptions();
      const res = await (0, import_node_fetch.default)(url, fetchOptions);
      if (!res.ok)
        throw await this.buildError(res);
      const raw = await res.json();
      const text = this.buildResText(raw);
      return { text, raw };
    }
    buildUrl() {
      const { host } = this.options;
      return [
        `https://${host}/translate_a/single`,
        "?client=at",
        "&dt=t",
        "&dt=rm",
        "&dj=1"
        // result as pretty json instead of deep nested arrays
      ].join("");
    }
    buildBody() {
      const { from, to } = this.options;
      const params = {
        sl: from,
        tl: to,
        q: this.inputText
      };
      return new URLSearchParams(params).toString();
    }
    buildFetchOptions() {
      const { fetchOptions } = this.options;
      const res = Object.assign({}, fetchOptions);
      res.method = "POST";
      res.headers = Object.assign({}, res.headers, {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      });
      res.body = this.buildBody();
      return res;
    }
    buildResText({ sentences }) {
      return sentences.filter((s) => "trans" in s).map((s) => s.trans).join("");
    }
    async buildError(res) {
      if (res.status === 429) {
        const text = await res.text();
        const { ip, time, url } = extractTooManyRequestsInfo(text);
        const message = `${res.statusText} IP: ${ip}, Time: ${time}, Url: ${url}`;
        return (0, import_http_errors.default)(res.status, message);
      } else {
        return (0, import_http_errors.default)(res.status, res.statusText);
      }
    }
  };

  // src/languages.js
  var DEFAULT_YOUR_LANGUAGE = "Portuguese";
  var DEFAULT_CONTACT_LANGUAGE = "English";
  var LANGUAGES = [
    { value: "Portuguese", label: "Portugu\xEAs", code: "pt" },
    { value: "English", label: "Ingl\xEAs (English)", code: "en" },
    { value: "Spanish", label: "Espanhol (Espa\xF1ol)", code: "es" },
    { value: "French", label: "Franc\xEAs (Fran\xE7ais)", code: "fr" },
    { value: "German", label: "Alem\xE3o (Deutsch)", code: "de" },
    { value: "Italian", label: "Italiano (Italiano)", code: "it" },
    { value: "Japanese", label: "Japon\xEAs (\u65E5\u672C\u8A9E)", code: "ja" },
    { value: "Korean", label: "Coreano (\uD55C\uAD6D\uC5B4)", code: "ko" },
    { value: "Mandarin Chinese", label: "Chin\xEAs Mandarim (\u4E2D\u6587)", code: "zh-CN" },
    { value: "Arabic", label: "\xC1rabe (\u0627\u0644\u0639\u0631\u0628\u064A\u0629)", code: "ar" }
  ];
  function getLanguageCode(language, fallbackLanguage) {
    const candidate = String(language || "").trim();
    return findLanguage(candidate)?.code || findLanguage(fallbackLanguage)?.code;
  }
  function findLanguage(language) {
    return LANGUAGES.find(({ value }) => value === language);
  }

  // src/background.js
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (!message || message.type !== "TRANSLATE_TEXT") {
      return false;
    }
    translateMessage(message.text).then((translatedText) => {
      sendResponse({ ok: true, translatedText });
    }).catch((error) => {
      sendResponse({
        ok: false,
        error: getFriendlyTranslationError(error)
      });
    });
    return true;
  });
  async function translateMessage(text) {
    const normalizedText = String(text || "").trim();
    if (!normalizedText) {
      throw new Error("EMPTY_TEXT");
    }
    const {
      targetLanguage,
      yourLanguage,
      contactLanguage,
      translationProvider,
      openaiApiKey,
      googleCloudApiKey
    } = await chrome.storage.sync.get({
      targetLanguage: DEFAULT_CONTACT_LANGUAGE,
      yourLanguage: DEFAULT_YOUR_LANGUAGE,
      contactLanguage: DEFAULT_CONTACT_LANGUAGE,
      translationProvider: "vitalets",
      openaiApiKey: "",
      googleCloudApiKey: ""
    });
    const sourceLanguage = getLanguageCode(yourLanguage, DEFAULT_YOUR_LANGUAGE);
    const targetLanguageCode = getLanguageCode(contactLanguage || targetLanguage, DEFAULT_CONTACT_LANGUAGE);
    if (translationProvider === "openai") {
      return translateWithOpenAI({
        text: normalizedText,
        sourceLanguage,
        targetLanguage: targetLanguageCode,
        apiKey: openaiApiKey
      });
    }
    if (translationProvider === "googleOfficial") {
      return translateWithGoogleOfficial({
        text: normalizedText,
        sourceLanguage,
        targetLanguage: targetLanguageCode,
        apiKey: googleCloudApiKey
      });
    }
    return translateWithVitalets({
      text: normalizedText,
      sourceLanguage,
      targetLanguage: targetLanguageCode
    });
  }
  async function translateWithVitalets({ text, sourceLanguage, targetLanguage }) {
    const result = await translate(text, {
      from: sourceLanguage,
      to: targetLanguage
    });
    return normalizeTranslatedText(result?.text);
  }
  async function translateWithGoogleOfficial({ text, sourceLanguage, targetLanguage, apiKey }) {
    const normalizedApiKey = String(apiKey || "").trim();
    if (!normalizedApiKey) {
      throw new Error("MISSING_GOOGLE_API_KEY");
    }
    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(normalizedApiKey)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        q: text,
        source: sourceLanguage,
        target: targetLanguage,
        format: "text"
      })
    });
    const data = await readJsonResponse(response);
    if (!response.ok) {
      throw createProviderError("GOOGLE_OFFICIAL", response.status, data);
    }
    return normalizeTranslatedText(data?.data?.translations?.[0]?.translatedText);
  }
  async function translateWithOpenAI({ text, sourceLanguage, targetLanguage, apiKey }) {
    const normalizedApiKey = String(apiKey || "").trim();
    if (!normalizedApiKey) {
      throw new Error("MISSING_OPENAI_API_KEY");
    }
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${normalizedApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        instructions: [
          "Translate only the user's text.",
          "Preserve intent, casual tone, line breaks, emojis, mentions, and URLs.",
          `Translate from ${sourceLanguage} to ${targetLanguage}.`,
          "Return only the translated text, with no explanations."
        ].join(" "),
        input: text
      })
    });
    const data = await readJsonResponse(response);
    if (!response.ok) {
      throw createProviderError("OPENAI", response.status, data);
    }
    return normalizeTranslatedText(extractOpenAIText(data));
  }
  async function readJsonResponse(response) {
    try {
      return await response.json();
    } catch (_error) {
      return null;
    }
  }
  function createProviderError(provider, status, data) {
    const message = data?.error?.message || data?.error?.status || `HTTP_${status}`;
    const error = new Error(`${provider}_${status}: ${message}`);
    error.status = status;
    error.provider = provider;
    return error;
  }
  function extractOpenAIText(data) {
    if (typeof data?.output_text === "string") {
      return data.output_text;
    }
    const output = Array.isArray(data?.output) ? data.output : [];
    return output.flatMap((item) => Array.isArray(item?.content) ? item.content : []).map((content) => content?.text || "").join("").trim();
  }
  function normalizeTranslatedText(text) {
    const translatedText = String(text || "").trim();
    if (!translatedText) {
      throw new Error("EMPTY_TRANSLATION");
    }
    return translatedText;
  }
  function getFriendlyTranslationError(error) {
    const message = error instanceof Error ? error.message : String(error || "");
    const lowerMessage = message.toLowerCase();
    if (message === "EMPTY_TEXT") {
      return "Digite uma mensagem antes de traduzir.";
    }
    if (message === "EMPTY_TRANSLATION") {
      return "O tradutor n\xE3o retornou texto. Tente reformular a mensagem.";
    }
    if (message === "MISSING_OPENAI_API_KEY") {
      return "Configure a OpenAI API Key no popup da extens\xE3o.";
    }
    if (message === "MISSING_GOOGLE_API_KEY") {
      return "Configure a Google Cloud API Key no popup da extens\xE3o.";
    }
    if (lowerMessage.includes("failed to fetch") || lowerMessage.includes("networkerror")) {
      return "N\xE3o consegui acessar o servi\xE7o de tradu\xE7\xE3o. Verifique sua conex\xE3o.";
    }
    if (lowerMessage.includes("openai_401")) {
      return "A OpenAI API Key foi recusada. Verifique a chave no popup.";
    }
    if (lowerMessage.includes("google_official_400") || lowerMessage.includes("google_official_403")) {
      return "A Google Cloud API Key foi recusada. Verifique se a chave e a Cloud Translation API est\xE3o ativas.";
    }
    if (lowerMessage.includes("openai_403")) {
      return "A OpenAI recusou a solicita\xE7\xE3o. Verifique permiss\xF5es, billing ou projeto da chave.";
    }
    if (lowerMessage.includes("openai_429")) {
      return "A OpenAI limitou a solicita\xE7\xE3o. Verifique cota, saldo ou tente novamente mais tarde.";
    }
    if (lowerMessage.includes("google_official_429")) {
      return "A cota da Google Cloud Translation foi excedida. Verifique limites e billing.";
    }
    if (lowerMessage.includes("too many requests") || lowerMessage.includes("429")) {
      return "O Google n\xE3o oficial limitou as tentativas. Aguarde um pouco ou troque o servi\xE7o no popup.";
    }
    if (lowerMessage.includes("403") || lowerMessage.includes("blocked")) {
      return "O servi\xE7o de tradu\xE7\xE3o bloqueou a solicita\xE7\xE3o no momento. Tente novamente mais tarde.";
    }
    return "Falha ao traduzir. Tente novamente em alguns instantes.";
  }
})();
/*! Bundled license information:

depd/lib/browser/index.js:
  (*!
   * depd
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

statuses/index.js:
  (*!
   * statuses
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2016 Douglas Christopher Wilson
   * MIT Licensed
   *)

toidentifier/index.js:
  (*!
   * toidentifier
   * Copyright(c) 2016 Douglas Christopher Wilson
   * MIT Licensed
   *)

http-errors/index.js:
  (*!
   * http-errors
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2016 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
