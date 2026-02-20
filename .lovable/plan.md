
## Pré-selecionar viatura no formulário ao clicar "Pedir contacto"

### Contexto técnico importante

O formulário está embutido num `iframe` de domínio externo (`api.bfdigital.io`), o que significa que **não é possível manipular diretamente os campos internos do formulário via JavaScript** por razões de segurança do browser (política de cross-origin).

A solução viável é **passar o nome da viatura via URL** para a página do formulário (query string ou hash), e mostrar acima do iframe um **indicador visual** claro de qual viatura foi selecionada — garantindo que o cliente sabe que está a pedir contacto sobre aquela viatura, e que a equipa da Vianta recebe essa informação através do nome da viatura que fica guardado no estado da app.

A melhor forma de ligar a viatura selecionada ao formulário GHL é através do **URL do iframe com parâmetros**, aproveitando o mecanismo de pré-preenchimento que o GHL suporta via query string (`?nome_campo=valor`).

---

### Abordagem

#### Como funciona o fluxo

1. Utilizador clica **"Pedir contacto sobre esta viatura"** no bottom sheet
2. O bottom sheet fecha e a página faz scroll para o formulário
3. **O nome da viatura é passado** para o componente `GHLFormSection`
4. O iframe do GHL é construído com um parâmetro na URL, ex: `?viatura=Tesla+Model+3+2022`
5. Acima do iframe aparece um **banner de contexto** com a viatura selecionada: *"A pedir contacto sobre: Tesla Model 3 (2022)"*

#### Parâmetro GHL na URL do iframe

O GHL suporta pré-preenchimento de campos via query string. A URL do iframe passa a ser:
```
https://api.bfdigital.io/widget/form/D26uSHUDyRjZS4ZZuij4?viatura=Tesla%20Model%203%20(2022)
```

O campo `viatura` no GHL precisa de ter o mesmo nome de variável configurado no backend GHL (campo oculto ou visível). O iframe é re-renderizado com a nova URL quando a viatura muda.

---

### Alterações necessárias

#### 1. `src/pages/Index.tsx` — Estado da viatura selecionada

Adicionar estado `selectedVehicleLabel: string | null`. A função `scrollToForm` passa a aceitar um parâmetro opcional com o label da viatura (ex: `"Tesla Model 3 (2022)"`), e guarda-o no estado.

Passar `selectedVehicleLabel` como prop para `GHLFormSection`.

#### 2. `src/components/vianta/HeroSection.tsx` — Passar viatura ao `onContact`

A prop `onContact` passa a aceitar um argumento: `onContact: (vehicleLabel: string) => void`.

Quando o utilizador clica "Pedir contacto" no bottom sheet, chama `onContact(vehicle.model + " (" + vehicle.year + ")")`.

#### 3. `src/components/vianta/VehicleBottomSheet.tsx` — Passar viatura ao callback

A prop `onContact: () => void` passa a ser `onContact: (vehicleLabel: string) => void`.

O botão CTA passa a chamar `onContact(vehicle.model + " (" + vehicle.year + ")")` em vez de `onContact()`.

#### 4. `src/components/vianta/GHLFormSection.tsx` — URL dinâmica + banner

- Recebe nova prop `selectedVehicle: string | null`
- O iframe é construído com URL dinâmica incluindo o parâmetro de viatura quando existe
- Acima do iframe, quando `selectedVehicle` está definido, aparece um banner de contexto:

```text
┌─────────────────────────────────────────────┐
│ 🚗  A pedir contacto sobre:                 │
│     Tesla Model 3 (2022)                    │
└─────────────────────────────────────────────┘
```

O banner usa as cores e estilos existentes (bg-muted, rounded-xl, etc.) e tem um botão "× limpar" para repor a seleção.

- O iframe usa `key={selectedVehicle ?? "default"}` para forçar re-render com a nova URL quando a viatura muda.

---

### Fluxo completo

```text
Utilizador clica "Pedir contacto sobre esta viatura"
          ↓
VehicleBottomSheet: onContact("Tesla Model 3 (2022)")
          ↓
HeroSection: passa para Index.scrollToForm("Tesla Model 3 (2022)")
          ↓
Index: guarda selectedVehicleLabel, scroll para form
          ↓
GHLFormSection: recebe "Tesla Model 3 (2022)"
  → Mostra banner com viatura
  → iframe src inclui ?viatura=Tesla+Model+3+(2022)
```

---

### Ficheiros alterados

| Ficheiro | Alteração |
|---|---|
| `src/pages/Index.tsx` | Estado `selectedVehicleLabel`, `scrollToForm` aceita label |
| `src/components/vianta/HeroSection.tsx` | `onContact` aceita `vehicleLabel: string` |
| `src/components/vianta/VehicleBottomSheet.tsx` | `onContact` aceita `vehicleLabel: string`, passa-o no clique |
| `src/components/vianta/GHLFormSection.tsx` | Recebe `selectedVehicle`, mostra banner, URL do iframe dinâmica |

---

### Nota sobre o GHL

Para que o campo apareça pré-preenchido **dentro** do formulário, é necessário que no backend do GoHighLevel exista um campo com o nome de variável `viatura` (ou o nome que for definido). A URL do iframe passará esse parâmetro automaticamente. Se o campo não existir no GHL, a viatura aparecerá apenas no banner visual acima do formulário — o que já é suficiente para a equipa saber sobre que viatura o cliente está a pedir contacto.
