// ==UserScript==
// @name         injguide-nhs-ux-fixes
// @namespace    injguide
// @version      0.1
// @match        http://www.injguide.nhs.uk/*
// @match        http://medusa.wales.nhs.uk/*
// @grant        none
// ==/UserScript==
(function(){

    if(window.location.href.match(/\.pdf/i)) return;

    var script = document.createElement('script');
    script.src = 'https://rawgit.com/Kyoushu/injguide-nhs-ux-fixes/0f17a62cd057ad1b0eb25a560ec6ad8bf7afd901/dist/js/app.min.js';
    document.body.appendChild(script);

    var styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.type = 'text/css';
    styles.href = 'https://rawgit.com/Kyoushu/injguide-nhs-ux-fixes/0f17a62cd057ad1b0eb25a560ec6ad8bf7afd901/dist/css/app.min.css';
    document.head.appendChild(styles);

})();