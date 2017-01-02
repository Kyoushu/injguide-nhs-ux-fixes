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

    function replaceNavs()
    {

        // === Header ===
        // Home                       /
        // Introduction               /HomeIntro.asp
        // Recently Published         /HomeRecentMonographs.asp
        // About This Site            /HomeAbout.asp
        // Logout                     /Logout.asp

        // === Drugs ===
        // Intravenous Drugs          /IVGuideDisplaySelect.asp
        // Intramuscular drugs        /IVGuideDisplaySelectOR.asp
        // Ocular Injections          /IVGuideDisplaySelectOcular.asp
        // Paediatric Intravenous     /IVGuideDisplaySelectP.asp
        // Subcutaneous Drugs         /IVGuideDisplaySelectSubcut.asp
        // Documents & Links          /IVGuidedocuments.asp

        // === Footer ===
        // Terms and Conditions       /docs/Terms%20and%20Conditions%20for%20access%20to%20IMG%20Website.doc
        // Copyright                  /docs/Copyright%20IMG.doc

        var links = {
            'header': [
                {'title': 'Home', 'url': '/'},
                {'title': 'Introduction', 'url': '/HomeIntro.asp'},
                {'title': 'Recently Published', 'url': '/HomeRecentMonographs.asp'},
                {'title': 'About This Site', 'url': '/HomeAbout.asp'},
                {'title': 'Logout', 'url': '/Logout.asp'}
            ],
            'footer': [
                {'title': 'Terms and Conditions', 'url': '/docs/Terms%20and%20Conditions%20for%20access%20to%20IMG%20Website.doc'},
                {'title': 'Copyright', 'url': '/docs/Copyright%20IMG.doc'}
            ],
            'drugs': [
                {'title': 'Intravenous Drugs', 'url': '/IVGuideDisplaySelect.asp'},
                {'title': 'Intramuscular Drugs', 'url': '/IVGuideDisplaySelectOR.asp'},
                {'title': 'Ocular Injections', 'url': '/IVGuideDisplaySelectOcular.asp'},
                {'title': 'Paediatric Intravenous', 'url': '/IVGuideDisplaySelectP.asp'},
                {'title': 'Subcutaneous Drugs', 'url': '/IVGuideDisplaySelectSubcut.asp'},
                {'title': 'Documents & Links', 'url': '/IVGuidedocuments.asp'}
            ]
        };

        var header = $('<div>').addClass('header');
        var footer = $('<div>').addClass('footer');

        function renderLinks(name, container)
        {
            var list = $('<ul>').addClass('nav');

            $.each(links[name], function(index, link){
                list.append(
                    $('<li>').append(
                        $('<a>', {'href': link.url}).text(link.title)
                    )
                );
            });

            container.append(list);
        }

        renderLinks('header', header);
        renderLinks('drugs', header);
        renderLinks('footer', footer);

        $('#idToolbar').after(header).remove();
        $('#idBody').after(footer).removeAttr('id').addClass('content');

        $('#MS_HomeMenu').remove();
        $('#MS_IVGuideMenu').remove();
        $('#idMenu').remove();
        $('#StartMenu').remove();
    }

    function stripStyleAttributes()
    {
        $('[align]').removeAttr('align');
        $('[width]').removeAttr('width');
        $('[style]').removeAttr('style');
        $('[border]').removeAttr('border');
        $('[bgcolor]').removeAttr('bgcolor');
        $('[cellpadding]').removeAttr('cellpadding');
        $('[cellspacing]').removeAttr('cellspacing');
    }

    function stripEmptyElements()
    {
        $('div,tr').each(function(){
            var element = $(this);
            if(element.html().trim() === ''){
                element.remove();
            }
        });
    }

    function addElementClasses()
    {
        $('[style]').each(function(){
            var element = $(this);
            var style = element.attr('style');
            if(style.match(/color:red/i)) element.addClass('important');
        });

        $('td[align]').each(function(){
            var element = $(this);
            var align = element.attr('align');
            if(align === 'center'){
                element.addClass('text-center');
            }
            if(align === 'right'){
                element.addClass('text-right');
            }
        });
    }

    function stripEventAttributes()
    {
        $('[onmouseover]').removeAttr('onmouseover');
        $('[onmouseout]').removeAttr('onmouseout');
    }

    function stripScriptElements()
    {
        $('script').each(function(){
            var script = $(this);
            var src = script.attr('src');
            if(src && src.match(/\/js\/app(\.min)?\.js/)) return;
            script.remove();
        });
    }

    return function()
    {
        fixViewport();
        addElementClasses();
        stripStyleAttributes();
        stripEventAttributes();
        stripLinkNonBreakingSpaces();
        replaceFontElements();
        stripEmptyElements();
        stripScriptElements();
        replaceNavs();
    }

})();