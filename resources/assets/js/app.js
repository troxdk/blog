require('dropzone');

import Map from './components/Map';

let map = null;
$(function() {
    if($('#map').length > 0) {
        map = new Map();
    }
});