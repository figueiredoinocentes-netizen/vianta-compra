# Unificar formulários: usar apenas o form de Stock

## Alteração

Ambos os CTAs (Hero "Estou Interessado" e Consultoria "Quero este serviço") passam a abrir o mesmo formulário inline (o de Stock). Não há distinção de leads no GHL por enquanto.

### `src/pages/Index.tsx`
- Remover o estado `consultancyFormOpen` e o ref `consultancyFormRef`
- Remover a segunda instância de `<InlineForm type="consultancy" ... />`
- Renomear `openStockForm` para `openForm` (ou manter) e fazer com que `ConsultancySection.onScrollToForm` chame a mesma função que abre/scrolla até ao form de stock
- Resultado: só existe um `<InlineForm type="stock" />` na página, posicionado entre Hero e ConsultancySection, e ambos os botões scrollam até ele

### Ficheiros não alterados
- `InlineForm.tsx` continua a suportar os dois tipos (útil para reativar consultoria no futuro)
- `ConsultancySection.tsx` mantém-se igual (continua a receber `onScrollToForm`)
