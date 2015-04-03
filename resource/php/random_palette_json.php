<?php

# Workaround for API not supporting JSONP??
echo file_get_contents( 'http://www.colourlovers.com/api/palettes/random?format=json' );