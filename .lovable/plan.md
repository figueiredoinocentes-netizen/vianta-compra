## Problema

O iframe do formulário GHL tem uma altura fixa (`height: 1183px`) definida no `InlineForm.tsx`. Quando o utilizador preenche/expande todos os campos dinâmicos, o conteúdo real do formulário ultrapassa essa altura e a CTA fica escondida atrás da secção seguinte ("Não encontrou a viatura certa?").

Além disso, o wrapper exterior também tem `maxHeight: form.height + 200px`, o que limita o crescimento mesmo que o iframe cresça.

## Solução

Permitir que o iframe cresça dinamicamente conforme o conteúdo do formulário, ouvindo as mensagens `postMessage` que o `form_embed.js` da GHL envia com a altura real do formulário, e remover o tecto fixo do wrapper quando aberto.

### Alterações em `src/components/vianta/InlineForm.tsx`

1. **Altura inicial generosa + auto-resize**: manter `form.height` como altura inicial (evita "salto" visual), mas adicionar um listener `window.addEventListener("message", ...)` que detecta mensagens vindas do iframe da GHL (origem `api.bfdigital.io`) com a nova altura do formulário e atualiza:
   - a altura do `<iframe>` 
   - o `maxHeight` do wrapper exterior

2. **Wrapper sem tecto rígido quando aberto**: substituir `maxHeight: open ? form.height + 200 : 0` por uma altura controlada por estado (`useState<number>`) que reflete a altura medida do iframe + padding da secção (`pt-10 pb-20` ≈ 120px). Quando ainda não temos medição, usar `form.height + 200` como fallback.

3. **Cleanup do listener** no `useEffect` de unmount.

### Detalhes técnicos

- O script `form_embed.js` da GHL envia eventos `postMessage` no formato aproximado `{ type: "hsFormCallback" | "form-resize" | ..., height: number, id: <formId> }`. Vamos filtrar por `event.origin.includes("bfdigital.io")` e por `event.data.id === form.id` (ou similar) antes de aceitar a altura.
- Se o formato exato da mensagem variar, aceitar qualquer `event.data.height` numérico vindo da origem correta, com um mínimo de `form.height` para não encolher demasiado.
- Nenhuma mudança de lógica de negócio nem em outros ficheiros.

## Ficheiros alterados

- `src/components/vianta/InlineForm.tsx` (apenas presentação/comportamento do embed)
