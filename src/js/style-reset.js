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

    function stripNonBreakingSpaces()
    {
        $('a,td').each(function(){
            var element = $(this);
            var html = element.html();
            if(!html.match(/&nbsp;/)) return;
            html = html.replace(/&nbsp;/g, '');
            element.html(html);
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
                {'icon': 'sign-out', 'title': 'Logout', 'url': '/Logout.asp', 'confirm_message': 'Are you sure you want to log out?'},
                {'title': 'Home', 'url': '/'},
                {'title': 'Introduction', 'url': '/HomeIntro.asp'},
                {'title': 'Recently Published', 'url': '/HomeRecentMonographs.asp'},
                {'title': 'About This Site', 'url': '/HomeAbout.asp'}
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

                var linkElement = $('<a>', {'href': link.url}).text(link.title);
                if(link.icon){
                    linkElement.prepend(' ').prepend( $('<i>').addClass('fa fa-' + link.icon) );
                }

                if(link.confirm_message){
                    linkElement.on('click', function(e){
                        if(!confirm(link.confirm_message)) e.preventDefault();
                    });
                }

                list.append(
                    $('<li>').append(
                        linkElement
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
        var selectors = ['div','tr'];

        $.each(selectors, function(index, selector){
            $(selector).each(function(){
                var element = $(this);
                if(element.html().replace(/&nbsp;/g, '').trim() === ''){
                    element.remove();
                }
            });
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

    function stripRedundantElements()
    {
        $('input[name=searchstr]').closest('table').remove();
    }

    return function()
    {
        fixViewport();
        addElementClasses();
        stripStyleAttributes();
        stripEventAttributes();
        stripNonBreakingSpaces();
        stripRedundantElements();
        replaceFontElements();
        stripEmptyElements();
        stripScriptElements();
        replaceNavs();
    }

})();