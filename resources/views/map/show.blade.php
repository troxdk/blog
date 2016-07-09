@extends('layouts.map')

@section('content')
<div id="map"></div>
@endsection

@section('script')
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.css' rel='stylesheet' />
<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.js'></script>
<script src='//api.tiles.mapbox.com/mapbox.js/plugins/turf/v2.0.0/turf.min.js' charset='utf-8'></script>
@endsection