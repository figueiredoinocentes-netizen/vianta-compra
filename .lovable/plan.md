

# Embed YouTube Short na SocialProofSection

## Alteração

### `src/components/vianta/SocialProofSection.tsx`
- Substituir o placeholder (ícone Play + "Vídeo em breve") por um `<iframe>` do YouTube
- URL do embed: `https://www.youtube.com/embed/ebgSf5tP7iE` (formato embed do Short)
- Como é um Short (vertical), usar aspect-ratio 9:16 em vez de 16:9, com altura máxima limitada para não ocupar demasiado ecrã (~500px)
- Manter o `rounded-2xl` e `overflow-hidden` para o estilo visual
- Remover import do ícone `Play` (já não necessário)

