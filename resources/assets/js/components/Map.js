export default class Map {

    constructor() {
        this.updateInterval = 3000;
        mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kZXJzZ2wiLCJhIjoiY2lqMDE4a2dhMDAzOHYybTUyenZ6ZmlxZiJ9.eCEhAY2tvbxtGSaXR3pkUA';
        this.map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/satellite-streets-v9', //stylesheet location
            center: [10.3644205, 55.306425],
            zoom: 15
        });

        this.dragged = false;

        this.source = new mapboxgl.GeoJSONSource({
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': []
                }
            }
        });

        this.map.on('load', () => {
            
            this.map.addSource('route', this.source);

            this.map.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': 'red',
                    'line-width': 5
                }
            });

            this.getPostions();

        });

        this.map.on('dragstart', () => {
            this.dragged = true;
        });
    }

    getPostions() {
        $.getJSON('/map/positions', (data) => {
            if(data) {
                this.parsePositions(data);
            }

            setTimeout(() => {
                this.getPostions();
            }, this.updateInterval);
        });
    }

    parsePositions(data) {
        this.source.setData({
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': data
            }
        });

        if(!this.dragged) {
            this.map.setCenter(data[data.length-1]);
        }
    }

}