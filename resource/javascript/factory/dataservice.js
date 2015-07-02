angular
    .module( 'colorhelper' )
    .factory( 'dataservice', dataservice );

dataservice.$inject = [ '$http', 'status', 'palette' ];

function dataservice( $http, status ) {

    return {

        getPalette: getPalette

    };

    function getPalette( paletteType ) {

        // Make API call.
        return $http.get( '../resource/php/' + paletteType + '_palette_json.php')
            .then( onGetPaletteSuccess )
            .catch( onGetPaletteFailed );

        function onGetPaletteSuccess( response ){

            // Hide status bar.
            status.hide();

            // Return palette object.
            return response.data[0];

        }

        function onGetPaletteFailed( error ) {

            // Set status.
            status.set ({

                show: 1,
                title: l( '%status.api.error.title' ),
                message: l( '%status.api.error.message' ) + ' (' + error + ')',
                background: '#CD8682'

            });

        }

    }

}