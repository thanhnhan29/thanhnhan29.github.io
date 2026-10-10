document.querySelectorAll('.news-widget').forEach(function (widget) {
    const buttons = widget.querySelectorAll('[data-news-filter]');
    const items = widget.querySelectorAll('[data-news-category]');
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            const filter = button.dataset.newsFilter;
            buttons.forEach(function (other) {
                other.setAttribute('aria-pressed', String(other === button));
            });
            items.forEach(function (item, index) {
                item.hidden = !(filter === 'all' ||
                    (filter === 'recent' && index < 5) ||
                    item.dataset.newsCategory === filter);
            });
            widget.querySelectorAll('.news-year-group').forEach(function (group) {
                group.hidden = !Array.from(group.querySelectorAll('[data-news-category]')).some(function (item) {
                    return !item.hidden;
                });
            });
        });
    });
});
