# Discord Translator NODEJS

Extensao do Chrome que traduz o rascunho atual da mensagem no Discord antes do envio.
Ela tenta aplicar a traducao direto no campo e usa a area de transferencia como fallback.

<img src="docs/popup-screenshot.png" alt="Popup da extensao Discord Translator">

## Instalacao

1. Instale as dependencias com `npm install`.
2. Gere o background empacotado com `npm run build`.
3. Abra o Chrome e acesse `chrome://extensions`.
4. Ative o **Modo do desenvolvedor**.
5. Clique em **Carregar sem compactacao**.
6. Selecione esta pasta do projeto.
7. Abra o popup da extensao.
8. Escolha seu idioma, escolha o idioma do contato, escolha o servico de traducao e ative a traducao.
9. Abra ou recarregue `https://discord.com/app` ou `https://discord.com/channels/@me`.

## Desenvolvimento

Depois de alterar `src/background.js`, rode `npm run build` novamente para atualizar `dist/background.js`.
Para visualizar o popup pelo navegador, rode `npm run preview` e abra `http://127.0.0.1:4173/popup.html`.

## Como usar

1. Digite uma mensagem no Discord.
2. Pressione `Alt + T`.
3. A extensao tenta substituir o rascunho pela traducao diretamente no campo.
4. Se o Discord bloquear a substituicao direta, a traducao sera copiada para a area de transferencia.
5. Revise o texto e envie manualmente.

A extensao nao envia mensagens automaticamente.
Ela nao usa APIs internas de envio do Discord.

## Configuracoes

- **Seu Idioma** define o idioma em que voce normalmente escreve.
- **Idioma do Contato** define o idioma usado para traduzir o rascunho.
- **Servico de traducao** define qual backend sera usado.
- **OpenAI API Key** e necessaria quando o servico escolhido for OpenAI.
- **Google Cloud API Key** e necessaria quando o servico escolhido for Google Translate API oficial.
- **Ativar Traducao** ativa ou pausa o atalho `Alt + T`.

## Traducao

A extensao oferece tres backends:

- **OpenAI** usa a Responses API com `gpt-4.1-mini`.
- **Google Translate API oficial** usa Google Cloud Translation Basic/v2.
- **Google nao oficial (@vitalets)** usa `@vitalets/google-translate-api` empacotado no background script.

O modo `@vitalets` usa um endpoint nao oficial do Google Translate, entao pode gerar erro 429, bloqueio temporario por trafego incomum ou parar de funcionar se o servico mudar. Para uso frequente, prefira OpenAI ou Google Translate API oficial com cotas e limites configurados.
