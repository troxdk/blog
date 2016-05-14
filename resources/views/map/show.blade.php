@extends('layouts.app')

@section('content')
<div id="map"></div>
@endsection

@section('script')
<script src='//api.tiles.mapbox.com/mapbox.js/plugins/turf/v2.0.0/turf.min.js' charset='utf-8'></script>
<script>
mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kZXJzZ2wiLCJhIjoiY2lqMDE4a2dhMDAzOHYybTUyenZ6ZmlxZiJ9.eCEhAY2tvbxtGSaXR3pkUA';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/satellite-streets-v9', //stylesheet location
    center: [-96, 37.8],
    zoom: 3
});
</script>
@endsection