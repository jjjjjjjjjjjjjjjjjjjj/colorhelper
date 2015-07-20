angular
    .module( 'colorhelper' )
    .directive( 'cpEditPopUp', cpEditPopUp );

cpEditPopUp.$inject = [ 'palette' ];

function cpEditPopUp( palette ) {

    return {

        restrict: 'E',
        templateUrl: '/resource/template/cpPopUp.html',
        replace: true,
        scope: {
            show: '='
        },
        link: function( scope ){

            scope.addNew = function() {

                palette.getNew( 'random' );

            }

        }

    };

}