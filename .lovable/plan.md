

## Simplificar funil e enriquecer os cards das viaturas

### Resumo

1. Remover o pop-up (bottom sheet) do fluxo — clicar no card leva direto ao formulário
2. Alterar o texto do botão no card para **"Estou Interessado Nesta Viatura"**
3. Adicionar informação de **quilometragem** ("Até 2.000km/semana") ao card da viatura

### Alterações

#### `src/components/vianta/VehicleCard.tsx`

- Alterar a prop `onSelect` para receber uma callback que aceita o label da viatura (string) — ou manter o objeto e deixar o pai decidir
- Renomear o botão de **"Mais Informação"** para **"Estou Interessado Nesta Viatura"**
- Adicionar um novo badge/tag na secção de specs com o ícone `Gauge` e o texto **"Até 2.000km/semana"**
- A secção de specs já mostra Transmissão e Combustível, por isso a quilometragem será o terceiro item na mesma linha

#### `src/components/vianta/HeroSection.tsx`

- Remover os estados `selectedVehicle` e `sheetOpen`
- Remover a importação e renderização do `VehicleBottomSheet`
- O handler de clique no card passa a chamar diretamente `onContact` com o label da viatura (ex: "Tesla Model 3 (2022)")
- Tanto o clique no card como o clique no botão levam ao formulário

#### Ficheiros mantidos (não apagados)

- `src/components/vianta/VehicleBottomSheet.tsx` — permanece no projeto sem ser utilizado, para facilitar reversão futura

### Resultado visual do card

```text
┌─────────────────────────────┐
│         [Imagem]            │
│  [Disponível]               │
├─────────────────────────────┤
│  Tesla Model 3       360€  │
│  2022            por semana │
│                             │
│  [Automático] [Elétrico]    │
│  [Até 2.000km/semana]       │
│                             │
│  [Estou Interessado Nesta   │
│        Viatura]             │
└─────────────────────────────┘
```

### Fluxo simplificado

```text
Antes: Card → Pop-up → Botão "Pedir contacto" → Form
Agora: Card → Form (com viatura pré-selecionada)
```

