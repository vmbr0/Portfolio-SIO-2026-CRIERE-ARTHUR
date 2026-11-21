for (const lab of document.querySelectorAll('.lab')) {
  const states = JSON.parse(lab.querySelector('.lab-states').textContent);
  const status = lab.querySelector('[role="status"]');
  const controls = [...lab.querySelectorAll('button[data-mode]')];
  const checks = [...lab.querySelectorAll('[data-check]')];
  function updateChecks() {
    const done = checks.filter(check => check.checked).length;
    lab.style.setProperty('--complete', (done / checks.length * 100) + '%');
    status.textContent = done ? done + ' / ' + checks.length + ' contrôles parcourus.' : states[0];
  }
  for (const check of checks) check.addEventListener('change', updateChecks);
  for (const button of controls) {
    if (checks.length) button.removeAttribute('aria-pressed');
    button.addEventListener('click', () => {
      if (checks.length) {
        for (const check of checks) check.checked = false;
        updateChecks();
        return;
      }
      lab.dataset.mode = button.dataset.mode;
      for (const item of controls) item.setAttribute('aria-pressed', String(item === button));
      status.textContent = states[Number(button.dataset.mode)];
    });
  }
}
