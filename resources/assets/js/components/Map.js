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
        this.latestPos = 0;

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

        this.sourceData = {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': []
            }
        };

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
        $.getJSON('/map/positions/' + this.latestPos, (data) => {
            if(data) {
                if(data.latest !== undefined) {
                    if(parseInt(data.latest) > this.latestPos) {
                        this.latestPos = parseInt(data.latest);
                    }
                }
                if(data.positions !== undefined && data.positions.length > 0) {
                    this.parsePositions(data.positions);
                }
            }
            
            setTimeout(() => {
                this.getPostions();
            }, this.updateInterval);
        });
    }

    parsePositions(positions) {
        this.sourceData.geometry.coordinates = this.sourceData.geometry.coordinates.concat(positions)
        this.source.setData(this.sourceData);

        if(!this.dragged) {
            this.map.setCenter(positions[positions.length-1]);
        }
    }

}