

# Corrigir FormDialog: remover banner da viatura + novo form consultoria

## Alteracoes

### 1. `src/components/vianta/FormDialog.tsx`
- **Remover o banner/card** que mostra a viatura selecionada (o bloco com icone Car e texto "A pedir contacto sobre"). Remover tambem o import de `Car` e a prop `vehicleLabel`.
- **Atualizar o formulario de consultoria** para o novo ID:
  - ID: `f0KULSnF1uiKyvsBdaqO`
  - Nome: `Form LP Compra Consultoria`
  - Height: `1183`
- Remover a logica de query param `?viatura=` no iframe src do stock (ja nao e necessario sem o banner).

### 2. `src/pages/Index.tsx`
- Remover o estado `selectedVehicleLabel` e a prop `vehicleLabel` passada ao FormDialog de stock.
- Simplificar `openStockDialog` para nao receber/guardar label.

