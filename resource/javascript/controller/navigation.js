colorhelper.controller( 'NavigationController', function NavigationController( $scope ) {

    // Menu structure and content
    $scope.menu = {

        0: {

            label: "home",
            href: "/"

        },
        1: {

            label: "dev",
            href: "#",
            subMenu: {

                0: {
                    label: l('%menu.dev.github'),
                    href: $scope.app.GitHubURL
                },
                1: {
                    label: l('%menu.dev.report'),
                    href: "#"
                }
            }

        }

    };

});
