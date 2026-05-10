import {
  DEFAULT_CONTACT_LANGUAGE,
  DEFAULT_YOUR_LANGUAGE,
  LANGUAGES
} from "./src/languages.js";

const yourLanguageSelect = document.getElementById("your-language");
const contactLanguageSelect = document.getElementById("contact-language");
const translationProviderSelect = document.getElementById("translation-provider");
const googleKeyFields = document.getElementById("google-key-fields");
const googleCloudApiKeyInput = document.getElementById("google-cloud-api-key");
const openaiKeyFields = document.getElementById("openai-key-fields");
const openaiApiKeyInput = document.getElementById("openai-api-key");
const translationEnabledInput = document.getElementById("translation-enabled");
const saveButton = document.getElementById("save");
const statusText = document.getElementById("status");

document.addEventListener("DOMContentLoaded", initializePopup);
translationProviderSelect.addEventListener("change", updateProviderFields);
saveButton.addEventListener("click", saveSettings);

async function initializePopup() {
  fillLanguageSelect(yourLanguageSelect, DEFAULT_YOUR_LANGUAGE);
  fillLanguageSelect(contactLanguageSelect, DEFAULT_CONTACT_LANGUAGE);
  await restoreSettings();
}

function fillLanguageSelect(select, preferredLanguage) {
  const sortedLanguages = [
    ...LANGUAGES.filter(({ value }) => value === preferredLanguage),
    ...LANGUAGES.filter(({ value }) => value !== preferredLanguage)
  ];

  select.replaceChildren(...sortedLanguages.map((language) => {
    const option = document.createElement("option");
    option.value = language.value;
    option.textContent = language.label;
    return option;
  }));
}

async function restoreSettings() {
  const {
    targetLanguage,
    yourLanguage,
    contactLanguage,
    translationProvider,
    openaiApiKey,
    googleCloudApiKey,
    translationEnabled
  } = await chrome.storage.sync.get({
    targetLanguage: DEFAULT_CONTACT_LANGUAGE,
    yourLanguage: DEFAULT_YOUR_LANGUAGE,
    contactLanguage: DEFAULT_CONTACT_LANGUAGE,
    translationProvider: "googleOfficial",
    openaiApiKey: "",
    googleCloudApiKey: "",
    translationEnabled: true
  });

  yourLanguageSelect.value = yourLanguage || DEFAULT_YOUR_LANGUAGE;
  contactLanguageSelect.value = contactLanguage || targetLanguage || DEFAULT_CONTACT_LANGUAGE;
  translationProviderSelect.value = normalizeTranslationProvider(translationProvider);
  openaiApiKeyInput.value = openaiApiKey || "";
  googleCloudApiKeyInput.value = googleCloudApiKey || "";
  translationEnabledInput.checked = Boolean(translationEnabled);
  updateProviderFields();
}

function updateProviderFields() {
  const provider = translationProviderSelect.value;

  googleKeyFields.hidden = provider !== "googleOfficial";
  openaiKeyFields.hidden = provider !== "openai";
}

function normalizeTranslationProvider(provider) {
  return provider === "openai" ? "openai" : "googleOfficial";
}

async function saveSettings() {
  const yourLanguage = yourLanguageSelect.value || DEFAULT_YOUR_LANGUAGE;
  const contactLanguage = contactLanguageSelect.value || DEFAULT_CONTACT_LANGUAGE;
  const translationProvider = normalizeTranslationProvider(translationProviderSelect.value);
  const openaiApiKey = openaiApiKeyInput.value.trim();
  const googleCloudApiKey = googleCloudApiKeyInput.value.trim();
  const translationEnabled = translationEnabledInput.checked;

  await chrome.storage.sync.set({
    targetLanguage: contactLanguage,
    yourLanguage,
    contactLanguage,
    translationProvider,
    openaiApiKey,
    googleCloudApiKey,
    translationEnabled
  });

  statusText.textContent = "Configurações salvas.";
  window.setTimeout(() => {
    statusText.textContent = "";
  }, 2200);
}
