angular
    .module( 'colorhelper' )
    .controller( 'PaletteController', PaletteController );

PaletteController.$inject = [ 'status', 'colorscheme', 'dataservice', 'palette', '$scope' ];

function PaletteController( status, colorscheme, dataservice, palette, $scope ) {

    // Menu structure and content
    $scope.menu = {

        0: {

            label: l( '%menu.new' ),
            href: '#'
        },

        1: {

            label: l( '%menu.add' ),
            href: '#'


        },

        2: {

            label: l( '%menu.save' ),
            href: '#'

        }

    };

}