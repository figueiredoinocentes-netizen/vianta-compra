

# Formularios inline escondidos (expandem ao clicar)

## Abordagem
Os formularios ficam escondidos na pagina e so aparecem quando o utilizador clica num botao CTA. Sem pop-up, sem pagina nova -- o formulario expande no sitio com uma animacao suave e a pagina faz scroll ate ele.

## Estrutura da pagina

```text
TopStrip
HeroSection (carrossel de viaturas)
  -> botao "Estou Interessado" expande e faz scroll para InlineForm stock
InlineForm stock (escondido por defeito, expande ao clicar)
ConsultancySection
  -> botao "Quero este servico" expande e faz scroll para InlineForm consultoria
InlineForm consultancy (escondido por defeito, expande ao clicar)
AdvantagesSection
SocialProofSection
Footer
```

## Alteracoes

### 1. Novo componente `src/components/vianta/InlineForm.tsx`
- Recebe props: `type` ("stock" | "consultancy"), `open` (boolean), `formRef` (ref para scroll)
- Quando `open` e `false`, renderiza uma div vazia com altura 0 (invisivel)
- Quando `open` e `true`, expande com animacao (transition de max-height ou similar) e mostra:
  - Titulo e descricao
  - Iframe GHL (criado imperativamente via ref callback, como ja feito no FormDialog)
- Usa a mesma tecnica imperativa para criar o iframe e evitar conflitos React/GHL

### 2. Atualizar `src/pages/Index.tsx`
- Remover imports de `FormDialog` e estados `stockDialogOpen` / `consultancyDialogOpen`
- Adicionar dois estados: `stockFormOpen` e `consultancyFormOpen` (booleanos)
- Adicionar dois refs: `stockFormRef` e `consultancyFormRef`
- `onContact` (hero): faz `setStockFormOpen(true)` e scroll suave ate `stockFormRef`
- `onScrollToForm` (consultoria): faz `setConsultancyFormOpen(true)` e scroll suave ate `consultancyFormRef`
- Inserir `<InlineForm>` nas posicoes corretas entre as seccoes

### 3. Simplificar `HeroSection.tsx` e `VehicleCard.tsx`
- `onContact` passa a `() => void` (sem label de viatura, so dispara o scroll/expand)

### 4. Remover `src/components/vianta/FormDialog.tsx`
- Ja nao e necessario

## Detalhes tecnicos
- Animacao de expansao com CSS transition em `max-height` (0 -> valor necessario) e `opacity`
- Scroll com `scrollIntoView({ behavior: "smooth" })` apos um pequeno delay (setTimeout 100ms) para dar tempo a animacao iniciar
- O iframe so e criado no DOM quando `open` passa a `true` pela primeira vez (performance)

