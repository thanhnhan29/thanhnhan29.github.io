(() => {
    const leaves = document.querySelector('.autumn-leaves');
    const toggle = document.querySelector('.autumn-toggle');
    if (!leaves || !toggle) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 767.98px)');
    const leafItems = [...leaves.querySelectorAll('.autumn-leaf')];
    const colors = ['#c7a052', '#bd8d43', '#d0ae62', '#c29243'];
    const random = (min, max) => min + Math.random() * (max - min);
    const scatterLeaf = (leaf, x = random(3, 94)) => {
        leaf.style.setProperty('--leaf-x', `${x}%`);
        leaf.style.setProperty('--leaf-drift', `${random(-60, 60)}px`);
        leaf.style.setProperty('--leaf-size', `${random(18, 28)}px`);
        leaf.style.setProperty('--leaf-tilt', `${random(-45, 45)}deg`);
        leaf.style.setProperty('--leaf-color', colors[Math.floor(Math.random() * colors.length)]);
    };
    const scatterLeaves = () => {
        const count = mobile.matches ? 5 : leafItems.length;
        // Jitter and shuffle the initial spread so a small sample does not cluster at one edge.
        const spread = Array.from({ length: count }, (_, index) => index);
        for (let index = count - 1; index > 0; index--) {
            const other = Math.floor(Math.random() * (index + 1));
            [spread[index], spread[other]] = [spread[other], spread[index]];
        }
        leafItems.forEach((leaf, index) => {
            const duration = random(26, 38);
            const x = 3 + 91 * (spread[index % count] + random(.05, .95)) / count;
            scatterLeaf(leaf, x);
            leaf.style.setProperty('--fall-time', `${duration}s`);
            leaf.style.setProperty('--fall-delay', `${-duration * ((index % count) + Math.random()) / count}s`);
            leaf.style.setProperty('--sway-time', `${random(5, 9)}s`);
        });
    };
    // Choose a fresh path while the leaf is invisible between falling cycles.
    leafItems.forEach(leaf => leaf.addEventListener('animationiteration', event => {
        if (event.animationName === 'autumn-fall') scatterLeaf(leaf);
    }));
    mobile.addEventListener('change', scatterLeaves);
    scatterLeaves();
    let enabled = true;
    try { enabled = localStorage.getItem('autumn-enabled') !== 'false'; } catch (_) {}

    const render = () => {
        const active = enabled && !reducedMotion.matches;
        leaves.hidden = !active;
        toggle.hidden = reducedMotion.matches;
        toggle.setAttribute('aria-pressed', String(active));
        toggle.setAttribute('aria-label', active ? 'Turn off autumn leaves' : 'Turn on autumn leaves');
        toggle.title = active ? 'Turn off autumn leaves' : 'Turn on autumn leaves';
        document.body.classList.toggle('autumn-active', active);
        document.body.classList.toggle('autumn-paused', document.hidden);
    };

    toggle.addEventListener('click', () => {
        enabled = !enabled;
        try { localStorage.setItem('autumn-enabled', String(enabled)); } catch (_) {}
        render();
    });
    reducedMotion.addEventListener('change', render);
    document.addEventListener('visibilitychange', render);
    render();
})();
