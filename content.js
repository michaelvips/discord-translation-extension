let isTranslating = false;
let toastTimer = null;
let lastComposer = null;

removeTranslateButton();
document.addEventListener("keydown", handleTranslateShortcut, true);
document.addEventListener("focusin", rememberComposer, true);
document.addEventListener("input", rememberComposer, true);

function handleTranslateShortcut(event) {
  if (!event.altKey || event.key.toLowerCase() !== "t" || event.ctrlKey || event.shiftKey || event.metaKey) {
    return;
  }

  const composer = findComposer(event.target);
  if (!composer) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  translateCurrentDraft();
}

function removeTranslateButton() {
  document.getElementById("discord-translator-button")?.remove();
  document.getElementById("wa-translator-button")?.remove();
}

async function translateCurrentDraft() {
  const { translationEnabled } = await chrome.storage.sync.get({
    translationEnabled: true
  });

  if (!translationEnabled) {
    showToast("Ative a tradução no popup da extensão.");
    return;
  }

  const composer = findComposer(document.activeElement);
  if (!composer) {
    showToast("Abra um canal ou DM e digite uma mensagem primeiro.");
    return;
  }

  const originalText = getComposerText(composer);
  if (!originalText.trim() || isTranslating) {
    if (!originalText.trim()) {
      showToast("Digite uma mensagem antes de traduzir.");
    }
    return;
  }

  isTranslating = true;
  showToast("Traduzindo...");

  try {
    const response = await sendExtensionMessage({
      type: "TRANSLATE_TEXT",
      text: originalText
    });

    if (!response?.ok) {
      throw new Error(response?.error || "Translation failed.");
    }

    const replaced = await replaceComposerText(composer, response.translatedText);
    if (replaced) {
      showToast("Tradução aplicada. Revise antes de enviar.");
      return;
    }

    const copied = await copyTextToClipboard(response.translatedText);
    const cleared = copied && !isDiscordComposer(composer) ? await clearComposerText(composer) : false;
    if (copied && isDiscordComposer(composer)) {
      selectComposerContents(composer);
    }

    showToast(getFallbackToastMessage({ copied, cleared, composer }));
  } catch (error) {
    showToast(error instanceof Error ? error.message : "Falha ao traduzir.");
  } finally {
    isTranslating = false;
  }
}

async function sendExtensionMessage(message) {
  const runtime = globalThis.chrome?.runtime;
  if (!runtime?.sendMessage) {
    throw new Error("Recarregue a extensão e a aba do Discord para ativar o tradutor.");
  }

  return runtime.sendMessage(message);
}

function rememberComposer(event) {
  const composer = closestEditable(event.target);
  if (composer && isLikelyComposer(composer)) {
    lastComposer = composer;
  }
}

function findComposer(target) {
  const activeEditable = closestEditable(target);
  if (activeEditable && isLikelyComposer(activeEditable)) {
    lastComposer = activeEditable;
    return activeEditable;
  }

  const focusedEditable = closestEditable(document.activeElement);
  if (focusedEditable && isLikelyComposer(focusedEditable)) {
    lastComposer = focusedEditable;
    return focusedEditable;
  }

  if (lastComposer?.isConnected && isLikelyComposer(lastComposer)) {
    return lastComposer;
  }

  const footer = document.querySelector("footer");
  const footerComposer = footer?.querySelector('[contenteditable="true"][role="textbox"]')
    || footer?.querySelector('[contenteditable="true"]');
  if (footerComposer) {
    lastComposer = footerComposer;
    return footerComposer;
  }

  const formComposers = [...document.querySelectorAll('form [contenteditable="true"][role="textbox"]')];
  const formComposer = formComposers.find(isLikelyComposer) || formComposers.at(-1);
  if (formComposer) {
    lastComposer = formComposer;
    return formComposer;
  }

  const candidates = [...document.querySelectorAll('[contenteditable="true"]')];
  const likelyComposer = candidates.find(isLikelyComposer)
    || candidates.find((candidate) => getComposerText(candidate).trim());

  if (likelyComposer) {
    lastComposer = likelyComposer;
  }

  return likelyComposer || null;
}

function closestEditable(node) {
  if (!(node instanceof Element)) {
    return null;
  }

  return node.closest('[contenteditable="true"]');
}

function isLikelyComposer(element) {
  if (!element || element.getAttribute("contenteditable") !== "true") {
    return false;
  }

  const footer = element.closest("footer");
  const form = element.closest("form");
  const ariaLabel = (element.getAttribute("aria-label") || "").toLowerCase();
  const role = (element.getAttribute("role") || "").toLowerCase();
  const dataSlateEditor = element.getAttribute("data-slate-editor");

  return Boolean(footer)
    || Boolean(form && role === "textbox")
    || dataSlateEditor === "true"
    || ariaLabel.includes("message")
    || ariaLabel.includes("mensagem")
    || ariaLabel.includes("mensagem para")
    || ariaLabel.includes("digite");
}

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (_error) {
    return copyTextWithTextarea(text);
  }
}

function copyTextWithTextarea(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  document.documentElement.appendChild(textarea);
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } finally {
    textarea.remove();
  }

  return copied;
}

