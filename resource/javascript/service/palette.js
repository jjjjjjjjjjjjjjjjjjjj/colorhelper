angular
    .module( 'colorhelper' )
    .service( 'palette', palette );

palette.$inject = [ 'status', '$rootScope', 'dataservice', 'localStorageService' ];

function palette( status, $rootScope, dataservice, localStorageService ) {

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
        getNew: getNew,
        addColor: addColor,
        set: set,
        initFavorites: initFavorites,
        isFavorite: isFavorite,
        favorites: [],
        favorite: favorite,
        unFavorite: unFavorite,
        editColor: editColor,
        editName: editName,
        remove: remove

    };

    return service;
    ///////////////

    function getNew( paletteType ) {

        dataservice.getPalette( paletteType ).then( function ( response ) {

            service.set( response );

            // Tell rootscope that palette has been updated.
            $rootScope.$broadcast('palette-updated');

        });

    }

    function addColor( color ) {

        if ( service.current.modified != true ) {

            // Mark palette as modified.
            service.current.modified = true;

            // Removes the link between current (modified) palette, and the one on CL.
            service.current.url = '';

            // Renames the palette, to signify that it has been modified.
            service.current.title = service.current.title + ' ' + l('%palette.modified');

        }

        // Make sure that there's no more than seven colors left in the palette.
        if ( service.current.colors.length < 7 ) {

            try {

                // Adds the color
                service.current.colors.push( color );

                // Generate new favicon (maximum 5 colors).
                generateFavicon(service.current.colors);

                // Update scope.
                $rootScope.$broadcast( 'palette-updated' );

            } catch ( error ) {

                // Set status (display error).
                status.set({

                    show: 1,
                    title: l('%status.api.error.title'),
                    message: l('%status.api.error.message') + ' (' + error + ')',
                    background: '#CD8682'

                });

            }
        } else if ( service.current.colors.length == 7 ) {

            // Set status (display error).
            status.set({

                show: 1,
                title: l('%error.general.title'),
                message: l('%palette.error.add.message'),
                background: '#CD8682'

            });

        }
    }

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

    function initFavorites() {

        service.favorites = localStorageService.get( 'favorites' ) === null ? [] : localStorageService.get( 'favorites' );
        localStorageService.set( 'favorites', service.favorites );

        return service.favorites;

    }

    function isFavorite( palette ) {

        return localStorageService.get( 'favorites' ).indexOf( palette ) > -1;

    }

    function favorite() {

        var palette = JSON.stringify( service.current );

        if( isFavorite( palette ) )
            return false;

        service.favorites.push( palette );
        $rootScope.$broadcast( 'palette-updated' );

        return localStorageService.set( 'favorites', service.favorites );

    }

    function unFavorite( palette ) {

        // get favorites
        // split up favorites
        // match palette to fractions
        // remove match

    }

    function editColor( i, color ) {

        // If the palette isn't already modified.
        if( service.current.modified != true) {

            // Mark palette as modified.
            service.current.modified = true;

            // Removes the link between current (modified) palette, and the one on CL.
            service.current.url = '';

            // Renames the palette, to signify that it has been modified.
            service.current.title = service.current.title + ' ' + l( '%palette.modified' );

        }

        // Replace color.
        service.current.colors[ i ] = color;

        // Update scope.
        $rootScope.$broadcast( 'palette-updated' );

        // Generate new favicon (maximum 5 colors).
        generateFavicon( service.current.colors );

    }

    function editName( name ) {

        // If the palette isn't already modified.
        if( service.current.modified != true) {

            // Mark palette as modified.
            service.current.modified = true;

            // Removes the link between current (modified) palette, and the one on CL.
            service.current.url = '';

        }

        // Update name.
        service.current.title = name;

        // Broadcast.
        $rootScope.$broadcast( 'palette-updated' );

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

                // Generate new favicon.
                generateFavicon( service.current.colors );

                // Update scope.
                $rootScope.$broadcast( 'palette-updated' );

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