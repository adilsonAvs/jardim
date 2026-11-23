(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('header nav');
  menuButton?.addEventListener('click', event => {
    const button = event.currentTarget;
    const opening = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(opening));
    button.setAttribute('aria-label', opening ? 'Close navigation menu' : 'Open navigation menu');
    nav?.classList.toggle('open', opening);
  });

  const banner = document.querySelector('.cookie');
  const consentKey = 'cgn-consent';
  const readChoice = () => {
    try { return localStorage.getItem(consentKey); } catch { return null; }
  };
  const saveChoice = value => {
    try { localStorage.setItem(consentKey, value); } catch { /* The choice remains available for this page view. */ }
  };
  const showBanner = () => {
    if (!banner) return;
    banner.hidden = false;
    banner.querySelector('[data-cookie="accept"]')?.focus();
  };
  if (banner && !['accepted', 'rejected'].includes(readChoice())) {
    window.setTimeout(showBanner, 500);
  }
  document.querySelectorAll('[data-cookie="accept"], [data-cookie="reject"]').forEach(button => {
    button.addEventListener('click', event => {
      saveChoice(event.currentTarget.dataset.cookie === 'accept' ? 'accepted' : 'rejected');
      if (banner) banner.hidden = true;
    });
  });
  document.querySelectorAll('[data-cookie-settings]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      showBanner();
    });
  });
})();
