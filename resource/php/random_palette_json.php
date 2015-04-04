<?php

# Workaround for API not supporting JSONP??

#TODO:: same origin check
echo file_get_contents( 'http://www.colourlovers.com/api/palettes/random?format=json' );