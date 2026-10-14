(() => {
  const overview = document.querySelector('.travel-overview');
  const stories = [...document.querySelectorAll('.travel-story')];
  const storyLinks = [...document.querySelectorAll('[data-story-link]')];
  const detailNav = document.querySelector('.travel-detail-nav');
  const pageTitle = document.title;
  const indexGrid = document.querySelector('.travel-index');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const masonry = indexGrid && window.Masonry ? new window.Masonry(indexGrid, {
    itemSelector: '.travel-index-card:not([hidden])',
    columnWidth: '.travel-index-sizer',
    gutter: '.travel-index-gutter',
    percentPosition: true,
    transitionDuration: reducedMotion.matches ? 0 : '0.25s'
  }) : null;
  const layoutCards = () => {
    if (!masonry) return;
    masonry.reloadItems();
    masonry.layout();
  };
  let lastCard;
  if (overview && detailNav) {
    document.querySelector('.travel-index-filters').hidden = false;
    storyLinks.forEach(link => link.addEventListener('click', () => { lastCard = link; }));
    const showStory = (moveFocus = false) => {
      const openViewer = document.querySelector('.travel-viewer');
      if (openViewer && openViewer.open) openViewer.close();
      const id = location.hash.slice(1);
      const selected = stories.find(story => story.id === id);
      overview.hidden = Boolean(selected);
      detailNav.hidden = !selected;
      stories.forEach(story => { story.hidden = story !== selected; });
      if (selected) {
        const heading = selected.querySelector('h2');
        document.title = `${heading.textContent} | ${pageTitle}`;
        detailNav.querySelector('.travel-detail-current').textContent = heading.textContent;
        requestAnimationFrame(() => {
          detailNav.scrollIntoView({block: 'start'});
          if (moveFocus) heading.focus({preventScroll: true});
        });
      } else {
        document.title = pageTitle;
        layoutCards();
        if (moveFocus) {
          const target = lastCard || overview;
          target.scrollIntoView({block: 'center'});
          if (lastCard) lastCard.focus({preventScroll: true});
        }
      }
    };
    window.addEventListener('hashchange', () => showStory(true));
    showStory();
    document.querySelectorAll('[data-travel-filter]').forEach(button => button.addEventListener('click', () => {
      const filter = button.dataset.travelFilter;
      document.querySelectorAll('[data-travel-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      storyLinks.forEach(card => {
        card.hidden = filter === 'upcoming' ? card.dataset.upcoming !== 'true' : filter !== 'all' && card.dataset.year !== filter;
      });
      layoutCards();
    }));
  }
  const viewer = document.querySelector('.travel-viewer');
  if (!viewer || typeof viewer.showModal !== 'function') return;
  const links = [...document.querySelectorAll('.travel-photo-link')];
  const image = viewer.querySelector('img');
  const title = viewer.querySelector('#travel-viewer-title');
  const albumTitle = viewer.querySelector('#travel-viewer-album');
  const count = viewer.querySelector('.travel-viewer-count');
  const previous = viewer.querySelector('[data-direction="-1"]');
  const next = viewer.querySelector('[data-direction="1"]');
  let photos = [], index = 0, opener;
  const render = () => {
    const link = photos[index];
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    title.textContent = link.dataset.caption;
    albumTitle.textContent = link.dataset.albumTitle;
    count.textContent = `${index + 1} / ${photos.length}`;
    previous.disabled = index === 0;
    next.disabled = index === photos.length - 1;
  };
  const move = (direction) => {
    const position = index + direction;
    if (position < 0 || position >= photos.length) return;
    index = position;
    render();
  };
  links.forEach(link => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    photos = links.filter(photo => photo.dataset.album === link.dataset.album);
    index = photos.indexOf(link);
    render();
    viewer.showModal();
    document.body.classList.add('travel-viewer-open');
  }));
  viewer.querySelector('.travel-viewer-close').addEventListener('click', () => viewer.close());
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  document.addEventListener('keydown', event => {
    if (!viewer.open) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  viewer.addEventListener('click', event => {
    if (event.target !== viewer) return;
    const bounds = viewer.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
  });
  viewer.addEventListener('close', () => {
    document.body.classList.remove('travel-viewer-open');
    if (opener) opener.focus({preventScroll: true});
  });
})();
