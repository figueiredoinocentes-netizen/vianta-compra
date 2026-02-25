

# Corrigir scroll automático ao clicar nos campos do formulário

## Problema
Quando se clica num campo dentro do iframe do formulário, o browser tenta fazer scroll automático para garantir que o elemento focado fica visível. Isto causa um salto visual indesejado no modal.

## Solução
Adicionar `onFocus` handler no `DialogContent` que previne o scroll automático do browser, e usar `overflow: hidden` no body quando o dialog está aberto para impedir scrolls na página por trás.

### Alteração em `src/components/vianta/FormDialog.tsx`
- Adicionar a prop `onOpenAutoFocus` ao `DialogContent` com `e.preventDefault()` para impedir que o Radix faça focus automático (que dispara o scroll).
- Manter o `overflow-y-auto` apenas no container do iframe, não no `DialogContent` inteiro — isto limita o scroll ao conteúdo do formulário sem que a página atrás se mova.

### Alteração em `src/components/ui/dialog.tsx`
- Expor a prop `onOpenAutoFocus` no `DialogContent` (já é suportada pelo Radix, só precisa de ser passada ao `DialogPrimitive.Content`).

Estas são alterações mínimas que resolvem o problema sem afetar o resto da aplicação.

