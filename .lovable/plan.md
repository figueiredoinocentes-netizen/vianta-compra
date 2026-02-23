

## Otimizar pop-up de viaturas para desktop

### Problema atual

O `VehicleBottomSheet` ocupa toda a largura do ecra em desktop, o que faz com que a imagem do carro fique muito esticada horizontalmente e cortada na vertical (altura fixa de `h-52` = 208px numa largura de ~1240px resulta num aspect ratio muito largo).

### Solucao

Transformar o componente para funcionar como **modal centrado em desktop** e manter o **bottom sheet em mobile**.

### Alteracoes em `src/components/vianta/VehicleBottomSheet.tsx`

1. **Layout responsivo do container**:
   - Mobile (default): manter `fixed bottom-0 left-0 right-0` com `translate-y` (bottom sheet atual)
   - Desktop (`md:` e acima): centrar na tela com `md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:bottom-auto md:rounded-3xl md:max-w-lg md:max-h-[85vh]`

2. **Imagem com proporcao correta**:
   - Mudar de `h-52` fixo para `aspect-video` (16:9), que funciona bem para fotos de carros
   - Em desktop, a imagem fica proporcional dentro do modal de ~512px de largura

3. **Layout do conteudo em desktop**:
   - A largura limitada (`max-w-lg` = 512px) garante que texto, botoes e grelha de detalhes ficam bem proporcionados
   - Remover o handle bar em desktop (so faz sentido em mobile para swipe)

### Detalhes tecnicos

Alteracoes no ficheiro `src/components/vianta/VehicleBottomSheet.tsx`:

- Container principal: adicionar classes responsivas `md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:bottom-auto md:left-auto md:right-auto md:rounded-3xl md:max-w-lg md:w-full`
- Div da imagem: substituir `h-52` por `aspect-video` para manter proporcao 16:9
- Handle bar: adicionar `md:hidden` para esconder em desktop
- Animacao em desktop: usar `md:scale` em vez de `translate-y` (fade + zoom em vez de slide up)

### Resultado esperado

- **Mobile**: bottom sheet desliza de baixo, sem alteracoes visuais
- **Desktop**: modal centrado com ~512px de largura, imagem em 16:9, aspeto limpo e profissional

