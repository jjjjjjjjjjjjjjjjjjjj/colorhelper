angular
    .module( 'colorhelper' )
    .service( 'status', status )

status.$inject = [ '$rootScope' ];

function status( $rootScope ) {

    var service = {

        // Status skeleton.
        status: {

            show: 0,
            title: '',
            message: '',
            background: ''

        },
        set: set,
        hide: hide

    }

    return service;
    ///////////////

    // Set current status.
    function set( status ) {

        // Update the status.
        service.status = ( status );

        // Broadcast that it's been updated.
        $rootScope.$broadcast('status.update');

    };

    // Hides the status bar from the user.
    function hide() {

        service.status.show = 0;

    }

}