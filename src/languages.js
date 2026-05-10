export const DEFAULT_YOUR_LANGUAGE = "Portuguese";
export const DEFAULT_CONTACT_LANGUAGE = "English";

export const LANGUAGES = [
  { value: "Portuguese", label: "Português", code: "pt" },
  { value: "English", label: "Inglês (English)", code: "en" },
  { value: "Spanish", label: "Espanhol (Español)", code: "es" },
  { value: "French", label: "Francês (Français)", code: "fr" },
  { value: "German", label: "Alemão (Deutsch)", code: "de" },
  { value: "Italian", label: "Italiano (Italiano)", code: "it" },
  { value: "Japanese", label: "Japonês (日本語)", code: "ja" },
  { value: "Korean", label: "Coreano (한국어)", code: "ko" },
  { value: "Mandarin Chinese", label: "Chinês Mandarim (中文)", code: "zh-CN" },
  { value: "Arabic", label: "Árabe (العربية)", code: "ar" }
];

export function getLanguageCode(language, fallbackLanguage) {
  const candidate = String(language || "").trim();
  return findLanguage(candidate)?.code || findLanguage(fallbackLanguage)?.code;
}

function findLanguage(language) {
  return LANGUAGES.find(({ value }) => value === language);
}
