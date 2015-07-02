/*
 * Our app
 */
var colorhelper = angular.module( 'colorhelper', [] );

/*
 * document.onload
 */
$(function() {


});

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

    }

    // Alter favicon links href attribute
    document.getElementById( 'favicon' ).setAttribute( 'href', canvas.toDataURL( 'image/png' ) );

};

/*
 * Replace all SVG images with inline SVG
 * Taken from http://stackoverflow.com/a/11978996/2298963
 */
var cssableSVG = function() {

    jQuery('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });

};
