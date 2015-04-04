var colorhelper = angular.module( 'colorhelper', [] );

colorhelper.controller( 'Controller', function Controller( $scope, $http ) {

    $scope.palette = {};

    // Grab JSON / update scope / calls paint()
    var update = function( popular ) {

        $http.get( '../resource/php/' + popular + '_palette_json.php')
            .success( function( response ) {

                // Response comes encapsulated in array
                $scope.palette = response[0];

                // Uncomment for full list of properties
                // console.log( $scope.palette );

                // Update header column width
                $scope.headerColumnWidth = $( '#main-header' ).width() / $scope.palette.colors.length + 'px';

            });

    }

    // TODO: Replace random with current pref
    update( 'random' );

});


