
## 6 melhorias em simultâneo

### 1. Logo da Vianta no canto superior esquerdo

Criar um novo componente `Navbar.tsx` (ou adicionar diretamente ao `HeroSection`) com o nome "Vianta" em formato logótipo — texto bold com a cor dourada (#ecdb70 / `text-accent`) sobre o fundo dark charcoal, posicionado no canto superior esquerdo da secção hero, acima do h1.

Estrutura:
```
<div className="px-5 pt-2 pb-0 flex items-center">
  <span className="text-2xl font-extrabold tracking-tight text-accent font-serif">Vianta</span>
</div>
```
(Se existir um ficheiro de imagem do logo, pode ser substituído depois — por agora usa texto estilizado para não bloquear as outras alterações.)

---

### 2. Texto do botão: "Quero esta" → "Mais Informação"

**Ficheiro:** `src/components/vianta/VehicleCard.tsx`, linha 74.

```tsx
// Antes
Quero esta

// Depois
Mais Informação
```

---

### 3. Card inteiro clicável

Atualmente apenas o botão chama `onSelect`. O card inteiro deve ser clicável.

**Ficheiro:** `src/components/vianta/VehicleCard.tsx`

- Adicionar `onClick={() => onSelect(vehicle)}` e `cursor-pointer` no `div` raiz do card
- Remover o botão separado ou mantê-lo como elemento decorativo (sem `onClick` próprio, herda do pai)
- Adicionar `role="button"` e `tabIndex={0}` para acessibilidade

```tsx
<div
  className="flex-none w-[82vw] max-w-[320px] bg-card rounded-2xl shadow-md border border-border overflow-hidden snap-center cursor-pointer active:scale-[0.98] transition-transform"
  onClick={() => onSelect(vehicle)}
  role="button"
  tabIndex={0}
  onKeyDown={(e) => e.key === "Enter" && onSelect(vehicle)}
>
```

O botão "Mais Informação" mantém-se visualmente mas sem `onClick` redundante (herda do pai).

---

### 4. Fechar bottom sheet ao deslizar para baixo (swipe down)

**Ficheiro:** `src/components/vianta/VehicleBottomSheet.tsx`

Adicionar deteção de swipe vertical com `onTouchStart` / `onTouchMove` / `onTouchEnd`:

```tsx
const touchStartY = useRef(0);

const handleTouchStart = (e: React.TouchEvent) => {
  touchStartY.current = e.touches[0].clientY;
};

const handleTouchMove = (e: React.TouchEvent) => {
  // opcional: feedback visual durante o drag
};

const handleTouchEnd = (e: React.TouchEvent) => {
  const deltaY = e.changedTouches[0].clientY - touchStartY.current;
  if (deltaY > 80) { // swipe down de pelo menos 80px
    onClose();
  }
};
```

Estes handlers são aplicados no `div` do bottom sheet (não no conteúdo scrollável interior, para não interferir com o scroll normal).

---

### 5. TopStrip — fundo dourado escuro + tipografia clássica

**Ficheiro:** `src/index.css` + `src/components/vianta/TopStrip.tsx`

Mudar o token `--strip-bg` de charcoal escuro para um dourado escuro (tom âmbar/ouro envelhecido):

```css
/* Antes */
--strip-bg: 220 50% 18%;       /* charcoal azulado */
--strip-foreground: 210 40% 90%;

/* Depois */
--strip-bg: 43 60% 28%;        /* ouro escuro / âmbar rico */
--strip-foreground: 43 80% 90%; /* dourado claro */
```

No componente `TopStrip.tsx`, adicionar `font-serif` e `tracking-widest` para um look mais clássico e premium:

```tsx
<div className="bg-strip text-strip-foreground text-center py-2.5 px-4 text-xs font-serif tracking-widest uppercase">
  Desde 2017 &bull; Entrega rápida &bull; Processo transparente
</div>
```

---

### 6. Botão "Pedir contacto" — mais proeminente e reposicionado

**Ficheiro:** `src/components/vianta/VehicleBottomSheet.tsx`

Mover o botão para logo abaixo do título/preço (antes dos cards de características), torná-lo mais alto e visualmente forte:

**Ordem atual do conteúdo:**
1. Título + preço + badge
2. Grid de características (ano, caução, combustível, caixa)
3. Lista de specs
4. Nota de caução
5. **Botão** ← aqui (no fundo)

**Nova ordem:**
1. Título + preço + badge
2. **Botão "Pedir contacto"** ← sobe para aqui, imediatamente abaixo do preço
3. Grid de características
4. Lista de specs
5. Nota de caução

Estilo do botão atualizado — mais alto e com mais peso visual:

```tsx
<Button
  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-extrabold rounded-xl text-base py-4 h-14 shadow-md mt-4 mb-5"
  size="lg"
  onClick={() => { onClose(); onContact(); }}
>
  Pedir contacto sobre esta viatura
</Button>
```

---

### Ficheiros alterados

| Ficheiro | Alterações |
|---|---|
| `src/components/vianta/HeroSection.tsx` | Adicionar logo Vianta no topo |
| `src/components/vianta/VehicleCard.tsx` | Texto botão, card clicável |
| `src/components/vianta/VehicleBottomSheet.tsx` | Swipe to close, reposicionar e engrossar botão |
| `src/components/vianta/TopStrip.tsx` | Font serif + tracking |
| `src/index.css` | Token `--strip-bg` para dourado escuro |
