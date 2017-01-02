if(typeof app === 'undefined') var app = {};

app.styleReset = (function(){

    function fixViewport()
    {
        $('head').append(
            $('<meta>', {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1.0'
            })
        );
    }

    function stripInlineStyles()
    {
        $('*').removeAttr('style').removeAttr('bgcolor');
    }

    function stripLinkNonBreakingSpaces()
    {
        $('a').each(function(){
            var link = $(this);
            var html = link.html();
            html = html.replace(/&nbsp;/g, '');
            link.html(html);
        });
    }

    function replaceFontElements()
    {
        $('font').each(function(){
            var fontElement = $(this);
            var html = fontElement.html();
            fontElement.replaceWith(
                $('<span>').html(html)
            );
        });
    }

    function stripLegacyStyleElements()
    {
        $('#idMedusaImage1').remove();
        $('#idMedusaImage').remove();

        $('img[src$="images/curve.gif"]').remove();
        $('img[src$="images/hidden.gif"]').remove();
        $('img[src$="images/medusa.gif"]').remove();
        $('img[src$="images/head_h.jpg"]').remove();
        $('img[src$="images/head_sml.jpg"]').remove();
        $('img[src$="images/head_bg.gif"]').remove();
    }

    return function()
    {
        fixViewport();
        stripInlineStyles();
        stripLegacyStyleElements();
        stripLinkNonBreakingSpaces();
        replaceFontElements();
    }

})();