function getComposerText(composer) {
  return composer.innerText || composer.textContent || "";
}

function notifyComposerChanged(composer, inputType, text) {
  composer.dispatchEvent(new InputEvent("input", {
    bubbles: true,
    cancelable: true,
    inputType,
    data: text
  }));
  composer.dispatchEvent(new Event("change", { bubbles: true }));
}

async function clearComposerText(composer) {
  composer.focus();
  selectComposerContents(composer);
  document.execCommand("delete", false);

  await waitForEditor();
  return !getComposerText(composer).trim();
}

async function replaceComposerText(composer, text) {
  if (isDiscordComposer(composer)) {
    return replaceDiscordComposerText(composer, text);
  }

  composer.focus();
  selectComposerContents(composer);

  const inserted = document.execCommand("insertText", false, text);
  if (!inserted) {
    notifyComposerChanged(composer, "insertReplacementText", text);
  }

  moveCaretToEnd(composer);

  await waitForEditor();
  return normalizeComposerText(getComposerText(composer)) === normalizeComposerText(text);
}

async function replaceDiscordComposerText(composer, text) {
  const originalText = getComposerText(composer);

  if (await applyDiscordInputEvent(composer, text)) {
    return true;
  }

  await restoreDiscordComposerText(composer, originalText);

  if (await applyDiscordPasteEvent(composer, text)) {
    return true;
  }

  await restoreDiscordComposerText(composer, originalText);
  return false;
}

async function applyDiscordInputEvent(composer, text) {
  composer.focus();
  selectComposerContentsWithRange(composer);
  composer.dispatchEvent(new InputEvent("beforeinput", {
    bubbles: true,
    cancelable: true,
    composed: true,
    inputType: "insertReplacementText",
    data: text
  }));

  await waitForEditor();
  return didReplaceComposerText(composer, text);
}

async function applyDiscordPasteEvent(composer, text) {
  composer.focus();
  selectComposerContentsWithRange(composer);

  const dataTransfer = new DataTransfer();
  dataTransfer.setData("text/plain", text);
  composer.dispatchEvent(new ClipboardEvent("paste", {
    bubbles: true,
    cancelable: true,
    composed: true,
    clipboardData: dataTransfer
  }));

  await waitForEditor();
  return didReplaceComposerText(composer, text);
}

function didReplaceComposerText(composer, text) {
  const replaced = normalizeComposerText(getComposerText(composer)) === normalizeComposerText(text);
  if (replaced) {
    moveCaretToEnd(composer);
  }

  return replaced;
}

async function restoreDiscordComposerText(composer, originalText) {
  const normalizedOriginal = normalizeComposerText(originalText);
  if (normalizeComposerText(getComposerText(composer)) === normalizedOriginal) {
    moveCaretToEnd(composer);
    return true;
  }

  for (let attempt = 0; attempt < 3; attempt += 1) {
    document.execCommand("undo", false);
    await waitForEditor();

    if (normalizeComposerText(getComposerText(composer)) === normalizedOriginal) {
      moveCaretToEnd(composer);
      return true;
    }
  }

  return false;
}

function normalizeComposerText(text) {
  return String(text || "").replace(/\u00a0/g, " ").trim();
}

function selectComposerContents(composer) {
  composer.focus();
  document.execCommand("selectAll", false);
}

function selectComposerContentsWithRange(composer) {
  composer.focus();

  const selection = window.getSelection();
  if (!selection) {
    return;
  }

  const range = document.createRange();
  range.selectNodeContents(composer);
  selection.removeAllRanges();
  selection.addRange(range);
}

function moveCaretToEnd(composer) {
  const selection = window.getSelection();
  if (!selection) {
    return;
  }

  const range = document.createRange();
  range.selectNodeContents(composer);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
}

function isDiscordComposer(composer) {
  return Boolean(
    composer?.getAttribute("data-slate-editor") === "true"
      || location.hostname.endsWith("discord.com")
  );
}

function waitForEditor() {
  return new Promise((resolve) => {
    window.setTimeout(resolve, 80);
  });
}

function getFallbackToastMessage({ copied, cleared, composer }) {
  if (!copied) {
    return "Tradução pronta, mas não consegui copiar.";
  }

  if (isDiscordComposer(composer)) {
    return "Tradução copiada. Pressione Ctrl + V para substituir.";
  }

  return cleared
    ? "Tradução copiada. Pressione Ctrl + V para colar."
    : "Tradução copiada. Limpe o campo e pressione Ctrl + V.";
}

function showToast(message) {
  let toast = document.getElementById("discord-translator-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "discord-translator-toast";
    toast.setAttribute("role", "status");
    toast.style.position = "fixed";
    toast.style.right = "18px";
    toast.style.bottom = "136px";
    toast.style.zIndex = "999999";
    toast.style.maxWidth = "320px";
    toast.style.padding = "10px 12px";
    toast.style.borderRadius = "8px";
    toast.style.background = "rgba(17, 27, 33, 0.94)";
    toast.style.color = "#ffffff";
    toast.style.font = "13px/1.4 system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    toast.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.24)";
    document.documentElement.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = "1";

  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.style.opacity = "0";
  }, 3200);
}
