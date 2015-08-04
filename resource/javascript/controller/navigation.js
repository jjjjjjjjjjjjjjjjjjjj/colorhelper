angular
    .module( 'colorhelper' )
    .controller( 'NavigationController', NavigationController );

NavigationController.$inject = [ '$rootScope', '$scope', 'palette', 'settings' ];

function NavigationController(  $rootScope, $scope, palette, settings ) {

    function init() {

        updateFavoritesMenu();

    }

    // Menu structure and content
    $scope.menu = [

        {

            label: l( '%menu.generate' ),
            href: '#',
            class: 'default-cursor',
            subMenu: [

                {

                    label: l( '%menu.generate.blank' ),
                    fn: generateBlank,
                    class: 'pointer'

                },
                {

                    label: l( '%menu.generate.random' ),
                    fn: generateRandom,
                    class: 'pointer'

                },
                {

                    label: l( '%menu.generate.popular' ),
                    fn: generatePopular,
                    class: 'pointer'

                }

            ]

        },
        {

            label: l( '%menu.favorites' ),
            href: '',
            class: 'favorites-wrapper default-cursor',
            subMenu: {}

        },
        {

            label: l( '%menu.dev' ),
            href: '#',
            class: 'default-cursor',
            subMenu: [

                {

                    label: l( '%menu.dev.github' ),
                    href: $scope.app.GitHubURL,
                    class: 'pointer'

                },
                {

                    label: l( '%menu.dev.copyasarray' ),
                    href: '',
                    fn: copyAsArray,
                    class: 'pointer'

                }

            ]

        }/*,
        {

            label: l( '%menu.settings' ),
            href: '#',
            subMenu: [

                {

                    label: l( '%menu.settings.popular' ),
                    href: '#',
                    fn: togglePopular

                }

            ]

        }*/

    ];

    function generateBlank() {

        // Generate blank palette.
        palette.getNew( 'blank' );

    }

    function generateRandom() {

        // Generate random palette.
        palette.getNew( 'random' );

    }

    function generatePopular() {

        // Generate popular palette.
        palette.getNew( 'popular' );

    }

    function getFavoritesSubMenu() {

        var subMenu = [],
            child = {},
            colors = []

        for( var i = 0 ; i < palette.favorites.length ; i++ ) {

            colors = JSON.parse( palette.favorites[ i ] ).colors;

            child = {

                label: '',
                href: '',
                class: 'favorites-wrapper',
                colors: colors,
                isFav: 1,
                setfn: showFavorite,
                rmfn: unFavorite

            };

            subMenu.push( child );

        }

        return subMenu;

    }

    function togglePopular() {

        return settings.togglePalettePreference();

    }

    function copyAsArray( i ) {

        var s = '[',
            p = palette.current.colors;

        for( var i = 0 ; i < p.length ; i++ )
            s += '"' + p[ i ] + '", ';

        s = s.substring( 0, s.length - 2);
        s += ']';

        return $scope.copy( s );

    }

    function unFavorite( i ) {

        palette.unFavorite(  palette.favorites[ i ] );
        return updateFavoritesMenu();

    }

    function showFavorite( i ) {

        return palette.set( JSON.parse( palette.favorites[ i ] ) );

    }

    function updateFavoritesMenu() {

        return $scope.menu[ 1 ].subMenu = getFavoritesSubMenu();

    }

    $scope.$on( 'palette-updated', function() { updateFavoritesMenu() } );

    $scope.copy = function( text ) {

        if (navigator.userAgent.indexOf('Mac OS X') != -1) {

            window.prompt( "CMD + C -> ENTER" , text );

        } else {

            window.prompt( "CTRL + C -> ENTER" , text );

        }

    };

    init();

}
