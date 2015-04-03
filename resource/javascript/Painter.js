
// Grab JSON
function makePalette( preference ) {
    $.getJSON( '../resource/php/' + preference + '_palette_json.php', function( data ) {

        // Create a palette
        var palette = data[0];
        console.log(palette);

        // Paint the screen document
        Paint( palette );

    });
}

function Paint( palette ) {

    $( '.color' ).each( function( i ) {

        var $this = $( this );

        $this.css( 'background-color', palette.colors[ i ] );


    });
}

makePalette( 'popular' );


