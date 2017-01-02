if(typeof app === 'undefined') var app = {};

app.init = function(){

    app.drugFilter.init();

    app.styleReset();

};

$(function(){
    app.init();
});