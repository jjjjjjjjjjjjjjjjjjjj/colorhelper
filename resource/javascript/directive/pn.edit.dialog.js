angular
    .module( 'colorhelper' )
    .directive( 'pnEditDialog', pnEditDialog );

pnEditDialog.$inject = [ 'palette'  ];

function pnEditDialog( palette ) {

    return {

        restrict: 'E',
        templateUrl: '/resource/template/cDialog.html',
        replace: true,
        scope: {
            show: '='
        },
        link: function( scope ){

            // Initialize value for top border columns.
            scope.colWidth = 100;

            // ID used for DOM element.
            scope.id = 'edit-name-input';

            // Strings for the dialog.
            scope.strings = {

                title: l( '%dialog.edit.name' ),
                execute: l( '%dialog.confirm' ),
                cancel: l( '%dialog.cancel' ),
                inputValue: ''

            };

            // Gives us some colors to work with (current palette's).
            scope.$on( 'palette-updated', function() {

                scope.strings.inputValue = palette.current.title;
                scope.colors =  palette.current.colors;
                scope.colWidth = 100 / scope.colors.length;

            });

            // Renames the palette and closes the dialog.
            scope.execute = function() {

                var name = $( '#' + scope.id ).val();
                palette.editName( name );
                scope.hide();

            };

            // Hides the dialog.
            scope.hide = function() {

                scope.show = false;

            };

        }

    };

}