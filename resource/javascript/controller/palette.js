angular
    .module( 'colorhelper' )
    .controller( 'PaletteController', PaletteController );

PaletteController.$inject = [ 'status', 'colorscheme', 'dataservice', 'palette', '$scope' ];

function PaletteController( status, colorscheme, dataservice, palette, $scope ) {

    var iconFolder = 'resource/graphic/';

    // Updates the colors for the hover fill.
    $scope.$on( 'colorscheme-updated', function() {

        $scope.colorscheme = '#' + colorscheme.details;

    });
    // Menu structure and content
    $scope.menu = {

        0: {

            label: l( '%menu.new' ),
            href: '#',
            paths: [ 'M27.802 5.197c-2.925-3.194-7.13-5.197-11.803-5.197-8.837 0-16 7.163-16 16h3c0-7.18 5.82-13 13-13 3.844 0 7.298 1.669 9.678 4.322l-4.678 4.678h11v-11l-4.198 4.197z', 'M29 16c0 7.18-5.82 13-13 13-3.844 0-7.298-1.669-9.678-4.322l4.678-4.678h-11v11l4.197-4.197c2.925 3.194 7.13 5.197 11.803 5.197 8.837 0 16-7.163 16-16h-3z' ],
            iconURI: iconFolder + 'loop2.svg'

        },

        1: {

            label: l( '%menu.add' ),
            href: '#',
            paths: [ 'M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z' ],
            iconURI: iconFolder + 'plus.svg'

        },

        2: {

            label: l( '%menu.save' ),
            href: '#',
            paths: [ 'M28 0h-28v32h32v-28l-4-4zM16 4h4v8h-4v-8zM28 28h-24v-24h2v10h18v-10h2.343l1.657 1.657v22.343z' ],
            iconURI: iconFolder + 'floppy-disk.svg'

        }

    };

}