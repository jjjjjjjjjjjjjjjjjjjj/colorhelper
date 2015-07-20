angular
    .module( 'colorhelper' )
    .directive( 'cAddDialog', cAddDialog );

cAddDialog.$inject = [ 'palette', '$rootScope' ];

function cAddDialog( palette, $rootScope ) {

    return {

        restrict: 'E',
        templateUrl: '/resource/template/cDialog.html',
        replace: true,
        scope: {

            show: '='

        },
        link: function( scope ){

            scope.id = "add-color-input";
            scope.hex = '#EBEBEB';

            // Initialize colorpicker on our input.
            $( '#add-color-input' ).colorPicker();

            // Strings for the dialog.
            scope.strings = {

                title: l( '%dialog.add.color' ),
                execute: l( '%dialog.add.color.confirm' ),
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

                var color = $('#add-color-input').val().substring( 1 );
                palette.addColor( color );
                scope.hide();

            };

            // Hides the dialog
            scope.hide = function() {

                scope.show = false;

            };

        }

    };

}