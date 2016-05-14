export default class Map {

    constructor() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kZXJzZ2wiLCJhIjoiY2lqMDE4a2dhMDAzOHYybTUyenZ6ZmlxZiJ9.eCEhAY2tvbxtGSaXR3pkUA';
        this.map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/satellite-streets-v9', //stylesheet location
            center: [10.3685232, 55.3950927],
            zoom: 15
        });

        this.map.on('load', () => {
            this.getPostions();
        });
    }

    getPostions() {
        $.getJSON('/map/positions', (data) => {
            //console.log(data);
            if(data) {
                this.parsePositions(data);
            }
        });
    }

    parsePositions(data) {
        //console.log(data);

        this.map.addSource('route', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': data
                }
            }
        });

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
    }

}