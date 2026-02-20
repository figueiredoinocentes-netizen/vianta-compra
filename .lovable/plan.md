
## Substituição de Azul por Amarelo #ecdb70

### O que muda

O `#ecdb70` em HSL é aproximadamente `49 74% 68%`. Este amarelo vai substituir todas as instâncias de azul no design system e nos componentes.

---

### Ficheiros a alterar

#### 1. `src/index.css` — Design tokens

Todas as variáveis que actualmente usam azul (hsl 213–220) são substituídas:

| Token | Antes (azul) | Depois (amarelo) |
|---|---|---|
| `--primary` | `220 50% 18%` | `220 15% 12%` — dark charcoal (mantém-se, é o fundo escuro) |
| `--accent` | `213 85% 45%` | `49 74% 68%` — amarelo #ecdb70 |
| `--accent-foreground` | `0 0% 100%` (branco) | `220 15% 10%` (escuro, para legibilidade em fundo amarelo) |
| `--secondary` | `213 30% 94%` (azul claro) | `49 40% 95%` (bege/amarelo muito claro) |
| `--secondary-foreground` | `220 50% 18%` | `220 15% 12%` |
| `--muted` | `213 20% 96%` | `0 0% 96%` (cinzento neutro) |
| `--border` | `214 20% 90%` | `0 0% 88%` (neutro) |
| `--input` | `214 20% 90%` | `0 0% 88%` |
| `--ring` | `220 50% 18%` | `49 74% 68%` — foco com amarelo |
| `--strip-bg` | `220 50% 18%` | mantém dark charcoal |
| `--strip-foreground` | `210 40% 90%` | mantém claro |
| Comentário inline | "Azul carvão Vianta" | "Dark charcoal Vianta" |

O resultado: botões CTA, ícones de vantagens, badges de acento, e o ring de foco passam todos para o amarelo #ecdb70. O fundo da página, o hero, o top strip e o footer mantêm-se no charcoal escuro — criando o contraste premium preto/dourado-amarelo que reflecte o logo.

#### 2. `src/components/vianta/VehicleBottomSheet.tsx`

O botão "Pedir contacto" usa `bg-accent` — vai automaticamente herdar o amarelo. Verificar que `text-accent-foreground` está correctamente definido como escuro para leitura.

#### 3. `src/components/vianta/VehicleCard.tsx`

O botão "Quero esta" usa `bg-accent` — herda automaticamente. Os badges de disponibilidade já usam tokens `available` (verde) e `soon` (laranja), que não são afectados.

#### 4. `src/components/vianta/StickyButton.tsx`

Actualmente usa `bg-primary text-primary-foreground`. Pode manter-se (dark com texto branco), fica elegante. Sem alteração necessária.

---

### Resultado visual esperado

- **Hero/TopStrip/Footer**: fundo dark charcoal, texto branco — igual ao logo
- **Botões CTA ("Quero esta", "Pedir contacto")**: fundo amarelo #ecdb70, texto escuro — destaque premium
- **Ícones nas vantagens**: amarelo #ecdb70 sobre fundo claro
- **Secundários e bordas**: tons neutros bege/cinzento — sem vestígios de azul
- **Badges "Disponível"**: verde (mantém — é status, não branding)
- **Badges "Disponível em breve"**: laranja/âmbar (mantém — é status)

Um único ficheiro (`src/index.css`) resolve tudo via CSS variables — os componentes não precisam de alterações directas porque todos usam os tokens semânticos (`bg-accent`, `text-accent`, etc.).
