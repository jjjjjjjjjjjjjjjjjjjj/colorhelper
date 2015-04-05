/*
 * Main controller
 */

colorhelper.controller( 'MainController', function MainController( $scope, $http ) {

    $scope.app = {

        author: "Janne Klouman",
        version: "1.0 alpha",
        name: l( '%app.name' ),
        title: l( '%app.title'),
        description: l( '$page.description' ),
        GitHubURL: "https://github.com/janneklouman/colorhelper"

    };

    $scope.status = {

        active: 0,
        title: '',
        messsage: '',
        background: ''

    };

    // Grab JSON / update scope
    $scope.update = function( paletteType ) {

        // Begin operation
        $scope.status = {

            active: 1,
            title: l( '%status.api.title' ),
            message: l( '%status.api.message' ),
            background: '#fffde7'

        };

        // Talk to API
        $http.get( '../resource/php/' + paletteType + '_palette_json.php')
            .success( function( response ) {

                // TODO: preload next random color, or all of them if paletteType == popular

                // Response comes encapsulated in array
                $scope.palette = response[0];

                // Uncomment for full list of properties
                // console.log( $scope.palette );

                // Update header column width, uses pixels
                var headerPixelWidth = $( '#main-header' ).width(),
                    columnPixelWidth =  headerPixelWidth / $scope.palette.colors.length;

                $scope.headerColumnWidth = (columnPixelWidth / headerPixelWidth) * 100 + "%";

                // Set colorscheme
                $scope.detailsColor = $scope.palette.colors[ 0 ];

                // Operations done, set status to inactive
                $scope.status.active = 0;

                // Workaround for filling svg, unable to bind because cssableSVG() in main.js
                // $( '.svg' ).css( 'fill', '#' + $scope.detailsColor );

            })
            .error( function( e, i ) {

                // Set status (displays the error)
                $scope.status = {

                    active: 1,
                    title: l( '%status.api.error.title' ),
                    message: l( '%status.api.error.message' ) + ' (' + i + ')',
                    background: '#CD8682'

                }

            });

    };

    // TODO: Replace random with current pref
    $scope.update( 'random' );

});