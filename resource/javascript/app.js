/*
 * Our app
 */
var colorhelper = angular.module( 'colorhelper', [ 'LocalStorageModule' ] );

/*
 * Disable http get cache for IE11 bug
 */
angular
    .module( 'colorhelper' )
    .config( config );

function config( $httpProvider ) {

    //initialize get if not there
    if ( !$httpProvider.defaults.headers.get ) {

        $httpProvider.defaults.headers.get = {};

    }

    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';

}

/*
 * Shorthand for l10n.js localization function
 */
var l = function (string) {

    return string.toLocaleString();

};

/*
 * Generate dynamic favicon
 */
var generateFavicon = function( colors ) {

    // Create a canvas and determine how many colors we have to deal with
    var canvas = document.createElement( 'canvas' ),
        ctx = canvas.getContext('2d'),
        count = colors.length;

    // Size of the canvas/favicon
    canvas.height = canvas.width = 16;

    // Four different layouts based on how many colors are in the palette
    // Could possibly be done algorithmically but I'm not smart enough
    switch ( count ) {

        case 2:
            ctx.fillStyle = "#" + colors[0];
            ctx.fillRect(0, 0, 16, 8);
            ctx.fillStyle = "#" + colors[1];
            ctx.fillRect(0, 8, 16, 16);
            break;

        case 3:
            ctx.fillStyle = "#" + colors[0];
            ctx.fillRect(0, 0, 16, 8);
            ctx.fillStyle = "#" + colors[1];
            ctx.fillRect(0, 8, 8, 16);
            ctx.fillStyle = "#" + colors[2];
            ctx.fillRect(8, 8, 16, 16);
            break;

        case 4:
            ctx.fillStyle = "#" + colors[0];
            ctx.fillRect(0, 0, 8, 8);
            ctx.fillStyle = "#" + colors[1];
            ctx.fillRect(8, 0, 16, 16);
            ctx.fillStyle = "#" + colors[2];
            ctx.fillRect(0, 8, 8, 16);
            ctx.fillStyle = "#" + colors[3];
            ctx.fillRect(8, 8, 16, 16);
            break;

        case 5:
            ctx.fillStyle = "#" + colors[0];
            ctx.fillRect(0, 0, 8, 8);
            ctx.fillStyle = "#" + colors[1];
            ctx.fillRect(8, 0, 16, 16);
            ctx.fillStyle = "#" + colors[2];
            ctx.fillRect(0, 8, 5.34, 16);
            ctx.fillStyle = "#" + colors[3];
            ctx.fillRect(5.33, 8, 10.66, 16);
            ctx.fillStyle = "#" + colors[4];
            ctx.fillRect(10.65, 8, 16, 16);
            break;

        default:
            ctx.fillStyle = "#" + colors[0];
            ctx.fillRect(0, 0, 8, 8);
            ctx.fillStyle = "#" + colors[1];
            ctx.fillRect(8, 0, 16, 16);
            ctx.fillStyle = "#" + colors[2];
            ctx.fillRect(0, 8, 5.34, 16);
            ctx.fillStyle = "#" + colors[3];
            ctx.fillRect(5.33, 8, 10.66, 16);
            ctx.fillStyle = "#" + colors[4];
            ctx.fillRect(10.65, 8, 16, 16);
            break;

    }

    // Alter favicon links href attribute
    document.getElementById( 'favicon' ).setAttribute( 'href', canvas.toDataURL( 'image/png' ) );

};