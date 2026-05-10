# Discord Translator

Extensao do Chrome que traduz o rascunho atual da mensagem no Discord antes do envio.
Ela tenta aplicar a traducao direto no campo e usa a area de transferencia como fallback.

<img src="docs/popup-screenshot.png" alt="Popup da extensao Discord Translator">

## Instalacao

1. Abra o Chrome e acesse `chrome://extensions`.
2. Ative o **Modo do desenvolvedor**.
3. Clique em **Carregar sem compactacao**.
4. Selecione esta pasta do projeto.
5. Abra o popup da extensao.
6. Escolha seu idioma, escolha o idioma do contato, escolha o servico de traducao e ative a traducao.
7. Abra ou recarregue `https://discord.com/app` ou `https://discord.com/channels/@me`.

## Desenvolvimento

A extensao nao precisa de Node, npm ou build. O Chrome carrega os arquivos diretamente a partir do `manifest.json`.

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

A extensao oferece dois backends:

- **OpenAI** usa a Responses API com `gpt-4.1-mini`.
- **Google Translate API oficial** usa Google Cloud Translation Basic/v2.

O endpoint nao oficial do Google Translate foi removido para evitar erro 429, bloqueio temporario por trafego incomum e instabilidade futura. Configure cotas e limites no provedor escolhido para controlar custos.
