(function () {
  function updateLinks() {
    document.querySelectorAll('video').forEach(function (video) {
      video.controls = true;
    });

    // Footer column headings are labels, not destination links.
    document.querySelectorAll('.footer .hs-menu-wrapper > ul > li > a').forEach(function (link) {
      var label = link.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
      if (label === 'about' || label === 'our offerings' || label === 'resources') {
        link.removeAttribute('href');
        link.removeAttribute('target');
        link.removeAttribute('rel');
        link.removeAttribute('role');
        link.removeAttribute('aria-haspopup');
        link.removeAttribute('aria-expanded');
        link.setAttribute('aria-disabled', 'true');
        link.setAttribute('tabindex', '-1');
      }
    });

    document.querySelectorAll('a[href]').forEach(function (link) {
      var href = (link.getAttribute('href') || '').trim();
      if (!href || href.charAt(0) === '#' || /^javascript:/i.test(href)) return;

      if (link.textContent.replace(/\s+/g, ' ').trim().toLowerCase() === 'contact us') {
        link.href = 'https://bisresearch.com/contact-us';
        href = link.href;
      }

      // Mail links must be handled by the visitor's email application, not a new tab.
      if (/^mailto:/i.test(href)) return;

      link.target = '_blank';
      var rel = (link.getAttribute('rel') || '').split(/\s+/).filter(Boolean);
      if (rel.indexOf('noopener') === -1) rel.push('noopener');
      if (rel.indexOf('noreferrer') === -1) rel.push('noreferrer');
      link.setAttribute('rel', rel.join(' '));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateLinks);
  } else {
    updateLinks();
  }
}());
