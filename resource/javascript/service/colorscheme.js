angular
    .module( 'colorhelper' )
    .service( 'colorscheme', colorscheme );

function colorscheme() {

    var service = {

        colorscheme: {

            details: '#e1e1e1'

        },
        update: update

    }

    return service;
    ///////////////

    function update( color ) {

        service.colorscheme.details = color;

    }

}