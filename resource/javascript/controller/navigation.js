/*
 * Navigation controller
 */

colorhelper.controller( 'NavigationController', function NavigationController( $scope ) {

    // Menu structure and content
    $scope.menu = {

        0: {

            label: 'Generate',
            href: '#',
            subMenu: {

                0: {

                    label: l( '%menu.generate.blank' ),
                    href: 'generate.blank',
                    noLink: true

                },
                1: {

                    label: l( '%menu.generate.random' ),
                    href: 'generate.random',
                    noLink: true

                },
                2: {

                    label: l( '%menu.generate.popular' ),
                    href: 'generate.popular',
                    noLink: true

                }

            }

        },
        1: {

            label: 'dev',
            href: '#',
            subMenu: {

                0: {

                    label: l( '%menu.dev.github' ),
                    href: $scope.app.GitHubURL

                }

            }

        },
        2: {

            label: 'settings',
            href: '#',
            subMenu: {

                0: {

                    label: l( '%menu.setting.popular' ),
                    href: '#',
                    data: true

                },
                1: {

                    label: l( '%menu.setting.save' ),
                    href: '#'

                }

            }

        }

    };

});
