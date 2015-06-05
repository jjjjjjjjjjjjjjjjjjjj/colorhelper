/*
 * SVG controller
 */

colorhelper.controller( 'SVGController', function SVGController( $scope ) {

    // returns svg path for current color column
    $scope.getPath = function( i, numCols ) {

        // Calculate path
        var w = 100 / numCols,
            h = 100,
            tilt = 20,
            lTilt = (tilt / numCols) * (numCols - i),
            rTilt = (tilt / numCols) * (numCols - i - 1),
            x1 = w * i,
            y1 = 0,
            x2 = x1 + w + 0.05, // 0.05 adjustment to slightly overlap colors
            y2 = 0,
            x3 = x2,
            y3 = h - rTilt,
            x4 = x1,
            y4 = h - lTilt,
            path = '';

        path += "M" + x1 + " " + y1;
        path += "L" + x2 + " " + y2;
        path += "L" + x3 + " " + y3;
        path += "L" + x4 + " " + y4;
        path += "Z";

        return path;

    };

});