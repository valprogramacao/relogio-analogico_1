
# Relógio Analógico

Relógio analógico com visor digital, feito só com HTML, CSS e JavaScript puro. Mostra a hora atual com três ponteiros (horas, minutos e segundos) e o horário em formato digital logo abaixo.

## Funcionalidades

- Relógio analógico de 12 horas com ponteiros de horas, minutos e segundos
- Ponteiro de segundos com movimento suave (`requestAnimationFrame`)
- Ponteiros de horas e minutos avançam aos poucos, considerando a fração dos minutos e dos segundos
- Visor digital (HH:MM:SS)
- 12 marcações de hora (a cada 30°)
- Layout responsivo: o relógio se ajusta ao tamanho da tela
- Tema claro e escuro: segue o tema do sistema e pode ser trocado pelo botão no canto da tela (a escolha fica salva no navegador)
- Acessibilidade: descrição do relógio para leitores de tela, botão de tema acessível pelo teclado e respeito à preferência "reduzir movimento" do sistema

## Tecnologias utilizadas

- HTML5
- CSS3 (variáveis CSS, `min()`, `clamp()`, media queries)
- JavaScript (DOM API, `Date`, `requestAnimationFrame`, `matchMedia`, `localStorage`)

## Estrutura do projeto

```
├── index.html
├── script.js
└── style.css
```

## Como usar

Abra o arquivo `index.html` no navegador. Não é preciso instalar nada.

## Como funciona

### index.html

Define a estrutura: o mostrador (`.relogio`), as 12 marcações (`.risco`), os ponteiros (`.p_h`, `.p_m`, `.p_s`), o encaixe central, o visor digital e o botão de tema.

### style.css

- O tamanho do relógio é definido pela variável `--tamanho: min(80vw, 60vh, 400px)`. Borda, marcações e ponteiros usam porcentagens desse tamanho, então tudo cresce e diminui junto.
- Cada ponteiro fica "em pé" a partir do centro (`bottom: 50%`) e gira em torno da própria base (`transform-origin: 50% 100%`). O ângulo vem da variável `--angulo`, que o JavaScript atualiza.
- As cores ficam em variáveis CSS, com um conjunto para o tema escuro e outro para o tema claro.

### script.js

A cada quadro de animação, pega a hora atual com `new Date()` e calcula os ângulos:

```js
let s = second + ms / 1000;     // segundos com a fração dos milissegundos
let m = minute + s / 60;        // minutos com a fração dos segundos
let h = (hour % 12) + m / 60;   // horas com a fração dos minutos

let sDeg = (360 / 60) * s;
let mDeg = (360 / 60) * m;
let hDeg = (360 / 12) * h;
```

Como os ponteiros já começam apontando para o 12, não é preciso subtrair 90°.

O visor digital só é atualizado quando o segundo muda, e a função `fixZero` adiciona o zero à esquerda quando necessário.

## Personalização

- **Tamanho do relógio:** altere `--tamanho` em `.relogio` no `style.css`
- **Cores:** altere as variáveis no início do `style.css` (tema escuro e tema claro)
- **Ponteiros:** ajuste largura, comprimento e cor em `.p_s`, `.p_m` e `.p_h`

## Ideias para próximas versões

- Marcações de minutos (60 riscos)
- Números no mostrador
- Escolha de fuso horário

## Licença

Distribuído sob a licença MIT. Veja o arquivo `LICENSE`.

---

Criado por Valdirene Bombini
