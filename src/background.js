import {
  DEFAULT_CONTACT_LANGUAGE,
  DEFAULT_YOUR_LANGUAGE,
  getLanguageCode
} from "./languages.js";

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (!message || message.type !== "TRANSLATE_TEXT") {
    return false;
  }

  translateMessage(message.text)
    .then((translatedText) => {
      sendResponse({ ok: true, translatedText });
    })
    .catch((error) => {
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
    translationProvider: "googleOfficial",
    openaiApiKey: "",
    googleCloudApiKey: ""
  });

  const sourceLanguage = getLanguageCode(yourLanguage, DEFAULT_YOUR_LANGUAGE);
  const targetLanguageCode = getLanguageCode(contactLanguage || targetLanguage, DEFAULT_CONTACT_LANGUAGE);
  const provider = normalizeTranslationProvider(translationProvider);

  if (provider === "openai") {
    return translateWithOpenAI({
      text: normalizedText,
      sourceLanguage,
      targetLanguage: targetLanguageCode,
      apiKey: openaiApiKey
    });
  }

  return translateWithGoogleOfficial({
    text: normalizedText,
    sourceLanguage,
    targetLanguage: targetLanguageCode,
    apiKey: googleCloudApiKey
  });
}

function normalizeTranslationProvider(provider) {
  return provider === "openai" ? "openai" : "googleOfficial";
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
  return output
    .flatMap((item) => Array.isArray(item?.content) ? item.content : [])
    .map((content) => content?.text || "")
    .join("")
    .trim();
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
    return "O tradutor não retornou texto. Tente reformular a mensagem.";
  }

  if (message === "MISSING_OPENAI_API_KEY") {
    return "Configure a OpenAI API Key no popup da extensão.";
  }

  if (message === "MISSING_GOOGLE_API_KEY") {
    return "Configure a Google Cloud API Key no popup da extensão.";
  }

  if (lowerMessage.includes("failed to fetch") || lowerMessage.includes("networkerror")) {
    return "Não consegui acessar o serviço de tradução. Verifique sua conexão.";
  }

  if (lowerMessage.includes("openai_401")) {
    return "A OpenAI API Key foi recusada. Verifique a chave no popup.";
  }

  if (lowerMessage.includes("google_official_400") || lowerMessage.includes("google_official_403")) {
    return "A Google Cloud API Key foi recusada. Verifique se a chave e a Cloud Translation API estão ativas.";
  }

  if (lowerMessage.includes("openai_403")) {
    return "A OpenAI recusou a solicitação. Verifique permissões, billing ou projeto da chave.";
  }

  if (lowerMessage.includes("openai_429")) {
    return "A OpenAI limitou a solicitação. Verifique cota, saldo ou tente novamente mais tarde.";
  }

  if (lowerMessage.includes("google_official_429")) {
    return "A cota da Google Cloud Translation foi excedida. Verifique limites e billing.";
  }

  if (lowerMessage.includes("403") || lowerMessage.includes("blocked")) {
    return "O serviço de tradução bloqueou a solicitação no momento. Tente novamente mais tarde.";
  }

  return "Falha ao traduzir. Tente novamente em alguns instantes.";
}
