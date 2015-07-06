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

    $scope.addColor = function( color) {

        addColor( color );

    }

    $scope.getPalette = function( paletteType ) {

        palette.getNew( paletteType );

    }

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
        //console.log( palette.current );
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

    }

    init();

}