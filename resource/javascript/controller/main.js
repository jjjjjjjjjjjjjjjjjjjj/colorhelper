/*
 * Main controller
 */

colorhelper.controller( 'MainController', function MainController( $scope, $http ) {

    // App details
    $scope.app = {

        author: "Janne Klouman",
        version: "1.0 alpha",
        name: l( '%app.name' ),
        title: l( '%app.title' ),
        description: l( '$page.description' ),
        GitHubURL: "https://github.com/janneklouman/colorhelper"

    };

    // Default colorscheme
    $scope.colorscheme = {

        details: "#e1e1e1"

    };

    // Default status bar (none)
    $scope.statusBar = {

        active: 0,
        title: '',
        messsage: '',
        background: ''

    };

    // Grab JSON / update scope
    $scope.update = function( paletteType ) {

        // Begin operation, set status bar to talking to api
        $scope.statusBar = {

            active: 1,
            title: l( '%status.api.title' ),
            message: l( '%status.api.message' ),
            background: '#fffde7'

        };

        // Talk to API
        $http.get( '../resource/php/' + paletteType + '_palette_json.php')
            .success( function( response ) {

                // Response comes encapsulated in array
                $scope.palette = response[0];

                // Gather all metadata in object for easy iteration
                $scope.palette.meta = {

                    rank: $scope.palette.rank,
                    views: $scope.palette.numViews,
                    hearts: $scope.palette.numHearts,
                    comments: $scope.palette.numComments

                };

                // Uncomment for full list of properties
                // console.log( $scope.palette );
                // console.log( $scope.palette.meta );

                // Update header column width, uses pixels
                var headerPixelWidth = $( '#main-header' ).width(),
                    columnPixelWidth =  headerPixelWidth / $scope.palette.colors.length;

                $scope.headerColumnWidth = (columnPixelWidth / headerPixelWidth) * 100 + "%";

                // Set colorscheme to colors fetched from colourlovers api
                $scope.colorscheme.details = $scope.palette.colors[ 0 ];

                // Operations done, set statusbar to inactive
                $scope.statusBar.active = 0;

            })
            .error( function( e, i ) {

                // Set status bar to displays the error on error
                $scope.statusBar = {

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