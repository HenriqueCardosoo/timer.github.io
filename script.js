function criarHoraDosSegundos(segundos) {
  const data = new Date(segundos * 1000);
  return data.toLocaleTimeString('pt-BR', {
    hour12: false,
    timeZone: 'UTC'
  });
}
const relogio = document.querySelector('.relogio');
const iniciar = document.querySelector('.iniciar');
const pausar = document.querySelector('.pausar');
const zerar = document.querySelector('.zerar');

let segundos = 0;
let timer;

function iniciaRelogio() {
  timer = setInterval(function () {
    segundos++;
    relogio.innerHTML = criarHoraDosSegundos(segundos);
  }, 1000);
}
iniciar.addEventListener('click', function (event) {
  clearInterval(timer);
  iniciaRelogio();
  relogio.classList.remove('style-color-blink');
  relogio.style.transition = '0,3s';
});

pausar.addEventListener('click', function (event) {
  clearInterval(timer);
  relogio.classList.add('style-color-blink');
  relogio.style.transition = '0.3s';
});

zerar.addEventListener('click', function (event) {
  clearInterval(timer);
  relogio.innerHTML = '00:00:00';
  segundos = 0;
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
