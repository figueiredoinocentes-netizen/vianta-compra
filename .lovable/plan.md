## Atualização do design dos cards de viaturas

Redesenhar os cards na secção "Viaturas Disponíveis" para destacar a prestação mensal como valor principal e adicionar novos campos (versão e autonomia real).

### 1. `src/data/vehicles.ts` — novos campos

Adicionar à interface `Vehicle`:
- `version?: string` — designação da versão/trim
- `realRange?: number` — autonomia real em km (para elétricos)
- `monthlyPrice?: number` — prestação mensal em €

Preencher cada viatura com valores inventados plausíveis:

| Viatura | Versão | Autonomia | Prestação |
|---|---|---|---|
| Peugeot e2008 | GT Electric 50kWh | 320 km | 285€/mês |
| BYD Ato 3 Design | Design 60.5kWh | 360 km | 295€/mês |
| Opel Mokka-e | Elegance 50kWh | 290 km | 199€/mês |
| MG MG4 | Standard 51kWh | 310 km | 189€/mês |

### 2. `src/components/vianta/VehicleCard.tsx` — novo layout

**Cabeçalho (modelo + versão):**
```
Peugeot e2008
GT Electric 50kWh           ← novo, text-xs text-muted-foreground
2024
```

**Bloco de preço (lado direito do cabeçalho):**
```
285€/mês                    ← destaque principal: text-3xl font-extrabold text-primary
desde 28 500€               ← secundário: text-xs text-muted-foreground
```

**Specs badges (linha de ícones):**
- Substituir o badge "Automático" por "350 km" com ícone `BatteryCharging` da lucide-react
- Manter os badges de combustível e quilometragem
- Para viaturas sem `realRange`, manter fallback para transmissão

Layout final dos badges: `[⚡ 320 km] [⚡ Elétrico] [📊 10 000 km]`

### 3. Detalhes técnicos

- Formatação prestação: `${monthlyPrice}€/mês`
- Formatação preço secundário: `desde ${formatPrice(salePrice)}`
- Ícone autonomia: `BatteryCharging` (lucide-react), tamanho `w-3.5 h-3.5`
- O `VehicleBottomSheet` mantém o preço total como valor principal (não muda nesta tarefa, exceto se quiseres que eu também atualize lá)

### Ficheiros a alterar
- `src/data/vehicles.ts`
- `src/components/vianta/VehicleCard.tsx`
