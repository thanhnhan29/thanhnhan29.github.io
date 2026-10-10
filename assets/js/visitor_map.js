const visitorMap = document.querySelector('.visitor-map');
if (visitorMap) {
    const script = document.createElement('script');
    script.id = 'mapmyvisitors';
    script.src = 'https://mapmyvisitors.com/map.js?cl=ffffff&w=300&t=tt&d=6S1_klH-6jQahJbFleG831JfFePX1Gl-D1JUcSLZYOE&co=2d78ad&ct=ffffff&cmo=3acc3a&cmn=ff5353';
    document.getElementById('visitor-map-inner').appendChild(script);
    visitorMap.addEventListener('toggle', function () {
        if (visitorMap.open) window.dispatchEvent(new Event('resize'));
    });
}
