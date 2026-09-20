# Carrinho e telas — o que foi feito (branch `carrinho_e_telas`)

Documentação didática do trabalho realizado nesta tarefa: o que mudou, **por quê** e os
conceitos por trás de cada decisão.

## Por que este trabalho existiu

Ao mexer na interface, três problemas reais apareceram:

1. **Botões que não faziam nada** — carrinho, busca e links de navegação eram só "casca".
2. **O carrinho não existia de verdade** — só um ícone com um "0" fixo; "Adicionar ao
   Carrinho" não fazia nada.
3. **O desconto nunca aparecia** — um bug de serialização entre backend e frontend.

Dividi em fases, cada uma numa branch própria e mergeada de volta na `carrinho_e_telas`:

| Fase | Branch | O que resolveu |
| --- | --- | --- |
| Fase 0 | `-fase-0-dados` | Desconto e preço riscado |
| Fase 1 | `-fase-1-carrinho` | Carrinho funcional no client |
| Fase 2 | `-fase-2-botoes` | Busca, navegação e links |

---

## Fase 0 — dados (serialização `original_price`)

### O problema

O backend (Rails) serializa o JSON em **snake_case**: `original_price`. O frontend
(React/TypeScript) lia **camelCase**: `originalPrice`. Como os nomes não batem:

```js
produto.originalPrice  // undefined — o JSON tinha a chave "original_price"
```

Resultado: o selo `-X%` e o preço riscado nunca renderizavam, e o campo era ignorado ao
criar um produto.

### A correção

Alinhei o frontend ao contrato real da API: renomeei `originalPrice` → `original_price`
no tipo, no card e no formulário, e adicionei o input "preço original" ao form (antes não
dava para informar esse valor).

### O conceito

Rails convenciona snake_case no JSON; JavaScript/TypeScript convenciona camelCase. Quando
as duas pontas falam línguas diferentes, há dois caminhos:

- **(a) Adaptar o frontend ao contrato** (o que fiz) — simples quando é um campo só.
- **(b) Camada de serialização no backend** (serializer/gem que emite camelCase) — mais
  robusta quando o app cresce e há vários campos compostos.

---

## Fase 1 — carrinho (estado no client)

### O que foi criado

- `src/context/cart-context.ts` — o contexto e o hook `useCart`.
- `src/context/CartProvider.tsx` — o estado (adicionar, remover, quantidade, limpar) com
  persistência em `localStorage`.
- `src/pages/CartPage.tsx` — a página `/carrinho`.
- Ligados: botão "Adicionar ao Carrinho" (`ProdutoCard`) e o contador no header.

### O conceito

- **React Context** — compartilha estado entre componentes sem "prop drilling" (passar
  props por N níveis). O `CartProvider` envolve o app inteiro em `main.tsx`, e qualquer
  componente chama `useCart()`.
- **Por que separar contexto e provider em dois arquivos?** Por causa do **Fast Refresh**
  (atualização a quente do Vite): um arquivo que exporta componente **e** hook ao mesmo
  tempo quebra o Fast Refresh e gera warning de lint. Separando, o lint fica limpo.
- **localStorage** — o carrinho sobrevive ao reload. Não é compartilhado entre
  dispositivos (isso exigiria o backend — é o checkout da Fase 3).
- **Estado derivado** — `totalItens` e `totalPreco` não são armazenados; são calculados
  com `reduce` sobre `items` a cada render. Evita estado duplicado que pode dessincronizar.

---

## Fase 2 — botões mortos

### O que foi feito

1. **Busca** — o backend ganhou o filtro `q` (busca por nome via `ILIKE`); o header ganhou
   um formulário (desktop e mobile) que navega para `/?q=...`; a Home lê `q` da URL.
2. **Navegação** — "Cães" → `/?animal=dog`, "Gatos" → `/?animal=cat`, "Outros Pets" → o
   catálogo completo.
3. **Links** — footer e "Fale Conosco" ganharam destinos reais (`mailto:`), e links sem
   página correspondente foram removidos.

### O conceito

- **URL como fonte de verdade** — o filtro e a busca vivem na query string (`?animal=`,
  `?brand=`, `?q=`) em vez de estado local. Ganhos: dá para compartilhar o link, o botão
  voltar/avançar funciona, e qualquer link pode apontar direto para um estado.
- **Busca no servidor vs no cliente** — busquei no servidor (`q` → `ILIKE`) porque é o
  jeito correto quando a lista pode crescer; filtrar no client só enxerga o que já veio.
- **SWR e a chave de cache** — o hook `useProdutos` usa a chave `['produtos', animal,
  brand, q]`. Quando qualquer parte muda, o SWR refaz a busca e cacheia por chave.

---

## O que ficou de fora (de propósito)

- **Checkout (Fase 3)** — gravar o pedido no backend exigia decidir "usuário guest vs
  login". Optamos por pular. O carrinho vive no `localStorage`, e o botão "Finalizar
  compra" fica desabilitado. O backend já tem `Estoque::Pedido`/`Estoque::PedidoItem`
  prontos para quando isso voltar.

---

## Como testar

Com Docker:

```bash
cp .env.example .env          # e preencha o SECRET_KEY_BASE (openssl rand -hex 64)
docker compose up --build
# frontend em http://localhost, API em http://localhost/api/v1
```

Fluxo do carrinho: catálogo na home → "Adicionar ao Carrinho" → ícone do carrinho no
header mostra a contagem → página `/carrinho` permite mudar quantidade, remover e ver o
total. Filtre por "Cães"/"Gatos" no menu e busque por nome no campo do header.

---

## Conceitos para guardar

- **snake_case (Rails) vs camelCase (JS)** e o contrato de API.
- **React Context + hook** (`useCart`) para estado global.
- **Estado derivado** (`total = items.reduce(...)`) em vez de estado duplicado.
- **URL search params** como fonte de verdade para filtros/busca.
- **Chave do SWR** como identidade do cache.
- **Busca server-side** (`WHERE nome ILIKE ?`) vs. filtro no client.
