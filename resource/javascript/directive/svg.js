// Directive for custom html element ng-path
colorhelper.directive( 'ngPath', [function () {

    return {

        templateNamespace: 'svg',
        replace: true,
        templateUrl: '../resource/template/svgpath.html',
        scope: {

            'ngFill': '=',
            'ngD': '=',
            'ngIndex': '='

        },
        link: function ( scope ) {

            scope.ngMEnter = function( index ) {

                $( '.color-overlay' ).css( 'display', 'none' );
                $( '.color-overlay.edit' ).eq( index ).css( 'display', 'inline-block' );
                $( '.color-overlay.remove' ).eq( index ).css( 'display', 'inline-block' );

            }

        }

    }

}]);

// Directive for custom html element ng-rect
colorhelper.directive( 'ngRect', [function () {

    return {

        templateNamespace: 'svg',
        replace: true,
        templateUrl: '../resource/template/svgrect.html',
        scope: {

            'ngWidth': '=',
            'ngX': '=',
            'ngIndex': '='

        },
        link: function ( scope, el ) {

            scope.ngClick = function() {

                console.log( el );

            }

            scope.ngMLeave = function() {

                $( '.color-overlay' ).css( 'display', 'none' );

            }

        }

    }

}]);