

## Imagem do Tesla Dualmotor + Reposicionar categorias

### 1. Guardar a imagem no projeto

Copiar `user-uploads://openart-image_NJOPAfhM_1771853219793_raw.jpg` para `public/images/tesla-model-3-dualmotor.jpg`.

### 2. `src/data/vehicles.ts` -- Atualizar imageUrl

Alterar o `imageUrl` do Tesla Model 3 Dualmotor de `"/images/tesla-model-3.jpg"` para `"/images/tesla-model-3-dualmotor.jpg"`.

### 3. `src/components/vianta/VehicleBottomSheet.tsx` -- Mover categorias

Mover a secção de categorias de **depois do grid de detalhes** (linha 166-175) para **entre o badge de disponibilidade e o botão CTA**.

Nova ordem no popup:
1. Titulo + preço
2. Badge "Disponivel" / "Disponivel em breve"
3. **Categorias** (badges coloridas) -- movidas para aqui
4. Botao CTA "Pedir contacto..."
5. Grid de detalhes (Ano, Caução, Combustivel, Caixa, Lugares)

### Ficheiros alterados

| Ficheiro | Alteracao |
|---|---|
| `public/images/tesla-model-3-dualmotor.jpg` | Nova imagem (copia do upload) |
| `src/data/vehicles.ts` | Atualizar `imageUrl` do Dualmotor |
| `src/components/vianta/VehicleBottomSheet.tsx` | Mover bloco de categorias para baixo do badge de disponibilidade |

