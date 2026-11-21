for (const figure of document.querySelectorAll('.schematic')) {
  const button = figure.querySelector('button');
  const status = figure.querySelector('[aria-live]');
  const fork = figure.classList.contains('fork');
  button.addEventListener('click', () => {
    const alternate = fork && figure.classList.toggle('alternate');
    figure.classList.remove('running');
    void figure.offsetWidth;
    figure.classList.add('running');
    status.textContent = fork && !alternate ? figure.dataset.initial : figure.dataset.result;
    if (fork) button.textContent = alternate ? figure.dataset.reset : figure.dataset.start;
  });
}
