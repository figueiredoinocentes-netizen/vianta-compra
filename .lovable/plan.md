

# Atualizar stock para 2 viaturas

## Alteracoes

### 1. `src/data/vehicles.ts`
- Remover todas as iaturas atuais
- Adicionar campo opcional `availableFrom?: string` ao interface Vehicle
- Adicionar 2 viaturas:
  - **Peugeot e2008**: id `peugeot-e2008`, year 2024, 28500€, Eletrico, Automatico, 10000 km, imagem `/placeholder.svg`
  - **BYD Ato 3 Design**: id `byd-ato3-design`, year 2023, 29000€, Eletrico, Automatico, 10000 km, `availableFrom: "25/03/2026"`, imagem `/placeholder.svg`

### 2. `src/components/vianta/VehicleCard.tsx`
- Quando `availableFrom` existir, mostrar badge "Disponível a partir de: 25/03/2026" acima do botao CTA

### 3. `src/components/vianta/HeroSection.tsx`
- Remover o hint de swipe ("← deslize para ver mais →") — com 2 cards ja nao faz tanto sentido

### Notas
- Ano guardado como numero simples (2024, 2023) sem mes
- Imagens placeholder por agora — utilizador pode fornecer fotos depois

