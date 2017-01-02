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

            var filterInput = $('<input>', {'type': 'text'});

            container.append(
                $('<div>', {'placeholder': 'Filter'}).addClass('drug-filter--filter').append(filterInput)
            );

            var resultContainer = $('<div>').addClass('drug-filter--result');
            container.append(resultContainer);

            function renderResult(max)
            {
                if(typeof max === 'undefined') max = 50;

                var filterText = filterInput.val();
                var filterRegex = null;

                if(filterText){
                    var filterTextQuoted = filterText.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
                    filterRegex = new RegExp(filterTextQuoted, 'gi');
                }

                resultContainer.empty();

                var count = 0;
                $.each(drugList, function(index, drug){

                    if(count > max) return false;

                    if(filterRegex){
                        if(!drug.label.match(filterRegex)) return;
                    }

                    count++;

                    var url = '/IVGuideDisplay.asp?Drugno=' + drug.id + '&MonographType=Adult';

                    var link = $('<a>', {'href': url})
                        .addClass('drug-filter--result-item')
                        .addClass('drug-filter--result-item-' + drug.color)
                        .text(drug.label);

                    resultContainer.append(link);
                });

            }

            renderResult();

            filterInput.on('keypress change paste keydown', function(){
                renderResult();
            });

        });

    }

    return {
        'init': init
    }

})();