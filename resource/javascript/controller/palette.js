angular
    .module( 'colorhelper' )
    .controller( 'PaletteController', PaletteController );

PaletteController.$inject = [ 'status', 'colorscheme', 'dataservice', 'palette', '$scope' ];

function PaletteController( status, colorscheme, dataservice, palette, $scope ) {

    var iconFolder = 'resource/graphic/';

    // Menu structure and content
    $scope.menu = {

        0: {

            label: l( '%menu.new' ),
            href: '#',
            iconURI: iconFolder + 'loop2.svg',
            iconHoverURI: iconFolder + ''

        },

        1: {

            label: l( '%menu.add' ),
            href: '#',
            iconURI: iconFolder + 'plus.svg',
            iconHoverURI: iconFolder + ''


        },

        2: {

            label: l( '%menu.save' ),
            href: '#',
            iconURI: iconFolder + 'floppy-disk.svg',
            iconHoverURI: iconFolder + ''

        }

    };

}