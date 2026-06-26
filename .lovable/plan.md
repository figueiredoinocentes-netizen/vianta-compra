## Objetivo
Remover a secção de Consultoria Automóvel da página.

## Alterações

**`src/pages/Index.tsx`**
- Remover o import de `ConsultancySection`.
- Remover `<ConsultancySection onScrollToForm={openStockForm} />` do JSX.

**`src/components/vianta/ConsultancySection.tsx`**
- Apagar o ficheiro (já não é usado).

## Fora de âmbito
Cores, dados, formulários e restantes secções.