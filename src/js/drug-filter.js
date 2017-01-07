if(typeof app === 'undefined') var app = {};

app.drugFilter = (function(){

    function init()
    {

        $('select[name="Drugno"]').each(function(){

            var drugSelect = $(this);

            var drugList = [];
            var container = $('<div>').addClass('drug-filter');

            // Get data, remove old elements, and insert new container
            (function(){
                drugList = (function(){
                    var list = [];
                    drugSelect.find('option').each(function(){
                        var option = $(this);

                        var colorMatch = option.attr('style').match(/color:(.+)/);

                        list.push({
                            'id': option.attr('value'),
                            'label': option.text().trim(),
                            'color': (colorMatch ? colorMatch[1] : null)
                        });
                    });
                    return list;
                })();
                var parentTable =  drugSelect.closest('table');
                parentTable.prev('table').remove();
                parentTable.after(container);
                parentTable.remove();

            })();

            var filterInput = $('<input>', {'type': 'text', 'placeholder': 'Filter list'});

            container.append(
                $('<div>').addClass('drug-filter--filter').append(filterInput)
            );

            var resultContainer = $('<div>').addClass('drug-filter--result');
            container.append(resultContainer);

            function renderList()
            {
                resultContainer.empty();

                $.each(drugList, function(index, drug){

                    var url = '/IVGuideDisplay.asp?Drugno=' + drug.id;

                    var link = $('<a>', {'href': url})
                        .addClass('drug-filter--result-item')
                        .addClass('drug-filter--result-item-' + drug.color)
                        .text(drug.label);

                    resultContainer.append(link);
                });
            }

            function filterList()
            {

                var filterText = filterInput.val();
                var filterRegex = null;

                if(filterText){
                    var filterTextQuoted = filterText.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
                    filterRegex = new RegExp(filterTextQuoted, 'gi');
                }

                resultContainer.find('.drug-filter--result-item').each(function(){
                    var link = $(this);
                    var label = link.html();
                    if(filterRegex){
                        link.css('display', (label.match(filterRegex) ? 'block' : 'none'));
                        return;
                    }
                    link.css('display', 'block');
                });

            }

            renderList();

            (function(){
                var lastValue = null;
                filterInput.on('keypress change paste keydown keyup', function(e){
                    var value = filterInput.val();
                    if(value !== lastValue){
                        filterList();
                    }
                    lastValue = value;
                });
            })();

        });

    }

    return {
        'init': init
    }

})();