(() => {
  const roots = document.querySelectorAll('[data-gallery-root]');

  roots.forEach((root) => {
    const dialog = root.querySelector('[data-gallery-dialog]');
    const items = Array.from(root.querySelectorAll('[data-gallery-item]'));

    if (!dialog || items.length === 0 || typeof dialog.showModal !== 'function') return;

    const image = dialog.querySelector('[data-gallery-dialog-image]');
    const date = dialog.querySelector('[data-gallery-dialog-date]');
    const caption = dialog.querySelector('[data-gallery-dialog-caption]');
    const count = dialog.querySelector('[data-gallery-dialog-count]');
    const source = dialog.querySelector('[data-gallery-dialog-source]');
    const previous = dialog.querySelector('[data-gallery-prev]');
    const next = dialog.querySelector('[data-gallery-next]');
    const close = dialog.querySelector('[data-gallery-close]');
    let activeIndex = 0;
    let lastTrigger = null;

    const render = (index) => {
      activeIndex = (index + items.length) % items.length;
      const item = items[activeIndex];
      const thumbnail = item.querySelector('img');
      image.src = item.href;
      image.alt = thumbnail ? thumbnail.alt : item.dataset.galleryCaption || '';
      date.textContent = item.dataset.galleryDate || '';
      caption.textContent = item.dataset.galleryCaption || image.alt;
      count.textContent = (activeIndex + 1) + ' / ' + items.length;

      if (item.dataset.gallerySource) {
        source.href = item.dataset.gallerySource;
        source.hidden = false;
      } else {
        source.removeAttribute('href');
        source.hidden = true;
      }
    };

    const open = (index, trigger) => {
      lastTrigger = trigger;
      render(index);
      if (!dialog.open) dialog.showModal();
    };

    items.forEach((item, index) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        open(index, item);
      });
    });

    previous.addEventListener('click', () => render(activeIndex - 1));
    next.addEventListener('click', () => render(activeIndex + 1));
    close.addEventListener('click', () => dialog.close());

    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        render(activeIndex - 1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        render(activeIndex + 1);
      }
    });

    dialog.addEventListener('close', () => {
      image.removeAttribute('src');
      if (lastTrigger) lastTrigger.focus();
    });
  });
})();
