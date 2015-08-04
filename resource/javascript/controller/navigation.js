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
            subMenu: [

                {

                    label: l( '%menu.generate.blank' ),
                    href: '',
                    fn: generateBlank

                },
                {

                    label: l( '%menu.generate.random' ),
                    href: '',
                    fn: generateRandom

                },
                {

                    label: l( '%menu.generate.popular' ),
                    href: '',
                    fn: generatePopular

                }

            ]

        },
        {

            label: l( '%menu.favorites' ),
            href: '',
            class: 'favorites-wrapper',
            subMenu: {}

        },
        {

            label: l( '%menu.dev' ),
            href: '#',
            subMenu: [

                {

                    label: l( '%menu.dev.github' ),
                    href: $scope.app.GitHubURL

                },
                {

                    label: l( '%menu.dev.copyasarray' ),
                    href: '',
                    fn: copyAsArray

                }

            ]

        },
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

        }

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

    function copyAsArray() {

        // copy dialog

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

    init();

}
