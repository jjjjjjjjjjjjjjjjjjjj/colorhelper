angular
    .module( 'colorhelper' )
    .factory( 'dataservice', dataservice );

dataservice.$inject = [ '$http', 'status', 'palette' ];

function dataservice( $http, status, palette ) {

    return {

        getPalette: getPalette

    };

    function getPalette( paletteType ) {

        // Set and show status, tell user API call is being made.
        status.set({

            show: 1,
            title: l( '%status.api.title' ),
            message: l( '%status.api.message' ),
            background: '#fffde7'

        });

        // Make API call.
        return $http.get( '../resource/php/' + paletteType + '_palette_json.php')
            .then( onGetPaletteSuccess )
            .catch( onGetPaletteFailed );

        function onGetPaletteSuccess( response ){

            // API Call made successfully, hide the status bar.
            status.hide();

            // Return palette object.
            return response.data[0];

        };

        function onGetPaletteFailed( error ) {

            // Set status bar to display the error.
            status.set ({

                active: 1,
                title: l( '%status.api.error.title' ),
                message: l( '%status.api.error.message' ) + ' (' + error + ')',
                background: '#CD8682'

            });

        };


    }

}