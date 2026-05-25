## Objetivo
No desktop, mostrar a lista de viaturas em layout vertical com scroll, mantendo o carrossel horizontal atual no mobile.

## Alterações

**`src/components/vianta/HeroSection.tsx`**
- Aplicar layout responsivo no container das viaturas:
  - Mobile (atual): carrossel horizontal com `snap-x` e scroll lateral.
  - Desktop (`md:` em diante): grelha/coluna vertical centrada, com largura máxima (ex.: `max-w-2xl mx-auto`), `flex-col` e `gap` vertical. O scroll passa a ser o scroll natural da página.
- Ajustar o título/subtítulo para ficarem centrados e legíveis também em desktop.

**`src/components/vianta/VehicleCard.tsx`**
- Tornar a largura do card responsiva:
  - Mobile (atual): `w-[88vw] max-w-[360px]` + `snap-center` + `flex-none`.
  - Desktop: largura total da coluna (`md:w-full md:max-w-none`) e remover `snap-center`/`flex-none` para se comportar como bloco vertical.
- Manter imagem, badges, specs e CTA inalterados.

## Resultado esperado
- Mobile: experiência atual (swipe horizontal) mantida.
- Desktop: viaturas empilhadas verticalmente, centradas, com scroll normal da página — mais fácil de comparar e percorrer.

## Fora de âmbito
- Sem alterações a dados, formulário, cores ou copy.
