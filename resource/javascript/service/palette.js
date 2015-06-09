angular
    .module( 'colorhelper' )
    .service( 'palette', palette );

function palette() {

    var service = {

        current: {},
        palettes: [],
        set: set,
        save: save

    }

    return service;
    ///////////////

    function set( palette ) {

        // Set current palette
        service.current = palette;

        // Set current palette meta
        service.current.meta = {

            rank: service.current.rank,
            views: service.current.numViews,
            hearts: service.current.numHearts,
            comments: service.current.numComments

        };

        // Generate new favicon
        generateFavicon( service.current.colors );

    }

    function save( palette ) {

        service.palettes.push( palette );
        $rootScope.$broadcast( 'palettes.update' );
        // TODO: Save the palettes locally or in DB attached to user

    }

};