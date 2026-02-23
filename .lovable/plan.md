

## Política de Privacidade + Banner de Cookies

### 1. Criar página `/privacidade` -- `src/pages/PrivacyPolicy.tsx`

Página completa com a política de privacidade da Dos Inocentes Lda., incluindo:
- Identificacao do responsavel (Dos Inocentes Lda., NIF, morada)
- Dados recolhidos (nome, email, telefone via formulario GHL)
- Finalidade do tratamento (contacto comercial para aluguer TVDE)
- Base legal (consentimento)
- Prazo de conservacao
- Direitos do titular (acesso, retificacao, apagamento, portabilidade)
- Contacto do responsavel
- Cookies utilizados (funcionais, terceiros GHL)
- Layout simples com header e botao para voltar a homepage

### 2. Criar componente `src/components/vianta/CookieBanner.tsx`

Banner fixo no fundo do ecra que:
- Aparece se o utilizador ainda nao aceitou/rejeitou cookies (verificar `localStorage`)
- Texto curto: "Este site utiliza cookies. Consulte a nossa Politica de Privacidade."
- Dois botoes: "Aceitar" e "Rejeitar"
- Ao clicar, guarda a preferencia em `localStorage` e esconde o banner
- Estilo discreto, fundo escuro (`bg-primary`), alinhado com o design existente

### 3. Atualizar `src/App.tsx`

- Importar e adicionar rota `/privacidade` com o componente `PrivacyPolicy`
- Importar e renderizar `CookieBanner` globalmente (fora das rotas)

### 4. Atualizar `src/components/vianta/Footer.tsx`

- Alterar os links `href="#"` para:
  - "Politica de Privacidade" -> `<Link to="/privacidade">`
  - Remover o link "RGPD" separado (fica coberto pela politica de privacidade) ou apontar para a mesma pagina

### Ficheiros

| Ficheiro | Acao |
|---|---|
| `src/pages/PrivacyPolicy.tsx` | Novo -- pagina de politica de privacidade |
| `src/components/vianta/CookieBanner.tsx` | Novo -- banner de cookies |
| `src/App.tsx` | Adicionar rota `/privacidade` + `CookieBanner` |
| `src/components/vianta/Footer.tsx` | Atualizar links para usar `Link` do react-router |

