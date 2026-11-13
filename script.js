let digitalElement = document.querySelector('.digital time');
let relogioElement = document.querySelector('.relogio');
let sElement = document.querySelector('.p_s');
let mElement = document.querySelector('.p_m');
let hElement = document.querySelector('.p_h');
let botaoTema = document.querySelector('.botao-tema');

// Quem pediu "reduzir movimento" no sistema vê o ponteiro de segundos pulando de 1 em 1
let menosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');
let sistemaClaro = window.matchMedia('(prefers-color-scheme: light)');

let ultimoTexto = '';
let ultimoMinuto = -1;

/* ===== Relógio ===== */

function updateClock() {
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    let ms = now.getMilliseconds();

    // Visor digital: só troca o texto quando o segundo muda
    let texto = `${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`;
    if (texto !== ultimoTexto) {
        digitalElement.textContent = texto;
        digitalElement.dateTime = texto;
        ultimoTexto = texto;
    }

    // Descrição do relógio analógico para leitores de tela (muda a cada minuto)
    if (minute !== ultimoMinuto) {
        relogioElement.setAttribute('aria-label', `Relógio analógico marcando ${descreverHora(hour, minute)}`);
        ultimoMinuto = minute;
    }

    // Cada ponteiro considera a fração da unidade menor:
    // segundos + milissegundos, minutos + segundos, horas + minutos
    let s = second + (menosMovimento.matches ? 0 : ms / 1000);
    let m = minute + s / 60;
    let h = (hour % 12) + m / 60;

    // Os ponteiros já começam apontando para o 12, então não precisa do -90
    let sDeg = (360 / 60) * s;
    let mDeg = (360 / 60) * m;
    let hDeg = (360 / 12) * h;

    sElement.style.setProperty('--angulo', `${sDeg}deg`);
    mElement.style.setProperty('--angulo', `${mDeg}deg`);
    hElement.style.setProperty('--angulo', `${hDeg}deg`);

    requestAnimationFrame(updateClock);
}

function fixZero(time) {
    return time < 10 ? `0${time}` : time;
}

function descreverHora(hour, minute) {
    let horas = `${hour} ${hour === 1 ? 'hora' : 'horas'}`;
    let minutos = `${minute} ${minute === 1 ? 'minuto' : 'minutos'}`;
    return `${horas} e ${minutos}`;
}

/* ===== Tema claro/escuro ===== */

function temaAtual() {
    return document.documentElement.dataset.tema || (sistemaClaro.matches ? 'claro' : 'escuro');
}

function atualizarBotaoTema() {
    let claro = temaAtual() === 'claro';
    let texto = claro ? 'Mudar para tema escuro' : 'Mudar para tema claro';
    botaoTema.querySelector('span').textContent = claro ? '🌙' : '☀️';
    botaoTema.setAttribute('aria-label', texto);
    botaoTema.title = texto;
}

botaoTema.addEventListener('click', () => {
    let novoTema = temaAtual() === 'claro' ? 'escuro' : 'claro';
    document.documentElement.dataset.tema = novoTema;
    try {
        localStorage.setItem('tema', novoTema);
    } catch (e) {}
    atualizarBotaoTema();
});

// Se o tema do sistema mudar (e não houver escolha salva), o ícone do botão acompanha
sistemaClaro.addEventListener('change', atualizarBotaoTema);

atualizarBotaoTema();
updateClock();