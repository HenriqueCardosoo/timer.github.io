function criarHoraDosSegundos(segundos) {
  const data = new Date(segundos * 1000);
  const horas = data.getUTCHours();
  const minutos = data.getUTCMinutes();
  const segundosInt = data.getUTCSeconds();
  const milissegundos = data.getUTCMilliseconds();
  const milissegundosFormatados = milissegundos.toString().padStart(3, '0').slice(0, 2);
  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundosInt.toString().padStart(2, '0')}<span class="milessegundos">${milissegundosFormatados}</span>`;
}

const relogio = document.querySelector('.relogio');
const iniciar = document.querySelector('.iniciar');
const pausar = document.querySelector('.pausar');
const zerar = document.querySelector('.zerar');

let milissegundos = 0;
let startTime;
let isRunning = false;

function atualizaCronometro() {
  const tempoAtual = Date.now();
  const delta = tempoAtual - startTime;
  milissegundos += delta;
  relogio.innerHTML = criarHoraDosSegundos(milissegundos / 1000);
  startTime = tempoAtual;
  if (isRunning) {
    requestAnimationFrame(atualizaCronometro);
  }
}

iniciar.addEventListener('click', function (event) {
  if (!isRunning) {
    startTime = Date.now();
    isRunning = true;
    requestAnimationFrame(atualizaCronometro);
  }
  relogio.classList.remove('style-color-blink');
  relogio.style.transition = '0.3s';
});

pausar.addEventListener('click', function (event) {
  isRunning = false;
  relogio.classList.add('style-color-blink');
  relogio.style.transition = '0.3s';
});

zerar.addEventListener('click', function (event) {
  isRunning = false;
  milissegundos = 0;
  relogio.innerHTML = '00:00:00<span class="milessegundos">00</span>';
  relogio.classList.remove('style-color-blink');
});

function selecionarPausar() {
  pausar.addEventListener('click', () => {
    pausar.classList.add('selected');
    iniciar.classList.remove('selected');
    zerar.classList.remove('selected');
  });
  iniciar.addEventListener('click', () => {
    iniciar.classList.add('selected');
    pausar.classList.remove('selected');
    zerar.classList.remove('selected');
  });
  zerar.addEventListener('click', () => {
    zerar.classList.add('selected');
    iniciar.classList.remove('selected');
    pausar.classList.remove('selected');
  });
}
selecionarPausar();
