<?php

# Workaround for API not supporting JSONP??
#TODO:: same origin check

# Get the top 30 palettes
$palettes = file_get_contents( 'http://www.colourlovers.com/api/palettes/top?format=json&numResults=30' );

# Pick a random palette
$palette = json_decode( $palettes )[ rand( 0, 30 ) ];

# Simulate array in unity with what random_palette_json spits out
echo "[" . json_encode( $palette ) . "]";
    

