angular
    .module( 'colorhelper' )
    .controller( 'MainController', MainController );

MainController.$inject = [ 'status', 'colorscheme', 'palette', '$scope' ];

function MainController( status, colorscheme, palette, $scope ) {

    function init() {

        palette.getNew( 'random' );

    }

    // Removes color from palette service and also updates the colorscheme.
    function removeColor( i ) {

        palette.remove( i );
        colorscheme.update( $scope.palette.colors[0] );

    }

    function addColor( color ) {

        palette.addColor( color );

    }

    // Value used to show and hide dialog.
    $scope.showColorEditDialog = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
    };

    $scope.showNameEditDialog = false;

    // Shows and hide edit dialog.
    $scope.toggleNameEditDialog = function( ) {

        console.log( $scope.showNameEditDialog);
        return $scope.showNameEditDialog = !$scope.showNameEditDialog;

    };

    // Shows and hide edit dialog.
    $scope.toggleColorEditDialog = function( i ) {

        // Let our edit dialogs know the new color palette.
        $scope.$broadcast( 'palette-updated' );
        return $scope.showColorEditDialog[ i ] = !$scope.showColorEditDialog[ i ];

    };


    $scope.addColor = function( color) {

        addColor( color );

    };

    $scope.getPalette = function( paletteType ) {

        palette.getNew( paletteType );

    };

    // Updates the status (often synonymous with showing the status bar).
    $scope.$on( 'status-updated', function() {

        $scope.status = status.status;
        
    });

    // Update the colors of the website
    $scope.$on( 'colorscheme-updated', function() {

        $scope.colorscheme = { details: '#' + colorscheme.details };

    });

    // Update the scope to match current palette.
    $scope.$on( 'palette-updated', function() {

        $scope.palette = palette.current;
        colorscheme.update( palette.current.colors[0] );

    });

    // Remove color from the current palette.
    $scope.removeColor = function( i ) {

        removeColor( i );

    };

    // App details
    $scope.app = {

        author: "Janne Klouman",
        version: "1.0 alpha",
        name: l( '%app.name' ),
        title: l( '%app.title' ),
        description: l( '$page.description' ),
        GitHubURL: "https://github.com/janneklouman/colorhelper"

    };

    // Wrapper function for localization in html
    $scope.ll = function ( s ) {

        return l( s );

    };

    $scope.copy = function( text ) {

        if (navigator.userAgent.indexOf('Mac OS X') != -1) {

            window.prompt( "CMD + C -> ENTER" , text );

        } else {

            window.prompt( "CTRL + C -> ENTER" , text );

        }

    };

    init();

}