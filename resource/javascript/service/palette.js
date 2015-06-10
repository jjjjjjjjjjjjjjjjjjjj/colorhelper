angular
    .module( 'colorhelper' )
    .service( 'palette', palette );

palette.$inject = [ 'status', '$rootScope' ];

function palette( status, $rootScope ) {

    var service = {

        // Palette structure.
        current: {

            colors: [],
            meta: {
                rank: '',
                views: '',
                hearts: '',
                comments: ''
            },
            title: '',
            url: '',
            modified: 0

        },
        palettes: [],
        set: set,
        save: save,
        remove: remove

    };

    return service;
    ///////////////

    function set( palette ) {

        // Set current palette.
        service.current = palette;

        // Set current palette meta.
        service.current.meta = {

            rank: service.current.rank,
            views: service.current.numViews,
            hearts: service.current.numHearts,
            comments: service.current.numComments

        };

        // Generate new favicon.
        generateFavicon( service.current.colors );

    }

    function save( palette ) {

        service.palettes.push( palette );
        $rootScope.$broadcast( 'palettes.update' );
        // TODO: Save the palettes locally or in DB attached to user

    }

    function remove( index ) {

        // If the palette isn't already modified.
        if( service.current.modified != true) {

            // Mark palette as modified.
            service.current.modified = true;

            // Removes the link between current (modified) palette, and the one on CL.
            service.current.url = '';

            // Renames the palette, to signify that it has been modified.
            service.current.title = service.current.title + ' ' + l( '%palette.modified' );

        }

        // Make sure that there's at least one of more colors left in the palette.
        if( service.current.colors.length > 1 ) {

            try {

                // Removes the color from the current palettes array.
                service.current.colors.splice( index, 1 );

            } catch( error ) {

                // Set status (display error).
                status.set({

                    show: 1,
                    title: l( '%status.api.error.title' ),
                    message: l( '%status.api.error.message' ) + ' (' + error + ')',
                    background: '#CD8682'

                });

            }

        } else if( service.current.colors.length == 1 ) {

            // Set status (display error).
            status.set({

                show: 1,
                title: l( '%error.general.title' ),
                message: l( '%palette.error.remove.message' ),
                background: '#CD8682'

            });

        }

    }

}