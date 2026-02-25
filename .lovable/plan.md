

# Formularios em Modal (Stock vs Consultoria)

## Resumo
Remover o formulario inline da pagina e mostrar formularios diferentes em modais (dialogs) conforme o CTA clicado:
- **Viaturas em stock**: Formulario `MFtB6ReND5CtglXtLk7v` ("Form LP Compra Stock")
- **Consultoria**: Formulario `D26uSHUDyRjZS4ZZuij4` (o atual)

## Alteracoes

### 1. Criar componente `FormDialog.tsx`
Novo componente que recebe o tipo de formulario ("stock" ou "consultoria"), o nome da viatura selecionada (opcional), e controla a abertura/fecho do dialog. Usa o componente Dialog do Radix ja existente no projeto. Renderiza o iframe do GHL correspondente ao tipo.

### 2. Alterar `Index.tsx`
- Remover a secao `GHLFormSection` da pagina (ja nao aparece inline)
- Remover `formRef` e toda a logica de scroll para o formulario
- Adicionar estado para controlar qual dialog abrir (`stockDialog` / `consultancyDialog`)
- Quando o user clica numa viatura, abre o dialog de stock com o nome da viatura pre-selecionado
- Quando o user clica no CTA da consultoria, abre o dialog de consultoria
- Ajustar o `StickyButton` (ja nao precisa de esconder perto do form)

### 3. Alterar `VehicleBottomSheet.tsx`
O botao "Estou Interessado" no bottom sheet passa a abrir diretamente o dialog de stock (em vez de fazer scroll para o formulario).

### 4. Alterar `VehicleCard.tsx`
O botao "Estou Interessado" no card abre o dialog de stock.

### 5. Alterar `ConsultancySection.tsx`
O botao "Quero este servico" abre o dialog de consultoria (em vez de scroll).

### 6. Remover `GHLFormSection.tsx`
Ja nao e necessario como componente separado.

---

### Detalhes tecnicos

**URLs dos formularios:**
- Stock: `https://api.bfdigital.io/widget/form/MFtB6ReND5CtglXtLk7v` (height: 1183px)
- Consultoria: `https://api.bfdigital.io/widget/form/D26uSHUDyRjZS4ZZuij4` (height: 1007px)

**Dialog**: Usa o Radix Dialog ja instalado. Full-screen no mobile, modal centrado no desktop. Scroll interno para acomodar a altura dos formularios.

**Banner da viatura**: O banner amarelo com o nome da viatura selecionada move-se para dentro do dialog de stock.

