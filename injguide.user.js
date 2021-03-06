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
    if(window.location.href.match(/IVGuidePrint\.asp/i)) return;

    var script = document.createElement('script');
    script.src = 'https://rawgit.com/Kyoushu/injguide-nhs-ux-fixes/master/dist/js/app.min.js?_' + (new Date).toISOString().slice(0,13);
    document.body.appendChild(script);

    var styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.type = 'text/css';
    styles.href = 'https://rawgit.com/Kyoushu/injguide-nhs-ux-fixes/master/dist/css/app.min.css?_' + (new Date).toISOString().slice(0,13);
    document.head.appendChild(styles);

})();