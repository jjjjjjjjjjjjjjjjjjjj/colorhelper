var colorhelper = angular.module( 'colorhelper', [] );

colorhelper.controller( 'Controller', function Controller( $scope, $http ) {

    $scope.palette          = {};
    $scope.pageName         = l( '%page.name' );
    $scope.pageTitle        = l( '$page.title' );
    $scope.pageDescription  = l( '$page.description' );
    $scope.status           = {

        active:     0,
        title:      '',
        messsage:   '',
        background: ''

    };

    $scope.menu = {

    };

    // Grab JSON / update scope / calls paint()
    $scope.update = function( paletteType ) {

        // Begin operation
        $scope.status = {

            active:     1,
            title:      l( '%status.api.title' ),
            message:    l( '%status.api.message' ),
            background: '#fffde7'

        };

        $http.get( '../resource/php/' + paletteType + '_palette_json.php')
            .success( function( response ) {

                // Response comes encapsulated in array
                $scope.palette = response[0];

                // Uncomment for full list of properties
                // console.log( $scope.palette );

                // Update header column width
                $scope.headerColumnWidth = $( '#main-header' ).width() / $scope.palette.colors.length + 'px';

                // Set colorscheme
                $scope.detailsColor = $scope.palette.colors[ 0 ];

                // Operations done, set status to inactive
                $scope.status.active = 0;

                // Workaround for filling svg, unable to bind because cssableSVG() in main.js
                // $( '.svg' ).css( 'fill', '#' + $scope.detailsColor );

            })
            .error( function() {

                $scope.status = {

                    active:     1,
                    title:      l( '%status.api.error.title' ),
                    message:    l( '%status.api.error.message' ),
                    background: '#CD8682'

                }

            });

    };

    // TODO: Replace random with current pref
    $scope.update( 'random' );

});
