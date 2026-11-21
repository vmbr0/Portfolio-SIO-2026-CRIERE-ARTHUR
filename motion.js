const visual = document.querySelector('.visual');
const expandButton = visual.querySelector('.explode');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
expandButton.addEventListener('click', () => {
  const expanded = visual.classList.toggle('expanded');
  expandButton.setAttribute('aria-pressed', String(expanded));
});
visual.addEventListener('pointermove', event => {
  if (event.pointerType !== 'mouse' || reduceMotion.matches) return;
  const rect = visual.getBoundingClientRect();
  visual.style.setProperty('--tilt-y', ((event.clientX - rect.left) / rect.width - 0.5) * 12 + 'deg');
  visual.style.setProperty('--tilt-x', (0.5 - (event.clientY - rect.top) / rect.height) * 8 + 'deg');
});
visual.addEventListener('pointerleave', () => {
  visual.style.removeProperty('--tilt-x');
  visual.style.removeProperty('--tilt-y');
});
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.filter(entry => entry.isIntersecting).forEach((entry, i) => {
      entry.target.style.setProperty('--delay', Math.min(i, 2) * 75 + 'ms');
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    });
  }, {threshold: 0.09});
  document.querySelectorAll('.card, .timeline article').forEach(el => observer.observe(el));
}

const traceButton = visual.querySelector('.trace');
const traceStatus = visual.querySelector('.trace-status');
let traceTimers = [];
traceButton.addEventListener('click', () => {
  traceTimers.forEach(clearTimeout);
  traceTimers = [];
  visual.classList.remove('tracing');
  if (reduceMotion.matches) {
    traceStatus.textContent = 'DNS résolu · connexion HTTPS établie · réponse HTTP 200 (simulation)';
    return;
  }
  void visual.offsetWidth;
  visual.classList.add('tracing');
  visual.querySelector('#sendpacket').beginElement();
  traceStatus.textContent = 'Simulation · résolution du nom par DNS';
  const steps = [
    [800, 'Simulation · connexion HTTPS au serveur web'],
    [1700, 'Simulation · traitement de la requête'],
    [2500, 'Simulation terminée · réponse HTTP 200 OK']
  ];
  for (const [delay, message] of steps) {
    traceTimers.push(setTimeout(() => {
      traceStatus.textContent = message;
      if (delay === 2500) visual.classList.remove('tracing');
    }, delay));
  }
});
