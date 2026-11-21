const projectCards = document.querySelectorAll('.card');
const detailHeading = document.querySelector('.detail h1');
if (detailHeading) detailHeading.style.viewTransitionName = 'project-title';
function selectProject(url) {
  projectCards.forEach(card => {
    card.querySelector('h3').style.viewTransitionName =
      card.href === url ? 'project-title' : 'none';
  });
}
window.addEventListener('pageswap', event => selectProject(event.activation?.entry?.url));
window.addEventListener('pagereveal', () => selectProject(window.navigation?.activation?.from?.url));
