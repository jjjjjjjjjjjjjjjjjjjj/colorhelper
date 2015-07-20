angular
    .module( 'colorhelper' )
    .directive( 'cEditDialog', cEditDialog );

cEditDialog.$inject = [ 'palette' ];

function cEditDialog( palette ) {

    return {

        restrict: 'E',
        templateUrl: '/resource/template/cDialog.html',
        replace: true,
        scope: {
            show: '=',
            idx: '='
        },
        link: function( scope ){

            scope.id = 'edit-color-' + scope.idx;
            scope.hex = '#' + palette.current.colors[ scope.idx ];

            // Initialize colorpicker on our input.
            $( '#edit-color-' + scope.idx ).colorPicker();

            // Strings for the dialog.
            scope.strings = {

                title: l( '%dialog.edit.color' ),
                execute: l( '%dialog.confirm' ),
                cancel: l( '%dialog.cancel' )

            };

            // Initialize value for top border columns.
            scope.colWidth = 100;

            // Gives us some colors to work with (current palette's).
            scope.$on( 'palette-updated', function(  ) {

                scope.colors =  palette.current.colors;
                scope.colWidth = 100 / scope.colors.length;

            });

            // Adds color to the palette and closes the dialog.
            scope.execute = function() {

                var color = $( '#edit-color-' + scope.idx ).val().substring( 1 );
                palette.edit( scope.idx, color );
                scope.hide();

            };

            // Hides the dialog
            scope.hide = function() {

                scope.show = false;

            };

        }

    };

}