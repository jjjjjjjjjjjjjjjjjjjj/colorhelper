angular
    .module( 'colorhelper' )
    .service( 'colorscheme', colorscheme );

colorscheme.$inject = [ '$rootScope' ];

function colorscheme( $rootScope ) {

    var service = {

        details: '#e1e1e1',
        update: update

    }

    return service;
    ///////////////

    function update( color ) {

        // Update detailscolor
        service.details = color;

        // Broadcast that it's been updated.
        $rootScope.$broadcast( 'colorscheme-updated' );

    }

}