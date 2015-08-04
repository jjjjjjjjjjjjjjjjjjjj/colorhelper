angular
    .module( 'colorhelper' )
    .service( 'palette', palette );

palette.$inject = [ 'status', '$rootScope', 'dataservice', 'localStorageService', 'settings' ];

function palette( status, $rootScope, dataservice, localStorageService, settings ) {

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
        toggleFavorite: toggleFavorite,
        unFavorite: unFavorite,
        editColor: editColor,
        editName: editName,
        remove: remove

    };

    return service;
    ///////////////

    function getNew( type ) {

        type = typeof type !== 'undefined' ? type : settings.settings.palettePreference;

        // Generate blank palette.
        if( type === 'blank' ) {

            service.current = {

                colors: [ "9B9B9B", "B5B5B5", "C7C7C7", "D7D7D7"],
                title: 'New palette',
                modified: 1

            }

            // Tell rootscope that palette has been updated.
            $rootScope.$broadcast( 'palette-updated' );

        // Generate random or popular palette (type === 'random'||'popular').
        } else {

            dataservice.getPalette( type ).then( function ( response ) {

                service.set( response );

                // Tell rootscope that palette has been updated.
                $rootScope.$broadcast( 'palette-updated' );

            });

        }

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

        // Broadcast.
        $rootScope.$broadcast( 'palette-updated' );

    }

    function initFavorites() {

        service.favorites = localStorageService.get( 'favorites' ) === null ? [] : localStorageService.get( 'favorites' );
        return localStorageService.set( 'favorites', service.favorites );

    }

    function isFavorite() {

        return service.favorites.indexOf( JSON.stringify( service.current ) ) > -1;

    }

    function toggleFavorite() {

        var currentPalette = JSON.stringify( service.current );

        if( isFavorite() )
            return unFavorite( currentPalette );

        service.favorites.push( currentPalette );

        $rootScope.$broadcast( 'palette-updated' );
        return localStorageService.set( 'favorites', service.favorites );

    }

    function unFavorite( palette ) {

        if( service.favorites.indexOf( palette ) > -1 )
            service.favorites.splice( service.favorites.indexOf( palette ), 1 );

        $rootScope.$broadcast( 'palette-updated' );
        return localStorageService.set( 'favorites', service.favorites );

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