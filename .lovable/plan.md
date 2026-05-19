## Objetivo
Garantir que, no mobile, o botão de submissão do formulário nunca fica escondido quando os campos dinâmicos expandem.

## Plano
1. Ajustar a lógica de altura do `InlineForm` para deixar de depender de um valor fixo insuficiente quando o iframe cresce com campos dinâmicos.
2. Reservar espaço seguro no fundo do formulário em mobile para impedir que o CTA flutuante ou a secção seguinte interfiram visualmente com a área final do iframe.
3. Rever a visibilidade/comportamento do botão flutuante enquanto o formulário estiver aberto, para evitar sobreposição no fundo do ecrã.
4. Validar no viewport móvel com o formulário expandido e com todos os campos dinâmicos selecionados, confirmando que o botão de submissão fica totalmente visível e clicável.

## Detalhes técnicos
- `src/components/vianta/InlineForm.tsx`
  - Substituir o cálculo rígido de `maxHeight`/padding por uma abordagem que acompanhe melhor a altura real do iframe.
  - Aumentar a folga inferior em mobile e evitar corte do conteúdo final.
- `src/pages/Index.tsx`
  - Passar estado suficiente para controlar o botão flutuante enquanto o formulário estiver aberto.
- `src/components/vianta/StickyButton.tsx`
  - Manter o CTA flutuante fora do caminho quando o formulário estiver ativo.

## Resultado esperado
Mesmo com todos os campos dinâmicos abertos no mobile, o utilizador vê sempre o botão de submissão completo, sem ficar escondido pela secção seguinte nem pelo botão flutuante.