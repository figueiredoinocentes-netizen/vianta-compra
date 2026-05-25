## Objetivo
No desktop, mostrar as viaturas numa grelha com 3 cards por linha (em vez de coluna vertical). Mobile mantém o carrossel horizontal.

## Alterações

**`src/components/vianta/HeroSection.tsx`**
- Substituir o layout vertical (`md:flex-col`) por uma grelha de 3 colunas no desktop:
  - Mobile: continua `flex` horizontal com snap e scroll lateral.
  - Desktop (`md:`): `md:grid md:grid-cols-2 lg:grid-cols-3` com `gap-6`, largura máxima ampla (ex.: `md:max-w-6xl`) e centrada.
- Manter título/subtítulo centrados.

**`src/components/vianta/VehicleCard.tsx`**
- Ajustar largura no desktop para encaixar na grelha: `md:w-auto md:max-w-none` (ocupa a coluna da grid). Mobile inalterado.
- Reduzir altura da imagem em desktop se necessário (`md:h-44`) para o card ficar mais compacto.

## Resultado
- Mobile: carrossel horizontal (atual).
- Tablet: 2 colunas. Desktop: 3 colunas.

## Fora de âmbito
Cores, copy, dados e formulários.
