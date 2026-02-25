

# Desativar auto-zoom nos campos do formulário (mobile)

## Problema
No iOS Safari, quando o utilizador clica num campo de input com font-size inferior a 16px, o browser faz zoom automático. Isto acontece dentro do iframe do GHL e confunde o utilizador.

## Solução
Adicionar `maximum-scale=1` à meta tag `viewport` no `index.html`. Isto impede o browser de fazer zoom ao focar campos de texto.

### Alteração em `index.html`
Alterar a meta tag viewport de:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```
Para:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

**Nota:** Como o formulário está dentro de um iframe externo (GHL), esta é a única forma de controlar o comportamento de zoom do lado da nossa página. O zoom dentro do iframe é controlado pelo browser com base nas propriedades do viewport da página pai.
