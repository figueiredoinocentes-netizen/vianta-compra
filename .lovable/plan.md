

## Transformar a landing page de aluguer para venda de viaturas

### Resumo das alterações

Adaptar toda a página para o contexto de venda, com novas secções de consultoria automóvel e prova social, mantendo a estrutura visual existente.

---

### 1. Dados das viaturas (`src/data/vehicles.ts`)

- Renomear `weeklyPrice` para `salePrice` (preço de venda)
- Remover campos de aluguer: `deposit`, `depositInstallments`, `previousPrice`
- Adicionar campo `mileage: number` (km atuais, ex: 85000)
- Remover o campo `availability` (todas estão disponíveis para venda)
- Atualizar os valores de cada viatura com preços de venda e quilometragem real (valores placeholder que podes ajustar)

### 2. Card da viatura (`src/components/vianta/VehicleCard.tsx`)

- Mostrar preço de venda (ex: "18.900EUR") em vez de preço semanal
- Remover label "por semana"
- Trocar badge de km semanais por km atuais (ex: "85.000 km")
- Remover badge de disponibilidade (topo da imagem)
- Manter badges de combustível e transmissão
- Botão: "Estou Interessado" (texto mais curto para venda)

### 3. Hero Section (`src/components/vianta/HeroSection.tsx`)

- Titulo: "Encontre a sua viatura ideal" (ou similar para venda)
- Subtitulo: adaptado para compra de viaturas TVDE
- Manter o carrossel de cards

### 4. Secção de Vantagens (`src/components/vianta/AdvantagesSection.tsx`)

Substituir as vantagens de aluguer por informação de venda:
- **Financiamento disponivel** -- "Facilitamos o acesso a financiamento. Trabalhamos com parceiros para encontrar as melhores condições."
- **Retoma da sua viatura** -- "Tem uma viatura para trocar? Avaliamos e fazemos retoma, simplificando o processo de compra."
- **Viaturas preparadas para TVDE** -- manter (já existe)
- **Processo rapido e transparente** -- manter/adaptar
- **Apoio e acompanhamento** -- manter/adaptar

### 5. Nova secção: Consultoria Automovel (`src/components/vianta/ConsultancySection.tsx`)

Nova secção entre as vantagens e o formulário:

- Titulo: "Nao encontraste a viatura certa?"
- Subtitulo: "Nao te preocupes, diz-nos o que procuras. Com o nosso servico de consultoria automovel encontramos a melhor solucao para cada motorista."
- Timeline/stepper vertical com 5 passos:
  1. Brief (budget, tipo de carro, objetivo TVDE)
  2. Procura e selecao (inclui alternativas)
  3. Validacao e aprovacao (tu escolhes)
  4. Compra + preparacao
  5. Entrega pronta a trabalhar
- CTA no final: botão que faz scroll ao formulário

### 6. Nova secção: Prova Social (`src/components/vianta/SocialProofSection.tsx`)

Nova secção após a consultoria (antes do formulário):

- Titulo: "No mercado desde 2017"
- Subtitulo breve sobre experiência
- Espaco para 1 video embed (placeholder com iframe responsivo 16:9, URL configurável -- por agora um placeholder visual com ícone de play)

### 7. Formulário (`src/components/vianta/GHLFormSection.tsx`)

- Atualizar copy: "Peça contacto" / "Preencha o formulário para saber mais sobre a compra da viatura"
- Manter a mesma lógica de viatura pré-selecionada
- Manter o mesmo form ID GHL (podes trocar depois)

### 8. SEO e textos gerais

- `Index.tsx`: Atualizar `<title>` para venda (ex: "Vianta -- Venda de Viaturas para TVDE")
- Footer: sem alterações necessárias

### 9. Página Index (`src/pages/Index.tsx`)

- Adicionar as duas novas secções na ordem:
  1. TopStrip
  2. HeroSection (carrossel)
  3. AdvantagesSection (financiamento, retoma, etc.)
  4. ConsultancySection (nova)
  5. SocialProofSection (nova)
  6. GHLFormSection (formulário)
  7. Footer

### Ficheiros criados
- `src/components/vianta/ConsultancySection.tsx`
- `src/components/vianta/SocialProofSection.tsx`

### Ficheiros editados
- `src/data/vehicles.ts`
- `src/components/vianta/VehicleCard.tsx`
- `src/components/vianta/HeroSection.tsx`
- `src/components/vianta/AdvantagesSection.tsx`
- `src/components/vianta/GHLFormSection.tsx`
- `src/pages/Index.tsx`

