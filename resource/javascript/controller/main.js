angular
    .module( 'colorhelper' )
    .controller( 'Main', Main );

Main.$inject = [ 'colorscheme', 'dataservice', 'palette', '$scope' ];

function Main( colorscheme, dataservice, palette, $scope ) {

    // App details
    $scope.app = {

        author: "Janne Klouman",
        version: "1.0 alpha",
        name: l( '%app.name' ),
        title: l( '%app.title' ),
        description: l( '$page.description' ),
        GitHubURL: "https://github.com/janneklouman/colorhelper"

    };
    
    activate();

    function activate() {

        return getPalette( 'random' );

    }

    function getPalette( paletteType ) {

        return dataservice.getPalette( paletteType )
            .then( function( data ) {

                palette.set( data );
                colorscheme.update( data.colors[0] );
                $scope.palette = data;
                return $scope.palette;

            });

    }



    // Wrapper function for localization in html
    $scope.ll = function ( s ) {

        return l( s );

    };

}