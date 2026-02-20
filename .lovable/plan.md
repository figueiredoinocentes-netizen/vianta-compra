
## Substituir o logo de texto pelo SVG real da Vianta — na TopStrip

### O que vai mudar

O utilizador quer:
1. Usar a imagem SVG `LOGO-VIANTA-2.svg` em vez do texto "Vianta"
2. Colocar o logo **na barra superior** (TopStrip), não na HeroSection

### Estrutura atual

A página está organizada assim (de cima para baixo):

```text
TopStrip  ← barra dourada "Desde 2017 • Entrega rápida..."
HeroSection  ← tem o texto "Vianta" no canto superior esquerdo
AdvantagesSection
GHLFormSection
Footer
```

### Plano de alterações

---

#### 1. Copiar o SVG para `src/assets/`

O ficheiro `user-uploads://LOGO-VIANTA-2.svg` será copiado para `src/assets/logo-vianta.svg` para poder ser importado como módulo ES6 nos componentes React.

---

#### 2. `src/components/vianta/TopStrip.tsx` — Adicionar o logo à esquerda

A TopStrip passa a ter um layout em duas colunas:
- **Esquerda**: logo SVG da Vianta (altura ~32px, preserva a cor dourada do SVG)
- **Centro/Direita**: texto informativo existente

```tsx
import logo from "@/assets/logo-vianta.svg";

const TopStrip = () => {
  return (
    <div className="bg-strip text-strip-foreground flex items-center justify-between px-4 py-2">
      <img src={logo} alt="Vianta" className="h-8 w-auto" />
      <span className="text-xs font-serif tracking-widest uppercase text-center flex-1 px-2">
        Desde 2017 &bull; Entrega rápida &bull; Processo transparente
      </span>
    </div>
  );
};
```

O SVG já tem a cor dourada (`#ddcd60`) incorporada — fica visível perfeitamente sobre o fundo dourado escuro da strip, com contraste adequado.

---

#### 3. `src/components/vianta/HeroSection.tsx` — Remover o texto "Vianta"

O bloco `<div className="px-5 pt-2 pb-0 flex items-center mb-4">` com o texto `Vianta` em dourado é removido, pois o logo passa a estar na TopStrip.

---

### Ficheiros alterados

| Ficheiro | Alteração |
|---|---|
| `src/assets/logo-vianta.svg` | Novo ficheiro — cópia do SVG enviado |
| `src/components/vianta/TopStrip.tsx` | Layout flex com logo à esquerda + texto à direita |
| `src/components/vianta/HeroSection.tsx` | Remover bloco do texto "Vianta" |

### Resultado esperado

- A barra superior (dourada) mostra o logo real da Vianta à esquerda
- O texto informativo fica centrado à direita do logo
- A HeroSection fica mais limpa, sem o texto duplicado do logo
