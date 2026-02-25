

## Instalar Microsoft Clarity (vmw36x980t)

### Abordagem

Seguir o mesmo padrão usado para o Meta Pixel: criar um módulo dedicado que injeta o script apenas quando o utilizador aceita cookies, respeitando o consentimento RGPD.

### Alterações

#### 1. Criar `src/lib/clarity.ts`

Novo ficheiro com uma função `initClarity()` que:
- Verifica se já foi inicializado (evita duplicação)
- Injeta o script do Clarity com o ID `vmw36x980t`
- Segue exatamente o mesmo padrão do `meta-pixel.ts`

#### 2. Atualizar `src/components/vianta/CookieBanner.tsx`

- Importar `initClarity` do novo módulo
- Chamar `initClarity()` junto com `initPixel()` quando o utilizador aceita cookies

#### 3. Atualizar `src/App.tsx` (componente `AppInner`)

- Importar `initClarity`
- Chamar `initClarity()` junto com `initPixel()` no `useEffect` (para utilizadores que já aceitaram cookies em visitas anteriores)

### Resultado

- O Clarity só carrega após consentimento de cookies (tal como o Meta Pixel)
- Utilizadores que já aceitaram cookies em visitas anteriores têm o Clarity ativado automaticamente ao carregar a página
- Nenhum impacto no desempenho para quem rejeita cookies

