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


        }

    }

}]);