(function () {
  var formFrames = document.querySelectorAll('.local-form[data-src]');
  if (!formFrames.length) return;

  function loadForm(frame) {
    if (!frame.src) frame.src = frame.dataset.src;
  }

  if (!('IntersectionObserver' in window)) {
    formFrames.forEach(loadForm);
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        loadForm(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '300px 0px' });

  formFrames.forEach(function (frame) {
    observer.observe(frame);
  });
}());
