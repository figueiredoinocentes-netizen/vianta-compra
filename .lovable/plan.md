

## Simplificar card de Caução e remover bloco final

### Alterações em `src/components/vianta/VehicleBottomSheet.tsx`

**1. Simplificar o card de Caução (linhas 130-135)**

Substituir as 4 linhas de conteudo (titulo, valor, prestações, aviso) por apenas:
- Titulo "Caução"
- Valor (ex: `600€`)
- Frase curta: `Pagamento fracionável` em `text-[10px] text-accent`

Isto mantém a mesma altura dos outros cards (titulo + valor + 1 linha extra pequena).

**2. Eliminar o bloco "Deposit note" (linhas 178-187)**

Remover completamente o bloco `<div className="bg-secondary rounded-xl ...">` com a informação sobre caução flexível e financiamento.

