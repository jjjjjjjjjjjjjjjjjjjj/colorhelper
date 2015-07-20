angular
    .module( 'colorhelper' )
    .controller( 'SVGController', SVGController );

SVGController.$inject = [ '$scope' ];

function SVGController( $scope ) {

    // Defined here to avoid excessive calls to DOM.
    var svgHeader = document.getElementById( '#svgHeader' );

    // Returns svg path for current color column
    $scope.getColorPath = function( i, numCols ) {

        // Calculate color path
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

    // Returns a number relative to the current width of the svg header.
    $scope.getIconWidth = function( n ) {

       var  w = svgHeader.width();
            h = svgHeader.height(),
            ratio = w / h,
            iconWidth = n / ratio,
            $scope.iconWidth = iconWidth;

       return iconWidth;

    }

    $scope.centerIcon = function( i, colorCount ) {

        var cw = ( 100 / colorCount ) - ( 50 / colorCount ); // Width of icon column.
            xStart = i * ( 100 / colorCount ) + ( 50 / colorCount );

        return xStart + ( cw / 2 ) - ( $scope.iconWidth / 2 );


    }

}

