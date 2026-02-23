

## Instalar Meta (Facebook) Pixel -- ID `788545497617754`

### Eventos a rastrear

| Evento Meta | Quando dispara |
|---|---|
| `PageView` | Ao carregar a pagina (se houver consentimento de cookies) |
| `ViewContent` | Ao clicar num card de viatura para ver detalhes |
| `Lead` | Quando o formulario GHL e submetido (detetado via `postMessage` do iframe) |

### Conformidade RGPD

O pixel so e carregado apos o utilizador clicar "Aceitar" no banner de cookies. Sem consentimento, nenhum script de tracking e injetado.

### Implementacao

#### 1. Criar `src/lib/meta-pixel.ts` (novo)

Ficheiro utilitario com:
- Constante `PIXEL_ID = "788545497617754"`
- `initPixel()` -- injeta o script `fbevents.js`, chama `fbq('init')` e dispara `PageView`
- `trackEvent(event, params)` -- dispara eventos como `ViewContent` e `Lead`
- Protecao contra dupla inicializacao
- Inclui tambem o `<noscript>` pixel via `<img>` criado dinamicamente

#### 2. Atualizar `src/components/vianta/CookieBanner.tsx`

Quando o utilizador clica "Aceitar":
- Apos guardar no `localStorage`, chamar `initPixel()` para ativar o pixel imediatamente

#### 3. Atualizar `src/App.tsx`

No carregamento da app, verificar se ja existe consentimento no `localStorage`. Se sim, inicializar o pixel automaticamente (para utilizadores que voltam ao site).

#### 4. Atualizar `src/components/vianta/VehicleCard.tsx`

Ao clicar no card (abre o bottom sheet), disparar:
- `trackEvent("ViewContent", { content_name: vehicle.model })`

#### 5. Atualizar `src/components/vianta/GHLFormSection.tsx`

Adicionar um `useEffect` com listener de `message` na `window`:
- Filtrar mensagens do iframe GHL (tipicamente `event.data` do tipo `Array`)
- Quando detetada submissao, disparar `trackEvent("Lead")`
- Limpar o listener no cleanup

### Ficheiros

| Ficheiro | Acao |
|---|---|
| `src/lib/meta-pixel.ts` | Novo -- utilitario de inicializacao e tracking |
| `src/components/vianta/CookieBanner.tsx` | Chamar `initPixel()` ao aceitar cookies |
| `src/App.tsx` | Auto-inicializar pixel se consentimento ja existir |
| `src/components/vianta/VehicleCard.tsx` | Disparar `ViewContent` ao clicar |
| `src/components/vianta/GHLFormSection.tsx` | Escutar `postMessage` do GHL e disparar `Lead` |

