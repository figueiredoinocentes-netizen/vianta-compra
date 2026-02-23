

## Usar pagina de Thank You para disparar o evento Lead

### Problema atual

O listener de `postMessage` no iframe GHL e demasiado generico -- qualquer mensagem do tipo `Array` dispara o evento `Lead`, resultando em 5 eventos por cada submissao real.

### Solucao

Criar uma pagina `/obrigado` (thank you page) que dispara o evento `Lead` uma unica vez ao carregar. No GHL, configuras o redirect do formulario para `https://vianta-aluguer.lovable.app/obrigado`.

### Alteracoes

#### 1. Criar `src/pages/ThankYou.tsx` (novo)

- Pagina simples com mensagem de confirmacao (ex: "Obrigado pelo seu contacto!")
- No `useEffect` de montagem, dispara `trackEvent("Lead")`
- Inclui botao para voltar a pagina principal

#### 2. Atualizar `src/App.tsx`

- Adicionar rota `/obrigado` apontando para `ThankYou`

#### 3. Atualizar `src/components/vianta/GHLFormSection.tsx`

- Remover o `useEffect` do listener de `postMessage` (linhas 31-40) e o import de `trackEvent`
- Elimina o problema dos disparos multiplos

### Configuracao no GHL

Apos a implementacao, configuras no GoHighLevel o redirect do formulario para:
```text
https://vianta-aluguer.lovable.app/obrigado
```

### Resultado

1 submissao = 1 visita a `/obrigado` = exatamente 1 evento `Lead`

### Ficheiros

| Ficheiro | Acao |
|---|---|
| `src/pages/ThankYou.tsx` | Novo -- pagina de obrigado com disparo de Lead |
| `src/App.tsx` | Adicionar rota `/obrigado` |
| `src/components/vianta/GHLFormSection.tsx` | Remover listener de postMessage |

